<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Employer
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
            <div class="data-container">
                <div class="count">Total Employers : {{ employersCount }}</div>
                <div v-for="(chapter) in affiliate.chapter"
                     :key="chapter.ChapterId">
                    <div v-for="(employer) in chapter.nonStructuralEmployer"
                         :key='employer.EmployerId'>
                        <div class="data-tag"></div>
                        <router-link :to="{ name: 'EmployerDetails', params: { id: employer.EmployerId }}">
                            {{ employer.EmployerName }}
                        </router-link>
                    </div>
                </div>
            </div>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>
<script>
    export default {
        name: "AffiliateEmployerComponent",
        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },
          data: () => ({
            id: '',
            employersCount:0,
            affiliate: {},
            loading: false,
        }),
        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
             getEmployersCount(affiliate) {
                 this.employersCount = 0;
                 affiliate.chapter.forEach(chapter => {
                        this.employersCount += chapter.nonStructuralEmployer.length;
                 });
             },
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/affiliate/' + this.affiliateId + '?scope=global&include=chapter.nonStructuralEmployer';
                return axios.get(url)
                    .then(response => {
                        this.affiliate = response.data.data;
                        this.getEmployersCount(this.affiliate);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>
<style scoped>
</style>
