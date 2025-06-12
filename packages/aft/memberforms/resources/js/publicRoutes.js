import { createRouter, createWebHistory } from 'vue-router';
import PageFindForm from './src/public/PageFindForm.vue';
import PageForm from './src/public/PageForm.vue';
import PageThankYou from './src/public/PageThankYou.vue';

export default createRouter({
    history: createWebHistory('/app/memberforms'),
    routes: [
        {
            path: '/',
            component: PageFindForm,
            meta: {displayName: 'Find Form'},
            name: 'findForm',
        },
        {
            path: '/form/:id',
            component: PageForm,
            meta: {displayName: 'Form'},
            name: 'form',
        },
        {
            path: '/:affiliateNumber/:customUrl',
            component: PageForm,
            meta: {displayName: 'Form'},
            name: 'form2',
        },
        {
            path: '/form/:id/thankyou',
            component: PageThankYou,
            meta: {displayName: 'Thank You'},
            name: 'thankyou',
        },
    ],
});
