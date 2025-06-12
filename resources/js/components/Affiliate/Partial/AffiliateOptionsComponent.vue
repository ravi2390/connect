<template>
    <v-expansion-panels>
        <v-expansion-panel v-on:group:selected="onExpand">
            <v-expansion-panel-title>
                <h4>Affiliate Options</h4>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col class="text-right">
                        <div>
                            <v-btn size="small" color="primary" v-on:click="showAffiliateOptionsMessage">Manage Affiliate Options</v-btn>
                        </div>
                        <div class="error-message">{{manageAffiliateOptionsMessage}}</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card class="v-card--outlined v-sheet--tile px-6">
                            <v-row>
                                <v-col cols="12">
                                    <div class="data-container">
                                        <div class="data-tag">Retiree options:</div>
                                        <div class="data-value" v-if="affiliate && affiliate.RetireeStaysLocal == '1'">
                                            Move Retirees to Retiree Unit within the same local: Yes
                                        </div>
                                        <div class="data-value" v-else>
                                            Move Retirees to Retiree Unit within the same local: No
                                        </div>

                                        <div class="data-value" v-if="affiliate">
                                            Move Retirees to Charted Retiree Local: N/A
                                        </div>
                                        <div class="data-value" v-else>
                                            Move Retirees to Charted Retiree Local: No
                                        </div>

                                        <div class="data-value" v-if="affiliate">
                                            Move Retirees to Retiree Unit of the State Federation: N/A
                                        </div>
                                        <div class="data-value" v-else>
                                            Move Retirees to Retiree Unit of the State Federation: No
                                        </div>

                                        <div class="data-value" v-if="affiliate">
                                            Move to Retiree at large Local, Local 09005: N/A
                                        </div>
                                        <div class="data-value" v-else>
                                            Move to Retiree at large Local, Local 09005: No
                                        </div>
                                    </div><br>
                                    <div class="data-container">
                                        <div class="data-tag">Financial data:</div>
                                        <div class="data-value" v-if="affiliate">
                                            Affiliate EIN number: {{affiliate.AffiliateEIN}}
                                        </div>
                                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita">
                                            Fiscal Year End (mm/dd): {{affiliate.AffiliatePerCapita.FiscalYearEndMonth}}/{{affiliate.AffiliatePerCapita.FiscalYearEndDay}}
                                        </div>
                                    </div><br>
                                    <div class="data-container">
                                        <div class="data-tag">External Data Options:</div>
                                        <div class="data-value" v-if="affiliate && affiliate.NoNcoaUpdate == '1'">
                                            Prevent NCOA Update: Yes
                                        </div>
                                        <div class="data-value" v-else>
                                            Prevent NCOA Update: No
                                        </div>

                                        <div class="data-value" v-if="affiliate && affiliate.NoNationalUpdate == '1'">
                                            Prevent National Updates: Yes
                                        </div>
                                        <div class="data-value" v-else>
                                            Prevent National Updates: No
                                        </div>

                                        <div class="data-value" v-if="affiliate && affiliate.NoStateUpdate == '1'">
                                            Prevent State Updates: Yes
                                        </div>
                                        <div class="data-value" v-else>
                                            Prevent State Updates: No
                                        </div>

                                        <div class="data-value" v-if="affiliate && affiliate.NoExternalUpdate == '1'">
                                            Disable External Updates: Yes
                                        </div>
                                        <div class="data-value" v-else>
                                            Disable External Updates: No
                                        </div>

                                        <div class="data-value" v-if="affiliate && affiliate.NoLanWanUpdate == '1'">
                                            Prevent LAN/WAN Updates: Yes
                                        </div>
                                        <div class="data-value" v-else>
                                            Prevent LAN/WAN Updates: No
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>

            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    export default {
        name: "AffiliateOptionsComponent",

        data() {
            return {
                affiliate: [],
                manageAffiliateOptionsMessage: ''
            }
        },

        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
                this.manageAffiliateOptionsMessage = '';
            },

            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/affiliate/' + this.affiliateId + '?include=AffiliatePerCapita';

                return axios.get(url)
                    .then(response => {
                        this.affiliate = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },

            showAffiliateOptionsMessage(){
                this.manageAffiliateOptionsMessage = 'To modify Affiliate Options please contact AFTmembership@aft.org';
            }
        }
    }
</script>

<style scoped>

</style>
