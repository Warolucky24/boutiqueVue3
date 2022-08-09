import {createRouter, createWebHistory} from "vue-router";
import NotFound from '@/views/NotFound.vue';
import {ADMIN_ROUTES} from "@/features/admin/Admin.routes";
import {initialFecthProduct} from "@/features/boutique/stores/productStore";
import {initialFectchAdminProduct} from "@/features/admin/stores/adminProductStore";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:"/",
            redirect: '/boutique'
        },
        {
            path: '/boutique',
            beforeEnter: [initialFecthProduct],
            component: () => import('@/features/boutique/Boutique.vue')
        },
        {
            path: '/admin',
            beforeEnter: [initialFectchAdminProduct],
            component: () => import('@/features/admin/Admin.vue'),
            children: ADMIN_ROUTES
        },
        {
            path: "/:notfound(.*)",
            component: NotFound
        }

    ]
})