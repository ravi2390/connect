<template>
    <div>
        <p>{{ id }}</p>
        <paginated-table
            v-if="id !== 0"
            :options="tableOptions"
            :headers="tableHeaders"
            :items="tableResults"
            :loading="loading"
            @input="pageChanged($event)"
        />
    </div>
</template>

<script>
import axios from 'axios';
import { pickBy } from 'lodash-es';
import PaginatedTable from '../custom/PaginatedTable.vue';

export default {
    name: 'ProgramAndPolicyCouncilList',
    components: { PaginatedTable },
    props: {
        id: { type: [Number, String], default: 0, required: false },
    },
    data: () => ({
        loading: false,
        search: {
            committeeid: null,
            affiliate: null,
        },
        tableOptions: {
            current_page: 1,
            per_page: 15,
        },
        tableHeaders: {},
        tableResults: [],
    }),
    mounted() {
        let urlSearch = false;
        const hash = this.$route.hash.replace(/^#+/, '');
        new URLSearchParams(hash).forEach((value, key) => {
            if (key in this.search) {
                this.search[key] = value;
                urlSearch = true;
            }
        });
        // this.toolTips();
        this.getOptions()
            .then(() => {
                if (urlSearch) {
                    this.searchCommittee(this.id);
                }
            });
        // this.id = 41470;
        this.searchCommittee(41470);
    },
    methods: {
        setUrlHash(hash) {
            this.$router.replace({ name: this.$route.name, hash })
                .catch((err) => {
                    if (err.name !== 'NavigationDuplicated') { throw (err); }
                });
        },
        // toolTips() {
        //     $('[data-toggle="tooltip"]').tooltip();
        // },
        getOptions() {
            this.loading = true;
            return axios.get('/api/staff/searchCommittee/options')
                .then((response) => {
                    this.tableOptions = response.data.options;
                    this.tableHeaders = response.data.headers;
                    // this.stateFeds = response.data.statefeds;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        searchCommittee(id) {
            this.loading = true;
            const searchParams = new URLSearchParams(pickBy(this.search)).toString();
            this.setUrlHash(searchParams);
            return axios.post('/api/staff/searchCommittee', { search: this.search, options: this.tableOptions })
                .then((response) => {
                    this.tableOptions = (() => { const { data, ...options } = response.data; return options; })();
                    this.tableResults = response.data.data;
                })
                .finally(() => {
                    this.loading = false;
                    // this.toolTips();
                });
        },
        clearAll() {
            for (const [key] of Object.entries(this.search)) {
                this.search[key] = null;
            }
            this.setUrlHash('');
        },
        pageChanged(page) {
            this.tableOptions.current_page = page;
            this.searchLeadership();
        },
    },
};
</script>
