<template>
    <div>
        <v-dialog v-model="visible" width="500">
            <v-card class="v-card--outlined v-sheet--tile mt-4 pa-4">
                <v-card-text>You are now switching to view data under [{{ affiliateName }}] [{{ affiliateNumber }}]?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn size="small" color="default" @click="visible=false">Cancel</v-btn>
                    <v-btn size="small" color="primary" @click="doSwitch()">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div v-if="same">
            <router-link :to="{ name: this.componentName, params: params}">
                {{ displayValue }}
            </router-link>
        </div>
        <div v-else>
            <span class="affiliate-switch"  @click="visible=true">{{ displayValue }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AffiliateSwitchComponent',
        props: {
            componentName: {
                required: true
            },
            paramName: {
                required: false
            },
            paramValue: {
                required: false
            },
            displayValue: {
                required: true
            },
            affiliateId: {
                required: true
            },
            affiliateName: {},
            affiliateNumber: {},
        },
        data: () => ({
            visible: false,
            same: false,
        }),
        watch: {
            paramValue: {
                handler: function handler() {
                    this.same = this.affiliateId === this.getAffiliateId()
                }
            }
        },
        computed: {
            params() {
                const param = {};
                param[this.paramName] = this.paramValue;
                return param;
            }
        },
        mounted() {
            this.params[this.paramName] = this.paramValue;
            this.same = this.affiliateId === this.getAffiliateId();
        },
        methods: {
            getAffiliateId() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            },
            doSwitch() {
                this.visible = false;
                this.$store.dispatch('user/setUserSelectedEntity', this.affiliateId).then((res) => {
                    this.$router.push({name: this.componentName, params: this.params});
                });
            }
        }
    }
</script>
