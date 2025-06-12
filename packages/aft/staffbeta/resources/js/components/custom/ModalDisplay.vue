<template>
    <b-modal
        :id="name"
        :title="title"
        centered
        size="xl"
        @hidden="shown = false"
    >
        <slot name="content" v-bind:content="content" />
    </b-modal>
</template>

<script>
export default {
    name: 'ModalDisplay',
    props: {
        value: { type: Boolean, default: false },
        name: { type: String, required: true },
        title: { type: String, required: true },
        loading: { type: Boolean, default: false },
        content: { type: Object, required: true },
    },
    data: () => ({
        shown: false,
    }),
    watch: {
        value: function (value) {
            this.shown = value;
        },
        shown: function (value, prev) {
            if (value) {
                this.$bvModal.show(this.name);
                this.$emit('shown', value, prev);
            } else {
                this.$bvModal.hide(this.name);
                this.$emit('hidden', value, prev);
            }
        },
    },
};
</script>
