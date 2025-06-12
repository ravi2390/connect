/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import { format } from 'date-fns';
import { createApp } from 'vue';
import { createOneSchemaImporter } from '@oneschema/vue'
import axios from "axios";
import './bootstrap';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store/store';

import myApp from "./myApp";

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = createApp(myApp);
app.use(router);
app.use(store);
app.use(vuetify);

// Setup oneschema fileimporter.
axios.get(`/api/v2/custom/oneschema/getOneSchemaCreateParams`)
    .then((response) => {
        app.use(createOneSchemaImporter(response.data));
    })
    .catch(error => {
        console.error(error.response.data.message);
    });

app.config.globalProperties.$filters = {
    formatDate(value) {
        if (!value) return '';
        if (typeof value === 'string') {
            value = value.replace('Z', '');
            value = new Date(value);
        }
        return format(value, 'MMM dd, yyyy');
    },
    formatDateTime(value) {
        if (!value) return '';
        if (typeof value === 'string') {
            value = value.replace('Z', '');
            value = new Date(value);
        }
        return format(value, 'MMM dd, yyyy, h:mm a');
    },
}

store.dispatch('user/getUser').then(
    (res) => {
        app.mount('#app');
    }
);
