export default {
    methods: {
        parseQueryParams(filters) {
            if (this.$route.query.sortBy) {
                this.options.sortBy = [this.$route.query.sortBy];
            }
            if (this.$route.query.sortDesc) {
                this.options.sortDesc = [JSON.parse(this.$route.query.sortDesc)];
            }
            if (this.$route.query.page) {
                this.options.page = parseInt(this.$route.query.page);
            }
            if (this.$route.query.itemsPerPage) {
                this.options.itemsPerPage = parseInt(this.$route.query.itemsPerPage);
            }
            for (const filterParam in this.$route.query) {
                if (this.$route.query.hasOwnProperty(filterParam) && filterParam.startsWith('filter:')) {
                    const filterName = filterParam.substring(7);
                    filters.filter((f) => f.name === filterName).map((f) => {
                        if (f.options && f.options.type) {
                            if (f.options.type === 'Number') {
                                f.value = parseInt(this.$route.query[filterParam]);
                            } else if (f.options.type === 'NumberInArray') {
                                if (!Array.isArray(f.value)) {
                                    f.value = [];
                                }
                                if (Array.isArray(this.$route.query[filterParam])) {
                                    f.value = this.$route.query[filterParam].map(val => parseInt(val));
                                } else {
                                    f.value.push(parseInt(this.$route.query[filterParam]));
                                }
                            } else if (f.options.type === 'StringInArray') {
                                if (!Array.isArray(f.value)) {
                                    f.value = [];
                                }
                                if (Array.isArray(this.$route.query[filterParam])) {
                                    f.value = this.$route.query[filterParam].map(val => val);
                                } else {
                                    f.value.push(this.$route.query[filterParam]);
                                }
                            }
                        } else {
                            f.value = this.$route.query[filterParam];
                        }
                    });
                }
            }
            return filters;
        },

        parseHiddenColumn(headers) {
            if (this.$route.query.hideColumn) {
                headers.map(header => header.visible = true);
                this.$route.query.hideColumn.split(',').map((columnName) => {
                    headers.filter((header) => header.value === columnName).map((header) => {
                        header.visible = false;
                    });
                });
            }
            return headers;
        },

        updateQueryParams(options, filters, headers) {
            const { sortBy, page, itemsPerPage } = options;
            const sortDefault = sortBy[0] ?? { key: '', order: 'asc' };
            let sortByField = sortDefault.key ?? '';
            const sortDirection = sortDefault.order === 'asc' ? '' : '-';
            const queryParams = { sortByField, sortDirection, page, itemsPerPage };
            filters.filter((filter) => filter.value !== '' && filter.value !== null).map((filter) => {
                queryParams[`filter:${filter.name}`] = filter.value;
            });
            const hideColumn = this.headersToQuery(headers);
            if (hideColumn !== '') {
                queryParams['hideColumn'] = hideColumn;
            }
            this.$router.push({ path: this.$router.path, query:queryParams }).catch(err => {});
        },

        headersToQuery(headers) {
            let hideColumn = '';
            headers.filter((header) => !header.visible).map((header) => {
                if (hideColumn !== '') {
                    hideColumn += ',';
                }
                hideColumn += header.value;
            });
            return hideColumn;
        },

        getCommonFooterProps(){
            return {'items-per-page-options': [5, 10,15, 30, 50] };
        },
        getItemsPerPageOptions() {
            return [
                { value: 5, title: '5' },
                { value: 10, title: '10' },
                { value: 15, title: '15' },
                { value: 30, title: '30' },
                { value: 50, title: '50' },
            ]
        }
    }
}
