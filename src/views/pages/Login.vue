<template>
    <div class="app flex-row align-items-center">
        <div class="container">
           
            <b-row class="justify-content-center">
                <b-col md="5">
                    <b-card-group>
                        <b-card no-body class="p-4">
                            <b-card-body>
                                <b-form>
                                    <div>
                                        <b-row>
                                            <b-col cols="10">
                                                <h1 class="mt-1" >QUANTIFIED ESG</h1>
                                            </b-col>
                                            <b-col>
                                                <div  id="icon-backtowork">
                                                    <i v-if="isLogined" @click="goToWork" class="icon-login icons font-2xl d-block mt-3"></i>
                                                </div>
                                                 <b-tooltip target="icon-backtowork" title="back to work"></b-tooltip>
                                            </b-col>
                                        </b-row>
                                    </div>
                                    <b-row>
                                        <b-col cols="7">
                                        <p class="text-muted mt-1">로그인 하세요</p>
                                        </b-col>
                                        <b-col>
                                           <b-button variant="link" href="/#/admin" class="px-0 mb-1 ml-4">관리자 로그인</b-button>
                                        </b-col>
                                    </b-row>
                                    <b-input-group class="mb-3">
                                        <b-input-group-prepend>
                                            <b-input-group-text>
                                                <i class="icon-user"></i>
                                            </b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input
                                            :readonly="this.loginForm.readOnly"
                                            type="text"
                                            class="form-control"
                                            placeholder="이메일"
                                            autocomplete="username email"
                                            v-model="model.email"
                                        />
                                    </b-input-group>
                                    <b-input-group class="mb-4">
                                        <b-input-group-prepend>
                                            <b-input-group-text>
                                                <i class="icon-lock"></i>
                                            </b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input
                                            :readonly="this.loginForm.readOnly"
                                            type="password"
                                            class="form-control"
                                            placeholder="암호"

                                            autocomplete="current-password"
                                            @keyup.enter="authenticate"
                                            v-model="model.password"
                                        />
                                    </b-input-group>
                                    <b-row>
                                        <b-col cols="12">
                                            <b-button id="icon-backtowork2"
                                                block
                                                :variant="this.loginForm.color"
                                                @click="authenticate"
                                            >{{this.loginForm.loginAndLogoutText}}</b-button>
                                        </b-col>
                                    </b-row>
                                    <b-row v-if="!isLogined">
                                        <b-col cols="6">
                                        </b-col>
                                        <b-col cols="6" class="text-right">
                                            <b-button variant="link" class="px-0">암호 재설정</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
            <b-row class="justify-content-center">
                <div style="position: absolute">
                    <b-alert
                        :show="dismissCountdown"
                        dismissible
                        variant="dark"
                        @dismissed="dismissCountdown=0"
                    >{{this.alterText}}</b-alert>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            alterText: 'no data',
            dismissCountdown: 0,
            isLogined: false,
            loginForm: {
                loginAndLogoutText: 'Login',
                readOnly: false,
                color: 'primary'
            },
            model: {
                email: '',
                password: ''
            },
            loginService: this.$service.$loginservice
        };
    },
    async mounted() {
        const result = await this.loginService.getAuthenticated();
        this.isLogined = result.code === this.$eservice.success ? true : false;
        this.adjustLoginFormUI(result.data);
        const authChangeSubject = await this.loginService
            .authChangeSubject;
        authChangeSubject.subscribe(isAuthenticated => {
            this.isLogined = isAuthenticated;
        });
    },
    methods: {
        adjustLoginFormUI: function(userProfile) {
            if (userProfile) {
                this.model.email = userProfile.email;
                this.model.password = "*********";
                this.loginForm.readOnly = true;
                this.loginForm.color = "secondary";
                this.loginForm.loginAndLogoutText = "로그아웃";
            } else {
                this.model.email = '';
                this.model.password = '';
                this.loginForm.readOnly = false;
                this.loginForm.color = "primary";
                this.loginForm.loginAndLogoutText = "로그인";
            }
        },
        authenticate: async function() {
            if (this.isLogined) {
                this.logout();
            } else {
                this.login();
            }
        },
        goToWork() {
            const user = this.loginService.getUser();
            if( user ) {
                if(user.agreement){
                    this.$router.push("/qboards/questions");
                } else {
                    this.$router.push("/page/agree");
                }
            }
        },
        login: async function() {
            if (this.model.email && this.model.password) {
                let result = await this.loginService.login(
                    this.model.email,
                    this.model.password
                );
                if (result.code == this.$eservice.success) {
                    this.showAlert("로그인 성공");
                    this.goToWork();
                } else {
                    this.showAlert("로그인 실패");
                }
            } else {
                this.showAlert("이메일 또는 암호가 잘못되었습니다.");
            }
        },
        showAlert(text) {
            this.alterText = text;
            this.dismissCountdown = 2;
        },
        logout: async function() {
            const result = await this.loginService.logout();
            if (result.code === this.$eservice.success) {
                this.isLogined = false;
                this.showAlert("로그아웃 성공");
            } else {
                this.showAlert("로그아웃 실패");
            }
            this.adjustLoginFormUI();
        },
        closeModal: function() {
            this.$refs["alter-modal"].toggle("#toggle-btn");
        }
    }
};
</script>
