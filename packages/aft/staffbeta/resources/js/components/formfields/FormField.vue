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

        <input
            v-if="type === 'text'"
            v-bind:value="value"
            type="text"
            class="form-control"
            data-toggle="tooltip"
            data-placement="auto"
            autocomplete="ignore"
            :placeholder="label"
            :title="label"
            :disabled="loading"
            :tabindex="tabindex < 0 ? 9999 : null"
            @input="$emit('input', $event.target.value)"
        >

        <input
            v-if="type === 'email'"
            v-bind:value="value"
            class="form-control"
            type="email"
            data-toggle="tooltip"
            data-placement="auto"
            autocomplete="ignore"
            :placeholder="label"
            :title="label"
            :disabled="loading"
            :tabindex="tabindex < 0 ? 9999 : null"
            @input="$emit('input', $event.target.value)"
        >

        <button
            v-if="type === 'button'"
            :type="submit ? 'submit' : 'button'"
            class="btn btn-block"
            :class="classes"
            :disabled="loading"
            :tabindex="tabindex < 0 ? 9999 : null"
            @click="doCallback()"
        >
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            {{ label }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'FormField',
    props: {
        value: { type: String },
        callback: { type: Function },
        type: { type: String, required: true },
        label: { type: String, required: true },
        iconStyle: { type: String, default: 'fas' },
        loading: { type: Boolean, default: false },
        classes: { type: String, default: '' },
        submit: { type: Boolean, default: false },
        prefixIcon: String,
        prefixText: String,
        tabindex: { type: Number },
    },
    methods: {
        doCallback() {
            if (this.callback) {
                this.callback();
            }
        },
    },
};
</script>
