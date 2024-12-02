import PublicView from "@/views/PublicView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/public' },
        {
            path: "/public",
            name: "PublicView",
            component: PublicView,
            children: [
                {
                    path: "",
                    name: "WelcomeComponent",
                    component: () => import('@/components/Welcome.vue'),
                },
                {
                    path: "group-chat",
                    name: "GroupChat",
                    component: () => import('@/components/GroupChat.vue'),
                },
                {
                    path: "docmgt",
                    name: "DocumentsView",
                    component: () => import('@/views/DocumentsView.vue'),
                    children: [
                        {
                            path: '',
                            name: 'DocumentList',
                            component: () => import('@/components/DocumentList.vue'),
                        },
                        {
                            path: 'share/:id',
                            name: 'SharedView',
                            component: () => import('@/views/SharedView.vue'),
                            children: [
                                {
                                    path: '',
                                    name: 'ShareComponent',
                                    component: () => import('@/components/Sharing.vue'),
                                }
                            ]
                        },
                    ]
                },
                {
                    path: 'users',
                    component: () => import('@/views/UsersView.vue'),
                    children: [
                        {
                            path: 'usermgt',
                            name: "UserList",
                            component: () => import('@/components/UserList.vue'),
                        },
                        {
                            path: 'edit/:id',
                            component: () => import('@/views/EditView.vue'),
                            children: [
                                {
                                    path: '',
                                    component: () => import('@/components/EditUsers.vue'),
                                },
                            ]
                        },
                        {
                            path: 'login',
                            name: "LoginComponent",
                            component: () => import('@/components/Login.vue'),
                        },
                        {
                            path: 'register',
                            name: "RegisterComponent",
                            component: () => import('@/components/Register.vue'),
                        },
                        {
                            path: "login-success",
                            name: "LoginSuccessful",
                            component: () => import('@/components/LoginSuccessful.vue'),
                        },
                        {
                            path: "registration-success",
                            name: "RegistrationSuccessful",
                            component: () => import('@/components/RegistrationSuccessful.vue'),
                        },
                    ]
                },

            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: "NotFoundView",
            // component: () => import('@/views/NotFoundView.vue'),
            redirect: "/public"
        },
    ]
});
export default router;