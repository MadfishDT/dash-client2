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
                                    </b-col>
                                </b-row>
                                <p class="text-muted">계정 생성</p>
                                <b-row>
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
                                                        v-model="password"
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
                                                <b-input-group
                                                    class="mb-3"
                                                >
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i class="cui-arrow-right icons"></i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input
                                                        type="text" readonly
                                                        class="form-control"
                                                        placeholder="회사 이름"
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
                                                    <b-form-input type="text"  v-model="partName" class="form-control" />
                                                </b-input-group>
                                            </b-col>
                                            <b-col>
                                                <b-input-group class="mb-3">
                                                    <b-input-group-prepend>
                                                        <b-input-group-text>
                                                            <i>회사 코드</i>
                                                        </b-input-group-text>
                                                    </b-input-group-prepend>
                                                    <b-form-input readonly type="text" v-model="cCode" class="form-control" />
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
        const user = this.$service.$loginservice.getUser();
        this.cCode = user.company_code;
        this.cName = user.company_name;
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

                const comName = this.selectedCompany != -1? this.selectedCompany : this.cName;
                let userInfo = {
                    email: this.email,
                    password: this.password,
                    name: this.userName,
                    cname: comName,
                    ccode: this.cCode,
                    part: this.partName

                }
                console.log(`register user info is ${userInfo}`);
                let result = await this.contentsService.addNewUser(userInfo);
                if(result.code === ServiceError.duplicate) {
                     this.showAlert('사용자가 존재 합니다.');
                } else if(result.code === ServiceError.notaccept) {
                    this.showAlert('정보가 잘못 되었습니다.');
                } else if(result.code === ServiceError.unknown) {
                    this.showAlert('등록이 실패 하였습니다.');
                } else if(result.code === ServiceError.success) {
                    this.showAlert('등록되었습니다.');
                    this.userImage= 'img/profile.png';
                    this.userName= '';
                    this.email= '';
                    this.password= '';
                    this.rePassword= '';
                    this.partName= '';
                }
            } else {
                 this.showAlert("필수 항목이 부족합니다.");
            }
        }
    }
};
</script>
