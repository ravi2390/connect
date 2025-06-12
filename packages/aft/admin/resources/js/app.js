/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import { createApp } from 'vue';

import './bootstrap';
import router from './router';
import vuetify from '../../../../../resources/js/plugins/vuetify';
import adminApp from './adminApp';


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


// Vue.use(VueRouter);
// Vue.use(Vuetify);
// Vue.prototype.moment = moment;

// Vue.component('footer-component', require('./components/Common/FooterComponent').default)
// Vue.component('primary-navigation-component', require('./components/Common/PrimaryNavigation').default)
// Vue.component('authorization-manager-component', require('./components/Common/AuthorizationManagerComponent').default)
//
// Vue.component('loading-component', require('./components/Common/LoadingComponent').default)
// Vue.component('dashboard-component', require('./components/DashboardComponent').default)
// Vue.component('contentblock-list-component', require('./components/List/ContentBlockListComponent').default)
// Vue.component('user-list-component', require('./components/List/UserListComponent').default)
// Vue.component('mfp-list-component', require('./components/List/MfpListComponent').default)
// Vue.component('activity-list-component', require('./components/List/ActivityListComponent').default)
// Vue.component('individual-list-component', require('./components/List/IndividualListComponent').default)
// Vue.component('job-class-list-component', require('./components/List/JobClassListComponent').default)
// Vue.component('unit-list-component', require('./components/List/UnitListComponent').default)
// Vue.component('local-agreement-list-component', require('./components/List/LocalAgreementListComponent').default)
// Vue.component('chapter-list-component', require('./components/List/ChapterListComponent').default)
// Vue.component('affiliate-list-component', require('./components/List/AffiliateListComponent').default)
//
// Vue.component('contentblock-edit-component', require('./components/Edit/ContentBlockEditComponent').default)
// Vue.component('user-edit-component', require('./components/Edit/UserEditComponent').default)
// Vue.component('user-ability-manager-component', require('./components/Common/UserAbilityManagerComponent').default)
//
// Vue.component('contentblock-create-component', require('./components/Create/ContentBlockCreateComponent').default)
// Vue.component('user-create-component', require('./components/Create/UserCreateComponent').default)
// Vue.component('local-job-calss-create-component', require('./components/Create/LocalJobClassCreateComponent').default)
// Vue.component('local-job-calss-edit-component', require('./components/Edit/LocalJobClassEditComponent').default)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// const options = {
//     icons: {
//         iconfont: 'mdi', // default - only for display purposes
//     },
// };

const app = createApp(adminApp);
app.use(router);
app.use(vuetify);
app.mount('#app');
// const app = new Vue({
//     router: new VueRouter({ mode: 'history', base: '/admin/', routes }),
//     vuetify: new Vuetify(options),
//     render: h => h(adminApp)
// }).$mount('#app');
