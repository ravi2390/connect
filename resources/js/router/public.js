import { createRouter, createWebHistory } from 'vue-router';
import PublicComponent from "../components/Public/PublicComponent";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/public/index',
            name: 'Public',
            component: PublicComponent,
        },
    ]
})
