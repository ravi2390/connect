<template>
    <v-container>
        <v-row>
            <h5>
                Work Structure
            </h5>
        </v-row>
        <v-row v-for="item in items" v-bind="item" :key="item.label">
            <v-autocomplete
                clearable
                :label="item.label"
                :items="item.items"
                item-value="WorkStructureId"
                item-title="WorkStructureName"
                v-model="item.value"
                v-on:update:model-value="workStructureSelected($event)"
                variant="underlined"
            ></v-autocomplete>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: "WorkStructureChooser",
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
            //if empty search is done
            if (!val) return;
            this.items = [];
            axios.get('/api/v2/aggregate/employer/workstructure/' + this.employerId).then((response) => {
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
        workStructureSelected(workStructureId) {
            this.$emit('selected-work-structure', workStructureId);
            this.doLoad(this.employerId);
        },
        doFilter(itemsPerLevel, parentWorkStructureId, level) {
            var items = [];
                for (const item of itemsPerLevel.items) {
                    if (item.ParentWorkStructureId === parentWorkStructureId) {
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
                    if (item.WorkStructureId === this.value) {
                        itemsPerType.value = this.value;
                        if (level > 0 && item.ParentWorkStructureId) {
                            this.setupLevelValue(this.items[level-1], item.ParentWorkStructureId, level-1);
                        }
                    }
                    if (item.WorkStructureId === itemsPerType.value) {
                        if(this.items.length>level){
                            this.doFilter(this.items[level+1],item.WorkStructureId,level+1);
                        }
                        if(this.items.length>level+1){
                            this.doFilter(this.items[level+2],item.WorkStructureId,level+2);
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
                    if (item.WorkStructureId === value && item.ParentWorkStructureId) {
                        parentId = item.ParentWorkStructureId;
                    }
                    if (item.WorkStructureId === value) {
                        if(this.items.length>level){
                            this.doFilter(this.items[level+1],item.WorkStructureId,level+1);
                        }
                    }
                }

                if (parentId) {
                    this.setupLevelValue(this.items[level -1], parentId, level -1);
                }
            } else{
                for (const item of itemsPerLevel.items) {
                    if (item.WorkStructureId === value) {
                        if(this.items.length>level){
                            this.doFilter(this.items[level+1],item.WorkStructureId,level+1);
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
