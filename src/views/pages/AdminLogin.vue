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
                                                <h1 class="mt-1">QUANTIFIED ESG</h1>
                                            </b-col>
                                            <b-col>
                                                <div id="icon-backtowork">
                                                    <i
                                                        v-if="isLogined"
                                                        @click="goToWork"
                                                        class="icon-login icons font-2xl d-block mt-3"
                                                    ></i>
                                                </div>
                                                <b-tooltip
                                                    target="icon-backtowork"
                                                    title="back to work"
                                                ></b-tooltip>
                                            </b-col>
                                        </b-row>
                                    </div>
                                     <b-row>
                                        <b-col cols="9">
                                        <p class="text-muted mt-1">Sign In to your account</p>
                                        </b-col>
                                        <b-col>
                                           <b-button variant="link" href="/#/admin" class="px-0 mb-1">Login</b-button>
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
                                            placeholder="Username"
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
                                            placeholder="Password"
                                            autocomplete="current-password"
                                            v-model="model.password"
                                        />
                                    </b-input-group>
                                    <b-input-group class="mb-4">
                                        <b-input-group-prepend>
                                            <b-input-group-text>
                                                <i>code</i>
                                            </b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input
                                            :readonly="this.loginForm.readOnly"
                                            type="password"
                                            class="form-control"
                                            placeholder="code"
                                            autocomplete="current-password"
                                            v-model="model.code"
                                        />
                                    </b-input-group>
                                    <b-row>
                                        <b-col cols="12">
                                            <b-button
                                                id="icon-backtowork2"
                                                block
                                                :variant="this.loginForm.color"
                                                @click="authenticate"
                                            >{{this.loginForm.loginAndLogoutText}}</b-button>
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
            alterText: "no data",
            dismissCountdown: 0,
            isLogined: false,
            loginForm: {
                loginAndLogoutText: "Login",
                readOnly: false,
                color: "primary"
            },
            model: {
                email: "admin@admin.com",
                password: "admin",
                code: 'admincode'
            },
            loginService: this.$service.$loginservice
        };
    },
    async mounted() {
        const result = await this.loginService.getAuthenticated();
        this.isLogined = result.code === this.$eservice.success ? true : false;
        this.adjustLoginFormUI(result.data);
        const authChangeSubject = await this.loginService.authChangeSubject;
        authChangeSubject.subscribe(isAuthenticated => {
            this.isLogined = isAuthenticated;
        });
    },
    methods: {
        adjustLoginFormUI: function(userProfile) {
            if (userProfile) {
                this.model.email = userProfile.email;
                this.model.password = "*********";
                this.model.code = "*************";
                this.loginForm.readOnly = true;
                this.loginForm.color = "secondary";
                this.loginForm.loginAndLogoutText = "Logout";
            } else {
                this.model.email = "admin@admin.com";
                this.model.password = "admin";
                this.model.code = "admincode";
                this.loginForm.readOnly = false;
                this.loginForm.color = "primary";
                this.loginForm.loginAndLogoutText = "Login";
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
            if (user) {
                this.$router.push("/cqboards");
            }
        },
        login: async function() {
            if (this.model.email && this.model.password && this.model.code) {
                let result = await this.loginService.adminLogin(
                    this.model.email,
                    this.model.password,
                    this.model.code,
                );
                if (result.code == this.$eservice.success) {
                    this.showAlert("Login Suceess");
                    this.goToWork();
                } else {
                    this.showAlert("Login Fail");
                }
            } else {
                this.showAlert("Email or Password is wrong");
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
                this.showAlert("Logout success");
            } else {
                this.showAlert("Logout fail");
            }
            this.adjustLoginFormUI();
        },
        closeModal: function() {
            this.$refs["alter-modal"].toggle("#toggle-btn");
        }
    }
};
</script>
