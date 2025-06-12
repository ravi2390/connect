import { createRouter, createWebHistory, RouterView } from 'vue-router';
// import RouterViewComponent from '../components/Common/RouterViewComponent';
// import LoadingComponent from './components/Common/LoadingComponent';
// import AuthorizationManagerComponent from './components/Common/AuthorizationManagerComponent';
import DashboardComponent from '../components/DashboardComponent';
import ContentBlockListComponent from '../components/List/ContentBlockListComponent';
import UserListComponent from '../components/List/UserListComponent';
import MfpListComponent from '../components/List/MfpListComponent';
// import ActivityListComponent from './components/List/ActivityListComponent';
// import IndividualListComponent from './components/List/IndividualListComponent';
import JobClassListComponent from '../components/List/JobClassListComponent';
// import UnitListComponent from './components/List/UnitListComponent';
// import LocalAgreementListComponent from './components/List/LocalAgreementListComponent';
// import ChapterListComponent from './components/List/ChapterListComponent';
// import AffiliateListComponent from './components/List/AffiliateListComponent';

import ContentBlockEditComponent from "../components/Edit/ContentBlockEditComponent";
import UserEditComponent from '../components/Edit/UserEditComponent';
// import UserAbilityManagerComponent from './components/Common/UserAbilityManagerComponent';

import ContentBlockCreateComponent from "../components/Create/ContentBlockCreateComponent";
import UserCreateComponent from '../components/Create/UserCreateComponent';
import LocalJobClassCreateComponent from '../components/Create/LocalJobClassCreateComponent';
import LocalJobClassEditComponent from '../components/Edit/LocalJobClassEditComponent';

import MemberFormCreateComponent from "../components/Create/MemberFormCreateComponent";
import MemberFormEditComponent from "../components/Edit/MemberFormEditComponent";
import MemberFormListComponent from "../components/List/MemberFormListComponent";

import ReleaseNoteCreateComponent from "../components/Create/ReleaseNoteCreateComponent";
import ReleaseNoteEditComponent from "../components/Edit/ReleaseNoteEditComponent";
import ReleaseNoteListComponent from "../components/List/ReleaseNoteListComponent";

export default createRouter({
    history: createWebHistory('/admin'),
    routes: [
        { path: '/', component: DashboardComponent, name: 'dashboard', meta: { displayName: 'Dashboard', icon: 'mdi:mdi-view-dashboard' } },
        { path: '/content-blocks', component: RouterView, meta: { displayName: 'Content Blocks', icon: 'mdi:mdi-comment-alert' },
            children: [
                { path: '', component: ContentBlockListComponent, name: 'contentBlockList', meta: { displayName: 'Content Block List', icon: 'mdi:mdi-comment-multiple' } },
                { path: 'create', component: ContentBlockCreateComponent, name: 'contentBlockCreate', meta: { displayName: 'Create Content Block', icon: 'mdi:mdi-comment-plus' } },
                { path: ':id', component: ContentBlockEditComponent, name: 'contentBlockEdit', meta: { displayName: 'Edit Content Block', icon: 'mdi:mdi-comment-edit' } },
            ],
        },
        { path: '/user', component: RouterView, meta: { displayName: 'Users', icon: 'mdi:mdi-account-group' },
            children: [
                { path: '', component: UserListComponent, name: 'userList', meta: { displayName: 'Users List', icon: 'mdi:mdi-account-group' } },
                { path: 'create', component: UserCreateComponent, name: 'userCreate', meta: { displayName: 'Create User', icon: 'mdi:mdi-account-plus' } },
                { path: ':id', component: UserEditComponent, name: 'userEdit', meta: { displayName: 'User Edit', icon: 'mdi:mdi-account-edit' } },
            ],
        },

        { path: '/mfp-forms', component: RouterView, meta: { displayName: 'MFP All Forms', icon: 'mdi:mdi-format-list-checkbox' },
            children: [
                { path: '', component: MfpListComponent, name: 'formList', meta: { displayName: 'MFP All Forms List', icon: 'mdi:mdi-account-group' } },
            ]
        },

        { path: '/jobclass', component: RouterView, meta: { displayName: 'Job Classes', icon: 'mdi:mdi-alpha-j-circle' },
            children: [
                { path: '', component: JobClassListComponent, name: 'jobClassList', meta: { displayName: 'Job Classes', icon: 'mdi:mdi-alpha-j-circle' } },
                { path: 'create', component: LocalJobClassCreateComponent, name: 'jobclassCreate', meta: { displayName: 'LocalJobClass Create', icon: 'mdi:mdi-account-plus' } },
                { path: ':id', component: LocalJobClassEditComponent, name: 'localJobClassEdit', meta: { displayName: 'LocalJobClass Edit', icon: 'mdi:mdi-account-edit' } },
            ],
        },

        //   { path: '/activity', component: ActivityListComponent, name: 'activityList', meta: { displayName: 'Activity', icon: 'mdi:mdi-format-list-checks', divider: true } },
        //   { path: '/individual', component: IndividualListComponent, name: 'individualList', meta: { displayName: 'Individuals', icon: 'mdi:mdi-alpha-i-circle' } },
        //   { path: '/jobclass', component: JobClassListComponent, name: 'jobClassList', meta: { displayName: 'Job Classes', icon: 'mdi:mdi-alpha-j-circle' } },
        //   { path: '/unit', component: UnitListComponent, name: 'unitList', meta: { displayName: 'Units', icon: 'mdi:mdi-alpha-u-circle' } },
        //   { path: '/localagreement', component: LocalAgreementListComponent, name: 'localAgreementList', meta: { displayName: 'Local Agreements', icon: 'mdi:mdi-alpha-l-circle' } },
        //   { path: '/chapter', component: ChapterListComponent, name: 'chapterList', meta: { displayName: 'Chapters', icon: 'mdi:mdi-alpha-c-circle' } },
        //   { path: '/affiliate', component: AffiliateListComponent, name: 'affiliateList', meta: { displayName: 'Affiliates', icon: 'mdi:mdi-alpha-a-circle' } },
        { path: '/member-forms', component: RouterView, meta: { displayName: 'MFP Templates', icon: 'mdi:mdi-comment-alert' },
            children: [
                { path: '', component: MemberFormListComponent, name: 'memberFormsList', meta: { displayName: 'MFP Template Assignment', icon: 'mdi:mdi-comment-multiple' } },
                { path: 'create', component: MemberFormCreateComponent, name: 'memberFormCreate', meta: { displayName: 'ASSIGN TEMPLATE', icon: 'mdi:mdi-comment-plus' } },
                { path: ':id', component: MemberFormEditComponent, name: 'memberFormEdit', meta: { displayName: 'ASSIGN TEMPLATE', icon: 'mdi:mdi-comment-plus' } },
            ],
        },
        { path: '/release-notes', component: RouterView, meta: { displayName: 'Release Notes', icon: 'mdi:mdi-format-list-checkbox' },
            children: [
                { path: '', component: ReleaseNoteListComponent, name: 'releaseNoteList', meta: { displayName: 'Release Notes List', icon: 'mdi:mdi-comment-multiple' } },
                { path: 'create', component: ReleaseNoteCreateComponent, name: 'releaseNoteCreate', meta: { displayName: 'Create Release Note', icon: 'mdi:mdi-comment-plus' } },
                { path: ':id', component: ReleaseNoteEditComponent, name: 'releaseNoteEdit', meta: { displayName: 'Edit Release Note', icon: 'mdi:mdi-comment-edit' } },
            ],
        },
    ]
});
