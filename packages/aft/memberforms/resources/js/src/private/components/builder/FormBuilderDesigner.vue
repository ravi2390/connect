<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <h2>Form Designer</h2>
            </v-col>
        </v-row>
        <v-row>
            <FormDesigner
                :store="store"
                @reset="reset"
                @remove="remove"
                @save="save"
            />
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
                    @click="$emit('next')"
                >
                    Continue
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-overlay
        :model-value="loading"
        opacity=".5"
        scrim="#FFF"
    />
</template>

<script>
import FormDesigner from "./FormDesigner.vue";

export default {
    name: 'FormBuilderDesigner',
    components: { FormDesigner },
    props: {
        store: { type: Object, required: true },
    },
    emits: ['next', 'prev', 'remove', 'reset', 'save'],
    options: {
        label: 'Form Designer',
    },
    data: () => ({
        loading: false,
    }),
    created() {
    },
    methods: {
        reset() {
            this.$emit('reset');
        },
        remove(data) {
            this.$emit('remove', data);
        },
        save(data) {
            this.$emit('save', data);
        },
    },
};
</script>
