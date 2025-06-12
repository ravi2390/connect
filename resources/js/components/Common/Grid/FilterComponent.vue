<template>
    <v-card class="v-card--outlined v-sheet--tile" :class="collapsedFilterHeaderTheme">
        <v-toolbar :class="collapsedFilterBarTheme" theme="primary" class="mb-3 hidden-md-and-down" title="Filters">
            <filter-chooser-component
                :class="collapsedFilterHideTheme"
                :filters="filters"
                :presets="presets"
                :selectedPreset="selectedPreset"
                @filter-chooser-applied="$emit('filter-chooser-applied', $event)"
                @presets-load="$emit('presets-load', $event)"
            ></filter-chooser-component>
            <v-btn
                :icon="collapsedFilter ? 'mdi:mdi-chevron-down ' : 'mdi:mdi-chevron-up'"
                @click="onCollapseFilter"
            >
            </v-btn>
        </v-toolbar>
        <v-app-bar class="hidden-lg-and-up filter-toolbar" :class="filterBarTheme" v-scroll="onScroll" v-if="!showFilters && !showSort">
            <v-tabs
                fixed-tabs
                hide-slider
                align-tabs="center"
                grow
            >
                <v-tab v-on:click="onShowFilters">
                    Filter
                </v-tab>
                <v-tab v-on:click="onShowSort">
                    Sort
                </v-tab>
            </v-tabs>
        </v-app-bar>
        <v-toolbar dense elevation="0" class="hidden-lg-and-up mobile-closing-bar" v-if="showFilters">
            <v-spacer></v-spacer>
            <v-btn icon="mdi:mdi-close" v-on:click="onHideFilters" />
        </v-toolbar>

        <v-toolbar dense elevation="0" class="hidden-lg-and-up mobile-closing-bar" v-if="showSort">
            <v-spacer></v-spacer>
            <v-btn icon="mdi:mdi-close" v-on:click="onHideSort" />
        </v-toolbar>
        <v-form ref="form" class="px-6 mobile-filter-form" v-if="!is_screen_small" :class="collapsedFilterFormTheme" style="min-width: 220px">
            <template v-for="filter in visibleFilters">
                <v-text-field
                    v-if="filter.type === 'text'"
                    :key="'text' + filter.name"
                    :label="filter.label"
                    variant="underlined"
                    v-model="filter.value"
                    :name=" filter.name"
                ></v-text-field>

                <v-select
                    v-if="filter.type === 'select'"
                    :key="'select' + filter.name"
                    :label="filter.label"
                    v-model="filter.value"
                    variant="underlined"
                    :name=" filter.name"
                    :items="filter.items"
                    v-on:update:model-value="$emit('change')"
                    v-on:focus="fetchItems(filter)"
                ></v-select>

                <v-autocomplete
                    v-if="filter.type === 'autocomplete'"
                    :key="'autocomplete' + filter.name"
                    v-model="filter.value"
                    :label="filter.label"
                    :items="filter.items"
                    variant="underlined"
                    item-title="text"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    closable-chips
                    v-on:update:search="search($event, filter)"
                    v-on:focus="fetchItems(filter)"
                >
                    <template v-slot:chip="{ props, item }">
                        <v-chip
                            v-bind="props"
                            close-icon="fa-times-circle"
                        >
                            {{ item.title }}
                        </v-chip>
                    </template>
                </v-autocomplete>
                <label v-if="filter.type === 'toggle'" :key="'togglelabel' + filter.name">{{ filter.label }}</label>
                <v-btn-toggle
                    v-if="filter.type === 'toggle'"
                    :key="'toggle' + filter.name"
                    v-model="filter.value"
                    mandatory
                    theme="secondary"
                    divided
                >
                    <v-btn variant="outlined" v-for="item in filter.items" v-bind="{value:item}" :key="'toggleButton' + item">
                        {{ item }}
                    </v-btn>
                </v-btn-toggle>
            </template>
            <v-row class="sticky-filter-buttons-row">
                <v-col class="d-flex justify-space-between">
                    <v-btn variant="flat" elevation="0" color="default" class="mb-4 hidden-md-and-down filter-buttons" v-on:click="clear()">
                        Clear
                    </v-btn>
                    <v-btn variant="flat" elevation="0" color="primary" class="mb-4 hidden-md-and-down filter-buttons" v-on:click="onClickSearch()">
                        Search
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
        <v-container v-if="showSort">
            <v-radio-group v-model="radioGroup" class="mobile-sort-radio-group">
                <v-row>
                    <v-col>
                        <v-radio
                            v-for="header in mobileIndividualHeaders"
                            :key="header.value"
                            :label="`${header.title}`"
                            :value="header.value"
                        >
                        </v-radio>
                    </v-col>
                    <v-col>
                        <v-select
                            v-model="sortDesc"
                            :items="sortingOptions"
                            label="Sorting"
                            :model-value="sortingOptions.value"
                            variant="underlined"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-radio-group>
        </v-container>
        <v-bottom-navigation
            class="hidden-lg-and-up position-fixed"
            v-if="showSort || showFilters"
        >
            <v-tabs
                fixed-tabs
                color="primary"
                slider-color="indigo"
                hide-slider
                optional
                v-if="showFilters"

            >
                <v-tab v-on:click="clear()">
                    Clear
                </v-tab>
                <v-tab v-on:click="onAddFilters">
                    Search
                </v-tab>
            </v-tabs>

            <v-tabs
                fixed-tabs
                color="primary"
                slider-color="indigo"
                hide-slider
                optional
                v-if="showSort"

            >
                <v-tab v-on:click="clearSort()">
                    Clear
                </v-tab>
                <v-tab v-on:click="sort">
                    Sort
                </v-tab>
            </v-tabs>
        </v-bottom-navigation>
    </v-card>
</template>

<script>
    import FilterChooserComponent from "./FilterChooserComponent";
    import { debounce } from 'lodash-es';
    import { useGoTo } from "vuetify";

    export default {
        data: () => ({
            collapsedFilter: false,
            isFilterBarFixed: false,
            showFilters: false,
            showSort: false,
            windowWidth: window.innerWidth,
            radioGroup: '',
            sortingOptions: [
                { text: 'asc', value: false },
                { text: 'desc', value: true }
            ],
        }),
        computed: {
            is_screen_small() {
                return this.windowWidth < 960 && !this.showFilters;
            },
            visibleFilters() {
                return this.getFilters();
            },
            filterBarTheme() {
                return this.isFilterBarFixed ? 'v-app-bar--fixed margin-fix-filter-bar' : 'filter-toolbar ';
            },
            collapsedFilterFormTheme() {
                return this.collapsedFilter ? 'collapsed-filter-form' : '';
            },
            collapsedFilterHeaderTheme() {
                return this.collapsedFilter ? 'collapsed-filter-header' : '';
            },
            collapsedFilterHideTheme() {
                return this.collapsedFilter ? 'collapsed-filter-hide' : '';
            },
            collapsedFilterBarTheme() {
                return this.collapsedFilter ? 'dense-filter-bar' : '';
            },
        },
        name: "FilterComponent",

        props: {
            filters: {
                type: Array,
                required: false
            },
            presets: {
                type: Array,
                required: true
            },
            mobileIndividualHeaders: {
                type: Array,
                required: false
            },
            selectedPreset: {
                type: String,
                default: ''
            }
        },
        components: {
            'filter-chooser-component': FilterChooserComponent,
        },

        mounted() {
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth
            });
            this.eagerFetch();
            this.search = debounce(function (val, filter) { console.log('debouncing', val); this.searchItems(val, filter) }, 500);
        },

        setup() {
            const goTo = useGoTo();
            return { goTo };
        },

        watch: {
            filters: function (newVal, oldVal) {
                this.eagerFetch();
            }
        },

        methods: {
            onCollapseFilter() {
                this.collapsedFilter = !this.collapsedFilter;
                this.$emit('collapsedFilterChanged', this.collapsedFilter);
            },
            onScroll (e) {
                if (typeof window === 'undefined') return;
                const top = window.pageYOffset ||   e.target.scrollTop || 0;
                if (top > 16) {
                    this.isFilterBarFixed = true;
                } else {
                    this.isFilterBarFixed = false;
                }
            },
            getFilters() {
                return this.filters.filter((filter) => {
                    return filter.visible
                });
            },
            sort(radioGroup) {
                const footerBlock = document.getElementById('main-footer-block');
                // const backToTopBtn = document.getElementById('back-to-top-btn');
                // backToTopBtn.style.bottom = "16px";
                footerBlock.style.display = "block";
                // @todo: emit the updated sortBy
                // this.$emit('sort', radioGroup);
                this.showSort = false;
            },
            clear() {
                for (const filter of this.filters) {
                    filter.value = null;
                }
                this.onHideFilters();
                this.$emit('clear');
            },
            clearSort() {
                const footerBlock = document.getElementById('main-footer-block');
                // const backToTopBtn = document.getElementById('back-to-top-btn');
                // backToTopBtn.style.bottom = "16px";
                footerBlock.style.display = "block";
                this.radioGroup = '';
                this.sortDesc = false;
                this.showSort = false;
                this.$emit('sort', '', false);
            },
            onShowSort() {
                const footerBlock = document.getElementById('main-footer-block');
                // const backToTopBtn = document.getElementById('back-to-top-btn');
                // backToTopBtn.style.bottom = "60px";
                footerBlock.style.display = "none";
                this.showSort = true;
                this.$emit('onShowSort');
            },
            onHideSort() {
                const footerBlock = document.getElementById('main-footer-block');
                // const backToTopBtn = document.getElementById('back-to-top-btn');
                // backToTopBtn.style.bottom = "16px";
                footerBlock.style.display = "block";
                this.showSort = false;
                this.$emit('onHideSort');
            },
            onHideFilters() {
                const footerBlock = document.getElementById('main-footer-block');
                // const backToTopBtn = document.getElementById('back-to-top-btn');
                // backToTopBtn.style.bottom = "16px";
                footerBlock.style.display = "block";
                this.showFilters = false;
                this.$emit('onHideFilters');
            },
            onShowFilters() {
                const footerBlock = document.getElementById('main-footer-block');
                // const backToTopBtn = document.getElementById('back-to-top-btn');
                // backToTopBtn.style.bottom = "60px";
                footerBlock.style.display = "none";
                this.showFilters = true;
                this.$emit('onShowFilters');
            },
            onAddFilters() {
                this.onHideFilters();
                this.$emit('search');
            },
            eagerFetch() {
                for (const filter of this.filters) {
                    if (filter.options && filter.options.eager) {
                        this.fetchItems(filter);
                    }
                }
            },
            fetchItems(filter) {
                if (filter.options) {
                    this.$store.dispatch('filters/getItems', filter.options.url).then((res) => {
                        const items = this.$store.getters['filters/itemsByUrl'](filter.options.url);
                        items.sort((a, b) => {
                            if (a[filter.options.displayField] < b[filter.options.displayField]) return -1;
                            if (a[filter.options.displayField] > b[filter.options.displayField]) return 1;
                            return 0;
                        });
                        if (filter.items.length === 0) {
                            for (const item of items) {
                                filter.items.push({
                                    text: item[filter.options.displayField],
                                    value: item[filter.options.valueField]
                                });
                            }
                        } else {
                            filter.items = items.map((item) => ({
                                text: item[filter.options.displayField],
                                value: item[filter.options.valueField]
                            }))
                        }
                    });
                }
            },
            searchItems(search, filter) {
                if (search && filter.options) {
                    // const url = `${filter.options.url}
                    var url = filter.options.url;
                    console.log({ url })
                    if (url.indexOf('?')===-1) {
                        url = filter.options.url + '?filter[' + filter.options.searchField + ']=' + search;
                    } else {
                        url = filter.options.url + '&filter[' + filter.options.searchField + ']=' + search;
                    }
                    axios.get(url)
                        .then(response => {
                            filter.items = response.data.data.map((item) => ({
                                text: item[filter.options.displayField],
                                value: item[filter.options.valueField],
                            }));
                        });
                } else {
                    // reset back to stored values.
                    if (filter.options && filter.options.eager) {
                        this.fetchItems(filter);
                    }
                }
            },
            onClickSearch() {
                this.goTo(0);
                this.$emit('updateTableOnSearch');
                this.$emit('search');
            }
        }
    }
</script>

<style scoped>

</style>
