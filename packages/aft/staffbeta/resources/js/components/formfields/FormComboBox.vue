<template>
    <div class="input-group mb-3">
        <div v-if="prefixIcon" class="input-group-prepend">
            <span class="input-group-text" data-toggle="tooltip" data-placement="auto" :title="label">
                <i :class="[iconStyle, prefixIcon]" class="fa-fw" />
            </span>
        </div>
        <div v-if="prefixText" class="input-group-prepend">
            <span class="input-group-text" data-toggle="tooltip" data-placement="auto" :title="label">
                <i :class="iconStyle" class="fa-fw fa-ignore">{{ prefixText }}</i>
            </span>
        </div>
        <b-form-select
            v-model="selected"
            :options="items"
            :value-field="itemKey"
            :text-field="itemText"
        />
    </div>
</template>

<script>

export default {
    name: 'FormComboBox',
    props: {
        value: { required: true },
        callback: { type: Function },
        label: { type: String, required: true },
        iconStyle: { type: String, default: 'fas' },
        loading: { type: Boolean, default: false },
        classes: { type: String, default: '' },
        prefixIcon: String,
        prefixText: String,
        tabindex: { type: Number },
        items: { type: Array, required: true },
        itemKey: { type: String, required: true },
        itemText: { type: String, required: true },
    },
    data: () => ({
        selected: null,
    }),
    watch: {
        value: function (value) {
            this.selected = value;
        },
        selected: function (value, prev) {
            this.$emit('input', value, prev);
        },
    },
};
</script>
