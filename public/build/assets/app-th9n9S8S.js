import { aP as Popper, au as axios$1, _ as _export_sfc, v as createElementBlock, o as openBlock, T as renderList, k as createBlock, w as withCtx, l as createVNode, G as VCardText, E as VCard, S as Fragment, C as resolveComponent, r as createBaseVNode, aA as VListItem, t as createTextVNode, y as toDisplayString, az as VList, x as createCommentVNode, A as normalizeClass, a0 as mergeProps, a3 as VTooltip, a1 as format, bP as VDataTableVirtual, ap as VDivider, ay as VIcon, M as VTextField, K as VSelect, s as VBtn, p as VDataTableServer, N as VCardActions, U as VDialog, bC as resolveDynamicComponent, bQ as VSkeletonLoader, aB as VListItemTitle, F as VCardTitle, aG as createRouter, aH as createWebHistory, V as VContainer, O as VSpacer, aL as VAppBarNavIcon, as as withModifiers, Z as VMenu, a9 as VAppBar, aI as VNavigationDrawer, aM as VApp, aN as createApp, aO as vuetify } from "./vuetify-EeS5qzD-.js";
import { c as baseGet, g as baseSet, e as castPath, a as arrayMap, b as baseIteratee } from "./_baseSet-BOCO_qUt.js";
import { A as getAllKeysIn } from "./_Uint8Array-C929yYkW.js";
function basePickBy(object, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path = paths[index], value = baseGet(object, path);
    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap(getAllKeysIn(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee(predicate);
  return basePickBy(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}
window.Popper = Popper;
window.axios = axios$1;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const _sfc_main$i = {
  name: "Announcements",
  data: () => ({
    items: []
  }),
  mounted() {
    this.getAnnouncements();
  },
  methods: {
    getAnnouncements() {
      return axios$1.get("/api/staff/announcements").then((response) => {
        this.items = response.data;
      }).finally(() => {
      });
    }
  }
};
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(true), createElementBlock(
    Fragment,
    null,
    renderList(_ctx.items, (item) => {
      return openBlock(), createBlock(VCard, {
        title: item.title,
        key: item.id,
        variant: "elevated"
      }, {
        default: withCtx(() => [
          createVNode(VCardText, {
            innerHTML: item.content
          }, null, 8, ["innerHTML"])
        ]),
        _: 2
        /* DYNAMIC */
      }, 1032, ["title"]);
    }),
    128
    /* KEYED_FRAGMENT */
  );
}
const Announcements = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/Announcements.vue"]]);
const _sfc_main$h = {
  name: "ViewDashboard",
  components: { Announcements }
};
const _hoisted_1$b = { id: "dashboard" };
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_announcements = resolveComponent("announcements");
  return openBlock(), createElementBlock("div", _hoisted_1$b, [
    createVNode(_component_announcements)
  ]);
}
const ViewDashboard = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/ViewDashboard.vue"]]);
const _sfc_main$g = {
  name: "AffiliateUnionCountComponent",
  props: {
    affiliateId: {
      required: true
    }
  },
  data: () => ({
    affiliates: []
  }),
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      let url = "/api/v2/aggregate/affiliate/unioncount/" + this.affiliateId + "?scope=global";
      return axios.get(url).then((response) => {
        this.affiliates = response.data.data;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
const _hoisted_1$a = { class: "data-container" };
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$a, [
    _cache[0] || (_cache[0] = createBaseVNode(
      "div",
      { class: "data-tag" },
      null,
      -1
      /* HOISTED */
    )),
    createVNode(VList, { density: "compact" }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.affiliates, (affiliate, index) => {
            return openBlock(), createBlock(
              VListItem,
              { key: index },
              {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(affiliate.UnionRelationshipTypeName) + " - " + toDisplayString(affiliate.UnionRelationship),
                    1
                    /* TEXT */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      _: 1
      /* STABLE */
    })
  ]);
}
const AffiliateUnionCountComponent = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/AffiliateUnionCountComponent.vue"]]);
const _sfc_main$f = {
  __name: "DisplayPhone",
  props: {
    phone: Object
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const status = props.phone.ContactStatus && props.phone.ContactStatus.ContactStatusName === "Invalid" ? "contact-invalid" : "";
    const type = props.phone.IndividualPhoneType && props.phone.IndividualPhoneType.IndividualPhoneTypeName ? `${props.phone.IndividualPhoneType.IndividualPhoneTypeName}:` : "";
    const countryCode = props.phone.Country && props.phone.Country.CountryCallingCode ? `+${props.phone.Country.CountryCallingCode} ` : "";
    const phoneNumber = props.phone.PhoneNumber ? props.phone.PhoneNumber : "";
    const extension = props.phone.Extension ? ` x${props.phone.Extension}` : "";
    const number = `${countryCode}${phoneNumber}${extension}`;
    const isRestricted = props.phone.CanCallRestriction && props.phone.CanCallRestriction.ContactRestrictionId === 2;
    const __returned__ = { props, status, type, countryCode, phoneNumber, extension, number, isRestricted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$9 = { class: "mb-2" };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    $setup.type ? (openBlock(), createElementBlock(
      "span",
      {
        key: 0,
        class: normalizeClass(["mr-1", $setup.status])
      },
      toDisplayString($setup.type),
      3
      /* TEXT, CLASS */
    )) : createCommentVNode("v-if", true),
    createBaseVNode(
      "span",
      {
        class: normalizeClass($setup.status)
      },
      toDisplayString($setup.number),
      2
      /* CLASS */
    ),
    $setup.isRestricted ? (openBlock(), createBlock(VTooltip, {
      key: 1,
      text: "Do Not Contact"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "🚫",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true),
    $props.phone.IsPreferred ? (openBlock(), createBlock(VTooltip, {
      key: 2,
      text: "Preferred"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "⭐",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true),
    $props.phone.VerifiedDate ? (openBlock(), createBlock(VTooltip, {
      key: 3,
      text: "Verified"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "✔",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true)
  ]);
}
const DisplayPhone = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/DisplayPhone.vue"]]);
const _sfc_main$e = {
  __name: "DisplayEmail",
  props: {
    email: Object
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const status = props.email.ContactStatus && props.email.ContactStatus.ContactStatusName === "Invalid" ? "contact-invalid" : "";
    const isRestricted = props.email.CanContactRestriction && props.email.CanContactRestriction.ContactRestrictionId === 2;
    const __returned__ = { props, status, isRestricted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$8 = { class: "mb-2" };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    createBaseVNode(
      "span",
      {
        class: normalizeClass($setup.status)
      },
      toDisplayString($props.email.Email),
      3
      /* TEXT, CLASS */
    ),
    $setup.isRestricted ? (openBlock(), createBlock(VTooltip, {
      key: 0,
      text: "Do Not Contact"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "🚫",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true),
    $props.email.IsPreferred ? (openBlock(), createBlock(VTooltip, {
      key: 1,
      text: "Preferred"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "⭐",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true),
    $props.email.VerifiedDate ? (openBlock(), createBlock(VTooltip, {
      key: 2,
      text: "Verified"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "✔",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true)
  ]);
}
const DisplayEmail = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/DisplayEmail.vue"]]);
const _sfc_main$d = {
  __name: "DisplayAddress",
  props: {
    address: Object
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const status = props.address.ContactStatus && props.address.ContactStatus.ContactStatusName === "Invalid" ? "contact-invalid" : "";
    const addressLine1 = props.address.AddressLine1 ? props.address.AddressLine1 : "";
    const addressLine2 = props.address.AddressLine2 ? `, ${props.address.AddressLine2}` : "";
    const city = props.address.City ? `, ${props.address.City}` : "";
    const stateTerritory = props.address.StateTerritory && props.address.StateTerritory.StateTerritoryName ? `, ${props.address.StateTerritory.StateTerritoryName}` : "";
    const postalCode = props.address.PostalCode ? `, ${props.address.PostalCode}` : "";
    const mailingAddress = `${addressLine1}${addressLine2}${city}${stateTerritory}${postalCode}`;
    const isRestricted = props.address.CanSendMailRestriction && props.address.CanSendMailRestriction.ContactRestrictionId === 2;
    const __returned__ = { props, status, addressLine1, addressLine2, city, stateTerritory, postalCode, mailingAddress, isRestricted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$7 = { class: "mb-2" };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    $props.address.IndividualAddressType ? (openBlock(), createElementBlock(
      "span",
      {
        key: 0,
        class: normalizeClass(["mr-1", $setup.status])
      },
      toDisplayString($props.address.IndividualAddressType) + ":",
      3
      /* TEXT, CLASS */
    )) : createCommentVNode("v-if", true),
    createBaseVNode(
      "span",
      {
        class: normalizeClass($setup.status)
      },
      toDisplayString($setup.mailingAddress),
      2
      /* CLASS */
    ),
    $setup.isRestricted ? (openBlock(), createBlock(VTooltip, {
      key: 1,
      text: "Do Not Contact"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "🚫",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true),
    $props.address.IsPreferred ? (openBlock(), createBlock(VTooltip, {
      key: 2,
      text: "Preferred"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "⭐",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true),
    $props.address.VerifiedDate ? (openBlock(), createBlock(VTooltip, {
      key: 3,
      text: "Verified"
    }, {
      activator: withCtx(({ props }) => [
        createBaseVNode(
          "span",
          mergeProps(props, { class: "ml-1" }),
          "✔",
          16
          /* FULL_PROPS */
        )
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true)
  ]);
}
const DisplayAddress = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/DisplayAddress.vue"]]);
const _sfc_main$c = {
  name: "AffiliateDetail",
  components: {
    "union-count-component": AffiliateUnionCountComponent,
    DisplayPhone,
    DisplayEmail,
    DisplayAddress
  },
  props: {
    loading: { type: Boolean, required: true },
    affiliate: null
  },
  computed: {
    fiscalYearEnd() {
      var _a, _b;
      return (_b = (_a = this.affiliate) == null ? void 0 : _a.AffiliatePerCapita) == null ? void 0 : _b.FiscalYearEnd;
    }
  },
  data: () => ({
    tableOfficerHeaders: [],
    tableOfficerResults: [],
    tableStaffHeaders: [],
    tableStaffResults: [],
    emptyText: "Loading..."
  }),
  watch: {
    affiliate: function(value) {
      this.getOfficers(value.AffiliateId);
      this.getStaff(value.AffiliateId);
    }
  },
  mounted() {
    this.getOfficerOptions();
    this.getStaffOptions();
  },
  methods: {
    displayDate(date) {
      return format(date, "MMMM dd, yyyy hh:mm a");
    },
    async getOfficerOptions() {
      return axios$1.get("/api/staff/searchAffiliate/officers/options").then((response) => {
        this.tableOfficerHeaders = response.data.officerHeaders;
      });
    },
    async getOfficers(affiliateId) {
      return axios$1.get(`/api/staff/searchAffiliate/officers/${affiliateId}`).then((response) => {
        this.tableOfficerResults = response.data.data;
        if (!this.tableOfficerResults || this.tableOfficerResults.length === 0) {
          this.emptyText = "No results";
        }
      });
    },
    async getStaffOptions() {
      return axios$1.get("/api/staff/searchAffiliate/staff/options").then((response) => {
        this.tableStaffHeaders = response.data.staffHeaders;
      });
    },
    async getStaff(affiliateId) {
      return axios$1.get(`/api/staff/searchAffiliate/staff/${affiliateId}`).then((response) => {
        this.tableStaffResults = response.data.data;
        if (!this.tableStaffResults || this.tableStaffResults.length === 0) {
          this.emptyText = "No results";
        }
      });
    }
  }
};
const _hoisted_1$6 = { key: 0 };
const _hoisted_2$6 = { key: 1 };
const _hoisted_3$4 = { key: 0 };
const _hoisted_4$3 = {
  key: 0,
  class: "mr-1"
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_union_count_component = resolveComponent("union-count-component");
  const _component_DisplayPhone = resolveComponent("DisplayPhone");
  const _component_DisplayEmail = resolveComponent("DisplayEmail");
  const _component_DisplayAddress = resolveComponent("DisplayAddress");
  return openBlock(), createElementBlock("div", null, [
    $props.loading ? (openBlock(), createElementBlock("div", _hoisted_1$6, " Loading... ")) : (openBlock(), createElementBlock("div", _hoisted_2$6, [
      createBaseVNode("p", null, [
        _cache[0] || (_cache[0] = createTextVNode("Affiliate Name: ")),
        createBaseVNode(
          "strong",
          null,
          toDisplayString($props.affiliate.AffiliateName),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("p", null, [
        _cache[1] || (_cache[1] = createTextVNode("Affiliate Number: ")),
        createBaseVNode(
          "strong",
          null,
          toDisplayString($props.affiliate.AffiliateNumber),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("p", null, [
        _cache[2] || (_cache[2] = createTextVNode("Affiliate Website: ")),
        createBaseVNode(
          "strong",
          null,
          toDisplayString($props.affiliate.AffiliateWebsite || "n/a"),
          1
          /* TEXT */
        )
      ]),
      $options.fiscalYearEnd ? (openBlock(), createElementBlock("p", _hoisted_3$4, [
        _cache[3] || (_cache[3] = createTextVNode("Fiscal Year End: ")),
        createBaseVNode(
          "strong",
          null,
          toDisplayString($options.fiscalYearEnd),
          1
          /* TEXT */
        )
      ])) : createCommentVNode("v-if", true),
      createBaseVNode("p", null, [
        _cache[4] || (_cache[4] = createTextVNode("Charter Date: ")),
        createBaseVNode(
          "strong",
          null,
          toDisplayString($options.displayDate($props.affiliate.CharterDate)),
          1
          /* TEXT */
        )
      ]),
      _cache[5] || (_cache[5] = createBaseVNode(
        "p",
        null,
        [
          createBaseVNode("strong", null, "Union Relationships Count :")
        ],
        -1
        /* HOISTED */
      )),
      createVNode(_component_union_count_component, {
        affiliateId: $props.affiliate.AffiliateId
      }, null, 8, ["affiliateId"]),
      _cache[6] || (_cache[6] = createBaseVNode(
        "h2",
        null,
        "Officers:",
        -1
        /* HOISTED */
      )),
      createVNode(VDataTableVirtual, {
        headers: _ctx.tableOfficerHeaders,
        items: _ctx.tableOfficerResults,
        "no-data-text": _ctx.emptyText,
        "fixed-header": ""
      }, {
        [`item.role`]: withCtx(({ item }) => [
          createTextVNode(
            toDisplayString(item.AffiliateOfficerRole.AffiliateOfficerRoleName),
            1
            /* TEXT */
          )
        ]),
        [`item.name`]: withCtx(({ item }) => [
          createTextVNode(
            toDisplayString(item.Individual.FullName),
            1
            /* TEXT */
          )
        ]),
        [`item.phones`]: withCtx(({ item }) => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(item.Individual.IndividualPhones, (phone) => {
              return openBlock(), createBlock(_component_DisplayPhone, {
                key: phone.PhoneNumber,
                phone
              }, null, 8, ["phone"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        [`item.emails`]: withCtx(({ item }) => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(item.Individual.IndividualEmails, (email) => {
              return openBlock(), createBlock(_component_DisplayEmail, {
                key: email.Email,
                email
              }, null, 8, ["email"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        [`item.addresses`]: withCtx(({ item }) => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(item.Individual.IndividualAddresses, (address) => {
              return openBlock(), createBlock(_component_DisplayAddress, {
                key: address.AddressLine1,
                address
              }, null, 8, ["address"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 2
        /* DYNAMIC */
      }, 1032, ["headers", "items", "no-data-text"]),
      createVNode(VDivider),
      _cache[7] || (_cache[7] = createBaseVNode(
        "h2",
        null,
        "Staff:",
        -1
        /* HOISTED */
      )),
      createVNode(VDataTableVirtual, {
        headers: _ctx.tableStaffHeaders,
        items: _ctx.tableStaffResults,
        "no-data-text": _ctx.emptyText,
        "fixed-header": ""
      }, {
        [`item.role`]: withCtx(({ item }) => [
          item.StaffDepartment ? (openBlock(), createElementBlock(
            "span",
            _hoisted_4$3,
            toDisplayString(item.StaffDepartment.StaffDepartmentName) + ":",
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          createBaseVNode(
            "span",
            null,
            toDisplayString(item.StaffTitle),
            1
            /* TEXT */
          )
        ]),
        [`item.name`]: withCtx(({ item }) => [
          createTextVNode(
            toDisplayString(item.Individual.FullName),
            1
            /* TEXT */
          )
        ]),
        [`item.phones`]: withCtx(({ item }) => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(item.Individual.IndividualPhones, (phone) => {
              return openBlock(), createBlock(_component_DisplayPhone, {
                key: phone.PhoneNumber,
                phone
              }, null, 8, ["phone"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        [`item.emails`]: withCtx(({ item }) => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(item.Individual.IndividualEmails, (email) => {
              return openBlock(), createBlock(_component_DisplayEmail, {
                key: email.Email,
                email
              }, null, 8, ["email"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        [`item.addresses`]: withCtx(({ item }) => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(item.Individual.IndividualAddresses, (address) => {
              return openBlock(), createBlock(_component_DisplayAddress, {
                key: address.AddressLine1,
                address
              }, null, 8, ["address"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 2
        /* DYNAMIC */
      }, 1032, ["headers", "items", "no-data-text"])
    ]))
  ]);
}
const AffiliateDetail = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/AffiliateDetail.vue"]]);
const contactFormatters = {
  methods: {
    formatStaff(staff) {
      let result = "";
      if (staff.StaffDepartment) {
        result += `${staff.StaffDepartment.StaffDepartmentName}: `;
      }
      if (staff.StaffTitle) {
        result += staff.StaffTitle;
      }
      return result;
    },
    formatRelationship(rel) {
      let result = "";
      result += "<td>";
      if (rel.UnionRelationshipType) {
        result += `${rel.UnionRelationshipType}: `;
      }
      if (rel.MemberId) {
        result += `${rel.MemberId} - `;
      }
      if (rel.LocalDuesCategory) {
        result += `${rel.LocalDuesCategory} - `;
      }
      if (rel.Affiliate) {
        result += `${rel.Affiliate.AffiliateName} (${rel.Affiliate.AffiliateNumber})`;
      }
      if (rel.EndDate) {
        result += `(FORMER)`;
      }
      result += "</td>";
      return result;
    },
    formatOfficer(office) {
      let result = "";
      result += "<td>";
      if (office.Affiliate) {
        result += office.Affiliate.AffiliateName;
      }
      if (office.Affiliate) {
        result += ` (${office.Affiliate.AffiliateNumber}) - `;
      }
      if (office.AffiliateOfficerRole) {
        result += office.AffiliateOfficerRole.OfficerRoleTitle.OfficerRoleTitleName;
      }
      result += "</td>";
      return result;
    },
    formatPhone(phone) {
      let type = "";
      if (phone.ContactStatus) {
        if (phone.ContactStatus.ContactStatusName === "Invalid") {
          type = "contact-invalid";
        }
      }
      let result = "";
      result += `<td class="${type}">`;
      if (phone.IndividualPhoneType) {
        result += `${phone.IndividualPhoneType.IndividualPhoneTypeName}:`;
      }
      result += "</td>";
      result += `<td class="${type}">`;
      if (phone.Country && phone.Country.CountryCallingCode) {
        result += ` +${phone.Country.CountryCallingCode} `;
      }
      if (phone.PhoneNumber) {
        result += phone.PhoneNumber;
      }
      if (phone.Extension) {
        result += ` x${phone.Extension}`;
      }
      if (phone.CanCallRestriction && phone.CanCallRestriction.ContactRestrictionId === 2) {
        result += ' <span data-toggle="tooltip" title="Do Not Contact">&#x1F6AB;</span>';
      }
      if (phone.IsPreferred) {
        result += ' <span data-toggle="tooltip" title="Preferred">&#x2B50;</span>';
      }
      if (phone.VerifiedDate) {
        result += ' <span data-toggle="tooltip" title="Verified">&#x2714;</span>';
      }
      result += "</td>";
      return result;
    },
    formatEmail(email) {
      let type = "";
      if (email.ContactStatus) {
        if (email.ContactStatus.ContactStatusName === "Invalid") {
          type = "contact-invalid";
        }
      }
      let result = "";
      result += `<td class="${type}">`;
      if (email.Email) {
        result += email.Email;
      }
      if (email.CanContactRestriction && email.CanContactRestriction.ContactRestrictionId === 2) {
        result += ' <span data-toggle="tooltip" title="Do Not Contact">&#x1F6AB;</span>';
      }
      if (email.IsPreferred) {
        result += ' <span data-toggle="tooltip" title="Preferred">&#x2B50;</span>';
      }
      if (email.VerifiedDate) {
        result += ' <span data-toggle="tooltip" title="Verified">&#x2714;</span>';
      }
      result += "</td>";
      return result;
    },
    formatAddress(address) {
      let type = "";
      if (address.ContactStatus) {
        if (address.ContactStatus.ContactStatusName === "Invalid") {
          type = "contact-invalid";
        }
      }
      let result = "";
      result += `<td class="${type}">`;
      if (address.IndividualAddressType) {
        result += `${address.IndividualAddressType}:`;
      }
      result += "</td>";
      result += `<td class="${type}">`;
      if (address.AddressLine1) {
        result += address.AddressLine1;
      }
      if (address.AddressLine2) {
        result += `, ${address.AddressLine2}`;
      }
      if (address.City) {
        result += `, ${address.City}`;
      }
      if (address.StateTerritory) {
        result += `, ${address.StateTerritory.StateTerritoryName}`;
      }
      if (address.PostalCode) {
        result += `, ${address.PostalCode}`;
      }
      if (address.CanSendMailRestriction && address.CanSendMailRestriction.ContactRestrictionId === 2) {
        result += ' <span data-toggle="tooltip" title="Do Not Contact">&#x1F6AB;</span>';
      }
      if (address.IsPreferred) {
        result += ' <span data-toggle="tooltip" title="Preferred">&#x2B50;</span>';
      }
      if (address.VerifiedDate) {
        result += ' <span data-toggle="tooltip" title="Verified">&#x2714;</span>';
      }
      result += "</td>";
      return result;
    }
  }
};
const _sfc_main$b = {
  name: "SearchAffiliate",
  components: {
    AffiliateDetail,
    DisplayAddress,
    DisplayEmail,
    DisplayPhone
  },
  mixins: [
    contactFormatters
  ],
  data: () => ({
    loading: false,
    search: {
      affiliate: null,
      parent: null,
      city: null,
      state: null,
      zip: null
    },
    tableOptions: {
      current_page: 1,
      per_page: 15,
      total: 0
    },
    tableHeaders: [],
    tableResults: [],
    stateFeds: [],
    showAffiliateModal: false,
    showAffiliateLoading: false,
    affiliateDetails: {}
  }),
  mounted() {
    let urlSearch = false;
    const query = this.$route.query;
    Object.entries(query).forEach(([key, value]) => {
      if (key in this.search) {
        this.search[key] = value;
        urlSearch = true;
      }
    });
    this.getOptions().then(() => {
      if (urlSearch) {
        this.searchAffiliate();
      }
    });
  },
  methods: {
    setUrl(search) {
      this.$router.push({ name: this.$route.name, query: search }).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    },
    async getOptions() {
      this.loading = true;
      return axios$1.get("/api/staff/searchAffiliate/options").then((response) => {
        this.tableOptions = response.data.options;
        this.tableHeaders = response.data.headers;
        this.stateFeds = response.data.statefeds;
      }).finally(() => {
        this.loading = false;
      });
    },
    async searchAffiliate() {
      this.loading = true;
      this.setUrl(pickBy(this.search));
      return axios$1.post("/api/staff/searchAffiliate", { search: this.search, options: this.tableOptions }).then((response) => {
        const { data, ...options } = response.data;
        this.tableOptions = options;
        this.tableResults = data;
      }).finally(() => {
        this.loading = false;
      });
    },
    clearAll() {
      for (const [key] of Object.entries(this.search)) {
        this.search[key] = null;
      }
      this.setUrl(null);
    },
    pageChanged(page) {
      this.tableOptions.current_page = page;
      this.searchAffiliate();
    },
    perPageChanged(perPage) {
      this.tableOptions.per_page = perPage;
      this.searchAffiliate();
    },
    showAffiliateDetails(affiliateId) {
      this.showAffiliateModal = true;
      this.showAffiliateLoading = true;
      this.affiliateDetails = {};
      return axios$1.get(`/api/staff/affiliate/${affiliateId}`).then((response) => {
        this.affiliateDetails = response.data;
      }).finally(() => {
        this.showAffiliateLoading = false;
      });
    }
  }
};
const _hoisted_1$5 = {
  id: "searchAffiliate",
  class: "mt-4"
};
const _hoisted_2$5 = { autocomplete: "off" };
const _hoisted_3$3 = { class: "row" };
const _hoisted_4$2 = { class: "col-md" };
const _hoisted_5$2 = { class: "col-md" };
const _hoisted_6$2 = { class: "col-md" };
const _hoisted_7$1 = { class: "row" };
const _hoisted_8$1 = { class: "col-md" };
const _hoisted_9$1 = { class: "col-md" };
const _hoisted_10$1 = { class: "d-flex justify-content-center ga-2" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DisplayPhone = resolveComponent("DisplayPhone");
  const _component_DisplayEmail = resolveComponent("DisplayEmail");
  const _component_DisplayAddress = resolveComponent("DisplayAddress");
  const _component_affiliate_detail = resolveComponent("affiliate-detail");
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createBaseVNode("form", _hoisted_2$5, [
      createBaseVNode("div", _hoisted_3$3, [
        createBaseVNode("div", _hoisted_4$2, [
          createVNode(VTextField, {
            modelValue: _ctx.search.affiliate,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.search.affiliate = $event),
            label: "Affiliate Name or Number"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Affiliate Name or Number" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-list-alt" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_5$2, [
          createVNode(VSelect, {
            modelValue: _ctx.search.parent,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.search.parent = $event),
            label: "State Federation",
            items: _ctx.stateFeds,
            "item-value": "AffiliateId",
            "item-title": "AffiliateName"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "State Federation" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-sitemap" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue", "items"])
        ]),
        createBaseVNode("div", _hoisted_6$2, [
          createVNode(VTextField, {
            modelValue: _ctx.search.zip,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.search.zip = $event),
            label: "Zip Code"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Zip Code" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "mdi:mdi-map-marker" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ])
      ]),
      createBaseVNode("div", _hoisted_7$1, [
        createBaseVNode("div", _hoisted_8$1, [
          createVNode(VTextField, {
            modelValue: _ctx.search.city,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.search.city = $event),
            label: "City"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "City" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "mdi:mdi-city" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_9$1, [
          createVNode(VTextField, {
            modelValue: _ctx.search.state,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.search.state = $event),
            label: "State"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "State" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-flag" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ])
      ]),
      createBaseVNode("div", _hoisted_10$1, [
        createVNode(VBtn, {
          name: "clear",
          loading: _ctx.loading,
          onClick: $options.clearAll,
          color: "secondary"
        }, {
          default: withCtx(() => _cache[10] || (_cache[10] = [
            createTextVNode(" Clear All Fields ")
          ])),
          _: 1
          /* STABLE */
        }, 8, ["loading", "onClick"]),
        createVNode(VBtn, {
          name: "search",
          loading: _ctx.loading,
          onClick: $options.searchAffiliate,
          color: "primary"
        }, {
          default: withCtx(() => _cache[11] || (_cache[11] = [
            createTextVNode(" Search ")
          ])),
          _: 1
          /* STABLE */
        }, 8, ["loading", "onClick"])
      ]),
      createVNode(VDivider)
    ]),
    createVNode(VDataTableServer, {
      "items-per-page": _ctx.tableOptions.per_page,
      "onUpdate:itemsPerPage": [
        _cache[5] || (_cache[5] = ($event) => _ctx.tableOptions.per_page = $event),
        $options.perPageChanged
      ],
      page: _ctx.tableOptions.current_page,
      "onUpdate:page": [
        _cache[6] || (_cache[6] = ($event) => _ctx.tableOptions.current_page = $event),
        $options.pageChanged
      ],
      "items-length": _ctx.tableOptions.total,
      "onUpdate:itemsLength": _cache[7] || (_cache[7] = ($event) => _ctx.tableOptions.total = $event),
      headers: _ctx.tableHeaders,
      items: _ctx.tableResults,
      loading: _ctx.loading
    }, {
      [`item.affiliate`]: withCtx(({ item }) => [
        createVNode(VBtn, {
          variant: "text",
          onClick: ($event) => $options.showAffiliateDetails(item.AffiliateId)
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString(item.AffiliateName) + " - (" + toDisplayString(item.AffiliateNumber) + ") ",
              1
              /* TEXT */
            )
          ]),
          _: 2
          /* DYNAMIC */
        }, 1032, ["onClick"])
      ]),
      [`item.phones`]: withCtx(({ item }) => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(item.AffiliatePhonesOrdered, (phone) => {
            return openBlock(), createBlock(_component_DisplayPhone, {
              key: phone.PhoneNumber,
              phone
            }, null, 8, ["phone"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      [`item.emails`]: withCtx(({ item }) => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(item.AffiliateEmailsOrdered, (email) => {
            return openBlock(), createBlock(_component_DisplayEmail, {
              key: email.Email,
              email
            }, null, 8, ["email"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      [`item.addresses`]: withCtx(({ item }) => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(item.AffiliateAddressesOrdered, (address) => {
            return openBlock(), createBlock(_component_DisplayAddress, {
              key: address.AddressLine1,
              address
            }, null, 8, ["address"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      _: 2
      /* DYNAMIC */
    }, 1032, ["items-per-page", "page", "items-length", "headers", "items", "loading", "onUpdate:page", "onUpdate:itemsPerPage"]),
    createVNode(VDialog, {
      modelValue: _ctx.showAffiliateModal,
      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.showAffiliateModal = $event),
      scrollable: ""
    }, {
      default: withCtx(() => [
        createVNode(VCard, { title: "Affiliate Details" }, {
          default: withCtx(() => [
            createVNode(VCardText, null, {
              default: withCtx(() => [
                createVNode(_component_affiliate_detail, {
                  affiliate: _ctx.affiliateDetails,
                  loading: _ctx.showAffiliateLoading
                }, null, 8, ["affiliate", "loading"])
              ]),
              _: 1
              /* STABLE */
            }),
            createVNode(VDivider),
            createVNode(VCardActions, null, {
              default: withCtx(() => [
                createVNode(VBtn, {
                  onClick: _cache[8] || (_cache[8] = ($event) => _ctx.showAffiliateModal = false)
                }, {
                  default: withCtx(() => _cache[12] || (_cache[12] = [
                    createTextVNode("Close")
                  ])),
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
    }, 8, ["modelValue"])
  ]);
}
const ViewSearchAffiliate = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/ViewSearchAffiliate.vue"]]);
const _sfc_main$a = {
  __name: "DisplayOfficer",
  props: {
    "officer": Object
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$4 = { class: "mb-2" };
const _hoisted_2$4 = {
  key: 0,
  class: "mr-1"
};
const _hoisted_3$2 = { key: 1 };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    $props.officer.Affiliate ? (openBlock(), createElementBlock(
      "span",
      _hoisted_2$4,
      toDisplayString($props.officer.Affiliate.AffiliateName) + " (" + toDisplayString($props.officer.Affiliate.AffiliateNumber) + ") - ",
      1
      /* TEXT */
    )) : createCommentVNode("v-if", true),
    $props.officer.AffiliateOfficerRole ? (openBlock(), createElementBlock(
      "span",
      _hoisted_3$2,
      toDisplayString((_b = (_a = $props.officer.AffiliateOfficerRole) == null ? void 0 : _a.OfficerRoleTitle) == null ? void 0 : _b.OfficerRoleTitleName),
      1
      /* TEXT */
    )) : createCommentVNode("v-if", true)
  ]);
}
const DisplayOfficer = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/DisplayOfficer.vue"]]);
const _sfc_main$9 = {
  __name: "DisplayRelationship",
  props: {
    "relationship": Object
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$3 = { class: "mb-2" };
const _hoisted_2$3 = {
  key: 0,
  class: "mr-1"
};
const _hoisted_3$1 = {
  key: 1,
  class: "mr-1"
};
const _hoisted_4$1 = {
  key: 2,
  class: "mr-1"
};
const _hoisted_5$1 = { key: 3 };
const _hoisted_6$1 = { key: 4 };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    $props.relationship.UnionRelationshipType ? (openBlock(), createElementBlock(
      "span",
      _hoisted_2$3,
      toDisplayString($props.relationship.UnionRelationshipType),
      1
      /* TEXT */
    )) : createCommentVNode("v-if", true),
    $props.relationship.MemberId ? (openBlock(), createElementBlock(
      "span",
      _hoisted_3$1,
      toDisplayString($props.relationship.MemberId) + " - ",
      1
      /* TEXT */
    )) : createCommentVNode("v-if", true),
    $props.relationship.LocalDuesCategory ? (openBlock(), createElementBlock(
      "span",
      _hoisted_4$1,
      toDisplayString($props.relationship.LocalDuesCategory) + " - ",
      1
      /* TEXT */
    )) : createCommentVNode("v-if", true),
    $props.relationship.Affiliate ? (openBlock(), createElementBlock(
      "span",
      _hoisted_5$1,
      toDisplayString($props.relationship.Affiliate.AffiliateName) + " (" + toDisplayString($props.relationship.Affiliate.AffiliateNumber) + ")",
      1
      /* TEXT */
    )) : createCommentVNode("v-if", true),
    $props.relationship.EndDate ? (openBlock(), createElementBlock("span", _hoisted_6$1, " (FORMER)")) : createCommentVNode("v-if", true)
  ]);
}
const DisplayRelationship = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/DisplayRelationship.vue"]]);
const _sfc_main$8 = {
  name: "SearchIndividual",
  components: {
    DisplayAddress,
    DisplayEmail,
    DisplayOfficer,
    DisplayPhone,
    DisplayRelationship
  },
  data: () => ({
    loading: false,
    search: {
      memberid: null,
      affiliate: null,
      parent: null,
      phone: null,
      city: null,
      state: null,
      nameFirst: null,
      nameMiddle: null,
      nameLast: null,
      namePreferred: null,
      email: null
    },
    tableOptions: {
      current_page: 1,
      per_page: 15,
      total: 0
    },
    tableHeaders: [],
    tableResults: [],
    stateFeds: []
  }),
  mounted() {
    let urlSearch = false;
    const query = this.$route.query;
    Object.entries(query).forEach(([key, value]) => {
      if (key in this.search) {
        this.search[key] = value;
        urlSearch = true;
      }
    });
    this.getOptions().then(() => {
      if (urlSearch) {
        this.searchIndividual();
      }
    });
  },
  methods: {
    setUrl(search) {
      this.$router.push({ name: this.$route.name, query: search }).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    },
    async getOptions() {
      this.loading = true;
      return axios$1.get("/api/staff/searchIndividual/options").then((response) => {
        this.tableOptions = response.data.options;
        this.tableHeaders = response.data.headers;
        this.stateFeds = response.data.statefeds;
      }).finally(() => {
        this.loading = false;
      });
    },
    async searchIndividual() {
      this.loading = true;
      this.setUrl(pickBy(this.search));
      return axios$1.post("/api/staff/searchIndividual", { search: this.search, options: this.tableOptions }).then((response) => {
        const { data, ...options } = response.data;
        this.tableOptions = options;
        this.tableResults = data;
      }).finally(() => {
        this.loading = false;
      });
    },
    clearAll() {
      for (const [key] of Object.entries(this.search)) {
        this.search[key] = null;
      }
      this.setUrl(null);
    },
    pageChanged(page) {
      this.tableOptions.current_page = page;
      this.searchIndividual(page);
    },
    perPageChanged(perPage) {
      this.tableOptions.per_page = perPage;
      this.searchAffiliate();
    }
  }
};
const _hoisted_1$2 = {
  id: "searchIndividual",
  class: "mt-4"
};
const _hoisted_2$2 = { autocomplete: "off" };
const _hoisted_3 = { class: "row" };
const _hoisted_4 = { class: "col-md" };
const _hoisted_5 = { class: "col-md" };
const _hoisted_6 = { class: "col-md" };
const _hoisted_7 = { class: "row" };
const _hoisted_8 = { class: "col-md" };
const _hoisted_9 = { class: "col-md" };
const _hoisted_10 = { class: "col-md" };
const _hoisted_11 = { class: "row" };
const _hoisted_12 = { class: "col-md" };
const _hoisted_13 = { class: "col-md" };
const _hoisted_14 = { class: "col-md" };
const _hoisted_15 = { class: "row" };
const _hoisted_16 = { class: "col-md" };
const _hoisted_17 = { class: "col-md" };
const _hoisted_18 = { class: "d-flex justify-content-center ga-2" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DisplayRelationship = resolveComponent("DisplayRelationship");
  const _component_DisplayOfficer = resolveComponent("DisplayOfficer");
  const _component_DisplayPhone = resolveComponent("DisplayPhone");
  const _component_DisplayEmail = resolveComponent("DisplayEmail");
  const _component_DisplayAddress = resolveComponent("DisplayAddress");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("form", _hoisted_2$2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(VTextField, {
            modelValue: _ctx.search.nameFirst,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.search.nameFirst = $event),
            label: "First Name"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "First Name" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-user" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_5, [
          createVNode(VTextField, {
            modelValue: _ctx.search.nameMiddle,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.search.nameMiddle = $event),
            label: "Middle Name"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Middle Name" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-user" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createVNode(VTextField, {
            modelValue: _ctx.search.nameLast,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.search.nameLast = $event),
            label: "Last Name"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Last Name" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-user" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          createVNode(VTextField, {
            modelValue: _ctx.search.memberid,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.search.memberid = $event),
            label: "Member ID"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Member ID" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-id-card" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_9, [
          createVNode(VTextField, {
            modelValue: _ctx.search.affiliate,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.search.affiliate = $event),
            label: "Affiliate Name or Number"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Affiliate Name or Number" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-list-alt" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_10, [
          createVNode(VSelect, {
            modelValue: _ctx.search.parent,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.search.parent = $event),
            label: "State Federation",
            items: _ctx.stateFeds,
            "item-value": "AffiliateId",
            "item-title": "AffiliateName"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "State Federation" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-sitemap" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue", "items"])
        ])
      ]),
      createBaseVNode("div", _hoisted_11, [
        createBaseVNode("div", _hoisted_12, [
          createVNode(VTextField, {
            modelValue: _ctx.search.phone,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.search.phone = $event),
            label: "Phone Number"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Phone Number" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-phone" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_13, [
          createVNode(VTextField, {
            modelValue: _ctx.search.city,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.search.city = $event),
            label: "Home City"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Home City" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "mdi:mdi-city" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_14, [
          createVNode(VTextField, {
            modelValue: _ctx.search.state,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.search.state = $event),
            label: "Home State"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Home State" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-flag" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ])
      ]),
      createBaseVNode("div", _hoisted_15, [
        createBaseVNode("div", _hoisted_16, [
          createVNode(VTextField, {
            modelValue: _ctx.search.namePreferred,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.search.namePreferred = $event),
            label: "Preferred Name"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Preferred Name" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-user" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_17, [
          createVNode(VTextField, {
            modelValue: _ctx.search.email,
            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.search.email = $event),
            label: "Email Address"
          }, {
            "prepend-inner": withCtx(() => [
              createVNode(VTooltip, { text: "Email Address" }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VIcon,
                    mergeProps(props, { icon: "fa-at" }),
                    null,
                    16
                    /* FULL_PROPS */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ])
      ]),
      createBaseVNode("div", _hoisted_18, [
        createVNode(VBtn, {
          name: "clear",
          loading: _ctx.loading,
          onClick: $options.clearAll,
          color: "secondary"
        }, {
          default: withCtx(() => _cache[14] || (_cache[14] = [
            createTextVNode(" Clear All Fields ")
          ])),
          _: 1
          /* STABLE */
        }, 8, ["loading", "onClick"]),
        createVNode(VBtn, {
          name: "search",
          loading: _ctx.loading,
          onClick: $options.searchIndividual,
          color: "primary"
        }, {
          default: withCtx(() => _cache[15] || (_cache[15] = [
            createTextVNode(" Search ")
          ])),
          _: 1
          /* STABLE */
        }, 8, ["loading", "onClick"])
      ]),
      createVNode(VDivider)
    ]),
    createVNode(VDataTableServer, {
      "items-per-page": _ctx.tableOptions.per_page,
      "onUpdate:itemsPerPage": [
        _cache[11] || (_cache[11] = ($event) => _ctx.tableOptions.per_page = $event),
        $options.perPageChanged
      ],
      page: _ctx.tableOptions.current_page,
      "onUpdate:page": [
        _cache[12] || (_cache[12] = ($event) => _ctx.tableOptions.current_page = $event),
        $options.pageChanged
      ],
      "items-length": _ctx.tableOptions.total,
      "onUpdate:itemsLength": _cache[13] || (_cache[13] = ($event) => _ctx.tableOptions.total = $event),
      headers: _ctx.tableHeaders,
      items: _ctx.tableResults,
      loading: _ctx.loading
    }, {
      [`item.name`]: withCtx(({ item }) => [
        createTextVNode(
          toDisplayString(item.FullName),
          1
          /* TEXT */
        )
      ]),
      [`item.relationships`]: withCtx(({ item }) => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(item.IndividualAffiliatesAll, (relationship) => {
            return openBlock(), createBlock(_component_DisplayRelationship, {
              key: relationship.Affiliate.AffiliateId,
              relationship
            }, null, 8, ["relationship"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      [`item.officership`]: withCtx(({ item }) => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(item.AffiliateOfficership, (officer) => {
            return openBlock(), createBlock(_component_DisplayOfficer, {
              key: officer.AffiliateOfficerId,
              officer
            }, null, 8, ["officer"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      [`item.phones`]: withCtx(({ item }) => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(item.IndividualPhones, (phone) => {
            return openBlock(), createBlock(_component_DisplayPhone, {
              key: phone.PhoneNumber,
              phone
            }, null, 8, ["phone"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      [`item.emails`]: withCtx(({ item }) => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(item.IndividualEmails, (email) => {
            return openBlock(), createBlock(_component_DisplayEmail, {
              key: email.Email,
              email
            }, null, 8, ["email"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      [`item.addresses`]: withCtx(({ item }) => [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(item.IndividualAddresses, (address) => {
            return openBlock(), createBlock(_component_DisplayAddress, {
              key: address.AddressLine1,
              address
            }, null, 8, ["address"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      _: 2
      /* DYNAMIC */
    }, 1032, ["items-per-page", "page", "items-length", "headers", "items", "loading", "onUpdate:page", "onUpdate:itemsPerPage"])
  ]);
}
const ViewSearchIndividual = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/ViewSearchIndividual.vue"]]);
const downloadOptionTypeToComponent = {
  methods: {
    downloadOptionTypeToComponent(type) {
      switch (type) {
        case "checklist":
          return "DownloadOptionCheckList";
        default:
          return "DownloadOptionTextField";
      }
    }
  }
};
const _sfc_main$7 = {
  name: "DownloadOptionCheckList",
  props: {
    option: { type: Object, required: true }
  },
  data: () => ({
    selected: []
  }),
  watch: {
    selected() {
      console.log("selected", this.selected);
      this.$emit("input", this.selected);
    }
  }
};
const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = { key: 1 };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_checkbox = resolveComponent("b-form-checkbox");
  const _component_b_form_group = resolveComponent("b-form-group");
  return openBlock(), createElementBlock("div", null, [
    $props.option.items && $props.option.items.length >= 1 ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($props.option.items, (item) => {
          return openBlock(), createElementBlock("div", {
            key: item.AffiliateCommitteeId
          }, [
            createVNode(
              _component_b_form_group,
              null,
              {
                default: withCtx(() => [
                  createVNode(_component_b_form_checkbox, {
                    modelValue: _ctx.selected,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selected = $event),
                    value: item.AffiliateCommitteeId
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(item.AffiliateCommitteeName) + " - " + toDisplayString(item.Description),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["modelValue", "value"])
                ]),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ])) : (openBlock(), createElementBlock("div", _hoisted_2$1, _cache[1] || (_cache[1] = [
      createBaseVNode(
        "p",
        null,
        "No data",
        -1
        /* HOISTED */
      )
    ])))
  ]);
}
const DownloadOptionCheckList = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/DownloadOptionCheckList.vue"]]);
const _sfc_main$6 = {
  name: "DownloadOptionTextField",
  props: {
    option: { type: Object, required: true }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("p", null, "Text Field!");
}
const DownloadOptionTextField = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/DownloadOptionTextField.vue"]]);
const _sfc_main$5 = {
  name: "DownloadOptions",
  components: {
    DownloadOptionCheckList,
    DownloadOptionTextField
  },
  mixins: [downloadOptionTypeToComponent],
  props: {
    list: { type: Object, required: true }
  },
  data: () => ({
    showDialog: false,
    loading: false,
    options: []
  }),
  computed: {
    listTitle() {
      return this.list.label + " Download Options";
    }
  },
  watch: {
    list() {
      console.log("OPTIONS CHANGED");
    },
    options: {
      deep: true,
      handler() {
        console.log("DOWNLOAD OPTIONS", this.options);
      }
    }
  },
  mounted() {
  },
  methods: {
    show() {
      this.options = [];
      this.getListOptions(this.list.id);
      this.showDialog = true;
    },
    hide() {
      this.showDialog = false;
    },
    doOk() {
      this.$emit("ok", this.list, this.options);
      this.hide();
    },
    getListOptions(id) {
      this.loading = true;
      return axios.get(`/api/staff/lists/${id}/options`).then((response) => {
        console.log(response.data);
        this.options = response.data;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VDialog, {
    modelValue: _ctx.showDialog,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.showDialog = $event),
    "max-width": "800"
  }, {
    default: withCtx(() => [
      createVNode(VCard, {
        title: $options.listTitle,
        loading: _ctx.loading
      }, {
        default: withCtx(() => [
          createVNode(VCardText, null, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.options, (option, index) => {
                  return openBlock(), createBlock(resolveDynamicComponent(_ctx.downloadOptionTypeToComponent(option.type)), {
                    key: index,
                    option,
                    modelValue: option.value,
                    "onUpdate:modelValue": ($event) => option.value = $event
                  }, null, 8, ["option", "modelValue", "onUpdate:modelValue"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCardActions, null, {
            default: withCtx(() => [
              createVNode(VBtn, { onClick: $options.hide }, {
                default: withCtx(() => _cache[1] || (_cache[1] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              createVNode(VBtn, {
                onClick: $options.doOk,
                color: "primary",
                "prepend-icon": "fa-cloud-arrow-down"
              }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode("Download")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["title", "loading"])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["modelValue"]);
}
const DownloadOptions = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/custom/DownloadOptions.vue"]]);
const _sfc_main$4 = {
  name: "ViewLists",
  components: { DownloadOptions },
  data: () => ({
    loading: false,
    loadingUser: false,
    user: null,
    userAbilities: [],
    lists: [],
    listSelected: {}
  }),
  created() {
    this.getUser().then(() => {
      this.getLists();
    });
  },
  methods: {
    getUser() {
      this.loadingUser = true;
      return axios.get("/api/v2/user").then((response) => {
        this.user = response.data.data;
        this.userAbilities = this.user.AuthUserAbilities.map((ability) => {
          var _a;
          return (_a = ability == null ? void 0 : ability.AuthAbility) == null ? void 0 : _a.type;
        }).filter((ability) => ability);
      }).finally(() => {
        this.loadingUser = false;
      });
    },
    getLists() {
      this.loading = true;
      return axios.get("/api/staff/lists").then((response) => {
        this.lists = [];
        response.data.forEach((list) => {
          if (this.userAbilities.includes(list.ability)) {
            this.lists.push(list);
          }
        });
      }).finally(() => {
        this.loading = false;
      });
    },
    methodCall(name, list) {
      switch (name) {
        case "download":
          return this.download(list);
        case "chooseOptions":
          return this.chooseOptions(list);
      }
      alert("No method associated with " + name);
      return null;
    },
    download(list, options) {
      this.loading = true;
      return axios({
        url: "/api/staff/lists/" + list.id,
        data: options,
        method: "POST",
        responseType: "blob"
      }).then((response) => {
        const fileName = this.getFileNameFromHeader(response.headers);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      }).catch((error) => {
        console.log(error);
        alert("Download Failed");
      }).finally(() => {
        this.loading = false;
      });
    },
    chooseOptions(list) {
      console.log("list", list);
      this.listSelected = list;
      this.$nextTick(function() {
        this.$refs.downloadOptions.show();
      });
    },
    doOptionsCancel() {
      console.log("options cancel");
    },
    doOptionsOk(list, options) {
      console.log("DO OPTIONS OK", list, options);
      let opts = {};
      options.forEach((option) => {
        opts[option.parameter] = option.value;
      });
      console.log("OPTS", opts);
      this.download(list, opts);
    },
    getFileNameFromHeader(headers) {
      let filename = "download.csv";
      if (headers) {
        const cd = headers["content-disposition"] ?? null;
        if (cd) {
          let cdlist = cd.split(";");
          cdlist = cdlist.map(Function.prototype.call, String.prototype.trim);
          let cdobj = {};
          cdlist.forEach((item) => {
            const i = item.split("=");
            cdobj[i[0]] = i[1];
          });
          if (cdobj.filename) {
            filename = cdobj.filename;
          }
        }
      }
      return filename;
    }
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_download_options = resolveComponent("download-options");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      _ctx.loadingUser ? (openBlock(), createBlock(VSkeletonLoader, {
        key: 0,
        type: "card"
      })) : (openBlock(), createBlock(VCard, {
        key: 1,
        title: _ctx.user.name,
        class: "mb-12"
      }, {
        default: withCtx(() => [
          createVNode(VCardText, null, {
            default: withCtx(() => [
              createVNode(VList, null, {
                default: withCtx(() => [
                  createVNode(VListItem, null, {
                    default: withCtx(() => [
                      createVNode(VListItemTitle, null, {
                        default: withCtx(() => _cache[0] || (_cache[0] = [
                          createTextVNode(" Email ")
                        ])),
                        _: 1
                        /* STABLE */
                      }),
                      createTextVNode(
                        " " + toDisplayString(_ctx.user.email),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VListItem, null, {
                    default: withCtx(() => [
                      createVNode(VListItemTitle, null, {
                        default: withCtx(() => _cache[1] || (_cache[1] = [
                          createTextVNode(" Type ")
                        ])),
                        _: 1
                        /* STABLE */
                      }),
                      createTextVNode(
                        " " + toDisplayString(_ctx.user.type),
                        1
                        /* TEXT */
                      )
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
      }, 8, ["title"])),
      _ctx.loading ? (openBlock(), createBlock(VSkeletonLoader, {
        key: 2,
        type: "card"
      })) : (openBlock(true), createElementBlock(
        Fragment,
        { key: 3 },
        renderList(_ctx.lists, (list) => {
          return openBlock(), createBlock(
            VCard,
            {
              key: list.id,
              class: "mb-8"
            },
            {
              default: withCtx(() => [
                createVNode(
                  VCardTitle,
                  null,
                  {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(list.label),
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
                createVNode(VCardText, {
                  innerHTML: list.description
                }, null, 8, ["innerHTML"]),
                createVNode(
                  VCardActions,
                  null,
                  {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        onClick: ($event) => $options.methodCall(list.action.method, list),
                        "prepend-icon": list.action.icon
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(list.action.label),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["onClick", "prepend-icon"])
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
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      createVNode(_component_download_options, {
        ref: "downloadOptions",
        list: _ctx.listSelected,
        onCancel: $options.doOptionsCancel,
        onOk: $options.doOptionsOk
      }, null, 8, ["list", "onCancel", "onOk"])
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const ViewLists = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-35ff87b5"], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/ViewLists.vue"]]);
const _sfc_main$3 = {};
function _sfc_render$3(_ctx, _cache) {
  return openBlock(), createBlock(VCard, {
    variant: "elevated",
    class: "my-12",
    title: "Oops! This page does not exist!"
  }, {
    default: withCtx(() => [
      createVNode(VCardText, null, {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createTextVNode(" 404: Page not found ")
        ])),
        _: 1
        /* STABLE */
      }),
      createVNode(VCardActions, null, {
        default: withCtx(() => [
          createVNode(VBtn, { to: "/" }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createTextVNode("Back to Staff Portal")
            ])),
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
const View404 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/View404.vue"]]);
const router = createRouter({
  history: createWebHistory("/app/staff"),
  routes: [
    {
      path: "/",
      component: ViewDashboard,
      meta: { displayName: "Dashboard" },
      name: "dashboard"
    },
    {
      path: "/affiliateSearch",
      component: ViewSearchAffiliate,
      meta: { displayName: "Affiliate Search" }
    },
    {
      path: "/individualSearch",
      component: ViewSearchIndividual,
      meta: { displayName: "Individual Search", hidden: true, ability: "memberlists" }
    },
    {
      path: "/lists",
      component: ViewLists,
      meta: { displayName: "Lists", hidden: true, ability: "staffportallists" },
      abilities: [
        "affpresidents",
        "aftppcs"
      ],
      name: "lists"
    },
    {
      path: "/:pathMatch(.*)*",
      component: View404,
      meta: { displayName: "Page Not Found", hidden: true }
    }
  ]
});
const _sfc_main$2 = {
  name: "MainNavigation",
  data() {
    return {
      user: {
        name: "Username"
      },
      userAbilities: [],
      routes: this.$router.options.routes,
      drawerOpen: false,
      visibleRoutes: []
    };
  },
  created() {
    this.getUser().then(() => {
      this.$router.options.routes.forEach((route) => {
        if (this.userAbilities.includes(route.meta.ability)) {
          route.meta.hidden = false;
          console.log("unhidden", { route });
        }
        if (route.abilities) {
          route.abilities.forEach((ability) => {
            if (this.userAbilities.includes(ability)) {
              route.meta.hidden = false;
            }
          });
        }
      });
      this.visibleRoutes = this.$router.options.routes.filter((route) => !route.meta.hidden);
    });
  },
  computed: {
    showMenu() {
      return this.drawerOpen && this.$vuetify.display.smAndDown;
    }
  },
  methods: {
    getUser() {
      return axios$1.get("/api/v2/user").then((response) => {
        this.user = response.data.data;
        this.userAbilities = this.user.AuthUserAbilities.map((ability) => {
          var _a;
          return (_a = ability == null ? void 0 : ability.AuthAbility) == null ? void 0 : _a.type;
        }).filter((ability) => ability);
      });
    },
    logout() {
      document.getElementById("logout-form").submit();
    }
  },
  mounted() {
    this.visibleRoutes = this.$router.options.routes.filter((route) => !route.meta.hidden);
  }
};
const _hoisted_1 = {
  id: "navbarCollapse",
  class: "collapse navbar-collapse text-nowrap"
};
const _hoisted_2 = {
  key: 0,
  class: "navbar-nav"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createVNode(VAppBar, {
        color: "primary",
        class: "navbar-expand-md fixed-top navbar-dark"
      }, {
        default: withCtx(() => [
          createVNode(VContainer, { class: "d-flex ga-2 align-center" }, {
            default: withCtx(() => [
              createVNode(_component_router_link, {
                to: "/",
                class: "navbar-brand"
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createBaseVNode(
                    "img",
                    {
                      src: "/images/logos/aft-small.png",
                      alt: "AFT Staff Portal"
                    },
                    null,
                    -1
                    /* HOISTED */
                  ),
                  createTextVNode(" AFT Staff Portal ")
                ])),
                _: 1
                /* STABLE */
              }),
              createBaseVNode("div", _hoisted_1, [
                _ctx.$vuetify.display.mdAndUp ? (openBlock(), createElementBlock("ul", _hoisted_2, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList($data.visibleRoutes, (route) => {
                      return openBlock(), createElementBlock("li", {
                        key: route.path,
                        ref_for: true,
                        ref: "nav-" + route.meta.ability,
                        class: "nav-item"
                      }, [
                        createVNode(_component_router_link, {
                          class: "nav-link",
                          "exact-active-class": "active",
                          to: route
                        }, {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(route.meta.displayName),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["to"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : createCommentVNode("v-if", true)
              ]),
              createVNode(VSpacer),
              _ctx.$vuetify.display.smAndDown ? (openBlock(), createBlock(VAppBarNavIcon, {
                key: 0,
                variant: "text",
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $data.drawerOpen = !$data.drawerOpen, ["stop"]))
              })) : createCommentVNode("v-if", true),
              _ctx.$vuetify.display.mdAndUp ? (openBlock(), createBlock(VMenu, { key: 1 }, {
                activator: withCtx(({ props }) => [
                  createVNode(
                    VBtn,
                    mergeProps(props, {
                      variant: "plain",
                      "append-icon": "fa-caret-down",
                      color: "white"
                    }),
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString($data.user.name),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1040
                    /* FULL_PROPS, DYNAMIC_SLOTS */
                  )
                ]),
                default: withCtx(() => [
                  createVNode(VList, null, {
                    default: withCtx(() => [
                      createVNode(VListItem, {
                        onClick: _cache[1] || (_cache[1] = ($event) => $options.logout())
                      }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createTextVNode(" Logout ")
                        ])),
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
              })) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VNavigationDrawer, {
        modelValue: $options.showMenu,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.showMenu = $event)
      }, {
        default: withCtx(() => [
          createVNode(VList, null, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList($data.visibleRoutes, (route) => {
                  return openBlock(), createBlock(VListItem, {
                    key: route.path,
                    to: route,
                    link: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(
                        VListItemTitle,
                        null,
                        {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(route.meta.displayName),
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
                  }, 1032, ["to"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              createVNode(VListItem, null, {
                default: withCtx(() => [
                  createVNode(VListItemTitle, { onClick: $options.logout }, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(" Logout ")
                    ])),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"])
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
      }, 8, ["modelValue"]),
      _cache[6] || (_cache[6] = createBaseVNode(
        "form",
        {
          id: "logout-form",
          action: "/logout",
          method: "POST",
          class: "d-none"
        },
        " @csrf ",
        -1
        /* HOISTED */
      ))
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const MainNavigation = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-b2225079"], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/global/MainNavigation.vue"]]);
const _sfc_main$1 = {
  name: "MainContent"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(_component_router_view)
    ]),
    _: 1
    /* STABLE */
  });
}
const MainContent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/components/global/MainContent.vue"]]);
const _sfc_main = {
  name: "StaffApp",
  components: {
    MainNavigation,
    MainContent
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_main_navigation = resolveComponent("main-navigation");
  const _component_main_content = resolveComponent("main-content");
  return openBlock(), createBlock(VApp, null, {
    default: withCtx(() => [
      createVNode(_component_main_navigation),
      createVNode(_component_main_content)
    ]),
    _: 1
    /* STABLE */
  });
}
const StaffApp = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/html/packages/aft/staffbeta/resources/js/StaffApp.vue"]]);
const app = createApp(StaffApp);
app.use(router);
app.use(vuetify);
app.mount("#app");
//# sourceMappingURL=app-th9n9S8S.js.map
