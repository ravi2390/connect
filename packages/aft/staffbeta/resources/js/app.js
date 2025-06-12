/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import { createApp } from 'vue';

import './bootstrap';
import router from './router';
import vuetify from '../../../../../resources/js/plugins/vuetify';
import StaffApp from './StaffApp.vue';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Vue.use(BootstrapVue);
// Vue.use(IconsPlugin);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./components', true, /\.vue$/i);
// files.keys().map((key) => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = createApp(StaffApp);
app.use(router);
app.use(vuetify);
app.mount('#app');
