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
                <DefaultHeaderDropdownAccnt/>
            </b-navbar-nav>
            <div class="dropdown-divider"></div>
            <AsideToggler class="d-none d-lg-block"/>
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
                </div>

                <div class="brand-card-body bg-dark">
                    <div>
                        <div class="text-uppercase text-muted small">{{this.user.fullname}}</div>
                        <div class="text-muted small font-weight-bold">{{this.user.company}}</div>
                    </div>
                </div>
                <div class="dropdown-divider" style="border-color:gray;"/>
                <b-tooltip target="img_profile" :title="this.user.fullname"></b-tooltip>
                <SidebarNav :navItems="this.categories.items" v-on:click="clickItems()"></SidebarNav>
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
                <a href="https://www.korea.com"></a>
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
import ElementItemGenerator from "./elementitem.generator";

export default {
    name: "QDefaultContainer",
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
            categories: [],
            cid: -1
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
    updated() {
          if (this.$route.query && this.$route.query.cid) {
                const cid = parseInt(this.$route.query.cid);
                console.log(`page router update cid is ${this.cid}-${cid}`);
                if(this.cid !== cid ) {
                    this.cid = cid;
                }
                this.$service.$contentsservice;
           }
    },
    mounted: function() {
    
    },
    methods: {
         clickItems: function() {
           console.log('click items1');
        },
        async loadCategories() {
            let result = await this.$service.$contentsservice.getCategories();
            if (result) {
                this.categories = ElementItemGenerator.genMakeSidebarCategoryItems(result);
            }
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
