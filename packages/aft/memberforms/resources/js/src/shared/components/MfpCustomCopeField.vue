<template>
    <v-row>
        <v-col
            v-if="designer"
            cols="12"
        >
            <span style="color:red">{{ messageInvalidAmount }}</span>
            <v-textarea
                v-model="copeAmountChoices"
                variant="outlined"
                name="input-textarea"
                label="Enter choices for amount (hit enter to separate choices)"
                class="custom-dues-textarea"
                @update:model-value="handleChange"
                @keydown="choicesKeydown($event)"
            />
        </v-col>
        <v-col
            v-if="!designer"
            cols="12"
        >
            <v-row>
                <v-col class="text-center radio-btn-dues">
                    <v-radio-group
                        v-model="copeAmountSelected"
                        hide-details
                        :rules="customCopeRules"
                        v-on:update:modelValue="handleChange"
                    >
                        <template #label>
                            COPE Amount
                        </template>
                        <v-radio
                            label="$0.00"
                            :value="`0.00`"
                            class="mb-0"
                        />
                        <v-radio
                            :label="'$' + modelValue.copeAmountChoices[n - 1]"
                            :value="modelValue.copeAmountChoices[n - 1]"
                            v-for="n in modelValue.copeAmountChoices.length"
                            :key="modelValue.copeAmountChoices[n - 1]"
                        />
                        <v-radio
                            label="Other"
                            :value="`other`"
                            :rules="customCopeRules"
                            hide-details
                        />
                        <v-text-field
                            v-if="copeAmountSelected=='other'"
                            v-model="copeOtherAmount"
                            prefix="$"
                            variant="underlined"
                            :rules="otherRules"
                            v-on:update:modelValue="handleChange"
                        />
                    </v-radio-group>
                </v-col>
            </v-row>
        </v-col>
        <v-col
            v-if="showSignature"
            cols="12"
        >
            <MfpTextAreaField
                v-model="signatureTextObject.value"
                :field="signatureTextObject"
                :designer="designer"
                class="formHeader"
                v-on:update:modelValue="handleChange"
            />
            <MfpSignatureField
                v-model="signature"
                class="mfp-signature-field"
                :class="classObject"
                :required="field.required"
                :item-key="itemKey"
                v-on:update:modelValue="handleChange"
            />
        </v-col>
    </v-row>
</template>

<script>
import MfpSignatureField from './MfpSignatureField.vue';
import MfpTextAreaField from './MfpTextAreaField.vue';

export default {
    name: 'MfpCustomCope',
    components: { MfpSignatureField, MfpTextAreaField },
    props: {
        modelValue: {
            type: [Object, String],
            default() {
                return {
                    copeAmountChoices: [],
                    copeAmountSelected: '',
                    copeOtherAmount: '',
                    signatureText: '',
                    signature: '',
                    showSignature: true,
                };
            },
        },
        field: { type: Object, required: true },
        label: { type: String, default: 'Cope Amount' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
        itemKey: { type: Number, required: true },
    },
    emits: ['update:modelValue'],
    data: () => ({
        copeAmountSelected: '',
        copeOtherAmount: '',
        copeAmountChoices: '',
        otherRules: [(v) => /(?!0.00)(?=.*?\d)^\$?(([1-9]\d{0,2}(d{3})*)|\d+)?(\.[0-9]{2})?$/.test(v) || 'Please enter a valid amount (00.00)'],
        signatureTextObject: {
            value: '',
            default: '',
        },
        signature: '',
        showSignature: true,
        messageInvalidAmount: '',
    }),
    computed: {
        customCopeRules() {
            if (this.field.required) {
                return [
                    this.copeAmountSelected.length !== 0 || 'At least one item should be selected',
                ];
            }
            return [];
        },
        classObject() {
            return {
                canvasEnabled: this.copeAmountSelected,
            };
        },
    },
    created() {
        this.signatureTextObject.value = this.modelValue.signatureText || this.field.defaultSignatureText;
        if (this.modelValue) {
            if (!this.designer) {
                this.reviseAmountChoices();
            }
            this.copeAmountChoices = this.convertToString(
                this.modelValue.copeAmountChoices,
            );

            if (this.modelValue.hasOwnProperty('showSignature')) {
                this.showSignature = this.modelValue.showSignature;
            }
        }
    },
    methods: {
        reviseAmountChoices() {
            if (this.modelValue.copeAmountChoices.length > 0) {

                for (let index = 0; index < this.modelValue.copeAmountChoices.length; index++) {
                    if (this.modelValue.copeAmountChoices[index] === 'other') {
                        continue;
                    }
                    const amt = parseFloat(this.modelValue.copeAmountChoices[index]);
                    // console.log(amt.toFixed(2).toString());
                    this.modelValue.copeAmountChoices[index] = amt.toFixed(2).toString();
                    // if zero remove all zero inputs
                    if (amt === 0 || Number.isNaN(amt)) {
                        this.modelValue.copeAmountChoices.splice(index, 1);

                        index--;
                    }
                }
            }
        },
        getCopeObject() {
            if (this.copeAmountSelected !== 'other') {
                this.copeOtherAmount = '';
            }
            return {
                copeAmountChoices: this.convertToArray(this.copeAmountChoices),
                copeAmountSelected: this.copeAmountSelected,
                copeOtherAmount: this.copeOtherAmount,
                signatureText: this.signatureTextObject.value,
                signature: this.signature,
            };
        },
        choicesKeydown(e) {
            const arrIgnoreKeys = ['backspace', 'delete', 'shift',
                'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
            if (arrIgnoreKeys.includes(e.key.toLowerCase())) {
                return;
            }
            const regex = /([0-9]|\.)/;
            if (e.key.toLowerCase() !== 'enter' && !regex.test(e.key)) {
                e.preventDefault();
            }
            const arrAmts = this.convertToArray(this.copeAmountChoices);
            const index = arrAmts.length - 1;
            const amt = arrAmts[index];
            this.messageInvalidAmount = '';
            if (amt !== '' && !this.isExpectedAmount(amt, index + 1, e.key)) {

                if (this.messageInvalidAmount === '') {
                    // this.messageInvalidAmount = 'Line ' + index.toString() + ': Enter valid amount';
                    this.messageInvalidAmount = `Line ${index.toString()} : Enter valid amount`;
                }
                e.preventDefault();
            }
        },
        isExpectedAmount(amt, lineNumber, key) {
            /*
            if (!regex.test(amt)) {
                // Use case: 1.1.
                if (amt.endsWith('.') && amt.indexOf('.') === amt.lastIndexOf('.')) {
                    return true;
                } else {
                    this.messageInvalidAmount = 'Line ' + lineNumber + ': ' + 'Enter valid amount'
                }
            }
             */
            // if (amt.endsWith('.') && amt.indexOf('.') !== amt.lastIndexOf('.')) {
            //     // this.messageInvalidAmount = 'Line ' + lineNumber + ': ' + 'Enter valid amount';
            //     this.messageInvalidAmount = `Line ${lineNumber}: Enter valid amount`;
            //     return false;
            // }
            if (key === '.') {
                if (amt && (amt.split('.').length - 1) > 0) {
                    this.messageInvalidAmount = `Line ${lineNumber}: Enter valid amount`;
                    return false;
                }
            }
            if (amt && amt.indexOf('.') >= 0 && (amt.length - (amt.indexOf('.') + 1)) > 2) {
                this.messageInvalidAmount = `Line ${lineNumber}: Enter valid amount with two decimal numbers only`;
                return false;
            }
            return true;
        },
        convertToArray(stringData) {
            if (stringData !== '') {
                return stringData.split('\n').filter(Boolean);
            }
            return [];
        },
        convertToString(arrayData) {
            if (typeof arrayData === 'object') {
                return arrayData.join('\n');
            }
            return '';
        },
        handleChange() {
            this.$emit('update:modelValue', this.getCopeObject());
        }
    },
};
</script>

<style scoped>
.custom-dues-signature > div {
    opacity: 0.2;
    pointer-events: none;
}
.custom-dues-signature > div.canvasEnabled {
    opacity: 1;
    pointer-events: auto;
}
#memberforms .v-card__text .v-input.custom-dues-textarea {
    pointer-events: auto;
}
.radio-btn-dues .v-input--selection-controls {
    margin-top: 8px;
}
</style>
