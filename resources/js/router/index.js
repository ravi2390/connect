import { createRouter, createWebHistory } from 'vue-router';
import AffiliateDisplayComponent from "../components/Affiliate/AffiliateDisplayComponent";
import AffiliateListComponent from "../components/Affiliate/AffiliateListComponent";
import AddDropReportComponent from "../components/Common/AddDropReportComponent";
import AssessmentReportComponent from "../components/Common/AssessmentReportComponent";
import CopeReportComponent from "../components/Common/CopeReportComponent";
import OfficerReportComponent from "../components/Common/OfficerReportComponent";
import ReportsComponent from "../components/Common/ReportsComponent";
import UnitReportComponent from "../components/Common/UnitReportComponent";
import HomeComponent from "../components/HomeComponent";
import CompareIndividualComponent from "../components/Individual/CompareIndividualComponent";
import IndividualDetailsComponent from "../components/Individual/IndividualDetailsComponent";
import IndividualListComponent from "../components/Individual/IndividualListComponent";
import ReleaseNotesComponent from "../components/Public/ReleaseNotesComponent";
import NotFoundComponent from "../components/Static/NotFoundComponent";
import WhatsNewComponent from "../components/Static/WhatsNewComponent";

import ActivityListComponent from "../components/Activity/ActivityListComponent";
import AffiliateCreateComponent from "../components/Affiliate/AffiliateCreateComponent";
import AffiliateEditMainComponent from "../components/Affiliate/AffiliateEditMainComponent";
import AffiliatesSearchComponent from "../components/Affiliate/AffiliatesSearchComponent";
import OfficerSearchComponent from "../components/Affiliate/OfficerSearchComponent";
import ChapterDetailsComponent from "../components/Chapter/ChapterDetailsComponent";
import ChapterListComponent from "../components/Chapter/ChapterListComponent";
import NewReportsComponent from "../components/Common/NewReportsComponent";
import EmployerDetailsComponent from "../components/Employer/EmployerDetailsComponent";
import EmployerListComponent from "../components/Employer/EmployerListComponent";
import EmployerSearchComponent from "../components/Employer/EmployerSearchComponent";
import EditIndividualComponent from "../components/Individual/EditIndividualComponent";
import IndividualAddComponent from "../components/Individual/IndividualAddComponent";
import IndividualAddNewComponent from "../components/Individual/IndividualAddNewComponent";
import IndividualEduesComponent from "../components/Individual/IndividualEduesComponent";
import IndividualSearchComponent from "../components/Individual/IndividualSearchComponent";
import LookerDashboardComponent from "../components/Looker/LookerDashboardComponent";
import UnitListComponent from "../components/Units/UnitListComponent";
import MyAccountComponent from "../components/User/MyAccountComponent";
import OneSchemaFileValidationComponent from '@aft/file_uploader_ui';

export default createRouter({
    base: '/',
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: HomeComponent
        },
        {
            path: '/dashboard',
            redirect: { name: 'Dashboard', query: {} }
        },
        {
            path: '/user/login',
            redirect: { name: 'Dashboard', query: {} }
        },
        {
            path: '/home',
            name: 'Home',
            component: HomeComponent
        },
        {
            path: '/affiliate',
            name: 'Affiliate',
            component: AffiliateDisplayComponent
        },
        {
            path: '/affiliates/admin',
            name: 'AffiliatesAdmin',
            component: AffiliateListComponent
        },
        {
            path: '/affiliates/search',
            name: 'AffiliatesSearch',
            component: AffiliatesSearchComponent
        },
        {
            path: '/affiliates/create',
            name: 'AffiliateCreate',
            component: AffiliateCreateComponent
        },
        {
            path: '/affiliates/:id',
            name: 'AffiliateDisplay',
            component: AffiliateDisplayComponent
        },
        {
            path: '/affiliates/:id/edit',
            name: 'AffiliateEdit',
            component: AffiliateEditMainComponent
        },
        {
            path: '/employers',
            name: 'Employers',
            component: EmployerListComponent
        },
        {
            path: '/employers/search',
            name: 'EmployersSearch',
            component: EmployerSearchComponent
        },
        {
            path: '/employers/:id',
            name: 'EmployerDetails',
            component: EmployerDetailsComponent
        },
        {
            path: '/individuals',
            name: 'Individuals',
            component: IndividualListComponent
        },
        {
            path: '/individuals/add',
            name: 'IndividualAdd',
            component: IndividualAddComponent
        },
        {
            path: '/individuals/search',
            name: 'IndividualSearch',
            component: IndividualSearchComponent
        },
        {
            path: '/individuals/search/officer',
            name: 'OfficerSearch',
            component: OfficerSearchComponent
        },
        {
            path: '/individuals/new/:firstName?/:preferredName?/:middleName?/:lastName?',
            name: 'IndividualNew',
            component: IndividualAddNewComponent
        },
        {
            path: '/individuals/new/',
            name: 'IndividualNew2',
            component: IndividualAddNewComponent
        },
        {
            path: '/individuals/:id',
            name: 'IndividualDetails',
            component: IndividualDetailsComponent
        },
        {
            path: '/compare-individual/:id',
            name: 'CompareIndividual',
            component: CompareIndividualComponent
        },
        {
            path: '/individuals/:id/edit',
            name: 'EditIndividual',
            component: EditIndividualComponent
        },
        {
            path: '/chapters',
            name: 'Chapters',
            component: ChapterListComponent
        },
        {
            path: '/edues',
            name: 'eDues',
            component: IndividualEduesComponent
        },
        {
            path: '/chapters/:id',
            name: 'ChapterDetails',
            component: ChapterDetailsComponent
        },
        {
            path: '/oldreports',
            name: 'Old Reports',
            component: ReportsComponent
        },
        {
            path: '/reports',
            name: 'Reports',
            component: NewReportsComponent
        },
        {
            path: '/unit-report',
            name: 'UnitReport',
            component: UnitReportComponent
        },
        {
            path: '/add-drop-report',
            name: 'AddDropReport',
            component: AddDropReportComponent
        },
        {
            path: '/officer-report',
            name: 'OfficerReport',
            component: OfficerReportComponent
        },
        {
            path: '/assessment-report',
            name: 'AssessmentReport',
            component: AssessmentReportComponent
        },
        {
            path: '/cope-report',
            name: 'CopeReport',
            component: CopeReportComponent
        },
        {
            path: '/whatsnew',
            name: 'WhatsNew',
            component: WhatsNewComponent
        },
        {
            path: '/releasenotes',
            name: 'Release Notes',
            component: ReleaseNotesComponent
        },
        {
            path: '/units',
            name: 'Units',
            component: UnitListComponent
        },
        {
            path: '/user/myaccount',
            name: 'MyAccount',
            component: MyAccountComponent
        },
        {
            path: '/activity',
            name: 'Activity',
            component: ActivityListComponent
        },
        {
            path: '/app/fileuploader',
            name: 'OneSchema',
            component: OneSchemaFileValidationComponent
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Page Not Found',
            component: NotFoundComponent
        },
        {
            path: '/looker-dashboard',
            name: 'LookerDashboard',
            component: LookerDashboardComponent
        },
    ]
})
