<template>
    <v-container fluid>
        <v-row v-if="templates.length > 0">
            <v-col>
                <h2>Select a Form Template</h2>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <h2>No templates found</h2>
            </v-col>
        </v-row>
        <v-row
            v-for="(templateChunk, index) in templates"
            :key="index"
            class="temp-row"
        >
            <v-col
                v-for="template in templateChunk"
                :key="template.id"
                class="d-flex flex-column"
            >
                <FormBuilderTemplate
                    :id="template.id"
                    v-model="templateSelectedId"
                    :label="template.display_name"
                    :description="template.description"
                />
            </v-col>
        </v-row>
        <v-overlay
            :model-value="loading"
            opacity=".5"
            scrim="#FFF"
        />
    </v-container>
</template>

<script>
import { chunk } from 'lodash-es';
import api from '../../../../api/private';
import FormBuilderTemplate from './FormBuilderTemplate.vue';

export default {
    name: 'FormBuilderTemplateChooser',
    options: {
        label: 'Choose a Template',
    },
    components: { FormBuilderTemplate },
    props: {
        store: { type: Object, required: true },
    },
    emits: ['next', 'reset', 'save'],
    data: () => ({
        loading: false,
        templates: [],
        templateSelectedId: '',
    }),
    watch: {
        templateSelectedId: function (id) {
            const url = new URL(window.location.href);
            if (url.pathname.endsWith('create')) {
                this.$emit('save', { key: 'action', value: 'create' });
            }
            this.$emit('save', { key: 'templateId', value: id });
            this.$emit('next');
        },
    },
    created() {
        this.loading = true;
        this.$emit('reset');
        this.affiliateId = this.$store.getters['user/selectedAffiliate']
            ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
        api.templateList(this.affiliateId)
            .then((response) => {
                this.templates = chunk(response.data, 3);
                this.loading = false;
            });
    },
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 960px) {
    .temp-row {
        flex-direction: column;
    }
}
</style>
