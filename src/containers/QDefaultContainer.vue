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
             
                <b-tooltip target="img_profile" :title="this.user.fullname"></b-tooltip>
                <SidebarNav :navItems="nav"></SidebarNav>
                <SidebarFooter />
                <SidebarMinimizer />
            </AppSidebar>
            <main class="main">
                <Breadcrumb />
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
            <AppAside fixed>
                <!--aside-->
                <DefaultAside />
            </AppAside>
        </div>
        <TheFooter>
            <!--footer-->
            <div>
                <a href="https://coreui.io">CoreUI</a>
                <span class="ml-1">&copy; 2018 creativeLabs.</span>
            </div>
            <div class="ml-auto">
                <span class="mr-1">Powered by</span>
                <a href="https://coreui.io">CoreUI for Vue</a>
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
            }
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
    },
    methods: {
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
        list() {
            return this.$route.matched.filter(
                route => route.name || route.meta.label
            );
        }
    }
};
</script>
