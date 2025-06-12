import { createRouter, createWebHistory } from 'vue-router';

import NewReportsComponent from '../../../../../resources/js/components/Common/NewReportsComponent.vue';
import DebugInfo from './src/private/DebugInfo.vue';
import PageCreateForm from './src/private/PageCreateForm.vue';
import PageDashboard from './src/private/PageDashboard.vue';
import PageDataForm from './src/private/PageDataForm.vue';
import PageDataFormThankYou from './src/private/PageDataFormThankYou.vue';
import PageDuesCategoryCreation from './src/private/PageDuesCategoryCreation.vue';
import PageDuesMapping from './src/private/PageDuesMapping.vue';
import PageForm from './src/private/PageForm.vue';
import PageManageForms from './src/private/PageManageForms.vue';
import PageSetting from './src/private/PageSettings.vue';
import PageSubmissionList from './src/private/PageSubmissionList.vue';
import PageViewSubmission from './src/private/PageViewSubmission.vue';
import UrlRedirects from './src/private/UrlRedirects.vue';
// import PageTest from './src/private/PageTest.vue';

export default createRouter({
    history: createWebHistory('/app/memberforms/admin'),
    routes: [{
        path: '/',
        component: PageDashboard,
        meta: {
            label: 'Dashboard', navTitle: 'Dashboard', icon: 'mdi-view-dashboard', visible: false,
        },
        name: 'dashboard',
    },
    {
        path: '/list',
        component: PageSubmissionList,
        meta: {
            label: 'Submission List', icon: 'mdi:mdi-format-list-bulleted', visible: true,
        },
        menuItems: [
            {
                path: '/list?type=new', label: 'New Submissions', name: 'new-submissions', icon: 'mdi:mdi-clipboard-check-multiple-outline',
            },
            {
                path: '/list', label: 'All Submissions', name: 'all-submissions', icon: 'mdi:mdi-clipboard-text-multiple-outline',
            },
        ],
        name: 'list',
    },
    {
        path: '/view-submission/:id',
        component: PageViewSubmission,
        meta: {
            label: 'ViewSubmission', visible: false,
        },
        name: 'view-submission',
    },
    {
        path: '/manage',
        component: PageManageForms,
        meta: {
            label: 'Manage Forms', icon: 'mdi:mdi-clipboard-edit-outline', visible: true,
        },
        name: 'manage',
    },
    {
        path: '/create',
        component: PageCreateForm,
        meta: {
            label: 'Create Form', icon: 'mdi:mdi-clipboard-plus-outline', visible: true,
        },
        name: 'create',
    },
    {
        path: '/edit',
        component: PageCreateForm,
        meta: {
            label: 'Edit Form', icon: 'mdi:mdi-table-plus', visible: false,
        },
        name: 'edit',
    },
    {
        path: '/url-redirects',
        component: UrlRedirects,
        meta: {
            label: 'URL Redirects', icon: 'mdi:mdi-cached', visible: true,
        },
        name: 'url-redirects',
    },
    {
        path: '/dues-mapping',
        component: PageDuesMapping,
        meta: {
            label: 'Dues Mapping', icon: 'mdi:mdi-format-horizontal-align-center', visible: true,
        },
        name: 'dues-mapping',
    },
    {
        path: '/dues-create',
        component: PageDuesCategoryCreation,
        meta: {
            label: 'Create Dues Mapping', icon: 'mdi:mdi-format-list-checkbox', visible: false,
        },
        name: 'dues-create',
    },
    {
        path: '/settings',
        component: PageSetting,
        meta: {
            label: 'Settings', icon: 'mdi:mdi-cog-outline', visible: true,
        },
        name: 'settings',
    },
    {
        path: '/form/:id',
        component: PageForm,
        meta: {
            displayName: 'Form',
        },
        name: 'form',
    },
    {
        path: '/dataform/:id',
        component: PageDataForm,
        meta: {
            displayName: 'Data Form',
        },
        name: 'data-form',
    },
    {
        path: '/dataformThankyou/:id',
        component: PageDataFormThankYou,
        meta: {
            displayName: 'Data Form',
        },
        name: 'data-form-thank-you',
    },
    {
        path: '/debug',
        component: DebugInfo,
        meta: {
            label: 'Debug Information', icon: 'mdi:mdi-map-check-outline', visible: false,
        },
        name: 'debug',
    },
    {
        path: '/reports',
        component: NewReportsComponent,
        meta: {
            label: 'Reports', icon: 'mdi:mdi-format-list-checkbox', visible: true,
        },
        name: 'reports',
    },
    /* {
        path: '/test',
        component: PageTest,
        meta: {
            label: 'Test', icon: 'mdi-test-tube',
        },
        name: 'create',
    }, */
]});
