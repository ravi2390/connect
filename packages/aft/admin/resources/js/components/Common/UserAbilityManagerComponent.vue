<template>
    <div style="position: relative">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="abilities"
            :loading="loading"
            show-select
            return-object
            item-key="id"
            hide-default-footer
        >
            <template v-slot:header.data-table-select>
                Assign
            </template>
        </v-data-table>
        <v-overlay
            :absolute="true"
            :model-value="loading"
            opacity=".5"
            scrim="#FFF"
        />
    </div>
</template>

<script>
export default {
    name: 'UserAbilityManagerComponent',
    props: {
        modelValue: { type: Array, required: true },
        userId: { type: Number, default: null },
    },
    data: () => ({
        loading: false,
        headers: [
            { title: 'Ability', value: 'name', }
        ],
        abilities: [],
        selected: [],
    }),
    watch: {
        userId() {
            this.getAbilities();
        },
        selected() {
            // this.$emit('input', this.selected);
            this.$emit('update:modelValue', this.selected);
        },
    },
    methods: {
        getAbilities() {
            this.loading = true;
            axios.get('/admin/api/user/abilities/' + (this.userId || ''))
                .then((response) => {
                    this.abilities = response.data;
                    this.selected = [];
                    this.abilities.forEach((ability) => {
                        if (ability.selected) {
                            this.selected.push(ability);
                        }
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>
