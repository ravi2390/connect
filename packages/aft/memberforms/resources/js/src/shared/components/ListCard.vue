<template>
    <v-card
        id="listCard"
        class="mx-auto"
        max-width="90%"
        tile
    >
        <v-list
            rounded
        >
            <h3 v-text="state" />
            <v-progress-circular
                v-if="isLoading"
                :size="70"
                :width="7"
                color="#082A5C"
                indeterminate
            />
            <template v-else>
                <v-list-item
                    v-for="(form, index) in forms"
                    :key="index"
                    @click="redirect(form)"
                    prepend-icon="mdi:mdi-file-document-edit-outline"
                >
                    {{ form.display_name }}
                </v-list-item>
            </template>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'ListCard',
    props: {
        forms: {
            type: Array,
            default: null,
        },
        state: {
            type: String,
            default: '',
        },
        isLoading: {
            type: [String, Boolean],
            default: true,
        },
    },
    methods: {
        redirect(form) {
            this.$router.push(
                {
                    path: `form/${form.id}`,
                },
            );
        },
    },
};
</script>

<style lang="scss" scoped>
    #main-container .v-list--rounded .v-list-item
    , #main-container .v-list--rounded .v-list-item:before
    , .v-list--rounded .v-ripple__container {
        border-radius: 10px !important;
    }
    #listCard {
        .v-list-item {
            box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
            border-left-style: solid;
            border-left-color: #0A2A5C;
        }
        .v-list--rounded {
            padding: 30px;
        }
        .listCardIcon .v-icon {
            color: #082A5C;
        }
        .v-progress-circular {
            display: block;
            margin: auto;
            margin-top: 70px;
            margin-bottom: 170px;
        }
    }
</style>
