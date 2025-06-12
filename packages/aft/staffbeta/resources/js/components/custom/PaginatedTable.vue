<template>
    <div>
        <b-pagination
            v-if="options"
            v-model="options.current_page"
            :total-rows="options.total"
            :per-page="options.per_page"
            :disabled="loading"
            size="sm"
            prev-text="Prev"
            next-text="Next"
            first-number
            last-number
            limit="10"
        />
        <div class="table-wrapper" :class="overflow">
            <div ref="scrollContainer" class="table-responsive">
                <table ref="scrollContent" class="table table-sm table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th v-for="header in headers" scope="col">
                                {{ header.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody style="white-space: nowrap">
                        <tr v-if="!items || items.length === 0">
                            <td colspan="100">
                                {{ emptyText }}
                            </td>
                        </tr>
                        <tr v-for="item in items">
                            <template v-for="(column, colName) in headers">
                                <template v-if="column.source">
                                    <td v-if="!column.type" class="pt-2">
                                        <slot :name="colName" v-bind:item="item">
                                            {{ item[column.source] }}
                                        </slot>
                                    </td>
                                    <td v-else-if="column.type === 'Array'">
                                        <table class="table table-sm table-borderless table-non-striped-hover mb-0">
                                            <tbody>
                                                <template
                                                    v-for="subitem in get(item, column.source)"
                                                >
                                                    <slot :name="colName" v-bind:item="subitem" />
                                                </template>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td v-else-if="column.type === 'First'">
                                        <table class="table table-sm table-borderless table-non-striped-hover mb-0">
                                            <tbody>
                                                <template
                                                    v-for="(subitem, index) in get(item, column.source)"
                                                >
                                                    <slot v-if="index === 0" :name="colName" v-bind:item="subitem" />
                                                </template>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td v-else>
                                        Nothing...
                                    </td>
                                </template>
                                <td v-else>
                                    [[ No Source ]]
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="container sticky-bottom">
                <div class="row justify-content-between mb-3">
                    <div class="col-1">
                        <button
                            data-toggle="tooltip"
                            data-placement="auto"
                            title="Hold Shift + Mouse Scroll Wheel over the Table"
                            type="button"
                            class="btn btn-dark"
                            :disabled="!overflowLeft"
                            @click="scrollLeft()"
                        >
                            <i class="fa-fw fas fa-chevron-circle-left" />
                        </button>
                    </div>
                    <div class="col-1 text-right">
                        <button
                            data-toggle="tooltip"
                            data-placement="auto"
                            title="Hold Shift + Mouse Scroll Wheel over the Table"
                            type="button"
                            class="btn btn-dark"
                            :disabled="!overflowRight"
                            @click="scrollRight()"
                        >
                            <i class="fa-fw fas fa-chevron-circle-right" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="table-shader" :class="loading ? 'loading' : ''" />
        </div>
        <b-pagination
            v-if="options"
            v-model="options.current_page"
            :total-rows="options.total"
            :per-page="options.per_page"
            :disabled="loading"
            size="sm"
            prev-text="Prev"
            next-text="Next"
            first-number
            last-number
            limit="10"
            align="right"
            @input="pageChanged($event)"
        />
    </div>
</template>

<script>
import { debounce, get } from 'lodash-es';

export default {
    name: 'PaginatedTable',
    props: {
        options: { type: Object, required: false },
        headers: { type: Object, required: true },
        items: { type: Array, required: true },
        emptyText: { type: String, default: 'No Results' },
        loading: { type: Boolean, default: false },
    },
    data: () => ({
        overflowLeft: false,
        overflowRight: false,
        overflow: '',
    }),
    watch: {
        items: function () {
            this.$nextTick(function () {
                this.tableResized();
            });
        },
    },
    created() {
        this.tableResized = debounce(this.tableResize, 100, { leading: true });
        window.addEventListener('resize', this.tableResized);
    },
    unmounted() {
        window.removeEventListener('resize', this.tableResized);
    },
    mounted() {
        this.tableResizeSetup();
    },
    methods: {
        tableResizeSetup() {
            const scrollContainer = this.$refs.scrollContainer;
            scrollContainer.addEventListener('scroll', this.tableResized);
            this.tableResized();
        },
        tableResize() {
            if (!this.$refs.scrollContainer) { return; }
            const scrollContainer = this.$refs.scrollContainer;
            if (scrollContainer.offsetWidth < scrollContainer.scrollWidth) {
                this.overflowLeft = false;
                this.overflowRight = false;
                this.overflow = '';
                const scrollContent = this.$refs.scrollContent;
                const viewWidth = scrollContent.scrollWidth - scrollContainer.offsetWidth;
                if (scrollContainer.scrollLeft !== 0) {
                    this.overflowLeft = true;
                    this.overflow += 'more-left ';
                }
                if (scrollContainer.scrollLeft <= viewWidth) {
                    this.overflowRight = true;
                    this.overflow += 'more-right ';
                }
            } else {
                this.overflow = '';
            }
        },
        pageChanged(page) {
            this.$emit('input', page);
        },
        scrollLeft() {
            const scrollContainer = this.$refs.scrollContainer;
            scrollContainer.scrollLeft -= 40;
        },
        scrollRight() {
            const scrollContainer = this.$refs.scrollContainer;
            scrollContainer.scrollLeft += 40;
        },
    },
};
</script>

<style scoped>
    .table-wrapper { position: relative; border-left: solid 2px transparent; border-right: solid 2px transparent; }
    .table-wrapper.more-left { border-left: dashed 2px lightgray; }
    .table-wrapper.more-right { border-right: dashed 2px lightgray; }
    .table-shader { display: none; }
    .table-shader.loading {
        display: block;
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #88A;
        opacity: 0.25;
    }
    .table.table-striped > tbody > tr:nth-of-type(odd) {
        background-color: #F4F4FF;
    }
    .table.table-non-striped-hover > tbody > tr:nth-of-type(odd) {
        background-color: initial;
    }
    .table.table-non-striped-hover > tbody > tr:hover {
        background-color: #DDF;
    }

    .sticky-bottom {
        position: sticky;
        bottom: .5rem;
    }
</style>
