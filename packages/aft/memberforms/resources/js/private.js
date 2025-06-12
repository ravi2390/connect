/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import { createApp } from "vue";
import './bootstrap';
import { VueSignaturePad } from 'vue-signature-pad';
import PrivateApp from './PrivateApp.vue';
import routes from './privateRoutes';
import MfpTypes from './src/shared/plugins/MfpTypes';
import store from './store/store';
import vuetify from '../../../../../resources/js/plugins/vuetify';


const app = createApp(PrivateApp);
app.use(routes);
app.use(store);
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

// @todo: Check if this is necessary, components should be loaded as needed.
// const filesShared = import.meta.glob('./src/shared/**/*.vue');
// for (const key in filesShared) {
//     filesShared[key]().then((mod) => {
//         app.component(key.split('/').pop().split('.')[0], mod.default);
//     })
// }

// const filesPrivate = import.meta.glob('./src/private/**/*.vue');
// for (const key in filesPrivate) {
//     filesPrivate[key]().then((mod) => {
//         app.component(key.split('/').pop().split('.')[0], mod.default);
//     })
// }

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

store.dispatch('user/getUser').then(
    () => {
        app.mount('#app');
    },
);
