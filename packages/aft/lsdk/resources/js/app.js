import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueRouter from 'vue-router';
import '@mdi/font/css/materialdesignicons.css';
import moment from 'moment';
import LookerApp from './lookerApp';

require('./bootstrap');

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.prototype.moment = moment;

import LookerDashboardComponent from './components/LookerDashboardComponent';

const routes = [
    { 
        // change this path to something else in future
        path: '/', 
        component: LookerDashboardComponent, 
        name: 'lookerDashboard', 
        meta: { displayName: 'Looker Dashboard', icon: 'mdi-view-dashboard' } 
    }
];

const options = {
    icons: {
        iconfont: 'mdi',
    },
};

const app = new Vue({
    router: new VueRouter({ mode: 'history', base: '/looker', routes }),
    vuetify: new Vuetify(options),
    render: h => h(LookerApp)
}).$mount('#app');