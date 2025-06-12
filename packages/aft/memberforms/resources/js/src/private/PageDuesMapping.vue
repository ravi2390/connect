<template>
    <v-form
        ref="form"
        v-model="valid"
    >
    <v-container fluid>
        <v-row>
            <v-col>
                <h2>Local Dues Mapping</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    color="#0A2A5C"
                    :to="{ name: 'dues-create' }"
                >
                    Create Local Dues Mapping
                </v-btn>
                <v-alert
                    v-model="duesAlert"
                    density="compact"
                    type="success"
                    class="mb-0"
                >
                    Saved Local Dues Mapping
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-container class="list-container">
                    <h4>
                        Local Dues Category
                    </h4>
                    <v-row
                        v-for="item in items"
                        :key="item.LocalDuesCategoryId"
                        :value="item.LocalDuesCategoryId"
                        active-class="indigo--text text--accent-4"
                        class="dues-items pt-3"
                    >
                        <v-col>
                            <span class="text-subtitle-1">{{ item.LocalDuesCategoryName }}</span>
                            <v-row v-if="item.LocalDuesAmount || item.LocalDuesAmount === 0">
                                <v-col>
                                    <span class="text-subtitle-2">
                                        Dues Amount:&#32;
                                    </span>
                                    <span>${{ item.LocalDuesAmount }}</span>
                                </v-col>
                                <v-col>
                                    <span class="font-weight-light">
                                        Frequency:&#32;
                                    </span>
                                    <span>{{ item.PaymentFrequencyName }}</span>
                                </v-col>
                            </v-row>
                            <v-row v-else>
                                <v-col>
                                    ${{ item.LocalDuesAmount }}
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-select
                                v-model="existingMappings[item.LocalDuesCategoryId]"
                                :items="billingTypes"
                                density="compact"
                                item-title="name"
                                item-value="id"
                                label="Select Billing Type"
                                :rules="[v => !!v || 'Please select a billing type']"
                                return-object
                                variant="outlined"
                                required
                                @update:model-value="changeBillingType($event,item)"
                                class="ml-auto"
                            />
                        </v-col>
                        <v-divider></v-divider>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    :disabled="hasNewSubmission || !valid"
                    color="#0A2A5C"
                    @click="saveDuesMapping"
                >
                    Save
                </v-btn>
                <p
                    v-if="hasNewSubmission"
                    style="color: #ff0000"
                >
                    You should be able to Save once there are no New submissions!
                </p>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
    >
        <v-card>
            <v-card-title />
            <v-card-text>This option is already in use, please try another one</v-card-text>
            <v-card-actions>
                <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="dialog = false"
                >
                    Dismiss
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-overlay
        :model-value="loading"
        opacity=".5"
        scrim="#FFF"
    />
    </v-form>
</template>

<script>
import api from '../../api/private';

export default {
    name: 'PageDuesMapping',
    data: () => ({
        loading: false,
        affiliateId: null,
        items: [],
        valid: true,
        localDuesLabel: 'Local Dues ID:',
        billingTypeLabel: 'Billing Type ID:',
        select: { name: 'Select Billing Type', disabled: false },
        billingTypes: [],
        disabled: true,
        selectedMappings: {},
        existingMappings: {},
        existingMappingsClone: {},
        duesMapping: [],
        duesAlert: false,
        dialog: false,
        hasNewSubmission: false,
    }),
    watch: {
    },
    created() {
        this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
    },
    mounted() {
        this.duesMappingCategories();
        this.billHighwayCategories();
        this.hasNewSubmissionForDues();

        setTimeout(this.showItems, 5000);
    },
    methods: {
        showItems() {
            console.log(this.items);
        },
        changeBillingType(event, item) {
            const selected = Object.values(this.selectedMappings);
            const existing = Object.values(this.existingMappings);
            const allSelected = [...selected, ...existing];
            if (event.id !== 1 && allSelected.includes(event.id)) {
                this.dialog = true;
                setTimeout(() => {
                    this.existingMappings = {};
                    const dataKeys = Object.keys(this.existingMappingsClone);
                    const dataValues = Object.values(this.existingMappingsClone);
                    dataValues.forEach((dueValue, key) => {
                        const LocalDuesCategoryId = dataKeys[key];
                        this.existingMappings[LocalDuesCategoryId] = dueValue;
                    });
                }, 1000);
            } else {
                this.selectedMappings[item.LocalDuesCategoryId] = parseInt(event.id, 10);
                this.existingMappingsClone[item.LocalDuesCategoryId] = parseInt(event.id, 10);
            }
        },
        async getDuesMapping() {
            this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
            try {
                if (!this.affiliateId) { return; }
                this.loading = true;
                const { data } = await api.duesMappingList(this.affiliateId)
                    .catch((err) => {
                        throw new Error(err);
                    });
                data.forEach((dueValue) => {
                    this.existingMappings[dueValue.dues_category_id] = parseInt(dueValue.bill_highway_type_id, 10);
                    this.existingMappingsClone[dueValue.dues_category_id] = parseInt(dueValue.bill_highway_type_id, 10);
                });
            } catch (error) {
                console.log('Error fetching URL Redirects: ', error);
            }
            this.loading = false;
        },
        async saveDuesMapping() {
            this.$refs.form.validate();
            if (!this.affiliateId) { return; }
            if (!this.valid) { return; }
            this.loading = true;
            this.duesAlert = true;
            await api.duesMappingCreate({
                affiliateId: this.affiliateId,
                selectedData: this.selectedMappings,
            }).then(() => {

            })
                .catch(() => {

                }).finally(() => {
                    this.loading = false;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
        },
        hasNewSubmissionForDues() {
            if (!this.affiliateId) { return; }
            this.loading = true;
            api.hasNewSubmissionForDues(this.affiliateId)
                .then((response) => {
                    this.hasNewSubmission = response.data.hasNewSubmissionForDues;
                    // console.log(this.hasNewSubmission);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        duesMappingCategories() {
            if (!this.affiliateId) { return; }
            this.loading = true;
            api.search('duescategory', '', { affiliateId: this.affiliateId, from: 'duesmapping' })
                .then((response) => {
                    this.items = response.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        billHighwayCategories() {
            if (!this.affiliateId) { return; }
            this.loading = true;
            api.search('billingtypes', '', { affiliateId: this.affiliateId })
                .then((response) => {
                    this.billingTypes = [{ id: 1, name: 'Do Not Map' }, ...response.data];
                    setTimeout(() => { this.getDuesMapping(); }, 1000);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        validate() {
            this.$refs.form.validate();
        },
    },
};
</script>

<style scoped lang="scss">
    .dues-items.v-list-item:nth-child(even) .col {
        background-color: #F5F5F5;
    }
    /* .v-list-item--active {
        .dues-inner-text {
            color: rgba(48, 79, 254, 0.9);
        }
    } */
    .dues-inner-text,
    .dues-inner-text-null {
        font-size: 15px;
    }
    .dues-inner-text v-row [class*='col-'] {
        transition: all 0.5s ease-in-out;
    }
    .list-container {
        overflow: hidden;
        .v-list {
            padding: 0;
        }
        .v-list-item--link:before {
            left: 8px;
        }
        .dues-row {
            margin: -12px -16px -12px -8px;
        }
    }
    .v-btn--is-elevated {
        color: white !important;
    }
</style>
