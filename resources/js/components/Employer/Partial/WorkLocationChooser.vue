<template>
    <v-container>
        <v-row>
            <h5>
                Work Location
            </h5>
        </v-row>
        <v-row v-for="item in items" v-bind="item" :key="item.label">
            <v-autocomplete
                clearable
                :label="item.label"
                :items="item.items"
                item-value="WorkLocationId"
                item-title="WorkLocationName"
                v-model="item.value"
                v-on:update:model-value="workLocationSelected($event)"
                variant="underlined"
            ></v-autocomplete>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: "WorkLocationChooser",
    props: {
        value: {
            required: true
        },
        employerId: {
            required: true
        },
        rules: {
            default: ''
        }
    },
    data: () => ({
        isLoading: false,
        items: [],
        levels: [],
    }),
    methods: {
        doLoad(val) {
            if (!val) {
                this.items = [];
                return;
            }
            this.items = [];
            axios.get('/api/v2/aggregate/employer/worklocation/' + this.employerId).then((response) => {
                if (!response.data.data) {
                    return;
                }
                for (const label in response.data.data) {
                    if (!response.data.data.hasOwnProperty(label)) {
                        continue;
                    }

                    this.items.push({
                        label: label,
                        value: null,
                        items: response.data.data[label]
                    });
                }
                this.setupValues();
                this.items = [...this.items];
            });
        },
        workLocationSelected(worklocationId) {
            this.$emit('selected-work-location', worklocationId);
            this.doLoad(this.employerId);
        },
        doFilter(itemsPerLevel, ParentWorkLocationId, level) {
            var items = [];
                for (const item of itemsPerLevel.items) {
                    if (item.ParentWorkLocationId === ParentWorkLocationId) {
                        items.push(item);
                    }
                }
                this.items[level].items = items;
        },
        setupValues() {
            if (!this.value) {
                return;
            }

            let level = 0;

            for (const itemsPerType of this.items) {
                for (const item of itemsPerType.items) {
                    if (item.WorkLocationId === this.value) {
                        itemsPerType.value = this.value;
                        if (level > 0 && item.ParentWorkLocationId) {
                            this.setupLevelValue(this.items[level-1], item.ParentWorkLocationId, level-1);
                        }
                    }
                    if (item.WorkLocationId === itemsPerType.value) {
                        if(this.items.length>level){
                            this.doFilter(this.items[level+1],item.WorkLocationId,level+1);
                        }
                        if(this.items.length>level+1){
                            this.doFilter(this.items[level+2],item.WorkLocationId,level+2);
                        }
                    }
                }
                level++;
            }
        },
        setupLevelValue(itemsPerLevel, value, level) {
            itemsPerLevel.value = value;
            let parentId = null;

            if (level > 0) {
                for (const item of itemsPerLevel.items) {
                    if (item.WorkLocationId === value && item.ParentWorkLocationId) {
                        parentId = item.ParentWorkLocationId;
                    }
                    if (item.WorkLocationId === value) {
                        if(this.items.length>level){
                            this.doFilter(this.items[level+1],item.WorkLocationId,level+1);
                        }
                    }
                }

                if (parentId) {
                    this.setupLevelValue(this.items[level -1], parentId, level -1);
                }
            } else{
                for (const item of itemsPerLevel.items) {
                    if (item.WorkLocationId === value) {
                        if(this.items.length>level){
                            this.doFilter(this.items[level+1],item.WorkLocationId,level+1);
                        }
                    }
                }
            }

        }
    },
    watch: {
        employerId (val) {
            this.doLoad(val);
            return val;
        }
    }
}
</script>
