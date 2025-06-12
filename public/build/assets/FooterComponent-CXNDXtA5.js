import { _ as _export_sfc, k as createBlock, w as withCtx, b4 as VFooter, o as openBlock, r as createBaseVNode, x as createCommentVNode, l as createVNode, V as VContainer, t as createTextVNode, W as withDirectives, s as VBtn, ac as Scroll, at as vShow } from "./vuetify-EeS5qzD-.js";
const _sfc_main = {
  name: "FooterComponent",
  data() {
    return {
      bottomNav: "recent",
      fab: false
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
const _hoisted_1 = {
  class: "flex-1-0 align-self-end",
  style: { "z-index": "9" }
};
const _hoisted_2 = {
  class: "footer-block",
  id: "main-footer-block"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VFooter, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(VContainer, null, {
            default: withCtx(() => _cache[0] || (_cache[0] = [
              createBaseVNode(
                "div",
                { class: "footer-left" },
                [
                  createBaseVNode("img", {
                    src: "/images/logos/footer-img.png",
                    alt: "AFT logo"
                  }),
                  createBaseVNode("div", { class: "address" }, [
                    createTextVNode(" AFT, AFL-CIO"),
                    createBaseVNode("br"),
                    createTextVNode(" 555 New Jersey Ave. N.W."),
                    createBaseVNode("br"),
                    createTextVNode(" Washington, DC 20001"),
                    createBaseVNode("br"),
                    createTextVNode(" (202) 879-4400 ")
                  ])
                ],
                -1
                /* HOISTED */
              ),
              createBaseVNode(
                "div",
                { class: "copy-rights" },
                "© AFT, AFL-CIO.",
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          })
        ]),
        createCommentVNode(" Mobile back to top fab button "),
        createBaseVNode("div", null, [
          withDirectives(createVNode(VBtn, {
            color: "#6F9FCD",
            onClick: $options.toTop,
            class: "back-to-top-btn position-fixed mb-3 mr-3",
            icon: "mdi:mdi-chevron-up",
            location: "bottom right"
          }, null, 8, ["onClick"]), [
            [Scroll, $options.onScroll],
            [vShow, $data.fab]
          ])
        ])
      ])
    ]),
    _: 1
    /* STABLE */
  });
}
const FooterComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-88202b1b"], ["__file", "/var/www/html/resources/js/components/Common/FooterComponent.vue"]]);
export {
  FooterComponent as F
};
//# sourceMappingURL=FooterComponent-CXNDXtA5.js.map
