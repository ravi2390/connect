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
                    item-value="WorkStructureId"
                    item-title="WorkStructureName"
                    variant="underlined"
                    return-object
                    clearable
                    @update:model-value="handleSelected($event, index)"
                />
                <div v-if="selectedWorkStructure" class="d-flex justify-end py-2">
                    <v-chip closable @click:close="selectedWorkStructure = null">
                        {{ selectedWorkStructure.WorkStructureName }}
                    </v-chip>
                </div>
            </div>
            <div v-else>
                <p>Select an employer to view work structures.</p>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import api from '../../../api/public';

export default {
    name: 'WorkStructure',
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
        selectedWorkStructure: null,
        employerId: null,
        items: [],
    }),
    computed: {
        filteredItems() {
            if (!this.selectedWorkStructure) {
                return this.items.map((item => {
                    return {
                        ...item,
                        value: null,
                    }
                }))
            }
            const selectedChain = [this.selectedWorkStructure.WorkStructureId];
            if (this.selectedItemIndex > 0) {
                for (let i = this.selectedItemIndex; i > 0; i--) {
                    const current = this.items[i].items.find((item) => item.WorkStructureId === selectedChain[0]);
                    const parent = this.items[i - 1]?.items
                        ? this.items[i - 1].items.find((item) => item.WorkStructureId === current.ParentWorkStructureId)
                        : null;

                    // Allow for nulls if the parent is not found.
                    selectedChain.unshift(parent ? parent.WorkStructureId : null);
                }
            }
            return this.items.reduce((acc, item, currentIndex) => {
                let { label, items } = item;
                const value = selectedChain[currentIndex] || null;
                // No need to filter parent items, just set their value to the selectedChain for this index.
                if (currentIndex === selectedChain.length) {
                    items = items.filter((item) => item.ParentWorkStructureId === selectedChain[currentIndex - 1]);
                }
                if (currentIndex > selectedChain.length) {
                    const parentIds = acc[currentIndex - 1]?.items
                        ? acc[currentIndex - 1].items.map((item) => item.WorkStructureId)
                        : [];
                    items = items.filter((item) => parentIds.includes(item.ParentWorkStructureId));
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
                this.employerId = this.field.source.employerId;
                this.selectedItemIndex = null;
                this.selectedWorkStructure = null;
                this.items = [];
            },
        },
        employerId: {
            handler() {
                this.listWorkStructures();
            },
        },
        selectedWorkStructure: {
            handler() {
                const selectedWorkStructure = this.selectedWorkStructure ? this.selectedWorkStructure.WorkStructureId : null;
                if (!selectedWorkStructure) {
                    this.selectedItemIndex = null;
                }
                this.$emit('update:modelValue', { selectedWorkStructure })
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
            this.selectedWorkStructure = event;
            this.selectedItemIndex = index;
        },
        listWorkStructures() {
            if (this.employerId && this.employerId !== '') {
                this.loading = true;
                api.search('workstructure', '', { employerId: this.employerId })
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
