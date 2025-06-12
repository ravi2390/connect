<template>
    <div :class="className">
        <div
            v-show="!signature"
            class="watermark"
        >
            Sign here
        </div>
        <v-card
            border
            class="below-sig"
        >
            <v-card-text>
                <vue-signature-pad
                    ref="pad"
                    :options="{ onBegin, onEnd, backgroundColor: 'rgba(248,248,252,0.2)' }"
                    height="150px"
                    class="canvas-pad"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    size="small"
                    @click="clear"
                    variant="elevated"
                >
                    Clear
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'MfpSignatureField',
    props: {
        pad: {},
        modelValue: { type: String, default: null },
        itemKey: { type: Number, required: true },
        label: { type: String, default: 'MFP Signature Field' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
        className: { type: String, default: '' },
    },
    emits: ['update:modelValue'],
    data: () => ({
        signature: null,
    }),
    watch: {
        disabled() {
            if (this.disabled) {
                console.log('lock');
                this.$refs.pad.lockSignaturePad();
            } else {
                console.log('open');
                this.$refs.pad.openSignaturePad();
            }
        },
        signature() {
            this.$emit('update:modelValue', this.signature);
        },
    },
    mounted() {
        console.log(this.className);
    },
    methods: {
        onBegin() {

        },
        onEnd() {
            const data = this.$refs.pad.saveSignature();
            if (!data.isEmpty) {
                this.signature = data.data;
            }
        },
        clear() {
            this.$refs.pad.clearSignature();
            this.signature = null;
        },
    },
};
</script>

<style lang="scss">
div:has( > .watermark) {
    position: relative;
}
.watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #666;
    font-size: 32px;
    opacity: 0.5;
    z-index: 1;
}
.canvas-pad {
    canvas {
        border: 2px solid grey;
    }
}
.mfp-signature-field.sig-err canvas,
.signatureOther.sig-err canvas,
.signature.sig-err canvas {
    border-color: rgb(255,82,82);
}
.below-sig {
    box-shadow: none;
    border: none;
}

.mfp-signature-field.sig-err .below-sig .v-alert,
.signatureOther.sig-err .below-sig .v-alert,
.signature.sig-err .below-sig .v-alert {
    border-color: rgb(255,82,82) !important;
    color: rgb(255,82,82) !important;
    caret-color: rgb(255,82,82) !important;
}
</style>
