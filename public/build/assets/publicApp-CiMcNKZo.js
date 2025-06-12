import { _ as _export_sfc, v as createElementBlock, o as openBlock, l as createVNode, r as createBaseVNode, w as withCtx, V as VContainer, aJ as VToolbarTitle, O as VSpacer, a8 as VToolbar, a9 as VAppBar, C as resolveComponent, k as createBlock, aM as VApp, S as Fragment, T as renderList, P as VExpansionPanel, Q as VExpansionPanelTitle, A as normalizeClass, y as toDisplayString, R as VExpansionPanelText, E as VCard, a5 as VExpansionPanels, ak as VLayout, I as VRow, J as VCol, aG as createRouter, aH as createWebHistory, aN as createApp, aO as vuetify } from "./vuetify-EeS5qzD-.js";
import { F as FooterComponent } from "./FooterComponent-CXNDXtA5.js";
import "./bootstrap-DAzZxGcG.js";
import "./bootstrap-BJGpzKVK.js";
import "./_commonjsHelpers-DyYX6rOH.js";
const _sfc_main$3 = {
  name: "PublicHeaderComponent"
};
const _hoisted_1$2 = { class: "hidden-lg-and-up" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode(VToolbar, {
      dark: "",
      class: "main-menu hidden-md-and-down",
      id: "main-header-menu"
    }, {
      default: withCtx(() => [
        createVNode(VContainer, { class: "d-flex" }, {
          default: withCtx(() => [
            createVNode(VToolbarTitle, null, {
              default: withCtx(() => _cache[0] || (_cache[0] = [
                createBaseVNode(
                  "a",
                  {
                    class: "navbar-brand",
                    href: "/"
                  },
                  [
                    createBaseVNode("img", { src: "/images/logos/AFTConnectLogo.png" })
                  ],
                  -1
                  /* HOISTED */
                )
              ])),
              _: 1
              /* STABLE */
            }),
            createVNode(VSpacer)
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      _: 1
      /* STABLE */
    }),
    createBaseVNode("div", _hoisted_1$2, [
      createVNode(VAppBar, {
        color: "primary",
        class: "mobile-app-bar"
      }, {
        default: withCtx(() => [
          createVNode(VToolbarTitle, { align: "center" }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createBaseVNode(
                "a",
                {
                  class: "navbar-brand",
                  href: "/"
                },
                [
                  createBaseVNode("img", {
                    class: "mobile-logo",
                    src: "/images/logos/AFTConnectLogo.png"
                  })
                ],
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          }),
          createVNode(VSpacer)
        ]),
        _: 1
        /* STABLE */
      })
    ])
  ]);
}
const PublicHeaderComponent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "/var/www/html/resources/js/components/Common/PublicHeaderComponent.vue"]]);
const _sfc_main$2 = {
  name: "publicApp",
  components: {
    PublicHeaderComponent,
    FooterComponent
  }
};
const _hoisted_1$1 = { id: "publicApp" };
const _hoisted_2 = {
  class: "py-4",
  id: "main-container"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PublicHeaderComponent = resolveComponent("PublicHeaderComponent");
  const _component_router_view = resolveComponent("router-view");
  const _component_FooterComponent = resolveComponent("FooterComponent");
  return openBlock(), createBlock(VApp, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1$1, [
        createVNode(_component_PublicHeaderComponent),
        createBaseVNode("main", _hoisted_2, [
          createVNode(_component_router_view)
        ]),
        createVNode(_component_FooterComponent)
      ])
    ]),
    _: 1
    /* STABLE */
  });
}
const publicApp = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/var/www/html/resources/js/myPublicApp.vue"]]);
const _sfc_main$1 = {
  data: () => ({
    panel: [],
    announcements: []
  }),
  mounted() {
    this.getAnnouncements();
  },
  methods: {
    getAnnouncements() {
      axios.get("public-content-block?application=public").then((response) => {
        this.announcements = response.data.data;
      });
    }
  }
};
const _hoisted_1 = ["innerHTML"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(
      Fragment,
      null,
      renderList(_ctx.announcements, (announcement) => {
        return openBlock(), createBlock(VExpansionPanels, {
          key: announcement.id,
          modelValue: announcement.expanded,
          "onUpdate:modelValue": ($event) => announcement.expanded = $event,
          class: normalizeClass(["announcement mb-8", "type-" + announcement.type])
        }, {
          default: withCtx(() => [
            createVNode(
              VExpansionPanel,
              null,
              {
                default: withCtx(() => [
                  createVNode(VExpansionPanelTitle, {
                    class: normalizeClass(announcement.priority)
                  }, {
                    default: withCtx(() => [
                      createBaseVNode(
                        "h4",
                        null,
                        toDisplayString(announcement.title),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["class"]),
                  createVNode(
                    VExpansionPanelText,
                    { class: "border-sm" },
                    {
                      default: withCtx(() => [
                        createVNode(
                          VCard,
                          {
                            variant: "flat",
                            class: "p-3"
                          },
                          {
                            default: withCtx(() => [
                              createBaseVNode("span", {
                                innerHTML: announcement.content
                              }, null, 8, _hoisted_1)
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            )
          ]),
          _: 2
          /* DYNAMIC */
        }, 1032, ["modelValue", "onUpdate:modelValue", "class"]);
      }),
      128
      /* KEYED_FRAGMENT */
    ))
  ]);
}
const AnnouncementsComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/html/resources/js/components/Public/AnnouncementsComponent.vue"]]);
const _sfc_main = {
  name: "PublicComponent",
  components: {
    "announcements-component": AnnouncementsComponent
  },
  data: () => ({
    panel: 0
  })
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_announcements_component = resolveComponent("announcements-component");
  return openBlock(), createBlock(VContainer, { class: "mobile-home-container" }, {
    default: withCtx(() => [
      createVNode(VLayout, null, {
        default: withCtx(() => [
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  _cache[0] || (_cache[0] = createBaseVNode(
                    "h3",
                    null,
                    "Announcements",
                    -1
                    /* HOISTED */
                  )),
                  createVNode(_component_announcements_component)
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })
    ]),
    _: 1
    /* STABLE */
  });
}
const PublicComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/html/resources/js/components/Public/PublicComponent.vue"]]);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/public/index",
      name: "Public",
      component: PublicComponent
    }
  ]
});
const app = createApp(publicApp);
app.use(router);
app.use(vuetify);
app.mount("#publicApp");
//# sourceMappingURL=publicApp-CiMcNKZo.js.map
