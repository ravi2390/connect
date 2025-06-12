<template>
    <v-dialog v-model="visible" width="500">
        <v-card>
            <v-card-text>
                <h5>In order to edit this individual's {{ componentName.toLowerCase() }} role, you will be directed to the Affiliate Record for [{{ affiliateName }}] [{{ affiliateNumber }}] to access the Manage {{ componentName }} Roles form.</h5>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn size="small" color="default" variant="elevated" @click="visible=false">Cancel</v-btn>
                <v-btn size="small" color="primary" variant="elevated" @click="doSwitch()">OK</v-btn>
            </v-card-actions>
        </v-card>
        <template #activator="{ props }">
            <v-btn v-bind="props" size="small" class="affiliate-switch" color="primary">Manage on Affiliate Record</v-btn>
        </template>
    </v-dialog>
</template>
<script>
    export default {
        name: 'AffiliateSwitchRolesComponent',
        props: {
            componentName: {
                required: true
            },
            sectionName: {
                required: false
            },
            affiliateName: {},
            affiliateNumber: {},
        },
        data: () => ({
            visible: false,
        }),
        methods: {
            doSwitch() {
                this.visible = false;
                this.$router.push('/affiliate#' + this.sectionName);
            }
        }
    }
</script>
