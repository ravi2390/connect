<template>
    <FormBuilder
        :steps="steps"
        :show-prev-next="false"
    />
</template>

<script>
import FormBuilder from './components/builder/FormBuilder.vue';
import FormBuilderTemplateChooser from './components/builder/FormBuilderTemplateChooser.vue';
import FormBuilderSettings from './components/builder/FormBuilderSettings.vue';
import FormBuilderDuesCategories from './components/builder/FormBuilderDuesCategories.vue';
import FormBuilderDesigner from './components/builder/FormBuilderDesigner.vue';
import FormBuilderReview from './components/builder/FormBuilderReview.vue';
import FormBuilderConfirmation from './components/builder/FormBuilderConfirmation.vue';

export default {
    name: 'PageCreateForm',
    components: { FormBuilder },
    data: () => ({
        step: 1,
        steps: [
            { step: 1, ...FormBuilderTemplateChooser.options, component: 'FormBuilderTemplateChooser' },
            { step: 2, ...FormBuilderSettings.options, component: 'FormBuilderSettings' },
            { step: 3, ...FormBuilderDuesCategories.options, component: 'FormBuilderDuesCategories' },
            { step: 4, ...FormBuilderDesigner.options, component: 'FormBuilderDesigner' },
            { step: 5, ...FormBuilderConfirmation.options, component: 'FormBuilderConfirmation' },
            { step: 6, ...FormBuilderReview.options, component: 'FormBuilderReview' },
        ],
    }),
};
</script>
