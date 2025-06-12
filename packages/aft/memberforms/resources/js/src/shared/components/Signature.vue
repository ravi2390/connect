<template>
    <div class="wrapper">
        <label for="signature">
            Please Sign
        </label>
        <div class="signature-wrapper">
            <canvas
                id="signature-pad"
                ref="signature"
                class="signature-pad"
                width="400"
                height="200"
            />
            <button
                type="button"
                class="btn btn-light signature-clear"
                @click="clear"
            >
                Clear
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SignatureComponent',
    emits: ['update:modelValue'],
    data: () => ({
        windowWidth: 0,
        canvas: null,
        pad: null,
    }),
    mounted() {
        //
    },
    methods: {
        clear() {
            this.pad.clear();
        },
        updateSignature() {
            this.$emit('update:modelValue', this.pad.toDataURL());
        },
    },
};
</script>

<style scoped>
    div.signature-wrapper {
        position: relative;
    }
    button.signature-clear {
        position: relative;
        margin: 5px;
    }
    .signature-pad {
        position: absolute;
        left: 0;
        top: 0;
        width:400px;
        height:200px;
        border: 2px solid black;
    }
    .wrapper {
        position: relative;
        width: 400px;
        height: 200px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
