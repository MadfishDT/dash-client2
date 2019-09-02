<template>
    <AppHeaderDropdown right no-caret>
        <template slot="header">
            <i class="cui-cog icons font-2xl d-block mt-0"></i>
            <!--<b-badge variant="info">{{ itemsCount }}</b-badge>-->
        </template>
        <template slot="dropdown">
            <b-dropdown-header tag="div" class="text-center">
                <strong>Account</strong>
            </b-dropdown-header>
            <b-dropdown-item @click="logout">
                <i class="fa fa-lock" /> logout
            </b-dropdown-item>
            <b-dropdown-item>
                <i class="fa fa-user" /> profile
            </b-dropdown-item>
            <b-dropdown-item>
                <i class="fa fa-tasks" /> message
                <b-badge variant="danger">{{ itemsCount }}</b-badge>
            </b-dropdown-item>
            <b-dropdown-header tag="div" class="text-center">
                <strong>Settings</strong>
            </b-dropdown-header>
            <b-dropdown-item>
                <i class="fa fa-wrench" /> Settings
            </b-dropdown-item>
        </template>
    </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
export default {
    name: "DefaultHeaderDropdownAccnt",
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
                await this.showAlert("Logout success");
                this.$router.push('/');
            } else {
               await this.showAlert("Logout fail");
            }
            this.adjustLoginFormUI();
        },
    }
};
</script>
