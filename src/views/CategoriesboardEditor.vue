<template>
    <div class="w-100 h-100">
        <b-modal centered id="modal-prevent-closing" ref="modal_cate_name" title="카테고리 이름을 넣으세요" @show="resetCategoryModal" @hidden="resetCategoryModal" @ok="handleCategoryOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group :state="nameState" label="Name" label-for="name-input" invalid-feedback="Name is required">
                    <b-form-input id="name-input" v-model="cNewName" :state="nameState" required></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <!-- <b-row align-h="start">
                <b-card class="w-100" header="카테고리들" border-variant="primary">
                    <div slot="header">
                        카테고리 편집
                        <div class="card-header-actions">
                            <button><i class="icon-plus"></i></button>
        
                        </div>
                    </div>
                    <b-card-body class="text-center">
                        <vue-tree-list @drop="ondrop" @drop-before="ondropBefore" @drop-after="ondropAfter" @click="onClick" :model="categories" default-tree-node-name="new node" default-leaf-node-name="new">
                        </vue-tree-list>
                    </b-card-body>
                </b-card>
            </b-row>-->
        <b-row align-h="start">
            <b-card class="w-100" header="카테고리들" border-variant="primary">
                <div slot="header">
                    카테고리 편집
                    <div class="card-header-actions">
                        <button><i  @click="plusCategory"  class="icon-plus"></i></button>
                    </div>
                </div>
                <b-card-body class="text-center">
                    <b-container class="m-0 p-0" v-for="(citem, index) in cData" :key="index" fluid>
                        <b-row>
                            <b-col cols="10" class="m-0 p-0">
                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text>
                                            <i class="icon-doc icons"></i>
                                        </b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input type="text" :readonly="!citem.editable" class="form-control" placeholder="" v-model="citem.name" />
                                </b-input-group>
                            </b-col>
                            <b-col class="ml-0 pl-0">
                                <button><i  @click="plusChildCategory(citem)"  class="icon-plus"></i></button>
                                <button><i  @click="plusEditorbleCategory(citem)" class="cui-circle-check icons"></i></button>
                                <button><i  @click="plusCancelCategory(citem)" class="icon-close"></i></button>
                                <button><i  @click="plusSaveCategory"  class="cui-arrow-top icons"></i></button>
                                <button><i  @click="plusSaveCategory"  class="cui-arrow-bottom icons"></i></button>
                            </b-col>
                        </b-row>
                        <b-row v-for="(ccitem, sindex) in citem.children" :key="sindex" fluid>
                            <b-col cols="10" class="ml-3">
                                <b-input-group class="mb-4">
                                    <b-input-group-prepend>
                                        <b-input-group-text>
                                            <i class="icon-arrow-right-circle icons"></i>
                                        </b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input :readonly="!ccitem.editable" type="text" class="form-control" placeholder="" v-model="ccitem.name" />
                                </b-input-group>
                            </b-col>
                            <b-col class="ml-0 pl-0">
                                <button><i  @click="plusEditorbleCategory(citem)" class="cui-circle-check icons"></i></button>
                                <button><i  @click="plusCancelCategory(citem)" class="icon-close"></i></button>
                                <button><i  @click="plusSaveCategory"  class="cui-arrow-top icons"></i></button>
                                <button><i  @click="plusSaveCategory"  class="cui-arrow-bottom icons"></i></button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card-body>
            </b-card>
        </b-row>
        <b-row align-h="end">
            <b-col>
                <b-row>
                    <b-input-group class="mb-3">
                        <b-input-group-prepend>
                            <b-input-group-text>
                                <i class="icon-doc"></i>
                            </b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input type="text" class="form-control" placeholder="설명" v-model="desc" />
                    </b-input-group>
                    <b-row>
    
                    </b-row>
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

export default {
    name: "categoriesEditorview",
    components: {
        VueTreeList,
    },
    created: function() {
        this.loadCategories();
        this.loadCategories2();
    },
    beforeDestroy: function() {

    },
    data() {
        return {
            cNewName: '',
            selectedCData: null,
            desc: '',
            contentsService: this.$service.$contentsservice,
            rawCategoriesDatas: {},
            categories: {},
            newTree: {},
            cData: [],
            cOriginData: [{
                    name: '근로조건',
                    id: 'c41b90f9-6147-4c95-9396-e8f1c56e09e6',
                    editable: false,
                    children: [{
                            name: '근로조건1',
                            id: 'aea996ee-6a25-407f-9950-a7ab09b1d48b',
                            editable: false,
                        },
                        {
                            name: '근로조건2',
                            id: '153b23a7-a5eb-4e29-9eda-95540ab95614',
                            editable: false,
                        },
                    ]
                },
                {
                    name: '일반관리',
                    id: '7740eaec-9657-4f3c-bab6-4a79b81eb8c6',
                    editable: false,
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
        async loadCategories2() {
            this.cData = JSON.parse(JSON.stringify(this.cOriginData));
        },

        async loadCategories() {
            this.result = await this.contentsService.getCategories();
            if (this.result.code === this.$eservice.success) {
                this.rawCategoriesDatas = this.result.data;
                const categoryData = ElementCItemGenerator.genMakeSidebarCTItems(this.result.data);
                this.categories = new Tree(categoryData);
            }
        },
        reset() {

        },
        async save() {
            const result = await this.contentsService.addCCategories(this.categories);
            if (result) {

            } else {

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
            this.$bvModal.msgBoxConfirm(msg, {
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
                    console.log(value);
                })
                .catch(err => {
                    // An error occurred
                })
        },
        async plusCategory() {
            console.log('plus');
            this.selectedCData = null;
            this.$refs.modal_cate_name.show();

            /* let result = await this.contentsService.getUIDFromServer();
             if (result.code == ServiceError.success) {
                 this.cData.push({
                     name: '',
                     id: result.data,
                     editable: true,
                     children: {}
                 });
             } else {
                 this.showAlert('서버 연결 에러, 생성 에러!');
             }*/
        },
        async plusChildCategory(citem) {
            console.log(citem);
            this.selectedCData = citem;
            this.$refs.modal_cate_name.show();

            /*let result = await this.contentsService.getUIDFromServer();
            if (citem.children) {
                citem.children.push({
                    name: '',
                    id: result.data,
                    editable: true,
                });
            } else {
                citem['children'] = [];
                citem['children'].push({
                    name: '',
                    id: result.data,
                    editable: true,
                });
            }*/
        },
        plusEditorbleCategory(citem) {
            console.log(citem);
            if (citem) {
                citem.editable = true;
            }
        },
        plusCancelCategory(citem) {
            const original = this.findOriginalCData(citem);
            if (original) {
                citem.name = original.name;
                citem.editable = original.editable;
            } else {
                this.removeUICData(citem);
            }
            if (citem) {
                citem.editable = false;
            }
        },
        plusSaveCategory() {
            console.log(citem);
        },
        ondrop(data) {
            if (data.node.isLeaf && !data.node.parent.parent) {
                data.target = data.src;
            }
            if (!data.node.isLeaf && data.node.parent.parent) {
                data.target = data.src;
            }
        },
        ondropBefore(data) {
            if (data.node.isLeaf && !data.node.parent.parent) {
                data.target = data.src;
            }
            if (!data.node.isLeaf && data.node.parent.parent) {
                data.target = data.src;
            }
            return null;
        },
        ondropAfter(node) {
            console.log(node.src);
        },
        getNewTree: function() {
            var vm = this

            function _dfs(oldNode) {
                var newNode = {}

                for (var k in oldNode) {
                    if (k !== 'children' && k !== 'parent') {
                        newNode[k] = oldNode[k]
                    }
                }

                if (oldNode.children && oldNode.children.length > 0) {
                    newNode.children = []
                    for (var i = 0, len = oldNode.children.length; i < len; i++) {
                        newNode.children.push(_dfs(oldNode.children[i]))
                    }
                }
                return newNode
            }

            vm.newTree = _dfs(vm.data)
        },
        onClick(model) {
            console.log(model);
        },
        checkFormValidity() {
            return this.cNewName.length > 2 && !this.cNewName.includes(' ');
        },
        resetCategoryModal() {
            this.name = ''
            this.nameState = null
        },
        handleCategoryOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.handleSubmit()
        },
        async handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                this.showAlert("카테고리 이름이 잘못되었습니다.");
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
                        editable: false,
                    });
                } else {
                    citem['children'] = [];
                    citem['children'].push({
                        name: cname,
                        id: result.data,
                        editable: false,
                    });
                }
            } else {
                this.cData.push({
                    name: cname,
                    id: result.data,
                    editable: false,
                    children: {}
                });
            }

            // Push the name to submitted names
            // Hide the modal manually
            this.$nextTick(() => {
                this.$refs.modal_cate_name.hide()
            })
        }
    }
};
</script>