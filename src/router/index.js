
import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
const QDefaultContainer = () => import('@/containers/QDefaultContainer')
const QCDefaultContainer = () => import('@/containers/QCDefaultContainer')
const CategoriesboardEditor = () => import('@/views/CategoriesboardEditor')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Questionsboard = () => import('@/views/Questionsboard')
const QuestionsboardView = () => import('@/views/QuestionsboardView')

const AnswerTables = () => import('@/views/pages/AnswerTables')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const AdminLogin = () => import('@/views/pages/AdminLogin')
const Register = () => import('@/views/pages/Register')
const Agreement = () => import('@/views/pages/Agreement')
const QuestionsCreator = () => import('@/views/pages/QuestionsCreator')
const CategoriesCreator = () => import('@/views/pages/CategoriesCreator');

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')


import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";

import "inputmask/dist/inputmask/phone-codes/phone.js";
import { ServiceError } from '../service/service.error';
widgets.icheck(SurveyVue);
widgets.select2(SurveyVue);
widgets.inputmask(SurveyVue);
widgets.jquerybarrating(SurveyVue);
widgets.jqueryuidatepicker(SurveyVue);
widgets.nouislider(SurveyVue);
widgets.select2tagbox(SurveyVue);
widgets.signaturepad(SurveyVue);
widgets.sortablejs(SurveyVue);
widgets.ckeditor(SurveyVue);
widgets.autocomplete(SurveyVue);
widgets.bootstrapslider(SurveyVue);

Vue.use(Router)

const requireAuth = () => async (from, to, next) => {
    let result = await Vue.prototype.$service.$loginservice.getAuthenticated();
    if(result.code != ServiceError.success) {
      return next('/login');
    } else {
      return next();
    }
}

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/page',
            redirect: '/page/500',
            name: 'Pages',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: 'agree',
                    name: 'Agreement',
                    component: Agreement,
                    beforeEnter: requireAuth(),
                },
                {
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
            ]
        },
        {
            path: '/',
            redirect: '/login',
            name: 'Auth',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'admin',
                    name: 'Admin',
                    component: AdminLogin
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }
            ]
        },
        {
            path: '/cac',
            redirect: '/cac/catecreator',
            name: 'CCategoriesCreator',
            component: {
                render(c) { return c('router-view') }
            },
            beforeEnter: requireAuth(),
            children: [
                {
                    path: 'catecreator',
                    name: 'Catecreator',
                    component: CategoriesCreator
                },
            ]
        },
        {
            path: '/cqboards',
            redirect: '/cqboards/cquestions',
            name: 'CQuestions',
            component: QCDefaultContainer,
            beforeEnter: requireAuth(),
            children: [
                {
                    path: 'cquestions',
                    name: 'cQuestions',
                    component: QuestionsCreator,
                    beforeEnter: requireAuth(),
                }
            ]
        },
        {
            path: '/cadminboard',
            redirect: '/cadminboard/tables',
            name: 'CAdminTables',
            component: QCDefaultContainer,
            beforeEnter: requireAuth(),
            children: [
                {
                    path: 'tables',
                    name: 'AnswerTables',
                    component: AnswerTables,
                    beforeEnter: requireAuth(),
                },
                {
                    path: 'aview',
                    name: 'AnswerViwes',
                    component: QuestionsboardView,
                    beforeEnter: requireAuth(),
                },
                {
                    path: 'cregister',
                    name: 'CRegister',
                    component: Register
                },
                {
                    path: 'ceditor',
                    name: 'Categoriesboard',
                    component: CategoriesboardEditor,
                    beforeEnter: requireAuth(),
                }
            ]
        },
        {
            path: '/qboards',
            redirect: '/qboards/questions',
            name: 'Run',
            component: QDefaultContainer,
            beforeEnter: requireAuth(),
            children: [
                {
                    path: 'questions',
                    name: 'Questions',
                    component: Questionsboard
                }
            ]
        },
        {
            path: '/boards',
            redirect: '/boards/questions',
            name: 'Run',
            component: DefaultContainer,
            children: [
                {
                    path: 'questions',
                    name: 'Questions',
                    component: Questionsboard
                },
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'theme',
                    redirect: '/theme/colors',
                    name: 'Theme',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'colors',
                            name: 'Colors',
                            component: Colors
                        },
                        {
                            path: 'typography',
                            name: 'Typography',
                            component: Typography
                        }
                    ]
                },
                {
                    path: 'charts',
                    name: 'Charts',
                    component: Charts
                },
                {
                    path: 'widgets',
                    name: 'Widgets',
                    component: Widgets
                },
                {
                    path: 'users',
                    meta: { label: 'Users' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: '',
                            component: Users,
                        },
                        {
                            path: ':id',
                            meta: { label: 'User Details' },
                            name: 'User',
                            component: User,
                        },
                    ]
                },
                {
                    path: 'base',
                    redirect: '/base/cards',
                    name: 'Base',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'cards',
                            name: 'Cards',
                            component: Cards
                        },
                        {
                            path: 'forms',
                            name: 'Forms',
                            component: Forms
                        },
                        {
                            path: 'switches',
                            name: 'Switches',
                            component: Switches
                        },
                        {
                            path: 'tables',
                            name: 'Tables',
                            component: Tables
                        },
                        {
                            path: 'tabs',
                            name: 'Tabs',
                            component: Tabs
                        },
                        {
                            path: 'breadcrumbs',
                            name: 'Breadcrumbs',
                            component: Breadcrumbs
                        },
                        {
                            path: 'carousels',
                            name: 'Carousels',
                            component: Carousels
                        },
                        {
                            path: 'collapses',
                            name: 'Collapses',
                            component: Collapses
                        },
                        {
                            path: 'jumbotrons',
                            name: 'Jumbotrons',
                            component: Jumbotrons
                        },
                        {
                            path: 'list-groups',
                            name: 'List Groups',
                            component: ListGroups
                        },
                        {
                            path: 'navs',
                            name: 'Navs',
                            component: Navs
                        },
                        {
                            path: 'navbars',
                            name: 'Navbars',
                            component: Navbars
                        },
                        {
                            path: 'paginations',
                            name: 'Paginations',
                            component: Paginations
                        },
                        {
                            path: 'popovers',
                            name: 'Popovers',
                            component: Popovers
                        },
                        {
                            path: 'progress-bars',
                            name: 'Progress Bars',
                            component: ProgressBars
                        },
                        {
                            path: 'tooltips',
                            name: 'Tooltips',
                            component: Tooltips
                        }
                    ]
                },
                {
                    path: 'buttons',
                    redirect: '/buttons/standard-buttons',
                    name: 'Buttons',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'standard-buttons',
                            name: 'Standard Buttons',
                            component: StandardButtons
                        },
                        {
                            path: 'button-groups',
                            name: 'Button Groups',
                            component: ButtonGroups
                        },
                        {
                            path: 'dropdowns',
                            name: 'Dropdowns',
                            component: Dropdowns
                        },
                        {
                            path: 'brand-buttons',
                            name: 'Brand Buttons',
                            component: BrandButtons
                        }
                    ]
                },
                {
                    path: 'icons',
                    redirect: '/icons/font-awesome',
                    name: 'Icons',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'coreui-icons',
                            name: 'CoreUI Icons',
                            component: CoreUIIcons
                        },
                        {
                            path: 'flags',
                            name: 'Flags',
                            component: Flags
                        },
                        {
                            path: 'font-awesome',
                            name: 'Font Awesome',
                            component: FontAwesome
                        },
                        {
                            path: 'simple-line-icons',
                            name: 'Simple Line Icons',
                            component: SimpleLineIcons
                        }
                    ]
                },
                {
                    path: 'notifications',
                    redirect: '/notifications/alerts',
                    name: 'Notifications',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'alerts',
                            name: 'Alerts',
                            component: Alerts
                        },
                        {
                            path: 'badges',
                            name: 'Badges',
                            component: Badges
                        },
                        {
                            path: 'modals',
                            name: 'Modals',
                            component: Modals
                        }
                    ]
                }
            ]
        }
    ]
})
