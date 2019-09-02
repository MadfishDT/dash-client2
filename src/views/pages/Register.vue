<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="6" sm="8">
                    <b-card no-body class="mx-4">
                        <b-card-body class="p-4">
                            <b-form>
                                <h1>Register</h1>
                                <p class="text-muted">Create your account</p>
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
                                        autocomplete="username"
                                    />
                                </b-input-group>

                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text>@</b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input
                                        type="text"
                                        class="form-control"
                                        placeholder="Email"
                                        autocomplete="email"
                                    />
                                </b-input-group>

                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text>
                                            <i class="icon-lock"></i>
                                        </b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input
                                        type="password"
                                        class="form-control"
                                        placeholder="Password"
                                        autocomplete="new-password"
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
                                        placeholder="Repeat password"
                                        autocomplete="new-password"
                                    />
                                </b-input-group>

                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text>
                                            <i class="icon-lock"></i>
                                        </b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-select
                                        id="companycode"
                                        class="form-control"
                                        v-model="selectedCompany"
                                        :plain="true"
                                        :options="companyOptions"
                                        :disabled="false"
                                        value="Please select"
                                    ></b-form-select>
                                </b-input-group>

                                <b-button variant="success" block>Create Account</b-button>
                            </b-form>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            contentsService: this.$service.$contentsservice,
            companyOptions: [],
            selectedCompany: -1
        }
    },
    async mounted() {
        console.log("mounted register");
        let result = await this.contentsService.getCompanys();
        let options = [ { value: -1, text: 'Please select an option' }];
        result.data.forEach(item => {
            options.push({ value: item.id, text: item.name });
        });
          options.push({ value: -2, text: 'Write Manually' });
        this.companyOptions= options;
    }
};
</script>
