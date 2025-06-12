<template>
    <div class="mb-4">
        <h5 class="d-flex align-center ga-2">
            {{ department }}
        </h5>
        <AffiliateStaffEditorComponent
            v-if="showAddIndividualStaff"
            :departments="departments"
            :affiliateId="affiliateId"
            :is-edit-mode="true"
            :editedStaff="editedStaff"
            @canceled="showAddIndividualStaff=false"
            @saved="updatedStaff"
        />
        <v-data-table
            :headers="getHeaders(headers)"
            :items="individuals"
            :hide-default-footer="true"
            class="elevation-1 mobile-global-card-table"
            :mobile-breakpoint=992
            :disable-pagination=true
            :no-data-text="emptyText"
            :items-per-page="-1"
        >
            <template v-slot:[`item.FullName`]="{ item }">
                <router-link :to="{ name: 'IndividualDetails', params: { id: item.Individual.IndividualId }}">
                    {{ item.Individual.FirstName }} {{ item.Individual.LastName }}
                </router-link>
            </template>
            <template v-slot:[`item.TermStartDate`]="{ item }">
                {{ $filters.formatDate(item.TermStartDate) }}
            </template>
            <template v-slot:[`item.TermEndDate`]="{ item }">
                {{ $filters.formatDate(item.TermEndDate) }}
            </template>
            <template v-slot:[`item.Phone`]="{ item }">
                <span v-for="phone in item.Individual.individualPhonesOrdered"
                      v-bind="phone"
                      :key="phone.IndividualPhoneId"
                >
                        {{ maskPhone(phone.PhoneNumber) }}
                </span>
            </template>
            <template v-slot:[`item.Email`]="{ item }">
            <span v-for="email in item.Individual.individualEmailsOrdered"
                  v-bind="email"
                  :key="email.IndividualEmailId"
            >
                {{ email.Email }}
            </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn-group>
                    <v-btn size="small" icon="fa-edit" @click="editItem(item)" />
                    <v-btn size="small" icon="fa-trash" @click="deleteItem(item)" />
                </v-btn-group>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import headersMixin from "../../../mixins/Grid/headersMixin";
    import AffiliateStaffEditorComponent from "./AffiliateStaffEditorComponent";
    import { maskPhoneNumber } from "../../../helpers/index.js";

    export default {
        name: "StaffDepartmentTableComponent",
        components: {AffiliateStaffEditorComponent},
        mixins: [headersMixin],
        props: {
            department: {
                required: true,
                type: String
            },
            departments: {
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
            },
            noDataText: {
                required: false,
                type: String,
            }
        },
        data: () => ({
           headers: [
               {title: 'Title', value: 'StaffTitle', visible: true},
               {title: 'Staff Name', value: 'FullName', visible: true},
               {title: 'Phone', value: 'Phone', visible: true},
               {title: 'Email', value: 'Email', visible: true},
               {title: 'Start date', value: 'TermStartDate', visible: true},
               {title: 'End date', value: 'TermEndDate', visible: true},
               {title: '', value: 'actions', visible: true, sortable: false},
           ],
            showAddIndividualStaff: false,
            editedStaff: null,
        }),
        computed: {
            emptyText() {
                return this.noDataText || `There are no individuals in the ${this.department} department.`;
            },
        },
        methods: {
            editItem(item) {
                this.editedStaff = item;
                this.showAddIndividualStaff = true;
            },
            deleteItem(item) {
                if (confirm("are you sure you want to delete affiliate staff " + item.Individual.FirstName + " " + item.Individual.FirstName + " from department " + this.department)) {
                    axios.delete('/api/v2/affiliateStaff/' + item.AffiliateStaffId)
                        .finally(() => {
                            this.$emit('staffDeleted');
                        });
                }
            },
            updatedStaff(data) {
                this.showAddIndividualStaff=false;
                this.$emit('savedStaff', data);
            },
            maskPhone(phone) {
                return maskPhoneNumber(phone);
            }
        }
    }
</script>
