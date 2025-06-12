<template>
    <v-container
        fluid
        class="select-payment"
    >
        <v-form
            ref="form"
            v-model="formValid"
            autocomplete="off"
            class="v-form"
        >
            <!-- Select Payment Method -->
            <v-row
                id="payemntForm"
            >
                <v-col cols="12">
                    <v-card
                        flat
                        tile
                    >
                        <v-row
                            align="center"
                            justify="center"
                        >
                            <v-col
                                cols="12"
                                class="ma-0"
                            >
                                <v-btn-toggle
                                    v-model="paymentMethodSelectedIndex"
                                    mandatory
                                    class="d-flex justify-center"
                                    @update:model-value="showPaymentMethodAlert()"
                                >
                                    <v-btn
                                        id="bd-enab"
                                        variant="outlined"
                                        color="indigo"
                                        class="ma-2 spm-btn"
                                    >
                                        {{ paymentMethods[0].text }}
                                    </v-btn>
                                    <v-btn
                                        id="cc-enab"
                                        variant="outlined"
                                        color="indigo"
                                        class="ma-2 spm-btn"
                                    >
                                        {{ paymentMethods[1].text }}
                                    </v-btn>
                                </v-btn-toggle>
                                <v-dialog
                                    v-model="dialogPaymentMethod"
                                    persistent
                                    max-width="350"
                                >
                                    <v-card>
                                        <v-card-title class="text-h6">
                                            <span>Payment Method</span>
                                        </v-card-title>
                                        <v-card-text class="text-subtitle-1">
                                            {{individual.FirstName}} {{individual.LastName}} is currently using {{paymentMethods[billhighwayPaymentMethodIndex].value}}.
                                            Do you wish to use {{paymentMethods[paymentMethodSelectedIndex].value}} as payment method for this individual?
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                elevation="2"
                                                color="error"
                                                class="px-4"
                                                @click="noPaymentMethodAlert"
                                            >
                                                No
                                            </v-btn>
                                            <v-btn
                                                elevation="2"
                                                color="success"
                                                class="px-4"
                                                @click="yesPaymentMethodAlert"
                                            >
                                                Yes
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <!-- Credit Card -->
                <v-col
                    v-if="paymentMethods[paymentMethodSelectedIndex].value === 'Credit Card'"
                    class="credit_card_form"
                >
                    <v-card
                        flat
                        tile
                    >
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    id="cardName"
                                    v-model="creditCardInformation.cardHolderName"
                                    label="Card Holders Name"
                                    placeholder="Card Holders Name"
                                    required="true"
                                    @update:model-value="$emit('input', getPaymentInformationObject())"
                                >
                                    <template #label>
                                        <span
                                            v-if="required"
                                            class="text-red"
                                        >
                                            <strong>* </strong>
                                        </span>
                                        {{ 'Card Holders Name' + (required ? ' (required)' : '') }}
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col
                                cols="12" lg="5"
                            >
                                <v-text-field
                                    id="cardNumber"
                                    v-model="creditCardInformation.cardNumber"
                                    :rules="creditCardRules"
                                    label="Card Number"
                                    placeholder="Card Number"
                                    required="true"
                                    clearable
                                    @update:model-value="identifyUserCardType();$emit('input', getPaymentInformationObject())"
                                >
                                    <template #label>
                                        <span
                                            v-if="required"
                                            class="text-red"
                                        >
                                            <strong>* </strong>
                                        </span>
                                        {{ 'Card Number' + (required ? ' (required)' : '') }}
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col
                                cols="12" lg="7"
                            >
                                <div class="cc-group">
                                    <v-card
                                        v-if="cardTypesAllowedIndexes.includes(0)"
                                        :color="cardTypesAllowedColors[0]"
                                        :dark="cardTypesAllowedColors[0] == '#385F73'"
                                        width="60"
                                        class="mr-2"
                                    >
                                        <v-img
                                            src="/vendor/memberforms/images/cc/cc-visa.png"
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
                                            src="/vendor/memberforms/images/cc/cc-mastercard.png"
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
                                            src="/vendor/memberforms/images/cc/cc-discover.png"
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
                                            src="/vendor/memberforms/images/cc/cc-amex.png"
                                        />
                                    </v-card>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12" lg="6"
                            >
                                <v-text-field
                                    id="cvvNumber"
                                    ref="expMenu"
                                    v-model="creditCardInformation.exp"
                                    :rules="rules"
                                    label="Expiration Date"
                                    placeholder="MM-YYYY"
                                    hint="MM-YYYY"
                                    prepend-icon="mdi:mdi-calendar"
                                    required="true"
                                    clearable
                                    maxlength="7"
                                    :onkeyup="formatExpDate()"
                                    @update:model-value="$emit('input', getPaymentInformationObject())"
                                >
                                    <template #label>
                                        <span
                                            v-if="required"
                                            class="text-red"
                                        >
                                            <strong>* </strong>
                                        </span>
                                        {{ 'Expiration Date' + (required ? ' (required)' : '') }}
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col
                                cols="12" lg="6"
                            >
                                <v-text-field
                                    id="cvvNumber"
                                    v-model="creditCardInformation.cvv"
                                    :rules="cvvRules"
                                    label="CVV Number"
                                    data-ref="cvvNumber"
                                    placeholder="CVV Number"
                                    autocomplete="off"
                                    :minlength="3"
                                    :maxlength="4"
                                    clearable
                                    required="true"
                                    @update:model-value="$emit('input', getPaymentInformationObject())"
                                >
                                    <template #label>
                                        <span
                                            v-if="required"
                                            class="text-red"
                                        >
                                            <strong>* </strong>
                                        </span>
                                        {{ 'CVV Number' + (required ? ' (required)' : '') }}
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <!-- Bank Draft -->
                <v-col
                    v-else-if="paymentMethods[paymentMethodSelectedIndex].value === 'Bank Draft'"
                    class="bank_draft_form"
                >
                    <v-card
                        flat
                        tile
                    >
                        <div
                            class="d-flex justify-start"
                            flat
                            tile
                        >
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
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                id="accountHolderName"
                                v-model="bankDraftInformation.accountHolderName"
                                label="Account Holder Name"
                                placeholder="Account Holder Name"
                                @update:model-value="$emit('input', getPaymentInformationObject())"
                            >
                                <template #label>
                                    <span
                                        v-if="required"
                                        class="text-red"
                                    >
                                        <strong>* </strong>
                                    </span>
                                    {{ 'Account Holder Name' + (required ? ' (required)' : '') }}
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                id="routingNumber"
                                v-model="bankDraftInformation.routingNumber"
                                :rules="routingRules"
                                label="Routing Number"
                                placeholder="Routing Number"
                                name="Routing Number"
                                autocomplete="off"
                                clearable
                                maxlength="9"
                                @update:model-value="$emit('input', getPaymentInformationObject())"
                            >
                                <template #label>
                                    <span
                                        v-if="required"
                                        class="text-red"
                                    >
                                        <strong>* </strong>
                                    </span>
                                    {{ 'Routing Number' + (required ? ' (required)' : '') }}
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                id="accountNumber"
                                v-model="bankDraftInformation.accountNumber"
                                :rules="accountRules"
                                label="Account Number"
                                placeholder="Account Number"
                                name="Account Number"
                                autocomplete="off"
                                :minlength="1"
                                :maxlength="17"
                                clearable
                                @update:model-value="$emit('input', getPaymentInformationObject())"
                            >
                                <template #label>
                                    <span
                                        v-if="required"
                                        class="text-red"
                                    >
                                        <strong>* </strong>
                                    </span>
                                    {{ 'Account Number' + (required ? ' (required)' : '') }}
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
            <div
                v-show="loading"
                class="payment-loader"
            >
                <v-progress-circular
                    indeterminate
                    color="primary"
                />
            </div>
        </v-form>
        <v-row>
            <v-col cols="12" lg="6" offset="6" class="text-right hidden-md-and-down">
                <v-btn class="px-4" @click="cancelPaymentUpdate">Cancel</v-btn>
                <v-btn
                    :disabled="!formValid"
                    color="success"
                    class="px-4"
                    @click="submit"
                >
                    Save
                </v-btn>
            </v-col>

            <v-col class="hidden-lg-and-up">
                <v-btn class="px-4" @click="cancelPaymentUpdate">Cancel</v-btn>
                <v-btn
                    :disabled="!formValid"
                    color="success"
                    class="px-4"
                    @click="submit"
                >
                    Save
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialogSuccess"
            persistent
            max-width="350"
        >
            <v-card>
                <v-card-title class="text-h6">
                    Payment Information
                </v-card-title>
                <v-card-text class="text-subtitle-1">
                    Updated successfully!
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        elevation="2"
                        color="primary"
                        class="px-4"
                        @click="reloadPage"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogError"
            persistent
            max-width="350"
        >
            <v-card>
                <v-card-title class="text-h6 text-white bg-error">
                    Invalid Payment Information
                </v-card-title>
                <v-card-text class="text-subtitle-1 py-3 ">
                    {{ errorMessage }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        elevation="2"
                        color="error"
                        class="px-4"
                        @click="dialogError = false;"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import axios from 'axios';
import { debounce } from 'lodash-es';
import contactsMixin from "../../../../mixins/UI/contactsMixin";
// visa =           4[0-9]{12}(?:[0-9]{3})
// mastercard =     5[1-5][0-9]{14}
// amex =           3[47][0-9]{13}
// discover =       6(?:011|5[0-9][0-9])[0-9]{12}
// const ccValidation = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;
export default {
    name: 'EditEduesPaymentComponent',
    props: {
        individual: {
            type: Object,
            required: true
        },
        billHighwayData: {
            type: Array,
            required: true
        },
        flipped: { type: Boolean, default: false },
        type: {
            type: [String, Object, Array],
            default: '',
        },
        value: {
            type: [Object, String],
            default: '',
        },
        label: { type: String, default: 'MFP Custom Payment' },
        field: { type: Object, default: () => {} },
        required: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
    },
    mixins: [contactsMixin],
    emits: ['input'],
    data: () => ({
        formValid: true,
        form: {},
        disableButton: false,
        errorResponse: null,
        errorMessage: '',
        dialogSuccess: false,
        dialogError: false,
        affiliateId: null,
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
        paymentMethodSelectedIndex: 0,
        paymentMethodsAllowed: ['Bank Draft'],
        billhighwayPaymentMethodIndex: 0,
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
        loading: false,
        dialogPaymentMethod: false,
    }),
    created() {
        this.affiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
    },
    computed: {

    },
    watch: {
        paymentMethodsAllowed() {
            this.change();
        },
        cardTypesAllowed() {
            this.change();
        },
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

        if (this.value.PaymentMethodsAllowed) {
            this.paymentMethodsAllowed = this.value.PaymentMethodsAllowed;
            this.cardTypesAllowedIndexes = this.value.CardTypesAllowed;
        }

        const autoPayInfo = this.getBillhighwayAutoPayInfo();
        if (autoPayInfo && autoPayInfo.PaymentMethod === 'Credit Card') {
            this.billhighwayPaymentMethodIndex = this.paymentMethodSelectedIndex = 1;
        }

        this.change = debounce(() => {
            this.$emit('input', this.getPaymentInformationObject());
        }, 500);
    },
    methods: {
        validate() {
            this.$refs.form.validate();
        },
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
        save(expDate) {
            // this.$emit('input', expDate);
            this.$refs.expMenu.save(expDate);
        },
        getBillhighwayAutoPayInfo() {
            if (this.billHighwayData && this.billHighwayData.length > 0 && this.billHighwayData[0][1]) {
                return this.billHighwayData[0][1].AutoPayInfo;
            }
            return null;
        },
        showPaymentMethodAlert() {
            // console.log('this.dialogPaymentMethod', this.dialogPaymentMethod);
            if (this.billhighwayPaymentMethodIndex !== this.paymentMethodSelectedIndex) {
                this.dialogPaymentMethod = true;
                //console.log('this.dialogPaymentMethod', this.dialogPaymentMethod);
            }
        },
        noPaymentMethodAlert() {
            //this.$nextTick(async () => {
                this.dialogPaymentMethod = false;
                this.paymentMethodSelectedIndex = this.billhighwayPaymentMethodIndex;
                this.$emit('input', this.getPaymentInformationObject());
            //});
        },
        yesPaymentMethodAlert() {
            //this.$nextTick(async () => {
                this.dialogPaymentMethod = false;
                this.$emit('input', this.getPaymentInformationObject());
            //});
        },
        getPaymentInformationObject() {
            const paymentInfoObject = {
                PaymentMethodsAllowed: this.paymentMethodsAllowed,
                CardTypesAllowed: this.cardTypesAllowedIndexes,
            };

            paymentInfoObject.PaymentMethodSelected = this.paymentMethods[this.paymentMethodSelectedIndex].value;
            if (this.paymentMethods[this.paymentMethodSelectedIndex].value === 'Credit Card') {
                this.clearBankDraftInfo();
                paymentInfoObject.CreditCardInformation = this.creditCardInformation;
            } else if (this.paymentMethods[this.paymentMethodSelectedIndex].value === 'Bank Draft') {
                this.clearCreditCardInfo();
                paymentInfoObject.BankDraftInformation = this.bankDraftInformation;
            }

            return paymentInfoObject;
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
        cancelPaymentUpdate() {
            this.clearCreditCardInfo();
            this.clearBankDraftInfo();
            this.$emit('cancel-edit-payment');
            setTimeout(this.$refs.form.resetValidation(), 5000);
        },
        reloadPage() {
            this.dialogSuccess = false;
            this.$emit('cancel-edit-payment');
            const selectedIndividual = this.individual;
            const thisUserId = selectedIndividual.individualId;
            this.$emit('clicked-force-render', thisUserId);
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
        submit() {
            // this.$refs.form.validate();
            const thisIndividual = this.individual;
            const userId = thisIndividual.individualId;

            const data = {};
            data.affiliateId = this.affiliateId;
            data.PaymentMethodSelected = this.paymentMethods[this.paymentMethodSelectedIndex].value;
            data.CreditCardInformation = this.creditCardInformation;
            data.BankDraftInformation = this.bankDraftInformation;
            // console.log(data);

            if (this.$refs.form.validate()) {
                this.loading = true;
                this.disableButton = true;
                return axios.post(`/api/v3/memberforms/admin/submission/update-payment/${userId}`, data)
                .then((response) => {
                    // console.log(response);
                    // this.disableButton = false;
                    this.dialogSuccess = true;
                    this.clearCreditCardInfo();
                    this.clearBankDraftInfo();
                    setTimeout(this.$refs.form.resetValidation(), 5000);
                    this.formValid = true;
                    this.loading = false;
                })
                .catch((error) => {
                    this.errorResponse = error.response;
                    this.formValid = true;
                    this.dialogError = true;
                    // console.log('FORM ERRORS', error.response);
                    this.errorMessage = error.response.data.errors.payment[0];
                    // console.log(this.errorMessage);
                })
                .finally(() => {
                    this.loading = false;
                    this.formValid = false;
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
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
.select-payment .row {
    flex-wrap: wrap !important;
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
.payment-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    z-index: 9;
}
@media only screen and (max-width: 992px) {
    .select-payment {
        padding: 0;
    }
    .v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {
        width: 50% !important;
    }
}
</style>
