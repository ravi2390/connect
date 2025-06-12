<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <h2>Review and Save</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <PageForm
                    :form-predefined="form"
                    disabled
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-space-between ga-2">
                <v-btn
                    @click="$emit('prev')"
                >
                    Back
                </v-btn>
                <v-btn
                    color="#0A2A5C"
                    @click="save"
                >
                    {{ saveButtonText }}
                </v-btn>
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
import api from '../../../../api/private';
import PageForm from '../../../public/PageForm.vue';

export default {
    name: 'FormBuilderReview',
    components: { PageForm },
    options: {
        label: 'Review and Save',
    },
    emits: ['prev', 'reset'],
    props: {
        store: { type: Object, required: true },
    },
    data: () => ({
        loading: false,
        form: null,
        saveButtonText: '',
        actions: api.getFormActions(),
    }),
    created() {
        this.form = this.store.form;
        this.form.display_name = this.store.formTitle;
        this.form.description = this.store.formDescription;
        if (this.store.action === this.actions.create || this.store.action === this.actions.clone) {
            this.saveButtonText = 'Create Form';
        } else if (this.store.action === this.actions.edit) {
            this.saveButtonText = 'Update Form';
        }
    },
    methods: {
        save() {
            api.formCreate(this.store)
                .then(() => {
                    this.$emit('reset');
                    this.$router.push({ path: 'manage' });
                })
                .catch((error) => {
                    alert(error);
                });
        },
    },
};
</script>

<style lang="scss">
.Continue-Button .v-btn__content {
    color: white;
}
</style>
