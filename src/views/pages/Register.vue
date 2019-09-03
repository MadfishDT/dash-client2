<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="9" sm="8">
                    <b-card no-body class="mx-6">
                        <b-card-body class="p-4">
                            <b-form>
                                <b-row>
                                    <b-col>
                                    <h1>Register</h1>
                                    </b-col>
                                    <b-col>
                                    <h5 class="text-right pt-3 text-primary"><a href src="/"><u>login</u></a></h5>
                                    </b-col>
                                </b-row>
                                <p class="text-muted">Create your account</p>
                                <b-row>
                                    <b-col class="col-md-3">
                                        <img
                                            src="img/profile.png"
                                            class="mt-3 rounded img-thumbnail mb-3"
                                            alt="Profile"
                                        />
                                    </b-col>
                                    <b-col class="col-md-9">
                                        <b-row>
                                            <b-col>
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
                                            </b-col>
                                            <b-col>
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
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
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
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i class="icon-lock"></i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input
                                                        type="password"
                                                        class="form-control"
                                                        placeholder="Repeat Password"
                                                        autocomplete="new-password"
                                                    />
                                                </b-input-group>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i class="fa fa-building-o"></i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-select
                                                        id="companycode"
                                                        class="form-control"
                                                        v-model="selectedCompany"
                                                        :plain="true"
                                                        :options="companyOptions"
                                                        :disabled="false"
                                                        v-on:change="getCompanySelectedItem"
                                                        value="Please select"
                                                    ></b-form-select>
                                                </b-input-group>

                                                <b-input-group
                                                    v-if="selectedCompany==companyKind.manually"
                                                    class="mb-3"
                                                >
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i class="cui-arrow-right icons"></i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Your company name"
                                                    />
                                                </b-input-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <b-row>
                                            <b-col>
                                                <b-row>
                                                <b-col class="col-10 mr-0">
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i>Address 1</i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input type="text" v-model="address1" class="form-control" />
                                                </b-input-group>
                                                </b-col>
                                                <b-col class = "ml-0 pl-0">
                                                    <b-button v-b-modal.modal-1 variant="primary" @click="searchAddress" block>
                                                         <i class="fa fa-search fa-lg"/></b-button>
                                                </b-col>
                                                </b-row>
                                                  <b-modal id="modal-1" @ok="handleAddressOk" title="주소 찾기">
                                                        <vue-daum-postcode style="height:470px; overflow-y: scroll;" @complete="resultAddress = $event" />
                                                  </b-modal>
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i>Address 2</i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input type="text" v-model="address2" class="form-control" />
                                                </b-input-group>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i>City</i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input type="text" v-model="city" class="form-control" />
                                                </b-input-group>
                                            </b-col>
                                            <b-col>
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i>Zip Code</i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input type="text" v-model="zipcode" class="form-control" />
                                                </b-input-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
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
            selectedCompany: -1,
            companyKind: {
                empty: -1,
                manually: -2
            },
            resultAddress: null,
            address1: '',
            address2: '',
            city: '',
            zipcode: ''
            
        };
    },
    async mounted() {
        console.log("mounted register");
        let result = await this.contentsService.getCompanys();
        let options = [{ value: -1, text: "--Please select a your company--" }];
        result.data.forEach(item => {
            options.push({ value: item.id, text: item.name });
        });
        options.push({ value: -2, text: "--Write Manually--" });
        this.companyOptions = options;
    },
    methods: {
        getCompanySelectedItem(item) {
            console.log(item);
        },
        searchAddress() {
            
        },
        handleAddressOk() {
            console.log(this.resultAddress);
            this.address1 = this.resultAddress.address;
            this.city = this.resultAddress.sido;
            this.zipcode = this.resultAddress.zonecode;
        }
    }
};
</script>
