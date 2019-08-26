<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="5">
                    <b-card-group>
                        <b-card no-body class="p-4">
                            <b-card-body>
                                <b-form>
                                    <h1>QUANTIFIED ESG</h1>
                                    <p class="text-muted">Sign In to your account</p>
                                    <b-input-group class="mb-3">
                                        <b-input-group-prepend>
                                            <b-input-group-text>
                                                <i class="icon-user"></i>
                                            </b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input
                                            type="text"
                                            class="form-control"
                                            placeholder="Username"
                                            autocomplete="username email" v-model="model.email"
                                        />
                                    </b-input-group>
                                    <b-input-group class="mb-4">
                                        <b-input-group-prepend>
                                            <b-input-group-text>
                                                <i class="icon-lock"></i>
                                            </b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input
                                            type="password"
                                            class="form-control"
                                            placeholder="Password"
                                            autocomplete="current-password" v-model="model.password"
                                        />
                                    </b-input-group>
                                    <b-row>
                                        <b-col cols="12">
                                            <b-button variant="primary" @click="login" class="form-control"> Login</b-button>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-button variant="link" class="px-0">Register</b-button>
                                        </b-col>
                                        <b-col cols="6" class="text-right">
                                            <b-button variant="link" class="px-0">Forgot password?</b-button>
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
                <b-alert :show="dismissCountdown"
                       dismissible
                       variant="dark"
                       @dismissed="dismissCountdown=0">
                {{this.alterText}}
                </b-alert>
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
            model: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        login: async function() {
            console.log(`${this.model.email}  ${this.model.password}`);
            if (this.model.email && this.model.password) {
                let result = await this.$service.$loginservice.login(
                    this.model.email,
                    this.model.password
                );
                if (result) {
                    this.showAlert('Login Suceess');
                } else {
                    this.showAlert('Login Fail');     
                }
            }
            this.isloaderVisible = false;
        },
        showAlert(text) {
            this.alterText = text;
            this.dismissCountdown = 2;
        },
        logout: async function() {
            this.isloaderVisible = true;
            const result = await this.$service.$loginservice.logout();
            if (result) {
                this.showAlert('Logouted');
            } else {
                this.showAlert('Fail Logout');
            }
            this.isloaderVisible = false;
        },
        closeModal: function() {
            this.$refs["alter-modal"].toggle("#toggle-btn");
        }
    }
};
</script>
