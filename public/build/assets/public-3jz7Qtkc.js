import { _ as _export_sfc, C as resolveComponent, k as createBlock, o as openBlock, w as withCtx, l as createVNode, b6 as VMain, V as VContainer, I as VRow, J as VCol, aM as VApp, F as VCardTitle, t as createTextVNode, av as VImg, D as VForm, K as VSelect, az as VList, x as createCommentVNode, v as createElementBlock, aB as VListItemTitle, ap as VDivider, S as Fragment, T as renderList, bK as VListSubheader, y as toDisplayString, aA as VListItem, bF as VListItemSubtitle, E as VCard, G as VCardText, r as createBaseVNode, aG as createRouter, aH as createWebHistory, aN as createApp, aO as vuetify } from "./vuetify-EeS5qzD-.js";
import { e as api, P as PageForm, s as script, f as MfpTypes } from "./MfpTypes-RkDj85EQ.js";
import "./ckeditor5-5vcNS2fJ.js";
import "./_baseSet-BOCO_qUt.js";
import "./_Uint8Array-C929yYkW.js";
import "./debounce-DRMZstlG.js";
import "./_commonjsHelpers-DyYX6rOH.js";
const _sfc_main$2 = {
  name: "PublicApp"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(VApp, { class: "app-public" }, {
    default: withCtx(() => [
      createVNode(VMain, null, {
        default: withCtx(() => [
          createVNode(VContainer, {
            fluid: "",
            class: "fill-height"
          }, {
            default: withCtx(() => [
              createVNode(VRow, { class: "justify-center" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    sm: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_router_view)
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
      })
    ]),
    _: 1
    /* STABLE */
  });
}
const PublicApp = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-4dd2b91c"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/PublicApp.vue"]]);
const _sfc_main$1 = {
  name: "PageFindForm",
  data: () => ({
    listStates: [],
    listForms: [],
    selectedState: "",
    isFetchingForm: false,
    searchForState: ""
  }),
  watch: {
    selectedState() {
      this.fetchForms();
    }
  },
  created() {
    this.fetchStates();
  },
  methods: {
    fetchStates() {
      return api.getListOfStates().then((result) => {
        console.log({ data: result.data });
        this.listStates = result.data;
      }).catch(() => {
        this.listStates.push("Error Retrieving States");
      });
    },
    fetchForms() {
      api.getForms(this.selectedState).then((result) => {
        this.listForms = result.data;
      }).catch(() => {
        this.selectedState = "Error Fetching Forms";
      });
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VCard, null, {
    default: withCtx(() => [
      createVNode(VCardTitle, { class: "form-title" }, {
        default: withCtx(() => [
          createVNode(VImg, {
            class: "mr-2",
            "max-width": "41",
            src: "/vendor/memberforms/images/aft-small.png"
          }),
          _cache[1] || (_cache[1] = createTextVNode(" Membership Forms Portal "))
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VForm, null, {
        default: withCtx(() => [
          createVNode(VContainer, { fluid: "" }, {
            default: withCtx(() => [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => _cache[2] || (_cache[2] = [
                      createTextVNode(" Choose a State to Find Your Local ")
                    ])),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VSelect, {
                        modelValue: _ctx.selectedState,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectedState = $event),
                        items: _ctx.listStates,
                        "item-title": "LocationStateAbr",
                        "item-value": "LocationStateAbr",
                        label: "Select State",
                        variant: "solo"
                      }, null, 8, ["modelValue", "items"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VList, { lines: "three" }, {
                        default: withCtx(() => [
                          _ctx.listForms && _ctx.listForms.length !== 0 ? (openBlock(), createBlock(VListItemTitle, { key: 0 }, {
                            default: withCtx(() => _cache[3] || (_cache[3] = [
                              createTextVNode(" Choose a form below ")
                            ])),
                            _: 1
                            /* STABLE */
                          })) : createCommentVNode("v-if", true),
                          createVNode(VDivider, { class: "mb-4" }),
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(_ctx.listForms, (form) => {
                              return openBlock(), createElementBlock(
                                Fragment,
                                {
                                  key: form.id
                                },
                                [
                                  createVNode(
                                    VListSubheader,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(
                                          toDisplayString(form.Affiliate.AffiliateNumber) + " - " + toDisplayString(form.Affiliate.AffiliateName),
                                          1
                                          /* TEXT */
                                        )
                                      ]),
                                      _: 2
                                      /* DYNAMIC */
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  ),
                                  createVNode(VDivider),
                                  createVNode(VListItem, {
                                    to: form.url,
                                    link: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(
                                        VListItemTitle,
                                        null,
                                        {
                                          default: withCtx(() => [
                                            createTextVNode(
                                              toDisplayString(form.display_name),
                                              1
                                              /* TEXT */
                                            )
                                          ]),
                                          _: 2
                                          /* DYNAMIC */
                                        },
                                        1024
                                        /* DYNAMIC_SLOTS */
                                      ),
                                      createVNode(
                                        VListItemSubtitle,
                                        null,
                                        {
                                          default: withCtx(() => [
                                            createTextVNode(
                                              toDisplayString(form.display_name),
                                              1
                                              /* TEXT */
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
                                  }, 1032, ["to"])
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
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
const PageFindForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/public/PageFindForm.vue"]]);
const _sfc_main = {
  name: "PageThankYou",
  data: () => ({
    form: {},
    thankYouHeaderContent: "",
    thankYouBodyContent: ""
  }),
  watch: {},
  mounted() {
    this.getData(this.$route.params.id);
  },
  created() {
  },
  methods: {
    getData(id) {
      api.getForm(id).then((response) => {
        this.form = response.data;
        this.thankYouHeaderContent = this.form.thankyou_fields.fields.thankyouHeader.value;
        this.thankYouBodyContent = this.form.thankyou_fields.fields.thankyouBody.value;
      });
    }
  }
};
const _hoisted_1 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VCard, null, {
    default: withCtx(() => [
      createVNode(VCardTitle, { class: "form-title" }, {
        default: withCtx(() => [
          _ctx.form.show_aft_logo ? (openBlock(), createBlock(VImg, {
            key: 0,
            class: "mr-2",
            "max-width": "41",
            src: "/vendor/memberforms/images/aft-small.png"
          })) : createCommentVNode("v-if", true),
          createTextVNode(
            " " + toDisplayString(_ctx.thankYouHeaderContent),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VCardText, { class: "form-header" }, {
        default: withCtx(() => [
          createCommentVNode(" eslint-disable vue/no-v-html "),
          createBaseVNode("span", { innerHTML: _ctx.thankYouBodyContent }, null, 8, _hoisted_1),
          createCommentVNode("eslint-enable")
        ]),
        _: 1
        /* STABLE */
      })
    ]),
    _: 1
    /* STABLE */
  });
}
const PageThankYou = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-25ea21d1"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/public/PageThankYou.vue"]]);
const routes = createRouter({
  history: createWebHistory("/app/memberforms"),
  routes: [
    {
      path: "/",
      component: PageFindForm,
      meta: { displayName: "Find Form" },
      name: "findForm"
    },
    {
      path: "/form/:id",
      component: PageForm,
      meta: { displayName: "Form" },
      name: "form"
    },
    {
      path: "/:affiliateNumber/:customUrl",
      component: PageForm,
      meta: { displayName: "Form" },
      name: "form2"
    },
    {
      path: "/form/:id/thankyou",
      component: PageThankYou,
      meta: { displayName: "Thank You" },
      name: "thankyou"
    }
  ]
});
const app = createApp(PublicApp);
app.use(routes);
app.use(vuetify);
app.component("VueSignaturePad", script);
app.use(MfpTypes);
app.mount("#app");
//# sourceMappingURL=public-3jz7Qtkc.js.map
