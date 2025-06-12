<template>
    <v-text-field
        v-model="email"
        :rules="emailRules"
        :disabled="disabled"
        label="E-mail"
        variant="underlined"
        required
    />
</template>

<script>
export default {
    name: 'Email',
    props: {
        disabled: { type: Boolean, default: false },
    },
    data: () => ({
        emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        ],
    }),
    computed: {
        email: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>
