import { createRouter, createWebHistory } from 'vue-router';
import ViewDashboard from '../components/ViewDashboard.vue';
import ViewSearchAffiliate from '../components/ViewSearchAffiliate.vue';
import ViewSearchIndividual from '../components/ViewSearchIndividual.vue';
import ViewLists from '../components/ViewLists.vue';
import View404 from '../components/View404.vue';

export default createRouter({
    history: createWebHistory('/app/staff'),
    routes: [
        {
            path: '/',
            component: ViewDashboard,
            meta: {displayName: 'Dashboard'},
            name: 'dashboard',
        },
        {
            path: '/affiliateSearch',
            component: ViewSearchAffiliate,
            meta: {displayName: 'Affiliate Search'},
        },
        {
            path: '/individualSearch',
            component: ViewSearchIndividual,
            meta: {displayName: 'Individual Search', hidden: true, ability: 'memberlists'},
        },
        {
            path: '/lists',
            component: ViewLists,
            meta: {displayName: 'Lists', hidden: true, ability: 'staffportallists'},
            abilities: [
                'affpresidents',
                'aftppcs',
            ],
            name: 'lists',
        },
        {
            path: '/:pathMatch(.*)*',
            component: View404,
            meta: {displayName: 'Page Not Found', hidden: true},
        },
    ],
});
