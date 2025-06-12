<template>
    <v-card>
        <v-card-title class="form-title bg-primary">
            <v-img
                v-if="form.show_aft_logo"
                class="mr-2"
                max-width="41"
                :src="logoAft"
            />
            {{ thankYouHeaderContent }}
        </v-card-title>
        <v-card-text class="form-header pt-4 px-8">
            <!-- eslint-disable vue/no-v-html -->
            <div v-html="thankYouBodyContent" />
            <!--eslint-enable-->
        </v-card-text>
    </v-card>
</template>

<script>

import api from '../../api/public';
import logoAft from '../../../../../../../public/images/logos/aft-small.png';
import { reviseLinkUrls } from "../../../../../../../resources/js/helpers/index.js";

export default {
    name: 'PageThankYou',
    data: () => ({
        form: {},
        thankYouHeaderContent: '',
        thankYouBodyContent: '',
        logoAft,
    }),
    watch: {
    },
    mounted() {
        this.getData(this.$route.params.id);
    },
    created() {
    },
    methods: {
        getData(id) {
            api.getForm(id)
                .then((response) => {
                    this.form = response.data;
                    this.thankYouHeaderContent = this.form.thankyou_fields.fields.thankyouHeader.value;
                    this.thankYouBodyContent = reviseLinkUrls(this.form.thankyou_fields.fields.thankyouBody.value);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-header {
        padding-top: 16px;
    }
    .v-theme--light.v-card>.v-card__text.form-header {
        color: #000;
    }
</style>
