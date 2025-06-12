<template>
    <div @keyup.enter="getDataFromApi">
    <div class="hidden-md-and-down" v-if="!isOnMobile">
    <v-container fluid>
        <v-row :class="collapsedFilterRowTheme" class="flex-sm-nowrap table-content-row">
            <v-col cols="12" lg="2" :class="collapsedFilterColTheme" class="table-content-row__left">
                <filter-component
                    :filters="filters"
                    :presets="presets"
                    :selectedPreset="selectedPreset"
                    v-on:change="updateFilter()"
                    v-on:clear="clearFilters()"
                    v-on:search="getDataFromApi()"
                    v-on:updateTableOnSearch="updateTableOnSearch()"
                    v-on:collapsedFilterChanged="shouldCollapseFilter"
                    @filter-chooser-applied="onFilterChangeApplied(filters,'individual', $event)"
                    @presets-load="loadConfiguration($event)"
                >
                </filter-component>
            </v-col>
            <v-col cols="10" ref="tableContainer" :class="[collapsedFilterPaddingColTheme, fixedHeaderTheme]" class="table-content-row__right">
                <div class="tableContainer__inner">
                    <v-data-table-server
                        :headers="getHeaders(headers)"
                        :items="individuals"
                        v-model:options="options"
                        v-model:sort-by="options.sortBy"
                        :items-length="totalIndividuals"
                        :loading="loading"
                        class="elevation-1 individual-results-table scrollable-table"
                        fixed-header
                        height="80dvh"
                        @update:page="scrollToBeginningOfPage()"
                    >
                        <template #top>
                            <div class="d-flex flex-wrap align-md-center ga-8">
                                <v-data-table-footer items-per-page-text="Rows per page"></v-data-table-footer>
                                <chooser-component
                                    :columns="headers"
                                    :presets="presets"
                                    :selectedPreset="selectedPreset"
                                    @applied="onHeaderChangeApplied('individual', $event)"
                                    @preset-load="loadConfiguration($event)"
                                ></chooser-component>
                                <download-component
                                    :downloadBaseURL="baseUrl"
                                    :downloadAllUrlParams="alwaysFilters"
                                    :downloadUrlParams="getOptionsUrlParams()"
                                    configurationModel="individual"
                                    :configurationKey="selectedPreset"
                                    :include="urlInclude"
                                    :useHomeAddress="useHomeAddress"
                                />
                                <v-switch
                                    v-model="useHomeAddress"
                                    label="Use Home Address"
                                    hide-details
                                    color="accent"
                                ></v-switch>
                            </div>
                            <div class="top-scroller">
                                <div class="inner-scroll"></div>
                            </div>
                        </template>
                        <template v-slot:bottom>
                            <div class="align-md-center ga-8">
                                <v-data-table-footer items-per-page-text="Rows per page"></v-data-table-footer>
                                <chooser-component :columns="headers" :presets="presets" :selectedPreset="selectedPreset" @applied="onHeaderChangeApplied('individual', $event)" @preset-load="loadConfiguration($event)"></chooser-component>
                            </div>
                        </template>
                        <template v-slot:loader>
                            <v-progress-linear
                                indeterminate
                                height="8"
                                color="#3f98c9"
                            />
                        </template>
                        <template v-slot:[`item.FirstName`]="{ item }">
                            <router-link :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.FirstName }}
                            </router-link>
                        </template>
                        <template v-slot:[`item.MiddleName`]="{ item }">
                            <span v-if="item.MiddleName">
                            <router-link :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.MiddleName }}
                            </router-link>
                            </span>
                        </template>
                        <template v-slot:[`item.LastName`]="{ item }">
                            <router-link :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.LastName }}
                            </router-link>
                        </template>
                        <template v-slot:[`item.FullName`]="{ item }">
                            <router-link :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.Prefix && item.Prefix.PrefixName }} {{ item.FirstName }} <span v-if="item.MiddleName != 'Null'">{{ item.MiddleName }}</span> {{ item.LastName }}{{ item.Suffix && item.Suffix.SuffixName ? ', ' + item.Suffix.SuffixName : '' }}
                            </router-link>
                        </template>
                        <template v-slot:[`item.PreferredName`]="{ item }">
                            <router-link :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.PreferredName }}
                            </router-link>
                        </template>
                        <template v-slot:[`item.HomeEmail.Email`]="{ item }">
                            <span
                                v-if="item.individualEmailsOrdered && item.individualEmailsOrdered.length>0"
                            >
                                {{ getHomeEmails(item.individualEmailsOrdered) }}
                            </span>
                        </template>
                        <template v-slot:[`item.WorkEmail.Email`]="{ item }">
                            <span
                                v-if="item.individualEmailsOrdered && item.individualEmailsOrdered.length>0"
                            >
                                {{ getWorkEmails(item.individualEmailsOrdered) }}
                            </span>
                        </template>
                        <template v-slot:[`item.HomePhone.PhoneNumber`]="{ item }">
                            <span
                                v-if="item.individualPhonesOrdered && item.individualPhonesOrdered.length>0"
                            >
                                {{ getHomePhones(item.individualPhonesOrdered) }}
                            </span>
                        </template>
                        <template v-slot:[`item.MobilePhone.PhoneNumber`]="{ item }">
                            <span
                                v-if="item.individualPhonesOrdered && item.individualPhonesOrdered.length>0"
                            >
                                {{ getMobilePhones(item.individualPhonesOrdered) }}
                            </span>
                        </template>
                        <template v-slot:[`item.PreferredPhone.PhoneNumber`]="{ item }">
                            <span
                            v-if="item.individualPhonesOrdered && item.individualPhonesOrdered.length>0"
                            >
                                {{ item.individualPhonesOrdered[0].PhoneNumber }}
                            </span>
                        </template>
                        <template v-slot:[`item.PreferredAddress.AddressLine`]="{ item }">
                            <span
                                v-if="item.individualAddressesOrdered && item.individualAddressesOrdered.length>0"
                            >
                                {{ item.individualAddressesOrdered[0].AddressLine1 }},
                                {{ item.individualAddressesOrdered[0].AddressLine2 && item.individualAddressesOrdered[0].AddressLine2.trim().length > 0 ? item.individualAddressesOrdered[0].AddressLine2 + ', ' : ''}}
                                {{ item.individualAddressesOrdered[0].City }},
                                {{ item.individualAddressesOrdered[0].StateTerritory ? item.individualAddressesOrdered[0].StateTerritory.StateTerritoryCode : '' }},
                                {{ item.individualAddressesOrdered[0].PostalCode }}
                            </span>
                        </template>
                        <template v-slot:[`item.individualAddresses`]="{ item }">
                            <span v-for="address in item.individualAddressesOrdered"
                                v-bind="address"
                                :key="address.IndividualAddressId"
                            >
                                {{ address.City }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates`]="{ item }">
                            <span v-for="affiliate in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <router-link :to="{ name: 'AffiliateDisplay', params: { id: affiliate.Affiliate.AffiliateId }}">
                                    {{ affiliate.Affiliate.AffiliateNumber }}
                                </router-link>
                            </span>
                        </template>
                        <template v-slot:[`item.individualMembers`]="{ item }">
                            <span v-for="member in selectedAffiliateMembers(item.individualMembers)"
                                v-bind="member"
                                :key="member.MemberIdMappingId"
                            >
                                {{ member.MemberId }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.LocalDuesCategory`]="{ item }">
                            <span
                                v-for="(affiliate,index) in itemsWithProperty(item.activeIndividualAffiliates, 'LocalDuesCategory')"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span v-if="index>0">, </span>{{ affiliate.LocalDuesCategory.LocalDuesCategoryName }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.LocalDuesAmount`]="{ item }">
                            <span
                                v-for="(affiliate,index) in itemsWithProperty(item.activeIndividualAffiliates, 'LocalDuesCategory')"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span v-if="index>0">, </span>
                                <span v-if="affiliate.LocalDuesCategory.LocalDuesAmount">${{ affiliate.LocalDuesCategory.LocalDuesAmount }}</span>
                                <span v-if="affiliate.LocalDuesCategory.LocalDuesPercentage">{{ affiliate.LocalDuesCategory.LocalDuesPercentage }}%</span>
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.UnionRelationshipType`]="{ item }">
                            <span
                                v-for="(affiliate,index) in itemsWithProperty(item.activeIndividualAffiliates, 'UnionRelationshipType')"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span v-if="index>0">, </span>{{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.PaymentMethod`]="{ item }">
                            <span
                                v-for="affiliate in itemsWithProperty(item.activeIndividualAffiliates, 'PaymentMethod')"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                {{ affiliate.PaymentMethod.PaymentMethodName }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.WorkLocation`]="{ item }">
                            <div v-for="(employer, index) in itemsWithProperty(item.activeIndividualEmployers, 'WorkLocation')"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>
                                <div v-if="employer.WorkLocation.ParentWorkLocation">
                                    <div v-if="employer.WorkLocation.ParentWorkLocation.ParentWorkLocation">
                                        <span v-if="employer.WorkLocation.ParentWorkLocation.ParentWorkLocation.WorkLocationType">
                                         {{employer.WorkLocation.ParentWorkLocation.ParentWorkLocation.WorkLocationType.WorkLocationTypeName}}:
                                        </span>
                                        {{ employer.WorkLocation.ParentWorkLocation.ParentWorkLocation.WorkLocationName }} |
                                    </div>
                                    <span v-if="employer.WorkLocation.ParentWorkLocation.WorkLocationType">
                                        {{employer.WorkLocation.ParentWorkLocation.WorkLocationType.WorkLocationTypeName}}:
                                    </span>
                                    {{ employer.WorkLocation.ParentWorkLocation.WorkLocationName }} |

                                </div>
                                <div>
                                    <span v-if="employer.WorkLocation.WorkLocationType">
                                        {{employer.WorkLocation.WorkLocationType.WorkLocationTypeName}}:
                                    </span>
                                    {{ employer.WorkLocation.WorkLocationName }}
                                </div>

                            </div>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.WorkStructure`]="{ item }">
                            <div v-for="(employer, index) in itemsWithProperty(item.activeIndividualEmployers, 'WorkStructure')"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>
                                <div v-if="employer.WorkStructure.ParentWorkStructure">
                                    <div v-if="employer.WorkStructure.ParentWorkStructure.ParentWorkStructure">
                                        <span v-if="employer.WorkStructure.ParentWorkStructure.ParentWorkStructure.WorkStructureType">
                                        {{employer.WorkStructure.ParentWorkStructure.ParentWorkStructure.WorkStructureType.WorkStructureTypeName}}:
                                        </span>
                                        {{ employer.WorkStructure.ParentWorkStructure.ParentWorkStructure.WorkStructureName }} |
                                    </div>
                                    <span v-if="employer.WorkStructure.ParentWorkStructure.WorkStructureType">
                                    {{employer.WorkStructure.ParentWorkStructure.WorkStructureType.WorkStructureTypeName}}:
                                    </span>
                                    {{ employer.WorkStructure.ParentWorkStructure.WorkStructureName }} |
                                </div>
                                <div>
                                    <span v-if="employer.WorkStructure.WorkStructureType">
                                        {{employer.WorkStructure.WorkStructureType.WorkStructureTypeName}}:
                                    </span>
                                    {{ employer.WorkStructure.WorkStructureName }}
                                </div>

                            </div>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.EmployeeId`]="{ item }">
                            <span v-for="(employer, index) in item.activeIndividualEmployers"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>{{ employer.EmployeeId }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.EmployerName`]="{ item }">
                            <span v-for="(employer, index) in employerStructural(item.activeIndividualEmployers)"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>
                                <router-link :to="{ name: 'EmployerDetails', params: { id: employer.Employer.EmployerId }}">
                                    {{ employer.Employer.EmployerName }}
                                </router-link>
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.StartDate`]="{ item }">
                            <span
                                v-for="(employer,index) in item.activeIndividualEmployers"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>{{ $filters.formatDate(employer.StartDate) }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.EndDate`]="{ item }">
                            <span
                                v-for="(employer, index) in item.activeIndividualEmployers"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>{{ $filters.formatDate(employer.EndDate) }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.LocalJobClassName`]="{ item }">
                            <span
                                v-for="(employer, index) in itemsWithProperty(item.activeIndividualEmployers, 'LocalJobClass')"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>{{ employer.LocalJobClass.LocalJobClassName }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.JobTitle`]="{ item }">
                            <span
                                v-for="(employer, index) in itemsWithProperty(item.activeIndividualEmployers, 'JobTitle')"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>{{ employer.JobTitle.JobTitleName }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.JobDescription`]="{ item }">
                            <span
                                v-for="(employer, index) in item.activeIndividualEmployers"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>{{ employer.JobDescription }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.Unit`]="{ item }">
                            <span
                                v-for="(employer, index) in employersWithJobClassUnit(item.activeIndividualEmployers)"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>{{ employer.LocalJobClass.Unit.UnitName }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.NationalJobClass`]="{ item }">
                            <span
                                v-for="(employer, index) in employersWithNationalJobClass(item.activeIndividualEmployers)"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>{{ employer.LocalJobClass.NationalJobClass.NationalJobClassName }}
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualEmployers.ChapterName`]="{ item }">
                            <span
                                v-for="(employer, index) in itemsWithProperty(item.activeIndividualEmployers, 'Employer')"
                                v-bind="employer"
                                :key="employer.IndividualEmployerId"
                            >
                                <span v-if="index>0">, </span>
                                <span v-if="employer.Employer.Chapter">
                                    {{ employer.Employer.Chapter.ChapterName }}
                                </span>
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.AffiliateOfficerRoleName`]="{ item }">
                            <span
                                v-for="(officerRole, index) in getUniqueOfficerRoles(item.activeIndividualAffiliates)"
                                v-bind="officerRole"
                                :key="officerRole.AffiliateOfficerRoleId"
                            >
                                {{ officerRole.AffiliateOfficerRoleName }}<span v-if="index != getUniqueOfficerRoles(item.activeIndividualAffiliates).length - 1">, </span>
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.StaffTitle`]="{ item }">
                            <span
                                v-for="affiliate in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span
                                    v-for="(staff, index) in affiliate.individualStaff"
                                    v-bind="staff"
                                    :key="staff.AffiliateStaffId"
                                >
                                    {{ staff.StaffTitle }}<span v-if="index != affiliate.individualStaff.length - 1">, </span>
                                </span>
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.individualGroupMember`]="{ item }">
                            <span
                                v-for="affiliate in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span
                                    v-for="(groupMember, index) in affiliate.individualGroupMember"
                                    v-bind="groupMember"
                                    :key="groupMember.AffiliateGroupMemberId"
                                >
                                    <span v-if="groupMember.AffiliateGroup">
                                        {{ groupMember.AffiliateGroup.AffiliateGroupName }}<span v-if="index != affiliate.individualGroupMember.length - 1">, </span>
                                    </span>
                                </span>
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.individualCommitteeMember`]="{ item }">
                            <span
                                v-for="affiliate in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span
                                    v-for="(committeeMember, index) in affiliate.individualCommitteeMember"
                                    v-bind="committeeMember"
                                    :key="committeeMember.AffiliateCommitteeMemberId"
                                >
                                <span v-if="committeeMember.AffiliateCommittee">
                                    {{ committeeMember.AffiliateCommittee.AffiliateCommitteeName }}<span v-if="index != affiliate.individualCommitteeMember.length - 1">, </span>
                                </span>
                            </span>
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.CommitteeMemberTypeName`]="{ item }">
                            <span
                                v-for="affiliate in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span
                                    v-for="(committeeMemberType, index) in affiliate.individualCommitteeMember"
                                    v-bind="committeeMemberType"
                                    :key="committeeMemberType.AffiliateCommitteeMemberId"
                                >
                                    <span v-if="committeeMemberType.CommitteeMemberType">
                                        {{ committeeMemberType.CommitteeMemberType.CommitteeMemberTypeName }}<span v-if="index != affiliate.individualCommitteeMember.length - 1">, </span>
                                    </span>
                                </span>
                            </span>
                        </template>
                        <template v-slot:[`item.individualAssessments.Rating`]="{ item }">
                            <span v-if="item.individualQuickComments.length > 0">
                                <span v-if="item.individualQuickComments[item.individualQuickComments.length - 1].IndividualAssessment">
                                    {{ item.individualQuickComments[item.individualQuickComments.length - 1].IndividualAssessment.Rating }}
                                </span>
                                <span v-if="!item.individualQuickComments[item.individualQuickComments.length - 1].IndividualAssessment">
                                </span>
                            </span>
                        </template>
                        <template v-slot:[`item.individualQuickComments.CommentDate`]="{ item }">
                            <span v-if="item.individualQuickComments.length > 0">
                                {{ $filters.formatDate(item.individualQuickComments[item.individualQuickComments.length - 1].CommentDate) }}
                            </span>
                        </template>
                        <template v-slot:[`item.individualCope`]="{ item }">
                            <span v-if="item.individualCope.length > 0">
                                Yes
                            </span>
                            <span v-if="!item.individualCope.length > 0">
                                No
                            </span>
                        </template>
                        <template v-slot:[`item.activeIndividualAffiliates.IsCurrent`]="{ item }">
                            <span
                                v-for="(affiliate,index) in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span v-if="affiliate.IsCurrent == true">
                                    Yes
                                </span>
                                <span v-if="affiliate.IsCurrent == false">
                                    No
                                </span>
                                <span v-if="index != item.activeIndividualAffiliates.length - 1">, </span>
                            </span>
                        </template>
                    </v-data-table-server>
                </div>
            </v-col>
        </v-row>
    </v-container>
    </div>
    <!-- MOBILE Breakpoint -->
    <div class="hidden-lg-and-up" v-if="isOnMobile">
        <filter-component
            :filters="filters"
            :presets="presets"
            :selectedPreset="selectedPreset"
            :mobileIndividualHeaders="getSortableHeaders(headers)"
            v-on:search="getDataFromApi()"
            v-on:change="updateFilter()"
            v-on:clear="clearFilters()"
            v-on:onShowSort="hideResults()"
            v-on:onHideSort="shouldHideResults = false"
            v-on:sort="mobileSort"
            v-on:onShowFilters="hideResults()"
            v-on:onHideFilters="shouldHideResults = false"
            v-if="!hasSelectedItem"
            @filter-chooser-applied="onFilterChangeApplied(filters,'individual', $event)"
            @presets-load="loadConfiguration($event)"
        >
        </filter-component>
        <v-toolbar density="compact" flat class="hidden-lg-and-up mobile-has-selected-row" v-if="hasSelectedItem">
            <v-spacer />
            <v-btn icon="mdi:mdi-close" v-on:click="hasSelectedItem = false">
            </v-btn>
        </v-toolbar>
        <p v-if="shouldShowResultsAndSortingTypeText()" class="mobile-displaying-sort-p">Displaying {{totalIndividuals}} results.</p>
        <v-col ref="mobileTableContainer" class="mobile-individuals-table" v-if="!hasSelectedItem">
            <v-data-table-server
                :items="individuals"
                :items-length="totalIndividuals"
                :loading="loading"
                :mobile-breakpoint=992
                hide-default-header
                class="elevation-1"
                v-model:sort-by="options.sortBy"
                v-model:options="options"
                @click:row="displaySelectedRow"
                v-if="!shouldHideResults"
                items-per-page-text="Rows per page"
            >
                <template v-slot:item="{ item }">
                    <tr class="tr-mobile-individual">
                        <td class="v-data-table__mobile-row mobile-row-header td-mobile-padding custom-mobile-row">
                            {{ item.FirstName }} {{ item.MiddleName }} {{ item.LastName }}
                        </td>
                        <td
                            class="v-data-table__mobile-row td-mobile-padding custom-mobile-row"
                            v-if="item.individualEmailsOrdered && item.individualEmailsOrdered.length>0"
                        >
                            {{item.individualEmailsOrdered[0].Email}}
                        </td>
                        <td class="v-data-table__mobile-row custom-mobile-row td-mobile-padding">
                            <span
                                v-for="affiliate in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                 <span v-if="affiliate.UnionRelationshipType">
                                     {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                                 </span>
                            </span>
                        </td>
                        <td class="td-mobile-padding">
                            <v-btn variant="text" icon="mdi:mdi-menu-down" size="small" @click="displaySelectedRow(item)" />
                        </td>
                    </tr>
                </template>
            </v-data-table-server>
        </v-col>
        <div v-if="hasSelectedItem">
            <div class="mobile-selected-item-container">
                <basic-data-component
                    v-on:swipeToClose="hasSelectedItem = false"
                    :officerRoles="getUniqueOfficerRoles(selectedItem.activeIndividualAffiliates)"
                    :individual="selectedItem"
                    :shouldDisplayDataComponent="false"
                ></basic-data-component>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import FilterComponent from "../Common/Grid/FilterComponent";
    import ColumnChooserComponent from "../Common/Grid/ColumnChooserComponent";
    import DownloadComponent from "../Common/Grid/DownloadComponent";
    import headersMixin from "../../mixins/Grid/headersMixin";
    import configurationMixin from "../../mixins/UI/configurationMixin";
    import BasicDataComponent from "./Partial/ViewBasicDataComponent";
    import paginationUrlMixin from "../../mixins/Grid/paginationUrlMixin";
import mobileCheckMixin from "../../mixins/UI/mobileCheckMixin";
import { HOME_PHONE, MOBILE_PHONE, HOME_EMAIL, WORK_EMAIL } from "../../constants/contactTypes";

    export default {
        name: "IndividualListComponent",

        mixins: [headersMixin, configurationMixin, paginationUrlMixin, mobileCheckMixin],

        components: {
            'filter-component': FilterComponent,
            'chooser-component': ColumnChooserComponent,
            'download-component': DownloadComponent,
            'basic-data-component': BasicDataComponent,
        },
        data: () => ({
            shouldHideResults: false,
            filters: [],
            presets: [],
            totalIndividuals: 0,
            individuals: [],
            loading: false,
            showLabel:true,
            options: {
                sortBy: [{ key: 'FullName', order: 'asc' }],
                page: 1,
                itemsPerPage: 10,
            },
            useHomeAddress: false,
            headers: [],
            hasSelectedItem: false,
            selectedItem: [],
            selectedAffiliate: {},
            isShowingFilters: false,
            collapsedFilter: false,
            fixedHeaders: false,
            fixedWidth: 0,
            cellWidth: 100,
            baseUrl: '/api/v2/individual',
            alwaysFilters: 'filter[CustomEndDate]=1',
            urlInclude: 'include=individualAddressesOrdered,Prefix,Suffix,individualAddressesOrdered.StateTerritory,individualEmailsOrdered,individualPhonesOrdered,activeIndividualAffiliates.Affiliate,activeIndividualEmployers,activeIndividualEmployers.JobTitle,activeIndividualEmployers.Employer,activeIndividualEmployers.Employer.Chapter,individualMembers,individualEmails,individualQuickComments,individualQuickComments.IndividualAssessment,activeIndividualAffiliates.LocalDuesCategory,activeIndividualAffiliates.UnionRelationshipType,activeIndividualAffiliates.PaymentMethod,activeIndividualEmployers.WorkLocation,activeIndividualEmployers.WorkLocation.ParentWorkLocation.WorkLocationType,activeIndividualEmployers.WorkLocation.ParentWorkLocation,activeIndividualEmployers.WorkStructure,activeIndividualEmployers.WorkStructure.WorkStructureType,activeIndividualEmployers.WorkStructure.ParentWorkStructure.WorkStructureType,activeIndividualEmployers.WorkStructure.ParentWorkStructure,activeIndividualEmployers.LocalJobClass,activeIndividualEmployers.LocalJobClass.Unit,activeIndividualEmployers.LocalJobClass.NationalJobClass,individualCope,activeIndividualAffiliates.individualOfficers.AffiliateOfficerRole,activeIndividualAffiliates.individualStaff,activeIndividualAffiliates.individualCommitteeMember.AffiliateCommittee,activeIndividualAffiliates.individualStaff.StaffDepartment,activeIndividualAffiliates.individualGroupMember,activeIndividualAffiliates.individualGroupMember.AffiliateGroup,activeIndividualAffiliates.individualCommitteeMember.CommitteeMemberType,individualPhonesOrdered',
        }),
        computed: {
            collapsedFilterRowTheme() {
                return this.collapsedFilter ? 'collapsed-filter-row' : 'row-inline-flex';
            },
            collapsedFilterColTheme() {
                return this.collapsedFilter ? 'collapsed-filter-col' : '';
            },
            collapsedFilterPaddingColTheme() {
                return this.collapsedFilter ? 'collapsed-table-col' : '';
            },
            fixedHeaderTheme() {
                return this.fixedHeaders ? 'fixed-table-header' : '';
            },
        },
        mounted() {
            this.loadConfiguration('');
            this.selectedAffiliate = this.$store.getters['user/selectedAffiliate'];
            const container = document.getElementById('main-container');
            if (!container) {
                console.warn('main-container element not found during mounted');
            }

            // const fullRow = document.querySelector('.v-data-table');
            // const dataTable = document.querySelector('.v-data-table__wrapper');
            // const windowWidth = $(window).width();
            // const windowHeight = $(window).height();
            // const $footer = $(".footer-block");
            // $(window).scroll(function(){
            //     if (windowWidth >= 960 && !fullRow.classList.contains("collapse-table")) {
            //         const footerTop = $footer.offset().top - $(window).scrollTop();
            //         const visibleHeight = Math.min(windowHeight, footerTop) - 144;
            //         dataTable.style.height = visibleHeight + 'px';
            //     }
            // });

            // const topScroll = document.querySelector('.top-scroller');
            // $(dataTable).on('scroll', function () {
            //     $(topScroll).scrollLeft($(dataTable).scrollLeft());
            // });
        },
        watch: {
            options: {
                handler() {
                    if (this.filters.length > 0) {
                        this.getDataFromApi();
                    }
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            getHomePhones: function (individualPhonesOrdered) {
                const phones = individualPhonesOrdered.filter(phone => phone.IndividualPhoneTypeId == HOME_PHONE);
                return phones.length>0 ? phones[0].fullPhone : '';
            },
            getMobilePhones: function (individualPhonesOrdered) {
                const phones = individualPhonesOrdered.filter(phone => phone.IndividualPhoneTypeId == MOBILE_PHONE);
                return phones.length>0 ? phones[0].fullPhone : '';
            },
            getHomeEmails: function (individualEmailsOrdered) {
                const emails = individualEmailsOrdered.filter(email => email.IndividualEmailTypeId == HOME_EMAIL);
                return emails.length>0 ? emails[0].Email : '';
            },
            getWorkEmails: function (individualEmailsOrdered) {
                const emails = individualEmailsOrdered.filter(email => email.IndividualEmailTypeId == WORK_EMAIL);
                return emails.length>0 ? emails[0].Email : '';
            },
            loadConfiguration(key) {
                this.getConfiguration('individual', key).then((response) => {
                    const hasChapters = this.$store.getters['user/selectedAffiliate'].hasChapters;
                    this.headers = response.data.fields.filter(fields => hasChapters || fields['value'] !== 'activeIndividualEmployers.ChapterName');
                    this.headers = this.headers.filter(fields => fields['value'] !== 'PreferredAddress.AddressLine1' && fields['value'] !== 'PreferredAddress.AddressLine2' && fields['value'] !== 'PreferredAddress.City' && fields['value'] !== 'PreferredAddress.StateTerritoryCode' && fields['value'] !== 'PreferredAddress.PostalCode');
                    this.filters = this.parseQueryParams(response.data.filters.filter(filter => hasChapters || filter['name'] !== 'activeIndividualEmployers.Employer.Chapter.ChapterId'));
                    this.setPresetData(response.data);
                    this.updateFilter();
                    this.getDataFromApi();
                });
            },
            initConfiguration() {
                this.getConfiguration('individual', key).then((response) => {
                    const hasChapters = this.$store.getters['user/selectedAffiliate'].hasChapters;
                    this.headers = this.parseHiddenColumn(response.data.fields.filter(fields => hasChapters || fields['value'] !== 'activeIndividualEmployers.ChapterName'));
                    this.filters = this.parseQueryParams(response.data.filters.filter(filter => hasChapters || filter['name'] !== 'activeIndividualEmployers.Employer.Chapter.ChapterId'));
                    this.setPresetData(response.data);
                    this.updateFilter();
                    this.getDataFromApi();
                });
            },
            shouldShowResultsAndSortingTypeText() {
                return !!(this.totalIndividuals && !this.hasSelectedItem && !this.shouldHideResults);

            },
            hideResults(){
                this.shouldHideResults = true;
            },
            mobileSort(sortBy) {
                this.shouldHideResults = false;
                this.options.sortBy = sortBy;
            },
            displaySelectedRow(value) {
                this.hasSelectedItem = true;
                this.selectedItem = value;
            },
            shouldCollapseFilter(val) {
                this.collapsedFilter = val;
            },
            getUniqueOfficerRoles(individualAffiliates) {
                const officerRoles = [];
                for (const individualAffiliate of individualAffiliates) {
                    if (typeof individualAffiliate.individualOfficers === 'undefined' || !individualAffiliate.individualOfficers) {
                        continue;
                    }
                    for (const individualOfficer of individualAffiliate.individualOfficers) {
                        if (individualOfficer.AffiliateOfficerRole && officerRoles.filter((officerRole) => {
                            return officerRole.AffiliateOfficerRoleId === individualOfficer.AffiliateOfficerRole.AffiliateOfficerRoleId;
                        }).length === 0) {
                            officerRoles.push(individualOfficer.AffiliateOfficerRole);
                        }
                    }
                }
                return officerRoles;
            },
            removeFilter(role) {
                for (const search of this.filters) {
                    if ((search.label === 'Officer Roles' || search.label === 'Staff Roles' || search.label === 'Committee Roles' || search.label === 'Group Roles') && (search.label !== role)) {
                        search.value = '';
                        search.visible = false;
                    }
                }
            },
            updateFilter() {
                for (const search of this.filters) {
                    if (search.label === 'Union Roles') {
                        this.removeFilter(search.value);
                        this.filters.filter(filter => filter.label === search.value).map(filter => {
                            filter.visible = true;
                        });
                    }
                    if (search.type === 'autocomplete' && search.value === '') {
                        search.value = null;
                    }
                }
            },
            getFilters() {
                return this.filters.filter((filter) => {
                    return filter.visible
                });
            },
            clearFilters() {
                this.updateQueryParams(this.options, this.filters, this.headers);
                this.getDataFromApi();
            },
            selectedAffiliateMembers(members) {
                return members.filter(member => member.AffiliateId === this.selectedAffiliate.AffiliateId);
            },
            employerStructural(employers) {
                return employers.filter(employer => employer.Employer && employer.Employer.IsStructural == 0);
            },
            employersWithJobClassUnit(employers) {
                return employers.filter(employer => employer.LocalJobClass && employer.LocalJobClass.Unit)
            },
            employersWithNationalJobClass(employers) {
                return employers.filter(employer => employer.LocalJobClass && employer.LocalJobClass.NationalJobClass);
            },
            itemsWithProperty(items, property) {
                return items.filter(item => item[property]);
            },
            getOptionsUrlParams() {
                const { sortBy, page, itemsPerPage } = this.options;
                const sortDefault = sortBy[0] ?? { key: 'FullName', order: 'asc' };
                let sortByField = sortDefault.key ?? 'FullName';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                if (sortByField === 'FullName') {
                    sortByField = 'LastName,FirstName';
                }

                let filter = '';
                filter += '&' + this.alwaysFilters;
                for (const search of this.filters) {
                    if (search.value !== '' && search.value !== null) {
                        filter += '&filter[' + search.name + ']=' + search.value;
                    }
                }

                let urlParams = 'page=' + page + '&per_page=' + itemsPerPage + '&sort=' + sortDirection + sortByField;

                if (filter !== '') {
                    urlParams += filter;
                }

                return urlParams;
            },
            async getDataFromApi() {
                if (this.loading) {
                    return;
                }
                this.loading = true;
                const url = this.baseUrl + '?' + this.getOptionsUrlParams() + '&' + this.urlInclude;

                this.updateQueryParams(this.options, this.filters, this.headers);

                try {
                    const response = await axios.get(url);
                    this.individuals = response.data.data;
                    this.totalIndividuals = response.data.meta.total;
                } catch (error) {
                    console.error(error);
                } finally {
                    this.loading = false;
                }
            },
            updateTableOnSearch() {
                this.options.page = 1;
                this.totalIndividuals = 0;
                this.individuals = [];
                this.fixedHeaders = false;
            },
            onDestroyComponent() {
                const container = document.getElementById('main-container');
                if (!container) {
                    console.warn('main-container element not found during teardown');
                }
            }
        },
        unmounted () {
            this.onDestroyComponent();
        }
    }
</script>

<style scoped>
    .fixed-table-header th {
        position: sticky;
        top: 0;
    }
</style>
