<template>
    <v-container>
        <v-row>
            <v-col>
                {{ committee }}
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <AffiliateCommitteesEditorComponent
                    v-if="showAddIndividualCommittee"
                    :committees="committees"
                    :affiliateId="affiliateId"
                    :is-edit-mode="true"
                    :editedCommittee="editedCommittee"
                    @canceled="showAddIndividualCommittee=false"
                    @saved="updatedCommittee"
                />
                <v-data-table
                    :headers="getHeaders(headers)"
                    :items="individuals"
                    :hide-default-footer="true"
                    class="elevation-1 mobile-global-card-table"
                    :mobile-breakpoint=992
                    :disable-pagination=true
                    :no-data-text="getNoDataText()"
                    :items-per-page="-1"
                >
                    <template v-slot:[`item.StartDate`]="{ item }">
                        <span v-if="item">
                            {{ $filters.formatDate(item.StartDate) }}
                        </span>
                    </template>
                    <template v-slot:[`item.EndDate`]="{ item }">
                        <span v-if="item">
                            {{ $filters.formatDate(item.EndDate) }}
                        </span>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn-group>
                            <v-btn size="small" icon="fa-edit" @click="editItem(item)" />
                            <v-btn size="small" icon="fa-trash" @click="deleteItem(item)" />
                        </v-btn-group>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import headersMixin from "../../../mixins/Grid/headersMixin";
    import AffiliateCommitteesEditorComponent from "./AffiliateCommitteesEditorComponent";

    export default {
        name: "CommitteesNameTableComponent",
        components: {AffiliateCommitteesEditorComponent},
        mixins: [headersMixin],
        props: {
            committee: {
                required: true,
                type: String
            },
            committeeId: {
                required: true,
                type: Number
            },
            committees: {
                required: true,
                type: Array
            },
            individuals: {
                required: false,
                type: Array,
                default: () => []
            },
            affiliateId: {
                required: true,
                type: Number
            }
        },
        data: () => ({
           headers: [
               {title: 'Name', value: 'FullName', visible: true},
               {title: 'Committee Member Type', value: 'CommitteeMemberTypeName', visible: true},
               {title: 'Start Date', value: 'StartDate', visible: true},
               {title: 'End Date', value: 'EndDate', visible: true},
               {title: '', value: 'actions', visible: true, sortable: false},
           ],
            showAddIndividualCommittee: false,
            editedCommittee: null,
        }),
        methods: {
            getNoDataText() {
                if (this.noDataText) {
                    return this.noDataText;
                }
                return "There are no individuals in the " + this.committee +" committee.";
            },
            editItem(item) {
                this.editedCommittee = item;
                this.showAddIndividualCommittee = true;
            },
            deleteItem(item) {
                if (confirm("are you sure you want to delete affiliate committee member " + item.FullName + " from committee " + this.committee)) {
                    axios.delete('/api/v2/affiliateCommitteeMember/' + item.AffiliateCommitteeMemberId)
                        .finally(() => {
                            this.$emit('committeeDeleted');
                        });
                }
            },
            updatedCommittee(data) {
                this.showAddIndividualCommittee=false;
                this.$emit('savedCommittee', data);
            }
        }
    }
</script>
