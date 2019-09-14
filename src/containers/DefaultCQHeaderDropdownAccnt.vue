<template>
    <AppHeaderDropdown right no-caret>
        <template slot="header">
            <i class="cui-cog icons font-2xl d-block mt-0"></i>
            <!--<b-badge variant="info">{{ itemsCount }}</b-badge>-->
        </template>
        <template slot="dropdown">
             <b-dropdown-header tag="div" class="text-center">
                <strong>설문지</strong>
            </b-dropdown-header>
            <b-dropdown-item @click="logout">
                <i class="icon-book-open icons" /> 설문화면으로 가기
            </b-dropdown-item>
            <b-dropdown-header tag="div" class="text-center">
                <strong>계정</strong>
            </b-dropdown-header>
            <b-dropdown-item @click="logout">
                <i class="fa fa-lock" /> 로그 아웃
            </b-dropdown-item>
            <b-dropdown-item>
                <i class="fa fa-user" /> 프로필
            </b-dropdown-item>
            <b-dropdown-header tag="div" class="text-center">
                <strong>설정들</strong>
            </b-dropdown-header>
            <b-dropdown-item>
                <i class="fa fa-wrench" /> 설정
            </b-dropdown-item>
        </template>
    </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
export default {
    name: "DefaultCQHeaderDropdownAccnt",
    components: {
        AppHeaderDropdown
    },
    data: () => {
        return { itemsCount: 42 };
    },
    methods: {
        showAlert: async function(msg) {
             return this.$bvModal.msgBoxOk(msg);
        },
        logout: async function() {
            const result = await this.$service.$loginservice.logout();
            if (result) {
                await this.showAlert("로그 아웃 성공");
                this.$router.push('/');
            } else {
               await this.showAlert("로그 아웃 실패");
            }
            this.adjustLoginFormUI();
        },
    }
};
</script>
