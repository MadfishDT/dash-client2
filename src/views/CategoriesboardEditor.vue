<template>
    <div class="w-100 h-100">
        <b-modal centered id="modal-prevent-closing" ref="modal_cate_name" title="새로운 카테고리 이름을 넣으세요" @show="resetCategoryModal" @hidden="resetCategoryModal" @ok="handleCategoryOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
                    <b-form-input id="name-input" v-model="cNewName" required></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <b-modal centered id="modal-prevent-closing" ref="modal_cate_rename" title="카테고리 이름을 변경" @show="resetCategoryModal"
         @hidden="resetCategoryModal" @ok="handleCategoryRenameOk">
            <form ref="form" @submit.stop.prevent="handleRenameSubmit">
                <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
                    <b-form-input id="name-input" v-model="cNewName" required></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <b-row align-h="start">
            <b-card class="w-100" header="카테고리들" border-variant="primary">
                <div slot="header">
                    카테고리 편집
                    <div class="card-header-actions">
                        <button><i  @click="plusCategory"  class="icon-plus"></i></button>
                    </div>
                </div>
                <b-card-body class="text-center">
                    <b-container class="m-0 p-0" v-for="(citem) in cData" :key="citem.id" fluid>
                        <b-row>
                            <b-col cols="10" class="m-0 p-0">
                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text>
                                            <i class="icon-doc icons"></i>
                                        </b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input type="text" readonly class="form-control" placeholder="" v-model="citem.name" />
                                </b-input-group>
                            </b-col>
                            <b-col class="ml-0 pl-0">
                                <button><i  @click="plusChildCategory(citem)"  class="icon-plus"></i></button>
                                <button><i  @click="plusEditorbleCategory(citem)" class="cui-circle-check icons"></i></button>
                                <button><i  @click="plusRemoveCategory(citem)" class="icon-close"></i></button>
                                <button><i  @click="plusMoveUp(citem)"  class="cui-arrow-top icons"></i></button>
                                <button><i  @click="plusMoveDown(citem)"  class="cui-arrow-bottom icons"></i></button>
                            </b-col>
                        </b-row>
                        <b-row v-for="(ccitem) in citem.children" :key="ccitem.id" fluid>
                            <b-col cols="10" class="ml-3">
                                <b-input-group class="mb-4">
                                    <b-input-group-prepend>
                                        <b-input-group-text>
                                            <i class="icon-arrow-right-circle icons"></i>
                                        </b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input readonly type="text" class="form-control" placeholder="" v-model="ccitem.name" />
                                </b-input-group>
                            </b-col>
                            <b-col class="ml-0 pl-0">
                                <button><i  @click="plusEditorbleCategory(ccitem)" class="cui-circle-check icons"></i></button>
                                <button><i  @click="plusRemoveCategory(ccitem)" class="icon-close"></i></button>
                                <button><i  @click="plusMoveUp(ccitem)"  class="cui-arrow-top icons"></i></button>
                                <button><i  @click="plusMoveDown(ccitem)"  class="cui-arrow-bottom icons"></i></button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card-body>
            </b-card>
        </b-row>
        <b-row align-h="end">
            <b-col>
                <b-row>
                    <b-col>
                        <b-row>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <i>회사 Code</i>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input type="text" readonly class="form-control" placeholder="code" v-model="curUser.company_code" />
                        </b-input-group>
                        </b-row>
                        <b-row>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <i>카테고리 Code</i>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input type="text" readonly class="form-control" placeholder="ID" v-model="cCodeId" />
                        </b-input-group>
                        </b-row>
                        <b-row>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <i>설명</i>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input type="text" class="form-control" placeholder="설명" v-model="desc" />
                        </b-input-group>    
                        </b-row>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6">
                        <b-button id="icon-backtowork2" block @click="reset">리셋</b-button>
                    </b-col>
                    <b-col cols="6">
                        <b-button id="icon-backtowork2" block @click="save">저장</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import { ServiceError } from '../service/service.error';
import { ElementCItemGenerator } from '../containers/elementcitem.generator';
import { Tree, TreeNode, VueTreeList } from 'vue-tree-list';
import Vue from 'vue';

export default {
    name: "categoriesEditorview",
    components: {
        VueTreeList,
    },
    created: function() {
        this.loadCategories();
        this.curUser = this.loginService.getUser();
    },
    beforeDestroy: function() {

    },
    data() {
        return {
            cCodeId: null,
            curUser: null,
            cNewName: '',
            selectedCData: null,
            desc: '',
            contentsService: this.$service.$contentsservice,
            loginService: this.$service.$loginservice,
            rawCategoriesDatas: {},
            categories: {},
            newTree: {},
            cData: [],
            cOriginData: [{
                    name: '근로조건',
                    id: 'c41b90f9-6147-4c95-9396-e8f1c56e09e6',
                    children: [{
                            name: '근로조건1',
                            id: 'aea996ee-6a25-407f-9950-a7ab09b1d48b',
                        },
                        {
                            name: '근로조건2',
                            id: '153b23a7-a5eb-4e29-9eda-95540ab95614',
                        },
                    ]
                },
                {
                    name: '일반관리',
                    id: '7740eaec-9657-4f3c-bab6-4a79b81eb8c6',
                    children: []
                }
            ]
        }
    },
    methods: {
        findOriginalCData(item) {
            for (let pitem of this.cOriginData) {
                if (pitem.id === item.id) {
                    return pitem;
                }
                for (let citem of pitem.children) {
                    if (citem.id === item.id) {
                        return citem;
                    }
                }
            }
            return null;
        },

        removeUICData(item) {
            for (let index in this.cData) {
                let pitem = this.cData[index];
                if (pitem.id === item.id) {
                    this.cData.splice(index, 1);
                    return true;
                }
                for (let sindex in pitem.children) {
                    let citem = pitem.children[sindex];
                    if (citem.id === item.id) {
                        pitem.children.splice(sindex, 1);
                        return true;
                    }
                }
            }
            return false;
        },
        async applyCategoriesToUi() {
            this.cData = JSON.parse(JSON.stringify(this.cOriginData));
        },

        async loadCategories() {
            let result = await this.contentsService.getCCategories();
            if(result.code != ServiceError.success) {
                result = await this.contentsService.getUIDFromServer();
                this.cCodeId = result.data;
            } else {
                this.cCodeId = result.data.code;
                this.cOriginData = JSON.parse(result.data.data);
                this.applyCategoriesToUi();
            }
        },
        async reset() {
            const result = await this.showConfirm("리셋하시겠습니까? (저장하지 않은 내용은 모두 사라집니다)");
            if(result) {
                this.cData = JSON.parse(JSON.stringify(this.cOriginData));
            }
        },
        async save() {
            console.log(this.curUser);
            if(this.cData.length < 1) {
                this.showAlert('카테고리가 항목이 비어 있습니다.');
                return;
            }
            const saveCategoriesInfo = {
                data: this.cData,
                desc: this.desc,
                code: this.cCodeId,
            }
            console.log(JSON.stringify(saveCategoriesInfo));
            const result = await this.contentsService.addCCategories(saveCategoriesInfo);
            if (result.code == ServiceError.success) {
                this.cOriginData = JSON.parse(JSON.stringify(this.cData));
                  this.showAlert('카테고리가 저장되었습니다.');
            } else {
                console.log('카테고리가 저장 실패!');
            }
        },
        addNode: function() {
            var node = new TreeNode({ name: 'new node', isLeaf: true })
            if (!this.data.children) this.data.children = []
            this.data.addChildren(node)
        },
        showAlert(msg, path) {
            this.$bvModal.msgBoxOk(msg)
                .then(value => {
                    if (path) {
                        this.$router.push(path);
                    }
                })
                .catch(err => {
                    this.$router.push('/page/500');
                });
        },
        showConfirm(msg) {
            this.boxTwo = ''
            return this.$bvModal.msgBoxConfirm(msg, {
                    title: 'Please Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    this.boxTwo = value
                    return value;
                })
                .catch(err => {
                    // An error occurred
                    return false;
                })
        },
        async plusCategory() {
            console.log('plus');
            this.selectedCData = null;
            this.$refs.modal_cate_name.show();
        },
        async plusChildCategory(citem) {
            console.log(citem);
            this.selectedCData = citem;
            this.$refs.modal_cate_name.show();
        },
        plusEditorbleCategory(citem) {
            this.cNewName = citem.name;
           this.selectedCData = citem;
            console.log(citem);
            this.$refs.modal_cate_rename.show();
        },
        async plusRemoveCategory(citem) {
            if(citem.children && citem.children.length >= 1) {
                const result = await this.showConfirm(`${citem.name}에는 자식 카테고리가 있습니다. 삭제 하시겠습니까?`);
                if(result) {
                    this.removeUICData(citem);
                } else {
                    return;
                }
            } else {
                const result = await this.showConfirm(`${citem.name}을 삭제 하시겠습니까?`);
                if(result) {
                     this.removeUICData(citem);
                }
                
            }
        },
        plusSaveCategory() {
            console.log(citem);
        },
        swapCategories(sitem, isUp) {
            let cData = JSON.parse(JSON.stringify(this.cData));

            for (let index =0; index < cData.length; index++) {
                let pitem = cData[index];
                if (pitem.id === sitem.id) {
                    if(isUp) {
                        if(index > 0) {
                            let ctemp = cData[index -1];
                            cData[index] = ctemp;
                            cData[index-1] = sitem;
                        }
                    } else {
                        if(index < (cData.length-1)) {
                            let ctemp = cData[index + 1];
                            cData[index] = ctemp;
                            cData[index+1] = sitem;
                        }
                    }
                    this.cData = cData;
                    return true;
                }

                for (let sindex=0; sindex < pitem.children.length ; sindex++) {
                    let citem = pitem.children[sindex];
                        if (citem.id === sitem.id) {
                            if(isUp) {
                                if(sindex > 0) {
                                    let ctemp = cData[index].children[sindex -1];
                                    cData[index].children[sindex] = ctemp;
                                    cData[index].children[sindex-1] = sitem;
                                }
                            } else {
                                if(sindex < (cData[index].children.length-1)) {
                                    let ctemp = cData[index].children[sindex + 1];
                                    cData[index].children[sindex] = ctemp;
                                    cData[index].children[sindex+1] = sitem;
                                }
                            }
                        this.cData = cData;
                        return true;
                    }
                }
            }
        },
        plusMoveUp(item) {
            this.swapCategories(item,true);
        },
        plusMoveDown(item) {
            this.swapCategories(item,false);
        },
        checkFormValidity() {
            if(this.cNewName.length < 2) {
                 this.showAlert('카테고리 이름이 너무 짧습니다.(2글자이상)');
                 return false;
            }
            return true;
        },
        resetCategoryModal() {
            this.name = ''
            this.nameState = null
        },
        handleCategoryRenameOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleRenameSubmit();
        },
        async handleRenameSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }

            const cname = this.cNewName;
            if(this.selectedCData) {
                this.selectedCData.name = cname; 
            }

              this.$nextTick(() => {
                this.$refs.modal_cate_rename.hide()
            })
        },
        handleCategoryOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.handleSubmit()
        },
        async handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }

            let result = await this.contentsService.getUIDFromServer();
            const cname = this.cNewName;
                 
            if (this.selectedCData) {
                const citem = this.selectedCData;
                if (citem.children) {
                    citem.children.push({
                        name: cname,
                        id: result.data,
                    });
                } else {
                    citem['children'] = [];
                    citem['children'].push({
                        name: cname,
                        id: result.data,
                    });
                }
            } else {
                this.cData.push({
                    name: cname,
                    id: result.data,
                    children: []
                });
            }

            this.$nextTick(() => {
                this.$refs.modal_cate_name.hide()
            })
        }
    }
};
</script>