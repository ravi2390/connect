<template>
    <v-card>
        <v-card-title class="form-title">
            <v-img
                class="mr-2"
                max-width="41"
                :src="logoSm"
            />
            Membership Forms Portal
        </v-card-title>
        <v-form>
            <v-container fluid>
                <v-row>
                    <v-col>
                        Choose a State to Find Your Local
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-select
                            v-model="selectedState"
                            :items="listStates"
                            item-title="LocationStateAbr"
                            item-value="LocationStateAbr"
                            label="Select State"
                            variant="solo"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-list
                            lines="three"
                        >
                            <v-list-item-title v-if="listForms && listForms.length !== 0">
                                Choose a form below
                            </v-list-item-title>
                            <v-divider class="mb-4" />
                            <template
                                v-for="form in listForms"
                                :key="form.id"
                            >
                                <v-list-subheader>
                                    {{ form.Affiliate.AffiliateNumber }} - {{ form.Affiliate.AffiliateName }}
                                </v-list-subheader>
                                <v-divider />
                                <v-list-item
                                    :to="form.url"
                                    link
                                >
                                    <v-list-item-title>{{ form.display_name }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ form.display_name }}</v-list-item-subtitle>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
import api from '../../api/public';
import logoSm from '../../../images/aft-small.png';

export default {
    name: 'PageFindForm',
    data: () => ({
        listStates: [],
        listForms: [],
        selectedState: '',
        isFetchingForm: false,
        searchForState: '',
        logoSm,
    }),
    watch: {
        selectedState() {
            this.fetchForms();
        },
    },
    created() {
        this.fetchStates();
    },
    methods: {
        fetchStates() {
            return api.getListOfStates()
                .then((result) => {
                    console.log({ data: result.data })
                    this.listStates = result.data;
                })
                .catch(() => {
                    this.listStates.push('Error Retrieving States');
                });
        },
        fetchForms() {
            api.getForms(this.selectedState)
                .then((result) => {
                    this.listForms = result.data;
                }).catch(() => {
                    this.selectedState = 'Error Fetching Forms';
                });
        },
    },
};
</script>
