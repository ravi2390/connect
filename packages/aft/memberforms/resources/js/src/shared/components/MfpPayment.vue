<template>
    <v-row
        v-if="designer"
    >
        <v-col
            class="pa-0 ma-0"
        >
            <p class="font-weight-medium mb-0">
                Enable Payment Methods
            </p>
            <v-btn-toggle
                v-model="paymentMethodsAllowed"
                mandatory
                multiple
                variant="outlined"
                @update:model-value="handleChange"
            >
                <v-btn
                    v-for="paymentMethod in paymentMethods"
                    :key="paymentMethod.value"
                    :value="paymentMethod.value"
                >
                    {{ paymentMethod.text }}
                </v-btn>
            </v-btn-toggle>
            <v-row
                v-if="paymentMethodsAllowed.includes('Credit Card')"
            >
                <v-col
                    cols="12"
                    class="my-8"
                >
                    <p class="mb-4">
                        Select to enable credit card types
                    </p>
                    <v-item-group
                        v-model="cardTypesAllowedIndexes"
                        multiple
                        color="indigo"
                        @update:model-value="handleChange"
                    >
                        <v-item
                            v-slot="{ isSelected, toggle }"
                            v-for="cardType in cardTypes"
                            :key="cardType.value"
                        >
                            <v-btn
                                :class="isSelected ? 'active' : ''"
                                :prepend-icon="`mdi:mdi-${isSelected ? 'check-circle-outline' : 'circle-outline'}`"
                                @click="toggle"
                                variant="tonal"
                                tile
                            >
                                {{ cardType.text }}
                            </v-btn>
                        </v-item>
                    </v-item-group>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <!-- Select Payment Method -->
    <v-row
        v-if="!designer"
        id="paymentForm"
    >
        <v-col cols="12">
            <v-btn-toggle
                v-if="paymentMethodsAllowed.length > 1"
                v-model="paymentMethodSelected"
                mandatory
                variant="outlined"
                @update:model-value="handleChange"
            >
                <v-btn
                    v-for="paymentMethod in paymentMethods"
                    :key="paymentMethod.value"
                    :value="paymentMethod.value"
                >
                    {{ paymentMethod.text }}
                </v-btn>
            </v-btn-toggle>
            <h6 v-else class="mt-4"><em>{{ paymentMethodsAllowed[0] }}</em></h6>
            <!-- Credit Card -->
            <v-card
                flat
                tile
                v-if="isPaymentMethodSelected('Credit Card')"
                class="credit_card_form"
            >
                <v-card-text>
                    <v-text-field
                        id="cardName"
                        v-model="creditCardInformation.cardHolderName"
                        label="Card Holders Name"
                        placeholder="Card Holders Name"
                        variant="underlined"
                        required="true"
                        @update:model-value="handleChange"
                    >
                        <template #label>
                            <span
                                v-if="field.required"
                                class="text-red"
                            >
                                <strong>* </strong>
                            </span>
                            {{ 'Card Holders Name' + (field.required ? ' (required)' : '') }}
                        </template>
                    </v-text-field>
                    <v-row>
                        <v-col cols="12" lg="5">
                            <v-text-field
                                id="cardNumber"
                                v-model="creditCardInformation.cardNumber"
                                :rules="creditCardRules"
                                label="Card Number"
                                placeholder="Card Number"
                                variant="underlined"
                                required="true"
                                clearable
                                @update:model-value="identifyUserCardType();handleChange()"
                            >
                                <template #label>
                                    <span
                                        v-if="field.required"
                                        class="text-red"
                                    >
                                        <strong>* </strong>
                                    </span>
                                    {{ 'Card Number' + (field.required ? ' (required)' : '') }}
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" lg="7">
                            <div class="cc-group">
                                <v-card
                                    v-if="cardTypesAllowedIndexes.includes(0)"
                                    :color="cardTypesAllowedColors[0]"
                                    :dark="cardTypesAllowedColors[0] == '#385F73'"
                                    width="60"
                                    class="mr-2"
                                >
                                    <v-img
                                        :src="logoVisa"
                                    />
                                </v-card>
                                <v-card
                                    v-if="cardTypesAllowedIndexes.includes(1)"
                                    :color="cardTypesAllowedColors[1]"
                                    :dark="cardTypesAllowedColors[1] == '#385F73'"
                                    width="60"
                                    class="mr-2"
                                >
                                    <v-img
                                        :src="logoMasterCard"
                                    />
                                </v-card>
                                <v-card
                                    v-if="cardTypesAllowedIndexes.includes(2)"
                                    :color="cardTypesAllowedColors[2]"
                                    :dark="cardTypesAllowedColors[2] == '#385F73'"
                                    width="60"
                                    class="mr-2"
                                >
                                    <v-img
                                        :src="logoDiscover"
                                    />
                                </v-card>
                                <v-card
                                    v-if="cardTypesAllowedIndexes.includes(3)"
                                    :color="cardTypesAllowedColors[3]"
                                    :dark="cardTypesAllowedColors[3] == '#385F73'"
                                    width="60"
                                    class="mr-2"
                                >
                                    <v-img
                                        :src="logoAmex"
                                    />
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" lg="6">
                            <v-text-field
                                ref="expMenu"
                                v-model="creditCardInformation.exp"
                                :rules="rules"
                                label="Expiration Date"
                                placeholder="MM-YYYY"
                                variant="underlined"
                                hint="MM-YYYY"
                                prepend-icon="mdi:mdi-calendar"
                                required="true"
                                clearable
                                :onkeyup="formatExpDate()"
                                @update:model-value="handleChange"
                            >
                                <template #label>
                                    <span
                                        v-if="field.required"
                                        class="text-red"
                                    >
                                        <strong>* </strong>
                                    </span>
                                    {{ 'Expiration Date' + (field.required ? ' (required)' : '') }}
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field
                                id="cvvNumber"
                                v-model="creditCardInformation.cvv"
                                :rules="cvvRules"
                                label="CVV Number"
                                data-ref="cvvNumber"
                                placeholder="CVV Number"
                                variant="underlined"
                                autocomplete="off"
                                :minlength="3"
                                :maxlength="4"
                                clearable
                                required="true"
                                @update:model-value="handleChange"
                            >
                                <template #label>
                                    <span
                                        v-if="field.required"
                                        class="text-red"
                                    >
                                        <strong>* </strong>
                                    </span>
                                    {{ 'CVV Number' + (field.required ? ' (required)' : '') }}
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <!-- Bank Draft -->
            <v-card
                flat
                tile
                v-if="isPaymentMethodSelected('Bank Draft')"
                class="bank_draft_form"
            >
                <v-card-text>
                    <div class="d-flex justify-start">
                        <v-radio-group
                            v-model="bankDraftInformation.accountType"
                            mandatory
                            inline
                        >
                            <v-radio
                                label="Checking"
                                value="checking"
                                name="checking"
                            />
                            <v-radio
                                label="Savings"
                                value="savings"
                                name="savings"
                            />
                        </v-radio-group>
                    </div>
                    <v-text-field
                        id="accountHolderName"
                        v-model="bankDraftInformation.accountHolderName"
                        label="Account Holder Name"
                        placeholder="Account Holder Name"
                        variant="underlined"
                        @update:model-value="handleChange"
                    >
                        <template #label>
                            <span
                                v-if="field.required"
                                class="text-red"
                            >
                                <strong>* </strong>
                            </span>
                            {{ 'Account Holder Name' + (field.required ? ' (required)' : '') }}
                        </template>
                    </v-text-field>
                    <v-text-field
                        id="routingNumber"
                        name="Routing Number"
                        v-model="bankDraftInformation.routingNumber"
                        :rules="routingRules"
                        label="Routing Number"
                        placeholder="Routing Number"
                        variant="underlined"
                        autocomplete="off"
                        clearable
                        maxlength="9"
                        @update:model-value="handleChange"
                    >
                        <template #label>
                            <span
                                v-if="field.required"
                                class="text-red"
                            >
                                <strong>* </strong>
                            </span>
                            {{ 'Routing Number' + (field.required ? ' (required)' : '') }}
                        </template>
                    </v-text-field>
                    <v-text-field
                        id="accountNumber"
                        name="Account Number"
                        v-model="bankDraftInformation.accountNumber"
                        :rules="accountRules"
                        label="Account Number"
                        placeholder="Account Number"
                        variant="underlined"
                        autocomplete="off"
                        :minlength="1"
                        :maxlength="17"
                        clearable
                        @update:model-value="handleChange"
                    >
                        <template #label>
                            <span
                                v-if="field.required"
                                class="text-red"
                            >
                                <strong>* </strong>
                            </span>
                            {{ 'Account Number' + (field.required ? ' (required)' : '') }}
                        </template>
                    </v-text-field>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import logoVisa from '../../../../images/cc/cc-visa.png';
import logoMasterCard from '../../../../images/cc/cc-mastercard.png';
import logoDiscover from '../../../../images/cc/cc-discover.png';
import logoAmex from '../../../../images/cc/cc-amex.png';
// visa =           4[0-9]{12}(?:[0-9]{3})
// mastercard =     5[1-5][0-9]{14}
// amex =           3[47][0-9]{13}
// discover =       6(?:011|5[0-9][0-9])[0-9]{12}
// const ccValidation = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;
export default {
    name: 'MfpPayment',
    props: {
        type: {
            type: [String, Object, Array],
            default: '',
        },
        modelValue: {
            type: [Object, String],
            default: '',
        },
        label: { type: String, default: 'MFP Custom Payment' },
        field: { type: Object, default: () => {} },
        required: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        paymentMethods: [
            { value: 'Bank Draft', text: 'Bank Draft' },
            { value: 'Credit Card', text: 'Credit Card' },
        ],
        cardTypes: [
            { value: 'Visa', text: 'Visa' },
            { value: 'Master Card', text: 'Master Card' },
            { value: 'Discover', text: 'Discover' },
            { value: 'Amex', text: 'Amex' },
        ],
        paymentMethodSelected: 'Bank Draft',
        paymentMethodsAllowed: ['Bank Draft'],
        cardTypesAllowedIndexes: [0, 1, 2, 3],
        creditCardInformation: {
            cardHolderName: '',
            cardNumber: '',
            exp: '',
            cvv: '',
        },
        bankDraftInformation: {
            accountType: '',
            accountHolderName: '',
            routingNumber: '',
            accountNumber: '',
        },
        cardTypesAllowedColors: [
            '#6d93a6',
            '#6d93a6',
            '#6d93a6',
            '#6d93a6',
        ],
        selectPayment: false,
        activePicker: null,
        expDate: null,
        expDateFormatted: null,
        expMenu: false,
        minDate: null,
        rules: [],
        creditCardRules: [
            (v) => !!v || 'This field is required',
            (v) => /^\d+$/.test(v) || 'This field allows numbers only',
            // (v) => ccValidation.test(v) || 'Please enter a valid credit card number (no spaces)',
        ],
        cvvRules: [
            (v) => !!v || 'This field is required',
            (v) => /[0-9]{3,4}/.test(v) || 'This field allows numbers only',
        ],
        routingRules: [
            (v) => !!v || 'This field is required',
            (v) => /[0-9]{8,9}/.test(v) || 'This field allows numbers only',
        ],
        accountRules: [
            (v) => !!v || 'This field is required',
            (v) => /^\d{1,17}$/.test(v) || 'This field allows numbers only',
        ],
        logoAmex,
        logoDiscover,
        logoMasterCard,
        logoVisa,
    }),
    computed: {
        checkboxRules() {
            return [
                this.paymentMethodsAllowed.length > 0 || 'At least one item should be selected',
            ];
        },
    },
    watch: {
        expDate() {
            this.expDateFormatted = this.formatDate(this.expDate);
        },
        expMenu(val) {
            if (val) {
                setTimeout(() => {
                    this.activePicker = 'YEAR';
                }, 0);
            }
        },
    },
    mounted() {
        this.rules.push((v) => (!v || /^(\d{2})-(\d{4})+$/.test(v)) || 'Date must be valid (MM-YYYY)');
        this.creditCardRules.push((v) => (!v || this.checkCreditCard(v, false).success)
            || 'Please enter a valid credit card number (no spaces)');
        this.creditCardRules.push((v) => (this.userCardTypeAllowed(v))
            || 'Please enter a valid credit card number for the allowed card type (no spaces)');

        if (this.modelValue?.PaymentMethodsAllowed) {
            this.paymentMethodsAllowed = this.modelValue.PaymentMethodsAllowed;
            if (this.modelValue.PaymentMethodsAllowed.length === 1) {
                this.paymentMethodSelected = this.modelValue.PaymentMethodsAllowed[0];
            }
            this.cardTypesAllowedIndexes = this.modelValue.CardTypesAllowed;
        }
    },
    methods: {
        formatExpDate() {
            const ele = this.creditCardInformation.exp;
            const x = ele.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})/);
            this.creditCardInformation.exp = !x[2] ? x[1] : `${x[1]}-${x[2]}`;
            return this.creditCardInformation.exp;
        },
        formatDate(expDate) {
            if (!expDate) return null;
            const [year, month] = expDate.split('-');
            this.creditCardInformation.exp = `${month}-${year}`;
            return this.creditCardInformation.exp;
        },
        handleChange() {
            this.$emit('update:modelValue', this.getPaymentInformationObject());
        },
        save(expDate) {
            // this.$emit('input', expDate);
            this.$refs.expMenu.save(expDate);
        },
        getPaymentInformationObject() {
            if (!this.designer) {
                if (this.paymentMethodSelected === 'Credit Card') {
                    this.clearBankDraftInfo();
                } else if (this.paymentMethodSelected === 'Bank Draft') {
                    this.clearCreditCardInfo();
                }
            }

            return {
                PaymentMethodSelected: this.paymentMethodSelected,
                PaymentMethodsAllowed: this.paymentMethodsAllowed,
                CardTypesAllowed: this.cardTypesAllowedIndexes,
                CreditCardInformation: this.creditCardInformation,
                BankDraftInformation: this.bankDraftInformation,
            }
        },
        isPaymentMethodSelected(paymentMethod) {
            if (!this.paymentMethodsAllowed.includes(paymentMethod)) {
                return false;
            }
            return this.paymentMethods.length === 1 || this.paymentMethodSelected === paymentMethod;
        },
        clearCreditCardInfo() {
            this.creditCardInformation.cardHolderName = '';
            this.creditCardInformation.cardNumber = '';
            this.creditCardInformation.exp = '';
            this.creditCardInformation.cvv = '';
        },
        clearBankDraftInfo() {
            this.bankDraftInformation.accountType = '';
            this.bankDraftInformation.accountHolderName = '';
            this.bankDraftInformation.routingNumber = '';
            this.bankDraftInformation.accountNumber = '';
        },
        identifyUserCardType() {
            if (this.creditCardInformation.cardNumber.length >= 0
                && this.creditCardInformation.cardNumber.length < 6) {

                for (let i = 0; i < this.cardTypesAllowedColors.length; i++) {
                    this.cardTypesAllowedColors[i] = '#6d93a6';
                }
            }

            if (this.creditCardInformation.cardNumber.length > 0
                && this.creditCardInformation.cardNumber.length < 6) {
                const card = this.checkCreditCard(this.creditCardInformation.cardNumber, true);
                // console.log(card);

                if (card && card.success) {
                    const userCardIndex = this.cardTypes.map((e) => e.value).indexOf(card.type);
                    this.cardTypesAllowedColors[userCardIndex] = '#385F73';
                }
            }
        },
        validateCardNumber(cardNumber) {
            // Check if the number contains only numeric value
            // and is of between 13 to 19 digits
            const regex = new RegExp('^[0-9]{13,19}$');
            if (!regex.test(cardNumber)) {
                return false;
            }

            return this.luhnCheck(cardNumber);
        },
        luhnCheck(val) {
            let checksum = 0; // running checksum total
            let j = 1; // takes value of 1 or 2

            // Process each digit one by one starting from the last

            for (let i = val.length - 1; i >= 0; i--) {
                let calc = 0;
                // Extract the next digit and multiply by 1 or 2 on alternative digits.
                calc = Number(val.charAt(i)) * j;

                // If the result is in two digits add 1 to the checksum total
                if (calc > 9) {

                    checksum++;

                    calc = calc - 10;
                }

                // Add the units element to the checksum total

                checksum = checksum + calc;

                // Switch the value of j
                if (j === 1) {
                    j = 2;
                } else {
                    j = 1;
                }
            }

            // Check if it is divisible by 10 or not.
            return (checksum % 10) === 0;
        },
        userCardTypeAllowed(cardNumber) {
            const response = this.checkCreditCard(cardNumber, true);
            const userCardTypeIndex = this.cardTypes.map((type) => type.value).indexOf(response.type);
            return this.cardTypesAllowedIndexes.includes(userCardTypeIndex);
        },
        checkCreditCard(cardNumber, onlyPrefixCheck) {
            // Error messages
            const ccErrors = [];
            ccErrors[0] = 'Unknown card type';
            ccErrors[1] = 'No card number provided';
            ccErrors[2] = 'Credit card number is in invalid format';
            ccErrors[3] = 'Credit card number is invalid';
            ccErrors[4] = 'Credit card number has an inappropriate number of digits';
            ccErrors[5] = 'Warning! This credit card number is associated with a scam attempt';

            // Response format
            const response = (success, message = null, type = null) => ({
                message,
                success,
                type,
            });

            // Define the cards we support. You may add additional card types as follows.

            //  Name:         As in the selection box of the form - must be same as user's
            //  Length:       List of possible valid lengths of the card number for the card
            //  prefixes:     List of possible prefixes for the card
            //  checkdigit:   Boolean to say whether there is a check digit
            const cards = [];
            cards[0] = {
                name: this.cardTypes[0].value,
                length: '13,16',
                prefixes: '4',
                checkdigit: true,
            };
            cards[1] = {
                name: this.cardTypes[1].value,
                length: '16',
                prefixes: '51,52,53,54,55',
                checkdigit: true,
            };
            cards[2] = {
                name: this.cardTypes[2].value,
                length: '16',
                prefixes: '6011,622,64,65',
                checkdigit: true,
            };
            cards[3] = {
                name: this.cardTypes[3].value,
                length: '15',
                prefixes: '34,37',
                checkdigit: true,
            };

            // Ensure that the user has provided a credit card number
            if (cardNumber.length === 0) {
                return response(false, ccErrors[1]);
            }

            // Now remove any spaces from the credit card number
            // Update this if there are any other special characters like -

            cardNumber = cardNumber.replace(/\s/g, '');

            if (!onlyPrefixCheck) {
                // Validate the format of the credit card
                // luhn's algorithm
                if (!this.validateCardNumber(cardNumber)) {
                    return response(false, ccErrors[2]);
                }
            }

            // Check it's not a spam number
            if (cardNumber === '5490997771092064') {
                return response(false, ccErrors[5]);
            }

            // The following are the card-specific checks we undertake.
            let lengthValid = false;
            let prefixValid = false;
            let cardCompany = '';

            // Check if card belongs to any organization

            for (let i = 0; i < cards.length; i++) {
                const prefix = cards[i].prefixes.split(',');

                for (let j = 0; j < prefix.length; j++) {

                    const exp = new RegExp('^' + prefix[j]);
                    if (exp.test(cardNumber)) {
                        prefixValid = true;
                        if (onlyPrefixCheck) {
                            cardCompany = cards[i].name;
                            return response(true, null, cardCompany);
                        }
                    }
                }

                if (prefixValid) {
                    const lengths = cards[i].length.split(',');
                    // Now see if its of valid length;

                    for (let j = 0; j < lengths.length; j++) {
                        if (cardNumber.length === parseInt(lengths[j], 10)) {
                            lengthValid = true;
                        }
                    }
                }

                if (lengthValid && prefixValid) {
                    cardCompany = cards[i].name;
                    return response(true, null, cardCompany);
                }
            }

            // If it isn't a valid prefix there's no point at looking at the length
            if (!prefixValid) {
                return response(false, ccErrors[3]);
            }

            // See if all is OK by seeing if the length was valid
            if (!lengthValid) {
                return response(false, ccErrors[4]);
            }

            // The credit card is in the required format.
            return response(true, null, cardCompany);
        },
    },
};
</script>

<style lang="scss">
.payment-types {
    width: 100%;
    .v-list-item {
        display: inline-flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        width: 23%;
        flex: none;
        text-align: center;
        border: 1px solid rgba(0,0,0,.88);
        &.v-item--active {
            border: 1px solid rgb(10, 42, 92);
            .v-list-item__title {
                color: rgba(10, 42, 92);
            }
        }
        &.v-list-item--link.theme--light {
            margin-left: 1%;
        }
        .v-list-item__title {
            color: rgba(0,0,0,.38);
        }
    }
}
.cc-group {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    .theme--light {
        opacity: 0.5
    }
    .theme--dark {
        opacity: 1;
    }
}
.acc-type {
    button {
        &.active {
            background: #0A2A5C;
            .v-btn__content {
                color: white;
            }
        }
    }
}
.v-btn-toggle {
    &> .v-btn.spm-btn {
        border-radius: 0 !important;
        &.v-btn:not(:first-child) {
            border-left-width: 1px;
        }
    }
}
</style>
