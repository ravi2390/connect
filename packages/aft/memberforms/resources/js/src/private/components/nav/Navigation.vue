<!-- eslint-disable max-len -->
<template>
  <v-navigation-drawer
      :rail="rail"
      permanent
      class="nav-drawer"
  >
      <v-list
          nav
          density="compact"
      >
          <v-list-item
              id="leftNavTitle"
              @click="rail = !rail"
              title="Menu"
              :prepend-icon="rail ? 'mdi:mdi-arrow-expand-right' : 'mdi:mdi-arrow-collapse-left'"
          >
          </v-list-item>
          <v-divider v-if="title" />
          <NavMainItem
              v-for="item in menuList"
              :key="item.path"
              :path="item.name === 'create' ? item.path + '?nav=true' : item.path"
              :label="item.meta.label"
              :icon="item.meta.icon"
              :visible="item.meta.visible"
              :menu-items="item.menuItems"
              :name="item.name"
              link
          />
      </v-list>
  </v-navigation-drawer>
</template>

<script>
import NavMainItem from "./NavMainItem.vue";

export default {
    name: 'Navigation',
    components: {
        NavMainItem,
    },
    props: {
        title: { type: String, default: '' },
        memberFormAssignType: { type: String, default: '' },
        items: { type: Array, required: true },
    },
    data: () => ({
        menuList: [],
        rail: false,
    }),
    watch: {
        memberFormAssignType() {
            this.refreshItems();
        },
    },
    mounted() {
        this.refreshItems();
    },
    methods: {
        refreshItems() {
            this.menuList = [];
            this.items.forEach((i) => {
                const item = JSON.parse(JSON.stringify(i));
                if (item.name === 'dues-mapping') {
                    const memberType = this.memberFormAssignType ? JSON.parse(this.memberFormAssignType) : [];
                    const allowedTypes = ['1', '2', '6', '100'];

                    if (allowedTypes.some(r=> memberType.includes(r))) {
                        this.menuList.push(item);
                    }
                } else {
                    this.menuList.push(item);
                }
            });
        },
    },
};
</script>

<style lang="scss">
.sub-list-header .v-list-group__header {
    display: none !important;
}
button.v-app-bar__nav-icon.v-btn.v-btn--icon.v-btn--round.theme--light.v-size--default {
    margin-left: -5px;
    margin-right: 25px;
}
.v-divider {
    margin-top: 0;
}
div#leftNavTitle {
    margin: 0 0 0 -8px;
    padding: 12px 16px 12px 16px;
}
.v-btn>.v-btn__content .v-icon {
    color: darkblue;
}
@media only screen and (max-width: 992px) {
    .v-navigation-drawer {
        height: calc(100vh - 266px) !important;
    }
}
</style>
