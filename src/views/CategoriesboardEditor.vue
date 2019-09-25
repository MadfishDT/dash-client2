<template>
<div class="w-100 h-100">
    <b-row align-h="start">
        <b-card class="w-100" header="카테고리들" border-variant="primary">

            <div slot="header">
              카테고리 편집
              <div class="card-header-actions">
                  <button><i  @click="plusCategory"  class="icon-plus"></i></button>
                  
              </div>
            </div>
        <b-card-body class="text-center">
            <vue-tree-list @drop="ondrop" @drop-before="ondropBefore"
             @drop-after="ondropAfter" @click="onClick"
              :model="categories" default-tree-node-name="new node" default-leaf-node-name="new">
              </vue-tree-list>
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
                    <b-form-input                   
                        type="text"
                        class="form-control"
                        placeholder="설명"
                        v-model="desc"
                    />
                </b-input-group>
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
    },
    beforeDestroy: function() {
  
    },
   data () {
        return {
            desc: '',
            contentsService: this.$service.$contentsservice,
            rawCategoriesDatas: {},
            categories: {},
            newTree: {},
        }
    },
    methods: {
        async loadCategories() {
            this.result = await this.contentsService.getCategories();
            if (this.result.code === this.$eservice.success) {
                this.rawCategoriesDatas = this.result.data;
                const categoryData= ElementCItemGenerator.genMakeSidebarCTItems(this.result.data);
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
        addNode: function () {
            var node = new TreeNode({ name: 'new node', isLeaf: true })
            if (!this.data.children) this.data.children = []
            this.data.addChildren(node)
        },
        plusCategory() {
            console.log('plus');
        },
        ondrop(data) {
            if(data.node.isLeaf && !data.node.parent.parent) {
                data.target = data.src;
            }
            if(!data.node.isLeaf && data.node.parent.parent) {
                data.target = data.src;
            }
        },
        ondropBefore(data) {
            if(data.node.isLeaf && !data.node.parent.parent) {
                data.target = data.src;
            }
            if(!data.node.isLeaf && data.node.parent.parent) {
                data.target = data.src;
            }
            return null;
        },
        ondropAfter(node) {
            console.log(node.src);
        },
        getNewTree: function () {
            var vm = this
            function _dfs (oldNode) {
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
        }
    }
};
</script>