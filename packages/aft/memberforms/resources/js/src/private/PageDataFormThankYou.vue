<template>
    <v-card>
        <v-card-title class="form-title">
            <v-img
                v-if="form.show_aft_logo"
                class="mr-2"
                max-width="41"
                :src="logoSm"
            />
            {{ thankYouHeaderContent }}
        </v-card-title>
        <v-card-text class="form-header">
            <!-- eslint-disable vue/no-v-html -->
            <span v-html="thankYouBodyContent" />
            <!--eslint-enable-->
        </v-card-text>
    </v-card>
</template>

<script>

import api from '../../api/public';
import logoSm from '../../../images/aft-small.png'

export default {
    name: 'PageThankYou',
    data: () => ({
        form: {},
        thankYouHeaderContent: '',
        thankYouBodyContent: '',
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
                    this.thankYouBodyContent = this.form.thankyou_fields.fields.thankyouBody.value;
                });
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-header {
        padding-top: 16px;
    }
    .theme--light.v-card>.v-card__text.form-header {
        color: #000;
    }
</style>
