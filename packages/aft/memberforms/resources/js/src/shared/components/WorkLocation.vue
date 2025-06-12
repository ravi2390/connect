<template>
    <v-row>
        <v-col>
            <div>
                <span v-if="field.required">
                    <strong class="text-red">
                        *
                    </strong>
                </span>
                {{ (field.required ? ' (required)' : '') }}
                <strong v-if="!employerId && designer">
                    This field must be placed on the form after the Employment Information field in order to work
                    properly
                </strong>
            </div>
            <div v-if="employerId">
                <v-select
                    v-for="(item, index) in filteredItems"
                    :key="item.label"
                    v-model="item.value"
                    :label="item.label"
                    :items="item.items"
                    item-value="WorkLocationId"
                    item-title="WorkLocationName"
                    variant="underlined"
                    return-object
                    clearable
                    @update:model-value="handleSelected($event, index)"
                />
                <div v-if="selectedWorkLocation" class="d-flex justify-end py-2">
                    <v-chip closable @click:close="selectedWorkLocation = null">
                        {{ selectedWorkLocation.WorkLocationName }}
                    </v-chip>
                </div>
            </div>
            <div v-else>
                <p>Select an employer to view work locations.</p>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import api from '../../../api/public';

export default {
    name: 'WorkLocation',
    props: {
        modelValue: { type: Object },
        field: { type: Object, default: () => {} },
        label: { type: String, default: 'MFP Select Field' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        selectedItemIndex: null,
        selectedWorkLocation: null,
        employerId: null,
        items: [],
    }),
    computed: {
        filteredItems() {
            // Since the select returns an object, the item value will be incorrect.
            if (!this.selectedWorkLocation) {
                return this.items.map((item) => {
                    return {
                        ...item,
                        value: null,
                    };
                });
            }
            // if this.selectedItemIndex > 0, then we need to find the parents of the selected item.
            const selectedChain = [this.selectedWorkLocation.WorkLocationId];
            if (this.selectedItemIndex > 0) {
                for (let i = this.selectedItemIndex; i > 0; i--) {
                    const current = this.items[i].items.find((item) => item.WorkLocationId === selectedChain[0]);
                    const parent = this.items[i - 1]?.items
                        ? this.items[i - 1].items.find((item) => item.WorkLocationId === current.ParentWorkLocationId)
                        : null;

                    // Allow for nulls if the parent is not found.
                    selectedChain.unshift(parent ? parent.WorkLocationId : null);
                }
            }

            return this.items.reduce((acc, item, currentIndex) => {
                let { label, items } = item;
                const value = selectedChain[currentIndex] || null;
                // No need to filter parent items, just set their value to the selectedChain for this index.
                if (currentIndex === selectedChain.length) {
                    items = items.filter((item) => item.ParentWorkLocationId === selectedChain[currentIndex - 1]);
                }
                if (currentIndex > selectedChain.length) {
                    const parentIds = acc[currentIndex - 1]?.items
                        ? acc[currentIndex - 1].items.map((item) => item.WorkLocationId)
                        : [];
                    items = items.filter((item) => parentIds.includes(item.ParentWorkLocationId));
                }
                if (items.length) {
                    acc.push({ label, value, items });
                }
                return acc;
            }, []);
        },
    },
    watch: {
        'field.source.employerId': {
            handler() {
                // This component only depends on the employerId, when it changes the entire component needs to reset.
                this.employerId = this.field.source.employerId;
                this.selectedItemIndex = null;
                this.selectedWorkLocation = null;
                this.items = [];
            },
        },
        employerId: {
            handler() {
                this.listWorkLocations();
            },
        },
        selectedWorkLocation: {
            handler() {
                const selectedWorkLocation = this.selectedWorkLocation ? this.selectedWorkLocation.WorkLocationId : null;
                if (!selectedWorkLocation) {
                    this.selectedItemIndex = null;
                }
                this.$emit('update:modelValue', { selectedWorkLocation });
            },
        },
    },
    mounted() {
        if (this.field.source) {
            this.employerId = this.field.source.employerId;
        }
    },
    methods: {
        handleSelected(event, index) {
            // Return the whole object for convenience.
            this.selectedWorkLocation = event;
            this.selectedItemIndex = index;
        },
        listWorkLocations() {
            if (this.employerId && this.employerId !== '') {
                this.loading = true;
                api.search('worklocation', '', { employerId: this.employerId })
                    .then((response) => {
                        this.items = Object.entries(response.data.data).reduce((acc, [label, items]) => {
                            if (items.length) {
                                acc.push({ label, value: null, items });
                            }
                            return acc;
                        },[] );
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
    },
};
</script>
