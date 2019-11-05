<template>
    <div class="animated fadeIn">
        <b-modal
            centered
            id="modal-modify_status"
            ref="modal_modify_status"
            title="상태를 변경하세요"
            ok-title="확인"
            cancel-title="취소" 
            @ok="handleActiveStatus"
        >
         <b-form-radio-group v-model="campaignStatus" id="basicRadios"
              :plain="true"
              :options="[
                {text: '활성화',value: true},
                {text: '비활성화',value: false},
              ]"
              checked="0"
              stacked>
            </b-form-radio-group>
        </b-modal>
        <b-modal
            centered
            id="modal-modify_name"
            ref="modal_modify_name"
            title="수정할 캠페인 이름을 넣으세요"
            ok-title="확인"
            cancel-title="취소" 
            @ok="handleModifyCampaignNameOk"
        >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    label="새로운 이름"
                    label-for="name-input"
                    invalid-feedback="Name is required"
                >
                    <b-form-input
                        id="name-input"
                        :placeholder="selectedName"
                        v-model="cModiName"
                        required
                    ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <b-modal
            centered
            id="modal-category_template"
            ref="modal_category_template"
            title="템플릿(카테고리) 선택하기"
            ok-title="확인"
            cancel-title="취소"
            @ok="handleSelectTemplateOk"
        >
            <b-row>
                <b-col cols="12">
                        <b-form-select
                            value-field="code"
                            text-field="name"
                            v-model="selectTemplate"
                            :options="templateOptions"
                            :select-size="6"
                        ></b-form-select>
                  
                     <div class="mt-3">
                            선택(ID):
                            <strong>{{ selectTemplate }}</strong>
                        </div>
                </b-col>
            </b-row>
        </b-modal>
        <b-modal
            centered
            id="modal-portfolio"
            ref="modal_portfolio_select"
            title="포트 폴리오 선택"
            ok-title="확인"
            cancel-title="취소"
            @ok="handleSelectPortfolioOk"
        >
            <b-row>
                <b-col cols="6">
                    <b-card class="mt-4">
                        <div slot="header">포트폴리오 선택</div>
                        <b-form-select
                            value-field="pid"
                            text-field="name"
                            v-model="portfolioSelected"
                            :options="portfolioOptions"
                            v-on:change="handleSelectedPortfolioItem"
                            :select-size="6"
                        ></b-form-select>
                        <div class="mt-3">
                            선택:
                            <strong>{{ portfolioSelected }}</strong>
                        </div>
                    </b-card>
                </b-col>
                <b-col cols="6">
                    <b-card class="mt-4">
                        <div slot="header">회사 리스트</div>
                        <b-form-select
                            value-field="code"
                            text-field="name"
                            readlony
                            :options="portfolioCompanyOptions"
                            :select-size="6"
                        ></b-form-select>
                    </b-card>
                </b-col>
            </b-row>
        </b-modal>
        <b-modal
            centered
            id="modal-new-name"
            ref="modal_new_name"
            title="새로운 캠페인 이름을 넣으세요"
            ok-title="확인"
            cancel-title="취소"
            @ok="handleAddCampaignOk"
        >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="이름" label-for="name-input" invalid-feedback="Name is required">
                    <b-form-input id="name-input" v-model="cNewName" required></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <b-row rows="7" class="justify-content-end pb-1">
            <b-col>
                <b-row class="justify-content-end pb-1">
                    <b-col cols="1">
                        <button @click="plusCampaign" style="float: right;" ref="plusButton">
                            <i ref="plusIcons" class="icon-plus"></i>
                        </button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <c-table
                            :fields="fields"
                            select-mode="single"
                            :selectable="true"
                            :rowSelected="onRowSelected"
                            :clicked="clickedRow"
                            :table-data="itemsArray"
                            :per-page="40"
                            hover
                            striped
                            bordered
                            small
                            fixed
                            caption="<i class='fa fa-align-justify'></i>캠페인 리스트"
                        ></c-table>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="9">
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <i>선택</i>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                                :readonly="true"
                                type="text"
                                v-model="selectedItem"
                                class="form-control"
                            />
                        </b-input-group>
                    </b-col>
                    <b-col cols="3">
                        <b-button @click="modifyCampaignName">이름변경</b-button>
                        <b-button class="ml-2" @click="detailCampaign">자세히</b-button>
                        <b-button class="ml-2" @click="handleDeleteCampaign">삭제</b-button>
                        <b-button class="ml-2" variant="primary" @click="handleStatusChangeCampaign">상태변경</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-row style="border: 1px solid rgba(0, 0, 0, 0.1);">
            <b-col>
                <b-row>
                      <h3>포트폴리오 정보</h3>
                </b-row>
                <b-row>
                    <b-col cols="5">
                        <b-card class="mt-4">
                            <div slot="header">회사 선택</div>
                            <b-form-select
                                value-field="code"
                                text-field="name"
                                v-model="companySelected"
                                :options="companysOptions"
                                :select-size="6"
                            ></b-form-select>
                            <div class="mt-3">
                                선택:
                                <strong>{{ companySelected }}</strong>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col cols="2" style="display: flex; align-items: center; justify-content: center;">
                        <div>
                            <b-button @click="applySelectCompany" >
                                <i center class="cui-arrow-right icons font-2xl d-block "></i>
                            </b-button>
                        </div>
                    </b-col>
                    <b-col cols="5">
                        <b-card class="mt-4">
                            <div slot="header">회사 리스트</div>
                            <b-row>
                                <b-form-select
                                    value-field="code"
                                    text-field="name"
                                    v-model="companyMappingSelected"
                                    :options="companysMapppingOptions"
                                    :select-size="6"
                                ></b-form-select>
                            </b-row>
                            <b-row>
                                <b-col cols="6">
                                    <div class="mt-3">
                                        선택:
                                        <strong>{{ companyMappingSelected }}</strong>
                                    </div>
                                </b-col>
                                <b-col cols="6">
                                    <b-button
                                        class="ml-2 mt-2"
                                        @click="handleSelectCompayFromPortFolio"
                                        style="float: right;"
                                    >포트 폴리오에서 선택</b-button>
                                    <b-button
                                        class="ml-2 mt-2"
                                        @click="handleDeleteMappingCompayList"
                                        style="float: right;">삭제</b-button>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                      <b-button style="float: right;" class="mb-2" variant="primary" @click="applyPortfolioToCampaign">포트 폴리오 적용하기</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row style="border: 1px solid rgba(0, 0, 0, 0.1);" class='mt-2'>
        <b-col>
            <b-row>
                <h3>템플릿 정보</h3>
            </b-row>
            <b-row>
                    <b-col cols="10" class="mt-2">
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <i>선택</i>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                                :readonly="true"
                                type="text"
                                v-model="selectedTemplate"
                                class="form-control"
                            />
                        </b-input-group>
                    </b-col>
                    <b-col cols="2" class="mt-2">
                        <b-button style="float: right;" class="ml-2" @click="handleTemplateDelete">삭제</b-button>
                        <b-button style="float: right;" @click="handleTemplateSelector">선택/변경</b-button>
                    </b-col>
            </b-row>
               <b-row>
                    <b-col>
                      <b-button style="float: right;" class="mb-2" variant="primary" @click="applyTemplateToCampaign">템플릿 적용하기</b-button>
                    </b-col>
                </b-row>
        </b-col>
        </b-row>
    </div>
</template>

<script>
import { shuffleArray } from "@/shared/utils";
import cTable from "@/views/base/Table.vue";
import { ServiceError } from "../../service/service.error";

const someData = () => shuffleArray([]);

export default {
    name: "campaign-editor",
    components: {
        cTable
    },
    data: function() {
        return {
            campaignStatus: false,
            contentsService: this.$service.$contentsservice,
            contentSubscription: null,
            selectedItem: "",
            selected: null,
            selectedName: '',
            cid: -1,
            cModiName: "",
            itemsArray: someData(),
            cNewName: "",
            fields: [
                { key: "date", label: "마지막 수정시간", sortable: true },
                { key: "name", label: "캠페인이름", sortable: true  },
                { key: "uid", label: "아이디" },
                { key: "template", label: "템플릿" },
                { key: "portfolio", label: "포트폴리오" },
                { key: "activatedText", label: "상태" }
            ],
            companySelected: "", // Array reference
            companysOptions: [
                { value: "a", text: "This is First option" },
                { value: "b", text: "Default Selected Option" },
                { value: "c", text: "This is another option" },
                { value: "d", text: "This one is disabled" },
                { value: "e", text: "This is option e" },
                { value: "f", text: "This is option f" },
                { value: "g", text: "This is option g" }
            ],
            companyMappingSelected: "", // Array reference
            companysMapppingOptions: [],
            portfolioSelected: null,
            portfolioOptions: [],
            portfolioCompanyOptions: [],
            
            templateOptions: [],
            selectTemplate: null,
            selectedTemplate: null
        };
    },
    mounted: function() {
        this.loadCampaings();
        this.loadCompany();
    },
    created: function() {},
    beforeDestroy: function() {},
    methods: {
        detailCampaign() {
            console.log("item is");
        },
        async onRowSelected(items) {
            if (items && items.length > 0) {
                this.selectedItem = `${items[0].name} : ${items[0].uid}`;
                this.selected = items[0];
                this.selectedName = items[0].name;
                if(items[0].ccode) {
                    const templateResult = await this.contentsService.getCCategoriesByCode(items[0].ccode);
                    if(templateResult.code === ServiceError.success) {
                        this.selectedTemplate = `${templateResult.data.name}: ${templateResult.data.code}`;
                    }
                } else {
                    this.selectedTemplate = '';
                }
                
                console.log(this.selectedTemplate);
                const resultMappings = await this.contentsService.getCampaignMappings(this.selected.uid);
                if(resultMappings.code === ServiceError.success) {
                    if(resultMappings.data) {
                        if(resultMappings.data.companies && resultMappings.data.companies.length > 0) {
                            this.companysMapppingOptions= resultMappings.data.companies;
                        }
                    }
                } else {
                    this.companysMapppingOptions = [];
                }
            } else {
                this.selectedItem = '';
                this.selectedName = '';
            }
        },
        clickedRow(record, index) {
            //this.$router.push(`/cadminboard/aview?cid=${this.cid}&uid=${aitem.userid}&aid=${aitem.id}`);
        },
        toDateString(date) {
            const yyyy = date.getFullYear();
            const mm =
                date.getMonth() < 9
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1; // getMonth() is zero-based
            const dd =
                date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            const hh =
                date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            const min =
                date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes();
            const ss =
                date.getSeconds() < 10
                    ? "0" + date.getSeconds()
                    : date.getSeconds();
            return `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`;
        },
        modifyCampaignName() {
            if(this.selected) {
                this.$refs.modal_modify_name.show();
            }
        },
        plusCampaign() {
            this.$refs.modal_new_name.show();
        },
        selectPortFolio() {
            this.$refs.modal_portfolio_select.show();
        },
        showAlert(msg, path) {
            this.$bvModal
                .msgBoxOk(msg)
                .then(value => {
                    if (path) {
                        this.$router.push(path);
                    }
                })
                .catch(err => {
                    return;
                });
        },
        showNotSelectedCampaign() {
            this.showAlert("캠패인을 선택하세요");
        },
        showConfirm(msg) {
            this.boxTwo = "";
            return this.$bvModal
                .msgBoxConfirm(msg, {
                    title: "확인",
                    size: "md",
                    buttonSize: "sm",
                    okVariant: "danger",
                    okTitle: "확인",
                    cancelTitle: "취소",
                    footerClass: "p-2",
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    this.boxTwo = value;
                    return true;
                })
                .catch(err => {
                    // An error occurred
                    return false;
                });
        },
        resetSelected() {
            this.selected = null;
            this.selectedItem = "";
        },
        async loadCompany() {
            let result = await this.contentsService.getCompanys();

            if (result.code === ServiceError.success) {
                console.log(result.data);
                this.companysOptions = result.data;
            } else {
                this.showAlert("회사 코드 획득 실패!!");
            }
        },
        async loadPorfolio() {
            const result = await this.contentsService.getPortfolios();
            if(result.code === ServiceError.success) {
                this.portfolioOptions = result.data;
                
            } else {
                this.showAlert('포트폴리오 가져 오기 실패');
            }
        },
        async loadCampaings() {
            this.resetSelected();
            let result = await this.contentsService.getCampaigns();
            if (result.code === ServiceError.success) {
                this.itemsArray = [];
                result.data.forEach(itemCampaigns => {
                    const dateTime = new Date(itemCampaigns.date);
                    let newItem = {
                        name: itemCampaigns.name,
                        uid: itemCampaigns.uid,
                        ccode: itemCampaigns.ccode,
                        date: this.toDateString(dateTime),
                        activated: itemCampaigns.activated,
                        template: itemCampaigns.ccode,
                        activatedText: itemCampaigns.activated ? "활성" : "비활성"
                    };

                    this.itemsArray.push(newItem);
                });
            }
        },
        async applySelectCompany() {
            if(this.companySelected) {
                const selected = this.companysOptions.find( (item) => {
                    if(this.companySelected === item.code) {
                        return item;
                    }
                });
                if(selected) {
                    const isExistOption = this.companysMapppingOptions.find((item) => {
                        if(item.code == selected.code) {
                            return item;
                        }
                    })
                    if(!isExistOption) {
                        this.companysMapppingOptions.push(selected);
                    }
                    
                }
            }
        },
        handleDeleteMappingCompayList() {
            if(this.companyMappingSelected) {
                const index = this.companysMapppingOptions.findIndex((item) => {
                    if(this.companyMappingSelected == item.code) {
                        return true;
                    }
                });
                if(index >= 0){
                    this.companysMapppingOptions = this.companysMapppingOptions.filter(item => item.code !== this.companyMappingSelected)
                }
            }
            
        },
        async handleSelectCompayFromPortFolio() {
            this.loadPorfolio();
            this.$refs.modal_portfolio_select.show();
        },
        async handleDeleteCampaign() {
            if (this.selected) {
                const msg = `[${this.selected.name}: ${this.selected.uid}]를 삭제 하시겠습니까?`;
                const dResult = await this.showConfirm(msg);
                if (dResult) {
                    const rResult = await this.contentsService.deleteCampaign(
                        this.selected.uid
                    );
                    if (rResult.code === ServiceError.success) {
                        this.showAlert("삭제 되었습니다.");
                        this.loadCampaings();
                    } else {
                        this.showAlert("삭제 실패");
                    }
                } else {
                    return;
                }
            }
        },
        handleSelectedPortfolioItem(pid) {
            console.log(pid);
            const selected = this.portfolioOptions.find(item => {
                return item.pid === pid ? item : null;
            });

            if(selected) {
                this.portfolioCompanyOptions = [];
                this.portfolioCompanyOptions = selected.companies;
            }
        },
        async handleStatusChangeCampaign() {
            if(this.selected) {
                this.campaignStatus = this.selected.activated;
                this.$refs.modal_modify_status.show();
            } else {
                this.showNotSelectedCampaign();     
            }
        },
        handleSelectPortfolioOk() {
            if(this.portfolioSelected) {
                const selectedPort = this.portfolioOptions.find( item => {
                    return item.pid == this.portfolioSelected ? item : null;
                })
                if(selectedPort) {
                    
                    selectedPort.companies.forEach( citem => {
                        if(!this.companysMapppingOptions) {
                            this.companysMapppingOptions = [];
                        }
                        const exist = this.companysMapppingOptions.find( mcitem => {
                            return mcitem.code === citem.code ? mcitem : null;
                        })
                        if(!exist) {
                            this.companysMapppingOptions.push(citem);
                        }
                    });
                }
            }
        },
        async handleModifyCampaignNameOk() {
            //this.selected.name
            if (this.cModiName.length > 0) {
                let copyItem = JSON.parse(JSON.stringify(this.selected));
                copyItem.name = this.cModiName;
                const result = await this.contentsService.updateCampaignName(
                    copyItem
                );
                if (result.code === ServiceError.success) {
                    this.showAlert("수정 되었습니다.");
                    this.loadCampaings();
                } else {
                    this.showAlert("변경 실패");
                }
            } else {
                this.showAlert("변경할 이름이 잘못되었습니다.");
            }
            this.cModiName = "";
        },
        async handleAddCampaignOk() {
            let result = await this.contentsService.getUIDFromServer();
            if (result) {
                let cData = {
                    name: this.cNewName,
                    uid: result.data,
                    template: "",
                    portfolio: "",
                    activated: "비활성"
                };
                const aResult = await this.showConfirm(
                    `${this.cNewName}을 추가 하시겠습니까?`
                );
                if (aResult) {
                    const sResult = await this.contentsService.addNewCampaign(
                        cData
                    );
                    if (sResult.code == ServiceError.success) {
                        this.showAlert("추가 되었습니다.");
                        this.loadCampaings();
                    } else {
                        this.showAlert("실패");
                    }
                }
            }
        },
        async handleActiveStatus() {
            if(this.selected) {
                this.selected.activated = this.campaignStatus;
                const result = await this.contentsService.updateCampaignStatus(this.selected);
                if(result.code === ServiceError.success) {
                    this.showAlert("상태 변경 성공");
                    this.loadCampaings();
                } else {
                    this.showAlert("상태 변경 실패 Error");
                }
            }
            console.log(`this is current status: ${this.campaignStatus}`);
        },
        async applyPortfolioToCampaign() {
            if(this.selected) {
                console.log(this.companysMapppingOptions);
                let codes = [];
                this.companysMapppingOptions.forEach( item =>{
                    console.log("thishisfsfs");
                    codes.push(item.code);
                } );
                console.log(codes);
                const addCampaignMappingResult = await this.contentsService.addCampaignMappings(this.selected,codes);
                if(addCampaignMappingResult.code === ServiceError.success) {
                    this.showAlert('포트폴리오 저장 완료');
                }
            } else {
                this.showAlert('선택된 캠패인이 없습니다.');
            }
        },
        async applyTemplateToCampaign() {
            if(this.selected && this.templateSelectedItem) {
                this.selected.ccode = this.templateSelectedItem.code;
                const result = await this.contentsService.updateCampaignTemplate(this.selected);
                if(result.code === ServiceError.success) {
                    this.showAlert("템플릿 적용 성공");
                    this.loadCampaings();
                } else {
                     this.showAlert("템플릿 적용 실패");
                }
            }
        },
        handleDeactiveStatus() {

        },
        handleSelectTemplateOk() {
            if(this.selectTemplate) {
                this.templateSelectedItem = this.templateOptions.find( (item) => {
                    return item.code === this.selectTemplate;
                });
                this.selectedTemplate = `${this.templateSelectedItem.name}: ${this.templateSelectedItem.code}`;
            }
        },

        async handleTemplateSelector() {
            const result = await this.contentsService.getCCategoriesByUser();
            if(result.code === ServiceError.success) {
                this.templateOptions = result.data;
            }
            this.$refs.modal_category_template.show();
        },
        handleTemplateDelete() {

        }
    }
};
</script>
