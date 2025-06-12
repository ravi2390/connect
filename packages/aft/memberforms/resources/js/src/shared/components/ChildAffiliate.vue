<template>
    <div>
        <div
            v-if="designer"
            class="handle mx-2"
        >
            <FormSearchSelector
                v-if="!localId"
                ref="localSelector"
                v-model="localId"
                label="Select a Local"
                item-value="AffiliateId"
                search-type="childAffiliate"
                :search-args="{ affiliateId: affiliateId }"
                :item-title="item => item.AffiliateNumber + ' - ' + item.AffiliateName"
                :disabled="true"
                outlined
                multiple
            />
        </div>
        <div
            v-if="!designer"
            class="handle mx-2"
        >
            <v-row v-if="storeData && storeData.localId === null">
                <v-col>
                    <span v-if="field.required">
                        <strong class="text-red">
                            *
                        </strong>
                    </span>
                    {{ field.label }} {{ (field.required ? ' (required)' : '') }}
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <FormSearchSelector
                        ref="localSelector"
                        v-model="localId"
                        label="Select a Local"
                        item-value="AffiliateId"
                        search-type="childAffiliate"
                        :search-args="{ affiliateId: affiliateId, ids: selectedLocals }"
                        :item-title="item => item.AffiliateNumber + ' - ' + item.AffiliateName"
                        name="localId"
                        :rules="[v => !!v || `Local is required`]"
                        outlined
                    />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import FormSearchSelector from '../../public/FormSearchSelector.vue';

export default {
    name: 'ChildAffiliate',
    components: { FormSearchSelector },
    props: {
        field: { type: Object, required: true },
        designer: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
    },
    data: () => ({
        affiliateId: null,
        localId: null,
        selectedLocals: [],
        storeData: [],
        activeEditTemplate: {},
        fieldRequired: true,
    }),
    watch: {
        field: {
            deep: true,
            handler() {
                //  this.workLocationList = this.field.source;
            },
        },
        localId: {
            handler() {
                this.changeLocalId();
            },
        },
    },
    created() {
        if (this.designer) {
            this.activeEditTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
            this.localId = this.activeEditTemplate.localId || null;
        }
    },
    mounted() {
        // console.log('designer', this.designer);
        if (!this.designer) {
            this.storeData = this.field.source;
            this.affiliateId = this.storeData.affiliateId;
            this.selectedLocals = this.storeData.localId;
        }

        this.$emit('input', this.localId);
    },
    methods: {
        remove(index) {
            this.$emit('remove', index);
        },
        changeLocalId() {
            this.$emit('input', this.localId);
        },
    },
};
</script>

<style lang="scss">
.closeIcon {
    background-color: #e2e8f3;
    border: 1px dotted #0A2A5C;
    border-radius: 15px;
    margin-left: -15px;
    margin-top: -25px;
    .v-icon {
        color: #1f5dbdad;
    }
}
.v-text-field__details .v-messages__message{
    margin-top: 10px;
}
.mx-2 .v-input__slot {
    top: 15px;
}
</style>
