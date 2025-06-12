/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import { createApp } from "vue";
import './bootstrap';
import { VueSignaturePad } from 'vue-signature-pad';
import PublicApp from './PublicApp.vue';
import vuetify from '../../../../../resources/js/plugins/vuetify';
import routes from './publicRoutes';
import MfpTypes from './src/shared/plugins/MfpTypes';

const app = createApp(PublicApp);
app.use(routes);
app.use(vuetify);
app.component('VueSignaturePad', VueSignaturePad);
app.use(MfpTypes);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const filesShared = require.context('./src/shared', true, /\.vue$/i);
// filesShared.keys().map((key) => Vue.component(key.split('/').pop().split('.')[0], filesShared(key).default));
//
// const filesPublic = require.context('./src/public', true, /\.vue$/i);
// filesPublic.keys().map((key) => Vue.component(key.split('/').pop().split('.')[0], filesPublic(key).default));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

app.mount('#app');
// const app = new Vue({
//     router: new VueRouter({ mode: 'history', base: '/app/memberforms/', routes }),
//     vuetify: new Vuetify(),
//     render: (h) => h(PublicApp),
// }).$mount('#app');
//
// export default new Vuetify({
//     icons: {
//         iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
//     },
// });
