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
                                    <h1>등록</h1>
                                    </b-col>
                                    <b-col>
                                    <h5 class="text-right pt-3 text-primary"><a href src="/"><u>로그인 창으로</u></a></h5>
                                    </b-col>
                                </b-row>
                                <p class="text-muted">계정 생성</p>
                                <b-row>
                                    <!--<b-col class="col-md-3 mt-0 pt-0">
                                        <b-row>
                                        <img type="file"
                                            :src="userImage"
                                            class="mt-2 rounded img-thumbnail mb-1"
                                            alt="Profile"
                                        />
                                        </b-row>
                                        <b-row>
                                            <input type="file" ref="profileImgFrom"  @change="previewFiles" style="display: none"/>
                                            <b-button class="mb-2" variant="danger" @click="$refs.profileImgFrom.click()" block>
                                            <i class="fa fa-folder fa-lg"/></b-button>
                                        </b-row>
                                    </b-col>-->
                                    <b-col class="col-md-12">
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
                                                        placeholder="이름"
                                                        autocomplete="username"
                                                        v-model="userName"
                                                    />
                                                </b-input-group>
                                            </b-col>
                                            </b-row>
                                            <b-row>    
                                            <b-col>
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>@</b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="이메일"
                                                        autocomplete="email"
                                                        v-model="email"
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
                                                        placeholder="암호"
                                                        autocomplete="new-password"
                                                        v-model="passoword"
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
                                                        placeholder="암호 확인"
                                                        autocomplete="new-password"
                                                        v-model="rePassword"
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
                                                        v-model="cName"
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
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i>부서이름</i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input type="text" v-model="partName" class="form-control" />
                                                </b-input-group>
                                            </b-col>
                                            <b-col>
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i>회사 코드</i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input type="text" v-model="cCode" class="form-control" />
                                                </b-input-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                                <b-button @click="RegisterUserTry" variant="success" block>등록</b-button>
                            </b-form>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>


import { ServiceError } from '../../service/service.error';

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
            userImage: 'img/profile.png',
            userName: '',
            email: '',
            password: '',
            rePassword: '',
            cName: '',
            cCode: '',
            partName: ''
            //email, password, user_name, company_name, company_code, part
        };
    },
    async mounted() {
        console.log("mounted register");
        let result = await this.contentsService.getCompanys();
        let options = [{ value: -1, text: "--회사를 선택해 주세요--" }];
        result.data.forEach(item => {
            options.push({ value: item.id, text: item.name });
        });
        options.push({ value: -2, text: "--직접 입력--" });
        this.companyOptions = options;
    },
    methods: {
        previewFiles(element) {
            this.userImage = this.$refs.profileImgFrom.files[0];
        },
        getCompanySelectedItem(item) {
            console.log(item);
        },
        searchAddress() {
            
        },
        InputUser() {

        },
        handleAddressOk() {
            console.log(this.resultAddress);
            this.address1 = this.resultAddress.address;
            this.city = this.resultAddress.sido;
            this.zipcode = this.resultAddress.zonecode;
        },
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
        async RegisterUserTry() {
         
            if(this.userName && this.cCode && this.email) {
                if(this.password != this.rePassword || !this.password) {
                    this.showAlert("암호가 일치 하지 않습니다.");
                    return;
                }
                let userInfo = {
                    email: this.email,
                    password: this.password,
                    user_name: this.userName,
                    company_name: this.cName,
                    company_code: this.cCode,
                    part: this.partName

                }
                let result = await this.contentsService.addNewUser(userInfo);
                if(result.code === ServiceError.duplicate) {
                     this.showAlert("사용자가 존재 합니다.");
                } else if(result.code === ServiceError.notaccept) {
                    this.showAlert("정보가 잘못 되었습니다.");
                } else if(result.code === ServiceError.unknown) {
                    this.showAlert("등록이 실패 하였습니다.");
                }
            } else {
                 this.showAlert("필수 항목이 부족합니다.");
            }
        }
    }
};
</script>
