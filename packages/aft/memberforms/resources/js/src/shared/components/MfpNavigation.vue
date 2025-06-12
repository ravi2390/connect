<template>
    <v-navigation-drawer
        v-model="visible"
        :rail="mini"
        permanent
        class="nav-drawer"
    >
        <template v-if="title">
            <v-list-item
                id="leftNavTitle"
                @click.stop="mini = !mini"
            >
                <v-app-bar-nav-icon />

                    <v-list-item-title>{{ title }}</v-list-item-title>

            </v-list-item>
            <v-divider />
        </template>
        <slot name="navList" />
    </v-navigation-drawer>
</template>

<script>

export default {
    name: 'MfpNavigation',
    props: {
        title: { type: String, default: '' },
        shown: { type: Boolean, default: true },
    },
    data: () => ({
        visible: true,
        mini: false,
    }),
    watch: {
        shown: function (value) { this.visible = value; },
    },
};
</script>

<style lang="scss">
button.v-app-bar__nav-icon.v-btn.v-btn--icon.v-btn--round.theme--light.v-size--default {
    margin-left: -5px;
    margin-right: 25px;
}
.v-toolbar__content {
    border-bottom: 4px solid #3f98c9;
}
.v-divider {
    margin-top: 5px;
}
.v-navigation-drawer {
    top: 64px !important;
    height: 100% !important;
}
div#leftNavTitle {
    margin-top: 10px;
}
.v-btn>.v-btn__content .v-icon {
    color: darkblue;
}
.v-main > div {
    z-index: 7;
}
.nav-drawer {
    .v-navigation-drawer__border {
        display: none;
    }
}
.nav-drawer {
    .v-list--dense .v-list-item .v-list-item__icon {
        height: 31px;
    }
    .v-list-item--active {
        background-color: rgba(9, 42, 92, 0.1);
        border: 1px solid rgb(0,0,0,0.7);
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
        .v-list-item__title {
            font-size: 0.875rem;
        }
    }
}
@media only screen and (max-width: 992px) {
    .v-navigation-drawer {
        height: calc(100vh - 266px) !important;
    }
}
</style>
