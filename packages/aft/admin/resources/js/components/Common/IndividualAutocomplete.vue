<template>
    <v-autocomplete
        v-model="selected"
        v-model:search="search"
        :items="items"
        :loading="isLoading"
        item-title="autoCompleteLabel"
        item-value="IndividualId"
        variant="underlined"
        placeholder="First Name or Last Name or MemberId"
        hide-no-data
        no-filter
        persistent-hint
        :rules="rules"
        @update:model-value="handleChange"
    >
        <template #label>
            <span v-if="rules" class="text-red">* </span>{{label}}
        </template>
    </v-autocomplete>
</template>

<script>

export default {
    name: "IndividualAutocomplete",
    props: {
        modelValue: {
            required: true
        },
        individual: {
            default: function() {
                return {
                    FirstName: '',
                    LastName: ''
                }
            }
        },
        rules: {
            default: ''
        },
        affiliateId: {
            required: true
        },
        affiliateParentFilter: {
            default: false
        },
        label: {
            default: 'Individual'
        },
        filter: {
            default: ''
        }
    },
    data: () => ({
        isLoading: false,
        search: '',
        items: [],
        selected: null,
    }),
    methods: {
        addLabelToIndividual(individual) {
            if (individual) {
                const name = `${individual.FirstName} ${individual.LastName}`;
                const memberId = individual.individualMembers && individual.individualMembers.length
                    ? ` (${individual.individualMembers[0].MemberId})`
                    : '';

                const affiliateNumbers = individual.individualAffiliates
                    ? individual.individualAffiliates
                        .filter((individualAffiliate) => individualAffiliate.Affiliate)
                        .map((individualAffiliate) => individualAffiliate.Affiliate.AffiliateNumber)
                    : [];
                const memberAffiliates = affiliateNumbers.length ? ` (${affiliateNumbers.join(', ')})` : '';
                individual.autoCompleteLabel = `${name}${memberId}${memberAffiliates}`;
            }
            return individual;
        },
        getSearchData(val) {
            this.isLoading = true;
            var url = '';
            url = '/admin/api/aggregate/individual/autocomplete?scope=global&search='+val+'&affiliateId='+this.affiliateId+'&filter='+this.filter+'&affiliateParentFilter='+this.affiliateParentFilter;

            // Lazily load input items
            axios.get(url)
                .then(this.mapResponseToData)
                .catch(err => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false))
        },
        mapResponseToData(res) {
            this.count = res.data.meta.total;
            this.items = res.data.data.map((c) => {
                return this.addLabelToIndividual(c)
            });
        },
        doSearch(val) {
            // Items have already been requested
            if (this.isLoading) return;

            //if empty search is done
            if (!val) val = '';

            // if currently selected item is chosen
            const selected = this.items.filter(v => v.autoCompleteLabel === val);
            if (selected && selected.length > 0) return;

            clearTimeout(this._timerId);
            // delay new call 500ms
            this._timerId = setTimeout(() => {
                this.getSearchData(val);
            }, 500);
        },
        loadSingle() {
            this.isLoading = true;
            axios.get('/api/v2/aggregate/individual/autocomplete?scope=global&id=' + this.modelValue + '&affiliateId=' + this.affiliateId)
                .then(this.mapResponseToData)
                .then(() => {
                    if (this.items.length > 0) {
                        this.model =this.items[0].IndividualId;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false))

        },
        handleChange() {
            this.$emit('update:modelValue', this.selected);
        }
    },
    watch: {
        search (val) {
            this.doSearch(val);
        },
        affiliateId: {
            handler: function(val, oldVal) {
                this.getSearchData('');
            }
        },
    },
    beforeMount() {
        if (this.modelValue) {
            this.loadSingle();
        }
    }
}
</script>
