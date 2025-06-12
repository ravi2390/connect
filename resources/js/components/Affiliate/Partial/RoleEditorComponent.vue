<template>
    <v-dialog v-model="showDialog"
              width="500"
              persistent
    >
        <v-form ref="form" validate-on="submit" @submit.prevent="save">
            <v-card>
                <v-card-title><span v-if="isEditMode">Edit</span><span v-else>Add</span> Officer Role</v-card-title>
                <v-card-text>
                    <v-text-field
                        key="text-role-name"
                        v-model="AffiliateOfficerRoleName"
                        :rules="[rules.required]"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>Name
                        </template>
                    </v-text-field>
                    <v-select
                        v-model="OfficerRoleTypeId"
                        :items="roleTypes"
                        item-value="OfficerRoleTypeId"
                        item-title="OfficerRoleTypeName"
                        @update:model-value="filterTitles()"
                        :rules="[rules.required]"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>Type
                        </template>
                    </v-select>
                    <v-select
                        v-model="OfficerRoleTitleId"
                        item-title="OfficerRoleTitleName"
                        item-value="OfficerRoleTitleId"
                        :items="filteredTitles"
                        :rules="[rules.required]"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>Title
                        </template>
                    </v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="mb-4 btn-block" v-on:click.prevent="cancel()" variant="elevated">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" class="mb-4 btn-block" type="submit" variant="elevated">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>

    export default {
        name: "RoleEditorComponent",
        props: {
            affiliateId: {
                type: Number,
                required: true
            },
            isEditMode: {
                type: Boolean,
                default: false
            },
            roleTypes: {
                type: Array
            },
            roleTitles: {
                type: Array
            },
            role: {
                type: Object,
                default: function () {
                    return {
                        AffiliateOfficerRoleId: 0,
                        AffiliateOfficerRoleName: '',
                        OfficerRoleTitleId: ''
                    }
                }
            }
        },
        data: () => ({
            AffiliateOfficerRoleName: '',
            OfficerRoleTypeId: '',
            OfficerRoleTitleId: '',
            filteredTitles: [],
            showDialog: true,
            rules: {
                required: value => !!value || 'Required.'
            },
        }),
        methods: {
            async save(event) {
                const results = await event;
                if (!results.valid) {
                    return;
                }
                let method = 'post';
                let url = '/api/v2/affiliateOfficerRole';
                const role = {
                    ...this.role,
                    AffiliateOfficerRoleName: this.AffiliateOfficerRoleName,
                    AffiliateId: this.affiliateId,
                    OfficerRoleTitleId: this.OfficerRoleTitleId,
                };
                if (this.isEditMode) {
                    method = 'put';
                    url += '/' + this.role.AffiliateOfficerRoleId;
                }
                // url += '?include=Affiliate,OfficerRoleTitle';
                if (role.AffiliateOfficerRoleId === 0) {
                    delete role.AffiliateOfficerRoleId;
                }
                axios({method, url, data: role})
                    .then((response) => {
                    })
                    .finally((response) => {
                        this.$emit('saved');
                    });

            },
            cancel() {
                this.$emit('canceled');
            },
            filterTitles() {
                this.filteredTitles = this.roleTitles.filter((v => v.OfficerRoleTypeId === this.OfficerRoleTypeId));
            },
            getTypeFromTitle() {
                if (this.role.OfficerRoleTitleId !== '') {
                    const filtered = this.roleTitles.filter(v => v.OfficerRoleTitleId === this.role.OfficerRoleTitleId);
                    if (filtered && filtered.length > 0) {
                        return filtered[0].OfficerRoleTypeId;
                    }
                }
                return '';
            }
        },
        beforeMount() {
            this.OfficerRoleTypeId = this.getTypeFromTitle();
            this.filterTitles();
        }
    }

</script>
