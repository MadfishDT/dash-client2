<template>
    <div class="app bg-white">
        <AppHeader fixed>
            <SidebarToggler class="d-lg-none" display="md" mobile />
            <div class="navbar-brand" to="#">
                <h2>Quantified</h2>
            </div>
            <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />
            <b-navbar-nav class="ml-auto">
                <DefaultCQHeaderDropdownAccnt />
            </b-navbar-nav>
        </AppHeader>
        <div class="app-body">
            <AppSidebar fixed>
                <SidebarHeader/>
                <SidebarForm/>
                <div class="brand-card-header bg-gray-700">
                        <img
                            id="img_profile"
                            width="65"
                            alt="No Image"
                            class="img-avatar font-2xl mr-0 float-left"
                            :src="this.user.imageUrl"
                        />
                </div>

                <div class="brand-card-body bg-dark mb-0 pb-0">
                    <div>
                        <div class="text-muted small">{{this.user.fullname}}</div>
                        <div class="text-muted small font-weight-bold">{{this.user.company}}</div>
                    </div>
                </div>
                <div class="dropdown-divider mt-0 mb-0" style="border-color:gray;" />
                <main v-if="!this.isSidebar">
                <div class="brand-card-body bg-info mb-0 pb-0">
                    <div>
                        <div class="text-light small font-weight-bold">답변자:</div>
                        <div class="text-light font-weight-bold">{{this.auser.fullname}}</div>
                    </div>
                </div>
                </main>    
                <b-tooltip target="img_profile" :title="this.user.fullname"></b-tooltip>
                <SidebarNav v-if="this.isSidebar" class="ml-0 pl-0" :navItems="this.categories.items"></SidebarNav>
                <SidebarFooter />
                <SidebarMinimizer />
            </AppSidebar>
            <main class="main">
                <b-breadcrumb>
                    <div>
                        {{this.questionsTitle}}
                    </div>
                </b-breadcrumb>
                <div class="container-fluid mt-2">
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
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import { ServiceError } from '../service/service.error';
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
import DefaultCQHeaderDropdownAccnt from "./DefaultCQHeaderDropdownAccnt";
import ElementCItemGenerator from "./elementcitem.generator";

export default {
    name: "QCDefaultContainer",
    components: {
        AsideToggler,
        AppHeader,
        AppSidebar,
        AppAside,
        TheFooter,
        Breadcrumb,
        DefaultAside,
        DefaultCQHeaderDropdownAccnt,
        SidebarForm,
        SidebarFooter,
        SidebarToggler,
        SidebarHeader,
        SidebarNav,
        SidebarMinimizer,
        AppHeaderDropdown
    },
    data() {
        return {
            emptyCid: -1,
            isSidebar: true,
            screenMode: {
                creator: 0,
                atable: 1,
                statistics: 2,
                aview: 3
            },
            nav: nav.items,
            user: {
                name: "empty",
                company: "empty",
                imageUrl: "empty",
                fullname: "empty"
            },
            auser: {
                name: "empty",
                company: "empty",
                imageUrl: "empty",
                fullname: "empty"
            },
            questionsTitle: '',
            categories: [],
            cid: -1,
            rawCategoriesDatas: null,
            contentsService: this.$service.$contentsservice,
            loginService: this.$service.$loginservice,
            currentMode: -1,
        };
    },
    created() {
        const user = this.$service.$loginservice.getUser();
        if (user) {
            this.setUserInfo(user);
        }
        this.$service.$loginservice.userChangeSubject.subscribe(user => {
            this.setUserInfo(user);
        });
        this.loadCategories();
    },
    updated() {
      
    },
    mounted: function() {
        this.loadDatas();
    },
    watch: {
        '$route.query'() {
            this.loadDatas();
        }
    },
    methods: {
        showAlert(msg, path) {
            this.$bvModal.msgBoxOk(msg)
            .then(value => {
                if(path) {
                    this.$router.push(path);
                }
            })
            .catch(err => {
                this.$router.push('/page/500');
            });
        },
        async loadDatas() {
            const oldMode = this.currentMode;
            if(this.$route.path.includes('cadminboard/tables')) {
                console.log('mode table');
                this.currentMode = this.screenMode.atable;
                this.isSidebar =  true;
            } else if(this.$route.path.includes('cqboards/cquestions')) {
                this.currentMode = this.screenMode.creator;
                console.log('mode creator');
                this.isSidebar =  true;
            } else if(this.$route.path.includes('cadminboard/aview')) {
                this.currentMode = this.screenMode.aview;
                this.isSidebar =  false;
                console.log('mode aview');
            }
            let isViewChanged = false;
            if(oldMode != this.currentMode) {
                await this.loadCategories();
                isViewChanged = true;
            }
            
            if(this.currentMode !== this.screenMode.aview) {
                this.isSidebar = true;
                
                if (this.$route.query && this.$route.query.cid) {
                        const cid = this.$route.query.cid;
                        if ((this.cid !== cid) || isViewChanged == true) {
                            this.cid = cid;
                            this.contentsService.categoryChangeSubject.next(cid);
                            this.questionsTitle = ElementCItemGenerator.
                            genMakeCategoryItemsDisplayName(this.rawCategoriesDatas, cid);
                        } 
                } else { 
                        let cid = ElementCItemGenerator.getFirstValidCategoryFromItems(this.rawCategoriesDatas);
                        this.cid = cid;
                        this.questionsTitle = ElementCItemGenerator.
                        genMakeCategoryItemsDisplayName(this.rawCategoriesDatas, cid);
                        this.contentsService.categoryChangeSubject.next(cid);
                }
            } else {
                this.isSidebar = false;
                this.loadUserAnswers();
            }
        },
        async loadUserAnswers() {
            if(this.$route.query && this.$route.query.cid && this.$route.query.aid && this.$route.query.uid) {
                const userInfo = await this.loginService.getUserProfileById(this.$route.query.uid);
                this.setAUserInfo(userInfo.data);
                this.contentsService.userAnswerSelectedSubject.next({
                    cid: this.$route.query.cid,
                    aid : this.$route.query.aid}
                );
                 this.questionsTitle = ElementCItemGenerator.
                        genMakeCategoryItemsDisplayName(this.rawCategoriesDatas, this.$route.query.cid);
            }
        },
        async loadCategories() {

              let result = await this.contentsService.getCCategories();
            if(result.code != ServiceError.success) {
                console.log('faile get categories');
            } else {
                const cdata = JSON.parse(result.data.data);
                this.rawCategoriesDatas = cdata;
                if (this.currentMode == this.screenMode.atable) {
                    this.categories = ElementCItemGenerator.genMakeSidebarCTablesItems(cdata);
                } else if(this.currentMode == this.screenMode.creator) {
                    this.categories = ElementCItemGenerator.genMakeSidebarCategoryItems(cdata);
                }
            }

           /* const result = await this.contentsService.getCategories();
            if (result.code === this.$eservice.success) {
                this.rawCategoriesDatas = result.data;
                
            }*/
        },
        setAUserInfo(user) {
            this.auser.fullname = user.user_name;
            let editedName = `${user.user_name}`;
            if (user.user_name.length > 7) {
                editedName = user.user_name.slice(0, 6) + "..";
            }
            this.auser.name = editedName;
            this.auser.company = user.company_name;
            let imageUrl = this.$service.$loginservice.getImageUrl(user.photo);
            if (imageUrl) {
                this.auser.imageUrl = imageUrl;
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
            let imageUrl = this.$service.$loginservice.getImageUrl(user.photo);
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
