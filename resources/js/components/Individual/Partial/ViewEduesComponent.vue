<template>
    <v-container v-show="!loading">
        <v-row>
            <v-col class="text-right">
                <v-btn size="small" @click="$emit('edit-edues')">Edit eDues Payment</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div>
                    <h5 class="mt-10 bhTitle">BillHighway Status: </h5>
                    <v-card
                        class="d-flex justify-space-around mb-4 mt-6 pb-4 stat-card"
                        flat
                    >
                        <v-card
                            class="pa-2"
                            border
                            color="transparent"
                            flat
                        >
                            Record Status
                            <span
                                v-if="billHighwayData.MemberStatusDesc !== 'Active'
                                    && billHighwayData.MemberStatusDesc !== 'Active - Manual Payment'"
                                class="stat-error"
                                :class="{ 'stat-error': billHighwayData.MemberStatusDesc !== 'Active'
                                        && billHighwayData.MemberStatusDesc !== 'Active - Manual Payment' }">
                                Inactive
                            </span>
                            <span v-else>
                                {{ billHighwayData.MemberStatusDesc }}
                            </span>
                        </v-card>
                        <v-card
                            class="pa-2"
                            border
                            color="transparent"
                            flat
                            v-if="billHighwayData.AutoPayInfo"
                        >
                            Payment (Last 4)
                            <span v-if="billHighwayData.AutoPayInfo.PaymentMethod === 'Credit Card'">{{ billHighwayData.AutoPayInfo.CardNumberLastFour }}</span>
                            <span v-else>{{ billHighwayData.AutoPayInfo.AccountNumberLastFour }}</span>
                        </v-card>
                        <v-card
                            class="pa-2"
                            border
                            color="transparent"
                            flat
                        >
                            Billing Type ID
                            <span>{{ billHighwayData.BillingTypeId }}</span>
                        </v-card>
                        <v-card
                            class="pa-2"
                            border
                            color="transparent"
                            flat
                        >
                            AutoPay
                            <span
                                :class="{ 'stat-error': billHighwayData.AutoPayStatus !== 'Active' }">
                                {{ billHighwayData.AutoPayStatus }}
                            </span>
                        </v-card>
                        <v-card
                            class="pa-2"
                            border
                            color="transparent"
                            flat
                        >
                            Current balance
                            <span :class="{ 'stat-error': billHighwayData.CurrentBalance > 0 }">${{ billHighwayData.CurrentBalance }}</span>
                        </v-card>
                    </v-card>
                    <h5 class="mt-10">Submission Information:</h5>
                    <v-card
                        class="d-flex mb-2 mt-2 pa-2 sub-info"
                        flat
                    >
                        <v-row class="d-flex flex-wrap">
                            <v-col
                                cols="12"
                                lg="6"
                            >
                                <h5>AFT GUID</h5>
                                <span>{{ billHighwayData.UserId }}</span>
                            </v-col>
                            <!-- <v-col
                                cols="12"
                                lg="6"
                            >
                                <h5>Billhighway Payment Reference</h5>
                                <span>{{ billHighwayData.MemberTypeDesc }}</span>
                            </v-col> -->
                            <v-col
                                cols="12"
                                lg="6"
                            >
                                <h5>Billhighway ID</h5>
                                <span>{{ billHighwayData.BhUserId }}</span>
                            </v-col>
                            <v-col
                                cols="12"
                                lg="6"
                            >
                                <h5>Billing Type</h5>
                                <span>{{ billHighwayData.BillingTypeId }} - {{ billHighwayData.BillingTypeName }}</span>
                            </v-col>
                            <v-col
                                cols="12"
                                lg="6"
                                v-if="individualData.IndividualEmails"
                            >
                                <h5>Email</h5>
                                <span>{{ individualData.IndividualEmails.Email }}</span>
                            </v-col>
                            <v-col
                                cols="12"
                                lg="6"
                                v-if="individualData.IndividualPhones"
                            >
                                <h5>Phone Number</h5>
                                <!-- <span>{{ user[0].IndividualPhones.PhoneNumber }}</span> -->
                                <!-- <span>
                                    {{  '(' + individualData.IndividualPhones.Number.substring(0, 3) + ') '
                                    + individualData.IndividualPhones.Number.substring(3, 6) + '-'
                                    + individualData.IndividualPhones.Number.substring(6) }}
                                </span> -->
                                <span>{{ updatedPhoneNumber(individualData.IndividualPhones.Number) }}</span>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        class="d-flex justify-space-around mb-6 pa-2 date-sub"
                        flat
                    >
                        <v-row class="d-flex justify-end">
                            <v-col
                                cols="12"
                                lg="6"
                                class="date-submitted"
                            >
                                <h5 class="mb-0" v-if="individualData.Source">
                                    Source: <span class="text-subtitle-1">
                                                        {{ individualData.Source }}
                                                    </span>
                                </h5>
                                <h5 class="mb-0" v-if="individualData.SubmittedDate">
                                    Date Submitted: <span class="text-subtitle-1">
                                        {{ formatDate(individualData.SubmittedDate) }} EST
                                    </span>
                                </h5>
                            </v-col>
                        </v-row>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { format, subHours } from "date-fns";

export default {
    name: "ViewEduesComponent",

    props: {
        individual: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            default: true,
        },
        // individualEmployers: {
        //     type: Array,
        //     required: true
        // }
    },
    data() {
        return {
            billHighwayData: {},
            individualData: {},
            isActive: false,
        }
    },
    methods: {
        formatDate(date) {
            return format(subHours(new Date(date), 5), "MMMM do yyyy, h:mm a");
        },
        updatedPhoneNumber(pNum) {
            let phoneString = pNum.replace(/[^+\d]+/g, "");
            const x = phoneString.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            pNum = (!x[2] ? x[1] : `(${x[1]}) ${x[2]}-${x[3]}`);
            return pNum;
        },
    },
    mounted() {
        this.id = this.$route.params.id;
    },
    watch: {
        individual: {
            deep: true,
            handler(value) {
                // this.individual = value;
                this.billHighwayData = this.individual.billHighWayData;
                this.individualData = this.individual.individualData;
                return value;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.edues-expansion {
    .v-expansion-panel {
        margin-bottom: 1rem;
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        h5 { font-weight: 600; }
        .stat-card {
            border-bottom: 1px solid #ccc;
            border-radius: 0;
            .v-card {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                text-transform: capitalize;
                width: 100%;
                line-height: 22px;
                font-weight: 600;
                border-right: 1px solid #ccc !important;
                border-radius: unset;
                span {
                    margin-top: 8px;
                    color: #00C853;
                    &.stat-error {
                        color: #D32F2F;
                    }
                }
                &:last-of-type {
                    border-right: none !important;
                    span {
                        font-size: 140%;
                    }
                }
            }
        }
        .sub-info {
            span {
                font-size: 1rem;
                color: #757575;
                letter-spacing: 0.025rem;
            }
        }
        .date-sub {
            border-bottom: 1px solid #ccc;
            border-radius: 0;
            h5 {
                color: #092a5c;
                font-weight: 500;
            }
            span {
                color: #757575;
            }
        }
    }
}
</style>
