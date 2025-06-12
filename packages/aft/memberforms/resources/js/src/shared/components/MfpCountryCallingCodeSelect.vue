<template>
    <v-autocomplete
        :items="countries"
        item-title="CountryCallingCodeDisplay"
        item-value="CountryId"
        v-model="field.value"
        :label="field.label"
        :required="field.required"
        :disabled="designer"
        variant="underlined"
    />
</template>

<script>
import api from '../../../api/public';

export default {
    name: 'MfpCountryCallingCodeSelect',
    props: {
        field: { type: Object, required: false },
        required: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
    },
    data: () => ({
        countries: [],
    }),
    mounted() {
        if (this.field.default) {
            this.field.value = this.field.default;
        }
        this.getCountries();
    },
    methods: {
        getCountries() {
            api.getListOfCountries()
                .then((response) => {
                    this.countries = response.data;
                    // console.log(this.countries);
                });
        },
    },
};
</script>

<style scoped>

</style>
