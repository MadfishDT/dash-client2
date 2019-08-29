<template>
    <div class="app">
        <AppHeader fixed>
            <SidebarToggler class="d-lg-none" display="md" mobile />
            <div class="navbar-brand" to="#">
                <h2>Quantified</h2>
            </div>
            <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />
            <b-navbar-nav class="ml-auto">
                <b-nav-item class="d-md-down-none">
                    <i class="icon-bell"></i>
                    <b-badge pill variant="danger">5</b-badge>
                </b-nav-item>
                <b-nav-item class="d-md-down-none">
                    <i class="icon-list"></i>
                </b-nav-item>
                <b-nav-item class="d-md-down-none">
                    <i class="icon-location-pin"></i>
                </b-nav-item>
                <DefaultHeaderDropdownAccnt />
            </b-navbar-nav>
            <div class="dropdown-divider"></div>
            <AsideToggler class="d-none d-lg-block" />
            <!--<AsideToggler class="d-lg-none" mobile />-->
        </AppHeader>
        <div class="app-body">
            <AppSidebar fixed>
                <SidebarHeader />
                <SidebarForm />
                <div class="brand-card-header bg-gray-700">
                    <img
                        id="img_profile"
                        width="65"
                        alt="No Image"
                        class="img-avatar font-2xl mr-3 float-left"
                        :src="this.user.imageUrl"
                    />
                    <div class="chart-wrapper">
                        <social-box-chart-example :data="[65, 59, 84, 84, 51, 55, 40]" />
                    </div>
                </div>

                <div class="brand-card-body bg-dark">
                    <div>
                        <div class="text-uppercase text-muted small">{{this.user.fullname}}</div>
                        <div class="text-muted small font-weight-bold">{{this.user.company}}</div>
                    </div>
                </div>
                <div class="dropdown-divider" style="border-color:gray;"/>
                <b-tooltip target="img_profile" :title="this.user.fullname"></b-tooltip>
                <SidebarNav class="bg-dark" :navItems="this.categories.items"></SidebarNav>
                <SidebarFooter />
                <SidebarMinimizer/>
            </AppSidebar>
            <main class="main">
                <div class="container-fluid mt-3">
                    <router-view></router-view>
                </div>
            </main>
            <AppAside fixed>
                <!--aside-->
                <DefaultAside />
            </AppAside>
        </div>
        <TheFooter>
            <div>
                <a href="https://www.korea.com">CoreUI</a>
                <span class="ml-1">&copy; 2019 Quantified</span>
            </div>
        </TheFooter>
    </div>
</template>

<script>
import nav from "@/_navqtemp";
import {
    Header as AppHeader,
    SidebarToggler,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    Aside as AppAside,
    AsideToggler,
    Footer as TheFooter,
    Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";

export default {
    name: "DefaultContainer",
    components: {
        AsideToggler,
        AppHeader,
        AppSidebar,
        AppAside,
        TheFooter,
        Breadcrumb,
        DefaultAside,
        DefaultHeaderDropdownAccnt,
        SidebarForm,
        SidebarFooter,
        SidebarToggler,
        SidebarHeader,
        SidebarNav,
        SidebarMinimizer
    },
    data() {
        return {
            nav: nav.items,
            user: {
                name: "empty",
                company: "empty",
                imageUrl: "empty",
                fullname: "empty"
            },
            categories: []
        };
    },
    created: function() {
        const user = this.$service.$loginservice.getUser();
        if (user) {
            console.log(`user direct set url is: ${JSON.stringify(user)}`);
            this.setUserInfo(user);
        }
        this.$service.$loginservice.userChangeSubject.subscribe(user => {
            console.log(`user subscribe url is: ${JSON.stringify(user)}`);
            this.setUserInfo(user);
        });
        this.loadCategories();
    },
    methods: {
        async loadCategories() {
            let result = await this.$service.$contentsservice.getCategories();
            
            let categories = { 
                items: [
                {
                    title: true,
                    name: 'Categories',
                    class: 'font-lg bg-dark',
                    wrapper: {
                        element: '',
                        attributes: {}
                    }
                }]
            }

            if (result) {
                result.forEach(item => {
                    let resultItem = {
                        name: item.name,
                        url: `/qboards/questions?cid=${item.id}`,
                        icon: 'icon-doc'
                    };
                    
                    if(item.children && item.children.length > 0) {
                        resultItem['children'] = [];
                        item.children.forEach( citem => {
                            resultItem['children'].push({
                                name: citem.name,
                                url: `/qboards/questions?cid=${citem.id}`,
                                icon: 'icon-arrow-right-circle'
                            })
                        });
                    }
                    categories.items.push(resultItem);
                });
            }
            this.categories = categories;
            
              
        },
        setUserInfo(user) {
            this.user.fullname = user.user_name;
            let editedName = `${user.user_name}`;
            if (user.user_name.length > 7) {
                editedName = user.user_name.slice(0, 6) + "..";
            }
            this.user.name = editedName;
            this.user.company = user.company_name;
            console.log(`user.photo url is: ${user.photo}`);
            let imageUrl = this.$service.$loginservice.getImageUrl(user.photo);
            console.log(`image url is: ${imageUrl}`);
            if (imageUrl) {
                this.user.imageUrl = imageUrl;
            }
        }
    },
    computed: {
        name() {
            return this.$route.name;
        },
    }
};
</script>
