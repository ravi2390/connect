import { au as axios, _ as _export_sfc, v as createElementBlock, x as createCommentVNode, o as openBlock, k as createBlock, S as Fragment, T as renderList, w as withCtx, l as createVNode, aB as VListItemTitle, t as createTextVNode, y as toDisplayString, ay as VIcon, aA as VListItem, C as resolveComponent, az as VList, ap as VDivider, aI as VNavigationDrawer, a9 as VAppBar, r as createBaseVNode, W as withDirectives, s as VBtn, O as VSpacer, B as VAutocomplete, X as VProgressLinear, a0 as mergeProps, Z as VMenu, at as vShow, b6 as VMain, U as VDialog, E as VCard, F as VCardTitle, G as VCardText, N as VCardActions, aM as VApp, I as VRow, J as VCol, ba as VDataIterator, V as VContainer, am as VOverlay, D as VForm, u as VCheckbox, K as VSelect, a4 as VTable, bb as NOOP, bc as extend$1, bd as isString, be as NO, bf as isOn, bg as isSymbol, bh as isBuiltInDirective, bi as slotFlagsText, bj as capitalize, bk as camelize, bl as EMPTY_OBJ, bm as isObject, bn as toHandlerKey, bo as isArray, bp as isReservedProp, bq as PatchFlagNames, br as isHTMLTag, bs as isSVGTag, bt as isMathMLTag, bu as isVoidTag, bv as parseStringStyle, bw as makeMap, bx as generateCodeFrame, by as runtimeDom_esmBundler, bz as shared_esmBundler, M as VTextField, a5 as VExpansionPanels, P as VExpansionPanel, Q as VExpansionPanelTitle, R as VExpansionPanelText, bA as VStepperHeader, A as normalizeClass, bB as VStepperItem, bC as resolveDynamicComponent, bD as VStepperActions, bE as VStepper, av as VImg, H as VAlert, ao as VProgressCircular, ac as Scroll, q as VDataTable, a3 as VTooltip, a1 as format, p as VDataTableServer, as as withModifiers, aG as createRouter, aH as createWebHistory, aN as createApp, aO as vuetify } from "./vuetify-EeS5qzD-.js";
import { M as MfpTextAreaField, a as MfpTextField, b as MfpGenericField, c as MfpWorkLocation, P as PageForm$1, d as MfpErrorDialog, e as api$2, F as FormSearchSelector$1, s as script, f as MfpTypes } from "./MfpTypes-RkDj85EQ.js";
import { F as FooterComponent } from "./FooterComponent-CXNDXtA5.js";
import { t as toNumber, d as debounce } from "./debounce-DRMZstlG.js";
import { N as NewReportsComponent, c as createStore } from "./vuex.esm-bundler-qMrLOoJO.js";
import { ae as baseSlice } from "./ckeditor5-5vcNS2fJ.js";
import { g as getAugmentedNamespace, a as getDefaultExportFromCjs } from "./_commonjsHelpers-DyYX6rOH.js";
import "./_Uint8Array-C929yYkW.js";
import "./_baseSet-BOCO_qUt.js";
var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -Infinity) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
function toInteger(value) {
  var result = toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var nativeCeil = Math.ceil, nativeMax = Math.max;
function chunk(array, size, guard) {
  if (size === void 0) {
    size = 1;
  } else {
    size = nativeMax(toInteger(size), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  var index2 = 0, resIndex = 0, result = Array(nativeCeil(length / size));
  while (index2 < length) {
    result[resIndex++] = baseSlice(array, index2, index2 += size);
  }
  return result;
}
const api = {
  TEMPLATE_LIST: "/api/v3/memberforms/admin/template",
  MEMBER_FORM_ASSIGN: "/api/v3/memberforms/admin/member-form-assign",
  TEMPLATE_SHOW: "/api/v3/memberforms/admin/template",
  FORM_LIST: "/api/v3/memberforms/admin/form",
  FORM_SHOW: "/api/v3/memberforms/admin/form",
  VIEW_FORM_SHOW: "/api/v3/memberforms/admin/view-form",
  FORM_CREATE: "/api/v3/memberforms/admin/form/create",
  SUBMISSION_LIST: "/api/v3/memberforms/admin/submission",
  SUBMISSION_LISTV2: "/api/v3/memberforms/admin/submissionV2",
  URL_REDIRECT_LIST: "/api/v3/memberforms/admin/url-redirect",
  URL_REDIRECT_CREATE: "/api/v3/memberforms/admin/url-redirect/create",
  DUES_MAPPING_LIST: "/api/v3/memberforms/admin/dues-mapping",
  DUES_MAPPING_CREATE: "/api/v3/memberforms/admin/dues-mapping/create",
  GET_BILLHIGHWAY_BILLINGTYPES: "/api/v3/memberforms/admin/dues-mapping/getBillHighwayBillingTypes",
  CREATE_DUES_CATEGORY: "/api/v3/memberforms/admin/create-dues-category",
  GET_NATIONAL_PER_CAPITA: "/national-per-capita/getNationalPerCapita",
  ARCHIVE_FORM: "/api/v3/memberforms/admin/archive-form",
  UNARCHIVE_FORM: "/api/v3/memberforms/admin/unarchive-form",
  DOWNLOAD_SUBMISSIONS: "/api/v3/memberforms/admin/submission/download/csv/all",
  SUBMISSION_SHOW: "/api/v3/memberforms/admin/submission",
  SUBMISSION_DETAILS: "/api/v3/memberforms/admin/submission-details",
  RESEND_EMAIL: "/api/v3/memberforms/admin/resend-email",
  SUBMISSION_DUPLICATE: "/api/v3/memberforms/admin/mark-submission-as-duplicate",
  UPDATE_INDIVIDUALID: "/api/v3/memberforms/admin/submission-update-individual",
  PROCEED_COPE: "/api/v3/memberforms/admin/submission-proceed-cope",
  EDUES_ENROLLMENT: "/api/v3/memberforms/admin/edues-enrollment",
  SUBMISSION_COPE: "/api/v3/memberforms/admin/mark-submission-as-cope",
  SUBMISSION_NOTAMEMBER: "/api/v3/memberforms/admin/mark-submission-as-notamember",
  SUBMISSION_NEW: "/api/v3/memberforms/admin/mark-submission-as-new",
  SUBMISSION_QR_CODE: "/api/v3/memberforms/admin/submission-qr-code",
  DOWNLOAD_QR_CODE: "/api/v3/memberforms/admin/download-qr-code",
  SEARCH: "/api/v3/memberforms/admin/search",
  ACCESS: "/api/v3/memberforms/admin/search",
  DEFAULT_AFFILIATES: "/api/v2/search/affiliate?scope=global",
  GET_USER: "/api/v2/user",
  SELECTED_ENTITY: "/api/v2/user/select-entity?scope=global",
  UPLOAD_LOGOS: "/api/v3/memberforms/admin/upload-logos",
  FORM_CLONE_TO_DATAFORM: "/api/v3/memberforms/admin/form/clone-to-dataform",
  UPDATE_DATAFORM_SUBMISSION: "/api/v3/memberforms/admin/submission/update-dataform-submission",
  HAS_NEW_SUBMISSION_FOR_DUES: "/api/v3/memberforms/admin/submission/has-new-submission-for-dues"
};
const defaultOptions = {
  something: "nothing"
};
const api$1 = {
  name: "PrivateApi",
  install(Vue, options) {
    const opts = { ...defaultOptions, ...options };
    console.log("private api installed", opts);
  },
  templateList(affiliateId) {
    return axios.post(api.TEMPLATE_LIST, { affiliateId });
  },
  templateShow(id) {
    return axios.get(`${api.TEMPLATE_SHOW}/${id}`);
  },
  getMemberFormAssign(id) {
    return axios.get(`${api.MEMBER_FORM_ASSIGN}/${id}`);
  },
  formList(affiliateId) {
    return axios.post(api.FORM_LIST, { affiliateId });
  },
  formShow(id) {
    return axios.get(`${api.FORM_SHOW}/${id}`);
  },
  formCreate(data) {
    return axios.post(`${api.FORM_CREATE}`, data);
  },
  formDelete(id) {
    return axios.delete(`${api.FORM_SHOW}/${id}`);
  },
  formArchive(id) {
    return axios.post(`${api.ARCHIVE_FORM}`, { id });
  },
  formUnarchive(id) {
    return axios.post(`${api.UNARCHIVE_FORM}`, { id });
  },
  formCloneToDataForm(id) {
    return axios.post(`${api.FORM_CLONE_TO_DATAFORM}`, { id });
  },
  dataFormSubmissionUpdate(id) {
    return axios.put(`${api.UPDATE_DATAFORM_SUBMISSION}`, { id });
  },
  submissionList(affiliateId, formId, type, firstName, lastName) {
    return axios.post(api.SUBMISSION_LIST, {
      affiliateId,
      formId,
      type,
      firstName,
      lastName
    });
  },
  submissionListV2(affiliateId, formId, type, firstName, lastName) {
    return axios.post(api.SUBMISSION_LISTV2, {
      affiliateId,
      formId,
      type,
      firstName,
      lastName
    });
  },
  submissionDelete(id) {
    return axios.delete(`${api.SUBMISSION_SHOW}/${id}`);
  },
  urlRedirectList(affiliateName) {
    return axios.post(api.URL_REDIRECT_LIST, {
      affiliateName
    });
  },
  urlRedirectCreate(data) {
    return axios.post(`${api.URL_REDIRECT_CREATE}`, data);
  },
  urlRedirectDelete(id) {
    return axios.delete(`${api.URL_REDIRECT_LIST}/${id}`);
  },
  duesMappingCreate(data) {
    return axios.post(`${api.DUES_MAPPING_CREATE}`, data);
  },
  createDuesCategory(data) {
    return axios.post(`${api.CREATE_DUES_CATEGORY}`, data);
  },
  uploadLogos(data) {
    return axios.post(`${api.UPLOAD_LOGOS}`, data);
  },
  duesMappingList(affiliateId) {
    return axios.post(api.DUES_MAPPING_LIST, {
      affiliateId
    });
  },
  downloadSubmissions(affiliateId, formId, type, firstName, lastName, onDownloadProgress, selfV) {
    selfV.downloadingCancelToken = axios.CancelToken.source();
    return axios.request({
      url: api.DOWNLOAD_SUBMISSIONS,
      method: "POST",
      responseType: "blob",
      cancelToken: selfV.downloadingCancelToken.token,
      params: {
        affiliateId,
        formId,
        type,
        firstName,
        lastName
      },
      onDownloadProgress: function(event) {
        onDownloadProgress(event);
      }
    });
  },
  submissionShow(id) {
    return axios.get(`${api.SUBMISSION_SHOW}/${id}`);
  },
  submissionDetails(id) {
    return axios.get(`${api.SUBMISSION_DETAILS}/${id}`);
  },
  resendEmail(id) {
    return axios.get(`${api.RESEND_EMAIL}/${id}`);
  },
  individualList(url) {
    return axios.get(url);
  },
  contentBlocks(url) {
    return axios.get(url);
  },
  markSubmissionAsDuplicate(id) {
    return axios.post(`${api.SUBMISSION_DUPLICATE}/${id}`);
  },
  updateIndividualId(id, individualId, status) {
    return axios.post(`${api.UPDATE_INDIVIDUALID}/${id}`, { IndividualId: individualId, status });
  },
  proceedCope(id, individualId, status, affiliateId) {
    return axios.post(`${api.PROCEED_COPE}/${id}`, { IndividualId: individualId, status, affiliateId });
  },
  eduesEnrollment(id, individualId, affiliateId, source) {
    return axios.post(
      `${api.EDUES_ENROLLMENT}`,
      {
        IndividualId: individualId,
        AffiliateId: affiliateId,
        SubmissionId: id,
        Source: source
      }
    );
  },
  markSubmissionAsCope(id) {
    return axios.post(`${api.SUBMISSION_COPE}/${id}`);
  },
  markSubmissionAsNotAMember(id) {
    return axios.post(`${api.SUBMISSION_NOTAMEMBER}/${id}`);
  },
  markSubmissionAsNew(id) {
    return axios.post(`${api.SUBMISSION_NEW}/${id}`);
  },
  submissionDownload(id) {
    return axios.request({
      url: `${api.SUBMISSION_SHOW}/${id}/download`,
      method: "GET",
      responseType: "blob"
    }).then((response) => {
      const cd = response.headers["content-disposition"].split("; ");
      const disposition = [];
      cd.forEach((item) => {
        const t = item.split("=");
        if (t[1]) {
          t[1] = t[1].replace(/^"(.+)"$/, "$1");
        }
        disposition[t[0]] = t[1];
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", disposition.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).finally(() => {
    });
  },
  submissionQrCode(url) {
    return axios.post(`${api.SUBMISSION_QR_CODE}?url=${url}`);
  },
  downloadQrCode(url) {
    return axios.request({
      url: `${api.DOWNLOAD_QR_CODE}?url=${url}`,
      method: "POST",
      responseType: "blob"
    });
  },
  search(type, search, args) {
    return axios.post(api.SEARCH, {
      type,
      text: search,
      ...args
    });
  },
  loadDefaultAffiliates(args) {
    return axios.post(api.DEFAULT_AFFILIATES, args);
  },
  getUser() {
    return axios.get(api.GET_USER);
  },
  getNationalPerCapita() {
    return axios.get(api.GET_NATIONAL_PER_CAPITA);
  },
  setUserSelectedEntity(args) {
    return axios.post(api.SELECTED_ENTITY, args);
  },
  access(type, id) {
    return axios.get(`${api.ACCESS}/${type}/${id}`);
  },
  getBillHighwayBillingTypes(affiliateId) {
    return axios.get(`${api.GET_BILLHIGHWAY_BILLINGTYPES}/${affiliateId}`);
  },
  hasNewSubmissionForDues(affiliateId) {
    return axios.get(`${api.HAS_NEW_SUBMISSION_FOR_DUES}/${affiliateId}`);
  },
  getFormActions() {
    return {
      create: "create",
      clone: "clone",
      edit: "edit",
      editConfirmation: "editConfirmation",
      cloneToDataForm: "cloneToDataForm"
    };
  },
  getForm(id) {
    return axios.get(`${api.VIEW_FORM_SHOW}/${id}`);
  }
};
const _sfc_main$r = {
  name: "NavItem",
  props: {
    link: { type: Boolean, default: false },
    path: { type: String, required: true },
    label: { type: String, default: "unknown" },
    icon: { type: String, default: "mdi:mdi-crosshairs-question" },
    visible: { type: Boolean, default: false },
    menuItems: { type: Array, default: () => [] },
    name: { type: String, required: true }
  },
  data: () => ({
    previousIndex: "1",
    activeLink: false
  }),
  methods: {
    onCreateForm() {
      if (this.name === "create") {
        const activeTemplate = localStorage.formBuilderActiveTemplate ? JSON.parse(localStorage.formBuilderActiveTemplate) : null;
        if (activeTemplate && activeTemplate.action && activeTemplate.action.startsWith("edit")) {
          this.$router.go();
        }
      }
    }
  }
};
const _hoisted_1$h = { key: 0 };
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.visible ? (openBlock(), createElementBlock("div", _hoisted_1$h, [
    $props.menuItems.length ? (openBlock(true), createElementBlock(
      Fragment,
      { key: 0 },
      renderList($props.menuItems, (item) => {
        return openBlock(), createBlock(VListItem, {
          key: item.path,
          name: item.name,
          link: $props.link,
          to: item.path,
          active: item.path === _ctx.$route.fullPath
        }, {
          prepend: withCtx(() => [
            createVNode(VIcon, {
              icon: item.icon,
              color: "primary"
            }, null, 8, ["icon"])
          ]),
          default: withCtx(() => [
            createVNode(
              VListItemTitle,
              null,
              {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(item.label),
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
        }, 1032, ["name", "link", "to", "active"]);
      }),
      128
      /* KEYED_FRAGMENT */
    )) : (openBlock(), createBlock(VListItem, {
      key: 1,
      link: $props.link,
      to: $props.path,
      onClick: _cache[0] || (_cache[0] = ($event) => $options.onCreateForm())
    }, {
      prepend: withCtx(() => [
        createVNode(VIcon, {
          icon: $props.icon,
          color: "primary"
        }, null, 8, ["icon"])
      ]),
      default: withCtx(() => [
        createVNode(VListItemTitle, null, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($props.label),
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
    }, 8, ["link", "to"]))
  ])) : createCommentVNode("v-if", true);
}
const NavMainItem = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/nav/NavMainItem.vue"]]);
const _sfc_main$q = {
  name: "Navigation",
  components: {
    NavMainItem
  },
  props: {
    title: { type: String, default: "" },
    memberFormAssignType: { type: String, default: "" },
    items: { type: Array, required: true }
  },
  data: () => ({
    menuList: [],
    rail: false
  }),
  watch: {
    memberFormAssignType() {
      this.refreshItems();
    }
  },
  mounted() {
    this.refreshItems();
  },
  methods: {
    refreshItems() {
      this.menuList = [];
      this.items.forEach((i) => {
        const item = JSON.parse(JSON.stringify(i));
        if (item.name === "dues-mapping") {
          const memberType = this.memberFormAssignType ? JSON.parse(this.memberFormAssignType) : [];
          const allowedTypes = ["1", "2", "6", "100"];
          if (allowedTypes.some((r) => memberType.includes(r))) {
            this.menuList.push(item);
          }
        } else {
          this.menuList.push(item);
        }
      });
    }
  }
};
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NavMainItem = resolveComponent("NavMainItem");
  return openBlock(), createBlock(VNavigationDrawer, {
    rail: _ctx.rail,
    permanent: "",
    class: "nav-drawer"
  }, {
    default: withCtx(() => [
      createVNode(VList, {
        nav: "",
        density: "compact"
      }, {
        default: withCtx(() => [
          createVNode(VListItem, {
            id: "leftNavTitle",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.rail = !_ctx.rail),
            title: "Menu",
            "prepend-icon": _ctx.rail ? "mdi:mdi-arrow-expand-right" : "mdi:mdi-arrow-collapse-left"
          }, null, 8, ["prepend-icon"]),
          $props.title ? (openBlock(), createBlock(VDivider, { key: 0 })) : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.menuList, (item) => {
              return openBlock(), createBlock(_component_NavMainItem, {
                key: item.path,
                path: item.name === "create" ? item.path + "?nav=true" : item.path,
                label: item.meta.label,
                icon: item.meta.icon,
                visible: item.meta.visible,
                "menu-items": item.menuItems,
                name: item.name,
                link: ""
              }, null, 8, ["path", "label", "icon", "visible", "menu-items", "name"]);
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
  }, 8, ["rail"]);
}
const Navigation = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/nav/Navigation.vue"]]);
const logoAft = "/build/assets/mfp-logo-small-CgUsZ1ni.png";
const _sfc_main$p = {
  name: "PrivateApp",
  components: {
    Navigation,
    FooterComponent
  },
  data: () => ({
    mainDrawer: true,
    selectedAffiliateId: null,
    affiliates: [],
    affiliatesSearchText: null,
    affiliatesSearchLoading: false,
    dialog: false,
    isShow: false,
    memberFormAssignType: null,
    logoAft
  }),
  computed: {
    affiliateText() {
      if (this.selectedAffiliate) {
        return `${this.selectedAffiliate.AffiliateNumber} - ${this.selectedAffiliate.AffiliateName}`;
      }
      return "Selected Affiliate";
    },
    selectedAffiliate() {
      const affiliate = this.$store.getters["user/selectedAffiliate"];
      console.log({ affiliate });
      return affiliate;
    }
  },
  watch: {
    affiliatesSearchText(text) {
      this.debounceInput(text);
    }
  },
  beforeMount() {
    this.selectedAffiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
    this.getMemberFormAssignType();
  },
  mounted() {
    if (this.affiliates.length === 0 && this.selectedAffiliate) {
      this.affiliates.push({
        AffiliateId: this.selectedAffiliate.AffiliateId,
        AffiliateName: this.selectedAffiliate.AffiliateName,
        AffiliateNumber: this.selectedAffiliate.AffiliateNumber
      });
    }
  },
  created() {
    this.debounceInput = debounce(function(search) {
      if (this.selectedAffiliate && search === this.selectedAffiliate.AffiliateName) {
        return;
      }
      this.affiliatesSearchLoading = true;
      api$1.loadDefaultAffiliates({
        search
      }).then((response) => {
        this.affiliates = response.data.data;
        if (response.data.meta.last_page > 1) {
          this.affiliates.push({ AffiliateName: '<strong style="color:#092a5c;">Click to see all affiliates here >></strong>', AffiliateNumber: "", AffiliateId: -1 });
        }
        this.affiliatesSearchLoading = false;
      });
    }, 500);
  },
  methods: {
    logout() {
      document.getElementById("logout-form2").submit();
    },
    selectAffiliate(affiliateId) {
      if (affiliateId > 0) {
        this.selectedAffiliateId = affiliateId;
        if (this.isFormWorkInProgress()) {
          this.dialog = true;
        } else {
          this.setSelectedAffiliate();
        }
      } else {
        this.$nextTick(() => {
          this.selectedAffiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
        });
      }
    },
    setSelectedAffiliate() {
      this.dialog = false;
      localStorage.mfpAffiliateId = this.selectedAffiliateId;
      localStorage.formBuilderActiveTemplate = JSON.stringify({});
      this.$store.dispatch("user/setUserSelectedEntity", this.selectedAffiliateId).then(() => {
        if (window.location.href.endsWith("edit")) {
          this.$router.push({ path: "manage" });
        } else {
          window.location.reload();
        }
      });
    },
    cancelSelectedAffiliate() {
      this.dialog = false;
      this.selectedAffiliateId = localStorage.mfpAffiliateId;
      window.location.reload();
    },
    loadDefaultAffiliates() {
      const affiliateName = this.selectedAffiliate.AffiliateName;
      if (this.affiliates.length === 1 && this.affiliates.pop().AffiliateName === affiliateName) {
        api$1.loadDefaultAffiliates({
          search: ""
        }).then((response) => {
          if (this.affiliates.indexOf((affiliate) => affiliate.AffiliateName === affiliateName) !== -1) {
            this.affiliates = [];
          }
          this.affiliates = this.affiliates.concat(response.data.data);
          if (response.data.meta.last_page > 1) {
            this.affiliates.push({ AffiliateName: '<strong style="color:#092a5c;">Click to see all affiliates here >></strong>', AffiliateNumber: "", AffiliateId: -1 });
          }
        });
      }
    },
    getMemberFormAssignType() {
      this.loading = true;
      this.affiliateId = this.selectedAffiliate ? this.selectedAffiliate.AffiliateId : null;
      api$1.getMemberFormAssign(this.affiliateId).then((response) => {
        const memberFormAssign = response.data;
        if (memberFormAssign) {
          this.memberFormAssignType = memberFormAssign.type;
          console.log(this.memberFormAssignType);
        }
        this.loading = false;
      });
    },
    // searchAffiliates(item, queryText) {
    //     const searchText = queryText.toLowerCase();
    //     const nameIndex = item.AffiliateName.toLowerCase().indexOf(searchText);
    //     const numberIndex = item.AffiliateNumber.toLowerCase().indexOf(searchText);
    //     return item.AffiliateId < 0 || nameIndex > -1 || numberIndex > -1;
    // },
    searchAffiliates(itemTitle, queryText, item) {
      const searchText = queryText.toLowerCase();
      const id = item.raw.AffiliateId;
      if (id < 0) {
        return true;
      }
      const title = itemTitle.toLowerCase();
      const number = item.raw.AffiliateNumber.toLowerCase();
      return title.indexOf(searchText) > -1 || number.indexOf(searchText) > -1;
    },
    getAffiliateLabel(item) {
      return `${item.raw.AffiliateName}${item.raw.AffiliateId > 0 ? ` (${item.raw.AffiliateNumber})` : ""}`;
    },
    isFormWorkInProgress() {
      const url = new URL(window.location.href);
      const isExpectedFormRoute = url.pathname.endsWith("create") || url.pathname.endsWith("edit");
      const localStorageActiveTemplate = localStorage.formBuilderActiveTemplate ? JSON.parse(localStorage.formBuilderActiveTemplate) : null;
      return isExpectedFormRoute && localStorageActiveTemplate && localStorageActiveTemplate.step > 1;
    }
  }
};
const _hoisted_1$g = { class: "logo-mobile mt-3" };
const _hoisted_2$d = ["src"];
const _hoisted_3$a = { class: "mobileHeaderWrapper d-flex flex-grow-1 px-4" };
const _hoisted_4$9 = ["src"];
const _hoisted_5$7 = ["loader"];
const _hoisted_6$5 = { class: "header-btns" };
const _hoisted_7$5 = { class: "mobile-nav-btns" };
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_Navigation = resolveComponent("Navigation");
  const _component_router_view = resolveComponent("router-view");
  const _component_FooterComponent = resolveComponent("FooterComponent");
  return openBlock(), createBlock(VApp, { id: "memberforms" }, {
    default: withCtx(() => [
      createVNode(VAppBar, {
        color: "#092a5c",
        class: "mobileHeaderContainer"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$g, [
            createVNode(_component_router_link, {
              to: "/",
              class: "navbar-brand"
            }, {
              default: withCtx(() => [
                createBaseVNode("img", {
                  src: _ctx.logoAft,
                  style: { "max-height": "42px" }
                }, null, 8, _hoisted_2$d)
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          createVNode(VBtn, {
            class: "click-me",
            color: "white",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.isShow = !_ctx.isShow),
            icon: "mdi:mdi-tune-variant"
          }),
          withDirectives(createBaseVNode(
            "div",
            _hoisted_3$a,
            [
              createVNode(_component_router_link, {
                to: "/",
                class: "navbar-brand"
              }, {
                default: withCtx(() => [
                  createBaseVNode("img", {
                    src: _ctx.logoAft,
                    style: { "max-height": "42px" }
                  }, null, 8, _hoisted_4$9)
                ]),
                _: 1
                /* STABLE */
              }),
              createCommentVNode(" <v-toolbar-title>\n                    Membership Forms {{ $route.meta.label }}\n                </v-toolbar-title> "),
              createVNode(VSpacer),
              createVNode(VAutocomplete, {
                modelValue: _ctx.selectedAffiliateId,
                "onUpdate:modelValue": [
                  _cache[1] || (_cache[1] = ($event) => _ctx.selectedAffiliateId = $event),
                  $options.selectAffiliate
                ],
                search: _ctx.affiliatesSearchText,
                "onUpdate:search": _cache[2] || (_cache[2] = ($event) => _ctx.affiliatesSearchText = $event),
                label: "Selected Affiliate",
                variant: "underlined",
                items: _ctx.affiliates,
                customFilter: $options.searchAffiliates,
                loading: _ctx.affiliatesSearchLoading,
                "item-title": "AffiliateName",
                "item-value": "AffiliateId",
                placeholder: $options.affiliateText,
                "hide-no-data": "",
                class: "selectAffiliate",
                onClick: $options.loadDefaultAffiliates
              }, {
                item: withCtx(({ props, item }) => [
                  createVNode(VListItem, mergeProps(props, {
                    title: $options.getAffiliateLabel(item)
                  }), null, 16, ["title"])
                ]),
                default: withCtx(() => [
                  createBaseVNode("template", {
                    loader: { affiliatesSearchLoading: _ctx.affiliatesSearchLoading }
                  }, [
                    createVNode(VProgressLinear, {
                      indeterminate: "",
                      height: "5",
                      color: "#3f98c9",
                      absolute: ""
                    })
                  ], 8, _hoisted_5$7)
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue", "search", "items", "customFilter", "loading", "placeholder", "onUpdate:modelValue", "onClick"]),
              createBaseVNode("div", _hoisted_6$5, [
                createVNode(VMenu, null, {
                  activator: withCtx(({ props }) => [
                    createVNode(
                      VBtn,
                      mergeProps({
                        size: "small",
                        class: "menu-icons",
                        icon: "mdi:mdi-backburger"
                      }, props),
                      null,
                      16
                      /* FULL_PROPS */
                    )
                  ]),
                  default: withCtx(() => [
                    createVNode(VList, { class: "mfp-member-nav" }, {
                      default: withCtx(() => [
                        createVNode(VListItem, null, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => _cache[8] || (_cache[8] = [
                                createBaseVNode(
                                  "a",
                                  { href: "/" },
                                  " Back to Connect ",
                                  -1
                                  /* HOISTED */
                                )
                              ])),
                              _: 1
                              /* STABLE */
                            })
                          ]),
                          _: 1
                          /* STABLE */
                        }),
                        createVNode(VListItem, {
                          onClick: _cache[3] || (_cache[3] = ($event) => $options.logout())
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => _cache[9] || (_cache[9] = [
                                createBaseVNode(
                                  "span",
                                  null,
                                  " Logout ",
                                  -1
                                  /* HOISTED */
                                )
                              ])),
                              _: 1
                              /* STABLE */
                            }),
                            _cache[10] || (_cache[10] = createBaseVNode(
                              "form",
                              {
                                id: "logout-form2",
                                action: "/logout",
                                method: "POST",
                                class: "d-none"
                              },
                              " @csrf ",
                              -1
                              /* HOISTED */
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
                }),
                createBaseVNode("div", _hoisted_7$5, [
                  createVNode(VBtn, {
                    href: "/",
                    class: "mr-6"
                  }, {
                    default: withCtx(() => _cache[11] || (_cache[11] = [
                      createTextVNode(" Back to Connect ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    class: "mr-6",
                    onClick: _cache[4] || (_cache[4] = ($event) => $options.logout())
                  }, {
                    default: withCtx(() => _cache[12] || (_cache[12] = [
                      createTextVNode(" Logout ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  _cache[13] || (_cache[13] = createBaseVNode(
                    "form",
                    {
                      id: "logout-form2",
                      action: "/logout",
                      method: "POST",
                      class: "d-none"
                    },
                    " @csrf ",
                    -1
                    /* HOISTED */
                  ))
                ])
              ])
            ],
            512
            /* NEED_PATCH */
          ), [
            [vShow, _ctx.isShow]
          ])
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VMain, { class: "main-content" }, {
        default: withCtx(() => [
          createVNode(_component_Navigation, {
            title: "Menu",
            shown: _ctx.mainDrawer,
            items: _ctx.$router.options.routes,
            "member-form-assign-type": _ctx.memberFormAssignType
          }, null, 8, ["shown", "items", "member-form-assign-type"]),
          createVNode(VDivider, {
            vertical: "",
            class: "main-divider"
          }),
          createVNode(_component_router_view)
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_FooterComponent),
      createVNode(VDialog, {
        modelValue: _ctx.dialog,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.dialog = $event),
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[14] || (_cache[14] = [
                  createTextVNode(" Changing Affiliate? ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[15] || (_cache[15] = [
                  createTextVNode(" By selecting this affiliate you will lose any changes made to an existing form. Are you sure? ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: _cache[5] || (_cache[5] = ($event) => $options.cancelSelectedAffiliate())
                  }, {
                    default: withCtx(() => _cache[16] || (_cache[16] = [
                      createTextVNode(" Cancel ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: _cache[6] || (_cache[6] = ($event) => $options.setSelectedAffiliate())
                  }, {
                    default: withCtx(() => _cache[17] || (_cache[17] = [
                      createTextVNode(" Ok ")
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
    ]),
    _: 1
    /* STABLE */
  });
}
const PrivateApp = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-e5f06451"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/PrivateApp.vue"]]);
const _sfc_main$o = {
  name: "DebugInfo",
  data: () => ({
    items: []
  }),
  created() {
    axios.get("/api/v3/memberforms/admin/debug/get-debug-info").then((response) => {
      console.log(response.data);
      const { data } = response;
      console.log(data.environment);
      if (data.environment) {
        const devExpected = {
          name: "Dev (for reference)",
          environment: "local",
          appPath: "/var/www/connect/app",
          basePath: "/var/www/connect",
          publicPath: "/var/www/connect/public",
          storagePath: "/var/www/connect/storage"
        };
        this.items.push(devExpected);
        this.items.push(data);
      }
    });
  }
};
const _hoisted_1$f = { class: "align-end" };
const _hoisted_2$c = { class: "align-end" };
const _hoisted_3$9 = { class: "align-end" };
const _hoisted_4$8 = { class: "align-end" };
const _hoisted_5$6 = { class: "align-end" };
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VDataIterator, {
                items: _ctx.items,
                "items-per-page": 2
              }, {
                default: withCtx((props) => [
                  createVNode(
                    VRow,
                    null,
                    {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(props.items, (item) => {
                            return openBlock(), createBlock(
                              VCol,
                              {
                                key: item.name,
                                cols: "12",
                                sm: "6",
                                md: "4",
                                lg: "3"
                              },
                              {
                                default: withCtx(() => [
                                  createVNode(
                                    VCard,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(
                                          VCardTitle,
                                          { class: "subheading font-weight-bold" },
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                toDisplayString(item.name),
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
                                        createVNode(
                                          VList,
                                          { density: "compact" },
                                          {
                                            default: withCtx(() => [
                                              createVNode(
                                                VListItem,
                                                null,
                                                {
                                                  default: withCtx(() => [
                                                    _cache[0] || (_cache[0] = createTextVNode(" Environment: ")),
                                                    createBaseVNode(
                                                      "span",
                                                      _hoisted_1$f,
                                                      toDisplayString(item.environment),
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
                                                VListItem,
                                                null,
                                                {
                                                  default: withCtx(() => [
                                                    _cache[1] || (_cache[1] = createTextVNode(" Base path: ")),
                                                    createBaseVNode(
                                                      "span",
                                                      _hoisted_2$c,
                                                      toDisplayString(item.basePath),
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
                                                VListItem,
                                                null,
                                                {
                                                  default: withCtx(() => [
                                                    _cache[2] || (_cache[2] = createTextVNode(" App path: ")),
                                                    createBaseVNode(
                                                      "span",
                                                      _hoisted_3$9,
                                                      toDisplayString(item.appPath),
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
                                                VListItem,
                                                null,
                                                {
                                                  default: withCtx(() => [
                                                    _cache[3] || (_cache[3] = createTextVNode(" Public path: ")),
                                                    createBaseVNode(
                                                      "span",
                                                      _hoisted_4$8,
                                                      toDisplayString(item.publicPath),
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
                                                VListItem,
                                                null,
                                                {
                                                  default: withCtx(() => [
                                                    _cache[4] || (_cache[4] = createTextVNode(" Storage path: ")),
                                                    createBaseVNode(
                                                      "span",
                                                      _hoisted_5$6,
                                                      toDisplayString(item.storagePath),
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
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["items"])
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
const DebugInfo = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/DebugInfo.vue"]]);
const _sfc_main$n = {
  name: "FormBuilderTemplate",
  emits: ["update:modelValue"],
  props: {
    id: { type: Number, required: true },
    label: { type: String, required: true },
    description: { type: String, default: "" },
    modelValue: { type: Object }
  }
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VCard, { class: "flex d-flex flex-column" }, {
    default: withCtx(() => [
      createVNode(VCardTitle, null, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($props.label),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VCardText, { class: "flex" }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($props.description),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VCardActions, { class: "templateButton" }, {
        default: withCtx(() => [
          createVNode(VBtn, {
            variant: "elevated",
            color: "primary",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", { id: $props.id, description: $props.description }))
          }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createTextVNode(" Select ")
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
const FormBuilderTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormBuilderTemplate.vue"]]);
const _sfc_main$m = {
  name: "FormBuilderTemplateChooser",
  options: {
    label: "Choose a Template"
  },
  components: { FormBuilderTemplate },
  props: {
    store: { type: Object, required: true }
  },
  emits: ["next", "reset", "save"],
  data: () => ({
    loading: false,
    templates: [],
    templateSelectedId: ""
  }),
  watch: {
    templateSelectedId: function({ id }) {
      const url = new URL(window.location.href);
      if (url.pathname.endsWith("create")) {
        this.$emit("save", { key: "action", value: "create" });
      }
      this.$emit("save", { key: "templateId", value: id });
      this.$emit("next");
    }
  },
  created() {
    this.loading = true;
    this.$emit("reset");
    this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
    api$1.templateList(this.affiliateId).then((response) => {
      this.templates = chunk(response.data, 3);
      this.loading = false;
    });
  }
};
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormBuilderTemplate = resolveComponent("FormBuilderTemplate");
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      _ctx.templates.length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createBaseVNode(
                "h2",
                null,
                "Select a Form Template",
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : (openBlock(), createBlock(VRow, { key: 1 }, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[2] || (_cache[2] = [
              createBaseVNode(
                "h2",
                null,
                "No templates found",
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })),
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.templates, (templateChunk, index2) => {
          return openBlock(), createBlock(
            VRow,
            {
              key: index2,
              class: "temp-row"
            },
            {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(templateChunk, (template) => {
                    return openBlock(), createBlock(
                      VCol,
                      {
                        key: template.id,
                        class: "d-flex flex-column"
                      },
                      {
                        default: withCtx(() => [
                          createVNode(_component_FormBuilderTemplate, {
                            id: template.id,
                            modelValue: _ctx.templateSelectedId,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.templateSelectedId = $event),
                            label: template.display_name,
                            description: template.description
                          }, null, 8, ["id", "modelValue", "label", "description"])
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
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const FormBuilderTemplateChooser = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-540aff1c"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormBuilderTemplateChooser.vue"]]);
const _sfc_main$l = {
  name: "FormSearchSelector",
  props: {
    itemValue: { type: String, default: "" },
    itemTitle: { type: [String, Function], default: "" },
    searchType: { type: String, required: true },
    searchArgs: { type: Object, default: () => ({}) },
    label: { type: String, default: "Combobox" },
    rules: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false },
    modelValue: { type: Number, default: null }
  },
  emits: ["update:modelValue"],
  data: () => ({
    loading: false,
    selected: null,
    searchText: null,
    items: []
  }),
  computed: {
    entries() {
      return this.items.map((item) => {
        let name = "";
        switch (typeof this.itemTitle) {
          case "string":
            name = item[this.itemTitle];
            break;
          case "function":
            name = this.itemTitle(item);
            break;
          default:
            name = "";
            break;
        }
        return { ...item, name };
      });
    }
  },
  watch: {
    disabled() {
      if (!this.disabled) {
        this.search();
      }
    },
    searchText() {
      this.search();
    }
  },
  created() {
    this.search = debounce(() => {
      this.doSearch();
    }, 500);
    if (this.modelValue) {
      this.loading = true;
      if (Array.isArray(this.modelValue)) {
        api$1.search(this.searchType, this.searchText, this.searchArgs).then((response) => {
          this.items = response.data;
          if (!this.selected) {
            this.selected = [];
          }
          this.modelValue.forEach((id) => {
            const singleEmployer = response.data.find((employer) => employer.EmployerId === id);
            if (singleEmployer) {
              this.selected.push(singleEmployer);
            }
          });
        }).finally(() => {
          this.loading = false;
        });
      } else {
        api$1.access(this.searchType, this.modelValue).then((response) => {
          this.items.push(response.data);
          this.selected = this.entries[0];
          this.searchText = this.entries[0].name;
        }).finally(() => {
          this.loading = false;
        });
      }
    } else {
      this.search();
    }
  },
  methods: {
    reset() {
      this.selected = null;
      this.searchText = null;
      this.items = [];
      this.doSearch();
    },
    doSearch() {
      var _a;
      if (this.disabled) {
        return;
      }
      if (this.searchText === ((_a = this.selected) == null ? void 0 : _a.name)) {
        return;
      }
      this.loading = true;
      api$1.search(this.searchType, this.searchText, this.searchArgs).then((response) => {
        this.items = response.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    handleSelected() {
      this.$emit("update:modelValue", this.selected);
    }
  }
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VAutocomplete, {
    modelValue: _ctx.selected,
    "onUpdate:modelValue": [
      _cache[0] || (_cache[0] = ($event) => _ctx.selected = $event),
      $options.handleSelected
    ],
    search: _ctx.searchText,
    "onUpdate:search": _cache[1] || (_cache[1] = ($event) => _ctx.searchText = $event),
    label: $props.label,
    rules: $props.rules,
    items: $options.entries,
    multiple: $props.multiple,
    loading: _ctx.loading,
    "menu-props": { attach: true },
    "item-title": "name",
    "item-value": $props.itemValue,
    disabled: $props.disabled,
    clearable: $props.clearable,
    variant: "outlined"
  }, null, 8, ["modelValue", "search", "onUpdate:modelValue", "label", "rules", "items", "multiple", "loading", "item-value", "disabled", "clearable"]);
}
const FormSearchSelector = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/FormSearchSelector.vue"]]);
const _sfc_main$k = {
  name: "FormSearchSelectAll",
  props: {
    itemValue: { type: String, default: "" },
    itemTitle: { type: [String, Function], default: "" },
    searchType: { type: String, required: true },
    searchArgs: { type: Object, default: () => ({}) },
    label: { type: String, default: "Combobox" },
    outlined: { type: Boolean, default: false },
    rules: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false },
    modelValue: { type: Array, default: [] }
  },
  emits: ["update:modelValue"],
  data: () => ({
    loading: false,
    selected: [],
    searchText: null,
    items: []
  }),
  computed: {
    entries() {
      return this.items.map((item) => {
        let name = "";
        switch (typeof this.itemTitle) {
          case "string":
            name = item[this.itemTitle];
            break;
          case "function":
            name = this.itemTitle(item);
            break;
          default:
            name = "";
            break;
        }
        return { ...item, name };
      });
    }
  },
  watch: {
    disabled() {
      if (!this.disabled) {
        this.search();
      }
    },
    searchText() {
      this.search();
    },
    searchArgs() {
      this.search();
    }
  },
  created() {
    this.search = debounce(() => {
      this.doSearch();
    }, 500);
    if (this.modelValue) {
      this.loading = true;
      if (Array.isArray(this.modelValue)) {
        api$1.search(this.searchType, this.searchText, this.searchArgs).then((response) => {
          this.items = response.data;
          if (!this.selected) {
            this.selected = [];
          }
          this.modelValue.forEach((id) => {
            const singleLocal = response.data.find((local) => local.AffiliateId === id);
            if (singleLocal) {
              this.selected.push(singleLocal[this.itemValue]);
            } else {
              const singleEmployer = response.data.find((employer) => employer.EmployerId === id);
              if (singleEmployer) {
                this.selected.push(singleEmployer[this.itemValue]);
              }
            }
          });
        }).finally(() => {
          this.loading = false;
        });
      } else {
        api$1.access(this.searchType, this.modelValue).then((response) => {
          this.items.push(response.data);
          this.selected = this.entries[0];
          this.searchText = this.entries[0].name;
        }).finally(() => {
          this.loading = false;
        });
      }
    } else {
      this.search();
    }
  },
  methods: {
    reset() {
      this.selected = null;
      this.searchText = null;
      this.items = [];
      this.doSearch();
    },
    doSearch() {
      var _a;
      if (this.disabled) {
        return;
      }
      if (this.searchText === ((_a = this.selected) == null ? void 0 : _a.name)) {
        return;
      }
      this.loading = true;
      api$1.search(this.searchType, this.searchText, this.searchArgs).then((response) => {
        this.items = response.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    selectAll() {
      this.selected = this.items.map((item) => item[this.itemValue]);
    },
    deselectAll() {
      this.selected = [];
    },
    handleSelected() {
      this.$emit("update:modelValue", this.selected);
    }
  }
};
const _hoisted_1$e = { class: "ml-2 d-flex ga-2" };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VAutocomplete, {
    modelValue: _ctx.selected,
    "onUpdate:modelValue": [
      _cache[0] || (_cache[0] = ($event) => _ctx.selected = $event),
      $options.handleSelected
    ],
    search: _ctx.searchText,
    "onUpdate:search": _cache[1] || (_cache[1] = ($event) => _ctx.searchText = $event),
    items: $options.entries,
    loading: _ctx.loading,
    label: $props.label,
    variant: "outlined",
    rules: $props.rules,
    "item-title": "name",
    "item-value": $props.itemValue,
    disabled: $props.disabled,
    clearable: $props.clearable,
    multiple: $props.multiple
  }, {
    "prepend-item": withCtx(() => [
      createBaseVNode("div", _hoisted_1$e, [
        createVNode(VBtn, {
          variant: "tonal",
          elevation: "2",
          onClick: $options.selectAll
        }, {
          default: withCtx(() => _cache[2] || (_cache[2] = [
            createTextVNode(" Select All ")
          ])),
          _: 1
          /* STABLE */
        }, 8, ["onClick"]),
        createVNode(VBtn, {
          variant: "tonal",
          elevation: "2",
          onClick: $options.deselectAll
        }, {
          default: withCtx(() => _cache[3] || (_cache[3] = [
            createTextVNode(" Deselect All ")
          ])),
          _: 1
          /* STABLE */
        }, 8, ["onClick"])
      ]),
      createVNode(VDivider, { class: "mt-2" })
    ]),
    _: 1
    /* STABLE */
  }, 8, ["modelValue", "search", "items", "loading", "label", "rules", "item-value", "disabled", "clearable", "onUpdate:modelValue", "multiple"]);
}
const FormSearchSelectAll = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/FormSearchSelectAll.vue"]]);
const _sfc_main$j = {
  name: "FormBuilderSettings",
  components: {
    MfpTextField,
    MfpTextAreaField,
    FormSearchSelector,
    FormSearchSelectAll
  },
  emits: ["next", "prev", "save"],
  options: {
    label: "Form Settings"
  },
  props: {
    store: { type: Object, required: true }
  },
  data: () => ({
    loading: false,
    formName: null,
    formTitle: null,
    formDescription: "",
    formShowInDirectory: false,
    formShowAftLogo: true,
    formShowLocalLogo: false,
    formShowFedLogo: false,
    formLogoType: 0,
    affiliateId: null,
    localId: null,
    affiliateLogoData: {},
    chapterId: null,
    employerId: null,
    unitId: null,
    localJobClassId: null,
    jobTitleId: null,
    formNameField: {
      label: "Form Name",
      required: true,
      tooltip: true,
      toolText: "Form name for internal use only (local admin)"
    },
    formTitleField: {
      label: "Form Title",
      required: true,
      tooltip: true,
      toolText: "Membership form title displayed on the form viewed by the member"
    },
    formDescriptionField: {
      label: "Form Header Text",
      required: false
    },
    actions: api$1.getFormActions(),
    isEdit: false,
    isClone: false,
    rules: {
      required: (value) => !!value || "Required."
    },
    bhBillingTypes: [],
    selectedBHBillingType: null
  }),
  watch: {
    formName() {
      if (this.store.formName !== this.formName) {
        this.$emit("save", { key: "formName", value: this.formName });
      }
    },
    formTitle() {
      if (this.store.formTitle !== this.formTitle) {
        this.$emit("save", { key: "formTitle", value: this.formTitle });
      }
    },
    formShowAftLogo() {
      this.$emit("save", { key: "formShowAftLogo", value: this.formShowAftLogo });
    },
    formShowLocalLogo() {
      this.$emit("save", { key: "formShowLocalLogo", value: this.formShowLocalLogo });
    },
    formShowFedLogo() {
      this.$emit("save", { key: "formShowFedLogo", value: this.formShowFedLogo });
    },
    formLogoType() {
      this.$emit("save", { key: "formLogoType", value: this.formLogoType });
    },
    formDescription() {
      if (this.store.formDescription !== this.formDescription) {
        this.$emit("save", { key: "formDescription", value: this.formDescription });
      }
    },
    formShowInDirectory() {
      if (this.store.formShowInDirectory !== this.formShowInDirectory) {
        this.$emit("save", { key: "formShowInDirectory", value: this.formShowInDirectory });
      }
    },
    selectedBHBillingType() {
      if (this.selectedBHBillingType && this.selectedBHBillingType.BillingTypeID && this.store.billHighwayBillingTypeId !== this.selectedBHBillingType.BillingTypeID) {
        this.$emit("save", { key: "billHighwayBillingTypeId", value: this.selectedBHBillingType.BillingTypeID });
      }
    },
    affiliateId() {
      if (this.store.affiliateId !== this.affiliateId) {
        this.$emit("save", { key: "affiliateId", value: this.affiliateId });
        this.$nextTick(() => {
          this.chapterId = null;
          this.employerId = null;
          this.unitId = null;
          this.localJobClassId = null;
          this.jobTitleId = null;
          this.localId = null;
          this.$refs.chapterSelector.reset();
          this.$refs.employerSelector.reset();
        });
      }
    },
    chapterId() {
      if (this.store.chapterId !== this.chapterId) {
        this.$emit("save", { key: "chapterId", value: this.chapterId });
        this.$nextTick(() => {
          this.employerId = null;
          this.$refs.employerSelector.reset();
        });
      }
    },
    employerId() {
      if (this.store.employerId !== this.employerId) {
        this.$emit("save", { key: "employerId", value: this.employerId });
        this.$nextTick(() => {
          this.unitId = null;
          if (this.employerId == null || this.employerId.length <= 1) {
            this.$refs.unitSelector.reset();
          }
        });
      }
    },
    unitId() {
      if (this.store.unitId !== this.unitId) {
        this.$emit("save", { key: "unitId", value: this.unitId });
      }
    },
    localJobClassId() {
      if (this.store.localJobClassId !== this.localJobClassId) {
        this.$emit("save", { key: "localJobClassId", value: this.localJobClassId });
      }
    },
    jobTitleId() {
      if (this.store.jobTitleId !== this.jobTitleId) {
        this.$emit("save", { key: "jobTitleId", value: this.jobTitleId });
      }
    },
    localId() {
      if (this.store.localId !== this.localId) {
        this.$emit("save", { key: "localId", value: this.localId });
      }
    }
  },
  created() {
    this.isEdit = this.store.action && this.store.action === this.actions.edit;
    this.isClone = this.store.action && this.store.action === this.actions.clone;
    this.formName = this.store.formName || null;
    this.formTitle = this.store.formTitle || null;
    this.formDescription = this.store.formDescription || "";
    this.formShowInDirectory = this.store.formShowInDirectory || false;
    if (this.store.action === this.actions.create) {
      this.formShowAftLogo = true;
    } else {
      this.formShowAftLogo = this.store.formShowAftLogo || false;
    }
    this.formShowLocalLogo = this.store.formShowLocalLogo || false;
    this.formShowFedLogo = this.store.formShowFedLogo || false;
    this.formLogoType = this.store.formLogoType || 0;
    this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
    this.getAffiliateLogo();
    if (this.store.affiliateId !== this.affiliateId) {
      this.$nextTick(() => {
        this.chapterId = null;
        this.employerId = null;
        this.unitId = null;
        this.localJobClassId = null;
        this.jobTitleId = null;
        this.localId = null;
        this.$refs.chapterSelector.reset();
        this.$refs.employerSelector.reset();
        this.$refs.unitSelector.reset();
      });
    } else {
      this.chapterId = this.store.chapterId || null;
      this.employerId = this.store.employerId || null;
      this.unitId = this.store.unitId || null;
      this.localJobClassId = this.store.localJobClassId || null;
      this.jobTitleId = this.store.jobTitleId || null;
      this.localId = this.store.localId || null;
    }
    if (this.isCopeOnlyTemplate() || this.isStateFedTemplate()) {
      this.getBHBillingTypes();
    }
  },
  mounted() {
    this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
  },
  methods: {
    isCopeOnlyTemplate() {
      return parseInt(this.store.templateId, 10) === 6;
    },
    isStateFedTemplate() {
      return parseInt(this.store.templateId, 10) === 8;
    },
    isRetireeCopeTemplate() {
      return parseInt(this.store.templateId, 10) === 9;
    },
    changeLogoType(event) {
      this.formLogoType = parseInt(event.id, 10);
    },
    getAffiliateLogo() {
      api$1.access("affiliate", this.affiliateId).then((response) => {
        this.affiliateLogoData = response.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    getBHBillingTypes() {
      api$1.getBillHighwayBillingTypes(this.affiliateId).then((response) => {
        this.bhBillingTypes = response.data;
        if (this.store.billHighwayBillingTypeId) {
          this.selectedBHBillingType = this.bhBillingTypes.filter(
            (billingType) => billingType.BillingTypeID === this.store.billHighwayBillingTypeId
          )[0];
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    doPrev() {
      if (this.isClone || this.isEdit) {
        this.$router.push({ path: "manage" });
      } else {
        this.$emit("prev");
      }
    },
    async doNext() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$emit("next");
      }
    }
  }
};
const _hoisted_1$d = { key: 0 };
const _hoisted_2$b = { key: 1 };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MfpTextField = resolveComponent("MfpTextField");
  const _component_MfpTextAreaField = resolveComponent("MfpTextAreaField");
  const _component_FormSearchSelector = resolveComponent("FormSearchSelector");
  const _component_FormSearchSelectAll = resolveComponent("FormSearchSelectAll");
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[15] || (_cache[15] = [
              createBaseVNode(
                "h2",
                null,
                "Form Settings",
                -1
                /* HOISTED */
              )
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
              createVNode(VForm, {
                ref: "form",
                modelValue: _ctx.valid,
                "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.valid = $event)
              }, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { class: "formHeaderSettings" }, {
                            default: withCtx(() => [
                              createVNode(_component_MfpTextField, {
                                modelValue: _ctx.formName,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.formName = $event),
                                field: _ctx.formNameField,
                                rules: [_ctx.rules.required],
                                designer: true,
                                max: 255
                              }, null, 8, ["modelValue", "field", "rules"]),
                              createVNode(_component_MfpTextField, {
                                modelValue: _ctx.formTitle,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.formTitle = $event),
                                field: _ctx.formTitleField,
                                rules: [_ctx.rules.required],
                                designer: true,
                                max: 255
                              }, null, 8, ["modelValue", "field", "rules"]),
                              createVNode(VCheckbox, {
                                modelValue: _ctx.formShowAftLogo,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.formShowAftLogo = $event),
                                label: "Show AFT logo"
                              }, null, 8, ["modelValue"]),
                              _ctx.affiliateLogoData.local_logo ? (openBlock(), createBlock(VCheckbox, {
                                key: 0,
                                modelValue: _ctx.formShowLocalLogo,
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.formShowLocalLogo = $event),
                                label: "Show Local logo"
                              }, null, 8, ["modelValue"])) : createCommentVNode("v-if", true),
                              _ctx.affiliateLogoData.fed_logo ? (openBlock(), createBlock(VCheckbox, {
                                key: 1,
                                modelValue: _ctx.formShowFedLogo,
                                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.formShowFedLogo = $event),
                                label: "Show State Federation/Other logo"
                              }, null, 8, ["modelValue"])) : createCommentVNode("v-if", true),
                              createVNode(_component_MfpTextAreaField, {
                                modelValue: _ctx.formDescription,
                                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.formDescription = $event),
                                class: "formHeader",
                                field: _ctx.formDescriptionField,
                                designer: true
                              }, null, 8, ["modelValue", "field"]),
                              createCommentVNode('\n                                <v-checkbox\n                                    v-model="formShowInDirectory"\n                                    label="Show Form in Directory"\n                                />\n                                ')
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      $options.isCopeOnlyTemplate() || $options.isStateFedTemplate() ? (openBlock(), createBlock(VRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VSelect, {
                                modelValue: _ctx.selectedBHBillingType,
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.selectedBHBillingType = $event),
                                label: "Select BillHighway Billing Type",
                                items: _ctx.bhBillingTypes,
                                "item-title": "BillingTypeName",
                                "item-value": "BillingTypeID",
                                "return-object": "",
                                variant: "outlined",
                                required: ""
                              }, null, 8, ["modelValue", "items"])
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormSearchSelector, {
                                modelValue: _ctx.affiliateId,
                                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.affiliateId = $event),
                                label: "Select an Affiliate",
                                "item-title": (item) => item.AffiliateNumber + " - " + item.AffiliateName,
                                "item-value": "AffiliateId",
                                "search-type": "affiliate",
                                rules: [(v) => !!v || "Affiliate is required"],
                                clearable: !_ctx.chapterId && !_ctx.employerId && !_ctx.unitId
                              }, null, 8, ["modelValue", "item-title", "rules", "clearable"])
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      $options.isStateFedTemplate() ? (openBlock(), createBlock(VRow, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormSearchSelectAll, {
                                ref: "localSelector",
                                modelValue: _ctx.localId,
                                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.localId = $event),
                                label: "Type local name or local number or select from the dropdown list",
                                "item-title": (item) => item.AffiliateNumber + " - " + item.AffiliateName,
                                "item-value": "AffiliateId",
                                "search-type": "childAffiliate",
                                "search-args": { affiliateId: _ctx.affiliateId },
                                multiple: ""
                              }, null, 8, ["modelValue", "item-title", "search-args"])
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true),
                      !$options.isStateFedTemplate() && !$options.isRetireeCopeTemplate() ? (openBlock(), createBlock(VRow, { key: 2 }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormSearchSelector, {
                                ref: "chapterSelector",
                                modelValue: _ctx.chapterId,
                                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.chapterId = $event),
                                label: "Select a Chapter",
                                "item-title": "ChapterName",
                                "item-value": "ChapterId",
                                "search-type": "chapter",
                                "search-args": { affiliateId: _ctx.affiliateId },
                                disabled: !_ctx.affiliateId || _ctx.employerId && _ctx.employerId.length >= 1,
                                clearable: !(_ctx.employerId && _ctx.employerId.length >= 1) && !_ctx.unitId
                              }, null, 8, ["modelValue", "search-args", "disabled", "clearable"])
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true),
                      !$options.isStateFedTemplate() && !$options.isRetireeCopeTemplate() ? (openBlock(), createBlock(VRow, { key: 3 }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormSearchSelectAll, {
                                ref: "employerSelector",
                                modelValue: _ctx.employerId,
                                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.employerId = $event),
                                label: "Select an Employer",
                                "item-value": "EmployerId",
                                "search-type": "employer",
                                "search-args": { chapterId: _ctx.chapterId },
                                "item-title": "EmployerName",
                                disabled: !_ctx.chapterId || !!_ctx.unitId,
                                clearable: !_ctx.unitId,
                                multiple: ""
                              }, null, 8, ["modelValue", "search-args", "disabled", "clearable"])
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true),
                      !$options.isStateFedTemplate() && !$options.isRetireeCopeTemplate() ? (openBlock(), createBlock(VRow, { key: 4 }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormSearchSelector, {
                                ref: "unitSelector",
                                modelValue: _ctx.unitId,
                                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.unitId = $event),
                                label: "Select a Unit",
                                "item-title": "UnitName",
                                "item-value": "UnitId",
                                "search-type": "unit",
                                "search-args": { employerId: _ctx.employerId },
                                disabled: !_ctx.employerId || _ctx.employerId.length > 1,
                                clearable: ""
                              }, null, 8, ["modelValue", "search-args", "disabled"])
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true),
                      createCommentVNode(' <v-row>\n                            <v-col>\n                                <form-search-selector\n                                    ref="localJobClassSelector"\n                                    v-model="localJobClassId"\n                                    label="Local Job Class"\n                                    item-value="LocalJobClassId"\n                                    search-type="localJobClass"\n                                    :search-args="{ unitId: unitId }"\n                                    item-text="LocalJobClassName"\n                                    :disabled="!unitId"\n                                    outlined\n                                    clearable\n                                />\n                            </v-col>\n                        </v-row> '),
                      createCommentVNode(' <v-row>\n                            <v-col>\n                                <form-search-selector\n                                    ref="jobTitleSelector"\n                                    v-model="jobTitleId"\n                                    label="Job Title"\n                                    item-value="JobTitleId"\n                                    search-type="jobTitle"\n                                    :search-args="{ localJobClassId: localJobClassId }"\n                                    item-text="JobTitleName"\n                                    :disabled="!localJobClassId"\n                                    outlined\n                                    clearable\n                                />\n                            </v-col>\n                        </v-row> ')
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"])
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
              createVNode(VBtn, {
                onClick: _cache[13] || (_cache[13] = ($event) => $options.doPrev())
              }, {
                default: withCtx(() => [
                  _ctx.isClone || _ctx.isEdit ? (openBlock(), createElementBlock("span", _hoisted_1$d, " Cancel (back to Manage Forms) ")) : (openBlock(), createElementBlock("span", _hoisted_2$b, " Cancel (back to Select a Template) "))
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, { class: "Continue-Button" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#0A2A5C",
                onClick: _cache[14] || (_cache[14] = ($event) => $options.doNext())
              }, {
                default: withCtx(() => _cache[16] || (_cache[16] = [
                  createTextVNode(" Continue ")
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
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const FormBuilderSettings = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormBuilderSettings.vue"]]);
const _sfc_main$i = {
  name: "FormBuilderDuesCategories",
  options: {
    label: "Form Dues Categories"
  },
  props: {
    store: { type: Object, required: true }
  },
  emits: ["next", "prev", "save"],
  data: () => ({
    loading: false,
    valid: false,
    items: [],
    selected: [],
    selectAll: false,
    paymentProcessingDuesTemplateIds: [4, 5, 7, 9],
    isDataLoaded: false
  }),
  watch: {
    selected() {
      this.$emit("save", { key: "duesCategories", value: this.selected });
      this.valid = this.selected && this.selected.length > 0;
      if (this.selected && this.selected.length !== this.items.length) {
        this.selectAll = false;
      }
    },
    selectAll() {
      this.toggleSelectAll();
    }
  },
  created() {
    this.doListDuesCategories();
    this.selected = this.store.duesCategories || [];
  },
  mounted() {
  },
  methods: {
    isPaymentProcessingDuesTemplate() {
      return this.paymentProcessingDuesTemplateIds.includes(parseInt(this.store.templateId, 10));
    },
    doListDuesCategories() {
      this.loading = true;
      api$1.search("duescategory", "", {
        affiliateId: this.store.affiliateId,
        from: this.isPaymentProcessingDuesTemplate() ? "form" : "",
        templateId: parseInt(this.store.templateId)
      }).then((response) => {
        this.items = response.data;
        this.isDataLoaded = true;
      }).finally(() => {
        this.loading = false;
      });
    },
    doPrev() {
      this.$emit("prev");
    },
    doNext() {
      if (this.valid) {
        this.$emit("next");
      }
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selected = [];
        Object.keys(this.items).forEach((key) => {
          const item = this.items[key];
          this.selected.push(item.LocalDuesCategoryId);
        });
      } else if (this.selected && this.selected.length === this.items.length) {
        this.selected = [];
      }
    }
  }
};
const _hoisted_1$c = { key: 0 };
const _hoisted_2$a = { key: 1 };
const _hoisted_3$8 = { key: 2 };
const _hoisted_4$7 = { key: 3 };
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[4] || (_cache[4] = [
              createBaseVNode(
                "h2",
                null,
                "Select Dues Category to display on Form",
                -1
                /* HOISTED */
              )
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
              createVNode(VTable, null, {
                default: withCtx(() => [
                  createBaseVNode("thead", null, [
                    createBaseVNode("tr", null, [
                      createBaseVNode("th", null, [
                        createVNode(VCheckbox, {
                          modelValue: _ctx.selectAll,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectAll = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _cache[5] || (_cache[5] = createBaseVNode(
                        "th",
                        null,
                        "Name",
                        -1
                        /* HOISTED */
                      )),
                      _cache[6] || (_cache[6] = createBaseVNode(
                        "th",
                        null,
                        "Amount",
                        -1
                        /* HOISTED */
                      ))
                    ])
                  ]),
                  createBaseVNode("tbody", null, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(_ctx.items, (item) => {
                        return openBlock(), createElementBlock("tr", {
                          key: item.LocalDuesCategoryId
                        }, [
                          createBaseVNode("td", null, [
                            createVNode(VCheckbox, {
                              modelValue: _ctx.selected,
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.selected = $event),
                              value: item.LocalDuesCategoryId
                            }, null, 8, ["modelValue", "value"])
                          ]),
                          $options.isPaymentProcessingDuesTemplate() ? (openBlock(), createElementBlock(
                            "td",
                            _hoisted_1$c,
                            toDisplayString(item.LocalDuesCategoryName + " (" + item.InvoiceDescription + ")"),
                            1
                            /* TEXT */
                          )) : (openBlock(), createElementBlock(
                            "td",
                            _hoisted_2$a,
                            toDisplayString(item.LocalDuesCategoryName),
                            1
                            /* TEXT */
                          )),
                          item.LocalDuesAmount && item.LocalDuesPercentage ? (openBlock(), createElementBlock(
                            "td",
                            _hoisted_3$8,
                            toDisplayString("$" + item.LocalDuesAmount) + " or " + toDisplayString(item.LocalDuesPercentage + "%"),
                            1
                            /* TEXT */
                          )) : (openBlock(), createElementBlock(
                            "td",
                            _hoisted_4$7,
                            toDisplayString(item.LocalDuesAmount ? "$" + item.LocalDuesAmount : "") + " " + toDisplayString(item.LocalDuesPercentage ? item.LocalDuesPercentage + "%" : ""),
                            1
                            /* TEXT */
                          ))
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
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
      }),
      $options.isPaymentProcessingDuesTemplate() && _ctx.isDataLoaded && _ctx.items && _ctx.items.length === 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[7] || (_cache[7] = [
              createBaseVNode(
                "h4",
                { style: { "color": "red" } },
                [
                  createTextVNode(" Thank you for using the Membership Forms Portal. Prior to continuing, you must map your local dues categories (billing types) to the appropriate AFT national per capita category and/or State per capita category. "),
                  createBaseVNode("br"),
                  createTextVNode(" Please go to the Dues Mapping section to map the local dues categories to the appropriate AFT national per capita category and/or State per capita category. For assistance or questions, please contact MD&A at edues@aft.org. ")
                ],
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VBtn, {
                onClick: _cache[2] || (_cache[2] = ($event) => $options.doPrev())
              }, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode(" Back ")
                ])),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, { class: "Continue-Button" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                disabled: !_ctx.valid,
                color: "#0A2A5C",
                onClick: _cache[3] || (_cache[3] = ($event) => $options.doNext())
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode(" Continue ")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["disabled"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const FormBuilderDuesCategories = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormBuilderDuesCategories.vue"]]);
var vuedraggable_umd$1 = { exports: {} };
var vue = { exports: {} };
var vue_cjs = {};
/**
* @vue/compiler-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const FRAGMENT = Symbol(`Fragment`);
const TELEPORT = Symbol(`Teleport`);
const SUSPENSE = Symbol(`Suspense`);
const KEEP_ALIVE = Symbol(`KeepAlive`);
const BASE_TRANSITION = Symbol(
  `BaseTransition`
);
const OPEN_BLOCK = Symbol(`openBlock`);
const CREATE_BLOCK = Symbol(`createBlock`);
const CREATE_ELEMENT_BLOCK = Symbol(
  `createElementBlock`
);
const CREATE_VNODE = Symbol(`createVNode`);
const CREATE_ELEMENT_VNODE = Symbol(
  `createElementVNode`
);
const CREATE_COMMENT = Symbol(
  `createCommentVNode`
);
const CREATE_TEXT = Symbol(
  `createTextVNode`
);
const CREATE_STATIC = Symbol(
  `createStaticVNode`
);
const RESOLVE_COMPONENT = Symbol(
  `resolveComponent`
);
const RESOLVE_DYNAMIC_COMPONENT = Symbol(
  `resolveDynamicComponent`
);
const RESOLVE_DIRECTIVE = Symbol(
  `resolveDirective`
);
const RESOLVE_FILTER = Symbol(
  `resolveFilter`
);
const WITH_DIRECTIVES = Symbol(
  `withDirectives`
);
const RENDER_LIST = Symbol(`renderList`);
const RENDER_SLOT = Symbol(`renderSlot`);
const CREATE_SLOTS = Symbol(`createSlots`);
const TO_DISPLAY_STRING = Symbol(
  `toDisplayString`
);
const MERGE_PROPS = Symbol(`mergeProps`);
const NORMALIZE_CLASS = Symbol(
  `normalizeClass`
);
const NORMALIZE_STYLE = Symbol(
  `normalizeStyle`
);
const NORMALIZE_PROPS = Symbol(
  `normalizeProps`
);
const GUARD_REACTIVE_PROPS = Symbol(
  `guardReactiveProps`
);
const TO_HANDLERS = Symbol(`toHandlers`);
const CAMELIZE = Symbol(`camelize`);
const CAPITALIZE = Symbol(`capitalize`);
const TO_HANDLER_KEY = Symbol(
  `toHandlerKey`
);
const SET_BLOCK_TRACKING = Symbol(
  `setBlockTracking`
);
const PUSH_SCOPE_ID = Symbol(`pushScopeId`);
const POP_SCOPE_ID = Symbol(`popScopeId`);
const WITH_CTX = Symbol(`withCtx`);
const UNREF = Symbol(`unref`);
const IS_REF = Symbol(`isRef`);
const WITH_MEMO = Symbol(`withMemo`);
const IS_MEMO_SAME = Symbol(`isMemoSame`);
const helperNameMap = {
  [FRAGMENT]: `Fragment`,
  [TELEPORT]: `Teleport`,
  [SUSPENSE]: `Suspense`,
  [KEEP_ALIVE]: `KeepAlive`,
  [BASE_TRANSITION]: `BaseTransition`,
  [OPEN_BLOCK]: `openBlock`,
  [CREATE_BLOCK]: `createBlock`,
  [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
  [CREATE_VNODE]: `createVNode`,
  [CREATE_ELEMENT_VNODE]: `createElementVNode`,
  [CREATE_COMMENT]: `createCommentVNode`,
  [CREATE_TEXT]: `createTextVNode`,
  [CREATE_STATIC]: `createStaticVNode`,
  [RESOLVE_COMPONENT]: `resolveComponent`,
  [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
  [RESOLVE_DIRECTIVE]: `resolveDirective`,
  [RESOLVE_FILTER]: `resolveFilter`,
  [WITH_DIRECTIVES]: `withDirectives`,
  [RENDER_LIST]: `renderList`,
  [RENDER_SLOT]: `renderSlot`,
  [CREATE_SLOTS]: `createSlots`,
  [TO_DISPLAY_STRING]: `toDisplayString`,
  [MERGE_PROPS]: `mergeProps`,
  [NORMALIZE_CLASS]: `normalizeClass`,
  [NORMALIZE_STYLE]: `normalizeStyle`,
  [NORMALIZE_PROPS]: `normalizeProps`,
  [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
  [TO_HANDLERS]: `toHandlers`,
  [CAMELIZE]: `camelize`,
  [CAPITALIZE]: `capitalize`,
  [TO_HANDLER_KEY]: `toHandlerKey`,
  [SET_BLOCK_TRACKING]: `setBlockTracking`,
  [PUSH_SCOPE_ID]: `pushScopeId`,
  [POP_SCOPE_ID]: `popScopeId`,
  [WITH_CTX]: `withCtx`,
  [UNREF]: `unref`,
  [IS_REF]: `isRef`,
  [WITH_MEMO]: `withMemo`,
  [IS_MEMO_SAME]: `isMemoSame`
};
function registerRuntimeHelpers(helpers) {
  Object.getOwnPropertySymbols(helpers).forEach((s) => {
    helperNameMap[s] = helpers[s];
  });
}
const Namespaces = {
  "HTML": 0,
  "0": "HTML",
  "SVG": 1,
  "1": "SVG",
  "MATH_ML": 2,
  "2": "MATH_ML"
};
const NodeTypes = {
  "ROOT": 0,
  "0": "ROOT",
  "ELEMENT": 1,
  "1": "ELEMENT",
  "TEXT": 2,
  "2": "TEXT",
  "COMMENT": 3,
  "3": "COMMENT",
  "SIMPLE_EXPRESSION": 4,
  "4": "SIMPLE_EXPRESSION",
  "INTERPOLATION": 5,
  "5": "INTERPOLATION",
  "ATTRIBUTE": 6,
  "6": "ATTRIBUTE",
  "DIRECTIVE": 7,
  "7": "DIRECTIVE",
  "COMPOUND_EXPRESSION": 8,
  "8": "COMPOUND_EXPRESSION",
  "IF": 9,
  "9": "IF",
  "IF_BRANCH": 10,
  "10": "IF_BRANCH",
  "FOR": 11,
  "11": "FOR",
  "TEXT_CALL": 12,
  "12": "TEXT_CALL",
  "VNODE_CALL": 13,
  "13": "VNODE_CALL",
  "JS_CALL_EXPRESSION": 14,
  "14": "JS_CALL_EXPRESSION",
  "JS_OBJECT_EXPRESSION": 15,
  "15": "JS_OBJECT_EXPRESSION",
  "JS_PROPERTY": 16,
  "16": "JS_PROPERTY",
  "JS_ARRAY_EXPRESSION": 17,
  "17": "JS_ARRAY_EXPRESSION",
  "JS_FUNCTION_EXPRESSION": 18,
  "18": "JS_FUNCTION_EXPRESSION",
  "JS_CONDITIONAL_EXPRESSION": 19,
  "19": "JS_CONDITIONAL_EXPRESSION",
  "JS_CACHE_EXPRESSION": 20,
  "20": "JS_CACHE_EXPRESSION",
  "JS_BLOCK_STATEMENT": 21,
  "21": "JS_BLOCK_STATEMENT",
  "JS_TEMPLATE_LITERAL": 22,
  "22": "JS_TEMPLATE_LITERAL",
  "JS_IF_STATEMENT": 23,
  "23": "JS_IF_STATEMENT",
  "JS_ASSIGNMENT_EXPRESSION": 24,
  "24": "JS_ASSIGNMENT_EXPRESSION",
  "JS_SEQUENCE_EXPRESSION": 25,
  "25": "JS_SEQUENCE_EXPRESSION",
  "JS_RETURN_STATEMENT": 26,
  "26": "JS_RETURN_STATEMENT"
};
const ElementTypes = {
  "ELEMENT": 0,
  "0": "ELEMENT",
  "COMPONENT": 1,
  "1": "COMPONENT",
  "SLOT": 2,
  "2": "SLOT",
  "TEMPLATE": 3,
  "3": "TEMPLATE"
};
const ConstantTypes = {
  "NOT_CONSTANT": 0,
  "0": "NOT_CONSTANT",
  "CAN_SKIP_PATCH": 1,
  "1": "CAN_SKIP_PATCH",
  "CAN_CACHE": 2,
  "2": "CAN_CACHE",
  "CAN_STRINGIFY": 3,
  "3": "CAN_STRINGIFY"
};
const locStub = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function createRoot(children, source = "") {
  return {
    type: 0,
    source,
    children,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: locStub
  };
}
function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent2 = false, loc = locStub) {
  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK);
      context.helper(getVNodeBlockHelper(context.inSSR, isComponent2));
    } else {
      context.helper(getVNodeHelper(context.inSSR, isComponent2));
    }
    if (directives) {
      context.helper(WITH_DIRECTIVES);
    }
  }
  return {
    type: 13,
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent: isComponent2,
    loc
  };
}
function createArrayExpression(elements, loc = locStub) {
  return {
    type: 17,
    loc,
    elements
  };
}
function createObjectExpression(properties, loc = locStub) {
  return {
    type: 15,
    loc,
    properties
  };
}
function createObjectProperty(key, value) {
  return {
    type: 16,
    loc: locStub,
    key: isString(key) ? createSimpleExpression(key, true) : key,
    value
  };
}
function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0) {
  return {
    type: 4,
    loc,
    content,
    isStatic,
    constType: isStatic ? 3 : constType
  };
}
function createInterpolation(content, loc) {
  return {
    type: 5,
    loc,
    content: isString(content) ? createSimpleExpression(content, false, loc) : content
  };
}
function createCompoundExpression(children, loc = locStub) {
  return {
    type: 8,
    loc,
    children
  };
}
function createCallExpression(callee, args = [], loc = locStub) {
  return {
    type: 14,
    loc,
    callee,
    arguments: args
  };
}
function createFunctionExpression(params, returns = void 0, newline = false, isSlot = false, loc = locStub) {
  return {
    type: 18,
    params,
    returns,
    newline,
    isSlot,
    loc
  };
}
function createConditionalExpression(test, consequent, alternate, newline = true) {
  return {
    type: 19,
    test,
    consequent,
    alternate,
    newline,
    loc: locStub
  };
}
function createCacheExpression(index2, value, needPauseTracking = false, inVOnce = false) {
  return {
    type: 20,
    index: index2,
    value,
    needPauseTracking,
    inVOnce,
    needArraySpread: false,
    loc: locStub
  };
}
function createBlockStatement(body) {
  return {
    type: 21,
    body,
    loc: locStub
  };
}
function createTemplateLiteral(elements) {
  return {
    type: 22,
    elements,
    loc: locStub
  };
}
function createIfStatement(test, consequent, alternate) {
  return {
    type: 23,
    test,
    consequent,
    alternate,
    loc: locStub
  };
}
function createAssignmentExpression(left, right) {
  return {
    type: 24,
    left,
    right,
    loc: locStub
  };
}
function createSequenceExpression(expressions) {
  return {
    type: 25,
    expressions,
    loc: locStub
  };
}
function createReturnStatement(returns) {
  return {
    type: 26,
    returns,
    loc: locStub
  };
}
function getVNodeHelper(ssr, isComponent2) {
  return ssr || isComponent2 ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
}
function getVNodeBlockHelper(ssr, isComponent2) {
  return ssr || isComponent2 ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
}
function convertToBlock(node, { helper, removeHelper, inSSR }) {
  if (!node.isBlock) {
    node.isBlock = true;
    removeHelper(getVNodeHelper(inSSR, node.isComponent));
    helper(OPEN_BLOCK);
    helper(getVNodeBlockHelper(inSSR, node.isComponent));
  }
}
const defaultDelimitersOpen = new Uint8Array([123, 123]);
const defaultDelimitersClose = new Uint8Array([125, 125]);
function isTagStartChar(c) {
  return c >= 97 && c <= 122 || c >= 65 && c <= 90;
}
function isWhitespace(c) {
  return c === 32 || c === 10 || c === 9 || c === 12 || c === 13;
}
function isEndOfTagSection(c) {
  return c === 47 || c === 62 || isWhitespace(c);
}
function toCharCodes(str) {
  const ret = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret;
}
const Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
  // `</textarea
};
class Tokenizer {
  constructor(stack2, cbs) {
    this.stack = stack2;
    this.cbs = cbs;
    this.state = 1;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.entityStart = 0;
    this.baseState = 1;
    this.inRCDATA = false;
    this.inXML = false;
    this.inVPre = false;
    this.newlines = [];
    this.mode = 0;
    this.delimiterOpen = defaultDelimitersOpen;
    this.delimiterClose = defaultDelimitersClose;
    this.delimiterIndex = -1;
    this.currentSequence = void 0;
    this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1;
    this.mode = 0;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = 1;
    this.inRCDATA = false;
    this.currentSequence = void 0;
    this.newlines.length = 0;
    this.delimiterOpen = defaultDelimitersOpen;
    this.delimiterClose = defaultDelimitersClose;
  }
  /**
   * Generate Position object with line / column information using recorded
   * newline positions. We know the index is always going to be an already
   * processed index, so all the newlines up to this index should have been
   * recorded.
   */
  getPos(index2) {
    let line = 1;
    let column = index2 + 1;
    for (let i = this.newlines.length - 1; i >= 0; i--) {
      const newlineIndex = this.newlines[i];
      if (index2 > newlineIndex) {
        line = i + 2;
        column = index2 - newlineIndex;
        break;
      }
    }
    return {
      column,
      line,
      offset: index2
    };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(c) {
    if (c === 60) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = 5;
      this.sectionStart = this.index;
    } else if (!this.inVPre && c === this.delimiterOpen[0]) {
      this.state = 2;
      this.delimiterIndex = 0;
      this.stateInterpolationOpen(c);
    }
  }
  stateInterpolationOpen(c) {
    if (c === this.delimiterOpen[this.delimiterIndex]) {
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const start = this.index + 1 - this.delimiterOpen.length;
        if (start > this.sectionStart) {
          this.cbs.ontext(this.sectionStart, start);
        }
        this.state = 3;
        this.sectionStart = start;
      } else {
        this.delimiterIndex++;
      }
    } else if (this.inRCDATA) {
      this.state = 32;
      this.stateInRCDATA(c);
    } else {
      this.state = 1;
      this.stateText(c);
    }
  }
  stateInterpolation(c) {
    if (c === this.delimiterClose[0]) {
      this.state = 4;
      this.delimiterIndex = 0;
      this.stateInterpolationClose(c);
    }
  }
  stateInterpolationClose(c) {
    if (c === this.delimiterClose[this.delimiterIndex]) {
      if (this.delimiterIndex === this.delimiterClose.length - 1) {
        this.cbs.oninterpolation(this.sectionStart, this.index + 1);
        if (this.inRCDATA) {
          this.state = 32;
        } else {
          this.state = 1;
        }
        this.sectionStart = this.index + 1;
      } else {
        this.delimiterIndex++;
      }
    } else {
      this.state = 3;
      this.stateInterpolation(c);
    }
  }
  stateSpecialStartSequence(c) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(c)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (c | 32) === this.currentSequence[this.sequenceIndex]
    );
    if (!isMatch) {
      this.inRCDATA = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = 6;
    this.stateInTagName(c);
  }
  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
  stateInRCDATA(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c === 62 || isWhitespace(c)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c);
        this.inRCDATA = false;
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd && !this.inSFCRoot) {
        if (!this.inVPre && c === this.delimiterOpen[0]) {
          this.state = 2;
          this.delimiterIndex = 0;
          this.stateInterpolationOpen(c);
        }
      } else if (this.fastForwardTo(60)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c === 60);
    }
  }
  stateCDATASequence(c) {
    if (c === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = 28;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = 23;
      this.stateInDeclaration(c);
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(c) {
    while (++this.index < this.buffer.length) {
      const cc = this.buffer.charCodeAt(this.index);
      if (cc === 10) {
        this.newlines.push(this.index);
      }
      if (cc === c) {
        return true;
      }
    }
    this.index = this.buffer.length - 1;
    return false;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(c) {
    if (c === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index - 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index - 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = 1;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  startSpecial(sequence, offset) {
    this.enterRCDATA(sequence, offset);
    this.state = 31;
  }
  enterRCDATA(sequence, offset) {
    this.inRCDATA = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
  }
  stateBeforeTagName(c) {
    if (c === 33) {
      this.state = 22;
      this.sectionStart = this.index + 1;
    } else if (c === 63) {
      this.state = 24;
      this.sectionStart = this.index + 1;
    } else if (isTagStartChar(c)) {
      this.sectionStart = this.index;
      if (this.mode === 0) {
        this.state = 6;
      } else if (this.inSFCRoot) {
        this.state = 34;
      } else if (!this.inXML) {
        if (c === 116) {
          this.state = 30;
        } else {
          this.state = c === 115 ? 29 : 6;
        }
      } else {
        this.state = 6;
      }
    } else if (c === 47) {
      this.state = 8;
    } else {
      this.state = 1;
      this.stateText(c);
    }
  }
  stateInTagName(c) {
    if (isEndOfTagSection(c)) {
      this.handleTagName(c);
    }
  }
  stateInSFCRootTagName(c) {
    if (isEndOfTagSection(c)) {
      const tag = this.buffer.slice(this.sectionStart, this.index);
      if (tag !== "template") {
        this.enterRCDATA(toCharCodes(`</` + tag), 0);
      }
      this.handleTagName(c);
    }
  }
  handleTagName(c) {
    this.cbs.onopentagname(this.sectionStart, this.index);
    this.sectionStart = -1;
    this.state = 11;
    this.stateBeforeAttrName(c);
  }
  stateBeforeClosingTagName(c) {
    if (isWhitespace(c)) ;
    else if (c === 62) {
      {
        this.cbs.onerr(14, this.index);
      }
      this.state = 1;
      this.sectionStart = this.index + 1;
    } else {
      this.state = isTagStartChar(c) ? 9 : 27;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c) {
    if (c === 62 || isWhitespace(c)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = 10;
      this.stateAfterClosingTagName(c);
    }
  }
  stateAfterClosingTagName(c) {
    if (c === 62) {
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttrName(c) {
    if (c === 62) {
      this.cbs.onopentagend(this.index);
      if (this.inRCDATA) {
        this.state = 32;
      } else {
        this.state = 1;
      }
      this.sectionStart = this.index + 1;
    } else if (c === 47) {
      this.state = 7;
      if (this.peek() !== 62) {
        this.cbs.onerr(22, this.index);
      }
    } else if (c === 60 && this.peek() === 47) {
      this.cbs.onopentagend(this.index);
      this.state = 5;
      this.sectionStart = this.index;
    } else if (!isWhitespace(c)) {
      if (c === 61) {
        this.cbs.onerr(
          19,
          this.index
        );
      }
      this.handleAttrStart(c);
    }
  }
  handleAttrStart(c) {
    if (c === 118 && this.peek() === 45) {
      this.state = 13;
      this.sectionStart = this.index;
    } else if (c === 46 || c === 58 || c === 64 || c === 35) {
      this.cbs.ondirname(this.index, this.index + 1);
      this.state = 14;
      this.sectionStart = this.index + 1;
    } else {
      this.state = 12;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c) {
    if (c === 62) {
      this.cbs.onselfclosingtag(this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
      this.inRCDATA = false;
    } else if (!isWhitespace(c)) {
      this.state = 11;
      this.stateBeforeAttrName(c);
    }
  }
  stateInAttrName(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 34 || c === 39 || c === 60) {
      this.cbs.onerr(
        17,
        this.index
      );
    }
  }
  stateInDirName(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 58) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.state = 14;
      this.sectionStart = this.index + 1;
    } else if (c === 46) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.state = 16;
      this.sectionStart = this.index + 1;
    }
  }
  stateInDirArg(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirarg(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 91) {
      this.state = 15;
    } else if (c === 46) {
      this.cbs.ondirarg(this.sectionStart, this.index);
      this.state = 16;
      this.sectionStart = this.index + 1;
    }
  }
  stateInDynamicDirArg(c) {
    if (c === 93) {
      this.state = 14;
    } else if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirarg(this.sectionStart, this.index + 1);
      this.handleAttrNameEnd(c);
      {
        this.cbs.onerr(
          27,
          this.index
        );
      }
    }
  }
  stateInDirModifier(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirmodifier(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 46) {
      this.cbs.ondirmodifier(this.sectionStart, this.index);
      this.sectionStart = this.index + 1;
    }
  }
  handleAttrNameEnd(c) {
    this.sectionStart = this.index;
    this.state = 17;
    this.cbs.onattribnameend(this.index);
    this.stateAfterAttrName(c);
  }
  stateAfterAttrName(c) {
    if (c === 61) {
      this.state = 18;
    } else if (c === 47 || c === 62) {
      this.cbs.onattribend(0, this.sectionStart);
      this.sectionStart = -1;
      this.state = 11;
      this.stateBeforeAttrName(c);
    } else if (!isWhitespace(c)) {
      this.cbs.onattribend(0, this.sectionStart);
      this.handleAttrStart(c);
    }
  }
  stateBeforeAttrValue(c) {
    if (c === 34) {
      this.state = 19;
      this.sectionStart = this.index + 1;
    } else if (c === 39) {
      this.state = 20;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c)) {
      this.sectionStart = this.index;
      this.state = 21;
      this.stateInAttrValueNoQuotes(c);
    }
  }
  handleInAttrValue(c, quote) {
    if (c === quote || this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(
        quote === 34 ? 3 : 2,
        this.index + 1
      );
      this.state = 11;
    }
  }
  stateInAttrValueDoubleQuotes(c) {
    this.handleInAttrValue(c, 34);
  }
  stateInAttrValueSingleQuotes(c) {
    this.handleInAttrValue(c, 39);
  }
  stateInAttrValueNoQuotes(c) {
    if (isWhitespace(c) || c === 62) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(1, this.index);
      this.state = 11;
      this.stateBeforeAttrName(c);
    } else if (c === 34 || c === 39 || c === 60 || c === 61 || c === 96) {
      this.cbs.onerr(
        18,
        this.index
      );
    } else ;
  }
  stateBeforeDeclaration(c) {
    if (c === 91) {
      this.state = 26;
      this.sequenceIndex = 0;
    } else {
      this.state = c === 45 ? 25 : 23;
    }
  }
  stateInDeclaration(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c) {
    if (c === 45) {
      this.state = 28;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = 23;
    }
  }
  stateInSpecialComment(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.cbs.oncomment(this.sectionStart, this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c) {
    if (c === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (c === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = 6;
      this.stateInTagName(c);
    }
  }
  stateBeforeSpecialT(c) {
    if (c === Sequences.TitleEnd[3]) {
      this.startSpecial(Sequences.TitleEnd, 4);
    } else if (c === Sequences.TextareaEnd[3]) {
      this.startSpecial(Sequences.TextareaEnd, 4);
    } else {
      this.state = 6;
      this.stateInTagName(c);
    }
  }
  startEntity() {
  }
  stateInEntity() {
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse(input) {
    this.buffer = input;
    while (this.index < this.buffer.length) {
      const c = this.buffer.charCodeAt(this.index);
      if (c === 10) {
        this.newlines.push(this.index);
      }
      switch (this.state) {
        case 1: {
          this.stateText(c);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(c);
          break;
        }
        case 3: {
          this.stateInterpolation(c);
          break;
        }
        case 4: {
          this.stateInterpolationClose(c);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(c);
          break;
        }
        case 32: {
          this.stateInRCDATA(c);
          break;
        }
        case 26: {
          this.stateCDATASequence(c);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(c);
          break;
        }
        case 12: {
          this.stateInAttrName(c);
          break;
        }
        case 13: {
          this.stateInDirName(c);
          break;
        }
        case 14: {
          this.stateInDirArg(c);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(c);
          break;
        }
        case 16: {
          this.stateInDirModifier(c);
          break;
        }
        case 28: {
          this.stateInCommentLike(c);
          break;
        }
        case 27: {
          this.stateInSpecialComment(c);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(c);
          break;
        }
        case 6: {
          this.stateInTagName(c);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(c);
          break;
        }
        case 9: {
          this.stateInClosingTagName(c);
          break;
        }
        case 5: {
          this.stateBeforeTagName(c);
          break;
        }
        case 17: {
          this.stateAfterAttrName(c);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(c);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(c);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(c);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(c);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(c);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(c);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(c);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(c);
          break;
        }
        case 23: {
          this.stateInDeclaration(c);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(c);
          break;
        }
        case 25: {
          this.stateBeforeComment(c);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(c);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
    this.finish();
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.sectionStart !== this.index) {
      if (this.state === 1 || this.state === 32 && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === 19 || this.state === 20 || this.state === 21) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  finish() {
    this.handleTrailingData();
    this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length;
    if (this.sectionStart >= endIndex) {
      return;
    }
    if (this.state === 28) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex);
      }
    } else if (this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9) ;
    else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitCodePoint(cp, consumed) {
  }
}
const CompilerDeprecationTypes = {
  "COMPILER_IS_ON_ELEMENT": "COMPILER_IS_ON_ELEMENT",
  "COMPILER_V_BIND_SYNC": "COMPILER_V_BIND_SYNC",
  "COMPILER_V_BIND_OBJECT_ORDER": "COMPILER_V_BIND_OBJECT_ORDER",
  "COMPILER_V_ON_NATIVE": "COMPILER_V_ON_NATIVE",
  "COMPILER_V_IF_V_FOR_PRECEDENCE": "COMPILER_V_IF_V_FOR_PRECEDENCE",
  "COMPILER_NATIVE_TEMPLATE": "COMPILER_NATIVE_TEMPLATE",
  "COMPILER_INLINE_TEMPLATE": "COMPILER_INLINE_TEMPLATE",
  "COMPILER_FILTERS": "COMPILER_FILTERS"
};
const deprecationData = {
  ["COMPILER_IS_ON_ELEMENT"]: {
    message: `Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".`,
    link: `https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html`
  },
  ["COMPILER_V_BIND_SYNC"]: {
    message: (key) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${key}.sync\` should be changed to \`v-model:${key}\`.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
  },
  ["COMPILER_V_BIND_OBJECT_ORDER"]: {
    message: `v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.html`
  },
  ["COMPILER_V_ON_NATIVE"]: {
    message: `.native modifier for v-on has been removed as is no longer necessary.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html`
  },
  ["COMPILER_V_IF_V_FOR_PRECEDENCE"]: {
    message: `v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html`
  },
  ["COMPILER_NATIVE_TEMPLATE"]: {
    message: `<template> with no special directives will render as a native template element instead of its inner content in Vue 3.`
  },
  ["COMPILER_INLINE_TEMPLATE"]: {
    message: `"inline-template" has been removed in Vue 3.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html`
  },
  ["COMPILER_FILTERS"]: {
    message: `filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
  }
};
function getCompatValue(key, { compatConfig }) {
  const value = compatConfig && compatConfig[key];
  if (key === "MODE") {
    return value || 3;
  } else {
    return value;
  }
}
function isCompatEnabled(key, context) {
  const mode = getCompatValue("MODE", context);
  const value = getCompatValue(key, context);
  return mode === 3 ? value === true : value !== false;
}
function checkCompatEnabled(key, context, loc, ...args) {
  const enabled = isCompatEnabled(key, context);
  if (enabled) {
    warnDeprecation(key, context, loc, ...args);
  }
  return enabled;
}
function warnDeprecation(key, context, loc, ...args) {
  const val = getCompatValue(key, context);
  if (val === "suppress-warning") {
    return;
  }
  const { message, link } = deprecationData[key];
  const msg = `(deprecation ${key}) ${typeof message === "function" ? message(...args) : message}${link ? `
  Details: ${link}` : ``}`;
  const err = new SyntaxError(msg);
  err.code = key;
  if (loc) err.loc = loc;
  context.onWarn(err);
}
function defaultOnError(error) {
  throw error;
}
function defaultOnWarn(msg) {
  console.warn(`[Vue warn] ${msg.message}`);
}
function createCompilerError(code, loc, messages, additionalMessage) {
  const msg = (messages || errorMessages)[code] + (additionalMessage || ``);
  const error = new SyntaxError(String(msg));
  error.code = code;
  error.loc = loc;
  return error;
}
const ErrorCodes = {
  "ABRUPT_CLOSING_OF_EMPTY_COMMENT": 0,
  "0": "ABRUPT_CLOSING_OF_EMPTY_COMMENT",
  "CDATA_IN_HTML_CONTENT": 1,
  "1": "CDATA_IN_HTML_CONTENT",
  "DUPLICATE_ATTRIBUTE": 2,
  "2": "DUPLICATE_ATTRIBUTE",
  "END_TAG_WITH_ATTRIBUTES": 3,
  "3": "END_TAG_WITH_ATTRIBUTES",
  "END_TAG_WITH_TRAILING_SOLIDUS": 4,
  "4": "END_TAG_WITH_TRAILING_SOLIDUS",
  "EOF_BEFORE_TAG_NAME": 5,
  "5": "EOF_BEFORE_TAG_NAME",
  "EOF_IN_CDATA": 6,
  "6": "EOF_IN_CDATA",
  "EOF_IN_COMMENT": 7,
  "7": "EOF_IN_COMMENT",
  "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT": 8,
  "8": "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT",
  "EOF_IN_TAG": 9,
  "9": "EOF_IN_TAG",
  "INCORRECTLY_CLOSED_COMMENT": 10,
  "10": "INCORRECTLY_CLOSED_COMMENT",
  "INCORRECTLY_OPENED_COMMENT": 11,
  "11": "INCORRECTLY_OPENED_COMMENT",
  "INVALID_FIRST_CHARACTER_OF_TAG_NAME": 12,
  "12": "INVALID_FIRST_CHARACTER_OF_TAG_NAME",
  "MISSING_ATTRIBUTE_VALUE": 13,
  "13": "MISSING_ATTRIBUTE_VALUE",
  "MISSING_END_TAG_NAME": 14,
  "14": "MISSING_END_TAG_NAME",
  "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES": 15,
  "15": "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES",
  "NESTED_COMMENT": 16,
  "16": "NESTED_COMMENT",
  "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME": 17,
  "17": "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME",
  "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE": 18,
  "18": "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE",
  "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME": 19,
  "19": "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME",
  "UNEXPECTED_NULL_CHARACTER": 20,
  "20": "UNEXPECTED_NULL_CHARACTER",
  "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME": 21,
  "21": "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME",
  "UNEXPECTED_SOLIDUS_IN_TAG": 22,
  "22": "UNEXPECTED_SOLIDUS_IN_TAG",
  "X_INVALID_END_TAG": 23,
  "23": "X_INVALID_END_TAG",
  "X_MISSING_END_TAG": 24,
  "24": "X_MISSING_END_TAG",
  "X_MISSING_INTERPOLATION_END": 25,
  "25": "X_MISSING_INTERPOLATION_END",
  "X_MISSING_DIRECTIVE_NAME": 26,
  "26": "X_MISSING_DIRECTIVE_NAME",
  "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END": 27,
  "27": "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END",
  "X_V_IF_NO_EXPRESSION": 28,
  "28": "X_V_IF_NO_EXPRESSION",
  "X_V_IF_SAME_KEY": 29,
  "29": "X_V_IF_SAME_KEY",
  "X_V_ELSE_NO_ADJACENT_IF": 30,
  "30": "X_V_ELSE_NO_ADJACENT_IF",
  "X_V_FOR_NO_EXPRESSION": 31,
  "31": "X_V_FOR_NO_EXPRESSION",
  "X_V_FOR_MALFORMED_EXPRESSION": 32,
  "32": "X_V_FOR_MALFORMED_EXPRESSION",
  "X_V_FOR_TEMPLATE_KEY_PLACEMENT": 33,
  "33": "X_V_FOR_TEMPLATE_KEY_PLACEMENT",
  "X_V_BIND_NO_EXPRESSION": 34,
  "34": "X_V_BIND_NO_EXPRESSION",
  "X_V_ON_NO_EXPRESSION": 35,
  "35": "X_V_ON_NO_EXPRESSION",
  "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET": 36,
  "36": "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET",
  "X_V_SLOT_MIXED_SLOT_USAGE": 37,
  "37": "X_V_SLOT_MIXED_SLOT_USAGE",
  "X_V_SLOT_DUPLICATE_SLOT_NAMES": 38,
  "38": "X_V_SLOT_DUPLICATE_SLOT_NAMES",
  "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN": 39,
  "39": "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN",
  "X_V_SLOT_MISPLACED": 40,
  "40": "X_V_SLOT_MISPLACED",
  "X_V_MODEL_NO_EXPRESSION": 41,
  "41": "X_V_MODEL_NO_EXPRESSION",
  "X_V_MODEL_MALFORMED_EXPRESSION": 42,
  "42": "X_V_MODEL_MALFORMED_EXPRESSION",
  "X_V_MODEL_ON_SCOPE_VARIABLE": 43,
  "43": "X_V_MODEL_ON_SCOPE_VARIABLE",
  "X_V_MODEL_ON_PROPS": 44,
  "44": "X_V_MODEL_ON_PROPS",
  "X_INVALID_EXPRESSION": 45,
  "45": "X_INVALID_EXPRESSION",
  "X_KEEP_ALIVE_INVALID_CHILDREN": 46,
  "46": "X_KEEP_ALIVE_INVALID_CHILDREN",
  "X_PREFIX_ID_NOT_SUPPORTED": 47,
  "47": "X_PREFIX_ID_NOT_SUPPORTED",
  "X_MODULE_MODE_NOT_SUPPORTED": 48,
  "48": "X_MODULE_MODE_NOT_SUPPORTED",
  "X_CACHE_HANDLER_NOT_SUPPORTED": 49,
  "49": "X_CACHE_HANDLER_NOT_SUPPORTED",
  "X_SCOPE_ID_NOT_SUPPORTED": 50,
  "50": "X_SCOPE_ID_NOT_SUPPORTED",
  "X_VNODE_HOOKS": 51,
  "51": "X_VNODE_HOOKS",
  "X_V_BIND_INVALID_SAME_NAME_ARGUMENT": 52,
  "52": "X_V_BIND_INVALID_SAME_NAME_ARGUMENT",
  "__EXTEND_POINT__": 53,
  "53": "__EXTEND_POINT__"
};
const errorMessages = {
  // parse errors
  [0]: "Illegal comment.",
  [1]: "CDATA section is allowed only in XML context.",
  [2]: "Duplicate attribute.",
  [3]: "End tag cannot have attributes.",
  [4]: "Illegal '/' in tags.",
  [5]: "Unexpected EOF in tag.",
  [6]: "Unexpected EOF in CDATA section.",
  [7]: "Unexpected EOF in comment.",
  [8]: "Unexpected EOF in script.",
  [9]: "Unexpected EOF in tag.",
  [10]: "Incorrectly closed comment.",
  [11]: "Incorrectly opened comment.",
  [12]: "Illegal tag name. Use '&lt;' to print '<'.",
  [13]: "Attribute value was expected.",
  [14]: "End tag name was expected.",
  [15]: "Whitespace was expected.",
  [16]: "Unexpected '<!--' in comment.",
  [17]: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
  [18]: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
  [19]: "Attribute name cannot start with '='.",
  [21]: "'<?' is allowed only in XML context.",
  [20]: `Unexpected null character.`,
  [22]: "Illegal '/' in tags.",
  // Vue-specific parse errors
  [23]: "Invalid end tag.",
  [24]: "Element is missing end tag.",
  [25]: "Interpolation end sign was not found.",
  [27]: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
  [26]: "Legal directive name was expected.",
  // transform errors
  [28]: `v-if/v-else-if is missing expression.`,
  [29]: `v-if/else branches must use unique keys.`,
  [30]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
  [31]: `v-for is missing expression.`,
  [32]: `v-for has invalid expression.`,
  [33]: `<template v-for> key should be placed on the <template> tag.`,
  [34]: `v-bind is missing expression.`,
  [52]: `v-bind with same-name shorthand only allows static argument.`,
  [35]: `v-on is missing expression.`,
  [36]: `Unexpected custom directive on <slot> outlet.`,
  [37]: `Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.`,
  [38]: `Duplicate slot names found. `,
  [39]: `Extraneous children found when component already has explicitly named default slot. These children will be ignored.`,
  [40]: `v-slot can only be used on components or <template> tags.`,
  [41]: `v-model is missing expression.`,
  [42]: `v-model value must be a valid JavaScript member expression.`,
  [43]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
  [44]: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
  [45]: `Error parsing JavaScript expression: `,
  [46]: `<KeepAlive> expects exactly one child component.`,
  [51]: `@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.`,
  // generic errors
  [47]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
  [48]: `ES module mode is not supported in this build of compiler.`,
  [49]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
  [50]: `"scopeId" option is only supported in module mode.`,
  // just to fulfill types
  [53]: ``
};
function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
  {
    return;
  }
}
function isReferencedIdentifier(id, parent, parentStack) {
  {
    return false;
  }
}
function isInDestructureAssignment(parent, parentStack) {
  if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
    let i = parentStack.length;
    while (i--) {
      const p = parentStack[i];
      if (p.type === "AssignmentExpression") {
        return true;
      } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
        break;
      }
    }
  }
  return false;
}
function isInNewExpression(parentStack) {
  let i = parentStack.length;
  while (i--) {
    const p = parentStack[i];
    if (p.type === "NewExpression") {
      return true;
    } else if (p.type !== "MemberExpression") {
      break;
    }
  }
  return false;
}
function walkFunctionParams(node, onIdent) {
  for (const p of node.params) {
    for (const id of extractIdentifiers(p)) {
      onIdent(id);
    }
  }
}
function walkBlockDeclarations(block, onIdent) {
  for (const stmt of block.body) {
    if (stmt.type === "VariableDeclaration") {
      if (stmt.declare) continue;
      for (const decl of stmt.declarations) {
        for (const id of extractIdentifiers(decl.id)) {
          onIdent(id);
        }
      }
    } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
      if (stmt.declare || !stmt.id) continue;
      onIdent(stmt.id);
    } else if (isForStatement(stmt)) {
      walkForStatement(stmt, true, onIdent);
    }
  }
}
function isForStatement(stmt) {
  return stmt.type === "ForOfStatement" || stmt.type === "ForInStatement" || stmt.type === "ForStatement";
}
function walkForStatement(stmt, isVar, onIdent) {
  const variable = stmt.type === "ForStatement" ? stmt.init : stmt.left;
  if (variable && variable.type === "VariableDeclaration" && (variable.kind === "var" ? isVar : false)) {
    for (const decl of variable.declarations) {
      for (const id of extractIdentifiers(decl.id)) {
        onIdent(id);
      }
    }
  }
}
function extractIdentifiers(param, nodes = []) {
  switch (param.type) {
    case "Identifier":
      nodes.push(param);
      break;
    case "MemberExpression":
      let object = param;
      while (object.type === "MemberExpression") {
        object = object.object;
      }
      nodes.push(object);
      break;
    case "ObjectPattern":
      for (const prop of param.properties) {
        if (prop.type === "RestElement") {
          extractIdentifiers(prop.argument, nodes);
        } else {
          extractIdentifiers(prop.value, nodes);
        }
      }
      break;
    case "ArrayPattern":
      param.elements.forEach((element) => {
        if (element) extractIdentifiers(element, nodes);
      });
      break;
    case "RestElement":
      extractIdentifiers(param.argument, nodes);
      break;
    case "AssignmentPattern":
      extractIdentifiers(param.left, nodes);
      break;
  }
  return nodes;
}
const isFunctionType = (node) => {
  return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
};
const isStaticProperty = (node) => node && (node.type === "ObjectProperty" || node.type === "ObjectMethod") && !node.computed;
const isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node;
const TS_NODE_TYPES = [
  "TSAsExpression",
  // foo as number
  "TSTypeAssertion",
  // (<number>foo)
  "TSNonNullExpression",
  // foo!
  "TSInstantiationExpression",
  // foo<string>
  "TSSatisfiesExpression"
  // foo satisfies T
];
function unwrapTSNode(node) {
  if (TS_NODE_TYPES.includes(node.type)) {
    return unwrapTSNode(node.expression);
  } else {
    return node;
  }
}
const isStaticExp = (p) => p.type === 4 && p.isStatic;
function isCoreComponent(tag) {
  switch (tag) {
    case "Teleport":
    case "teleport":
      return TELEPORT;
    case "Suspense":
    case "suspense":
      return SUSPENSE;
    case "KeepAlive":
    case "keep-alive":
      return KEEP_ALIVE;
    case "BaseTransition":
    case "base-transition":
      return BASE_TRANSITION;
  }
}
const nonIdentifierRE = /^\d|[^\$\w\xA0-\uFFFF]/;
const isSimpleIdentifier = (name) => !nonIdentifierRE.test(name);
const validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/;
const validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/;
const whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g;
const getExpSource = (exp) => exp.type === 4 ? exp.content : exp.loc.source;
const isMemberExpressionBrowser = (exp) => {
  const path = getExpSource(exp).trim().replace(whitespaceRE, (s) => s.trim());
  let state2 = 0;
  let stateStack = [];
  let currentOpenBracketCount = 0;
  let currentOpenParensCount = 0;
  let currentStringType = null;
  for (let i = 0; i < path.length; i++) {
    const char = path.charAt(i);
    switch (state2) {
      case 0:
        if (char === "[") {
          stateStack.push(state2);
          state2 = 1;
          currentOpenBracketCount++;
        } else if (char === "(") {
          stateStack.push(state2);
          state2 = 2;
          currentOpenParensCount++;
        } else if (!(i === 0 ? validFirstIdentCharRE : validIdentCharRE).test(char)) {
          return false;
        }
        break;
      case 1:
        if (char === `'` || char === `"` || char === "`") {
          stateStack.push(state2);
          state2 = 3;
          currentStringType = char;
        } else if (char === `[`) {
          currentOpenBracketCount++;
        } else if (char === `]`) {
          if (!--currentOpenBracketCount) {
            state2 = stateStack.pop();
          }
        }
        break;
      case 2:
        if (char === `'` || char === `"` || char === "`") {
          stateStack.push(state2);
          state2 = 3;
          currentStringType = char;
        } else if (char === `(`) {
          currentOpenParensCount++;
        } else if (char === `)`) {
          if (i === path.length - 1) {
            return false;
          }
          if (!--currentOpenParensCount) {
            state2 = stateStack.pop();
          }
        }
        break;
      case 3:
        if (char === currentStringType) {
          state2 = stateStack.pop();
          currentStringType = null;
        }
        break;
    }
  }
  return !currentOpenBracketCount && !currentOpenParensCount;
};
const isMemberExpressionNode = NOOP;
const isMemberExpression = isMemberExpressionBrowser;
const fnExpRE = /^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;
const isFnExpressionBrowser = (exp) => fnExpRE.test(getExpSource(exp));
const isFnExpressionNode = NOOP;
const isFnExpression = isFnExpressionBrowser;
function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
  return advancePositionWithMutation(
    {
      offset: pos.offset,
      line: pos.line,
      column: pos.column
    },
    source,
    numberOfCharacters
  );
}
function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
  let linesCount = 0;
  let lastNewLinePos = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10) {
      linesCount++;
      lastNewLinePos = i;
    }
  }
  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg || `unexpected compiler condition`);
  }
}
function findDir(node, name, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 7 && (allowEmpty || p.exp) && (isString(name) ? p.name === name : name.test(p.name))) {
      return p;
    }
  }
}
function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (dynamicOnly) continue;
      if (p.name === name && (p.value || allowEmpty)) {
        return p;
      }
    } else if (p.name === "bind" && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
      return p;
    }
  }
}
function isStaticArgOf(arg, name) {
  return !!(arg && isStaticExp(arg) && arg.content === name);
}
function hasDynamicKeyVBind(node) {
  return node.props.some(
    (p) => p.type === 7 && p.name === "bind" && (!p.arg || // v-bind="obj"
    p.arg.type !== 4 || // v-bind:[_ctx.foo]
    !p.arg.isStatic)
    // v-bind:[foo]
  );
}
function isText$1(node) {
  return node.type === 5 || node.type === 2;
}
function isVSlot(p) {
  return p.type === 7 && p.name === "slot";
}
function isTemplateNode(node) {
  return node.type === 1 && node.tagType === 3;
}
function isSlotOutlet(node) {
  return node.type === 1 && node.tagType === 2;
}
const propsHelperSet = /* @__PURE__ */ new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
function getUnnormalizedProps(props, callPath = []) {
  if (props && !isString(props) && props.type === 14) {
    const callee = props.callee;
    if (!isString(callee) && propsHelperSet.has(callee)) {
      return getUnnormalizedProps(
        props.arguments[0],
        callPath.concat(props)
      );
    }
  }
  return [props, callPath];
}
function injectProp(node, prop, context) {
  let propsWithInjection;
  let props = node.type === 13 ? node.props : node.arguments[2];
  let callPath = [];
  let parentCall;
  if (props && !isString(props) && props.type === 14) {
    const ret = getUnnormalizedProps(props);
    props = ret[0];
    callPath = ret[1];
    parentCall = callPath[callPath.length - 1];
  }
  if (props == null || isString(props)) {
    propsWithInjection = createObjectExpression([prop]);
  } else if (props.type === 14) {
    const first = props.arguments[0];
    if (!isString(first) && first.type === 15) {
      if (!hasProp(prop, first)) {
        first.properties.unshift(prop);
      }
    } else {
      if (props.callee === TO_HANDLERS) {
        propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
          createObjectExpression([prop]),
          props
        ]);
      } else {
        props.arguments.unshift(createObjectExpression([prop]));
      }
    }
    !propsWithInjection && (propsWithInjection = props);
  } else if (props.type === 15) {
    if (!hasProp(prop, props)) {
      props.properties.unshift(prop);
    }
    propsWithInjection = props;
  } else {
    propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
      createObjectExpression([prop]),
      props
    ]);
    if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
      parentCall = callPath[callPath.length - 2];
    }
  }
  if (node.type === 13) {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.props = propsWithInjection;
    }
  } else {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.arguments[2] = propsWithInjection;
    }
  }
}
function hasProp(prop, props) {
  let result = false;
  if (prop.key.type === 4) {
    const propKeyName = prop.key.content;
    result = props.properties.some(
      (p) => p.key.type === 4 && p.key.content === propKeyName
    );
  }
  return result;
}
function toValidAssetId(name, type) {
  return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
    return searchValue === "-" ? "_" : name.charCodeAt(replaceValue).toString();
  })}`;
}
function hasScopeRef(node, ids) {
  if (!node || Object.keys(ids).length === 0) {
    return false;
  }
  switch (node.type) {
    case 1:
      for (let i = 0; i < node.props.length; i++) {
        const p = node.props[i];
        if (p.type === 7 && (hasScopeRef(p.arg, ids) || hasScopeRef(p.exp, ids))) {
          return true;
        }
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 11:
      if (hasScopeRef(node.source, ids)) {
        return true;
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 9:
      return node.branches.some((b) => hasScopeRef(b, ids));
    case 10:
      if (hasScopeRef(node.condition, ids)) {
        return true;
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 4:
      return !node.isStatic && isSimpleIdentifier(node.content) && !!ids[node.content];
    case 8:
      return node.children.some((c) => isObject(c) && hasScopeRef(c, ids));
    case 5:
    case 12:
      return hasScopeRef(node.content, ids);
    case 2:
    case 3:
    case 20:
      return false;
    default:
      return false;
  }
}
function getMemoedVNodeCall(node) {
  if (node.type === 14 && node.callee === WITH_MEMO) {
    return node.arguments[1].returns;
  } else {
    return node;
  }
}
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
const defaultParserOptions = {
  parseMode: "base",
  ns: 0,
  delimiters: [`{{`, `}}`],
  getNamespace: () => 0,
  isVoidTag: NO,
  isPreTag: NO,
  isIgnoreNewlineTag: NO,
  isCustomElement: NO,
  onError: defaultOnError,
  onWarn: defaultOnWarn,
  comments: true,
  prefixIdentifiers: false
};
let currentOptions = defaultParserOptions;
let currentRoot = null;
let currentInput = "";
let currentOpenTag = null;
let currentProp = null;
let currentAttrValue = "";
let currentAttrStartIndex = -1;
let currentAttrEndIndex = -1;
let inPre = 0;
let inVPre = false;
let currentVPreBoundary = null;
const stack = [];
const tokenizer = new Tokenizer(stack, {
  onerr: emitError,
  ontext(start, end) {
    onText(getSlice(start, end), start, end);
  },
  ontextentity(char, start, end) {
    onText(char, start, end);
  },
  oninterpolation(start, end) {
    if (inVPre) {
      return onText(getSlice(start, end), start, end);
    }
    let innerStart = start + tokenizer.delimiterOpen.length;
    let innerEnd = end - tokenizer.delimiterClose.length;
    while (isWhitespace(currentInput.charCodeAt(innerStart))) {
      innerStart++;
    }
    while (isWhitespace(currentInput.charCodeAt(innerEnd - 1))) {
      innerEnd--;
    }
    let exp = getSlice(innerStart, innerEnd);
    if (exp.includes("&")) {
      {
        exp = currentOptions.decodeEntities(exp, false);
      }
    }
    addNode({
      type: 5,
      content: createExp(exp, false, getLoc(innerStart, innerEnd)),
      loc: getLoc(start, end)
    });
  },
  onopentagname(start, end) {
    const name = getSlice(start, end);
    currentOpenTag = {
      type: 1,
      tag: name,
      ns: currentOptions.getNamespace(name, stack[0], currentOptions.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: getLoc(start - 1, end),
      codegenNode: void 0
    };
  },
  onopentagend(end) {
    endOpenTag(end);
  },
  onclosetag(start, end) {
    const name = getSlice(start, end);
    if (!currentOptions.isVoidTag(name)) {
      let found = false;
      for (let i = 0; i < stack.length; i++) {
        const e = stack[i];
        if (e.tag.toLowerCase() === name.toLowerCase()) {
          found = true;
          if (i > 0) {
            emitError(24, stack[0].loc.start.offset);
          }
          for (let j = 0; j <= i; j++) {
            const el = stack.shift();
            onCloseTag(el, end, j < i);
          }
          break;
        }
      }
      if (!found) {
        emitError(23, backTrack(start, 60));
      }
    }
  },
  onselfclosingtag(end) {
    const name = currentOpenTag.tag;
    currentOpenTag.isSelfClosing = true;
    endOpenTag(end);
    if (stack[0] && stack[0].tag === name) {
      onCloseTag(stack.shift(), end);
    }
  },
  onattribname(start, end) {
    currentProp = {
      type: 6,
      name: getSlice(start, end),
      nameLoc: getLoc(start, end),
      value: void 0,
      loc: getLoc(start)
    };
  },
  ondirname(start, end) {
    const raw = getSlice(start, end);
    const name = raw === "." || raw === ":" ? "bind" : raw === "@" ? "on" : raw === "#" ? "slot" : raw.slice(2);
    if (!inVPre && name === "") {
      emitError(26, start);
    }
    if (inVPre || name === "") {
      currentProp = {
        type: 6,
        name: raw,
        nameLoc: getLoc(start, end),
        value: void 0,
        loc: getLoc(start)
      };
    } else {
      currentProp = {
        type: 7,
        name,
        rawName: raw,
        exp: void 0,
        arg: void 0,
        modifiers: raw === "." ? [createSimpleExpression("prop")] : [],
        loc: getLoc(start)
      };
      if (name === "pre") {
        inVPre = tokenizer.inVPre = true;
        currentVPreBoundary = currentOpenTag;
        const props = currentOpenTag.props;
        for (let i = 0; i < props.length; i++) {
          if (props[i].type === 7) {
            props[i] = dirToAttr(props[i]);
          }
        }
      }
    }
  },
  ondirarg(start, end) {
    if (start === end) return;
    const arg = getSlice(start, end);
    if (inVPre) {
      currentProp.name += arg;
      setLocEnd(currentProp.nameLoc, end);
    } else {
      const isStatic = arg[0] !== `[`;
      currentProp.arg = createExp(
        isStatic ? arg : arg.slice(1, -1),
        isStatic,
        getLoc(start, end),
        isStatic ? 3 : 0
      );
    }
  },
  ondirmodifier(start, end) {
    const mod = getSlice(start, end);
    if (inVPre) {
      currentProp.name += "." + mod;
      setLocEnd(currentProp.nameLoc, end);
    } else if (currentProp.name === "slot") {
      const arg = currentProp.arg;
      if (arg) {
        arg.content += "." + mod;
        setLocEnd(arg.loc, end);
      }
    } else {
      const exp = createSimpleExpression(mod, true, getLoc(start, end));
      currentProp.modifiers.push(exp);
    }
  },
  onattribdata(start, end) {
    currentAttrValue += getSlice(start, end);
    if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
    currentAttrEndIndex = end;
  },
  onattribentity(char, start, end) {
    currentAttrValue += char;
    if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
    currentAttrEndIndex = end;
  },
  onattribnameend(end) {
    const start = currentProp.loc.start.offset;
    const name = getSlice(start, end);
    if (currentProp.type === 7) {
      currentProp.rawName = name;
    }
    if (currentOpenTag.props.some(
      (p) => (p.type === 7 ? p.rawName : p.name) === name
    )) {
      emitError(2, start);
    }
  },
  onattribend(quote, end) {
    if (currentOpenTag && currentProp) {
      setLocEnd(currentProp.loc, end);
      if (quote !== 0) {
        if (currentAttrValue.includes("&")) {
          currentAttrValue = currentOptions.decodeEntities(
            currentAttrValue,
            true
          );
        }
        if (currentProp.type === 6) {
          if (currentProp.name === "class") {
            currentAttrValue = condense(currentAttrValue).trim();
          }
          if (quote === 1 && !currentAttrValue) {
            emitError(13, end);
          }
          currentProp.value = {
            type: 2,
            content: currentAttrValue,
            loc: quote === 1 ? getLoc(currentAttrStartIndex, currentAttrEndIndex) : getLoc(currentAttrStartIndex - 1, currentAttrEndIndex + 1)
          };
          if (tokenizer.inSFCRoot && currentOpenTag.tag === "template" && currentProp.name === "lang" && currentAttrValue && currentAttrValue !== "html") {
            tokenizer.enterRCDATA(toCharCodes(`</template`), 0);
          }
        } else {
          let expParseMode = 0;
          currentProp.exp = createExp(
            currentAttrValue,
            false,
            getLoc(currentAttrStartIndex, currentAttrEndIndex),
            0,
            expParseMode
          );
          if (currentProp.name === "for") {
            currentProp.forParseResult = parseForExpression(currentProp.exp);
          }
          let syncIndex = -1;
          if (currentProp.name === "bind" && (syncIndex = currentProp.modifiers.findIndex(
            (mod) => mod.content === "sync"
          )) > -1 && checkCompatEnabled(
            "COMPILER_V_BIND_SYNC",
            currentOptions,
            currentProp.loc,
            currentProp.rawName
          )) {
            currentProp.name = "model";
            currentProp.modifiers.splice(syncIndex, 1);
          }
        }
      }
      if (currentProp.type !== 7 || currentProp.name !== "pre") {
        currentOpenTag.props.push(currentProp);
      }
    }
    currentAttrValue = "";
    currentAttrStartIndex = currentAttrEndIndex = -1;
  },
  oncomment(start, end) {
    if (currentOptions.comments) {
      addNode({
        type: 3,
        content: getSlice(start, end),
        loc: getLoc(start - 4, end + 3)
      });
    }
  },
  onend() {
    const end = currentInput.length;
    if (tokenizer.state !== 1) {
      switch (tokenizer.state) {
        case 5:
        case 8:
          emitError(5, end);
          break;
        case 3:
        case 4:
          emitError(
            25,
            tokenizer.sectionStart
          );
          break;
        case 28:
          if (tokenizer.currentSequence === Sequences.CdataEnd) {
            emitError(6, end);
          } else {
            emitError(7, end);
          }
          break;
        case 6:
        case 7:
        case 9:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        // "
        case 20:
        // '
        case 21:
          emitError(9, end);
          break;
      }
    }
    for (let index2 = 0; index2 < stack.length; index2++) {
      onCloseTag(stack[index2], end - 1);
      emitError(24, stack[index2].loc.start.offset);
    }
  },
  oncdata(start, end) {
    if (stack[0].ns !== 0) {
      onText(getSlice(start, end), start, end);
    } else {
      emitError(1, start - 9);
    }
  },
  onprocessinginstruction(start) {
    if ((stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
      emitError(
        21,
        start - 1
      );
    }
  }
});
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;
function parseForExpression(input) {
  const loc = input.loc;
  const exp = input.content;
  const inMatch = exp.match(forAliasRE);
  if (!inMatch) return;
  const [, LHS, RHS] = inMatch;
  const createAliasExpression = (content, offset, asParam = false) => {
    const start = loc.start.offset + offset;
    const end = start + content.length;
    return createExp(
      content,
      false,
      getLoc(start, end),
      0,
      asParam ? 1 : 0
      /* Normal */
    );
  };
  const result = {
    source: createAliasExpression(RHS.trim(), exp.indexOf(RHS, LHS.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: false
  };
  let valueContent = LHS.trim().replace(stripParensRE, "").trim();
  const trimmedOffset = LHS.indexOf(valueContent);
  const iteratorMatch = valueContent.match(forIteratorRE);
  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, "").trim();
    const keyContent = iteratorMatch[1].trim();
    let keyOffset;
    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
      result.key = createAliasExpression(keyContent, keyOffset, true);
    }
    if (iteratorMatch[2]) {
      const indexContent = iteratorMatch[2].trim();
      if (indexContent) {
        result.index = createAliasExpression(
          indexContent,
          exp.indexOf(
            indexContent,
            result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length
          ),
          true
        );
      }
    }
  }
  if (valueContent) {
    result.value = createAliasExpression(valueContent, trimmedOffset, true);
  }
  return result;
}
function getSlice(start, end) {
  return currentInput.slice(start, end);
}
function endOpenTag(end) {
  if (tokenizer.inSFCRoot) {
    currentOpenTag.innerLoc = getLoc(end + 1, end + 1);
  }
  addNode(currentOpenTag);
  const { tag, ns } = currentOpenTag;
  if (ns === 0 && currentOptions.isPreTag(tag)) {
    inPre++;
  }
  if (currentOptions.isVoidTag(tag)) {
    onCloseTag(currentOpenTag, end);
  } else {
    stack.unshift(currentOpenTag);
    if (ns === 1 || ns === 2) {
      tokenizer.inXML = true;
    }
  }
  currentOpenTag = null;
}
function onText(content, start, end) {
  {
    const tag = stack[0] && stack[0].tag;
    if (tag !== "script" && tag !== "style" && content.includes("&")) {
      content = currentOptions.decodeEntities(content, false);
    }
  }
  const parent = stack[0] || currentRoot;
  const lastNode = parent.children[parent.children.length - 1];
  if (lastNode && lastNode.type === 2) {
    lastNode.content += content;
    setLocEnd(lastNode.loc, end);
  } else {
    parent.children.push({
      type: 2,
      content,
      loc: getLoc(start, end)
    });
  }
}
function onCloseTag(el, end, isImplied = false) {
  if (isImplied) {
    setLocEnd(el.loc, backTrack(end, 60));
  } else {
    setLocEnd(el.loc, lookAhead(end, 62) + 1);
  }
  if (tokenizer.inSFCRoot) {
    if (el.children.length) {
      el.innerLoc.end = extend$1({}, el.children[el.children.length - 1].loc.end);
    } else {
      el.innerLoc.end = extend$1({}, el.innerLoc.start);
    }
    el.innerLoc.source = getSlice(
      el.innerLoc.start.offset,
      el.innerLoc.end.offset
    );
  }
  const { tag, ns, children } = el;
  if (!inVPre) {
    if (tag === "slot") {
      el.tagType = 2;
    } else if (isFragmentTemplate(el)) {
      el.tagType = 3;
    } else if (isComponent(el)) {
      el.tagType = 1;
    }
  }
  if (!tokenizer.inRCDATA) {
    el.children = condenseWhitespace(children);
  }
  if (ns === 0 && currentOptions.isIgnoreNewlineTag(tag)) {
    const first = children[0];
    if (first && first.type === 2) {
      first.content = first.content.replace(/^\r?\n/, "");
    }
  }
  if (ns === 0 && currentOptions.isPreTag(tag)) {
    inPre--;
  }
  if (currentVPreBoundary === el) {
    inVPre = tokenizer.inVPre = false;
    currentVPreBoundary = null;
  }
  if (tokenizer.inXML && (stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
    tokenizer.inXML = false;
  }
  {
    const props = el.props;
    if (isCompatEnabled(
      "COMPILER_V_IF_V_FOR_PRECEDENCE",
      currentOptions
    )) {
      let hasIf = false;
      let hasFor = false;
      for (let i = 0; i < props.length; i++) {
        const p = props[i];
        if (p.type === 7) {
          if (p.name === "if") {
            hasIf = true;
          } else if (p.name === "for") {
            hasFor = true;
          }
        }
        if (hasIf && hasFor) {
          warnDeprecation(
            "COMPILER_V_IF_V_FOR_PRECEDENCE",
            currentOptions,
            el.loc
          );
          break;
        }
      }
    }
    if (!tokenizer.inSFCRoot && isCompatEnabled(
      "COMPILER_NATIVE_TEMPLATE",
      currentOptions
    ) && el.tag === "template" && !isFragmentTemplate(el)) {
      warnDeprecation(
        "COMPILER_NATIVE_TEMPLATE",
        currentOptions,
        el.loc
      );
      const parent = stack[0] || currentRoot;
      const index2 = parent.children.indexOf(el);
      parent.children.splice(index2, 1, ...el.children);
    }
    const inlineTemplateProp = props.find(
      (p) => p.type === 6 && p.name === "inline-template"
    );
    if (inlineTemplateProp && checkCompatEnabled(
      "COMPILER_INLINE_TEMPLATE",
      currentOptions,
      inlineTemplateProp.loc
    ) && el.children.length) {
      inlineTemplateProp.value = {
        type: 2,
        content: getSlice(
          el.children[0].loc.start.offset,
          el.children[el.children.length - 1].loc.end.offset
        ),
        loc: inlineTemplateProp.loc
      };
    }
  }
}
function lookAhead(index2, c) {
  let i = index2;
  while (currentInput.charCodeAt(i) !== c && i < currentInput.length - 1) i++;
  return i;
}
function backTrack(index2, c) {
  let i = index2;
  while (currentInput.charCodeAt(i) !== c && i >= 0) i--;
  return i;
}
const specialTemplateDir = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function isFragmentTemplate({ tag, props }) {
  if (tag === "template") {
    for (let i = 0; i < props.length; i++) {
      if (props[i].type === 7 && specialTemplateDir.has(props[i].name)) {
        return true;
      }
    }
  }
  return false;
}
function isComponent({ tag, props }) {
  if (currentOptions.isCustomElement(tag)) {
    return false;
  }
  if (tag === "component" || isUpperCase(tag.charCodeAt(0)) || isCoreComponent(tag) || currentOptions.isBuiltInComponent && currentOptions.isBuiltInComponent(tag) || currentOptions.isNativeTag && !currentOptions.isNativeTag(tag)) {
    return true;
  }
  for (let i = 0; i < props.length; i++) {
    const p = props[i];
    if (p.type === 6) {
      if (p.name === "is" && p.value) {
        if (p.value.content.startsWith("vue:")) {
          return true;
        } else if (checkCompatEnabled(
          "COMPILER_IS_ON_ELEMENT",
          currentOptions,
          p.loc
        )) {
          return true;
        }
      }
    } else if (
      // :is on plain element - only treat as component in compat mode
      p.name === "bind" && isStaticArgOf(p.arg, "is") && checkCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        currentOptions,
        p.loc
      )
    ) {
      return true;
    }
  }
  return false;
}
function isUpperCase(c) {
  return c > 64 && c < 91;
}
const windowsNewlineRE = /\r\n/g;
function condenseWhitespace(nodes, tag) {
  const shouldCondense = currentOptions.whitespace !== "preserve";
  let removedWhitespace = false;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === 2) {
      if (!inPre) {
        if (isAllWhitespace(node.content)) {
          const prev = nodes[i - 1] && nodes[i - 1].type;
          const next = nodes[i + 1] && nodes[i + 1].type;
          if (!prev || !next || shouldCondense && (prev === 3 && (next === 3 || next === 1) || prev === 1 && (next === 3 || next === 1 && hasNewlineChar(node.content)))) {
            removedWhitespace = true;
            nodes[i] = null;
          } else {
            node.content = " ";
          }
        } else if (shouldCondense) {
          node.content = condense(node.content);
        }
      } else {
        node.content = node.content.replace(windowsNewlineRE, "\n");
      }
    }
  }
  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}
function isAllWhitespace(str) {
  for (let i = 0; i < str.length; i++) {
    if (!isWhitespace(str.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}
function hasNewlineChar(str) {
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c === 10 || c === 13) {
      return true;
    }
  }
  return false;
}
function condense(str) {
  let ret = "";
  let prevCharIsWhitespace = false;
  for (let i = 0; i < str.length; i++) {
    if (isWhitespace(str.charCodeAt(i))) {
      if (!prevCharIsWhitespace) {
        ret += " ";
        prevCharIsWhitespace = true;
      }
    } else {
      ret += str[i];
      prevCharIsWhitespace = false;
    }
  }
  return ret;
}
function addNode(node) {
  (stack[0] || currentRoot).children.push(node);
}
function getLoc(start, end) {
  return {
    start: tokenizer.getPos(start),
    // @ts-expect-error allow late attachment
    end: end == null ? end : tokenizer.getPos(end),
    // @ts-expect-error allow late attachment
    source: end == null ? end : getSlice(start, end)
  };
}
function cloneLoc(loc) {
  return getLoc(loc.start.offset, loc.end.offset);
}
function setLocEnd(loc, end) {
  loc.end = tokenizer.getPos(end);
  loc.source = getSlice(loc.start.offset, end);
}
function dirToAttr(dir) {
  const attr = {
    type: 6,
    name: dir.rawName,
    nameLoc: getLoc(
      dir.loc.start.offset,
      dir.loc.start.offset + dir.rawName.length
    ),
    value: void 0,
    loc: dir.loc
  };
  if (dir.exp) {
    const loc = dir.exp.loc;
    if (loc.end.offset < dir.loc.end.offset) {
      loc.start.offset--;
      loc.start.column--;
      loc.end.offset++;
      loc.end.column++;
    }
    attr.value = {
      type: 2,
      content: dir.exp.content,
      loc
    };
  }
  return attr;
}
function createExp(content, isStatic = false, loc, constType = 0, parseMode = 0) {
  const exp = createSimpleExpression(content, isStatic, loc, constType);
  return exp;
}
function emitError(code, index2, message) {
  currentOptions.onError(
    createCompilerError(code, getLoc(index2, index2), void 0, message)
  );
}
function reset() {
  tokenizer.reset();
  currentOpenTag = null;
  currentProp = null;
  currentAttrValue = "";
  currentAttrStartIndex = -1;
  currentAttrEndIndex = -1;
  stack.length = 0;
}
function baseParse(input, options) {
  reset();
  currentInput = input;
  currentOptions = extend$1({}, defaultParserOptions);
  if (options) {
    let key;
    for (key in options) {
      if (options[key] != null) {
        currentOptions[key] = options[key];
      }
    }
  }
  {
    if (!currentOptions.decodeEntities) {
      throw new Error(
        `[@vue/compiler-core] decodeEntities option is required in browser builds.`
      );
    }
  }
  tokenizer.mode = currentOptions.parseMode === "html" ? 1 : currentOptions.parseMode === "sfc" ? 2 : 0;
  tokenizer.inXML = currentOptions.ns === 1 || currentOptions.ns === 2;
  const delimiters = options && options.delimiters;
  if (delimiters) {
    tokenizer.delimiterOpen = toCharCodes(delimiters[0]);
    tokenizer.delimiterClose = toCharCodes(delimiters[1]);
  }
  const root = currentRoot = createRoot([], input);
  tokenizer.parse(currentInput);
  root.loc = getLoc(0, input.length);
  root.children = condenseWhitespace(root.children);
  currentRoot = null;
  return root;
}
function cacheStatic(root, context) {
  walk(
    root,
    void 0,
    context,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    isSingleElementRoot(root, root.children[0])
  );
}
function isSingleElementRoot(root, child) {
  const { children } = root;
  return children.length === 1 && child.type === 1 && !isSlotOutlet(child);
}
function walk(node, parent, context, doNotHoistNode = false, inFor = false) {
  const { children } = node;
  const toCache = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === 1 && child.tagType === 0) {
      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
      if (constantType > 0) {
        if (constantType >= 2) {
          child.codegenNode.patchFlag = -1;
          toCache.push(child);
          continue;
        }
      } else {
        const codegenNode = child.codegenNode;
        if (codegenNode.type === 13) {
          const flag = codegenNode.patchFlag;
          if ((flag === void 0 || flag === 512 || flag === 1) && getGeneratedPropsConstantType(child, context) >= 2) {
            const props = getNodeProps(child);
            if (props) {
              codegenNode.props = context.hoist(props);
            }
          }
          if (codegenNode.dynamicProps) {
            codegenNode.dynamicProps = context.hoist(codegenNode.dynamicProps);
          }
        }
      }
    } else if (child.type === 12) {
      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
      if (constantType >= 2) {
        toCache.push(child);
        continue;
      }
    }
    if (child.type === 1) {
      const isComponent2 = child.tagType === 1;
      if (isComponent2) {
        context.scopes.vSlot++;
      }
      walk(child, node, context, false, inFor);
      if (isComponent2) {
        context.scopes.vSlot--;
      }
    } else if (child.type === 11) {
      walk(child, node, context, child.children.length === 1, true);
    } else if (child.type === 9) {
      for (let i2 = 0; i2 < child.branches.length; i2++) {
        walk(
          child.branches[i2],
          node,
          context,
          child.branches[i2].children.length === 1,
          inFor
        );
      }
    }
  }
  let cachedAsArray = false;
  if (toCache.length === children.length && node.type === 1) {
    if (node.tagType === 0 && node.codegenNode && node.codegenNode.type === 13 && isArray(node.codegenNode.children)) {
      node.codegenNode.children = getCacheExpression(
        createArrayExpression(node.codegenNode.children)
      );
      cachedAsArray = true;
    } else if (node.tagType === 1 && node.codegenNode && node.codegenNode.type === 13 && node.codegenNode.children && !isArray(node.codegenNode.children) && node.codegenNode.children.type === 15) {
      const slot = getSlotNode(node.codegenNode, "default");
      if (slot) {
        slot.returns = getCacheExpression(
          createArrayExpression(slot.returns)
        );
        cachedAsArray = true;
      }
    } else if (node.tagType === 3 && parent && parent.type === 1 && parent.tagType === 1 && parent.codegenNode && parent.codegenNode.type === 13 && parent.codegenNode.children && !isArray(parent.codegenNode.children) && parent.codegenNode.children.type === 15) {
      const slotName = findDir(node, "slot", true);
      const slot = slotName && slotName.arg && getSlotNode(parent.codegenNode, slotName.arg);
      if (slot) {
        slot.returns = getCacheExpression(
          createArrayExpression(slot.returns)
        );
        cachedAsArray = true;
      }
    }
  }
  if (!cachedAsArray) {
    for (const child of toCache) {
      child.codegenNode = context.cache(child.codegenNode);
    }
  }
  function getCacheExpression(value) {
    const exp = context.cache(value);
    if (inFor && context.hmr) {
      exp.needArraySpread = true;
    }
    return exp;
  }
  function getSlotNode(node2, name) {
    if (node2.children && !isArray(node2.children) && node2.children.type === 15) {
      const slot = node2.children.properties.find(
        (p) => p.key === name || p.key.content === name
      );
      return slot && slot.value;
    }
  }
  if (toCache.length && context.transformHoist) {
    context.transformHoist(children, context, node);
  }
}
function getConstantType(node, context) {
  const { constantCache } = context;
  switch (node.type) {
    case 1:
      if (node.tagType !== 0) {
        return 0;
      }
      const cached = constantCache.get(node);
      if (cached !== void 0) {
        return cached;
      }
      const codegenNode = node.codegenNode;
      if (codegenNode.type !== 13) {
        return 0;
      }
      if (codegenNode.isBlock && node.tag !== "svg" && node.tag !== "foreignObject" && node.tag !== "math") {
        return 0;
      }
      if (codegenNode.patchFlag === void 0) {
        let returnType2 = 3;
        const generatedPropsType = getGeneratedPropsConstantType(node, context);
        if (generatedPropsType === 0) {
          constantCache.set(node, 0);
          return 0;
        }
        if (generatedPropsType < returnType2) {
          returnType2 = generatedPropsType;
        }
        for (let i = 0; i < node.children.length; i++) {
          const childType = getConstantType(node.children[i], context);
          if (childType === 0) {
            constantCache.set(node, 0);
            return 0;
          }
          if (childType < returnType2) {
            returnType2 = childType;
          }
        }
        if (returnType2 > 1) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];
            if (p.type === 7 && p.name === "bind" && p.exp) {
              const expType = getConstantType(p.exp, context);
              if (expType === 0) {
                constantCache.set(node, 0);
                return 0;
              }
              if (expType < returnType2) {
                returnType2 = expType;
              }
            }
          }
        }
        if (codegenNode.isBlock) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];
            if (p.type === 7) {
              constantCache.set(node, 0);
              return 0;
            }
          }
          context.removeHelper(OPEN_BLOCK);
          context.removeHelper(
            getVNodeBlockHelper(context.inSSR, codegenNode.isComponent)
          );
          codegenNode.isBlock = false;
          context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
        }
        constantCache.set(node, returnType2);
        return returnType2;
      } else {
        constantCache.set(node, 0);
        return 0;
      }
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return getConstantType(node.content, context);
    case 4:
      return node.constType;
    case 8:
      let returnType = 3;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (isString(child) || isSymbol(child)) {
          continue;
        }
        const childType = getConstantType(child, context);
        if (childType === 0) {
          return 0;
        } else if (childType < returnType) {
          returnType = childType;
        }
      }
      return returnType;
    case 20:
      return 2;
    default:
      return 0;
  }
}
const allowHoistedHelperSet = /* @__PURE__ */ new Set([
  NORMALIZE_CLASS,
  NORMALIZE_STYLE,
  NORMALIZE_PROPS,
  GUARD_REACTIVE_PROPS
]);
function getConstantTypeOfHelperCall(value, context) {
  if (value.type === 14 && !isString(value.callee) && allowHoistedHelperSet.has(value.callee)) {
    const arg = value.arguments[0];
    if (arg.type === 4) {
      return getConstantType(arg, context);
    } else if (arg.type === 14) {
      return getConstantTypeOfHelperCall(arg, context);
    }
  }
  return 0;
}
function getGeneratedPropsConstantType(node, context) {
  let returnType = 3;
  const props = getNodeProps(node);
  if (props && props.type === 15) {
    const { properties } = props;
    for (let i = 0; i < properties.length; i++) {
      const { key, value } = properties[i];
      const keyType = getConstantType(key, context);
      if (keyType === 0) {
        return keyType;
      }
      if (keyType < returnType) {
        returnType = keyType;
      }
      let valueType;
      if (value.type === 4) {
        valueType = getConstantType(value, context);
      } else if (value.type === 14) {
        valueType = getConstantTypeOfHelperCall(value, context);
      } else {
        valueType = 0;
      }
      if (valueType === 0) {
        return valueType;
      }
      if (valueType < returnType) {
        returnType = valueType;
      }
    }
  }
  return returnType;
}
function getNodeProps(node) {
  const codegenNode = node.codegenNode;
  if (codegenNode.type === 13) {
    return codegenNode.props;
  }
}
function createTransformContext(root, {
  filename = "",
  prefixIdentifiers = false,
  hoistStatic = false,
  hmr = false,
  cacheHandlers = false,
  nodeTransforms = [],
  directiveTransforms = {},
  transformHoist = null,
  isBuiltInComponent = NOOP,
  isCustomElement = NOOP,
  expressionPlugins = [],
  scopeId = null,
  slotted = true,
  ssr = false,
  inSSR = false,
  ssrCssVars = ``,
  bindingMetadata = EMPTY_OBJ,
  inline = false,
  isTS = false,
  onError = defaultOnError,
  onWarn = defaultOnWarn,
  compatConfig
}) {
  const nameMatch = filename.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/);
  const context = {
    // options
    filename,
    selfName: nameMatch && capitalize(camelize(nameMatch[1])),
    prefixIdentifiers,
    hoistStatic,
    hmr,
    cacheHandlers,
    nodeTransforms,
    directiveTransforms,
    transformHoist,
    isBuiltInComponent,
    isCustomElement,
    expressionPlugins,
    scopeId,
    slotted,
    ssr,
    inSSR,
    ssrCssVars,
    bindingMetadata,
    inline,
    isTS,
    onError,
    onWarn,
    compatConfig,
    // state
    root,
    helpers: /* @__PURE__ */ new Map(),
    components: /* @__PURE__ */ new Set(),
    directives: /* @__PURE__ */ new Set(),
    hoists: [],
    imports: [],
    cached: [],
    constantCache: /* @__PURE__ */ new WeakMap(),
    temps: 0,
    identifiers: /* @__PURE__ */ Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    grandParent: null,
    currentNode: root,
    childIndex: 0,
    inVOnce: false,
    // methods
    helper(name) {
      const count = context.helpers.get(name) || 0;
      context.helpers.set(name, count + 1);
      return name;
    },
    removeHelper(name) {
      const count = context.helpers.get(name);
      if (count) {
        const currentCount = count - 1;
        if (!currentCount) {
          context.helpers.delete(name);
        } else {
          context.helpers.set(name, currentCount);
        }
      }
    },
    helperString(name) {
      return `_${helperNameMap[context.helper(name)]}`;
    },
    replaceNode(node) {
      {
        if (!context.currentNode) {
          throw new Error(`Node being replaced is already removed.`);
        }
        if (!context.parent) {
          throw new Error(`Cannot replace root node.`);
        }
      }
      context.parent.children[context.childIndex] = context.currentNode = node;
    },
    removeNode(node) {
      if (!context.parent) {
        throw new Error(`Cannot remove root node.`);
      }
      const list = context.parent.children;
      const removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
      if (removalIndex < 0) {
        throw new Error(`node being removed is not a child of current parent`);
      }
      if (!node || node === context.currentNode) {
        context.currentNode = null;
        context.onNodeRemoved();
      } else {
        if (context.childIndex > removalIndex) {
          context.childIndex--;
          context.onNodeRemoved();
        }
      }
      context.parent.children.splice(removalIndex, 1);
    },
    onNodeRemoved: NOOP,
    addIdentifiers(exp) {
    },
    removeIdentifiers(exp) {
    },
    hoist(exp) {
      if (isString(exp)) exp = createSimpleExpression(exp);
      context.hoists.push(exp);
      const identifier = createSimpleExpression(
        `_hoisted_${context.hoists.length}`,
        false,
        exp.loc,
        2
      );
      identifier.hoisted = exp;
      return identifier;
    },
    cache(exp, isVNode = false, inVOnce = false) {
      const cacheExp = createCacheExpression(
        context.cached.length,
        exp,
        isVNode,
        inVOnce
      );
      context.cached.push(cacheExp);
      return cacheExp;
    }
  };
  {
    context.filters = /* @__PURE__ */ new Set();
  }
  return context;
}
function transform(root, options) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);
  if (options.hoistStatic) {
    cacheStatic(root, context);
  }
  if (!options.ssr) {
    createRootCodegen(root, context);
  }
  root.helpers = /* @__PURE__ */ new Set([...context.helpers.keys()]);
  root.components = [...context.components];
  root.directives = [...context.directives];
  root.imports = context.imports;
  root.hoists = context.hoists;
  root.temps = context.temps;
  root.cached = context.cached;
  root.transformed = true;
  {
    root.filters = [...context.filters];
  }
}
function createRootCodegen(root, context) {
  const { helper } = context;
  const { children } = root;
  if (children.length === 1) {
    const child = children[0];
    if (isSingleElementRoot(root, child) && child.codegenNode) {
      const codegenNode = child.codegenNode;
      if (codegenNode.type === 13) {
        convertToBlock(codegenNode, context);
      }
      root.codegenNode = codegenNode;
    } else {
      root.codegenNode = child;
    }
  } else if (children.length > 1) {
    let patchFlag = 64;
    if (children.filter((c) => c.type !== 3).length === 1) {
      patchFlag |= 2048;
    }
    root.codegenNode = createVNodeCall(
      context,
      helper(FRAGMENT),
      void 0,
      root.children,
      patchFlag,
      void 0,
      void 0,
      true,
      void 0,
      false
    );
  } else ;
}
function traverseChildren(parent, context) {
  let i = 0;
  const nodeRemoved = () => {
    i--;
  };
  for (; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (isString(child)) continue;
    context.grandParent = context.parent;
    context.parent = parent;
    context.childIndex = i;
    context.onNodeRemoved = nodeRemoved;
    traverseNode(child, context);
  }
}
function traverseNode(node, context) {
  context.currentNode = node;
  const { nodeTransforms } = context;
  const exitFns = [];
  for (let i2 = 0; i2 < nodeTransforms.length; i2++) {
    const onExit = nodeTransforms[i2](node, context);
    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push(...onExit);
      } else {
        exitFns.push(onExit);
      }
    }
    if (!context.currentNode) {
      return;
    } else {
      node = context.currentNode;
    }
  }
  switch (node.type) {
    case 3:
      if (!context.ssr) {
        context.helper(CREATE_COMMENT);
      }
      break;
    case 5:
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING);
      }
      break;
    // for container types, further traverse downwards
    case 9:
      for (let i2 = 0; i2 < node.branches.length; i2++) {
        traverseNode(node.branches[i2], context);
      }
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      traverseChildren(node, context);
      break;
  }
  context.currentNode = node;
  let i = exitFns.length;
  while (i--) {
    exitFns[i]();
  }
}
function createStructuralDirectiveTransform(name, fn) {
  const matches2 = isString(name) ? (n) => n === name : (n) => name.test(n);
  return (node, context) => {
    if (node.type === 1) {
      const { props } = node;
      if (node.tagType === 3 && props.some(isVSlot)) {
        return;
      }
      const exitFns = [];
      for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        if (prop.type === 7 && matches2(prop.name)) {
          props.splice(i, 1);
          i--;
          const onExit = fn(node, prop, context);
          if (onExit) exitFns.push(onExit);
        }
      }
      return exitFns;
    }
  };
}
const PURE_ANNOTATION = `/*@__PURE__*/`;
const aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;
function createCodegenContext(ast, {
  mode = "function",
  prefixIdentifiers = mode === "module",
  sourceMap = false,
  filename = `template.vue.html`,
  scopeId = null,
  optimizeImports = false,
  runtimeGlobalName = `Vue`,
  runtimeModuleName = `vue`,
  ssrRuntimeModuleName = "vue/server-renderer",
  ssr = false,
  isTS = false,
  inSSR = false
}) {
  const context = {
    mode,
    prefixIdentifiers,
    sourceMap,
    filename,
    scopeId,
    optimizeImports,
    runtimeGlobalName,
    runtimeModuleName,
    ssrRuntimeModuleName,
    ssr,
    isTS,
    inSSR,
    source: ast.source,
    code: ``,
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: false,
    map: void 0,
    helper(key) {
      return `_${helperNameMap[key]}`;
    },
    push(code, newlineIndex = -2, node) {
      context.code += code;
    },
    indent() {
      newline(++context.indentLevel);
    },
    deindent(withoutNewLine = false) {
      if (withoutNewLine) {
        --context.indentLevel;
      } else {
        newline(--context.indentLevel);
      }
    },
    newline() {
      newline(context.indentLevel);
    }
  };
  function newline(n) {
    context.push(
      "\n" + `  `.repeat(n),
      0
      /* Start */
    );
  }
  return context;
}
function generate(ast, options = {}) {
  const context = createCodegenContext(ast, options);
  if (options.onContextCreated) options.onContextCreated(context);
  const {
    mode,
    push,
    prefixIdentifiers,
    indent,
    deindent,
    newline,
    scopeId,
    ssr
  } = context;
  const helpers = Array.from(ast.helpers);
  const hasHelpers = helpers.length > 0;
  const useWithBlock = !prefixIdentifiers && mode !== "module";
  const preambleContext = context;
  {
    genFunctionPreamble(ast, preambleContext);
  }
  const functionName = ssr ? `ssrRender` : `render`;
  const args = ssr ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"];
  const signature = args.join(", ");
  {
    push(`function ${functionName}(${signature}) {`);
  }
  indent();
  if (useWithBlock) {
    push(`with (_ctx) {`);
    indent();
    if (hasHelpers) {
      push(
        `const { ${helpers.map(aliasHelper).join(", ")} } = _Vue
`,
        -1
        /* End */
      );
      newline();
    }
  }
  if (ast.components.length) {
    genAssets(ast.components, "component", context);
    if (ast.directives.length || ast.temps > 0) {
      newline();
    }
  }
  if (ast.directives.length) {
    genAssets(ast.directives, "directive", context);
    if (ast.temps > 0) {
      newline();
    }
  }
  if (ast.filters && ast.filters.length) {
    newline();
    genAssets(ast.filters, "filter", context);
    newline();
  }
  if (ast.temps > 0) {
    push(`let `);
    for (let i = 0; i < ast.temps; i++) {
      push(`${i > 0 ? `, ` : ``}_temp${i}`);
    }
  }
  if (ast.components.length || ast.directives.length || ast.temps) {
    push(
      `
`,
      0
      /* Start */
    );
    newline();
  }
  if (!ssr) {
    push(`return `);
  }
  if (ast.codegenNode) {
    genNode(ast.codegenNode, context);
  } else {
    push(`null`);
  }
  if (useWithBlock) {
    deindent();
    push(`}`);
  }
  deindent();
  push(`}`);
  return {
    ast,
    code: context.code,
    preamble: ``,
    map: context.map ? context.map.toJSON() : void 0
  };
}
function genFunctionPreamble(ast, context) {
  const {
    ssr,
    prefixIdentifiers,
    push,
    newline,
    runtimeModuleName,
    runtimeGlobalName,
    ssrRuntimeModuleName
  } = context;
  const VueBinding = runtimeGlobalName;
  const helpers = Array.from(ast.helpers);
  if (helpers.length > 0) {
    {
      push(
        `const _Vue = ${VueBinding}
`,
        -1
        /* End */
      );
      if (ast.hoists.length) {
        const staticHelpers = [
          CREATE_VNODE,
          CREATE_ELEMENT_VNODE,
          CREATE_COMMENT,
          CREATE_TEXT,
          CREATE_STATIC
        ].filter((helper) => helpers.includes(helper)).map(aliasHelper).join(", ");
        push(
          `const { ${staticHelpers} } = _Vue
`,
          -1
          /* End */
        );
      }
    }
  }
  genHoists(ast.hoists, context);
  newline();
  push(`return `);
}
function genAssets(assets, type, { helper, push, newline, isTS }) {
  const resolver = helper(
    type === "filter" ? RESOLVE_FILTER : type === "component" ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE
  );
  for (let i = 0; i < assets.length; i++) {
    let id = assets[i];
    const maybeSelfReference = id.endsWith("__self");
    if (maybeSelfReference) {
      id = id.slice(0, -6);
    }
    push(
      `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`
    );
    if (i < assets.length - 1) {
      newline();
    }
  }
}
function genHoists(hoists, context) {
  if (!hoists.length) {
    return;
  }
  context.pure = true;
  const { push, newline } = context;
  newline();
  for (let i = 0; i < hoists.length; i++) {
    const exp = hoists[i];
    if (exp) {
      push(`const _hoisted_${i + 1} = `);
      genNode(exp, context);
      newline();
    }
  }
  context.pure = false;
}
function isText(n) {
  return isString(n) || n.type === 4 || n.type === 2 || n.type === 5 || n.type === 8;
}
function genNodeListAsArray(nodes, context) {
  const multilines = nodes.length > 3 || nodes.some((n) => isArray(n) || !isText(n));
  context.push(`[`);
  multilines && context.indent();
  genNodeList(nodes, context, multilines);
  multilines && context.deindent();
  context.push(`]`);
}
function genNodeList(nodes, context, multilines = false, comma = true) {
  const { push, newline } = context;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (isString(node)) {
      push(
        node,
        -3
        /* Unknown */
      );
    } else if (isArray(node)) {
      genNodeListAsArray(node, context);
    } else {
      genNode(node, context);
    }
    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(",");
        newline();
      } else {
        comma && push(", ");
      }
    }
  }
}
function genNode(node, context) {
  if (isString(node)) {
    context.push(
      node,
      -3
      /* Unknown */
    );
    return;
  }
  if (isSymbol(node)) {
    context.push(context.helper(node));
    return;
  }
  switch (node.type) {
    case 1:
    case 9:
    case 11:
      assert(
        node.codegenNode != null,
        `Codegen node is missing for element/if/for node. Apply appropriate transforms first.`
      );
      genNode(node.codegenNode, context);
      break;
    case 2:
      genText(node, context);
      break;
    case 4:
      genExpression(node, context);
      break;
    case 5:
      genInterpolation(node, context);
      break;
    case 12:
      genNode(node.codegenNode, context);
      break;
    case 8:
      genCompoundExpression(node, context);
      break;
    case 3:
      genComment(node, context);
      break;
    case 13:
      genVNodeCall(node, context);
      break;
    case 14:
      genCallExpression(node, context);
      break;
    case 15:
      genObjectExpression(node, context);
      break;
    case 17:
      genArrayExpression(node, context);
      break;
    case 18:
      genFunctionExpression(node, context);
      break;
    case 19:
      genConditionalExpression(node, context);
      break;
    case 20:
      genCacheExpression(node, context);
      break;
    case 21:
      genNodeList(node.body, context, true, false);
      break;
    // SSR only types
    case 22:
      break;
    case 23:
      break;
    case 24:
      break;
    case 25:
      break;
    case 26:
      break;
    /* v8 ignore start */
    case 10:
      break;
    default: {
      assert(false, `unhandled codegen node type: ${node.type}`);
      const exhaustiveCheck = node;
      return exhaustiveCheck;
    }
  }
}
function genText(node, context) {
  context.push(JSON.stringify(node.content), -3, node);
}
function genExpression(node, context) {
  const { content, isStatic } = node;
  context.push(
    isStatic ? JSON.stringify(content) : content,
    -3,
    node
  );
}
function genInterpolation(node, context) {
  const { push, helper, pure } = context;
  if (pure) push(PURE_ANNOTATION);
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(`)`);
}
function genCompoundExpression(node, context) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (isString(child)) {
      context.push(
        child,
        -3
        /* Unknown */
      );
    } else {
      genNode(child, context);
    }
  }
}
function genExpressionAsPropertyKey(node, context) {
  const { push } = context;
  if (node.type === 8) {
    push(`[`);
    genCompoundExpression(node, context);
    push(`]`);
  } else if (node.isStatic) {
    const text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
    push(text, -2, node);
  } else {
    push(`[${node.content}]`, -3, node);
  }
}
function genComment(node, context) {
  const { push, helper, pure } = context;
  if (pure) {
    push(PURE_ANNOTATION);
  }
  push(
    `${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`,
    -3,
    node
  );
}
function genVNodeCall(node, context) {
  const { push, helper, pure } = context;
  const {
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent: isComponent2
  } = node;
  let patchFlagString;
  if (patchFlag) {
    {
      if (patchFlag < 0) {
        patchFlagString = patchFlag + ` /* ${PatchFlagNames[patchFlag]} */`;
      } else {
        const flagNames = Object.keys(PatchFlagNames).map(Number).filter((n) => n > 0 && patchFlag & n).map((n) => PatchFlagNames[n]).join(`, `);
        patchFlagString = patchFlag + ` /* ${flagNames} */`;
      }
    }
  }
  if (directives) {
    push(helper(WITH_DIRECTIVES) + `(`);
  }
  if (isBlock) {
    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `);
  }
  if (pure) {
    push(PURE_ANNOTATION);
  }
  const callHelper = isBlock ? getVNodeBlockHelper(context.inSSR, isComponent2) : getVNodeHelper(context.inSSR, isComponent2);
  push(helper(callHelper) + `(`, -2, node);
  genNodeList(
    genNullableArgs([tag, props, children, patchFlagString, dynamicProps]),
    context
  );
  push(`)`);
  if (isBlock) {
    push(`)`);
  }
  if (directives) {
    push(`, `);
    genNode(directives, context);
    push(`)`);
  }
}
function genNullableArgs(args) {
  let i = args.length;
  while (i--) {
    if (args[i] != null) break;
  }
  return args.slice(0, i + 1).map((arg) => arg || `null`);
}
function genCallExpression(node, context) {
  const { push, helper, pure } = context;
  const callee = isString(node.callee) ? node.callee : helper(node.callee);
  if (pure) {
    push(PURE_ANNOTATION);
  }
  push(callee + `(`, -2, node);
  genNodeList(node.arguments, context);
  push(`)`);
}
function genObjectExpression(node, context) {
  const { push, indent, deindent, newline } = context;
  const { properties } = node;
  if (!properties.length) {
    push(`{}`, -2, node);
    return;
  }
  const multilines = properties.length > 1 || properties.some((p) => p.value.type !== 4);
  push(multilines ? `{` : `{ `);
  multilines && indent();
  for (let i = 0; i < properties.length; i++) {
    const { key, value } = properties[i];
    genExpressionAsPropertyKey(key, context);
    push(`: `);
    genNode(value, context);
    if (i < properties.length - 1) {
      push(`,`);
      newline();
    }
  }
  multilines && deindent();
  push(multilines ? `}` : ` }`);
}
function genArrayExpression(node, context) {
  genNodeListAsArray(node.elements, context);
}
function genFunctionExpression(node, context) {
  const { push, indent, deindent } = context;
  const { params, returns, body, newline, isSlot } = node;
  if (isSlot) {
    push(`_${helperNameMap[WITH_CTX]}(`);
  }
  push(`(`, -2, node);
  if (isArray(params)) {
    genNodeList(params, context);
  } else if (params) {
    genNode(params, context);
  }
  push(`) => `);
  if (newline || body) {
    push(`{`);
    indent();
  }
  if (returns) {
    if (newline) {
      push(`return `);
    }
    if (isArray(returns)) {
      genNodeListAsArray(returns, context);
    } else {
      genNode(returns, context);
    }
  } else if (body) {
    genNode(body, context);
  }
  if (newline || body) {
    deindent();
    push(`}`);
  }
  if (isSlot) {
    if (node.isNonScopedSlot) {
      push(`, undefined, true`);
    }
    push(`)`);
  }
}
function genConditionalExpression(node, context) {
  const { test, consequent, alternate, newline: needNewline } = node;
  const { push, indent, deindent, newline } = context;
  if (test.type === 4) {
    const needsParens = !isSimpleIdentifier(test.content);
    needsParens && push(`(`);
    genExpression(test, context);
    needsParens && push(`)`);
  } else {
    push(`(`);
    genNode(test, context);
    push(`)`);
  }
  needNewline && indent();
  context.indentLevel++;
  needNewline || push(` `);
  push(`? `);
  genNode(consequent, context);
  context.indentLevel--;
  needNewline && newline();
  needNewline || push(` `);
  push(`: `);
  const isNested = alternate.type === 19;
  if (!isNested) {
    context.indentLevel++;
  }
  genNode(alternate, context);
  if (!isNested) {
    context.indentLevel--;
  }
  needNewline && deindent(
    true
    /* without newline */
  );
}
function genCacheExpression(node, context) {
  const { push, helper, indent, deindent, newline } = context;
  const { needPauseTracking, needArraySpread } = node;
  if (needArraySpread) {
    push(`[...(`);
  }
  push(`_cache[${node.index}] || (`);
  if (needPauseTracking) {
    indent();
    push(`${helper(SET_BLOCK_TRACKING)}(-1`);
    if (node.inVOnce) push(`, true`);
    push(`),`);
    newline();
    push(`(`);
  }
  push(`_cache[${node.index}] = `);
  genNode(node.value, context);
  if (needPauseTracking) {
    push(`).cacheIndex = ${node.index},`);
    newline();
    push(`${helper(SET_BLOCK_TRACKING)}(1),`);
    newline();
    push(`_cache[${node.index}]`);
    deindent();
  }
  push(`)`);
  if (needArraySpread) {
    push(`)]`);
  }
}
const prohibitedKeywordRE = new RegExp(
  "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
);
const stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
function validateBrowserExpression(node, context, asParams = false, asRawStatements = false) {
  const exp = node.content;
  if (!exp.trim()) {
    return;
  }
  try {
    new Function(
      asRawStatements ? ` ${exp} ` : `return ${asParams ? `(${exp}) => {}` : `(${exp})`}`
    );
  } catch (e) {
    let message = e.message;
    const keywordMatch = exp.replace(stripStringRE, "").match(prohibitedKeywordRE);
    if (keywordMatch) {
      message = `avoid using JavaScript keyword as property name: "${keywordMatch[0]}"`;
    }
    context.onError(
      createCompilerError(
        45,
        node.loc,
        void 0,
        message
      )
    );
  }
}
const transformExpression = (node, context) => {
  if (node.type === 5) {
    node.content = processExpression(
      node.content,
      context
    );
  } else if (node.type === 1) {
    const memo = findDir(node, "memo");
    for (let i = 0; i < node.props.length; i++) {
      const dir = node.props[i];
      if (dir.type === 7 && dir.name !== "for") {
        const exp = dir.exp;
        const arg = dir.arg;
        if (exp && exp.type === 4 && !(dir.name === "on" && arg) && // key has been processed in transformFor(vMemo + vFor)
        !(memo && arg && arg.type === 4 && arg.content === "key")) {
          dir.exp = processExpression(
            exp,
            context,
            // slot args must be processed as function params
            dir.name === "slot"
          );
        }
        if (arg && arg.type === 4 && !arg.isStatic) {
          dir.arg = processExpression(arg, context);
        }
      }
    }
  }
};
function processExpression(node, context, asParams = false, asRawStatements = false, localVars = Object.create(context.identifiers)) {
  {
    {
      validateBrowserExpression(node, context, asParams, asRawStatements);
    }
    return node;
  }
}
function stringifyExpression(exp) {
  if (isString(exp)) {
    return exp;
  } else if (exp.type === 4) {
    return exp.content;
  } else {
    return exp.children.map(stringifyExpression).join("");
  }
}
const transformIf = createStructuralDirectiveTransform(
  /^(if|else|else-if)$/,
  (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
      const siblings = context.parent.children;
      let i = siblings.indexOf(ifNode);
      let key = 0;
      while (i-- >= 0) {
        const sibling = siblings[i];
        if (sibling && sibling.type === 9) {
          key += sibling.branches.length;
        }
      }
      return () => {
        if (isRoot) {
          ifNode.codegenNode = createCodegenNodeForBranch(
            branch,
            key,
            context
          );
        } else {
          const parentCondition = getParentCondition(ifNode.codegenNode);
          parentCondition.alternate = createCodegenNodeForBranch(
            branch,
            key + ifNode.branches.length - 1,
            context
          );
        }
      };
    });
  }
);
function processIf(node, dir, context, processCodegen) {
  if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
    const loc = dir.exp ? dir.exp.loc : node.loc;
    context.onError(
      createCompilerError(28, dir.loc)
    );
    dir.exp = createSimpleExpression(`true`, false, loc);
  }
  if (dir.exp) {
    validateBrowserExpression(dir.exp, context);
  }
  if (dir.name === "if") {
    const branch = createIfBranch(node, dir);
    const ifNode = {
      type: 9,
      loc: cloneLoc(node.loc),
      branches: [branch]
    };
    context.replaceNode(ifNode);
    if (processCodegen) {
      return processCodegen(ifNode, branch, true);
    }
  } else {
    const siblings = context.parent.children;
    const comments = [];
    let i = siblings.indexOf(node);
    while (i-- >= -1) {
      const sibling = siblings[i];
      if (sibling && sibling.type === 3) {
        context.removeNode(sibling);
        comments.unshift(sibling);
        continue;
      }
      if (sibling && sibling.type === 2 && !sibling.content.trim().length) {
        context.removeNode(sibling);
        continue;
      }
      if (sibling && sibling.type === 9) {
        if (dir.name === "else-if" && sibling.branches[sibling.branches.length - 1].condition === void 0) {
          context.onError(
            createCompilerError(30, node.loc)
          );
        }
        context.removeNode();
        const branch = createIfBranch(node, dir);
        if (comments.length && // #3619 ignore comments if the v-if is direct child of <transition>
        !(context.parent && context.parent.type === 1 && (context.parent.tag === "transition" || context.parent.tag === "Transition"))) {
          branch.children = [...comments, ...branch.children];
        }
        {
          const key = branch.userKey;
          if (key) {
            sibling.branches.forEach(({ userKey }) => {
              if (isSameKey(userKey, key)) {
                context.onError(
                  createCompilerError(
                    29,
                    branch.userKey.loc
                  )
                );
              }
            });
          }
        }
        sibling.branches.push(branch);
        const onExit = processCodegen && processCodegen(sibling, branch, false);
        traverseNode(branch, context);
        if (onExit) onExit();
        context.currentNode = null;
      } else {
        context.onError(
          createCompilerError(30, node.loc)
        );
      }
      break;
    }
  }
}
function createIfBranch(node, dir) {
  const isTemplateIf = node.tagType === 3;
  return {
    type: 10,
    loc: node.loc,
    condition: dir.name === "else" ? void 0 : dir.exp,
    children: isTemplateIf && !findDir(node, "for") ? node.children : [node],
    userKey: findProp(node, `key`),
    isTemplateIf
  };
}
function createCodegenNodeForBranch(branch, keyIndex, context) {
  if (branch.condition) {
    return createConditionalExpression(
      branch.condition,
      createChildrenCodegenNode(branch, keyIndex, context),
      // make sure to pass in asBlock: true so that the comment node call
      // closes the current block.
      createCallExpression(context.helper(CREATE_COMMENT), [
        '"v-if"',
        "true"
      ])
    );
  } else {
    return createChildrenCodegenNode(branch, keyIndex, context);
  }
}
function createChildrenCodegenNode(branch, keyIndex, context) {
  const { helper } = context;
  const keyProperty = createObjectProperty(
    `key`,
    createSimpleExpression(
      `${keyIndex}`,
      false,
      locStub,
      2
    )
  );
  const { children } = branch;
  const firstChild = children[0];
  const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1;
  if (needFragmentWrapper) {
    if (children.length === 1 && firstChild.type === 11) {
      const vnodeCall = firstChild.codegenNode;
      injectProp(vnodeCall, keyProperty, context);
      return vnodeCall;
    } else {
      let patchFlag = 64;
      if (!branch.isTemplateIf && children.filter((c) => c.type !== 3).length === 1) {
        patchFlag |= 2048;
      }
      return createVNodeCall(
        context,
        helper(FRAGMENT),
        createObjectExpression([keyProperty]),
        children,
        patchFlag,
        void 0,
        void 0,
        true,
        false,
        false,
        branch.loc
      );
    }
  } else {
    const ret = firstChild.codegenNode;
    const vnodeCall = getMemoedVNodeCall(ret);
    if (vnodeCall.type === 13) {
      convertToBlock(vnodeCall, context);
    }
    injectProp(vnodeCall, keyProperty, context);
    return ret;
  }
}
function isSameKey(a, b) {
  if (!a || a.type !== b.type) {
    return false;
  }
  if (a.type === 6) {
    if (a.value.content !== b.value.content) {
      return false;
    }
  } else {
    const exp = a.exp;
    const branchExp = b.exp;
    if (exp.type !== branchExp.type) {
      return false;
    }
    if (exp.type !== 4 || exp.isStatic !== branchExp.isStatic || exp.content !== branchExp.content) {
      return false;
    }
  }
  return true;
}
function getParentCondition(node) {
  while (true) {
    if (node.type === 19) {
      if (node.alternate.type === 19) {
        node = node.alternate;
      } else {
        return node;
      }
    } else if (node.type === 20) {
      node = node.value;
    }
  }
}
const transformBind = (dir, _node, context) => {
  const { modifiers, loc } = dir;
  const arg = dir.arg;
  let { exp } = dir;
  if (exp && exp.type === 4 && !exp.content.trim()) {
    {
      exp = void 0;
    }
  }
  if (!exp) {
    if (arg.type !== 4 || !arg.isStatic) {
      context.onError(
        createCompilerError(
          52,
          arg.loc
        )
      );
      return {
        props: [
          createObjectProperty(arg, createSimpleExpression("", true, loc))
        ]
      };
    }
    transformBindShorthand(dir);
    exp = dir.exp;
  }
  if (arg.type !== 4) {
    arg.children.unshift(`(`);
    arg.children.push(`) || ""`);
  } else if (!arg.isStatic) {
    arg.content = `${arg.content} || ""`;
  }
  if (modifiers.some((mod) => mod.content === "camel")) {
    if (arg.type === 4) {
      if (arg.isStatic) {
        arg.content = camelize(arg.content);
      } else {
        arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`;
      }
    } else {
      arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
      arg.children.push(`)`);
    }
  }
  if (!context.inSSR) {
    if (modifiers.some((mod) => mod.content === "prop")) {
      injectPrefix(arg, ".");
    }
    if (modifiers.some((mod) => mod.content === "attr")) {
      injectPrefix(arg, "^");
    }
  }
  return {
    props: [createObjectProperty(arg, exp)]
  };
};
const transformBindShorthand = (dir, context) => {
  const arg = dir.arg;
  const propName = camelize(arg.content);
  dir.exp = createSimpleExpression(propName, false, arg.loc);
};
const injectPrefix = (arg, prefix) => {
  if (arg.type === 4) {
    if (arg.isStatic) {
      arg.content = prefix + arg.content;
    } else {
      arg.content = `\`${prefix}\${${arg.content}}\``;
    }
  } else {
    arg.children.unshift(`'${prefix}' + (`);
    arg.children.push(`)`);
  }
};
const transformFor = createStructuralDirectiveTransform(
  "for",
  (node, dir, context) => {
    const { helper, removeHelper } = context;
    return processFor(node, dir, context, (forNode) => {
      const renderExp = createCallExpression(helper(RENDER_LIST), [
        forNode.source
      ]);
      const isTemplate = isTemplateNode(node);
      const memo = findDir(node, "memo");
      const keyProp = findProp(node, `key`, false, true);
      const isDirKey = keyProp && keyProp.type === 7;
      if (isDirKey && !keyProp.exp) {
        transformBindShorthand(keyProp);
      }
      let keyExp = keyProp && (keyProp.type === 6 ? keyProp.value ? createSimpleExpression(keyProp.value.content, true) : void 0 : keyProp.exp);
      const keyProperty = keyProp && keyExp ? createObjectProperty(`key`, keyExp) : null;
      const isStableFragment = forNode.source.type === 4 && forNode.source.constType > 0;
      const fragmentFlag = isStableFragment ? 64 : keyProp ? 128 : 256;
      forNode.codegenNode = createVNodeCall(
        context,
        helper(FRAGMENT),
        void 0,
        renderExp,
        fragmentFlag,
        void 0,
        void 0,
        true,
        !isStableFragment,
        false,
        node.loc
      );
      return () => {
        let childBlock;
        const { children } = forNode;
        if (isTemplate) {
          node.children.some((c) => {
            if (c.type === 1) {
              const key = findProp(c, "key");
              if (key) {
                context.onError(
                  createCompilerError(
                    33,
                    key.loc
                  )
                );
                return true;
              }
            }
          });
        }
        const needFragmentWrapper = children.length !== 1 || children[0].type !== 1;
        const slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] : null;
        if (slotOutlet) {
          childBlock = slotOutlet.codegenNode;
          if (isTemplate && keyProperty) {
            injectProp(childBlock, keyProperty, context);
          }
        } else if (needFragmentWrapper) {
          childBlock = createVNodeCall(
            context,
            helper(FRAGMENT),
            keyProperty ? createObjectExpression([keyProperty]) : void 0,
            node.children,
            64,
            void 0,
            void 0,
            true,
            void 0,
            false
          );
        } else {
          childBlock = children[0].codegenNode;
          if (isTemplate && keyProperty) {
            injectProp(childBlock, keyProperty, context);
          }
          if (childBlock.isBlock !== !isStableFragment) {
            if (childBlock.isBlock) {
              removeHelper(OPEN_BLOCK);
              removeHelper(
                getVNodeBlockHelper(context.inSSR, childBlock.isComponent)
              );
            } else {
              removeHelper(
                getVNodeHelper(context.inSSR, childBlock.isComponent)
              );
            }
          }
          childBlock.isBlock = !isStableFragment;
          if (childBlock.isBlock) {
            helper(OPEN_BLOCK);
            helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
          } else {
            helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
          }
        }
        if (memo) {
          const loop = createFunctionExpression(
            createForLoopParams(forNode.parseResult, [
              createSimpleExpression(`_cached`)
            ])
          );
          loop.body = createBlockStatement([
            createCompoundExpression([`const _memo = (`, memo.exp, `)`]),
            createCompoundExpression([
              `if (_cached`,
              ...keyExp ? [` && _cached.key === `, keyExp] : [],
              ` && ${context.helperString(
                IS_MEMO_SAME
              )}(_cached, _memo)) return _cached`
            ]),
            createCompoundExpression([`const _item = `, childBlock]),
            createSimpleExpression(`_item.memo = _memo`),
            createSimpleExpression(`return _item`)
          ]);
          renderExp.arguments.push(
            loop,
            createSimpleExpression(`_cache`),
            createSimpleExpression(String(context.cached.length))
          );
          context.cached.push(null);
        } else {
          renderExp.arguments.push(
            createFunctionExpression(
              createForLoopParams(forNode.parseResult),
              childBlock,
              true
            )
          );
        }
      };
    });
  }
);
function processFor(node, dir, context, processCodegen) {
  if (!dir.exp) {
    context.onError(
      createCompilerError(31, dir.loc)
    );
    return;
  }
  const parseResult = dir.forParseResult;
  if (!parseResult) {
    context.onError(
      createCompilerError(32, dir.loc)
    );
    return;
  }
  finalizeForParseResult(parseResult, context);
  const { addIdentifiers, removeIdentifiers, scopes } = context;
  const { source, value, key, index: index2 } = parseResult;
  const forNode = {
    type: 11,
    loc: dir.loc,
    source,
    valueAlias: value,
    keyAlias: key,
    objectIndexAlias: index2,
    parseResult,
    children: isTemplateNode(node) ? node.children : [node]
  };
  context.replaceNode(forNode);
  scopes.vFor++;
  const onExit = processCodegen && processCodegen(forNode);
  return () => {
    scopes.vFor--;
    if (onExit) onExit();
  };
}
function finalizeForParseResult(result, context) {
  if (result.finalized) return;
  {
    validateBrowserExpression(result.source, context);
    if (result.key) {
      validateBrowserExpression(
        result.key,
        context,
        true
      );
    }
    if (result.index) {
      validateBrowserExpression(
        result.index,
        context,
        true
      );
    }
    if (result.value) {
      validateBrowserExpression(
        result.value,
        context,
        true
      );
    }
  }
  result.finalized = true;
}
function createForLoopParams({ value, key, index: index2 }, memoArgs = []) {
  return createParamsList([value, key, index2, ...memoArgs]);
}
function createParamsList(args) {
  let i = args.length;
  while (i--) {
    if (args[i]) break;
  }
  return args.slice(0, i + 1).map((arg, i2) => arg || createSimpleExpression(`_`.repeat(i2 + 1), false));
}
const defaultFallback = createSimpleExpression(`undefined`, false);
const trackSlotScopes = (node, context) => {
  if (node.type === 1 && (node.tagType === 1 || node.tagType === 3)) {
    const vSlot = findDir(node, "slot");
    if (vSlot) {
      vSlot.exp;
      context.scopes.vSlot++;
      return () => {
        context.scopes.vSlot--;
      };
    }
  }
};
const trackVForSlotScopes = (node, context) => {
  let vFor;
  if (isTemplateNode(node) && node.props.some(isVSlot) && (vFor = findDir(node, "for"))) {
    const result = vFor.forParseResult;
    if (result) {
      finalizeForParseResult(result, context);
      const { value, key, index: index2 } = result;
      const { addIdentifiers, removeIdentifiers } = context;
      value && addIdentifiers(value);
      key && addIdentifiers(key);
      index2 && addIdentifiers(index2);
      return () => {
        value && removeIdentifiers(value);
        key && removeIdentifiers(key);
        index2 && removeIdentifiers(index2);
      };
    }
  }
};
const buildClientSlotFn = (props, _vForExp, children, loc) => createFunctionExpression(
  props,
  children,
  false,
  true,
  children.length ? children[0].loc : loc
);
function buildSlots(node, context, buildSlotFn = buildClientSlotFn) {
  context.helper(WITH_CTX);
  const { children, loc } = node;
  const slotsProperties = [];
  const dynamicSlots = [];
  let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0;
  const onComponentSlot = findDir(node, "slot", true);
  if (onComponentSlot) {
    const { arg, exp } = onComponentSlot;
    if (arg && !isStaticExp(arg)) {
      hasDynamicSlots = true;
    }
    slotsProperties.push(
      createObjectProperty(
        arg || createSimpleExpression("default", true),
        buildSlotFn(exp, void 0, children, loc)
      )
    );
  }
  let hasTemplateSlots = false;
  let hasNamedDefaultSlot = false;
  const implicitDefaultChildren = [];
  const seenSlotNames = /* @__PURE__ */ new Set();
  let conditionalBranchIndex = 0;
  for (let i = 0; i < children.length; i++) {
    const slotElement = children[i];
    let slotDir;
    if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, "slot", true))) {
      if (slotElement.type !== 3) {
        implicitDefaultChildren.push(slotElement);
      }
      continue;
    }
    if (onComponentSlot) {
      context.onError(
        createCompilerError(37, slotDir.loc)
      );
      break;
    }
    hasTemplateSlots = true;
    const { children: slotChildren, loc: slotLoc } = slotElement;
    const {
      arg: slotName = createSimpleExpression(`default`, true),
      exp: slotProps,
      loc: dirLoc
    } = slotDir;
    let staticSlotName;
    if (isStaticExp(slotName)) {
      staticSlotName = slotName ? slotName.content : `default`;
    } else {
      hasDynamicSlots = true;
    }
    const vFor = findDir(slotElement, "for");
    const slotFunction = buildSlotFn(slotProps, vFor, slotChildren, slotLoc);
    let vIf;
    let vElse;
    if (vIf = findDir(slotElement, "if")) {
      hasDynamicSlots = true;
      dynamicSlots.push(
        createConditionalExpression(
          vIf.exp,
          buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++),
          defaultFallback
        )
      );
    } else if (vElse = findDir(
      slotElement,
      /^else(-if)?$/,
      true
      /* allowEmpty */
    )) {
      let j = i;
      let prev;
      while (j--) {
        prev = children[j];
        if (prev.type !== 3) {
          break;
        }
      }
      if (prev && isTemplateNode(prev) && findDir(prev, /^(else-)?if$/)) {
        let conditional = dynamicSlots[dynamicSlots.length - 1];
        while (conditional.alternate.type === 19) {
          conditional = conditional.alternate;
        }
        conditional.alternate = vElse.exp ? createConditionalExpression(
          vElse.exp,
          buildDynamicSlot(
            slotName,
            slotFunction,
            conditionalBranchIndex++
          ),
          defaultFallback
        ) : buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++);
      } else {
        context.onError(
          createCompilerError(30, vElse.loc)
        );
      }
    } else if (vFor) {
      hasDynamicSlots = true;
      const parseResult = vFor.forParseResult;
      if (parseResult) {
        finalizeForParseResult(parseResult, context);
        dynamicSlots.push(
          createCallExpression(context.helper(RENDER_LIST), [
            parseResult.source,
            createFunctionExpression(
              createForLoopParams(parseResult),
              buildDynamicSlot(slotName, slotFunction),
              true
            )
          ])
        );
      } else {
        context.onError(
          createCompilerError(
            32,
            vFor.loc
          )
        );
      }
    } else {
      if (staticSlotName) {
        if (seenSlotNames.has(staticSlotName)) {
          context.onError(
            createCompilerError(
              38,
              dirLoc
            )
          );
          continue;
        }
        seenSlotNames.add(staticSlotName);
        if (staticSlotName === "default") {
          hasNamedDefaultSlot = true;
        }
      }
      slotsProperties.push(createObjectProperty(slotName, slotFunction));
    }
  }
  if (!onComponentSlot) {
    const buildDefaultSlotProperty = (props, children2) => {
      const fn = buildSlotFn(props, void 0, children2, loc);
      if (context.compatConfig) {
        fn.isNonScopedSlot = true;
      }
      return createObjectProperty(`default`, fn);
    };
    if (!hasTemplateSlots) {
      slotsProperties.push(buildDefaultSlotProperty(void 0, children));
    } else if (implicitDefaultChildren.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    implicitDefaultChildren.some((node2) => isNonWhitespaceContent(node2))) {
      if (hasNamedDefaultSlot) {
        context.onError(
          createCompilerError(
            39,
            implicitDefaultChildren[0].loc
          )
        );
      } else {
        slotsProperties.push(
          buildDefaultSlotProperty(void 0, implicitDefaultChildren)
        );
      }
    }
  }
  const slotFlag = hasDynamicSlots ? 2 : hasForwardedSlots(node.children) ? 3 : 1;
  let slots = createObjectExpression(
    slotsProperties.concat(
      createObjectProperty(
        `_`,
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        createSimpleExpression(
          slotFlag + ` /* ${slotFlagsText[slotFlag]} */`,
          false
        )
      )
    ),
    loc
  );
  if (dynamicSlots.length) {
    slots = createCallExpression(context.helper(CREATE_SLOTS), [
      slots,
      createArrayExpression(dynamicSlots)
    ]);
  }
  return {
    slots,
    hasDynamicSlots
  };
}
function buildDynamicSlot(name, fn, index2) {
  const props = [
    createObjectProperty(`name`, name),
    createObjectProperty(`fn`, fn)
  ];
  if (index2 != null) {
    props.push(
      createObjectProperty(`key`, createSimpleExpression(String(index2), true))
    );
  }
  return createObjectExpression(props);
}
function hasForwardedSlots(children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case 1:
        if (child.tagType === 2 || hasForwardedSlots(child.children)) {
          return true;
        }
        break;
      case 9:
        if (hasForwardedSlots(child.branches)) return true;
        break;
      case 10:
      case 11:
        if (hasForwardedSlots(child.children)) return true;
        break;
    }
  }
  return false;
}
function isNonWhitespaceContent(node) {
  if (node.type !== 2 && node.type !== 12)
    return true;
  return node.type === 2 ? !!node.content.trim() : isNonWhitespaceContent(node.content);
}
const directiveImportMap = /* @__PURE__ */ new WeakMap();
const transformElement = (node, context) => {
  return function postTransformElement() {
    node = context.currentNode;
    if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) {
      return;
    }
    const { tag, props } = node;
    const isComponent2 = node.tagType === 1;
    let vnodeTag = isComponent2 ? resolveComponentType(node, context) : `"${tag}"`;
    const isDynamicComponent = isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
    let vnodeProps;
    let vnodeChildren;
    let patchFlag = 0;
    let vnodeDynamicProps;
    let dynamicPropNames;
    let vnodeDirectives;
    let shouldUseBlock = (
      // dynamic component may resolve to plain elements
      isDynamicComponent || vnodeTag === TELEPORT || vnodeTag === SUSPENSE || !isComponent2 && // <svg> and <foreignObject> must be forced into blocks so that block
      // updates inside get proper isSVG flag at runtime. (#639, #643)
      // This is technically web-specific, but splitting the logic out of core
      // leads to too much unnecessary complexity.
      (tag === "svg" || tag === "foreignObject" || tag === "math")
    );
    if (props.length > 0) {
      const propsBuildResult = buildProps(
        node,
        context,
        void 0,
        isComponent2,
        isDynamicComponent
      );
      vnodeProps = propsBuildResult.props;
      patchFlag = propsBuildResult.patchFlag;
      dynamicPropNames = propsBuildResult.dynamicPropNames;
      const directives = propsBuildResult.directives;
      vnodeDirectives = directives && directives.length ? createArrayExpression(
        directives.map((dir) => buildDirectiveArgs(dir, context))
      ) : void 0;
      if (propsBuildResult.shouldUseBlock) {
        shouldUseBlock = true;
      }
    }
    if (node.children.length > 0) {
      if (vnodeTag === KEEP_ALIVE) {
        shouldUseBlock = true;
        patchFlag |= 1024;
        if (node.children.length > 1) {
          context.onError(
            createCompilerError(46, {
              start: node.children[0].loc.start,
              end: node.children[node.children.length - 1].loc.end,
              source: ""
            })
          );
        }
      }
      const shouldBuildAsSlots = isComponent2 && // Teleport is not a real component and has dedicated runtime handling
      vnodeTag !== TELEPORT && // explained above.
      vnodeTag !== KEEP_ALIVE;
      if (shouldBuildAsSlots) {
        const { slots, hasDynamicSlots } = buildSlots(node, context);
        vnodeChildren = slots;
        if (hasDynamicSlots) {
          patchFlag |= 1024;
        }
      } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
        const child = node.children[0];
        const type = child.type;
        const hasDynamicTextChild = type === 5 || type === 8;
        if (hasDynamicTextChild && getConstantType(child, context) === 0) {
          patchFlag |= 1;
        }
        if (hasDynamicTextChild || type === 2) {
          vnodeChildren = child;
        } else {
          vnodeChildren = node.children;
        }
      } else {
        vnodeChildren = node.children;
      }
    }
    if (dynamicPropNames && dynamicPropNames.length) {
      vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
    }
    node.codegenNode = createVNodeCall(
      context,
      vnodeTag,
      vnodeProps,
      vnodeChildren,
      patchFlag === 0 ? void 0 : patchFlag,
      vnodeDynamicProps,
      vnodeDirectives,
      !!shouldUseBlock,
      false,
      isComponent2,
      node.loc
    );
  };
};
function resolveComponentType(node, context, ssr = false) {
  let { tag } = node;
  const isExplicitDynamic = isComponentTag(tag);
  const isProp = findProp(
    node,
    "is",
    false,
    true
    /* allow empty */
  );
  if (isProp) {
    if (isExplicitDynamic || isCompatEnabled(
      "COMPILER_IS_ON_ELEMENT",
      context
    )) {
      let exp;
      if (isProp.type === 6) {
        exp = isProp.value && createSimpleExpression(isProp.value.content, true);
      } else {
        exp = isProp.exp;
        if (!exp) {
          exp = createSimpleExpression(`is`, false, isProp.arg.loc);
        }
      }
      if (exp) {
        return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
          exp
        ]);
      }
    } else if (isProp.type === 6 && isProp.value.content.startsWith("vue:")) {
      tag = isProp.value.content.slice(4);
    }
  }
  const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);
  if (builtIn) {
    if (!ssr) context.helper(builtIn);
    return builtIn;
  }
  context.helper(RESOLVE_COMPONENT);
  context.components.add(tag);
  return toValidAssetId(tag, `component`);
}
function buildProps(node, context, props = node.props, isComponent2, isDynamicComponent, ssr = false) {
  const { tag, loc: elementLoc, children } = node;
  let properties = [];
  const mergeArgs = [];
  const runtimeDirectives = [];
  const hasChildren = children.length > 0;
  let shouldUseBlock = false;
  let patchFlag = 0;
  let hasRef = false;
  let hasClassBinding = false;
  let hasStyleBinding = false;
  let hasHydrationEventBinding = false;
  let hasDynamicKeys = false;
  let hasVnodeHook = false;
  const dynamicPropNames = [];
  const pushMergeArg = (arg) => {
    if (properties.length) {
      mergeArgs.push(
        createObjectExpression(dedupeProperties(properties), elementLoc)
      );
      properties = [];
    }
    if (arg) mergeArgs.push(arg);
  };
  const pushRefVForMarker = () => {
    if (context.scopes.vFor > 0) {
      properties.push(
        createObjectProperty(
          createSimpleExpression("ref_for", true),
          createSimpleExpression("true")
        )
      );
    }
  };
  const analyzePatchFlag = ({ key, value }) => {
    if (isStaticExp(key)) {
      const name = key.content;
      const isEventHandler = isOn(name);
      if (isEventHandler && (!isComponent2 || isDynamicComponent) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      name.toLowerCase() !== "onclick" && // omit v-model handlers
      name !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !isReservedProp(name)) {
        hasHydrationEventBinding = true;
      }
      if (isEventHandler && isReservedProp(name)) {
        hasVnodeHook = true;
      }
      if (isEventHandler && value.type === 14) {
        value = value.arguments[0];
      }
      if (value.type === 20 || (value.type === 4 || value.type === 8) && getConstantType(value, context) > 0) {
        return;
      }
      if (name === "ref") {
        hasRef = true;
      } else if (name === "class") {
        hasClassBinding = true;
      } else if (name === "style") {
        hasStyleBinding = true;
      } else if (name !== "key" && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
      if (isComponent2 && (name === "class" || name === "style") && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
    } else {
      hasDynamicKeys = true;
    }
  };
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (prop.type === 6) {
      const { loc, name, nameLoc, value } = prop;
      let isStatic = true;
      if (name === "ref") {
        hasRef = true;
        pushRefVForMarker();
      }
      if (name === "is" && (isComponentTag(tag) || value && value.content.startsWith("vue:") || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      ))) {
        continue;
      }
      properties.push(
        createObjectProperty(
          createSimpleExpression(name, true, nameLoc),
          createSimpleExpression(
            value ? value.content : "",
            isStatic,
            value ? value.loc : loc
          )
        )
      );
    } else {
      const { name, arg, exp, loc, modifiers } = prop;
      const isVBind = name === "bind";
      const isVOn = name === "on";
      if (name === "slot") {
        if (!isComponent2) {
          context.onError(
            createCompilerError(40, loc)
          );
        }
        continue;
      }
      if (name === "once" || name === "memo") {
        continue;
      }
      if (name === "is" || isVBind && isStaticArgOf(arg, "is") && (isComponentTag(tag) || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      ))) {
        continue;
      }
      if (isVOn && ssr) {
        continue;
      }
      if (
        // #938: elements with dynamic keys should be forced into blocks
        isVBind && isStaticArgOf(arg, "key") || // inline before-update hooks need to force block so that it is invoked
        // before children
        isVOn && hasChildren && isStaticArgOf(arg, "vue:before-update")
      ) {
        shouldUseBlock = true;
      }
      if (isVBind && isStaticArgOf(arg, "ref")) {
        pushRefVForMarker();
      }
      if (!arg && (isVBind || isVOn)) {
        hasDynamicKeys = true;
        if (exp) {
          if (isVBind) {
            pushRefVForMarker();
            pushMergeArg();
            {
              {
                const hasOverridableKeys = mergeArgs.some((arg2) => {
                  if (arg2.type === 15) {
                    return arg2.properties.some(({ key }) => {
                      if (key.type !== 4 || !key.isStatic) {
                        return true;
                      }
                      return key.content !== "class" && key.content !== "style" && !isOn(key.content);
                    });
                  } else {
                    return true;
                  }
                });
                if (hasOverridableKeys) {
                  checkCompatEnabled(
                    "COMPILER_V_BIND_OBJECT_ORDER",
                    context,
                    loc
                  );
                }
              }
              if (isCompatEnabled(
                "COMPILER_V_BIND_OBJECT_ORDER",
                context
              )) {
                mergeArgs.unshift(exp);
                continue;
              }
            }
            mergeArgs.push(exp);
          } else {
            pushMergeArg({
              type: 14,
              loc,
              callee: context.helper(TO_HANDLERS),
              arguments: isComponent2 ? [exp] : [exp, `true`]
            });
          }
        } else {
          context.onError(
            createCompilerError(
              isVBind ? 34 : 35,
              loc
            )
          );
        }
        continue;
      }
      if (isVBind && modifiers.some((mod) => mod.content === "prop")) {
        patchFlag |= 32;
      }
      const directiveTransform = context.directiveTransforms[name];
      if (directiveTransform) {
        const { props: props2, needRuntime } = directiveTransform(prop, node, context);
        !ssr && props2.forEach(analyzePatchFlag);
        if (isVOn && arg && !isStaticExp(arg)) {
          pushMergeArg(createObjectExpression(props2, elementLoc));
        } else {
          properties.push(...props2);
        }
        if (needRuntime) {
          runtimeDirectives.push(prop);
          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      } else if (!isBuiltInDirective(name)) {
        runtimeDirectives.push(prop);
        if (hasChildren) {
          shouldUseBlock = true;
        }
      }
    }
  }
  let propsExpression = void 0;
  if (mergeArgs.length) {
    pushMergeArg();
    if (mergeArgs.length > 1) {
      propsExpression = createCallExpression(
        context.helper(MERGE_PROPS),
        mergeArgs,
        elementLoc
      );
    } else {
      propsExpression = mergeArgs[0];
    }
  } else if (properties.length) {
    propsExpression = createObjectExpression(
      dedupeProperties(properties),
      elementLoc
    );
  }
  if (hasDynamicKeys) {
    patchFlag |= 16;
  } else {
    if (hasClassBinding && !isComponent2) {
      patchFlag |= 2;
    }
    if (hasStyleBinding && !isComponent2) {
      patchFlag |= 4;
    }
    if (dynamicPropNames.length) {
      patchFlag |= 8;
    }
    if (hasHydrationEventBinding) {
      patchFlag |= 32;
    }
  }
  if (!shouldUseBlock && (patchFlag === 0 || patchFlag === 32) && (hasRef || hasVnodeHook || runtimeDirectives.length > 0)) {
    patchFlag |= 512;
  }
  if (!context.inSSR && propsExpression) {
    switch (propsExpression.type) {
      case 15:
        let classKeyIndex = -1;
        let styleKeyIndex = -1;
        let hasDynamicKey = false;
        for (let i = 0; i < propsExpression.properties.length; i++) {
          const key = propsExpression.properties[i].key;
          if (isStaticExp(key)) {
            if (key.content === "class") {
              classKeyIndex = i;
            } else if (key.content === "style") {
              styleKeyIndex = i;
            }
          } else if (!key.isHandlerKey) {
            hasDynamicKey = true;
          }
        }
        const classProp = propsExpression.properties[classKeyIndex];
        const styleProp = propsExpression.properties[styleKeyIndex];
        if (!hasDynamicKey) {
          if (classProp && !isStaticExp(classProp.value)) {
            classProp.value = createCallExpression(
              context.helper(NORMALIZE_CLASS),
              [classProp.value]
            );
          }
          if (styleProp && // the static style is compiled into an object,
          // so use `hasStyleBinding` to ensure that it is a dynamic style binding
          (hasStyleBinding || styleProp.value.type === 4 && styleProp.value.content.trim()[0] === `[` || // v-bind:style and style both exist,
          // v-bind:style with static literal object
          styleProp.value.type === 17)) {
            styleProp.value = createCallExpression(
              context.helper(NORMALIZE_STYLE),
              [styleProp.value]
            );
          }
        } else {
          propsExpression = createCallExpression(
            context.helper(NORMALIZE_PROPS),
            [propsExpression]
          );
        }
        break;
      case 14:
        break;
      default:
        propsExpression = createCallExpression(
          context.helper(NORMALIZE_PROPS),
          [
            createCallExpression(context.helper(GUARD_REACTIVE_PROPS), [
              propsExpression
            ])
          ]
        );
        break;
    }
  }
  return {
    props: propsExpression,
    directives: runtimeDirectives,
    patchFlag,
    dynamicPropNames,
    shouldUseBlock
  };
}
function dedupeProperties(properties) {
  const knownProps = /* @__PURE__ */ new Map();
  const deduped = [];
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if (prop.key.type === 8 || !prop.key.isStatic) {
      deduped.push(prop);
      continue;
    }
    const name = prop.key.content;
    const existing = knownProps.get(name);
    if (existing) {
      if (name === "style" || name === "class" || isOn(name)) {
        mergeAsArray(existing, prop);
      }
    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }
  return deduped;
}
function mergeAsArray(existing, incoming) {
  if (existing.value.type === 17) {
    existing.value.elements.push(incoming.value);
  } else {
    existing.value = createArrayExpression(
      [existing.value, incoming.value],
      existing.loc
    );
  }
}
function buildDirectiveArgs(dir, context) {
  const dirArgs = [];
  const runtime = directiveImportMap.get(dir);
  if (runtime) {
    dirArgs.push(context.helperString(runtime));
  } else {
    {
      context.helper(RESOLVE_DIRECTIVE);
      context.directives.add(dir.name);
      dirArgs.push(toValidAssetId(dir.name, `directive`));
    }
  }
  const { loc } = dir;
  if (dir.exp) dirArgs.push(dir.exp);
  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push(`void 0`);
    }
    dirArgs.push(dir.arg);
  }
  if (Object.keys(dir.modifiers).length) {
    if (!dir.arg) {
      if (!dir.exp) {
        dirArgs.push(`void 0`);
      }
      dirArgs.push(`void 0`);
    }
    const trueExpression = createSimpleExpression(`true`, false, loc);
    dirArgs.push(
      createObjectExpression(
        dir.modifiers.map(
          (modifier) => createObjectProperty(modifier, trueExpression)
        ),
        loc
      )
    );
  }
  return createArrayExpression(dirArgs, dir.loc);
}
function stringifyDynamicPropNames(props) {
  let propsNamesString = `[`;
  for (let i = 0, l = props.length; i < l; i++) {
    propsNamesString += JSON.stringify(props[i]);
    if (i < l - 1) propsNamesString += ", ";
  }
  return propsNamesString + `]`;
}
function isComponentTag(tag) {
  return tag === "component" || tag === "Component";
}
const transformSlotOutlet = (node, context) => {
  if (isSlotOutlet(node)) {
    const { children, loc } = node;
    const { slotName, slotProps } = processSlotOutlet(node, context);
    const slotArgs = [
      context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
      slotName,
      "{}",
      "undefined",
      "true"
    ];
    let expectedLen = 2;
    if (slotProps) {
      slotArgs[2] = slotProps;
      expectedLen = 3;
    }
    if (children.length) {
      slotArgs[3] = createFunctionExpression([], children, false, false, loc);
      expectedLen = 4;
    }
    if (context.scopeId && !context.slotted) {
      expectedLen = 5;
    }
    slotArgs.splice(expectedLen);
    node.codegenNode = createCallExpression(
      context.helper(RENDER_SLOT),
      slotArgs,
      loc
    );
  }
};
function processSlotOutlet(node, context) {
  let slotName = `"default"`;
  let slotProps = void 0;
  const nonNameProps = [];
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (p.value) {
        if (p.name === "name") {
          slotName = JSON.stringify(p.value.content);
        } else {
          p.name = camelize(p.name);
          nonNameProps.push(p);
        }
      }
    } else {
      if (p.name === "bind" && isStaticArgOf(p.arg, "name")) {
        if (p.exp) {
          slotName = p.exp;
        } else if (p.arg && p.arg.type === 4) {
          const name = camelize(p.arg.content);
          slotName = p.exp = createSimpleExpression(name, false, p.arg.loc);
        }
      } else {
        if (p.name === "bind" && p.arg && isStaticExp(p.arg)) {
          p.arg.content = camelize(p.arg.content);
        }
        nonNameProps.push(p);
      }
    }
  }
  if (nonNameProps.length > 0) {
    const { props, directives } = buildProps(
      node,
      context,
      nonNameProps,
      false,
      false
    );
    slotProps = props;
    if (directives.length) {
      context.onError(
        createCompilerError(
          36,
          directives[0].loc
        )
      );
    }
  }
  return {
    slotName,
    slotProps
  };
}
const transformOn$1 = (dir, node, context, augmentor) => {
  const { loc, modifiers, arg } = dir;
  if (!dir.exp && !modifiers.length) {
    context.onError(createCompilerError(35, loc));
  }
  let eventName;
  if (arg.type === 4) {
    if (arg.isStatic) {
      let rawName = arg.content;
      if (rawName.startsWith("vnode")) {
        context.onError(createCompilerError(51, arg.loc));
      }
      if (rawName.startsWith("vue:")) {
        rawName = `vnode-${rawName.slice(4)}`;
      }
      const eventString = node.tagType !== 0 || rawName.startsWith("vnode") || !/[A-Z]/.test(rawName) ? (
        // for non-element and vnode lifecycle event listeners, auto convert
        // it to camelCase. See issue #2249
        toHandlerKey(camelize(rawName))
      ) : (
        // preserve case for plain element listeners that have uppercase
        // letters, as these may be custom elements' custom events
        `on:${rawName}`
      );
      eventName = createSimpleExpression(eventString, true, arg.loc);
    } else {
      eventName = createCompoundExpression([
        `${context.helperString(TO_HANDLER_KEY)}(`,
        arg,
        `)`
      ]);
    }
  } else {
    eventName = arg;
    eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
    eventName.children.push(`)`);
  }
  let exp = dir.exp;
  if (exp && !exp.content.trim()) {
    exp = void 0;
  }
  let shouldCache = context.cacheHandlers && !exp && !context.inVOnce;
  if (exp) {
    const isMemberExp = isMemberExpression(exp);
    const isInlineStatement = !(isMemberExp || isFnExpression(exp));
    const hasMultipleStatements = exp.content.includes(`;`);
    {
      validateBrowserExpression(
        exp,
        context,
        false,
        hasMultipleStatements
      );
    }
    if (isInlineStatement || shouldCache && isMemberExp) {
      exp = createCompoundExpression([
        `${isInlineStatement ? `$event` : `${``}(...args)`} => ${hasMultipleStatements ? `{` : `(`}`,
        exp,
        hasMultipleStatements ? `}` : `)`
      ]);
    }
  }
  let ret = {
    props: [
      createObjectProperty(
        eventName,
        exp || createSimpleExpression(`() => {}`, false, loc)
      )
    ]
  };
  if (augmentor) {
    ret = augmentor(ret);
  }
  if (shouldCache) {
    ret.props[0].value = context.cache(ret.props[0].value);
  }
  ret.props.forEach((p) => p.key.isHandlerKey = true);
  return ret;
};
const transformText = (node, context) => {
  if (node.type === 0 || node.type === 1 || node.type === 11 || node.type === 10) {
    return () => {
      const children = node.children;
      let currentContainer = void 0;
      let hasText = false;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText$1(child)) {
          hasText = true;
          for (let j = i + 1; j < children.length; j++) {
            const next = children[j];
            if (isText$1(next)) {
              if (!currentContainer) {
                currentContainer = children[i] = createCompoundExpression(
                  [child],
                  child.loc
                );
              }
              currentContainer.children.push(` + `, next);
              children.splice(j, 1);
              j--;
            } else {
              currentContainer = void 0;
              break;
            }
          }
        }
      }
      if (!hasText || // if this is a plain element with a single text child, leave it
      // as-is since the runtime has dedicated fast path for this by directly
      // setting textContent of the element.
      // for component root it's always normalized anyway.
      children.length === 1 && (node.type === 0 || node.type === 1 && node.tagType === 0 && // #3756
      // custom directives can potentially add DOM elements arbitrarily,
      // we need to avoid setting textContent of the element at runtime
      // to avoid accidentally overwriting the DOM elements added
      // by the user through custom directives.
      !node.props.find(
        (p) => p.type === 7 && !context.directiveTransforms[p.name]
      ) && // in compat mode, <template> tags with no special directives
      // will be rendered as a fragment so its children must be
      // converted into vnodes.
      !(node.tag === "template"))) {
        return;
      }
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText$1(child) || child.type === 8) {
          const callArgs = [];
          if (child.type !== 2 || child.content !== " ") {
            callArgs.push(child);
          }
          if (!context.ssr && getConstantType(child, context) === 0) {
            callArgs.push(
              `1 /* ${PatchFlagNames[1]} */`
            );
          }
          children[i] = {
            type: 12,
            content: child,
            loc: child.loc,
            codegenNode: createCallExpression(
              context.helper(CREATE_TEXT),
              callArgs
            )
          };
        }
      }
    };
  }
};
const seen$1 = /* @__PURE__ */ new WeakSet();
const transformOnce = (node, context) => {
  if (node.type === 1 && findDir(node, "once", true)) {
    if (seen$1.has(node) || context.inVOnce || context.inSSR) {
      return;
    }
    seen$1.add(node);
    context.inVOnce = true;
    context.helper(SET_BLOCK_TRACKING);
    return () => {
      context.inVOnce = false;
      const cur = context.currentNode;
      if (cur.codegenNode) {
        cur.codegenNode = context.cache(
          cur.codegenNode,
          true,
          true
        );
      }
    };
  }
};
const transformModel$1 = (dir, node, context) => {
  const { exp, arg } = dir;
  if (!exp) {
    context.onError(
      createCompilerError(41, dir.loc)
    );
    return createTransformProps();
  }
  const rawExp = exp.loc.source.trim();
  const expString = exp.type === 4 ? exp.content : rawExp;
  const bindingType = context.bindingMetadata[rawExp];
  if (bindingType === "props" || bindingType === "props-aliased") {
    context.onError(createCompilerError(44, exp.loc));
    return createTransformProps();
  }
  if (!expString.trim() || !isMemberExpression(exp) && true) {
    context.onError(
      createCompilerError(42, exp.loc)
    );
    return createTransformProps();
  }
  const propName = arg ? arg : createSimpleExpression("modelValue", true);
  const eventName = arg ? isStaticExp(arg) ? `onUpdate:${camelize(arg.content)}` : createCompoundExpression(['"onUpdate:" + ', arg]) : `onUpdate:modelValue`;
  let assignmentExp;
  const eventArg = context.isTS ? `($event: any)` : `$event`;
  {
    assignmentExp = createCompoundExpression([
      `${eventArg} => ((`,
      exp,
      `) = $event)`
    ]);
  }
  const props = [
    // modelValue: foo
    createObjectProperty(propName, dir.exp),
    // "onUpdate:modelValue": $event => (foo = $event)
    createObjectProperty(eventName, assignmentExp)
  ];
  if (dir.modifiers.length && node.tagType === 1) {
    const modifiers = dir.modifiers.map((m) => m.content).map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`).join(`, `);
    const modifiersKey = arg ? isStaticExp(arg) ? `${arg.content}Modifiers` : createCompoundExpression([arg, ' + "Modifiers"']) : `modelModifiers`;
    props.push(
      createObjectProperty(
        modifiersKey,
        createSimpleExpression(
          `{ ${modifiers} }`,
          false,
          dir.loc,
          2
        )
      )
    );
  }
  return createTransformProps(props);
};
function createTransformProps(props = []) {
  return { props };
}
const validDivisionCharRE = /[\w).+\-_$\]]/;
const transformFilter = (node, context) => {
  if (!isCompatEnabled("COMPILER_FILTERS", context)) {
    return;
  }
  if (node.type === 5) {
    rewriteFilter(node.content, context);
  } else if (node.type === 1) {
    node.props.forEach((prop) => {
      if (prop.type === 7 && prop.name !== "for" && prop.exp) {
        rewriteFilter(prop.exp, context);
      }
    });
  }
};
function rewriteFilter(node, context) {
  if (node.type === 4) {
    parseFilter(node, context);
  } else {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (typeof child !== "object") continue;
      if (child.type === 4) {
        parseFilter(child, context);
      } else if (child.type === 8) {
        rewriteFilter(node, context);
      } else if (child.type === 5) {
        rewriteFilter(child.content, context);
      }
    }
  }
}
function parseFilter(node, context) {
  const exp = node.content;
  let inSingle = false;
  let inDouble = false;
  let inTemplateString = false;
  let inRegex = false;
  let curly = 0;
  let square = 0;
  let paren = 0;
  let lastFilterIndex = 0;
  let c, prev, i, expression, filters = [];
  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 39 && prev !== 92) inSingle = false;
    } else if (inDouble) {
      if (c === 34 && prev !== 92) inDouble = false;
    } else if (inTemplateString) {
      if (c === 96 && prev !== 92) inTemplateString = false;
    } else if (inRegex) {
      if (c === 47 && prev !== 92) inRegex = false;
    } else if (c === 124 && // pipe
    exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
      if (expression === void 0) {
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 34:
          inDouble = true;
          break;
        // "
        case 39:
          inSingle = true;
          break;
        // '
        case 96:
          inTemplateString = true;
          break;
        // `
        case 40:
          paren++;
          break;
        // (
        case 41:
          paren--;
          break;
        // )
        case 91:
          square++;
          break;
        // [
        case 93:
          square--;
          break;
        // ]
        case 123:
          curly++;
          break;
        // {
        case 125:
          curly--;
          break;
      }
      if (c === 47) {
        let j = i - 1;
        let p;
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== " ") break;
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }
  if (expression === void 0) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }
  function pushFilter() {
    filters.push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }
  if (filters.length) {
    warnDeprecation(
      "COMPILER_FILTERS",
      context,
      node.loc
    );
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i], context);
    }
    node.content = expression;
    node.ast = void 0;
  }
}
function wrapFilter(exp, filter, context) {
  context.helper(RESOLVE_FILTER);
  const i = filter.indexOf("(");
  if (i < 0) {
    context.filters.add(filter);
    return `${toValidAssetId(filter, "filter")}(${exp})`;
  } else {
    const name = filter.slice(0, i);
    const args = filter.slice(i + 1);
    context.filters.add(name);
    return `${toValidAssetId(name, "filter")}(${exp}${args !== ")" ? "," + args : args}`;
  }
}
const seen = /* @__PURE__ */ new WeakSet();
const transformMemo = (node, context) => {
  if (node.type === 1) {
    const dir = findDir(node, "memo");
    if (!dir || seen.has(node)) {
      return;
    }
    seen.add(node);
    return () => {
      const codegenNode = node.codegenNode || context.currentNode.codegenNode;
      if (codegenNode && codegenNode.type === 13) {
        if (node.tagType !== 1) {
          convertToBlock(codegenNode, context);
        }
        node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [
          dir.exp,
          createFunctionExpression(void 0, codegenNode),
          `_cache`,
          String(context.cached.length)
        ]);
        context.cached.push(null);
      }
    };
  }
};
function getBaseTransformPreset(prefixIdentifiers) {
  return [
    [
      transformOnce,
      transformIf,
      transformMemo,
      transformFor,
      ...[transformFilter],
      ...[transformExpression],
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText
    ],
    {
      on: transformOn$1,
      bind: transformBind,
      model: transformModel$1
    }
  ];
}
function baseCompile(source, options = {}) {
  const onError = options.onError || defaultOnError;
  const isModuleMode = options.mode === "module";
  {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(47));
    } else if (isModuleMode) {
      onError(createCompilerError(48));
    }
  }
  const prefixIdentifiers = false;
  if (options.cacheHandlers) {
    onError(createCompilerError(49));
  }
  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(50));
  }
  const resolvedOptions = extend$1({}, options, {
    prefixIdentifiers
  });
  const ast = isString(source) ? baseParse(source, resolvedOptions) : source;
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  transform(
    ast,
    extend$1({}, resolvedOptions, {
      nodeTransforms: [
        ...nodeTransforms,
        ...options.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: extend$1(
        {},
        directiveTransforms,
        options.directiveTransforms || {}
        // user transforms
      )
    })
  );
  return generate(ast, resolvedOptions);
}
const BindingTypes = {
  "DATA": "data",
  "PROPS": "props",
  "PROPS_ALIASED": "props-aliased",
  "SETUP_LET": "setup-let",
  "SETUP_CONST": "setup-const",
  "SETUP_REACTIVE_CONST": "setup-reactive-const",
  "SETUP_MAYBE_REF": "setup-maybe-ref",
  "SETUP_REF": "setup-ref",
  "OPTIONS": "options",
  "LITERAL_CONST": "literal-const"
};
const noopDirectiveTransform = () => ({ props: [] });
/**
* @vue/compiler-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const V_MODEL_RADIO = Symbol(`vModelRadio`);
const V_MODEL_CHECKBOX = Symbol(
  `vModelCheckbox`
);
const V_MODEL_TEXT = Symbol(`vModelText`);
const V_MODEL_SELECT = Symbol(
  `vModelSelect`
);
const V_MODEL_DYNAMIC = Symbol(
  `vModelDynamic`
);
const V_ON_WITH_MODIFIERS = Symbol(
  `vOnModifiersGuard`
);
const V_ON_WITH_KEYS = Symbol(
  `vOnKeysGuard`
);
const V_SHOW = Symbol(`vShow`);
const TRANSITION = Symbol(`Transition`);
const TRANSITION_GROUP = Symbol(
  `TransitionGroup`
);
registerRuntimeHelpers({
  [V_MODEL_RADIO]: `vModelRadio`,
  [V_MODEL_CHECKBOX]: `vModelCheckbox`,
  [V_MODEL_TEXT]: `vModelText`,
  [V_MODEL_SELECT]: `vModelSelect`,
  [V_MODEL_DYNAMIC]: `vModelDynamic`,
  [V_ON_WITH_MODIFIERS]: `withModifiers`,
  [V_ON_WITH_KEYS]: `withKeys`,
  [V_SHOW]: `vShow`,
  [TRANSITION]: `Transition`,
  [TRANSITION_GROUP]: `TransitionGroup`
});
let decoder;
function decodeHtmlBrowser(raw, asAttr = false) {
  if (!decoder) {
    decoder = document.createElement("div");
  }
  if (asAttr) {
    decoder.innerHTML = `<div foo="${raw.replace(/"/g, "&quot;")}">`;
    return decoder.children[0].getAttribute("foo");
  } else {
    decoder.innerHTML = raw;
    return decoder.textContent;
  }
}
const parserOptions = {
  parseMode: "html",
  isVoidTag,
  isNativeTag: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
  isPreTag: (tag) => tag === "pre",
  isIgnoreNewlineTag: (tag) => tag === "pre" || tag === "textarea",
  decodeEntities: decodeHtmlBrowser,
  isBuiltInComponent: (tag) => {
    if (tag === "Transition" || tag === "transition") {
      return TRANSITION;
    } else if (tag === "TransitionGroup" || tag === "transition-group") {
      return TRANSITION_GROUP;
    }
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(tag, parent, rootNamespace) {
    let ns = parent ? parent.ns : rootNamespace;
    if (parent && ns === 2) {
      if (parent.tag === "annotation-xml") {
        if (tag === "svg") {
          return 1;
        }
        if (parent.props.some(
          (a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml")
        )) {
          ns = 0;
        }
      } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
        ns = 0;
      }
    } else if (parent && ns === 1) {
      if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
        ns = 0;
      }
    }
    if (ns === 0) {
      if (tag === "svg") {
        return 1;
      }
      if (tag === "math") {
        return 2;
      }
    }
    return ns;
  }
};
const transformStyle = (node) => {
  if (node.type === 1) {
    node.props.forEach((p, i) => {
      if (p.type === 6 && p.name === "style" && p.value) {
        node.props[i] = {
          type: 7,
          name: `bind`,
          arg: createSimpleExpression(`style`, true, p.loc),
          exp: parseInlineCSS(p.value.content, p.loc),
          modifiers: [],
          loc: p.loc
        };
      }
    });
  }
};
const parseInlineCSS = (cssText, loc) => {
  const normalized = parseStringStyle(cssText);
  return createSimpleExpression(
    JSON.stringify(normalized),
    false,
    loc,
    3
  );
};
function createDOMCompilerError(code, loc) {
  return createCompilerError(
    code,
    loc,
    DOMErrorMessages
  );
}
const DOMErrorCodes = {
  "X_V_HTML_NO_EXPRESSION": 53,
  "53": "X_V_HTML_NO_EXPRESSION",
  "X_V_HTML_WITH_CHILDREN": 54,
  "54": "X_V_HTML_WITH_CHILDREN",
  "X_V_TEXT_NO_EXPRESSION": 55,
  "55": "X_V_TEXT_NO_EXPRESSION",
  "X_V_TEXT_WITH_CHILDREN": 56,
  "56": "X_V_TEXT_WITH_CHILDREN",
  "X_V_MODEL_ON_INVALID_ELEMENT": 57,
  "57": "X_V_MODEL_ON_INVALID_ELEMENT",
  "X_V_MODEL_ARG_ON_ELEMENT": 58,
  "58": "X_V_MODEL_ARG_ON_ELEMENT",
  "X_V_MODEL_ON_FILE_INPUT_ELEMENT": 59,
  "59": "X_V_MODEL_ON_FILE_INPUT_ELEMENT",
  "X_V_MODEL_UNNECESSARY_VALUE": 60,
  "60": "X_V_MODEL_UNNECESSARY_VALUE",
  "X_V_SHOW_NO_EXPRESSION": 61,
  "61": "X_V_SHOW_NO_EXPRESSION",
  "X_TRANSITION_INVALID_CHILDREN": 62,
  "62": "X_TRANSITION_INVALID_CHILDREN",
  "X_IGNORED_SIDE_EFFECT_TAG": 63,
  "63": "X_IGNORED_SIDE_EFFECT_TAG",
  "__EXTEND_POINT__": 64,
  "64": "__EXTEND_POINT__"
};
const DOMErrorMessages = {
  [53]: `v-html is missing expression.`,
  [54]: `v-html will override element children.`,
  [55]: `v-text is missing expression.`,
  [56]: `v-text will override element children.`,
  [57]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
  [58]: `v-model argument is not supported on plain elements.`,
  [59]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
  [60]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
  [61]: `v-show is missing expression.`,
  [62]: `<Transition> expects exactly one child element or component.`,
  [63]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
};
const transformVHtml = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(53, loc)
    );
  }
  if (node.children.length) {
    context.onError(
      createDOMCompilerError(54, loc)
    );
    node.children.length = 0;
  }
  return {
    props: [
      createObjectProperty(
        createSimpleExpression(`innerHTML`, true, loc),
        exp || createSimpleExpression("", true)
      )
    ]
  };
};
const transformVText = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(55, loc)
    );
  }
  if (node.children.length) {
    context.onError(
      createDOMCompilerError(56, loc)
    );
    node.children.length = 0;
  }
  return {
    props: [
      createObjectProperty(
        createSimpleExpression(`textContent`, true),
        exp ? getConstantType(exp, context) > 0 ? exp : createCallExpression(
          context.helperString(TO_DISPLAY_STRING),
          [exp],
          loc
        ) : createSimpleExpression("", true)
      )
    ]
  };
};
const transformModel = (dir, node, context) => {
  const baseResult = transformModel$1(dir, node, context);
  if (!baseResult.props.length || node.tagType === 1) {
    return baseResult;
  }
  if (dir.arg) {
    context.onError(
      createDOMCompilerError(
        58,
        dir.arg.loc
      )
    );
  }
  function checkDuplicatedValue() {
    const value = findDir(node, "bind");
    if (value && isStaticArgOf(value.arg, "value")) {
      context.onError(
        createDOMCompilerError(
          60,
          value.loc
        )
      );
    }
  }
  const { tag } = node;
  const isCustomElement = context.isCustomElement(tag);
  if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
    let directiveToUse = V_MODEL_TEXT;
    let isInvalidType = false;
    if (tag === "input" || isCustomElement) {
      const type = findProp(node, `type`);
      if (type) {
        if (type.type === 7) {
          directiveToUse = V_MODEL_DYNAMIC;
        } else if (type.value) {
          switch (type.value.content) {
            case "radio":
              directiveToUse = V_MODEL_RADIO;
              break;
            case "checkbox":
              directiveToUse = V_MODEL_CHECKBOX;
              break;
            case "file":
              isInvalidType = true;
              context.onError(
                createDOMCompilerError(
                  59,
                  dir.loc
                )
              );
              break;
            default:
              checkDuplicatedValue();
              break;
          }
        }
      } else if (hasDynamicKeyVBind(node)) {
        directiveToUse = V_MODEL_DYNAMIC;
      } else {
        checkDuplicatedValue();
      }
    } else if (tag === "select") {
      directiveToUse = V_MODEL_SELECT;
    } else {
      checkDuplicatedValue();
    }
    if (!isInvalidType) {
      baseResult.needRuntime = context.helper(directiveToUse);
    }
  } else {
    context.onError(
      createDOMCompilerError(
        57,
        dir.loc
      )
    );
  }
  baseResult.props = baseResult.props.filter(
    (p) => !(p.key.type === 4 && p.key.content === "modelValue")
  );
  return baseResult;
};
const isEventOptionModifier = /* @__PURE__ */ makeMap(`passive,once,capture`);
const isNonKeyModifier = /* @__PURE__ */ makeMap(
  // event propagation management
  `stop,prevent,self,ctrl,shift,alt,meta,exact,middle`
);
const maybeKeyModifier = /* @__PURE__ */ makeMap("left,right");
const isKeyboardEvent = /* @__PURE__ */ makeMap(`onkeyup,onkeydown,onkeypress`);
const resolveModifiers = (key, modifiers, context, loc) => {
  const keyModifiers = [];
  const nonKeyModifiers = [];
  const eventOptionModifiers = [];
  for (let i = 0; i < modifiers.length; i++) {
    const modifier = modifiers[i].content;
    if (modifier === "native" && checkCompatEnabled(
      "COMPILER_V_ON_NATIVE",
      context,
      loc
    )) {
      eventOptionModifiers.push(modifier);
    } else if (isEventOptionModifier(modifier)) {
      eventOptionModifiers.push(modifier);
    } else {
      if (maybeKeyModifier(modifier)) {
        if (isStaticExp(key)) {
          if (isKeyboardEvent(key.content.toLowerCase())) {
            keyModifiers.push(modifier);
          } else {
            nonKeyModifiers.push(modifier);
          }
        } else {
          keyModifiers.push(modifier);
          nonKeyModifiers.push(modifier);
        }
      } else {
        if (isNonKeyModifier(modifier)) {
          nonKeyModifiers.push(modifier);
        } else {
          keyModifiers.push(modifier);
        }
      }
    }
  }
  return {
    keyModifiers,
    nonKeyModifiers,
    eventOptionModifiers
  };
};
const transformClick = (key, event) => {
  const isStaticClick = isStaticExp(key) && key.content.toLowerCase() === "onclick";
  return isStaticClick ? createSimpleExpression(event, true) : key.type !== 4 ? createCompoundExpression([
    `(`,
    key,
    `) === "onClick" ? "${event}" : (`,
    key,
    `)`
  ]) : key;
};
const transformOn = (dir, node, context) => {
  return transformOn$1(dir, node, context, (baseResult) => {
    const { modifiers } = dir;
    if (!modifiers.length) return baseResult;
    let { key, value: handlerExp } = baseResult.props[0];
    const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
    if (nonKeyModifiers.includes("right")) {
      key = transformClick(key, `onContextmenu`);
    }
    if (nonKeyModifiers.includes("middle")) {
      key = transformClick(key, `onMouseup`);
    }
    if (nonKeyModifiers.length) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
        handlerExp,
        JSON.stringify(nonKeyModifiers)
      ]);
    }
    if (keyModifiers.length && // if event name is dynamic, always wrap with keys guard
    (!isStaticExp(key) || isKeyboardEvent(key.content.toLowerCase()))) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [
        handlerExp,
        JSON.stringify(keyModifiers)
      ]);
    }
    if (eventOptionModifiers.length) {
      const modifierPostfix = eventOptionModifiers.map(capitalize).join("");
      key = isStaticExp(key) ? createSimpleExpression(`${key.content}${modifierPostfix}`, true) : createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
    }
    return {
      props: [createObjectProperty(key, handlerExp)]
    };
  });
};
const transformShow = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(61, loc)
    );
  }
  return {
    props: [],
    needRuntime: context.helper(V_SHOW)
  };
};
const transformTransition = (node, context) => {
  if (node.type === 1 && node.tagType === 1) {
    const component = context.isBuiltInComponent(node.tag);
    if (component === TRANSITION) {
      return () => {
        if (!node.children.length) {
          return;
        }
        if (hasMultipleChildren(node)) {
          context.onError(
            createDOMCompilerError(
              62,
              {
                start: node.children[0].loc.start,
                end: node.children[node.children.length - 1].loc.end,
                source: ""
              }
            )
          );
        }
        const child = node.children[0];
        if (child.type === 1) {
          for (const p of child.props) {
            if (p.type === 7 && p.name === "show") {
              node.props.push({
                type: 6,
                name: "persisted",
                nameLoc: node.loc,
                value: void 0,
                loc: node.loc
              });
            }
          }
        }
      };
    }
  }
};
function hasMultipleChildren(node) {
  const children = node.children = node.children.filter(
    (c) => c.type !== 3 && !(c.type === 2 && !c.content.trim())
  );
  const child = children[0];
  return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(hasMultipleChildren);
}
const ignoreSideEffectTags = (node, context) => {
  if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
    context.onError(
      createDOMCompilerError(
        63,
        node.loc
      )
    );
    context.removeNode();
  }
};
function isValidHTMLNesting(parent, child) {
  if (parent in onlyValidChildren) {
    return onlyValidChildren[parent].has(child);
  }
  if (child in onlyValidParents) {
    return onlyValidParents[child].has(parent);
  }
  if (parent in knownInvalidChildren) {
    if (knownInvalidChildren[parent].has(child)) return false;
  }
  if (child in knownInvalidParents) {
    if (knownInvalidParents[child].has(parent)) return false;
  }
  return true;
}
const headings = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
const emptySet = /* @__PURE__ */ new Set([]);
const onlyValidChildren = {
  head: /* @__PURE__ */ new Set([
    "base",
    "basefront",
    "bgsound",
    "link",
    "meta",
    "title",
    "noscript",
    "noframes",
    "style",
    "script",
    "template"
  ]),
  optgroup: /* @__PURE__ */ new Set(["option"]),
  select: /* @__PURE__ */ new Set(["optgroup", "option", "hr"]),
  // table
  table: /* @__PURE__ */ new Set(["caption", "colgroup", "tbody", "tfoot", "thead"]),
  tr: /* @__PURE__ */ new Set(["td", "th"]),
  colgroup: /* @__PURE__ */ new Set(["col"]),
  tbody: /* @__PURE__ */ new Set(["tr"]),
  thead: /* @__PURE__ */ new Set(["tr"]),
  tfoot: /* @__PURE__ */ new Set(["tr"]),
  // these elements can not have any children elements
  script: emptySet,
  iframe: emptySet,
  option: emptySet,
  textarea: emptySet,
  style: emptySet,
  title: emptySet
};
const onlyValidParents = {
  // sections
  html: emptySet,
  body: /* @__PURE__ */ new Set(["html"]),
  head: /* @__PURE__ */ new Set(["html"]),
  // table
  td: /* @__PURE__ */ new Set(["tr"]),
  colgroup: /* @__PURE__ */ new Set(["table"]),
  caption: /* @__PURE__ */ new Set(["table"]),
  tbody: /* @__PURE__ */ new Set(["table"]),
  tfoot: /* @__PURE__ */ new Set(["table"]),
  col: /* @__PURE__ */ new Set(["colgroup"]),
  th: /* @__PURE__ */ new Set(["tr"]),
  thead: /* @__PURE__ */ new Set(["table"]),
  tr: /* @__PURE__ */ new Set(["tbody", "thead", "tfoot"]),
  // data list
  dd: /* @__PURE__ */ new Set(["dl", "div"]),
  dt: /* @__PURE__ */ new Set(["dl", "div"]),
  // other
  figcaption: /* @__PURE__ */ new Set(["figure"]),
  // li: new Set(["ul", "ol"]),
  summary: /* @__PURE__ */ new Set(["details"]),
  area: /* @__PURE__ */ new Set(["map"])
};
const knownInvalidChildren = {
  p: /* @__PURE__ */ new Set([
    "address",
    "article",
    "aside",
    "blockquote",
    "center",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "fieldset",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "menu",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "ul"
  ]),
  svg: /* @__PURE__ */ new Set([
    "b",
    "blockquote",
    "br",
    "code",
    "dd",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "menu",
    "meta",
    "ol",
    "p",
    "pre",
    "ruby",
    "s",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "table",
    "u",
    "ul",
    "var"
  ])
};
const knownInvalidParents = {
  a: /* @__PURE__ */ new Set(["a"]),
  button: /* @__PURE__ */ new Set(["button"]),
  dd: /* @__PURE__ */ new Set(["dd", "dt"]),
  dt: /* @__PURE__ */ new Set(["dd", "dt"]),
  form: /* @__PURE__ */ new Set(["form"]),
  li: /* @__PURE__ */ new Set(["li"]),
  h1: headings,
  h2: headings,
  h3: headings,
  h4: headings,
  h5: headings,
  h6: headings
};
const validateHtmlNesting = (node, context) => {
  if (node.type === 1 && node.tagType === 0 && context.parent && context.parent.type === 1 && context.parent.tagType === 0 && !isValidHTMLNesting(context.parent.tag, node.tag)) {
    const error = new SyntaxError(
      `<${node.tag}> cannot be child of <${context.parent.tag}>, according to HTML specifications. This can cause hydration errors or potentially disrupt future functionality.`
    );
    error.loc = node.loc;
    context.onWarn(error);
  }
};
const DOMNodeTransforms = [
  transformStyle,
  ...[transformTransition, validateHtmlNesting]
];
const DOMDirectiveTransforms = {
  cloak: noopDirectiveTransform,
  html: transformVHtml,
  text: transformVText,
  model: transformModel,
  // override compiler-core
  on: transformOn,
  // override compiler-core
  show: transformShow
};
function compile(src, options = {}) {
  return baseCompile(
    src,
    extend$1({}, parserOptions, options, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        ignoreSideEffectTags,
        ...DOMNodeTransforms,
        ...options.nodeTransforms || []
      ],
      directiveTransforms: extend$1(
        {},
        DOMDirectiveTransforms,
        options.directiveTransforms || {}
      ),
      transformHoist: null
    })
  );
}
function parse(template, options = {}) {
  return baseParse(template, extend$1({}, parserOptions, options));
}
const compilerDom_esmBundler = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BASE_TRANSITION,
  BindingTypes,
  CAMELIZE,
  CAPITALIZE,
  CREATE_BLOCK,
  CREATE_COMMENT,
  CREATE_ELEMENT_BLOCK,
  CREATE_ELEMENT_VNODE,
  CREATE_SLOTS,
  CREATE_STATIC,
  CREATE_TEXT,
  CREATE_VNODE,
  CompilerDeprecationTypes,
  ConstantTypes,
  DOMDirectiveTransforms,
  DOMErrorCodes,
  DOMErrorMessages,
  DOMNodeTransforms,
  ElementTypes,
  ErrorCodes,
  FRAGMENT,
  GUARD_REACTIVE_PROPS,
  IS_MEMO_SAME,
  IS_REF,
  KEEP_ALIVE,
  MERGE_PROPS,
  NORMALIZE_CLASS,
  NORMALIZE_PROPS,
  NORMALIZE_STYLE,
  Namespaces,
  NodeTypes,
  OPEN_BLOCK,
  POP_SCOPE_ID,
  PUSH_SCOPE_ID,
  RENDER_LIST,
  RENDER_SLOT,
  RESOLVE_COMPONENT,
  RESOLVE_DIRECTIVE,
  RESOLVE_DYNAMIC_COMPONENT,
  RESOLVE_FILTER,
  SET_BLOCK_TRACKING,
  SUSPENSE,
  TELEPORT,
  TO_DISPLAY_STRING,
  TO_HANDLERS,
  TO_HANDLER_KEY,
  TRANSITION,
  TRANSITION_GROUP,
  TS_NODE_TYPES,
  UNREF,
  V_MODEL_CHECKBOX,
  V_MODEL_DYNAMIC,
  V_MODEL_RADIO,
  V_MODEL_SELECT,
  V_MODEL_TEXT,
  V_ON_WITH_KEYS,
  V_ON_WITH_MODIFIERS,
  V_SHOW,
  WITH_CTX,
  WITH_DIRECTIVES,
  WITH_MEMO,
  advancePositionWithClone,
  advancePositionWithMutation,
  assert,
  baseCompile,
  baseParse,
  buildDirectiveArgs,
  buildProps,
  buildSlots,
  checkCompatEnabled,
  compile,
  convertToBlock,
  createArrayExpression,
  createAssignmentExpression,
  createBlockStatement,
  createCacheExpression,
  createCallExpression,
  createCompilerError,
  createCompoundExpression,
  createConditionalExpression,
  createDOMCompilerError,
  createForLoopParams,
  createFunctionExpression,
  createIfStatement,
  createInterpolation,
  createObjectExpression,
  createObjectProperty,
  createReturnStatement,
  createRoot,
  createSequenceExpression,
  createSimpleExpression,
  createStructuralDirectiveTransform,
  createTemplateLiteral,
  createTransformContext,
  createVNodeCall,
  errorMessages,
  extractIdentifiers,
  findDir,
  findProp,
  forAliasRE,
  generate,
  generateCodeFrame,
  getBaseTransformPreset,
  getConstantType,
  getMemoedVNodeCall,
  getVNodeBlockHelper,
  getVNodeHelper,
  hasDynamicKeyVBind,
  hasScopeRef,
  helperNameMap,
  injectProp,
  isCoreComponent,
  isFnExpression,
  isFnExpressionBrowser,
  isFnExpressionNode,
  isFunctionType,
  isInDestructureAssignment,
  isInNewExpression,
  isMemberExpression,
  isMemberExpressionBrowser,
  isMemberExpressionNode,
  isReferencedIdentifier,
  isSimpleIdentifier,
  isSlotOutlet,
  isStaticArgOf,
  isStaticExp,
  isStaticProperty,
  isStaticPropertyKey,
  isTemplateNode,
  isText: isText$1,
  isVSlot,
  locStub,
  noopDirectiveTransform,
  parse,
  parserOptions,
  processExpression,
  processFor,
  processIf,
  processSlotOutlet,
  registerRuntimeHelpers,
  resolveComponentType,
  stringifyExpression,
  toValidAssetId,
  trackSlotScopes,
  trackVForSlotScopes,
  transform,
  transformBind,
  transformElement,
  transformExpression,
  transformModel: transformModel$1,
  transformOn: transformOn$1,
  transformStyle,
  traverseNode,
  unwrapTSNode,
  walkBlockDeclarations,
  walkFunctionParams,
  walkIdentifiers,
  warnDeprecation
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(compilerDom_esmBundler);
const require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(runtimeDom_esmBundler);
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(shared_esmBundler);
/**
* vue v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var hasRequiredVue_cjs;
function requireVue_cjs() {
  if (hasRequiredVue_cjs) return vue_cjs;
  hasRequiredVue_cjs = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var compilerDom = require$$0;
    var runtimeDom = require$$1$1;
    var shared = require$$2;
    function _interopNamespaceDefault(e) {
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        for (var k in e) {
          n[k] = e[k];
        }
      }
      n.default = e;
      return Object.freeze(n);
    }
    var runtimeDom__namespace = /* @__PURE__ */ _interopNamespaceDefault(runtimeDom);
    const compileCache = /* @__PURE__ */ Object.create(null);
    function compileToFunction(template, options) {
      if (!shared.isString(template)) {
        if (template.nodeType) {
          template = template.innerHTML;
        } else {
          runtimeDom.warn(`invalid template option: `, template);
          return shared.NOOP;
        }
      }
      const key = shared.genCacheKey(template, options);
      const cached = compileCache[key];
      if (cached) {
        return cached;
      }
      if (template[0] === "#") {
        const el = document.querySelector(template);
        if (!el) {
          runtimeDom.warn(`Template element not found or is empty: ${template}`);
        }
        template = el ? el.innerHTML : ``;
      }
      const opts = shared.extend(
        {
          hoistStatic: true,
          onError,
          onWarn: (e) => onError(e, true)
        },
        options
      );
      if (!opts.isCustomElement && typeof customElements !== "undefined") {
        opts.isCustomElement = (tag) => !!customElements.get(tag);
      }
      const { code } = compilerDom.compile(template, opts);
      function onError(err, asWarning = false) {
        const message = asWarning ? err.message : `Template compilation error: ${err.message}`;
        const codeFrame = err.loc && shared.generateCodeFrame(
          template,
          err.loc.start.offset,
          err.loc.end.offset
        );
        runtimeDom.warn(codeFrame ? `${message}
${codeFrame}` : message);
      }
      const render = new Function("Vue", code)(runtimeDom__namespace);
      render._rc = true;
      return compileCache[key] = render;
    }
    runtimeDom.registerRuntimeCompiler(compileToFunction);
    exports.compile = compileToFunction;
    Object.keys(runtimeDom).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = runtimeDom[k];
    });
  })(vue_cjs);
  return vue_cjs;
}
var hasRequiredVue;
function requireVue() {
  if (hasRequiredVue) return vue.exports;
  hasRequiredVue = 1;
  {
    vue.exports = requireVue_cjs();
  }
  return vue.exports;
}
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var version = "1.14.0";
function userAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches(el, selector) {
  if (!selector) return;
  selector[0] === ">" && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest(el, selector, ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx) break;
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state2) {
  if (el && name) {
    if (el.classList) {
      el.classList[state2 ? "add" : "remove"](name);
    } else {
      var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
      el.className = (className + (state2 ? " " + name : "")).replace(R_SPACE, " ");
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf("webkit") === -1) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      var transform2 = css(el, "transform");
      if (transform2 && transform2 !== "none") {
        appliedTransforms = transform2 + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }
    return list;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    container = container || el.parentNode;
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
          var containerRect = container.getBoundingClientRect();
          top -= containerRect.top + parseInt(css(container, "border-top-width"));
          left -= containerRect.left + parseInt(css(container, "border-left-width"));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide], visible = void 0;
    {
      visible = elSideVal >= parentSideVal;
    }
    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0, i = 0, children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}
function index(el, selector) {
  var index2 = 0;
  if (!el || !el.parentNode) {
    return -1;
  }
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index2++;
    }
  }
  return index2;
}
function getRelativeScrollOffset(el) {
  var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}
function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function() {
    if (!_throttleTimeout) {
      var args = arguments, _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
function setRect(el, rect) {
  css(el, "position", "absolute");
  css(el, "top", rect.top);
  css(el, "left", rect.left);
  css(el, "width", rect.width);
  css(el, "height", rect.height);
}
function unsetRect(el) {
  css(el, "position", "");
  css(el, "top", "");
  css(el, "left", "");
  css(el, "width", "");
  css(el, "height", "");
}
var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function AnimationStateManager() {
  var animationStates = [], animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function(child) {
        if (css(child, "display") === "none" || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state2) {
      animationStates.push(state2);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === "function") callback();
        return;
      }
      var animating = false, animationTime = 0;
      animationStates.forEach(function(state2) {
        var time = 0, target = state2.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state2.rect, targetMatrix = matrix(target, true);
        if (targetMatrix) {
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function() {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === "function") callback();
      } else {
        animationCallbackId = setTimeout(function() {
          if (typeof callback === "function") callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, "transition", "");
        css(target, "transform", "");
        var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
        this.forRepaintDummy = repaint(target);
        css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
        css(target, "transform", "translate3d(0,0,0)");
        typeof target.animated === "number" && clearTimeout(target.animated);
        target.animated = setTimeout(function() {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}
var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    for (var option2 in defaults) {
      if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
        plugin[option2] = defaults[option2];
      }
    }
    plugins.forEach(function(p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function() {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + "Global";
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable
        }, evt));
      }
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
    plugins.forEach(function(plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;
      _extends(defaults2, initialized.defaults);
    });
    for (var option2 in sortable.options) {
      if (!sortable.options.hasOwnProperty(option2)) continue;
      var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
      if (typeof modified !== "undefined") {
        sortable.options[option2] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function(plugin) {
      if (typeof plugin.eventProperties !== "function") return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};
function dispatchEvent(_ref) {
  var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl2 && rootEl2[expando];
  if (!sortable) return;
  var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl2;
  evt.from = fromEl || rootEl2;
  evt.item = targetEl || rootEl2;
  evt.clone = cloneEl2;
  evt.oldIndex = oldIndex2;
  evt.newIndex = newIndex2;
  evt.oldDraggableIndex = oldDraggableIndex2;
  evt.newDraggableIndex = newDraggableIndex2;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option2 in allEventProperties) {
    evt[option2] = allEventProperties[option2];
  }
  if (rootEl2) {
    rootEl2.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}
var _excluded = ["evt"];
var pluginEvent2 = function pluginEvent3(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable,
        name,
        originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, info));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (!documentExists) return;
  if (IE11OrLess) {
    return false;
  }
  var el = document.createElement("x");
  el.style.cssText = "pointer-events:auto";
  return el.style.pointerEvents === "auto";
}(), _detectDirection = function _detectDirection2(el, options) {
  var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
  if (elCSS.display === "flex") {
    return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  }
  if (elCSS.display === "grid") {
    return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  }
  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
    var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
    return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
  }
  return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
}, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
  var ret;
  sortables.some(function(sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable)) return;
    var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
}, _prepareGroup = function _prepareGroup2(options) {
  function toFn(value, pull) {
    return function(to, from, dragEl2, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
      if (value == null && (pull || sameGroup)) {
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === "clone") {
        return value;
      } else if (typeof value === "function") {
        return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }
  var group = {};
  var originalGroup = options.group;
  if (!originalGroup || _typeof(originalGroup) != "object") {
    originalGroup = {
      name: originalGroup
    };
  }
  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
}, _hideGhostForTarget = function _hideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "none");
  }
}, _unhideGhostForTarget = function _unhideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "");
  }
};
if (documentExists) {
  document.addEventListener("click", function(evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el;
  this.options = options = _extends({}, options);
  el[expando] = this;
  var defaults2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl2) {
      dataTransfer.setData("Text", dragEl2.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults2);
  for (var name in defaults2) {
    !(name in options) && (options[name] = defaults2[name]);
  }
  _prepareGroup(options);
  for (var fn in this) {
    if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
      this[fn] = this[fn].bind(this);
    }
  }
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    this.options.touchStartThreshold = 1;
  }
  if (options.supportPointer) {
    on(el, "pointerdown", this._onTapStart);
  } else {
    on(el, "mousedown", this._onTapStart);
    on(el, "touchstart", this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, "dragover", this);
    on(el, "dragenter", this);
  }
  sortables.push(this.el);
  options.store && options.store.get && this.sort(options.store.get(this) || []);
  _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(evt) {
    if (!evt.cancelable) return;
    var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
    _saveInputCheckedState(el);
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return;
    }
    if (originalTarget.isContentEditable) {
      return;
    }
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      return;
    }
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);
    if (typeof filter === "function") {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: "filter",
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent2("filter", _this, {
          evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    } else if (filter) {
      filter = filter.split(",").some(function(criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: "filter",
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(evt, touch, target) {
    var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style["will-change"] = "all";
      dragStartFn = function dragStartFn2() {
        pluginEvent2("delayEnded", _this, {
          evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }
        _this._triggerDragStart(evt, touch);
        _dispatchEvent({
          sortable: _this,
          name: "choose",
          originalEvent: evt
        });
        toggleClass(dragEl, options.chosenClass, true);
      };
      options.ignore.split(",").forEach(function(criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mouseup", _this._onDrop);
      on(ownerDocument, "touchend", _this._onDrop);
      on(ownerDocument, "touchcancel", _this._onDrop);
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent2("delayStart", this, {
        evt
      });
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(ownerDocument, "mouseup", _this._disableDelayedDrag);
        on(ownerDocument, "touchend", _this._disableDelayedDrag);
        on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
        on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
        on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._disableDelayedDrag);
    off(ownerDocument, "touchend", this._disableDelayedDrag);
    off(ownerDocument, "touchcancel", this._disableDelayedDrag);
    off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(evt, touch) {
    touch = touch || evt.pointerType == "touch" && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, "pointermove", this._onTouchMove);
      } else if (touch) {
        on(document, "touchmove", this._onTouchMove);
      } else {
        on(document, "mousemove", this._onTouchMove);
      }
    } else {
      on(dragEl, "dragend", this);
      on(rootEl, "dragstart", this._onDragStart);
    }
    try {
      if (document.selection) {
        _nextTick(function() {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {
    }
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent2("dragStarted", this, {
        evt
      });
      if (this.nativeDraggable) {
        on(document, "dragover", _checkOutsideTargetEl);
      }
      var options = this.options;
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();
      _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent;
        } while (parent = parent.parentNode);
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(evt) {
    if (tapEvt) {
      var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, "webkitTransform", cssMatrix);
        css(ghostEl, "mozTransform", cssMatrix);
        css(ghostEl, "msTransform", cssMatrix);
        css(ghostEl, "transform", cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
      if (PositionGhostAbsolutely) {
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, "transition", "");
      css(ghostEl, "transform", "");
      css(ghostEl, "box-sizing", "border-box");
      css(ghostEl, "margin", 0);
      css(ghostEl, "top", rect.top);
      css(ghostEl, "left", rect.left);
      css(ghostEl, "width", rect.width);
      css(ghostEl, "height", rect.height);
      css(ghostEl, "opacity", "0.8");
      css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
      css(ghostEl, "zIndex", "100000");
      css(ghostEl, "pointerEvents", "none");
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);
      css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function _onDragStart(evt, fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent2("dragStart", this, {
      evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent2("setupClone", this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style["will-change"] = "";
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }
    _this.cloneId = _nextTick(function() {
      pluginEvent2("clone", _this);
      if (Sortable.eventCanceled) return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: "clone"
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      off(document, "mouseup", _this._onDrop);
      off(document, "touchend", _this._onDrop);
      off(document, "touchcancel", _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = "move";
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, "drop", _this);
      css(dragEl, "transform", "translateZ(0)");
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, "selectstart", _this);
    moved = true;
    if (Safari) {
      css(document.body, "user-select", "none");
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(evt) {
    var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
    if (_silent) return;
    function dragOverEvent(name, extra) {
      pluginEvent2(name, _this, _objectSpread2({
        evt,
        isOwner,
        axis: vertical ? "vertical" : "horizontal",
        revert,
        dragRect,
        targetRect,
        canSort,
        fromSortable,
        target,
        completed,
        onMove: function onMove(target2, after2) {
          return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
        },
        changed
      }, extra));
    }
    function capture() {
      dragOverEvent("dragOverAnimationCapture");
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }
    function completed(insertion) {
      dragOverEvent("dragOverCompleted", {
        insertion
      });
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function() {
          dragOverEvent("dragOverAnimationComplete");
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: "change",
        toEl: el,
        newIndex,
        newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent("dragOver");
    if (Sortable.eventCanceled) return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === "vertical";
      dragRect = getRect(dragEl);
      dragOverEvent("dragOverValid");
      if (Sortable.eventCanceled) return completedFired;
      if (revert) {
        parentEl = rootEl;
        capture();
        this._hideClone();
        dragOverEvent("revert");
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        if (elLastChild === dragEl) {
          return completed(false);
        }
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
        }
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling, after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode;
          if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, "mousemove", this._onTouchMove);
    off(document, "touchmove", this._onTouchMove);
    off(document, "pointermove", this._onTouchMove);
    off(document, "dragover", nearestEmptyInsertDetectEvent);
    off(document, "mousemove", nearestEmptyInsertDetectEvent);
    off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._onDrop);
    off(ownerDocument, "touchend", this._onDrop);
    off(ownerDocument, "pointerup", this._onDrop);
    off(ownerDocument, "touchcancel", this._onDrop);
    off(document, "selectstart", this);
  },
  _onDrop: function _onDrop(evt) {
    var el = this.el, options = this.options;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent2("drop", this, {
      evt
    });
    parentEl = dragEl && dragEl.parentNode;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);
    if (this.nativeDraggable) {
      off(document, "drop", this);
      off(el, "dragstart", this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, "user-select", "");
    }
    css(dragEl, "transform", "");
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, "dragend", this);
        }
        _disableDraggable(dragEl);
        dragEl.style["will-change"] = "";
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);
        _dispatchEvent({
          sortable: this,
          name: "unchoose",
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            _dispatchEvent({
              rootEl: parentEl,
              name: "add",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "remove",
              toEl: parentEl,
              originalEvent: evt
            });
            _dispatchEvent({
              rootEl: parentEl,
              name: "sort",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "sort",
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              _dispatchEvent({
                sortable: this,
                name: "update",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: "end",
            toEl: parentEl,
            originalEvent: evt
          });
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent2("nulling", this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function(el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(evt) {
    switch (evt.type) {
      case "drop":
      case "dragend":
        this._onDrop(evt);
        break;
      case "dragenter":
      case "dragover":
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case "selectstart":
        evt.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {}, rootEl2 = this.el;
    this.toArray().forEach(function(id, i) {
      var el = rootEl2.children[i];
      if (closest(el, this.options.draggable, rootEl2, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function(id) {
      if (items[id]) {
        rootEl2.removeChild(items[id]);
        rootEl2.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function save() {
    var store2 = this.options.store;
    store2 && store2.set && store2.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== "undefined") {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === "group") {
        _prepareGroup(options);
      }
    }
  },
  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent2("destroy", this);
    var el = this.el;
    el[expando] = null;
    off(el, "mousedown", this._onTapStart);
    off(el, "touchstart", this._onTapStart);
    off(el, "pointerdown", this._onTapStart);
    if (this.nativeDraggable) {
      off(el, "dragover", this);
      off(el, "dragenter", this);
    }
    Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
      el2.removeAttribute("draggable");
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent2("hideClone", this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, "display", "none");
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable2) {
    if (putSortable2.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent2("showClone", this);
      if (Sortable.eventCanceled) return;
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, "display", "");
      cloneHidden = false;
    }
  }
};
function _globalDragOver(evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent("move", true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl2;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var spacer = 10;
  return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
  if (!invertSwap) {
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName("input");
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}
if (documentExists) {
  on(document, "touchmove", function(evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild
};
Sortable.get = function(element) {
  return element[expando];
};
Sortable.mount = function() {
  for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins2[_key] = arguments[_key];
  }
  if (plugins2[0].constructor === Array) plugins2 = plugins2[0];
  plugins2.forEach(function(plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
Sortable.create = function(el, options) {
  return new Sortable(el, options);
};
Sortable.version = version;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted2(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, "dragover", this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, "touchmove", this._handleFallbackAutoScroll);
        } else {
          on(document, "mousemove", this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop3() {
      if (this.sortable.nativeDraggable) {
        off(document, "dragover", this._handleAutoScroll);
      } else {
        off(document, "pointermove", this._handleFallbackAutoScroll);
        off(document, "touchmove", this._handleFallbackAutoScroll);
        off(document, "mousemove", this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt;
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          pointerElemChangedInterval = setInterval(function() {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(autoScroll2) {
    clearInterval(autoScroll2.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
  var scrollThisInstance = false, scrollCustomFn;
  if (scrollRootEl !== rootEl2) {
    scrollRootEl = rootEl2;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl2, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        autoScrolls[layersOut].pid = setInterval((function() {
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1);
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === "function") {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }).bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance;
}, 30);
var drop = function drop2(_ref) {
  var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable2 || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent("spill");
    this.onSpill({
      dragEl: dragEl2,
      putSortable: putSortable2
    });
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex2 = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex2;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable2) {
      putSortable2.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl2, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl2);
    }
    this.sortable.animateAll();
    if (putSortable2) {
      putSortable2.animateAll();
    }
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function onSpill2(_ref4) {
    var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
    var parentSortable = putSortable2 || this.sortable;
    parentSortable.captureAnimationState();
    dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
    parentSortable.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
var lastSwapEl;
function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  Swap.prototype = {
    dragStart: function dragStart2(_ref) {
      var dragEl2 = _ref.dragEl;
      lastSwapEl = dragEl2;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed, target = _ref2.target, onMove = _ref2.onMove, activeSortable = _ref2.activeSortable, changed = _ref2.changed, cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el, options = this.options;
      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;
        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }
        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }
      changed();
      completed(true);
      cancel();
    },
    drop: function drop3(_ref3) {
      var activeSortable = _ref3.activeSortable, putSortable2 = _ref3.putSortable, dragEl2 = _ref3.dragEl;
      var toSortable = putSortable2 || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
      if (lastSwapEl && (options.swap || putSortable2 && putSortable2.options.swap)) {
        if (dragEl2 !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl2, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: "swap",
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}
function swapNodes(n1, n2) {
  var p1 = n1.parentNode, p2 = n2.parentNode, i1, i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);
  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }
  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}
var multiDragElements = [], multiDragClones = [], lastMultiDragSelect, multiDragSortable, initialFolding = false, folding = false, dragStarted = false, dragEl$1, clonesFromRect, clonesHidden;
function MultiDragPlugin() {
  function MultiDrag(sortable) {
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    if (sortable.options.supportPointer) {
      on(document, "pointerup", this._deselectMultiDrag);
    } else {
      on(document, "mouseup", this._deselectMultiDrag);
      on(document, "touchend", this._deselectMultiDrag);
    }
    on(document, "keydown", this._checkKeyDown);
    on(document, "keyup", this._checkKeyUp);
    this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      setData: function setData(dataTransfer, dragEl2) {
        var data = "";
        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function(multiDragElement, i) {
            data += (!i ? "" : ", ") + multiDragElement.textContent;
          });
        } else {
          data = dragEl2.textContent;
        }
        dataTransfer.setData("Text", data);
      }
    };
  }
  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable, cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;
      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style["will-change"] = "";
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }
      sortable._hideClone();
      cancel();
    },
    clone: function clone2(_ref3) {
      var sortable = _ref3.sortable, rootEl2 = _ref3.rootEl, dispatchSortableEvent = _ref3.dispatchSortableEvent, cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;
      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl2);
          dispatchSortableEvent("clone");
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown, rootEl2 = _ref4.rootEl, cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl2);
      multiDragClones.forEach(function(clone2) {
        css(clone2, "display", "");
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;
      _ref5.sortable;
      var cloneNowHidden = _ref5.cloneNowHidden, cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function(clone2) {
        css(clone2, "display", "none");
        if (_this.options.removeCloneOnHide && clone2.parentNode) {
          clone2.parentNode.removeChild(clone2);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      _ref6.sortable;
      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }
      multiDragElements.forEach(function(multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      });
      multiDragElements = multiDragElements.sort(function(a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted2(_ref7) {
      var _this2 = this;
      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;
      if (this.options.sort) {
        sortable.captureAnimationState();
        if (this.options.animation) {
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, "position", "absolute");
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }
      sortable.animateAll(function() {
        folding = false;
        initialFolding = false;
        if (_this2.options.animation) {
          multiDragElements.forEach(function(multiDragElement) {
            unsetRect(multiDragElement);
          });
        }
        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target, completed = _ref8.completed, cancel = _ref8.cancel;
      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable, rootEl2 = _ref9.rootEl, sortable = _ref9.sortable, dragRect = _ref9.dragRect;
      if (multiDragElements.length > 1) {
        multiDragElements.forEach(function(multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl2);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable, isOwner = _ref10.isOwner, insertion = _ref10.insertion, activeSortable = _ref10.activeSortable, parentEl2 = _ref10.parentEl, putSortable2 = _ref10.putSortable;
      var options = this.options;
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        }
        initialFolding = false;
        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable2)) {
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute);
            parentEl2.appendChild(multiDragElement);
          });
          folding = true;
        }
        if (!isOwner) {
          if (!folding) {
            removeMultiDragElements();
          }
          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;
            activeSortable._showClone(sortable);
            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function(clone2) {
                activeSortable.addAnimationState({
                  target: clone2,
                  rect: clonesFromRect
                });
                clone2.fromRect = clonesFromRect;
                clone2.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect, isOwner = _ref11.isOwner, activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function(multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });
      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop3(_ref12) {
      var evt = _ref12.originalEvent, rootEl2 = _ref12.rootEl, parentEl2 = _ref12.parentEl, sortable = _ref12.sortable, dispatchSortableEvent = _ref12.dispatchSortableEvent, oldIndex2 = _ref12.oldIndex, putSortable2 = _ref12.putSortable;
      var toSortable = putSortable2 || this.sortable;
      if (!evt) return;
      var options = this.options, children = parentEl2.children;
      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }
        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable,
            rootEl: rootEl2,
            name: "select",
            targetEl: dragEl$1
          });
          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect), currentIndex = index(dragEl$1);
            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              var n, i;
              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }
              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable,
                  rootEl: rootEl2,
                  name: "select",
                  targetEl: children[i]
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }
          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable,
            rootEl: rootEl2,
            name: "deselect",
            targetEl: dragEl$1
          });
        }
      }
      if (dragStarted && this.isMultiDrag) {
        folding = false;
        if ((parentEl2[expando].options.sort || parentEl2 !== rootEl2) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1), multiDragIndex = index(dragEl$1, ":not(." + this.options.selectedClass + ")");
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();
          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function(multiDragElement) {
                multiDragElement.thisAnimationDuration = null;
                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect;
                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect
                  });
                }
              });
            }
            removeMultiDragElements();
            multiDragElements.forEach(function(multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl2.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl2.appendChild(multiDragElement);
              }
              multiDragIndex++;
            });
            if (oldIndex2 === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function(multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });
              if (update) {
                dispatchSortableEvent("update");
              }
            }
          }
          multiDragElements.forEach(function(multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }
        multiDragSortable = toSortable;
      }
      if (rootEl2 === parentEl2 || putSortable2 && putSortable2.lastPutMode !== "clone") {
        multiDragClones.forEach(function(clone2) {
          clone2.parentNode && clone2.parentNode.removeChild(clone2);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();
      off(document, "pointerup", this._deselectMultiDrag);
      off(document, "mouseup", this._deselectMultiDrag);
      off(document, "touchend", this._deselectMultiDrag);
      off(document, "keydown", this._checkKeyDown);
      off(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return;
      if (multiDragSortable !== this.sortable) return;
      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return;
      if (evt && evt.button !== 0) return;
      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: "deselect",
          targetEl: el
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;
        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
          multiDragSortable = sortable;
        }
        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando], index2 = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index2) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index2, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;
      var oldIndicies = [], newIndicies = [];
      multiDragElements.forEach(function(multiDragElement) {
        oldIndicies.push({
          multiDragElement,
          index: multiDragElement.sortableIndex
        });
        var newIndex2;
        if (folding && multiDragElement !== dragEl$1) {
          newIndex2 = -1;
        } else if (folding) {
          newIndex2 = index(multiDragElement, ":not(." + _this3.options.selectedClass + ")");
        } else {
          newIndex2 = index(multiDragElement);
        }
        newIndicies.push({
          multiDragElement,
          index: newIndex2
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies,
        newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();
        if (key === "ctrl") {
          key = "Control";
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }
        return key;
      }
    }
  });
}
function insertMultiDragElements(clonesInserted, rootEl2) {
  multiDragElements.forEach(function(multiDragElement, i) {
    var target = rootEl2.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
    if (target) {
      rootEl2.insertBefore(multiDragElement, target);
    } else {
      rootEl2.appendChild(multiDragElement);
    }
  });
}
function insertMultiDragClones(elementsInserted, rootEl2) {
  multiDragClones.forEach(function(clone2, i) {
    var target = rootEl2.children[clone2.sortableIndex + (elementsInserted ? Number(i) : 0)];
    if (target) {
      rootEl2.insertBefore(clone2, target);
    } else {
      rootEl2.appendChild(clone2);
    }
  });
}
function removeMultiDragElements() {
  multiDragElements.forEach(function(multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
const sortable_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MultiDrag: MultiDragPlugin,
  Sortable,
  Swap: SwapPlugin,
  default: Sortable
}, Symbol.toStringTag, { value: "Module" }));
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(sortable_esm);
var vuedraggable_umd = vuedraggable_umd$1.exports;
var hasRequiredVuedraggable_umd;
function requireVuedraggable_umd() {
  if (hasRequiredVuedraggable_umd) return vuedraggable_umd$1.exports;
  hasRequiredVuedraggable_umd = 1;
  (function(module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
      module.exports = factory(requireVue(), require$$1);
    })(typeof self !== "undefined" ? self : vuedraggable_umd, function(__WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a352__) {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1) value = __webpack_require__(value);
            if (mode & 8) return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, (function(key2) {
              return value[key2];
            }).bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = "fb15");
        }({
          /***/
          "00ee": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var test = {};
              test[TO_STRING_TAG] = "z";
              module2.exports = String(test) === "[object z]";
            }
          ),
          /***/
          "0366": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var aFunction = __webpack_require__("1c0b");
              module2.exports = function(fn, that, length) {
                aFunction(fn);
                if (that === void 0) return fn;
                switch (length) {
                  case 0:
                    return function() {
                      return fn.call(that);
                    };
                  case 1:
                    return function(a) {
                      return fn.call(that, a);
                    };
                  case 2:
                    return function(a, b) {
                      return fn.call(that, a, b);
                    };
                  case 3:
                    return function(a, b, c) {
                      return fn.call(that, a, b, c);
                    };
                }
                return function() {
                  return fn.apply(that, arguments);
                };
              };
            }
          ),
          /***/
          "057f": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var nativeGetOwnPropertyNames = __webpack_require__("241c").f;
              var toString = {}.toString;
              var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
              var getWindowNames = function(it) {
                try {
                  return nativeGetOwnPropertyNames(it);
                } catch (error) {
                  return windowNames.slice();
                }
              };
              module2.exports.f = function getOwnPropertyNames(it) {
                return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
              };
            }
          ),
          /***/
          "06cf": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var propertyIsEnumerableModule = __webpack_require__("d1e7");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var toIndexedObject = __webpack_require__("fc6a");
              var toPrimitive = __webpack_require__("c04e");
              var has = __webpack_require__("5135");
              var IE8_DOM_DEFINE = __webpack_require__("0cfb");
              var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
              exports2.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
                O = toIndexedObject(O);
                P = toPrimitive(P, true);
                if (IE8_DOM_DEFINE) try {
                  return nativeGetOwnPropertyDescriptor(O, P);
                } catch (error) {
                }
                if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
              };
            }
          ),
          /***/
          "0cfb": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var fails = __webpack_require__("d039");
              var createElement = __webpack_require__("cc12");
              module2.exports = !DESCRIPTORS && !fails(function() {
                return Object.defineProperty(createElement("div"), "a", {
                  get: function() {
                    return 7;
                  }
                }).a != 7;
              });
            }
          ),
          /***/
          "13d5": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $reduce = __webpack_require__("d58f").left;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var STRICT_METHOD = arrayMethodIsStrict("reduce");
              var USES_TO_LENGTH = arrayMethodUsesToLength("reduce", { 1: 0 });
              $({ target: "Array", proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
                reduce: function reduce(callbackfn) {
                  return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            }
          ),
          /***/
          "14c3": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var classof = __webpack_require__("c6b6");
              var regexpExec = __webpack_require__("9263");
              module2.exports = function(R, S) {
                var exec = R.exec;
                if (typeof exec === "function") {
                  var result = exec.call(R, S);
                  if (typeof result !== "object") {
                    throw TypeError("RegExp exec method returned something other than an Object or null");
                  }
                  return result;
                }
                if (classof(R) !== "RegExp") {
                  throw TypeError("RegExp#exec called on incompatible receiver");
                }
                return regexpExec.call(R, S);
              };
            }
          ),
          /***/
          "159b": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var DOMIterables = __webpack_require__("fdbc");
              var forEach = __webpack_require__("17c2");
              var createNonEnumerableProperty = __webpack_require__("9112");
              for (var COLLECTION_NAME in DOMIterables) {
                var Collection = global[COLLECTION_NAME];
                var CollectionPrototype = Collection && Collection.prototype;
                if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
                  createNonEnumerableProperty(CollectionPrototype, "forEach", forEach);
                } catch (error) {
                  CollectionPrototype.forEach = forEach;
                }
              }
            }
          ),
          /***/
          "17c2": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $forEach = __webpack_require__("b727").forEach;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var STRICT_METHOD = arrayMethodIsStrict("forEach");
              var USES_TO_LENGTH = arrayMethodUsesToLength("forEach");
              module2.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn) {
                return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
              } : [].forEach;
            }
          ),
          /***/
          "1be4": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              module2.exports = getBuiltIn("document", "documentElement");
            }
          ),
          /***/
          "1c0b": (
            /***/
            function(module2, exports2) {
              module2.exports = function(it) {
                if (typeof it != "function") {
                  throw TypeError(String(it) + " is not a function");
                }
                return it;
              };
            }
          ),
          /***/
          "1c7e": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              var SAFE_CLOSING = false;
              try {
                var called = 0;
                var iteratorWithReturn = {
                  next: function() {
                    return { done: !!called++ };
                  },
                  "return": function() {
                    SAFE_CLOSING = true;
                  }
                };
                iteratorWithReturn[ITERATOR] = function() {
                  return this;
                };
                Array.from(iteratorWithReturn, function() {
                  throw 2;
                });
              } catch (error) {
              }
              module2.exports = function(exec, SKIP_CLOSING) {
                if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
                var ITERATION_SUPPORT = false;
                try {
                  var object = {};
                  object[ITERATOR] = function() {
                    return {
                      next: function() {
                        return { done: ITERATION_SUPPORT = true };
                      }
                    };
                  };
                  exec(object);
                } catch (error) {
                }
                return ITERATION_SUPPORT;
              };
            }
          ),
          /***/
          "1d80": (
            /***/
            function(module2, exports2) {
              module2.exports = function(it) {
                if (it == void 0) throw TypeError("Can't call method on " + it);
                return it;
              };
            }
          ),
          /***/
          "1dde": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var wellKnownSymbol = __webpack_require__("b622");
              var V8_VERSION = __webpack_require__("2d00");
              var SPECIES = wellKnownSymbol("species");
              module2.exports = function(METHOD_NAME) {
                return V8_VERSION >= 51 || !fails(function() {
                  var array = [];
                  var constructor = array.constructor = {};
                  constructor[SPECIES] = function() {
                    return { foo: 1 };
                  };
                  return array[METHOD_NAME](Boolean).foo !== 1;
                });
              };
            }
          ),
          /***/
          "23cb": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var toInteger2 = __webpack_require__("a691");
              var max = Math.max;
              var min = Math.min;
              module2.exports = function(index2, length) {
                var integer = toInteger2(index2);
                return integer < 0 ? max(integer + length, 0) : min(integer, length);
              };
            }
          ),
          /***/
          "23e7": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var setGlobal = __webpack_require__("ce4e");
              var copyConstructorProperties = __webpack_require__("e893");
              var isForced = __webpack_require__("94ca");
              module2.exports = function(options, source) {
                var TARGET = options.target;
                var GLOBAL = options.global;
                var STATIC = options.stat;
                var FORCED, target, key, targetProperty, sourceProperty, descriptor;
                if (GLOBAL) {
                  target = global;
                } else if (STATIC) {
                  target = global[TARGET] || setGlobal(TARGET, {});
                } else {
                  target = (global[TARGET] || {}).prototype;
                }
                if (target) for (key in source) {
                  sourceProperty = source[key];
                  if (options.noTargetGet) {
                    descriptor = getOwnPropertyDescriptor(target, key);
                    targetProperty = descriptor && descriptor.value;
                  } else targetProperty = target[key];
                  FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
                  if (!FORCED && targetProperty !== void 0) {
                    if (typeof sourceProperty === typeof targetProperty) continue;
                    copyConstructorProperties(sourceProperty, targetProperty);
                  }
                  if (options.sham || targetProperty && targetProperty.sham) {
                    createNonEnumerableProperty(sourceProperty, "sham", true);
                  }
                  redefine(target, key, sourceProperty, options);
                }
              };
            }
          ),
          /***/
          "241c": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var internalObjectKeys = __webpack_require__("ca84");
              var enumBugKeys = __webpack_require__("7839");
              var hiddenKeys = enumBugKeys.concat("length", "prototype");
              exports2.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
                return internalObjectKeys(O, hiddenKeys);
              };
            }
          ),
          /***/
          "25f0": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var redefine = __webpack_require__("6eeb");
              var anObject = __webpack_require__("825a");
              var fails = __webpack_require__("d039");
              var flags = __webpack_require__("ad6d");
              var TO_STRING = "toString";
              var RegExpPrototype = RegExp.prototype;
              var nativeToString = RegExpPrototype[TO_STRING];
              var NOT_GENERIC = fails(function() {
                return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
              });
              var INCORRECT_NAME = nativeToString.name != TO_STRING;
              if (NOT_GENERIC || INCORRECT_NAME) {
                redefine(RegExp.prototype, TO_STRING, function toString() {
                  var R = anObject(this);
                  var p = String(R.source);
                  var rf = R.flags;
                  var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
                  return "/" + p + "/" + f;
                }, { unsafe: true });
              }
            }
          ),
          /***/
          "2ca0": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var toLength = __webpack_require__("50c4");
              var notARegExp = __webpack_require__("5a34");
              var requireObjectCoercible = __webpack_require__("1d80");
              var correctIsRegExpLogic = __webpack_require__("ab13");
              var IS_PURE = __webpack_require__("c430");
              var nativeStartsWith = "".startsWith;
              var min = Math.min;
              var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
              var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
                var descriptor = getOwnPropertyDescriptor(String.prototype, "startsWith");
                return descriptor && !descriptor.writable;
              }();
              $({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
                startsWith: function startsWith(searchString) {
                  var that = String(requireObjectCoercible(this));
                  notARegExp(searchString);
                  var index2 = toLength(min(arguments.length > 1 ? arguments[1] : void 0, that.length));
                  var search = String(searchString);
                  return nativeStartsWith ? nativeStartsWith.call(that, search, index2) : that.slice(index2, index2 + search.length) === search;
                }
              });
            }
          ),
          /***/
          "2d00": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var userAgent2 = __webpack_require__("342f");
              var process = global.process;
              var versions = process && process.versions;
              var v8 = versions && versions.v8;
              var match, version2;
              if (v8) {
                match = v8.split(".");
                version2 = match[0] + match[1];
              } else if (userAgent2) {
                match = userAgent2.match(/Edge\/(\d+)/);
                if (!match || match[1] >= 74) {
                  match = userAgent2.match(/Chrome\/(\d+)/);
                  if (match) version2 = match[1];
                }
              }
              module2.exports = version2 && +version2;
            }
          ),
          /***/
          "342f": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              module2.exports = getBuiltIn("navigator", "userAgent") || "";
            }
          ),
          /***/
          "35a1": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var classof = __webpack_require__("f5df");
              var Iterators = __webpack_require__("3f8c");
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              module2.exports = function(it) {
                if (it != void 0) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
              };
            }
          ),
          /***/
          "37e8": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var definePropertyModule = __webpack_require__("9bf2");
              var anObject = __webpack_require__("825a");
              var objectKeys = __webpack_require__("df75");
              module2.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
                anObject(O);
                var keys = objectKeys(Properties);
                var length = keys.length;
                var index2 = 0;
                var key;
                while (length > index2) definePropertyModule.f(O, key = keys[index2++], Properties[key]);
                return O;
              };
            }
          ),
          /***/
          "3bbe": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module2.exports = function(it) {
                if (!isObject2(it) && it !== null) {
                  throw TypeError("Can't set " + String(it) + " as a prototype");
                }
                return it;
              };
            }
          ),
          /***/
          "3ca3": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var charAt = __webpack_require__("6547").charAt;
              var InternalStateModule = __webpack_require__("69f3");
              var defineIterator = __webpack_require__("7dd0");
              var STRING_ITERATOR = "String Iterator";
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
              defineIterator(String, "String", function(iterated) {
                setInternalState(this, {
                  type: STRING_ITERATOR,
                  string: String(iterated),
                  index: 0
                });
              }, function next() {
                var state2 = getInternalState(this);
                var string = state2.string;
                var index2 = state2.index;
                var point;
                if (index2 >= string.length) return { value: void 0, done: true };
                point = charAt(string, index2);
                state2.index += point.length;
                return { value: point, done: false };
              });
            }
          ),
          /***/
          "3f8c": (
            /***/
            function(module2, exports2) {
              module2.exports = {};
            }
          ),
          /***/
          "4160": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var forEach = __webpack_require__("17c2");
              $({ target: "Array", proto: true, forced: [].forEach != forEach }, {
                forEach
              });
            }
          ),
          /***/
          "428f": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              module2.exports = global;
            }
          ),
          /***/
          "44ad": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var classof = __webpack_require__("c6b6");
              var split = "".split;
              module2.exports = fails(function() {
                return !Object("z").propertyIsEnumerable(0);
              }) ? function(it) {
                return classof(it) == "String" ? split.call(it, "") : Object(it);
              } : Object;
            }
          ),
          /***/
          "44d2": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var create = __webpack_require__("7c73");
              var definePropertyModule = __webpack_require__("9bf2");
              var UNSCOPABLES = wellKnownSymbol("unscopables");
              var ArrayPrototype = Array.prototype;
              if (ArrayPrototype[UNSCOPABLES] == void 0) {
                definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
                  configurable: true,
                  value: create(null)
                });
              }
              module2.exports = function(key) {
                ArrayPrototype[UNSCOPABLES][key] = true;
              };
            }
          ),
          /***/
          "44e7": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              var classof = __webpack_require__("c6b6");
              var wellKnownSymbol = __webpack_require__("b622");
              var MATCH = wellKnownSymbol("match");
              module2.exports = function(it) {
                var isRegExp;
                return isObject2(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
              };
            }
          ),
          /***/
          "4930": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
                return !String(Symbol());
              });
            }
          ),
          /***/
          "4d64": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var toLength = __webpack_require__("50c4");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var createMethod = function(IS_INCLUDES) {
                return function($this, el, fromIndex) {
                  var O = toIndexedObject($this);
                  var length = toLength(O.length);
                  var index2 = toAbsoluteIndex(fromIndex, length);
                  var value;
                  if (IS_INCLUDES && el != el) while (length > index2) {
                    value = O[index2++];
                    if (value != value) return true;
                  }
                  else for (; length > index2; index2++) {
                    if ((IS_INCLUDES || index2 in O) && O[index2] === el) return IS_INCLUDES || index2 || 0;
                  }
                  return !IS_INCLUDES && -1;
                };
              };
              module2.exports = {
                // `Array.prototype.includes` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.includes
                includes: createMethod(true),
                // `Array.prototype.indexOf` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
                indexOf: createMethod(false)
              };
            }
          ),
          /***/
          "4de4": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $filter = __webpack_require__("b727").filter;
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
              var USES_TO_LENGTH = arrayMethodUsesToLength("filter");
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                filter: function filter(callbackfn) {
                  return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            }
          ),
          /***/
          "4df4": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var bind = __webpack_require__("0366");
              var toObject = __webpack_require__("7b0b");
              var callWithSafeIterationClosing = __webpack_require__("9bdd");
              var isArrayIteratorMethod = __webpack_require__("e95a");
              var toLength = __webpack_require__("50c4");
              var createProperty = __webpack_require__("8418");
              var getIteratorMethod = __webpack_require__("35a1");
              module2.exports = function from(arrayLike) {
                var O = toObject(arrayLike);
                var C = typeof this == "function" ? this : Array;
                var argumentsLength = arguments.length;
                var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
                var mapping = mapfn !== void 0;
                var iteratorMethod = getIteratorMethod(O);
                var index2 = 0;
                var length, result, step, iterator, next, value;
                if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
                if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
                  iterator = iteratorMethod.call(O);
                  next = iterator.next;
                  result = new C();
                  for (; !(step = next.call(iterator)).done; index2++) {
                    value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index2], true) : step.value;
                    createProperty(result, index2, value);
                  }
                } else {
                  length = toLength(O.length);
                  result = new C(length);
                  for (; length > index2; index2++) {
                    value = mapping ? mapfn(O[index2], index2) : O[index2];
                    createProperty(result, index2, value);
                  }
                }
                result.length = index2;
                return result;
              };
            }
          ),
          /***/
          "4fad": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $entries = __webpack_require__("6f53").entries;
              $({ target: "Object", stat: true }, {
                entries: function entries(O) {
                  return $entries(O);
                }
              });
            }
          ),
          /***/
          "50c4": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var toInteger2 = __webpack_require__("a691");
              var min = Math.min;
              module2.exports = function(argument) {
                return argument > 0 ? min(toInteger2(argument), 9007199254740991) : 0;
              };
            }
          ),
          /***/
          "5135": (
            /***/
            function(module2, exports2) {
              var hasOwnProperty = {}.hasOwnProperty;
              module2.exports = function(it, key) {
                return hasOwnProperty.call(it, key);
              };
            }
          ),
          /***/
          "5319": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
              var anObject = __webpack_require__("825a");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var toInteger2 = __webpack_require__("a691");
              var requireObjectCoercible = __webpack_require__("1d80");
              var advanceStringIndex = __webpack_require__("8aa5");
              var regExpExec = __webpack_require__("14c3");
              var max = Math.max;
              var min = Math.min;
              var floor = Math.floor;
              var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
              var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;
              var maybeToString = function(it) {
                return it === void 0 ? it : String(it);
              };
              fixRegExpWellKnownSymbolLogic("replace", 2, function(REPLACE, nativeReplace, maybeCallNative, reason) {
                var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
                var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
                var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
                return [
                  // `String.prototype.replace` method
                  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
                  function replace(searchValue, replaceValue) {
                    var O = requireObjectCoercible(this);
                    var replacer = searchValue == void 0 ? void 0 : searchValue[REPLACE];
                    return replacer !== void 0 ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
                  },
                  // `RegExp.prototype[@@replace]` method
                  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
                  function(regexp, replaceValue) {
                    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === "string" && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
                      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
                      if (res.done) return res.value;
                    }
                    var rx = anObject(regexp);
                    var S = String(this);
                    var functionalReplace = typeof replaceValue === "function";
                    if (!functionalReplace) replaceValue = String(replaceValue);
                    var global = rx.global;
                    if (global) {
                      var fullUnicode = rx.unicode;
                      rx.lastIndex = 0;
                    }
                    var results = [];
                    while (true) {
                      var result = regExpExec(rx, S);
                      if (result === null) break;
                      results.push(result);
                      if (!global) break;
                      var matchStr = String(result[0]);
                      if (matchStr === "") rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                    }
                    var accumulatedResult = "";
                    var nextSourcePosition = 0;
                    for (var i = 0; i < results.length; i++) {
                      result = results[i];
                      var matched = String(result[0]);
                      var position = max(min(toInteger2(result.index), S.length), 0);
                      var captures = [];
                      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
                      var namedCaptures = result.groups;
                      if (functionalReplace) {
                        var replacerArgs = [matched].concat(captures, position, S);
                        if (namedCaptures !== void 0) replacerArgs.push(namedCaptures);
                        var replacement = String(replaceValue.apply(void 0, replacerArgs));
                      } else {
                        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                      }
                      if (position >= nextSourcePosition) {
                        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                        nextSourcePosition = position + matched.length;
                      }
                    }
                    return accumulatedResult + S.slice(nextSourcePosition);
                  }
                ];
                function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
                  var tailPos = position + matched.length;
                  var m = captures.length;
                  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
                  if (namedCaptures !== void 0) {
                    namedCaptures = toObject(namedCaptures);
                    symbols = SUBSTITUTION_SYMBOLS;
                  }
                  return nativeReplace.call(replacement, symbols, function(match, ch) {
                    var capture;
                    switch (ch.charAt(0)) {
                      case "$":
                        return "$";
                      case "&":
                        return matched;
                      case "`":
                        return str.slice(0, position);
                      case "'":
                        return str.slice(tailPos);
                      case "<":
                        capture = namedCaptures[ch.slice(1, -1)];
                        break;
                      default:
                        var n = +ch;
                        if (n === 0) return match;
                        if (n > m) {
                          var f = floor(n / 10);
                          if (f === 0) return match;
                          if (f <= m) return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                          return match;
                        }
                        capture = captures[n - 1];
                    }
                    return capture === void 0 ? "" : capture;
                  });
                }
              });
            }
          ),
          /***/
          "5692": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var IS_PURE = __webpack_require__("c430");
              var store2 = __webpack_require__("c6cd");
              (module2.exports = function(key, value) {
                return store2[key] || (store2[key] = value !== void 0 ? value : {});
              })("versions", []).push({
                version: "3.6.5",
                mode: IS_PURE ? "pure" : "global",
                copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
              });
            }
          ),
          /***/
          "56ef": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              var getOwnPropertyNamesModule = __webpack_require__("241c");
              var getOwnPropertySymbolsModule = __webpack_require__("7418");
              var anObject = __webpack_require__("825a");
              module2.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys2(it) {
                var keys = getOwnPropertyNamesModule.f(anObject(it));
                var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
                return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
              };
            }
          ),
          /***/
          "5a34": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var isRegExp = __webpack_require__("44e7");
              module2.exports = function(it) {
                if (isRegExp(it)) {
                  throw TypeError("The method doesn't accept regular expressions");
                }
                return it;
              };
            }
          ),
          /***/
          "5c6c": (
            /***/
            function(module2, exports2) {
              module2.exports = function(bitmap, value) {
                return {
                  enumerable: !(bitmap & 1),
                  configurable: !(bitmap & 2),
                  writable: !(bitmap & 4),
                  value
                };
              };
            }
          ),
          /***/
          "5db7": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var flattenIntoArray = __webpack_require__("a2bf");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var aFunction = __webpack_require__("1c0b");
              var arraySpeciesCreate = __webpack_require__("65f0");
              $({ target: "Array", proto: true }, {
                flatMap: function flatMap(callbackfn) {
                  var O = toObject(this);
                  var sourceLen = toLength(O.length);
                  var A;
                  aFunction(callbackfn);
                  A = arraySpeciesCreate(O, 0);
                  A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                  return A;
                }
              });
            }
          ),
          /***/
          "6547": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var toInteger2 = __webpack_require__("a691");
              var requireObjectCoercible = __webpack_require__("1d80");
              var createMethod = function(CONVERT_TO_STRING) {
                return function($this, pos) {
                  var S = String(requireObjectCoercible($this));
                  var position = toInteger2(pos);
                  var size = S.length;
                  var first, second;
                  if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : void 0;
                  first = S.charCodeAt(position);
                  return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
                };
              };
              module2.exports = {
                // `String.prototype.codePointAt` method
                // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
                codeAt: createMethod(false),
                // `String.prototype.at` method
                // https://github.com/mathiasbynens/String.prototype.at
                charAt: createMethod(true)
              };
            }
          ),
          /***/
          "65f0": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              var isArray2 = __webpack_require__("e8b5");
              var wellKnownSymbol = __webpack_require__("b622");
              var SPECIES = wellKnownSymbol("species");
              module2.exports = function(originalArray, length) {
                var C;
                if (isArray2(originalArray)) {
                  C = originalArray.constructor;
                  if (typeof C == "function" && (C === Array || isArray2(C.prototype))) C = void 0;
                  else if (isObject2(C)) {
                    C = C[SPECIES];
                    if (C === null) C = void 0;
                  }
                }
                return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
              };
            }
          ),
          /***/
          "69f3": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
              var global = __webpack_require__("da84");
              var isObject2 = __webpack_require__("861d");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var objectHas = __webpack_require__("5135");
              var sharedKey = __webpack_require__("f772");
              var hiddenKeys = __webpack_require__("d012");
              var WeakMap2 = global.WeakMap;
              var set, get, has;
              var enforce = function(it) {
                return has(it) ? get(it) : set(it, {});
              };
              var getterFor = function(TYPE) {
                return function(it) {
                  var state2;
                  if (!isObject2(it) || (state2 = get(it)).type !== TYPE) {
                    throw TypeError("Incompatible receiver, " + TYPE + " required");
                  }
                  return state2;
                };
              };
              if (NATIVE_WEAK_MAP) {
                var store2 = new WeakMap2();
                var wmget = store2.get;
                var wmhas = store2.has;
                var wmset = store2.set;
                set = function(it, metadata) {
                  wmset.call(store2, it, metadata);
                  return metadata;
                };
                get = function(it) {
                  return wmget.call(store2, it) || {};
                };
                has = function(it) {
                  return wmhas.call(store2, it);
                };
              } else {
                var STATE = sharedKey("state");
                hiddenKeys[STATE] = true;
                set = function(it, metadata) {
                  createNonEnumerableProperty(it, STATE, metadata);
                  return metadata;
                };
                get = function(it) {
                  return objectHas(it, STATE) ? it[STATE] : {};
                };
                has = function(it) {
                  return objectHas(it, STATE);
                };
              }
              module2.exports = {
                set,
                get,
                has,
                enforce,
                getterFor
              };
            }
          ),
          /***/
          "6eeb": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var has = __webpack_require__("5135");
              var setGlobal = __webpack_require__("ce4e");
              var inspectSource = __webpack_require__("8925");
              var InternalStateModule = __webpack_require__("69f3");
              var getInternalState = InternalStateModule.get;
              var enforceInternalState = InternalStateModule.enforce;
              var TEMPLATE = String(String).split("String");
              (module2.exports = function(O, key, value, options) {
                var unsafe = options ? !!options.unsafe : false;
                var simple = options ? !!options.enumerable : false;
                var noTargetGet = options ? !!options.noTargetGet : false;
                if (typeof value == "function") {
                  if (typeof key == "string" && !has(value, "name")) createNonEnumerableProperty(value, "name", key);
                  enforceInternalState(value).source = TEMPLATE.join(typeof key == "string" ? key : "");
                }
                if (O === global) {
                  if (simple) O[key] = value;
                  else setGlobal(key, value);
                  return;
                } else if (!unsafe) {
                  delete O[key];
                } else if (!noTargetGet && O[key]) {
                  simple = true;
                }
                if (simple) O[key] = value;
                else createNonEnumerableProperty(O, key, value);
              })(Function.prototype, "toString", function toString() {
                return typeof this == "function" && getInternalState(this).source || inspectSource(this);
              });
            }
          ),
          /***/
          "6f53": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var objectKeys = __webpack_require__("df75");
              var toIndexedObject = __webpack_require__("fc6a");
              var propertyIsEnumerable = __webpack_require__("d1e7").f;
              var createMethod = function(TO_ENTRIES) {
                return function(it) {
                  var O = toIndexedObject(it);
                  var keys = objectKeys(O);
                  var length = keys.length;
                  var i = 0;
                  var result = [];
                  var key;
                  while (length > i) {
                    key = keys[i++];
                    if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
                      result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
                    }
                  }
                  return result;
                };
              };
              module2.exports = {
                // `Object.entries` method
                // https://tc39.github.io/ecma262/#sec-object.entries
                entries: createMethod(true),
                // `Object.values` method
                // https://tc39.github.io/ecma262/#sec-object.values
                values: createMethod(false)
              };
            }
          ),
          /***/
          "73d9": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var addToUnscopables = __webpack_require__("44d2");
              addToUnscopables("flatMap");
            }
          ),
          /***/
          "7418": (
            /***/
            function(module2, exports2) {
              exports2.f = Object.getOwnPropertySymbols;
            }
          ),
          /***/
          "746f": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var path = __webpack_require__("428f");
              var has = __webpack_require__("5135");
              var wrappedWellKnownSymbolModule = __webpack_require__("e538");
              var defineProperty = __webpack_require__("9bf2").f;
              module2.exports = function(NAME) {
                var Symbol2 = path.Symbol || (path.Symbol = {});
                if (!has(Symbol2, NAME)) defineProperty(Symbol2, NAME, {
                  value: wrappedWellKnownSymbolModule.f(NAME)
                });
              };
            }
          ),
          /***/
          "7839": (
            /***/
            function(module2, exports2) {
              module2.exports = [
                "constructor",
                "hasOwnProperty",
                "isPrototypeOf",
                "propertyIsEnumerable",
                "toLocaleString",
                "toString",
                "valueOf"
              ];
            }
          ),
          /***/
          "7b0b": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var requireObjectCoercible = __webpack_require__("1d80");
              module2.exports = function(argument) {
                return Object(requireObjectCoercible(argument));
              };
            }
          ),
          /***/
          "7c73": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              var defineProperties = __webpack_require__("37e8");
              var enumBugKeys = __webpack_require__("7839");
              var hiddenKeys = __webpack_require__("d012");
              var html = __webpack_require__("1be4");
              var documentCreateElement = __webpack_require__("cc12");
              var sharedKey = __webpack_require__("f772");
              var GT = ">";
              var LT = "<";
              var PROTOTYPE = "prototype";
              var SCRIPT = "script";
              var IE_PROTO = sharedKey("IE_PROTO");
              var EmptyConstructor = function() {
              };
              var scriptTag = function(content) {
                return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
              };
              var NullProtoObjectViaActiveX = function(activeXDocument2) {
                activeXDocument2.write(scriptTag(""));
                activeXDocument2.close();
                var temp = activeXDocument2.parentWindow.Object;
                activeXDocument2 = null;
                return temp;
              };
              var NullProtoObjectViaIFrame = function() {
                var iframe = documentCreateElement("iframe");
                var JS = "java" + SCRIPT + ":";
                var iframeDocument;
                iframe.style.display = "none";
                html.appendChild(iframe);
                iframe.src = String(JS);
                iframeDocument = iframe.contentWindow.document;
                iframeDocument.open();
                iframeDocument.write(scriptTag("document.F=Object"));
                iframeDocument.close();
                return iframeDocument.F;
              };
              var activeXDocument;
              var NullProtoObject = function() {
                try {
                  activeXDocument = document.domain && new ActiveXObject("htmlfile");
                } catch (error) {
                }
                NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
                var length = enumBugKeys.length;
                while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
                return NullProtoObject();
              };
              hiddenKeys[IE_PROTO] = true;
              module2.exports = Object.create || function create(O, Properties) {
                var result;
                if (O !== null) {
                  EmptyConstructor[PROTOTYPE] = anObject(O);
                  result = new EmptyConstructor();
                  EmptyConstructor[PROTOTYPE] = null;
                  result[IE_PROTO] = O;
                } else result = NullProtoObject();
                return Properties === void 0 ? result : defineProperties(result, Properties);
              };
            }
          ),
          /***/
          "7dd0": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var createIteratorConstructor = __webpack_require__("9ed3");
              var getPrototypeOf = __webpack_require__("e163");
              var setPrototypeOf = __webpack_require__("d2bb");
              var setToStringTag = __webpack_require__("d44e");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var wellKnownSymbol = __webpack_require__("b622");
              var IS_PURE = __webpack_require__("c430");
              var Iterators = __webpack_require__("3f8c");
              var IteratorsCore = __webpack_require__("ae93");
              var IteratorPrototype = IteratorsCore.IteratorPrototype;
              var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
              var ITERATOR = wellKnownSymbol("iterator");
              var KEYS = "keys";
              var VALUES = "values";
              var ENTRIES = "entries";
              var returnThis = function() {
                return this;
              };
              module2.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
                createIteratorConstructor(IteratorConstructor, NAME, next);
                var getIterationMethod = function(KIND) {
                  if (KIND === DEFAULT && defaultIterator) return defaultIterator;
                  if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
                  switch (KIND) {
                    case KEYS:
                      return function keys() {
                        return new IteratorConstructor(this, KIND);
                      };
                    case VALUES:
                      return function values() {
                        return new IteratorConstructor(this, KIND);
                      };
                    case ENTRIES:
                      return function entries() {
                        return new IteratorConstructor(this, KIND);
                      };
                  }
                  return function() {
                    return new IteratorConstructor(this);
                  };
                };
                var TO_STRING_TAG = NAME + " Iterator";
                var INCORRECT_VALUES_NAME = false;
                var IterablePrototype = Iterable.prototype;
                var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
                var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
                var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
                var CurrentIteratorPrototype, methods, KEY;
                if (anyNativeIterator) {
                  CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
                  if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                    if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                      if (setPrototypeOf) {
                        setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                      } else if (typeof CurrentIteratorPrototype[ITERATOR] != "function") {
                        createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
                      }
                    }
                    setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                    if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
                  }
                }
                if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
                  INCORRECT_VALUES_NAME = true;
                  defaultIterator = function values() {
                    return nativeIterator.call(this);
                  };
                }
                if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
                  createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
                }
                Iterators[NAME] = defaultIterator;
                if (DEFAULT) {
                  methods = {
                    values: getIterationMethod(VALUES),
                    keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                    entries: getIterationMethod(ENTRIES)
                  };
                  if (FORCED) for (KEY in methods) {
                    if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                      redefine(IterablePrototype, KEY, methods[KEY]);
                    }
                  }
                  else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
                }
                return methods;
              };
            }
          ),
          /***/
          "7f9a": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var inspectSource = __webpack_require__("8925");
              var WeakMap2 = global.WeakMap;
              module2.exports = typeof WeakMap2 === "function" && /native code/.test(inspectSource(WeakMap2));
            }
          ),
          /***/
          "825a": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module2.exports = function(it) {
                if (!isObject2(it)) {
                  throw TypeError(String(it) + " is not an object");
                }
                return it;
              };
            }
          ),
          /***/
          "83ab": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module2.exports = !fails(function() {
                return Object.defineProperty({}, 1, { get: function() {
                  return 7;
                } })[1] != 7;
              });
            }
          ),
          /***/
          "8418": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var toPrimitive = __webpack_require__("c04e");
              var definePropertyModule = __webpack_require__("9bf2");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              module2.exports = function(object, key, value) {
                var propertyKey = toPrimitive(key);
                if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
                else object[propertyKey] = value;
              };
            }
          ),
          /***/
          "861d": (
            /***/
            function(module2, exports2) {
              module2.exports = function(it) {
                return typeof it === "object" ? it !== null : typeof it === "function";
              };
            }
          ),
          /***/
          "8875": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
              (function(root, factory) {
                {
                  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports2, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                }
              })(typeof self !== "undefined" ? self : this, function() {
                function getCurrentScript() {
                  var descriptor = Object.getOwnPropertyDescriptor(document, "currentScript");
                  if (!descriptor && "currentScript" in document && document.currentScript) {
                    return document.currentScript;
                  }
                  if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
                    return document.currentScript;
                  }
                  try {
                    throw new Error();
                  } catch (err) {
                    var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig, stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack), scriptLocation = stackDetails && stackDetails[1] || false, line = stackDetails && stackDetails[2] || false, currentLocation = document.location.href.replace(document.location.hash, ""), pageSource, inlineScriptSourceRegExp, inlineScriptSource, scripts = document.getElementsByTagName("script");
                    if (scriptLocation === currentLocation) {
                      pageSource = document.documentElement.outerHTML;
                      inlineScriptSourceRegExp = new RegExp("(?:[^\\n]+?\\n){0," + (line - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i");
                      inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, "$1").trim();
                    }
                    for (var i = 0; i < scripts.length; i++) {
                      if (scripts[i].readyState === "interactive") {
                        return scripts[i];
                      }
                      if (scripts[i].src === scriptLocation) {
                        return scripts[i];
                      }
                      if (scriptLocation === currentLocation && scripts[i].innerHTML && scripts[i].innerHTML.trim() === inlineScriptSource) {
                        return scripts[i];
                      }
                    }
                    return null;
                  }
                }
                return getCurrentScript;
              });
            }
          ),
          /***/
          "8925": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var store2 = __webpack_require__("c6cd");
              var functionToString = Function.toString;
              if (typeof store2.inspectSource != "function") {
                store2.inspectSource = function(it) {
                  return functionToString.call(it);
                };
              }
              module2.exports = store2.inspectSource;
            }
          ),
          /***/
          "8aa5": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var charAt = __webpack_require__("6547").charAt;
              module2.exports = function(S, index2, unicode) {
                return index2 + (unicode ? charAt(S, index2).length : 1);
              };
            }
          ),
          /***/
          "8bbf": (
            /***/
            function(module2, exports2) {
              module2.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;
            }
          ),
          /***/
          "90e3": (
            /***/
            function(module2, exports2) {
              var id = 0;
              var postfix = Math.random();
              module2.exports = function(key) {
                return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
              };
            }
          ),
          /***/
          "9112": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var definePropertyModule = __webpack_require__("9bf2");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              module2.exports = DESCRIPTORS ? function(object, key, value) {
                return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
              } : function(object, key, value) {
                object[key] = value;
                return object;
              };
            }
          ),
          /***/
          "9263": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var regexpFlags = __webpack_require__("ad6d");
              var stickyHelpers = __webpack_require__("9f7f");
              var nativeExec = RegExp.prototype.exec;
              var nativeReplace = String.prototype.replace;
              var patchedExec = nativeExec;
              var UPDATES_LAST_INDEX_WRONG = function() {
                var re1 = /a/;
                var re2 = /b*/g;
                nativeExec.call(re1, "a");
                nativeExec.call(re2, "a");
                return re1.lastIndex !== 0 || re2.lastIndex !== 0;
              }();
              var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;
              var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
              var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;
              if (PATCH) {
                patchedExec = function exec(str) {
                  var re = this;
                  var lastIndex, reCopy, match, i;
                  var sticky = UNSUPPORTED_Y && re.sticky;
                  var flags = regexpFlags.call(re);
                  var source = re.source;
                  var charsAdded = 0;
                  var strCopy = str;
                  if (sticky) {
                    flags = flags.replace("y", "");
                    if (flags.indexOf("g") === -1) {
                      flags += "g";
                    }
                    strCopy = String(str).slice(re.lastIndex);
                    if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== "\n")) {
                      source = "(?: " + source + ")";
                      strCopy = " " + strCopy;
                      charsAdded++;
                    }
                    reCopy = new RegExp("^(?:" + source + ")", flags);
                  }
                  if (NPCG_INCLUDED) {
                    reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
                  }
                  if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
                  match = nativeExec.call(sticky ? reCopy : re, strCopy);
                  if (sticky) {
                    if (match) {
                      match.input = match.input.slice(charsAdded);
                      match[0] = match[0].slice(charsAdded);
                      match.index = re.lastIndex;
                      re.lastIndex += match[0].length;
                    } else re.lastIndex = 0;
                  } else if (UPDATES_LAST_INDEX_WRONG && match) {
                    re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
                  }
                  if (NPCG_INCLUDED && match && match.length > 1) {
                    nativeReplace.call(match[0], reCopy, function() {
                      for (i = 1; i < arguments.length - 2; i++) {
                        if (arguments[i] === void 0) match[i] = void 0;
                      }
                    });
                  }
                  return match;
                };
              }
              module2.exports = patchedExec;
            }
          ),
          /***/
          "94ca": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var replacement = /#|\.prototype\./;
              var isForced = function(feature, detection) {
                var value = data[normalize(feature)];
                return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
              };
              var normalize = isForced.normalize = function(string) {
                return String(string).replace(replacement, ".").toLowerCase();
              };
              var data = isForced.data = {};
              var NATIVE = isForced.NATIVE = "N";
              var POLYFILL = isForced.POLYFILL = "P";
              module2.exports = isForced;
            }
          ),
          /***/
          "99af": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var fails = __webpack_require__("d039");
              var isArray2 = __webpack_require__("e8b5");
              var isObject2 = __webpack_require__("861d");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var createProperty = __webpack_require__("8418");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var wellKnownSymbol = __webpack_require__("b622");
              var V8_VERSION = __webpack_require__("2d00");
              var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
              var MAX_SAFE_INTEGER = 9007199254740991;
              var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
              var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
                var array = [];
                array[IS_CONCAT_SPREADABLE] = false;
                return array.concat()[0] !== array;
              });
              var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");
              var isConcatSpreadable = function(O) {
                if (!isObject2(O)) return false;
                var spreadable = O[IS_CONCAT_SPREADABLE];
                return spreadable !== void 0 ? !!spreadable : isArray2(O);
              };
              var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
              $({ target: "Array", proto: true, forced: FORCED }, {
                concat: function concat(arg) {
                  var O = toObject(this);
                  var A = arraySpeciesCreate(O, 0);
                  var n = 0;
                  var i, k, length, len, E;
                  for (i = -1, length = arguments.length; i < length; i++) {
                    E = i === -1 ? O : arguments[i];
                    if (isConcatSpreadable(E)) {
                      len = toLength(E.length);
                      if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                      for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
                    } else {
                      if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                      createProperty(A, n++, E);
                    }
                  }
                  A.length = n;
                  return A;
                }
              });
            }
          ),
          /***/
          "9bdd": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              module2.exports = function(iterator, fn, value, ENTRIES) {
                try {
                  return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
                } catch (error) {
                  var returnMethod = iterator["return"];
                  if (returnMethod !== void 0) anObject(returnMethod.call(iterator));
                  throw error;
                }
              };
            }
          ),
          /***/
          "9bf2": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var IE8_DOM_DEFINE = __webpack_require__("0cfb");
              var anObject = __webpack_require__("825a");
              var toPrimitive = __webpack_require__("c04e");
              var nativeDefineProperty = Object.defineProperty;
              exports2.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
                anObject(O);
                P = toPrimitive(P, true);
                anObject(Attributes);
                if (IE8_DOM_DEFINE) try {
                  return nativeDefineProperty(O, P, Attributes);
                } catch (error) {
                }
                if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported");
                if ("value" in Attributes) O[P] = Attributes.value;
                return O;
              };
            }
          ),
          /***/
          "9ed3": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
              var create = __webpack_require__("7c73");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var setToStringTag = __webpack_require__("d44e");
              var Iterators = __webpack_require__("3f8c");
              var returnThis = function() {
                return this;
              };
              module2.exports = function(IteratorConstructor, NAME, next) {
                var TO_STRING_TAG = NAME + " Iterator";
                IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
                setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
                Iterators[TO_STRING_TAG] = returnThis;
                return IteratorConstructor;
              };
            }
          ),
          /***/
          "9f7f": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fails = __webpack_require__("d039");
              function RE(s, f) {
                return RegExp(s, f);
              }
              exports2.UNSUPPORTED_Y = fails(function() {
                var re = RE("a", "y");
                re.lastIndex = 2;
                return re.exec("abcd") != null;
              });
              exports2.BROKEN_CARET = fails(function() {
                var re = RE("^r", "gy");
                re.lastIndex = 2;
                return re.exec("str") != null;
              });
            }
          ),
          /***/
          "a2bf": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var isArray2 = __webpack_require__("e8b5");
              var toLength = __webpack_require__("50c4");
              var bind = __webpack_require__("0366");
              var flattenIntoArray = function(target, original, source, sourceLen, start, depth, mapper, thisArg) {
                var targetIndex = start;
                var sourceIndex = 0;
                var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
                var element;
                while (sourceIndex < sourceLen) {
                  if (sourceIndex in source) {
                    element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
                    if (depth > 0 && isArray2(element)) {
                      targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
                    } else {
                      if (targetIndex >= 9007199254740991) throw TypeError("Exceed the acceptable array length");
                      target[targetIndex] = element;
                    }
                    targetIndex++;
                  }
                  sourceIndex++;
                }
                return targetIndex;
              };
              module2.exports = flattenIntoArray;
            }
          ),
          /***/
          "a352": (
            /***/
            function(module2, exports2) {
              module2.exports = __WEBPACK_EXTERNAL_MODULE_a352__;
            }
          ),
          /***/
          "a434": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var toInteger2 = __webpack_require__("a691");
              var toLength = __webpack_require__("50c4");
              var toObject = __webpack_require__("7b0b");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var createProperty = __webpack_require__("8418");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
              var USES_TO_LENGTH = arrayMethodUsesToLength("splice", { ACCESSORS: true, 0: 0, 1: 2 });
              var max = Math.max;
              var min = Math.min;
              var MAX_SAFE_INTEGER = 9007199254740991;
              var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                splice: function splice(start, deleteCount) {
                  var O = toObject(this);
                  var len = toLength(O.length);
                  var actualStart = toAbsoluteIndex(start, len);
                  var argumentsLength = arguments.length;
                  var insertCount, actualDeleteCount, A, k, from, to;
                  if (argumentsLength === 0) {
                    insertCount = actualDeleteCount = 0;
                  } else if (argumentsLength === 1) {
                    insertCount = 0;
                    actualDeleteCount = len - actualStart;
                  } else {
                    insertCount = argumentsLength - 2;
                    actualDeleteCount = min(max(toInteger2(deleteCount), 0), len - actualStart);
                  }
                  if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
                    throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
                  }
                  A = arraySpeciesCreate(O, actualDeleteCount);
                  for (k = 0; k < actualDeleteCount; k++) {
                    from = actualStart + k;
                    if (from in O) createProperty(A, k, O[from]);
                  }
                  A.length = actualDeleteCount;
                  if (insertCount < actualDeleteCount) {
                    for (k = actualStart; k < len - actualDeleteCount; k++) {
                      from = k + actualDeleteCount;
                      to = k + insertCount;
                      if (from in O) O[to] = O[from];
                      else delete O[to];
                    }
                    for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
                  } else if (insertCount > actualDeleteCount) {
                    for (k = len - actualDeleteCount; k > actualStart; k--) {
                      from = k + actualDeleteCount - 1;
                      to = k + insertCount - 1;
                      if (from in O) O[to] = O[from];
                      else delete O[to];
                    }
                  }
                  for (k = 0; k < insertCount; k++) {
                    O[k + actualStart] = arguments[k + 2];
                  }
                  O.length = len - actualDeleteCount + insertCount;
                  return A;
                }
              });
            }
          ),
          /***/
          "a4d3": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var global = __webpack_require__("da84");
              var getBuiltIn = __webpack_require__("d066");
              var IS_PURE = __webpack_require__("c430");
              var DESCRIPTORS = __webpack_require__("83ab");
              var NATIVE_SYMBOL = __webpack_require__("4930");
              var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
              var fails = __webpack_require__("d039");
              var has = __webpack_require__("5135");
              var isArray2 = __webpack_require__("e8b5");
              var isObject2 = __webpack_require__("861d");
              var anObject = __webpack_require__("825a");
              var toObject = __webpack_require__("7b0b");
              var toIndexedObject = __webpack_require__("fc6a");
              var toPrimitive = __webpack_require__("c04e");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var nativeObjectCreate = __webpack_require__("7c73");
              var objectKeys = __webpack_require__("df75");
              var getOwnPropertyNamesModule = __webpack_require__("241c");
              var getOwnPropertyNamesExternal = __webpack_require__("057f");
              var getOwnPropertySymbolsModule = __webpack_require__("7418");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var definePropertyModule = __webpack_require__("9bf2");
              var propertyIsEnumerableModule = __webpack_require__("d1e7");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var shared = __webpack_require__("5692");
              var sharedKey = __webpack_require__("f772");
              var hiddenKeys = __webpack_require__("d012");
              var uid = __webpack_require__("90e3");
              var wellKnownSymbol = __webpack_require__("b622");
              var wrappedWellKnownSymbolModule = __webpack_require__("e538");
              var defineWellKnownSymbol = __webpack_require__("746f");
              var setToStringTag = __webpack_require__("d44e");
              var InternalStateModule = __webpack_require__("69f3");
              var $forEach = __webpack_require__("b727").forEach;
              var HIDDEN = sharedKey("hidden");
              var SYMBOL = "Symbol";
              var PROTOTYPE = "prototype";
              var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(SYMBOL);
              var ObjectPrototype = Object[PROTOTYPE];
              var $Symbol = global.Symbol;
              var $stringify = getBuiltIn("JSON", "stringify");
              var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
              var nativeDefineProperty = definePropertyModule.f;
              var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
              var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
              var AllSymbols = shared("symbols");
              var ObjectPrototypeSymbols = shared("op-symbols");
              var StringToSymbolRegistry = shared("string-to-symbol-registry");
              var SymbolToStringRegistry = shared("symbol-to-string-registry");
              var WellKnownSymbolsStore = shared("wks");
              var QObject = global.QObject;
              var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
              var setSymbolDescriptor = DESCRIPTORS && fails(function() {
                return nativeObjectCreate(nativeDefineProperty({}, "a", {
                  get: function() {
                    return nativeDefineProperty(this, "a", { value: 7 }).a;
                  }
                })).a != 7;
              }) ? function(O, P, Attributes) {
                var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
                if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
                nativeDefineProperty(O, P, Attributes);
                if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
                  nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
                }
              } : nativeDefineProperty;
              var wrap = function(tag, description) {
                var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
                setInternalState(symbol, {
                  type: SYMBOL,
                  tag,
                  description
                });
                if (!DESCRIPTORS) symbol.description = description;
                return symbol;
              };
              var isSymbol2 = USE_SYMBOL_AS_UID ? function(it) {
                return typeof it == "symbol";
              } : function(it) {
                return Object(it) instanceof $Symbol;
              };
              var $defineProperty = function defineProperty(O, P, Attributes) {
                if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
                anObject(O);
                var key = toPrimitive(P, true);
                anObject(Attributes);
                if (has(AllSymbols, key)) {
                  if (!Attributes.enumerable) {
                    if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
                    O[HIDDEN][key] = true;
                  } else {
                    if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
                    Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
                  }
                  return setSymbolDescriptor(O, key, Attributes);
                }
                return nativeDefineProperty(O, key, Attributes);
              };
              var $defineProperties = function defineProperties(O, Properties) {
                anObject(O);
                var properties = toIndexedObject(Properties);
                var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
                $forEach(keys, function(key) {
                  if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
                });
                return O;
              };
              var $create = function create(O, Properties) {
                return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
              };
              var $propertyIsEnumerable = function propertyIsEnumerable(V) {
                var P = toPrimitive(V, true);
                var enumerable = nativePropertyIsEnumerable.call(this, P);
                if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
                return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
              };
              var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
                var it = toIndexedObject(O);
                var key = toPrimitive(P, true);
                if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
                var descriptor = nativeGetOwnPropertyDescriptor(it, key);
                if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
                  descriptor.enumerable = true;
                }
                return descriptor;
              };
              var $getOwnPropertyNames = function getOwnPropertyNames(O) {
                var names = nativeGetOwnPropertyNames(toIndexedObject(O));
                var result = [];
                $forEach(names, function(key) {
                  if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
                });
                return result;
              };
              var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
                var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
                var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
                var result = [];
                $forEach(names, function(key) {
                  if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
                    result.push(AllSymbols[key]);
                  }
                });
                return result;
              };
              if (!NATIVE_SYMBOL) {
                $Symbol = function Symbol2() {
                  if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor");
                  var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
                  var tag = uid(description);
                  var setter = function(value) {
                    if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
                    if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                    setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
                  };
                  if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
                  return wrap(tag, description);
                };
                redefine($Symbol[PROTOTYPE], "toString", function toString() {
                  return getInternalState(this).tag;
                });
                redefine($Symbol, "withoutSetter", function(description) {
                  return wrap(uid(description), description);
                });
                propertyIsEnumerableModule.f = $propertyIsEnumerable;
                definePropertyModule.f = $defineProperty;
                getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
                getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
                getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
                wrappedWellKnownSymbolModule.f = function(name) {
                  return wrap(wellKnownSymbol(name), name);
                };
                if (DESCRIPTORS) {
                  nativeDefineProperty($Symbol[PROTOTYPE], "description", {
                    configurable: true,
                    get: function description() {
                      return getInternalState(this).description;
                    }
                  });
                  if (!IS_PURE) {
                    redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
                  }
                }
              }
              $({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
                Symbol: $Symbol
              });
              $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
                defineWellKnownSymbol(name);
              });
              $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
                // `Symbol.for` method
                // https://tc39.github.io/ecma262/#sec-symbol.for
                "for": function(key) {
                  var string = String(key);
                  if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
                  var symbol = $Symbol(string);
                  StringToSymbolRegistry[string] = symbol;
                  SymbolToStringRegistry[symbol] = string;
                  return symbol;
                },
                // `Symbol.keyFor` method
                // https://tc39.github.io/ecma262/#sec-symbol.keyfor
                keyFor: function keyFor(sym) {
                  if (!isSymbol2(sym)) throw TypeError(sym + " is not a symbol");
                  if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
                },
                useSetter: function() {
                  USE_SETTER = true;
                },
                useSimple: function() {
                  USE_SETTER = false;
                }
              });
              $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
                // `Object.create` method
                // https://tc39.github.io/ecma262/#sec-object.create
                create: $create,
                // `Object.defineProperty` method
                // https://tc39.github.io/ecma262/#sec-object.defineproperty
                defineProperty: $defineProperty,
                // `Object.defineProperties` method
                // https://tc39.github.io/ecma262/#sec-object.defineproperties
                defineProperties: $defineProperties,
                // `Object.getOwnPropertyDescriptor` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
                getOwnPropertyDescriptor: $getOwnPropertyDescriptor
              });
              $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
                // `Object.getOwnPropertyNames` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
                getOwnPropertyNames: $getOwnPropertyNames,
                // `Object.getOwnPropertySymbols` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
                getOwnPropertySymbols: $getOwnPropertySymbols
              });
              $({ target: "Object", stat: true, forced: fails(function() {
                getOwnPropertySymbolsModule.f(1);
              }) }, {
                getOwnPropertySymbols: function getOwnPropertySymbols(it) {
                  return getOwnPropertySymbolsModule.f(toObject(it));
                }
              });
              if ($stringify) {
                var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function() {
                  var symbol = $Symbol();
                  return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
                });
                $({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
                  // eslint-disable-next-line no-unused-vars
                  stringify: function stringify(it, replacer, space) {
                    var args = [it];
                    var index2 = 1;
                    var $replacer;
                    while (arguments.length > index2) args.push(arguments[index2++]);
                    $replacer = replacer;
                    if (!isObject2(replacer) && it === void 0 || isSymbol2(it)) return;
                    if (!isArray2(replacer)) replacer = function(key, value) {
                      if (typeof $replacer == "function") value = $replacer.call(this, key, value);
                      if (!isSymbol2(value)) return value;
                    };
                    args[1] = replacer;
                    return $stringify.apply(null, args);
                  }
                });
              }
              if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
                createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
              }
              setToStringTag($Symbol, SYMBOL);
              hiddenKeys[HIDDEN] = true;
            }
          ),
          /***/
          "a630": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var from = __webpack_require__("4df4");
              var checkCorrectnessOfIteration = __webpack_require__("1c7e");
              var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
                Array.from(iterable);
              });
              $({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
                from
              });
            }
          ),
          /***/
          "a640": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module2.exports = function(METHOD_NAME, argument) {
                var method = [][METHOD_NAME];
                return !!method && fails(function() {
                  method.call(null, argument || function() {
                    throw 1;
                  }, 1);
                });
              };
            }
          ),
          /***/
          "a691": (
            /***/
            function(module2, exports2) {
              var ceil = Math.ceil;
              var floor = Math.floor;
              module2.exports = function(argument) {
                return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
              };
            }
          ),
          /***/
          "ab13": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var MATCH = wellKnownSymbol("match");
              module2.exports = function(METHOD_NAME) {
                var regexp = /./;
                try {
                  "/./"[METHOD_NAME](regexp);
                } catch (e) {
                  try {
                    regexp[MATCH] = false;
                    return "/./"[METHOD_NAME](regexp);
                  } catch (f) {
                  }
                }
                return false;
              };
            }
          ),
          /***/
          "ac1f": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var exec = __webpack_require__("9263");
              $({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
                exec
              });
            }
          ),
          /***/
          "ad6d": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              module2.exports = function() {
                var that = anObject(this);
                var result = "";
                if (that.global) result += "g";
                if (that.ignoreCase) result += "i";
                if (that.multiline) result += "m";
                if (that.dotAll) result += "s";
                if (that.unicode) result += "u";
                if (that.sticky) result += "y";
                return result;
              };
            }
          ),
          /***/
          "ae40": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var fails = __webpack_require__("d039");
              var has = __webpack_require__("5135");
              var defineProperty = Object.defineProperty;
              var cache = {};
              var thrower = function(it) {
                throw it;
              };
              module2.exports = function(METHOD_NAME, options) {
                if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
                if (!options) options = {};
                var method = [][METHOD_NAME];
                var ACCESSORS = has(options, "ACCESSORS") ? options.ACCESSORS : false;
                var argument0 = has(options, 0) ? options[0] : thrower;
                var argument1 = has(options, 1) ? options[1] : void 0;
                return cache[METHOD_NAME] = !!method && !fails(function() {
                  if (ACCESSORS && !DESCRIPTORS) return true;
                  var O = { length: -1 };
                  if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
                  else O[1] = 1;
                  method.call(O, argument0, argument1);
                });
              };
            }
          ),
          /***/
          "ae93": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var getPrototypeOf = __webpack_require__("e163");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var has = __webpack_require__("5135");
              var wellKnownSymbol = __webpack_require__("b622");
              var IS_PURE = __webpack_require__("c430");
              var ITERATOR = wellKnownSymbol("iterator");
              var BUGGY_SAFARI_ITERATORS = false;
              var returnThis = function() {
                return this;
              };
              var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
              if ([].keys) {
                arrayIterator = [].keys();
                if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
                else {
                  PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
                  if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
                }
              }
              if (IteratorPrototype == void 0) IteratorPrototype = {};
              if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
                createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
              }
              module2.exports = {
                IteratorPrototype,
                BUGGY_SAFARI_ITERATORS
              };
            }
          ),
          /***/
          "b041": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var classof = __webpack_require__("f5df");
              module2.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
                return "[object " + classof(this) + "]";
              };
            }
          ),
          /***/
          "b0c0": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var defineProperty = __webpack_require__("9bf2").f;
              var FunctionPrototype = Function.prototype;
              var FunctionPrototypeToString = FunctionPrototype.toString;
              var nameRE = /^\s*function ([^ (]*)/;
              var NAME = "name";
              if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
                defineProperty(FunctionPrototype, NAME, {
                  configurable: true,
                  get: function() {
                    try {
                      return FunctionPrototypeToString.call(this).match(nameRE)[1];
                    } catch (error) {
                      return "";
                    }
                  }
                });
              }
            }
          ),
          /***/
          "b622": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var shared = __webpack_require__("5692");
              var has = __webpack_require__("5135");
              var uid = __webpack_require__("90e3");
              var NATIVE_SYMBOL = __webpack_require__("4930");
              var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
              var WellKnownSymbolsStore = shared("wks");
              var Symbol2 = global.Symbol;
              var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
              module2.exports = function(name) {
                if (!has(WellKnownSymbolsStore, name)) {
                  if (NATIVE_SYMBOL && has(Symbol2, name)) WellKnownSymbolsStore[name] = Symbol2[name];
                  else WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
                }
                return WellKnownSymbolsStore[name];
              };
            }
          ),
          /***/
          "b64b": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var toObject = __webpack_require__("7b0b");
              var nativeKeys = __webpack_require__("df75");
              var fails = __webpack_require__("d039");
              var FAILS_ON_PRIMITIVES = fails(function() {
                nativeKeys(1);
              });
              $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
                keys: function keys(it) {
                  return nativeKeys(toObject(it));
                }
              });
            }
          ),
          /***/
          "b727": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var bind = __webpack_require__("0366");
              var IndexedObject = __webpack_require__("44ad");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var push = [].push;
              var createMethod = function(TYPE) {
                var IS_MAP = TYPE == 1;
                var IS_FILTER = TYPE == 2;
                var IS_SOME = TYPE == 3;
                var IS_EVERY = TYPE == 4;
                var IS_FIND_INDEX = TYPE == 6;
                var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
                return function($this, callbackfn, that, specificCreate) {
                  var O = toObject($this);
                  var self2 = IndexedObject(O);
                  var boundFunction = bind(callbackfn, that, 3);
                  var length = toLength(self2.length);
                  var index2 = 0;
                  var create = specificCreate || arraySpeciesCreate;
                  var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : void 0;
                  var value, result;
                  for (; length > index2; index2++) if (NO_HOLES || index2 in self2) {
                    value = self2[index2];
                    result = boundFunction(value, index2, O);
                    if (TYPE) {
                      if (IS_MAP) target[index2] = result;
                      else if (result) switch (TYPE) {
                        case 3:
                          return true;
                        // some
                        case 5:
                          return value;
                        // find
                        case 6:
                          return index2;
                        // findIndex
                        case 2:
                          push.call(target, value);
                      }
                      else if (IS_EVERY) return false;
                    }
                  }
                  return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
                };
              };
              module2.exports = {
                // `Array.prototype.forEach` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
                forEach: createMethod(0),
                // `Array.prototype.map` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.map
                map: createMethod(1),
                // `Array.prototype.filter` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.filter
                filter: createMethod(2),
                // `Array.prototype.some` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.some
                some: createMethod(3),
                // `Array.prototype.every` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.every
                every: createMethod(4),
                // `Array.prototype.find` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.find
                find: createMethod(5),
                // `Array.prototype.findIndex` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
                findIndex: createMethod(6)
              };
            }
          ),
          /***/
          "c04e": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module2.exports = function(input, PREFERRED_STRING) {
                if (!isObject2(input)) return input;
                var fn, val;
                if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input))) return val;
                if (typeof (fn = input.valueOf) == "function" && !isObject2(val = fn.call(input))) return val;
                if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input))) return val;
                throw TypeError("Can't convert object to primitive value");
              };
            }
          ),
          /***/
          "c430": (
            /***/
            function(module2, exports2) {
              module2.exports = false;
            }
          ),
          /***/
          "c6b6": (
            /***/
            function(module2, exports2) {
              var toString = {}.toString;
              module2.exports = function(it) {
                return toString.call(it).slice(8, -1);
              };
            }
          ),
          /***/
          "c6cd": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var setGlobal = __webpack_require__("ce4e");
              var SHARED = "__core-js_shared__";
              var store2 = global[SHARED] || setGlobal(SHARED, {});
              module2.exports = store2;
            }
          ),
          /***/
          "c740": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $findIndex = __webpack_require__("b727").findIndex;
              var addToUnscopables = __webpack_require__("44d2");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var FIND_INDEX = "findIndex";
              var SKIPS_HOLES = true;
              var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);
              if (FIND_INDEX in []) Array(1)[FIND_INDEX](function() {
                SKIPS_HOLES = false;
              });
              $({ target: "Array", proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
                findIndex: function findIndex(callbackfn) {
                  return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
              addToUnscopables(FIND_INDEX);
            }
          ),
          /***/
          "c8ba": (
            /***/
            function(module2, exports2) {
              var g;
              g = /* @__PURE__ */ function() {
                return this;
              }();
              try {
                g = g || new Function("return this")();
              } catch (e) {
                if (typeof window === "object") g = window;
              }
              module2.exports = g;
            }
          ),
          /***/
          "c975": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $indexOf = __webpack_require__("4d64").indexOf;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var nativeIndexOf = [].indexOf;
              var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
              var STRICT_METHOD = arrayMethodIsStrict("indexOf");
              var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
              $({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
                indexOf: function indexOf(searchElement) {
                  return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            }
          ),
          /***/
          "ca84": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var has = __webpack_require__("5135");
              var toIndexedObject = __webpack_require__("fc6a");
              var indexOf = __webpack_require__("4d64").indexOf;
              var hiddenKeys = __webpack_require__("d012");
              module2.exports = function(object, names) {
                var O = toIndexedObject(object);
                var i = 0;
                var result = [];
                var key;
                for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
                while (names.length > i) if (has(O, key = names[i++])) {
                  ~indexOf(result, key) || result.push(key);
                }
                return result;
              };
            }
          ),
          /***/
          "caad": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $includes = __webpack_require__("4d64").includes;
              var addToUnscopables = __webpack_require__("44d2");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
              $({ target: "Array", proto: true, forced: !USES_TO_LENGTH }, {
                includes: function includes(el) {
                  return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
              addToUnscopables("includes");
            }
          ),
          /***/
          "cc12": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var isObject2 = __webpack_require__("861d");
              var document2 = global.document;
              var EXISTS = isObject2(document2) && isObject2(document2.createElement);
              module2.exports = function(it) {
                return EXISTS ? document2.createElement(it) : {};
              };
            }
          ),
          /***/
          "ce4e": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var createNonEnumerableProperty = __webpack_require__("9112");
              module2.exports = function(key, value) {
                try {
                  createNonEnumerableProperty(global, key, value);
                } catch (error) {
                  global[key] = value;
                }
                return value;
              };
            }
          ),
          /***/
          "d012": (
            /***/
            function(module2, exports2) {
              module2.exports = {};
            }
          ),
          /***/
          "d039": (
            /***/
            function(module2, exports2) {
              module2.exports = function(exec) {
                try {
                  return !!exec();
                } catch (error) {
                  return true;
                }
              };
            }
          ),
          /***/
          "d066": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var path = __webpack_require__("428f");
              var global = __webpack_require__("da84");
              var aFunction = function(variable) {
                return typeof variable == "function" ? variable : void 0;
              };
              module2.exports = function(namespace, method) {
                return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
              };
            }
          ),
          /***/
          "d1e7": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
              var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
              var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
              exports2.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
                var descriptor = getOwnPropertyDescriptor(this, V);
                return !!descriptor && descriptor.enumerable;
              } : nativePropertyIsEnumerable;
            }
          ),
          /***/
          "d28b": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var defineWellKnownSymbol = __webpack_require__("746f");
              defineWellKnownSymbol("iterator");
            }
          ),
          /***/
          "d2bb": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              var aPossiblePrototype = __webpack_require__("3bbe");
              module2.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
                var CORRECT_SETTER = false;
                var test = {};
                var setter;
                try {
                  setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
                  setter.call(test, []);
                  CORRECT_SETTER = test instanceof Array;
                } catch (error) {
                }
                return function setPrototypeOf(O, proto) {
                  anObject(O);
                  aPossiblePrototype(proto);
                  if (CORRECT_SETTER) setter.call(O, proto);
                  else O.__proto__ = proto;
                  return O;
                };
              }() : void 0);
            }
          ),
          /***/
          "d3b7": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var redefine = __webpack_require__("6eeb");
              var toString = __webpack_require__("b041");
              if (!TO_STRING_TAG_SUPPORT) {
                redefine(Object.prototype, "toString", toString, { unsafe: true });
              }
            }
          ),
          /***/
          "d44e": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var defineProperty = __webpack_require__("9bf2").f;
              var has = __webpack_require__("5135");
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              module2.exports = function(it, TAG, STATIC) {
                if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
                  defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
                }
              };
            }
          ),
          /***/
          "d58f": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var aFunction = __webpack_require__("1c0b");
              var toObject = __webpack_require__("7b0b");
              var IndexedObject = __webpack_require__("44ad");
              var toLength = __webpack_require__("50c4");
              var createMethod = function(IS_RIGHT) {
                return function(that, callbackfn, argumentsLength, memo) {
                  aFunction(callbackfn);
                  var O = toObject(that);
                  var self2 = IndexedObject(O);
                  var length = toLength(O.length);
                  var index2 = IS_RIGHT ? length - 1 : 0;
                  var i = IS_RIGHT ? -1 : 1;
                  if (argumentsLength < 2) while (true) {
                    if (index2 in self2) {
                      memo = self2[index2];
                      index2 += i;
                      break;
                    }
                    index2 += i;
                    if (IS_RIGHT ? index2 < 0 : length <= index2) {
                      throw TypeError("Reduce of empty array with no initial value");
                    }
                  }
                  for (; IS_RIGHT ? index2 >= 0 : length > index2; index2 += i) if (index2 in self2) {
                    memo = callbackfn(memo, self2[index2], index2, O);
                  }
                  return memo;
                };
              };
              module2.exports = {
                // `Array.prototype.reduce` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
                left: createMethod(false),
                // `Array.prototype.reduceRight` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
                right: createMethod(true)
              };
            }
          ),
          /***/
          "d784": (
            /***/
            function(module2, exports2, __webpack_require__) {
              __webpack_require__("ac1f");
              var redefine = __webpack_require__("6eeb");
              var fails = __webpack_require__("d039");
              var wellKnownSymbol = __webpack_require__("b622");
              var regexpExec = __webpack_require__("9263");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var SPECIES = wellKnownSymbol("species");
              var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
                var re = /./;
                re.exec = function() {
                  var result = [];
                  result.groups = { a: "7" };
                  return result;
                };
                return "".replace(re, "$<a>") !== "7";
              });
              var REPLACE_KEEPS_$0 = function() {
                return "a".replace(/./, "$0") === "$0";
              }();
              var REPLACE = wellKnownSymbol("replace");
              var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
                if (/./[REPLACE]) {
                  return /./[REPLACE]("a", "$0") === "";
                }
                return false;
              }();
              var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function() {
                var re = /(?:)/;
                var originalExec = re.exec;
                re.exec = function() {
                  return originalExec.apply(this, arguments);
                };
                var result = "ab".split(re);
                return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
              });
              module2.exports = function(KEY, length, exec, sham) {
                var SYMBOL = wellKnownSymbol(KEY);
                var DELEGATES_TO_SYMBOL = !fails(function() {
                  var O = {};
                  O[SYMBOL] = function() {
                    return 7;
                  };
                  return ""[KEY](O) != 7;
                });
                var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
                  var execCalled = false;
                  var re = /a/;
                  if (KEY === "split") {
                    re = {};
                    re.constructor = {};
                    re.constructor[SPECIES] = function() {
                      return re;
                    };
                    re.flags = "";
                    re[SYMBOL] = /./[SYMBOL];
                  }
                  re.exec = function() {
                    execCalled = true;
                    return null;
                  };
                  re[SYMBOL]("");
                  return !execCalled;
                });
                if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
                  var nativeRegExpMethod = /./[SYMBOL];
                  var methods = exec(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
                    if (regexp.exec === regexpExec) {
                      if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                        return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
                      }
                      return { done: true, value: nativeMethod.call(str, regexp, arg2) };
                    }
                    return { done: false };
                  }, {
                    REPLACE_KEEPS_$0,
                    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
                  });
                  var stringMethod = methods[0];
                  var regexMethod = methods[1];
                  redefine(String.prototype, KEY, stringMethod);
                  redefine(
                    RegExp.prototype,
                    SYMBOL,
                    length == 2 ? function(string, arg) {
                      return regexMethod.call(string, this, arg);
                    } : function(string) {
                      return regexMethod.call(string, this);
                    }
                  );
                }
                if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], "sham", true);
              };
            }
          ),
          /***/
          "d81d": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $map = __webpack_require__("b727").map;
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
              var USES_TO_LENGTH = arrayMethodUsesToLength("map");
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                map: function map(callbackfn) {
                  return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            }
          ),
          /***/
          "da84": (
            /***/
            function(module2, exports2, __webpack_require__) {
              (function(global) {
                var check = function(it) {
                  return it && it.Math == Math && it;
                };
                module2.exports = // eslint-disable-next-line no-undef
                check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || // eslint-disable-next-line no-new-func
                Function("return this")();
              }).call(this, __webpack_require__("c8ba"));
            }
          ),
          /***/
          "dbb4": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var DESCRIPTORS = __webpack_require__("83ab");
              var ownKeys2 = __webpack_require__("56ef");
              var toIndexedObject = __webpack_require__("fc6a");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var createProperty = __webpack_require__("8418");
              $({ target: "Object", stat: true, sham: !DESCRIPTORS }, {
                getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
                  var O = toIndexedObject(object);
                  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
                  var keys = ownKeys2(O);
                  var result = {};
                  var index2 = 0;
                  var key, descriptor;
                  while (keys.length > index2) {
                    descriptor = getOwnPropertyDescriptor(O, key = keys[index2++]);
                    if (descriptor !== void 0) createProperty(result, key, descriptor);
                  }
                  return result;
                }
              });
            }
          ),
          /***/
          "dbf1": (
            /***/
            function(module2, __webpack_exports__, __webpack_require__) {
              (function(global) {
                __webpack_require__.d(__webpack_exports__, "a", function() {
                  return console2;
                });
                function getConsole() {
                  if (typeof window !== "undefined") {
                    return window.console;
                  }
                  return global.console;
                }
                var console2 = getConsole();
              }).call(this, __webpack_require__("c8ba"));
            }
          ),
          /***/
          "ddb0": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var global = __webpack_require__("da84");
              var DOMIterables = __webpack_require__("fdbc");
              var ArrayIteratorMethods = __webpack_require__("e260");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var ArrayValues = ArrayIteratorMethods.values;
              for (var COLLECTION_NAME in DOMIterables) {
                var Collection = global[COLLECTION_NAME];
                var CollectionPrototype = Collection && Collection.prototype;
                if (CollectionPrototype) {
                  if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
                    createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
                  } catch (error) {
                    CollectionPrototype[ITERATOR] = ArrayValues;
                  }
                  if (!CollectionPrototype[TO_STRING_TAG]) {
                    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
                  }
                  if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
                    if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
                      createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                    } catch (error) {
                      CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                    }
                  }
                }
              }
            }
          ),
          /***/
          "df75": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var internalObjectKeys = __webpack_require__("ca84");
              var enumBugKeys = __webpack_require__("7839");
              module2.exports = Object.keys || function keys(O) {
                return internalObjectKeys(O, enumBugKeys);
              };
            }
          ),
          /***/
          "e01a": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var DESCRIPTORS = __webpack_require__("83ab");
              var global = __webpack_require__("da84");
              var has = __webpack_require__("5135");
              var isObject2 = __webpack_require__("861d");
              var defineProperty = __webpack_require__("9bf2").f;
              var copyConstructorProperties = __webpack_require__("e893");
              var NativeSymbol = global.Symbol;
              if (DESCRIPTORS && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || // Safari 12 bug
              NativeSymbol().description !== void 0)) {
                var EmptyStringDescriptionStore = {};
                var SymbolWrapper = function Symbol2() {
                  var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]);
                  var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
                  if (description === "") EmptyStringDescriptionStore[result] = true;
                  return result;
                };
                copyConstructorProperties(SymbolWrapper, NativeSymbol);
                var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
                symbolPrototype.constructor = SymbolWrapper;
                var symbolToString = symbolPrototype.toString;
                var native = String(NativeSymbol("test")) == "Symbol(test)";
                var regexp = /^Symbol\((.*)\)[^)]+$/;
                defineProperty(symbolPrototype, "description", {
                  configurable: true,
                  get: function description() {
                    var symbol = isObject2(this) ? this.valueOf() : this;
                    var string = symbolToString.call(symbol);
                    if (has(EmptyStringDescriptionStore, symbol)) return "";
                    var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
                    return desc === "" ? void 0 : desc;
                  }
                });
                $({ global: true, forced: true }, {
                  Symbol: SymbolWrapper
                });
              }
            }
          ),
          /***/
          "e163": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var has = __webpack_require__("5135");
              var toObject = __webpack_require__("7b0b");
              var sharedKey = __webpack_require__("f772");
              var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");
              var IE_PROTO = sharedKey("IE_PROTO");
              var ObjectPrototype = Object.prototype;
              module2.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
                O = toObject(O);
                if (has(O, IE_PROTO)) return O[IE_PROTO];
                if (typeof O.constructor == "function" && O instanceof O.constructor) {
                  return O.constructor.prototype;
                }
                return O instanceof Object ? ObjectPrototype : null;
              };
            }
          ),
          /***/
          "e177": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module2.exports = !fails(function() {
                function F() {
                }
                F.prototype.constructor = null;
                return Object.getPrototypeOf(new F()) !== F.prototype;
              });
            }
          ),
          /***/
          "e260": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var addToUnscopables = __webpack_require__("44d2");
              var Iterators = __webpack_require__("3f8c");
              var InternalStateModule = __webpack_require__("69f3");
              var defineIterator = __webpack_require__("7dd0");
              var ARRAY_ITERATOR = "Array Iterator";
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
              module2.exports = defineIterator(Array, "Array", function(iterated, kind) {
                setInternalState(this, {
                  type: ARRAY_ITERATOR,
                  target: toIndexedObject(iterated),
                  // target
                  index: 0,
                  // next index
                  kind
                  // kind
                });
              }, function() {
                var state2 = getInternalState(this);
                var target = state2.target;
                var kind = state2.kind;
                var index2 = state2.index++;
                if (!target || index2 >= target.length) {
                  state2.target = void 0;
                  return { value: void 0, done: true };
                }
                if (kind == "keys") return { value: index2, done: false };
                if (kind == "values") return { value: target[index2], done: false };
                return { value: [index2, target[index2]], done: false };
              }, "values");
              Iterators.Arguments = Iterators.Array;
              addToUnscopables("keys");
              addToUnscopables("values");
              addToUnscopables("entries");
            }
          ),
          /***/
          "e439": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var fails = __webpack_require__("d039");
              var toIndexedObject = __webpack_require__("fc6a");
              var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var DESCRIPTORS = __webpack_require__("83ab");
              var FAILS_ON_PRIMITIVES = fails(function() {
                nativeGetOwnPropertyDescriptor(1);
              });
              var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;
              $({ target: "Object", stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
                getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
                  return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
                }
              });
            }
          ),
          /***/
          "e538": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              exports2.f = wellKnownSymbol;
            }
          ),
          /***/
          "e893": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var has = __webpack_require__("5135");
              var ownKeys2 = __webpack_require__("56ef");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var definePropertyModule = __webpack_require__("9bf2");
              module2.exports = function(target, source) {
                var keys = ownKeys2(source);
                var defineProperty = definePropertyModule.f;
                var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
                for (var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
                }
              };
            }
          ),
          /***/
          "e8b5": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var classof = __webpack_require__("c6b6");
              module2.exports = Array.isArray || function isArray2(arg) {
                return classof(arg) == "Array";
              };
            }
          ),
          /***/
          "e95a": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var Iterators = __webpack_require__("3f8c");
              var ITERATOR = wellKnownSymbol("iterator");
              var ArrayPrototype = Array.prototype;
              module2.exports = function(it) {
                return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
              };
            }
          ),
          /***/
          "f5df": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var classofRaw = __webpack_require__("c6b6");
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */ function() {
                return arguments;
              }()) == "Arguments";
              var tryGet = function(it, key) {
                try {
                  return it[key];
                } catch (error) {
                }
              };
              module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
                var O, tag, result;
                return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
              };
            }
          ),
          /***/
          "f772": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var shared = __webpack_require__("5692");
              var uid = __webpack_require__("90e3");
              var keys = shared("keys");
              module2.exports = function(key) {
                return keys[key] || (keys[key] = uid(key));
              };
            }
          ),
          /***/
          "fb15": (
            /***/
            function(module2, __webpack_exports__, __webpack_require__) {
              __webpack_require__.r(__webpack_exports__);
              if (typeof window !== "undefined") {
                var currentScript = window.document.currentScript;
                {
                  var getCurrentScript = __webpack_require__("8875");
                  currentScript = getCurrentScript();
                  if (!("currentScript" in document)) {
                    Object.defineProperty(document, "currentScript", { get: getCurrentScript });
                  }
                }
                var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
                if (src) {
                  __webpack_require__.p = src[1];
                }
              }
              __webpack_require__("99af");
              __webpack_require__("4de4");
              __webpack_require__("4160");
              __webpack_require__("c975");
              __webpack_require__("d81d");
              __webpack_require__("a434");
              __webpack_require__("159b");
              __webpack_require__("a4d3");
              __webpack_require__("e439");
              __webpack_require__("dbb4");
              __webpack_require__("b64b");
              function _defineProperty2(obj, key, value) {
                if (key in obj) {
                  Object.defineProperty(obj, key, {
                    value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                  });
                } else {
                  obj[key] = value;
                }
                return obj;
              }
              function ownKeys2(object, enumerableOnly) {
                var keys = Object.keys(object);
                if (Object.getOwnPropertySymbols) {
                  var symbols = Object.getOwnPropertySymbols(object);
                  if (enumerableOnly) symbols = symbols.filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                  });
                  keys.push.apply(keys, symbols);
                }
                return keys;
              }
              function _objectSpread22(target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i] != null ? arguments[i] : {};
                  if (i % 2) {
                    ownKeys2(Object(source), true).forEach(function(key) {
                      _defineProperty2(target, key, source[key]);
                    });
                  } else if (Object.getOwnPropertyDescriptors) {
                    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
                  } else {
                    ownKeys2(Object(source)).forEach(function(key) {
                      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                    });
                  }
                }
                return target;
              }
              function _arrayWithHoles(arr) {
                if (Array.isArray(arr)) return arr;
              }
              __webpack_require__("e01a");
              __webpack_require__("d28b");
              __webpack_require__("e260");
              __webpack_require__("d3b7");
              __webpack_require__("3ca3");
              __webpack_require__("ddb0");
              function _iterableToArrayLimit(arr, i) {
                if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = void 0;
                try {
                  for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) break;
                  }
                } catch (err) {
                  _d = true;
                  _e = err;
                } finally {
                  try {
                    if (!_n && _i["return"] != null) _i["return"]();
                  } finally {
                    if (_d) throw _e;
                  }
                }
                return _arr;
              }
              __webpack_require__("a630");
              __webpack_require__("fb6a");
              __webpack_require__("b0c0");
              __webpack_require__("25f0");
              function _arrayLikeToArray2(arr, len) {
                if (len == null || len > arr.length) len = arr.length;
                for (var i = 0, arr2 = new Array(len); i < len; i++) {
                  arr2[i] = arr[i];
                }
                return arr2;
              }
              function _unsupportedIterableToArray2(o, minLen) {
                if (!o) return;
                if (typeof o === "string") return _arrayLikeToArray2(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                if (n === "Object" && o.constructor) n = o.constructor.name;
                if (n === "Map" || n === "Set") return Array.from(o);
                if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray2(o, minLen);
              }
              function _nonIterableRest() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
              }
              function _slicedToArray(arr, i) {
                return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest();
              }
              function _arrayWithoutHoles2(arr) {
                if (Array.isArray(arr)) return _arrayLikeToArray2(arr);
              }
              function _iterableToArray2(iter) {
                if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
              }
              function _nonIterableSpread2() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
              }
              function _toConsumableArray2(arr) {
                return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread2();
              }
              var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
              var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /* @__PURE__ */ __webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);
              function removeNode(node) {
                if (node.parentElement !== null) {
                  node.parentElement.removeChild(node);
                }
              }
              function insertNodeAt(fatherNode, node, position) {
                var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
                fatherNode.insertBefore(node, refNode);
              }
              var console2 = __webpack_require__("dbf1");
              __webpack_require__("13d5");
              __webpack_require__("4fad");
              __webpack_require__("ac1f");
              __webpack_require__("5319");
              function cached(fn) {
                var cache = /* @__PURE__ */ Object.create(null);
                return function cachedFn(str) {
                  var hit = cache[str];
                  return hit || (cache[str] = fn(str));
                };
              }
              var regex = /-(\w)/g;
              var camelize2 = cached(function(str) {
                return str.replace(regex, function(_, c) {
                  return c.toUpperCase();
                });
              });
              __webpack_require__("5db7");
              __webpack_require__("73d9");
              var manageAndEmit = ["Start", "Add", "Remove", "Update", "End"];
              var emit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
              var manage = ["Move"];
              var eventHandlerNames = [manage, manageAndEmit, emit].flatMap(function(events2) {
                return events2;
              }).map(function(evt) {
                return "on".concat(evt);
              });
              var events = {
                manage,
                manageAndEmit,
                emit
              };
              function isReadOnly(eventName) {
                return eventHandlerNames.indexOf(eventName) !== -1;
              }
              __webpack_require__("caad");
              __webpack_require__("2ca0");
              var tags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
              function isHtmlTag(name) {
                return tags.includes(name);
              }
              function isTransition(name) {
                return ["transition-group", "TransitionGroup"].includes(name);
              }
              function isHtmlAttribute(value) {
                return ["id", "class", "role", "style"].includes(value) || value.startsWith("data-") || value.startsWith("aria-") || value.startsWith("on");
              }
              function project(entries) {
                return entries.reduce(function(res, _ref) {
                  var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                  res[key] = value;
                  return res;
                }, {});
              }
              function getComponentAttributes(_ref3) {
                var $attrs = _ref3.$attrs, _ref3$componentData = _ref3.componentData, componentData = _ref3$componentData === void 0 ? {} : _ref3$componentData;
                var attributes = project(Object.entries($attrs).filter(function(_ref4) {
                  var _ref5 = _slicedToArray(_ref4, 2), key = _ref5[0];
                  _ref5[1];
                  return isHtmlAttribute(key);
                }));
                return _objectSpread22(_objectSpread22({}, attributes), componentData);
              }
              function createSortableOption(_ref6) {
                var $attrs = _ref6.$attrs, callBackBuilder = _ref6.callBackBuilder;
                var options = project(getValidSortableEntries($attrs));
                Object.entries(callBackBuilder).forEach(function(_ref7) {
                  var _ref8 = _slicedToArray(_ref7, 2), eventType = _ref8[0], eventBuilder = _ref8[1];
                  events[eventType].forEach(function(event) {
                    options["on".concat(event)] = eventBuilder(event);
                  });
                });
                var draggable2 = "[data-draggable]".concat(options.draggable || "");
                return _objectSpread22(_objectSpread22({}, options), {}, {
                  draggable: draggable2
                });
              }
              function getValidSortableEntries(value) {
                return Object.entries(value).filter(function(_ref9) {
                  var _ref10 = _slicedToArray(_ref9, 2), key = _ref10[0];
                  _ref10[1];
                  return !isHtmlAttribute(key);
                }).map(function(_ref11) {
                  var _ref12 = _slicedToArray(_ref11, 2), key = _ref12[0], value2 = _ref12[1];
                  return [camelize2(key), value2];
                }).filter(function(_ref13) {
                  var _ref14 = _slicedToArray(_ref13, 2), key = _ref14[0];
                  _ref14[1];
                  return !isReadOnly(key);
                });
              }
              __webpack_require__("c740");
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              function _defineProperties(target, props2) {
                for (var i = 0; i < props2.length; i++) {
                  var descriptor = props2[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                return Constructor;
              }
              var getHtmlElementFromNode = function getHtmlElementFromNode2(_ref) {
                var el = _ref.el;
                return el;
              };
              var addContext = function addContext2(domElement, context) {
                return domElement.__draggable_context = context;
              };
              var getContext = function getContext2(domElement) {
                return domElement.__draggable_context;
              };
              var componentStructure_ComponentStructure = /* @__PURE__ */ function() {
                function ComponentStructure(_ref2) {
                  var _ref2$nodes = _ref2.nodes, header = _ref2$nodes.header, defaultNodes = _ref2$nodes.default, footer = _ref2$nodes.footer, root = _ref2.root, realList = _ref2.realList;
                  _classCallCheck(this, ComponentStructure);
                  this.defaultNodes = defaultNodes;
                  this.children = [].concat(_toConsumableArray2(header), _toConsumableArray2(defaultNodes), _toConsumableArray2(footer));
                  this.externalComponent = root.externalComponent;
                  this.rootTransition = root.transition;
                  this.tag = root.tag;
                  this.realList = realList;
                }
                _createClass(ComponentStructure, [{
                  key: "render",
                  value: function render(h, attributes) {
                    var tag = this.tag, children = this.children, _isRootComponent = this._isRootComponent;
                    var option2 = !_isRootComponent ? children : {
                      default: function _default() {
                        return children;
                      }
                    };
                    return h(tag, attributes, option2);
                  }
                }, {
                  key: "updated",
                  value: function updated() {
                    var defaultNodes = this.defaultNodes, realList = this.realList;
                    defaultNodes.forEach(function(node, index2) {
                      addContext(getHtmlElementFromNode(node), {
                        element: realList[index2],
                        index: index2
                      });
                    });
                  }
                }, {
                  key: "getUnderlyingVm",
                  value: function getUnderlyingVm(domElement) {
                    return getContext(domElement);
                  }
                }, {
                  key: "getVmIndexFromDomIndex",
                  value: function getVmIndexFromDomIndex(domIndex, element) {
                    var defaultNodes = this.defaultNodes;
                    var length = defaultNodes.length;
                    var domChildren = element.children;
                    var domElement = domChildren.item(domIndex);
                    if (domElement === null) {
                      return length;
                    }
                    var context = getContext(domElement);
                    if (context) {
                      return context.index;
                    }
                    if (length === 0) {
                      return 0;
                    }
                    var firstDomListElement = getHtmlElementFromNode(defaultNodes[0]);
                    var indexFirstDomListElement = _toConsumableArray2(domChildren).findIndex(function(element2) {
                      return element2 === firstDomListElement;
                    });
                    return domIndex < indexFirstDomListElement ? 0 : length;
                  }
                }, {
                  key: "_isRootComponent",
                  get: function get() {
                    return this.externalComponent || this.rootTransition;
                  }
                }]);
                return ComponentStructure;
              }();
              var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
              function getSlot(slots, key) {
                var slotValue = slots[key];
                return slotValue ? slotValue() : [];
              }
              function computeNodes(_ref) {
                var $slots = _ref.$slots, realList = _ref.realList, getKey = _ref.getKey;
                var normalizedList = realList || [];
                var _map = ["header", "footer"].map(function(name) {
                  return getSlot($slots, name);
                }), _map2 = _slicedToArray(_map, 2), header = _map2[0], footer = _map2[1];
                var item = $slots.item;
                if (!item) {
                  throw new Error("draggable element must have an item slot");
                }
                var defaultNodes = normalizedList.flatMap(function(element, index2) {
                  return item({
                    element,
                    index: index2
                  }).map(function(node) {
                    node.key = getKey(element);
                    node.props = _objectSpread22(_objectSpread22({}, node.props || {}), {}, {
                      "data-draggable": true
                    });
                    return node;
                  });
                });
                if (defaultNodes.length !== normalizedList.length) {
                  throw new Error("Item slot must have only one child");
                }
                return {
                  header,
                  footer,
                  default: defaultNodes
                };
              }
              function getRootInformation(tag) {
                var transition = isTransition(tag);
                var externalComponent = !isHtmlTag(tag) && !transition;
                return {
                  transition,
                  externalComponent,
                  tag: externalComponent ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])(tag) : transition ? external_commonjs_vue_commonjs2_vue_root_Vue_["TransitionGroup"] : tag
                };
              }
              function computeComponentStructure(_ref2) {
                var $slots = _ref2.$slots, tag = _ref2.tag, realList = _ref2.realList, getKey = _ref2.getKey;
                var nodes = computeNodes({
                  $slots,
                  realList,
                  getKey
                });
                var root = getRootInformation(tag);
                return new componentStructure_ComponentStructure({
                  nodes,
                  root,
                  realList
                });
              }
              function _emit(evtName, evtData) {
                var _this = this;
                Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function() {
                  return _this.$emit(evtName.toLowerCase(), evtData);
                });
              }
              function _manage(evtName) {
                var _this2 = this;
                return function(evtData, originalElement) {
                  if (_this2.realList !== null) {
                    return _this2["onDrag".concat(evtName)](evtData, originalElement);
                  }
                };
              }
              function _manageAndEmit(evtName) {
                var _this3 = this;
                var delegateCallBack = _manage.call(this, evtName);
                return function(evtData, originalElement) {
                  delegateCallBack.call(_this3, evtData, originalElement);
                  _emit.call(_this3, evtName, evtData);
                };
              }
              var draggingElement = null;
              var props = {
                list: {
                  type: Array,
                  required: false,
                  default: null
                },
                modelValue: {
                  type: Array,
                  required: false,
                  default: null
                },
                itemKey: {
                  type: [String, Function],
                  required: true
                },
                clone: {
                  type: Function,
                  default: function _default(original) {
                    return original;
                  }
                },
                tag: {
                  type: String,
                  default: "div"
                },
                move: {
                  type: Function,
                  default: null
                },
                componentData: {
                  type: Object,
                  required: false,
                  default: null
                }
              };
              var emits = ["update:modelValue", "change"].concat(_toConsumableArray2([].concat(_toConsumableArray2(events.manageAndEmit), _toConsumableArray2(events.emit)).map(function(evt) {
                return evt.toLowerCase();
              })));
              var draggableComponent = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
                name: "draggable",
                inheritAttrs: false,
                props,
                emits,
                data: function data() {
                  return {
                    error: false
                  };
                },
                render: function render() {
                  try {
                    this.error = false;
                    var $slots = this.$slots, $attrs = this.$attrs, tag = this.tag, componentData = this.componentData, realList = this.realList, getKey = this.getKey;
                    var componentStructure = computeComponentStructure({
                      $slots,
                      tag,
                      realList,
                      getKey
                    });
                    this.componentStructure = componentStructure;
                    var attributes = getComponentAttributes({
                      $attrs,
                      componentData
                    });
                    return componentStructure.render(external_commonjs_vue_commonjs2_vue_root_Vue_["h"], attributes);
                  } catch (err) {
                    this.error = true;
                    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["h"])("pre", {
                      style: {
                        color: "red"
                      }
                    }, err.stack);
                  }
                },
                created: function created() {
                  if (this.list !== null && this.modelValue !== null) {
                    console2[
                      "a"
                      /* console */
                    ].error("modelValue and list props are mutually exclusive! Please set one or another.");
                  }
                },
                mounted: function mounted() {
                  var _this4 = this;
                  if (this.error) {
                    return;
                  }
                  var $attrs = this.$attrs, $el = this.$el, componentStructure = this.componentStructure;
                  componentStructure.updated();
                  var sortableOptions = createSortableOption({
                    $attrs,
                    callBackBuilder: {
                      manageAndEmit: function manageAndEmit2(event) {
                        return _manageAndEmit.call(_this4, event);
                      },
                      emit: function emit2(event) {
                        return _emit.bind(_this4, event);
                      },
                      manage: function manage2(event) {
                        return _manage.call(_this4, event);
                      }
                    }
                  });
                  var targetDomElement = $el.nodeType === 1 ? $el : $el.parentElement;
                  this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(targetDomElement, sortableOptions);
                  this.targetDomElement = targetDomElement;
                  targetDomElement.__draggable_component__ = this;
                },
                updated: function updated() {
                  this.componentStructure.updated();
                },
                beforeUnmount: function beforeUnmount() {
                  if (this._sortable !== void 0) this._sortable.destroy();
                },
                computed: {
                  realList: function realList() {
                    var list = this.list;
                    return list ? list : this.modelValue;
                  },
                  getKey: function getKey() {
                    var itemKey = this.itemKey;
                    if (typeof itemKey === "function") {
                      return itemKey;
                    }
                    return function(element) {
                      return element[itemKey];
                    };
                  }
                },
                watch: {
                  $attrs: {
                    handler: function handler(newOptionValue) {
                      var _sortable = this._sortable;
                      if (!_sortable) return;
                      getValidSortableEntries(newOptionValue).forEach(function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                        _sortable.option(key, value);
                      });
                    },
                    deep: true
                  }
                },
                methods: {
                  getUnderlyingVm: function getUnderlyingVm(domElement) {
                    return this.componentStructure.getUnderlyingVm(domElement) || null;
                  },
                  getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(htmElement) {
                    return htmElement.__draggable_component__;
                  },
                  emitChanges: function emitChanges(evt) {
                    var _this5 = this;
                    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function() {
                      return _this5.$emit("change", evt);
                    });
                  },
                  alterList: function alterList(onList) {
                    if (this.list) {
                      onList(this.list);
                      return;
                    }
                    var newList = _toConsumableArray2(this.modelValue);
                    onList(newList);
                    this.$emit("update:modelValue", newList);
                  },
                  spliceList: function spliceList() {
                    var _arguments = arguments;
                    var spliceList2 = function spliceList3(list) {
                      return list.splice.apply(list, _toConsumableArray2(_arguments));
                    };
                    this.alterList(spliceList2);
                  },
                  updatePosition: function updatePosition(oldIndex2, newIndex2) {
                    var updatePosition2 = function updatePosition3(list) {
                      return list.splice(newIndex2, 0, list.splice(oldIndex2, 1)[0]);
                    };
                    this.alterList(updatePosition2);
                  },
                  getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref3) {
                    var to = _ref3.to, related = _ref3.related;
                    var component = this.getUnderlyingPotencialDraggableComponent(to);
                    if (!component) {
                      return {
                        component
                      };
                    }
                    var list = component.realList;
                    var context = {
                      list,
                      component
                    };
                    if (to !== related && list) {
                      var destination = component.getUnderlyingVm(related) || {};
                      return _objectSpread22(_objectSpread22({}, destination), context);
                    }
                    return context;
                  },
                  getVmIndexFromDomIndex: function getVmIndexFromDomIndex(domIndex) {
                    return this.componentStructure.getVmIndexFromDomIndex(domIndex, this.targetDomElement);
                  },
                  onDragStart: function onDragStart(evt) {
                    this.context = this.getUnderlyingVm(evt.item);
                    evt.item._underlying_vm_ = this.clone(this.context.element);
                    draggingElement = evt.item;
                  },
                  onDragAdd: function onDragAdd(evt) {
                    var element = evt.item._underlying_vm_;
                    if (element === void 0) {
                      return;
                    }
                    removeNode(evt.item);
                    var newIndex2 = this.getVmIndexFromDomIndex(evt.newIndex);
                    this.spliceList(newIndex2, 0, element);
                    var added = {
                      element,
                      newIndex: newIndex2
                    };
                    this.emitChanges({
                      added
                    });
                  },
                  onDragRemove: function onDragRemove(evt) {
                    insertNodeAt(this.$el, evt.item, evt.oldIndex);
                    if (evt.pullMode === "clone") {
                      removeNode(evt.clone);
                      return;
                    }
                    var _this$context = this.context, oldIndex2 = _this$context.index, element = _this$context.element;
                    this.spliceList(oldIndex2, 1);
                    var removed = {
                      element,
                      oldIndex: oldIndex2
                    };
                    this.emitChanges({
                      removed
                    });
                  },
                  onDragUpdate: function onDragUpdate(evt) {
                    removeNode(evt.item);
                    insertNodeAt(evt.from, evt.item, evt.oldIndex);
                    var oldIndex2 = this.context.index;
                    var newIndex2 = this.getVmIndexFromDomIndex(evt.newIndex);
                    this.updatePosition(oldIndex2, newIndex2);
                    var moved2 = {
                      element: this.context.element,
                      oldIndex: oldIndex2,
                      newIndex: newIndex2
                    };
                    this.emitChanges({
                      moved: moved2
                    });
                  },
                  computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
                    if (!relatedContext.element) {
                      return 0;
                    }
                    var domChildren = _toConsumableArray2(evt.to.children).filter(function(el) {
                      return el.style["display"] !== "none";
                    });
                    var currentDomIndex = domChildren.indexOf(evt.related);
                    var currentIndex = relatedContext.component.getVmIndexFromDomIndex(currentDomIndex);
                    var draggedInList = domChildren.indexOf(draggingElement) !== -1;
                    return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
                  },
                  onDragMove: function onDragMove(evt, originalEvent) {
                    var move = this.move, realList = this.realList;
                    if (!move || !realList) {
                      return true;
                    }
                    var relatedContext = this.getRelatedContextFromMoveEvent(evt);
                    var futureIndex = this.computeFutureIndex(relatedContext, evt);
                    var draggedContext = _objectSpread22(_objectSpread22({}, this.context), {}, {
                      futureIndex
                    });
                    var sendEvent = _objectSpread22(_objectSpread22({}, evt), {}, {
                      relatedContext,
                      draggedContext
                    });
                    return move(sendEvent, originalEvent);
                  },
                  onDragEnd: function onDragEnd() {
                    draggingElement = null;
                  }
                }
              });
              var vuedraggable = draggableComponent;
              __webpack_exports__["default"] = vuedraggable;
            }
          ),
          /***/
          "fb6a": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var isObject2 = __webpack_require__("861d");
              var isArray2 = __webpack_require__("e8b5");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var toLength = __webpack_require__("50c4");
              var toIndexedObject = __webpack_require__("fc6a");
              var createProperty = __webpack_require__("8418");
              var wellKnownSymbol = __webpack_require__("b622");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
              var USES_TO_LENGTH = arrayMethodUsesToLength("slice", { ACCESSORS: true, 0: 0, 1: 2 });
              var SPECIES = wellKnownSymbol("species");
              var nativeSlice = [].slice;
              var max = Math.max;
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                slice: function slice(start, end) {
                  var O = toIndexedObject(this);
                  var length = toLength(O.length);
                  var k = toAbsoluteIndex(start, length);
                  var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
                  var Constructor, result, n;
                  if (isArray2(O)) {
                    Constructor = O.constructor;
                    if (typeof Constructor == "function" && (Constructor === Array || isArray2(Constructor.prototype))) {
                      Constructor = void 0;
                    } else if (isObject2(Constructor)) {
                      Constructor = Constructor[SPECIES];
                      if (Constructor === null) Constructor = void 0;
                    }
                    if (Constructor === Array || Constructor === void 0) {
                      return nativeSlice.call(O, k, fin);
                    }
                  }
                  result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
                  for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
                  result.length = n;
                  return result;
                }
              });
            }
          ),
          /***/
          "fc6a": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var IndexedObject = __webpack_require__("44ad");
              var requireObjectCoercible = __webpack_require__("1d80");
              module2.exports = function(it) {
                return IndexedObject(requireObjectCoercible(it));
              };
            }
          ),
          /***/
          "fdbc": (
            /***/
            function(module2, exports2) {
              module2.exports = {
                CSSRuleList: 0,
                CSSStyleDeclaration: 0,
                CSSValueList: 0,
                ClientRectList: 0,
                DOMRectList: 0,
                DOMStringList: 0,
                DOMTokenList: 1,
                DataTransferItemList: 0,
                FileList: 0,
                HTMLAllCollection: 0,
                HTMLCollection: 0,
                HTMLFormElement: 0,
                HTMLSelectElement: 0,
                MediaList: 0,
                MimeTypeArray: 0,
                NamedNodeMap: 0,
                NodeList: 1,
                PaintRequestList: 0,
                Plugin: 0,
                PluginArray: 0,
                SVGLengthList: 0,
                SVGNumberList: 0,
                SVGPathSegList: 0,
                SVGPointList: 0,
                SVGStringList: 0,
                SVGTransformList: 0,
                SourceBufferList: 0,
                StyleSheetList: 0,
                TextTrackCueList: 0,
                TextTrackList: 0,
                TouchList: 0
              };
            }
          ),
          /***/
          "fdbf": (
            /***/
            function(module2, exports2, __webpack_require__) {
              var NATIVE_SYMBOL = __webpack_require__("4930");
              module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
            }
          )
          /******/
        })["default"]
      );
    });
  })(vuedraggable_umd$1);
  return vuedraggable_umd$1.exports;
}
var vuedraggable_umdExports = requireVuedraggable_umd();
const draggable = /* @__PURE__ */ getDefaultExportFromCjs(vuedraggable_umdExports);
const _sfc_main$h = {
  name: "FormDesigner",
  components: {
    draggable,
    MfpWorkLocation,
    MfpGenericField
  },
  props: {
    store: { type: Object, required: true }
  },
  data: () => ({
    loading: false,
    form: null,
    optional: null,
    drag: false,
    localDues: [],
    affiliateId: null,
    localId: null,
    chapterId: null,
    employerId: null,
    unitId: null,
    localJobClassId: null,
    jobTitleId: null,
    localDuesCategories: [],
    workLocations: [],
    workStructures: [],
    selectedLocalDuesCategory: null,
    selectedLocalDuesCategoryPrice: null,
    paymentProcessingDuesTemplateIds: [4, 5, 7, 9]
  }),
  watch: {
    form: {
      deep: true,
      handler() {
        console.log("FORMDESIGNER HANDLER", this.form);
        if (!this.form) {
          return;
        }
        this.$emit("save", { key: "form", value: this.form });
      }
    },
    store: {
      deep: true,
      handler() {
        this.localDues = this.store.duesCategories;
      }
    },
    localDues: {
      deep: true,
      handler() {
        this.doListDuesCategories(this.localDues);
      }
    },
    // @todo: Shouldn't these already be set from FormBuilderSettings?
    chapterId() {
      if (this.store.chapterId !== this.chapterId) {
        this.$emit("save", { key: "chapterId", value: this.chapterId });
        this.$nextTick(() => {
          this.employerId = null;
          this.$refs.employerSelector.reset();
        });
      }
    },
    employerId() {
      if (this.store.employerId !== this.employerId) {
        this.$emit("save", { key: "employerId", value: this.employerId });
        this.$nextTick(() => {
          this.unitId = null;
          this.$refs.unitSelector.reset();
        });
        this.listWorkLocations();
      }
    },
    localId() {
      if (this.store.localId !== this.localId) {
        this.$emit("save", { key: "localId", value: this.localId });
      }
    },
    unitId() {
      if (this.store.unitId !== this.unitId) {
        this.$emit("save", { key: "unitId", value: this.unitId });
        this.$nextTick(() => {
          this.localJobClassId = null;
          this.$refs.localJobClassSelector.reset();
        });
      }
    },
    localJobClassId() {
      if (this.store.localJobClassId !== this.localJobClassId) {
        this.$emit("save", { key: "localJobClassId", value: this.localJobClassId });
        this.$nextTick(() => {
          this.jobTitleId = null;
          this.$refs.jobTitleSelector.reset();
        });
      }
    },
    jobTitleId() {
      if (this.store.jobTitleId !== this.jobTitleId) {
        this.$emit("save", { key: "jobTitleId", value: this.jobTitleId });
      }
    }
  },
  created() {
    if (this.store.form) {
      this.reload();
    } else {
      this.reset();
    }
    this.affiliateId = this.store.affiliateId || null;
    this.localId = this.store.localId || null;
    this.chapterId = this.store.chapterId || null;
    this.employerId = this.store.employerId || null;
    this.unitId = this.store.unitId || null;
    this.localJobClassId = this.store.localJobClassId || null;
    this.jobTitleId = this.store.jobTitleId || null;
  },
  methods: {
    getLocalDuesCategory(ldc) {
      return this.localDuesCategories.filter((localDues) => localDues.LocalDuesCategoryId === ldc)[0];
    },
    getLocalDuesCategoryField() {
      return this.form.fields.filter((field) => field.fieldName === "LocalDuesCategory")[0];
    },
    getWorkLocationField() {
      return this.form.fields.filter((field) => field.fieldName === "workLocation")[0];
    },
    getWorkStructureField() {
      return this.form.fields.filter((field) => field.fieldName === "workStructure")[0];
    },
    removeField(index2) {
      const optionalField = this.form.fields[index2];
      if (!this.keyExistsInOptionalFields(optionalField.fieldName)) {
        optionalField.key = optionalField.fieldName;
        this.optional.splice(0, 0, optionalField);
      }
      this.form.fields.splice(index2, 1);
    },
    reset() {
      this.loading = true;
      console.log("RESET");
      this.form = null;
      this.$emit("remove", { key: "form" });
      this.reload();
    },
    doListDuesCategories(duesCategories) {
      this.loading = true;
      api$1.search("duescategory", "", {
        affiliateId: this.store.affiliateId,
        ids: duesCategories,
        from: this.paymentProcessingDuesTemplateIds.includes(parseInt(this.store.templateId, 10)) ? "form" : ""
      }).then((response) => {
        this.localDuesCategories = response.data;
        const localDuesCategoryField = this.getLocalDuesCategoryField();
        if (localDuesCategoryField) {
          localDuesCategoryField.source = this.localDuesCategories;
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    listWorkLocations() {
      if (this.store.employerId && this.store.employerId !== "") {
        this.loading = true;
        api$1.search("worklocation", "", { employerId: this.store.employerId }).then((response) => {
          this.workLocations = response.data;
          const localWorkLocationField = this.getWorkLocationField();
          if (localWorkLocationField) {
            localWorkLocationField.source = this.workLocations;
            localWorkLocationField.type = "workLocation";
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    updateSourceForCopeOnlyBillingType() {
      if (this.form.sources && this.store.billHighwayBillingTypeId) {
        this.form.sources.copeOnlyBillingTypeId = this.store.billHighwayBillingTypeId;
      }
    },
    reload() {
      console.log("localId", this.localId);
      console.log("storeLocalId", this.store.localId);
      console.log("store", this.store);
      this.loading = true;
      api$1.templateShow(this.store.templateId).then((response) => {
        const template = response.data;
        if (this.store.form) {
          this.form = this.store.form;
        } else {
          this.form = this.formFromTemplate(template);
          this.$emit("save", { key: "form", value: this.form });
        }
        this.localDues = this.store.duesCategories;
        this.doListDuesCategories(this.localDues);
        this.updateSourceForCopeOnlyBillingType();
        this.optional = [];
        Object.keys(template.fields).forEach((fieldName) => {
          const templateField = template.fields[fieldName];
          if (!templateField.fixed) {
            if (!this.keyExistsInFormFields(fieldName)) {
              templateField.fieldName = fieldName;
              templateField.id = fieldName;
              this.optional.push(templateField);
            } else {
              if (fieldName === "customSelectionField" || fieldName === "customTextField" || fieldName === "markupTextField") {
                templateField.fieldName = fieldName;
                templateField.id = fieldName;
                this.optional.push(templateField);
              }
            }
          }
        });
        Object.keys(template.optional_fields).forEach((fieldName) => {
          const templateField = template.optional_fields[fieldName];
          if (!this.store[templateField.source]) {
            if (!this.keyExistsInFormFields(fieldName)) {
              templateField.fieldName = fieldName;
              templateField.id = fieldName;
              this.optional.push(templateField);
            }
          }
        });
        this.loading = false;
      });
    },
    cloneField(value) {
      const field = JSON.parse(JSON.stringify(value));
      const formFieldCount = this.getCountOfFormField(field.fieldName);
      if (formFieldCount > 0) {
        field.id = field.fieldName + formFieldCount;
      } else {
        field.id = field.fieldName;
      }
      return field;
    },
    moveField(value) {
      const index2 = value.newIndex;
      const { oldIndex: oldIndex2 } = value;
      const optionalField = { ...this.form.fields[index2] };
      const allowedFields = ["customSelectionField", "customTextField", "markupTextField"];
      if (allowedFields.includes(optionalField.fieldName)) {
        if (!this.keyExistsInOptionalFields(optionalField.fieldName)) {
          this.optional.splice(oldIndex2, 0, optionalField);
        }
      }
    },
    getCountOfFormField(keyName) {
      let i = 0;
      for (const [key, value] of Object.entries(this.form.fields)) {
        if (value.fieldName === keyName) {
          i += 1;
        }
      }
      return i;
    },
    keyExistsInFormFields(keyName) {
      for (const [key, value] of Object.entries(this.form.fields)) {
        if (value.fieldName === keyName) {
          return true;
        }
      }
      return false;
    },
    keyExistsInOptionalFields(keyName) {
      for (const [key, value] of Object.entries(this.optional)) {
        if (value.fieldName === keyName) {
          return true;
        }
      }
      return false;
    },
    formFromTemplate(template) {
      const form = JSON.parse(JSON.stringify(template));
      form.fields = [];
      form.optional_fields = [];
      this.optional = [];
      for (const [key, value] of Object.entries(template.fields)) {
        if (value.fixed) {
          console.log("fixed", key);
          value.fieldName = key;
          value.id = key;
          if (value.type !== "email") {
            value.value = "";
          }
          form.fields.push(value);
        } else {
          console.log("optional", key);
          value.fieldName = key;
          value.id = key;
          this.optional.push(value);
        }
      }
      if (template.id !== 3 && template.id !== 6 && template.id !== 8) {
        const value = {};
        value.fieldName = "LocalDuesCategory";
        value.id = value.fieldName;
        value.fixed = true;
        value.templateId = template.id;
        value.required = true;
        value.showPrice = true;
        value.type = "LocalDuesCategory";
        value.label = "Local Dues";
        value.dest = "form.Dues";
        value.order = form.fields.length - 2;
        value.source = this.localDuesCategories;
        form.fields.splice(form.fields.length - 2, 0, value);
      }
      if (template.id === 8) {
        const source = {
          affiliateId: this.store.affiliateId,
          localId: this.store.localId
        };
        const value = {};
        value.fieldName = "childAffiliate";
        value.id = value.fieldName;
        value.fixed = true;
        value.templateId = template.id;
        value.required = true;
        value.localId = this.store.localId;
        value.type = "childAffiliate";
        value.label = "Select local";
        value.dest = "form.childAffiliate";
        value.source = source;
        value.order = form.fields.length - 2;
        form.fields.splice(form.fields.length - 2, 0, value);
      }
      return form;
    }
  }
};
const _hoisted_1$b = { id: "wrapper" };
const _hoisted_2$9 = { id: "sticky" };
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MfpWorkLocation = resolveComponent("MfpWorkLocation");
  const _component_MfpGenericField = resolveComponent("MfpGenericField");
  const _component_draggable = resolveComponent("draggable");
  return openBlock(), createBlock(VContainer, { flex: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[2] || (_cache[2] = [
              createBaseVNode(
                "h4",
                null,
                "Form Fields",
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "2",
            class: "Continue-Button"
          }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#0A2A5C",
                onClick: $options.reset
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode(" Reset Form ")
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
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$b, [
                _ctx.form ? (openBlock(), createBlock(_component_draggable, {
                  key: 0,
                  modelValue: _ctx.form.fields,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.fields = $event),
                  group: "fields",
                  handle: ".handle",
                  "item-key": "id",
                  animation: "200",
                  "ghost-class": "ghost",
                  class: "flex-1-0"
                }, {
                  item: withCtx(({ element, index: index2 }) => [
                    element.dataSource === "employmentInformation" ? (openBlock(), createBlock(_component_MfpWorkLocation, {
                      key: 0,
                      field: element,
                      required: element.required,
                      designer: "",
                      store: $props.store
                    }, null, 8, ["field", "required", "store"])) : (openBlock(), createBlock(_component_MfpGenericField, {
                      key: 1,
                      "item-key": index2,
                      field: element,
                      designer: "",
                      onRemove: ($event) => $options.removeField(index2)
                    }, null, 8, ["item-key", "field", "onRemove"]))
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue"])) : createCommentVNode("v-if", true),
                createBaseVNode("div", _hoisted_2$9, [
                  _cache[4] || (_cache[4] = createBaseVNode(
                    "h4",
                    null,
                    "Optional Fields",
                    -1
                    /* HOISTED */
                  )),
                  createVNode(VList, null, {
                    default: withCtx(() => [
                      createVNode(_component_draggable, {
                        modelValue: _ctx.optional,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.optional = $event),
                        "item-key": "id",
                        group: { name: "fields", put: false },
                        clone: $options.cloneField,
                        onRemove: $options.moveField
                      }, {
                        item: withCtx(({ element }) => [
                          createVNode(
                            VListItem,
                            {
                              "prepend-icon": "mdi:mdi-arrow-all",
                              variant: "outlined",
                              class: "mb-1 elevation-1 rounded-bs-lg rounded-te-lg"
                            },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(element.label),
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
                        _: 1
                        /* STABLE */
                      }, 8, ["modelValue", "clone", "onRemove"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const FormDesigner = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormDesigner.vue"]]);
const _sfc_main$g = {
  name: "FormBuilderDesigner",
  components: { FormDesigner },
  props: {
    store: { type: Object, required: true }
  },
  emits: ["next", "prev", "remove", "reset", "save"],
  options: {
    label: "Form Designer"
  },
  data: () => ({
    loading: false
  }),
  created() {
  },
  methods: {
    reset() {
      this.$emit("reset");
    },
    remove(data) {
      this.$emit("remove", data);
    },
    save(data) {
      this.$emit("save", data);
    }
  }
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormDesigner = resolveComponent("FormDesigner");
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[2] || (_cache[2] = [
              createBaseVNode(
                "h2",
                null,
                "Form Designer",
                -1
                /* HOISTED */
              )
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
          createVNode(_component_FormDesigner, {
            store: $props.store,
            onReset: $options.reset,
            onRemove: $options.remove,
            onSave: $options.save
          }, null, 8, ["store", "onReset", "onRemove", "onSave"])
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VBtn, {
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("prev"))
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode(" Back ")
                ])),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, { class: "Continue-Button" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#0A2A5C",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("next"))
              }, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode(" Continue ")
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
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const FormBuilderDesigner = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormBuilderDesigner.vue"]]);
const _sfc_main$f = {
  name: "FormBuilderReview",
  components: { PageForm: PageForm$1 },
  options: {
    label: "Review and Save"
  },
  emits: ["prev", "reset"],
  props: {
    store: { type: Object, required: true }
  },
  data: () => ({
    loading: false,
    form: null,
    saveButtonText: "",
    actions: api$1.getFormActions()
  }),
  created() {
    this.form = this.store.form;
    this.form.display_name = this.store.formTitle;
    this.form.description = this.store.formDescription;
    if (this.store.action === this.actions.create || this.store.action === this.actions.clone) {
      this.saveButtonText = "Create Form";
    } else if (this.store.action === this.actions.edit) {
      this.saveButtonText = "Update Form";
    }
  },
  methods: {
    save() {
      api$1.formCreate(this.store).then(() => {
        this.$emit("reset");
        this.$router.push({ path: "manage" });
      }).catch((error) => {
        alert(error);
      });
    }
  }
};
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PageForm = resolveComponent("PageForm");
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createBaseVNode(
                "h2",
                null,
                "Review and Save",
                -1
                /* HOISTED */
              )
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
              createVNode(_component_PageForm, {
                "form-predefined": _ctx.form,
                disabled: ""
              }, null, 8, ["form-predefined"])
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
              createVNode(VBtn, {
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("prev"))
              }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode(" Back ")
                ])),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, { class: "Continue-Button" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#0A2A5C",
                onClick: $options.save
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(_ctx.saveButtonText),
                    1
                    /* TEXT */
                  )
                ]),
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
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const FormBuilderReview = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormBuilderReview.vue"]]);
const _sfc_main$e = {
  name: "FormBuilderConfirmation",
  components: {
    MfpTextField,
    MfpTextAreaField
  },
  options: {
    label: "Submission Confirmation and Email"
  },
  props: {
    store: { type: Object, required: true }
  },
  emits: ["prev", "next", "reset"],
  data: () => ({
    loading: false,
    valid: false,
    actions: api$1.getFormActions(),
    thankYouFields: null,
    sendEmail: false,
    confirmationEmailFields: null,
    isEditConfirmationOnly: false
  }),
  watch: {
    thankYouFields: {
      deep: true,
      handler() {
        this.store.form.thankyou_fields.fields = this.thankYouFields;
        localStorage.formBuilderActiveTemplate = JSON.stringify(this.store);
      }
    },
    sendEmail() {
      this.confirmationEmailFields.sendConfirmationEmail.value = this.sendEmail;
      this.enableDisableEmailFields(this.sendEmail);
      this.store.form.confirmation_email_fields.fields = this.confirmationEmailFields;
      localStorage.formBuilderActiveTemplate = JSON.stringify(this.store);
    },
    confirmationEmailFields: {
      deep: true,
      handler() {
        this.store.form.confirmation_email_fields.fields = this.confirmationEmailFields;
        localStorage.formBuilderActiveTemplate = JSON.stringify(this.store);
      }
    }
  },
  created() {
    this.isEditConfirmationOnly = this.store.action === this.actions.editConfirmation;
    this.thankYouFields = this.store.form.thankyou_fields.fields;
    if (this.thankYouFields.thankyouHeader.value === void 0) {
      this.thankYouFields.thankyouHeader.value = this.thankYouFields.thankyouHeader.default;
      this.thankYouFields.thankyouBody.value = this.thankYouFields.thankyouBody.default;
    }
    this.confirmationEmailFields = this.store.form.confirmation_email_fields.fields;
    this.confirmationEmailFields.confirmationEmailFrom.disabled = true;
    if (this.confirmationEmailFields.confirmationEmailFrom.value === void 0) {
      this.confirmationEmailFields.sendConfirmationEmail.value = this.sendEmail;
      this.confirmationEmailFields.confirmationEmailCC.value = "";
      this.confirmationEmailFields.confirmationEmailCC.tooltip = true;
      this.confirmationEmailFields.confirmationEmailCC.toolText = "To include more than one CC recipient, separate email addresses with a comma";
      this.confirmationEmailFields.confirmationEmailBCC.value = "";
      this.confirmationEmailFields.confirmationEmailBCC.tooltip = true;
      this.confirmationEmailFields.confirmationEmailBCC.toolText = "To include more than one BCC recipient, separate email addresses with a comma";
      this.confirmationEmailFields.confirmationEmailFrom.value = this.confirmationEmailFields.confirmationEmailFrom.default;
      this.confirmationEmailFields.confirmationEmailSubject.value = this.confirmationEmailFields.confirmationEmailSubject.default;
      this.confirmationEmailFields.confirmationEmailBody.value = this.confirmationEmailFields.confirmationEmailBody.default;
    } else {
      this.sendEmail = this.confirmationEmailFields.sendConfirmationEmail.value;
    }
    this.enableDisableEmailFields(this.sendEmail);
    this.store.form.thankyou_fields.fields = this.thankYouFields;
    this.store.form.confirmation_email_fields.fields = this.confirmationEmailFields;
    localStorage.formBuilderActiveTemplate = JSON.stringify(this.store);
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    doPrev() {
      if (this.isEditConfirmationOnly) {
        this.$router.push({ path: "manage" });
      } else {
        this.$emit("prev");
      }
    },
    doNext() {
      if (this.isEditConfirmationOnly) {
        this.save();
      } else {
        if (this.valid) {
          this.$emit("next");
        }
      }
    },
    enableDisableEmailFields(sendEmail) {
      this.confirmationEmailFields.confirmationEmailCC.disabled = !sendEmail;
      this.confirmationEmailFields.confirmationEmailBCC.disabled = !sendEmail;
      this.confirmationEmailFields.confirmationEmailBody.disabled = !sendEmail;
    },
    save() {
      api$1.formCreate(this.store).then(() => {
        this.$emit("reset");
        this.$router.push({ path: "manage" });
      }).catch((error) => {
        alert(error);
      });
    }
  }
};
const _hoisted_1$a = { key: 0 };
const _hoisted_2$8 = { key: 1 };
const _hoisted_3$7 = { key: 0 };
const _hoisted_4$6 = { key: 1 };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MfpTextField = resolveComponent("MfpTextField");
  const _component_MfpTextAreaField = resolveComponent("MfpTextAreaField");
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[10] || (_cache[10] = [
              createBaseVNode(
                "h2",
                null,
                "Submission Confirmation and Email",
                -1
                /* HOISTED */
              )
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
              createVNode(VForm, {
                ref: "form",
                modelValue: _ctx.valid,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.valid = $event)
              }, {
                default: withCtx(() => [
                  createVNode(VContainer, { flex: "" }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { class: "formHeaderSettings" }, {
                            default: withCtx(() => [
                              createVNode(_component_MfpTextField, {
                                modelValue: _ctx.thankYouFields.thankyouHeader.value,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.thankYouFields.thankyouHeader.value = $event),
                                field: _ctx.thankYouFields.thankyouHeader,
                                class: "formHeader"
                              }, null, 8, ["modelValue", "field"]),
                              createVNode(_component_MfpTextAreaField, {
                                modelValue: _ctx.thankYouFields.thankyouBody.value,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.thankYouFields.thankyouBody.value = $event),
                                field: _ctx.thankYouFields.thankyouBody,
                                designer: true,
                                class: "formHeader"
                              }, null, 8, ["modelValue", "field"])
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
              }, 8, ["modelValue"])
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
          createVNode(VCol, { class: "formHeaderSettings" }, {
            default: withCtx(() => [
              createVNode(VCheckbox, {
                modelValue: _ctx.sendEmail,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.sendEmail = $event),
                label: _ctx.confirmationEmailFields.sendConfirmationEmail.label
              }, null, 8, ["modelValue", "label"]),
              createVNode(VTextField, {
                modelValue: _ctx.confirmationEmailFields.confirmationEmailFrom.value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.confirmationEmailFields.confirmationEmailFrom.value = $event),
                disabled: ""
              }, null, 8, ["modelValue"]),
              createVNode(_component_MfpTextField, {
                modelValue: _ctx.confirmationEmailFields.confirmationEmailCC.value,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.confirmationEmailFields.confirmationEmailCC.value = $event),
                field: _ctx.confirmationEmailFields.confirmationEmailCC
              }, null, 8, ["modelValue", "field"]),
              createVNode(_component_MfpTextField, {
                modelValue: _ctx.confirmationEmailFields.confirmationEmailBCC.value,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.confirmationEmailFields.confirmationEmailBCC.value = $event),
                field: _ctx.confirmationEmailFields.confirmationEmailBCC
              }, null, 8, ["modelValue", "field"]),
              createVNode(_component_MfpTextAreaField, {
                modelValue: _ctx.confirmationEmailFields.confirmationEmailBody.value,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.confirmationEmailFields.confirmationEmailBody.value = $event),
                field: _ctx.confirmationEmailFields.confirmationEmailBody,
                disabled: !_ctx.confirmationEmailFields.sendConfirmationEmail.value,
                designer: true,
                class: "formHeader"
              }, null, 8, ["modelValue", "field", "disabled"]),
              createVNode(VExpansionPanels, {
                disabled: !_ctx.confirmationEmailFields.sendConfirmationEmail.value
              }, {
                default: withCtx(() => [
                  createVNode(VExpansionPanel, null, {
                    default: withCtx(() => [
                      createVNode(VExpansionPanelTitle, null, {
                        default: withCtx(() => _cache[11] || (_cache[11] = [
                          createBaseVNode(
                            "strong",
                            null,
                            "Token list",
                            -1
                            /* HOISTED */
                          )
                        ])),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(VExpansionPanelText, null, {
                        default: withCtx(() => _cache[12] || (_cache[12] = [
                          createTextVNode(" {affiliate_number} - Affiliate Number "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {affiliate_name} - Affiliate Name "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {chapter_name} - Chapter Name "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {unit_name} - Unit Name "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {affiliate_address_line1} - Affiliate Address Line1 "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {affiliate_address_line2} - Affiliate Address Line2 "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {affiliate_address_city} - Affiliate Address City "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {affiliate_address_state} - Affiliate Address State "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {affiliate_address_zip} - Affiliate Address Zip "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {submission_first_name} - Submission First Name "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          ),
                          createTextVNode(" {submission_last_name} - Submission Last Name "),
                          createBaseVNode(
                            "br",
                            null,
                            null,
                            -1
                            /* HOISTED */
                          )
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
              }, 8, ["disabled"])
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
              createVNode(VBtn, {
                onClick: _cache[8] || (_cache[8] = ($event) => $options.doPrev())
              }, {
                default: withCtx(() => [
                  _ctx.isEditConfirmationOnly ? (openBlock(), createElementBlock("span", _hoisted_1$a, " Cancel (back to Manage Forms) ")) : (openBlock(), createElementBlock("span", _hoisted_2$8, " Back "))
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, { class: "Continue-Button" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                disabled: !_ctx.valid,
                color: "#0A2A5C",
                onClick: _cache[9] || (_cache[9] = ($event) => $options.doNext())
              }, {
                default: withCtx(() => [
                  _ctx.isEditConfirmationOnly ? (openBlock(), createElementBlock("span", _hoisted_3$7, " Update confirmation ")) : (openBlock(), createElementBlock("span", _hoisted_4$6, " Continue "))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const FormBuilderConfirmation = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormBuilderConfirmation.vue"]]);
const _sfc_main$d = {
  name: "FormBuilder",
  components: {
    FormBuilderTemplateChooser,
    FormBuilderSettings,
    FormBuilderDuesCategories,
    FormBuilderDesigner,
    FormBuilderReview,
    FormBuilderConfirmation
  },
  props: {
    steps: { type: Array, required: true },
    showPrevNext: { type: Boolean, default: true }
  },
  data: () => ({
    stepCurrId: -1,
    stepMax: -1,
    activeEditTemplate: {},
    stepActive: null,
    stepsList: [],
    dialogFormWIP: false,
    templateName: ""
  }),
  computed: {
    stepActiveComponent() {
      return this.stepActive.component;
    }
  },
  watch: {
    steps: function(list) {
      this.stepMax = list.length;
    },
    stepCurrId: function() {
      this.stepActive = this.stepsList[this.stepCurrId - 1];
      this.updateSteps();
    }
  },
  created() {
    if (!this.verifyActionAndRoute()) {
      this.reset();
    } else {
      this.dialogFormWIP = false;
      if (localStorage.formBuilderActiveTemplate) {
        const activeTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
        const url = new URL(window.location.href);
        const navClicked = url.searchParams.get("nav") != null ? url.searchParams.get("nav") === "true" : false;
        if (activeTemplate.action && url.pathname.endsWith("create") && navClicked) {
          api$1.templateShow(activeTemplate.templateId).then((responseTemplate) => {
            this.templateName = responseTemplate.data.display_name;
            this.dialogFormWIP = true;
          });
        }
      }
    }
    this.processSteps(false);
  },
  methods: {
    processSteps(doReset) {
      if (doReset) {
        this.reset();
      }
      this.updateSteps();
      this.stepMax = this.stepsList.length;
      this.doSetStep(this.activeEditTemplate.step, false);
      const url = new URL(window.location.href);
      const navClicked = url.searchParams.get("nav") != null ? url.searchParams.get("nav") === "true" : false;
      if (url.pathname.endsWith("create") && navClicked) {
        this.$router.push({ path: "create" });
      }
    },
    verifyActionAndRoute() {
      if (localStorage.formBuilderActiveTemplate) {
        const activeTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
        const url = new URL(window.location.href);
        return !(url.pathname.endsWith("create") && activeTemplate.action && activeTemplate.action.startsWith("edit"));
      }
      return false;
    },
    updateSteps() {
      if (localStorage.formBuilderActiveTemplate) {
        this.activeEditTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
        if (this.activeEditTemplate && this.activeEditTemplate.templateId && (parseInt(this.activeEditTemplate.templateId, 10) === 3 || parseInt(this.activeEditTemplate.templateId, 10) === 6 || parseInt(this.activeEditTemplate.templateId, 10) === 8)) {
          if (this.activeEditTemplate.reloadRoute) {
            this.stepsList = [...this.steps];
            this.stepsList.splice(2, 1);
            this.stepsList[2].step = 3;
            this.stepsList[3].step = 4;
            this.stepsList[4].step = 5;
          } else {
            this.save({ key: "reloadRoute", value: true });
            this.$router.go();
          }
        } else {
          this.stepsList = [...this.steps];
        }
      }
    },
    reset() {
      this.activeEditTemplate = {};
      localStorage.formBuilderActiveTemplate = JSON.stringify(this.activeEditTemplate);
    },
    remove({ key }) {
      delete this.activeEditTemplate[key];
      localStorage.formBuilderActiveTemplate = JSON.stringify(this.activeEditTemplate);
    },
    save({ key, value }) {
      this.activeEditTemplate[key] = value;
      localStorage.formBuilderActiveTemplate = JSON.stringify(this.activeEditTemplate);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    doPrevStep() {
      if (this.stepCurrId > 1) {
        this.stepCurrId -= 1;
        this.save({ key: "step", value: this.stepCurrId });
        this.scrollToTop();
      }
    },
    doSetStep(step, save2) {
      const shouldSave = save2 === void 0 ? true : save2;
      let setStep = step || 1;
      if (setStep < 1) {
        setStep = 1;
      }
      if (setStep > this.stepMax) {
        setStep = this.stepMax;
      }
      if (setStep === this.stepCurrId) {
        return;
      }
      this.stepCurrId = setStep;
      if (shouldSave) {
        this.save({ key: "step", value: this.stepCurrId });
      }
      this.scrollToTop();
    },
    doNextStep() {
      if (this.stepCurrId <= this.stepMax) {
        this.updateDefaultTextForFields(this.stepCurrId);
        this.stepCurrId += 1;
        this.save({ key: "step", value: this.stepCurrId });
        this.scrollToTop();
      }
    },
    updateDefaultTextForFields(step) {
      const activeTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
      let stepIs = 4;
      if (activeTemplate && activeTemplate.templateId && (parseInt(activeTemplate.templateId, 10) === 3 || parseInt(activeTemplate.templateId, 10) === 6 || parseInt(activeTemplate.templateId, 10) === 8)) {
        stepIs = 3;
      }
      if (step === stepIs) {
        if (localStorage.formBuilderActiveTemplate) {
          if (activeTemplate.form) {
            api$1.templateShow(activeTemplate.templateId).then((response) => {
              const customTextField = response.data.fields.customTextField;
              const markupTextField = response.data.fields.markupTextField;
              Object.keys(activeTemplate.form.fields).forEach((fieldIndex) => {
                const templateField = activeTemplate.form.fields[fieldIndex];
                if (templateField.fieldName === "customTextField" && (templateField.label === null || templateField.label.length === 0)) {
                  templateField.label = customTextField.label;
                  this.activeEditTemplate = activeTemplate;
                  localStorage.formBuilderActiveTemplate = JSON.stringify(activeTemplate);
                }
                if (templateField.fieldName === "markupTextField" && (templateField.label === null || templateField.label.length === 0)) {
                  templateField.label = markupTextField.label;
                  this.activeEditTemplate = activeTemplate;
                  localStorage.formBuilderActiveTemplate = JSON.stringify(activeTemplate);
                }
              });
            });
          }
        }
      }
    }
  }
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createVNode(VStepper, {
        modelValue: _ctx.stepCurrId,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.stepCurrId = $event),
        class: "mb-huge",
        color: "#0A2A5C"
      }, {
        default: withCtx(() => [
          createVNode(VStepperHeader, {
            class: normalizeClass({ "hide-step-header": _ctx.stepCurrId == 1 })
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.stepsList, (step) => {
                  return openBlock(), createElementBlock(
                    Fragment,
                    {
                      key: step.step
                    },
                    [
                      createVNode(VStepperItem, {
                        complete: _ctx.stepCurrId > step.step,
                        value: step.step,
                        color: "#0A2A5C"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(step.label),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["complete", "value"]),
                      step.step < _ctx.stepMax ? (openBlock(), createBlock(VDivider, { key: 0 })) : createCommentVNode("v-if", true)
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
          }, 8, ["class"]),
          _ctx.stepActive ? (openBlock(), createBlock(VContainer, { key: 0 }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent($options.stepActiveComponent), {
                store: _ctx.activeEditTemplate,
                onReset: _cache[0] || (_cache[0] = ($event) => $options.reset()),
                onSave: _cache[1] || (_cache[1] = ($event) => $options.save($event)),
                onRemove: _cache[2] || (_cache[2] = ($event) => $options.remove($event)),
                onPrev: _cache[3] || (_cache[3] = ($event) => $options.doPrevStep()),
                onNext: _cache[4] || (_cache[4] = ($event) => $options.doNextStep())
              }, null, 40, ["store"]))
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true),
          $props.showPrevNext ? (openBlock(), createBlock(VStepperActions, { key: 1 }, {
            prev: withCtx(() => [
              _ctx.stepCurrId > 1 && !_ctx.stepActive.noPrev ? (openBlock(), createBlock(VBtn, {
                key: 0,
                color: "primary",
                onClick: _cache[5] || (_cache[5] = ($event) => $options.doPrevStep())
              }, {
                default: withCtx(() => _cache[11] || (_cache[11] = [
                  createTextVNode(" Back ")
                ])),
                _: 1
                /* STABLE */
              })) : createCommentVNode("v-if", true)
            ]),
            next: withCtx(() => [
              _ctx.stepActive.step < _ctx.stepMax && !_ctx.stepActive.noNext ? (openBlock(), createBlock(VBtn, {
                key: 0,
                color: "#0A2A5C",
                onClick: _cache[6] || (_cache[6] = ($event) => $options.doNextStep())
              }, {
                default: withCtx(() => _cache[12] || (_cache[12] = [
                  createTextVNode(" Continue ")
                ])),
                _: 1
                /* STABLE */
              })) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"]),
      createVNode(VDialog, {
        modelValue: _ctx.dialogFormWIP,
        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.dialogFormWIP = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[13] || (_cache[13] = [
                  createTextVNode(" Resume or Restart ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createTextVNode(
                    " Would you like to resume your work for template '" + toDisplayString(_ctx.templateName) + "' from where you left or restart new? ",
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    color: "primary-darken-1",
                    variant: "text",
                    onClick: _cache[8] || (_cache[8] = ($event) => {
                      $options.processSteps(false);
                      _ctx.dialogFormWIP = false;
                    })
                  }, {
                    default: withCtx(() => _cache[14] || (_cache[14] = [
                      createTextVNode(" Resume ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "primary-darken-1",
                    variant: "text",
                    onClick: _cache[9] || (_cache[9] = ($event) => {
                      $options.processSteps(true);
                      _ctx.dialogFormWIP = false;
                    })
                  }, {
                    default: withCtx(() => _cache[15] || (_cache[15] = [
                      createTextVNode(" Restart ")
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
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const FormBuilder = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-43b4e15a"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/builder/FormBuilder.vue"]]);
const _sfc_main$c = {
  name: "PageCreateForm",
  components: { FormBuilder },
  data: () => ({
    step: 1,
    steps: [
      { step: 1, ...FormBuilderTemplateChooser.options, component: "FormBuilderTemplateChooser" },
      { step: 2, ...FormBuilderSettings.options, component: "FormBuilderSettings" },
      { step: 3, ...FormBuilderDuesCategories.options, component: "FormBuilderDuesCategories" },
      { step: 4, ...FormBuilderDesigner.options, component: "FormBuilderDesigner" },
      { step: 5, ...FormBuilderConfirmation.options, component: "FormBuilderConfirmation" },
      { step: 6, ...FormBuilderReview.options, component: "FormBuilderReview" }
    ]
  })
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormBuilder = resolveComponent("FormBuilder");
  return openBlock(), createBlock(_component_FormBuilder, {
    steps: _ctx.steps,
    "show-prev-next": false
  }, null, 8, ["steps"]);
}
const PageCreateForm = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageCreateForm.vue"]]);
const _sfc_main$b = {
  name: "PageDashboard",
  data: () => ({
    panel: [],
    announcements: [],
    loading: false
  }),
  mounted() {
    this.getAnnouncements();
  },
  methods: {
    getAnnouncements() {
      this.loading = true;
      api$1.contentBlocks("/admin/api/active-content-block?application=memberforms").then((response) => {
        this.announcements = response.data.data;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
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
                                createTextVNode(
                                  toDisplayString(announcement.title),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["class"]),
                            createVNode(VExpansionPanelText, {
                              innerHTML: announcement.content
                            }, null, 8, ["innerHTML"])
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
const PageDashboard = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageDashboard.vue"]]);
const _sfc_main$a = {
  name: "PageForm",
  components: {
    MfpErrorDialog,
    MfpWorkLocation,
    MfpGenericField
  },
  props: {
    disabled: { type: Boolean, default: false },
    formPredefined: { type: Object, required: false }
  },
  data: () => ({
    loading: false,
    formValid: false,
    form: {},
    errorResponse: null,
    disableButton: false,
    formValidationMessage: "",
    signatureError: "",
    designer: false,
    fab: false,
    uniqueKey: 0
  }),
  watch: {
    form: {
      deep: true,
      handler() {
        console.log("FORM CHANGED", this.form);
        this.updateSource();
        this.updateBillingAddressSameAsHome();
      }
    }
  },
  mounted() {
    const divElement = document.getElementById("memberforms");
    divElement.id = "memberforms1";
    this.disableButton = this.disabled;
    if (this.$route.params.id || this.formPredefined) {
      this.getData(this.$route.params.id);
    } else {
      this.getFormIdForCustomUrl(this.$route.params.affiliateNumber, this.$route.params.customUrl);
    }
  },
  methods: {
    getData(id) {
      this.loading = true;
      if (this.formPredefined) {
        this.form = this.formPredefined;
        this.loading = false;
      } else {
        api$2.getForm(id).then((response) => {
          this.form = response.data;
          if (!this.form) {
            this.disableButton = true;
          }
          this.loading = false;
        });
      }
    },
    getFormIdForCustomUrl(affiliateNumber, customUrl) {
      api$2.getFormIdByCustomUrl(affiliateNumber, customUrl).then((response) => {
        this.getData(response.data);
      });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    validate() {
      this.$refs.form.validate();
    },
    getFormField(fieldName) {
      return this.form.fields[Object.keys(this.form.fields).find((key) => this.form.fields[key].fieldName === fieldName)];
    },
    updateSource() {
      if (this.form.fields) {
        const employmentInformationField = this.getFormField("employmentInformation");
        const workLocationField = this.getFormField("workLocation");
        if (workLocationField) {
          workLocationField.source = employmentInformationField.value;
        }
        const workStructureField = this.getFormField("workStructure");
        if (workStructureField) {
          workStructureField.source = employmentInformationField.value;
        }
        const jobTitleField = this.getFormField("jobTitle");
        if (jobTitleField) {
          jobTitleField.source = employmentInformationField.value;
        }
      }
    },
    updateBillingAddressSameAsHome() {
      if (!this.disabled && this.form.fields) {
        const billingAddress = this.getFormField("billingAddress");
        const mailingAddress = this.getFormField("mailingAddress");
        if (mailingAddress && billingAddress && typeof billingAddress.fields.billingSameAsHome.value !== "undefined") {
          if (billingAddress.fields.billingSameAsHome.value) {
            billingAddress.fields.billingAddressLine1.value = mailingAddress.fields.addressLine1.value;
            billingAddress.fields.billingAddressLine2.value = mailingAddress.fields.addressLine2.value;
            billingAddress.fields.billingCity.value = mailingAddress.fields.city.value;
            billingAddress.fields.billingState.value = mailingAddress.fields.state.value;
            billingAddress.fields.billingState.stateName = this.getStateName(
              mailingAddress.fields.state.source,
              mailingAddress.fields.state.value
            );
            billingAddress.fields.billingZip.value = mailingAddress.fields.zip.value;
          } else {
            delete billingAddress.fields.billingAddressLine1.value;
            delete billingAddress.fields.billingAddressLine2.value;
            delete billingAddress.fields.billingCity.value;
            delete billingAddress.fields.billingState.value;
            delete billingAddress.fields.billingZip.value;
            delete billingAddress.fields.billingState.stateName;
          }
          this.uniqueKey = Math.floor(Math.random() * 10);
        }
      }
    },
    getStateName(stateList, stateCode) {
      if (stateCode && stateCode > 0) {
        const oState = stateList.filter((state2) => state2.itemValue === stateCode.toString());
        return oState ? oState[0].itemText : "";
      }
      return "";
    },
    onSubmit() {
      if (!this.$refs.form.validate()) {
        this.formValidationMessage = "Please fill in all required fields.";
      }
      this.submit();
    },
    submit() {
      console.log("form", this.form);
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.disableButton = true;
        api$2.sendFormData(this.form.id, this.form).then((response) => {
          console.log(response.data);
          api$1.dataFormSubmissionUpdate(response.data.submissionId);
          this.$router.push({ name: "manage", params: {} });
        }).catch((error) => {
          this.errorResponse = error.response;
          this.disableButton = false;
          console.log("FORM ERRORS", error.response);
        }).finally(() => {
          this.loading = false;
        });
      }
      this.$vuetify.goTo(0);
    }
  }
};
const _hoisted_1$9 = { class: "form-card-header" };
const _hoisted_2$7 = { key: 0 };
const _hoisted_3$6 = { class: "py-4 form-title" };
const _hoisted_4$5 = ["innerHTML"];
const _hoisted_5$5 = { class: "sig-alert" };
const _hoisted_6$4 = { class: "d-block" };
const _hoisted_7$4 = { key: 0 };
const _hoisted_8$4 = { key: 1 };
const _hoisted_9$4 = { key: 2 };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MfpWorkLocation = resolveComponent("MfpWorkLocation");
  const _component_MfpGenericField = resolveComponent("MfpGenericField");
  const _component_MfpErrorDialog = resolveComponent("MfpErrorDialog");
  return openBlock(), createBlock(VCard, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1$9, [
        _ctx.form.show_fed_logo == false && _ctx.form.show_aft_logo == false && _ctx.form.show_local_logo == false ? (openBlock(), createElementBlock("div", _hoisted_2$7)) : (openBlock(), createBlock(VCardTitle, {
          key: 1,
          class: "d-flex justify-space-between",
          flat: "",
          tile: ""
        }, {
          default: withCtx(() => [
            createVNode(VCol, {
              cols: "12",
              sm: "4"
            }, {
              default: withCtx(() => [
                _ctx.form.show_aft_logo ? (openBlock(), createBlock(VImg, {
                  key: 0,
                  class: "first-logo",
                  "max-width": "120",
                  "max-height": "48",
                  cover: "",
                  src: "/vendor/memberforms/images/aft-small.png"
                })) : _ctx.form.show_aft_logo == false && _ctx.form.show_fed_logo == true && _ctx.form.show_local_logo == false || _ctx.form.show_aft_logo == false && _ctx.form.show_fed_logo == false && _ctx.form.show_local_logo == true ? (openBlock(), createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" NO logo "),
                    createVNode(VImg, {
                      class: "first-logo",
                      "max-width": "120",
                      "max-height": "48",
                      cover: ""
                    })
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : _ctx.form.show_aft_logo == false && _ctx.form.show_fed_logo == true ? (openBlock(), createElementBlock(
                  Fragment,
                  { key: 2 },
                  [
                    createCommentVNode(" FED logo "),
                    createVNode(VImg, {
                      class: "first-logo",
                      "max-width": "120",
                      "max-height": "48",
                      cover: "",
                      src: _ctx.form.fed_logo_url && _ctx.form.fed_logo_url
                    }, null, 8, ["src"])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : createCommentVNode("v-if", true)
              ]),
              _: 1
              /* STABLE */
            }),
            createVNode(VCol, {
              cols: "12",
              sm: "4"
            }, {
              default: withCtx(() => [
                createCommentVNode(" FED logo "),
                _ctx.form.show_fed_logo && _ctx.form.show_fed_logo == true && _ctx.form.show_aft_logo == true && _ctx.form.show_local_logo == true ? (openBlock(), createBlock(VImg, {
                  key: 0,
                  class: "second-logo",
                  "max-width": "120",
                  "max-height": "48",
                  cover: "",
                  src: _ctx.form.fed_logo_url && _ctx.form.fed_logo_url
                }, null, 8, ["src"])) : createCommentVNode("v-if", true)
              ]),
              _: 1
              /* STABLE */
            }),
            createVNode(VCol, {
              cols: "12",
              sm: "4"
            }, {
              default: withCtx(() => [
                createCommentVNode(" LOCAL logo "),
                _ctx.form.show_local_logo && _ctx.form.show_local_logo == true ? (openBlock(), createBlock(VImg, {
                  key: 0,
                  class: "third-logo",
                  "max-width": "120",
                  "max-height": "48",
                  cover: "",
                  src: _ctx.form.local_logo_url && _ctx.form.local_logo_url
                }, null, 8, ["src"])) : _ctx.form.show_fed_logo == true && _ctx.form.show_local_logo == false ? (openBlock(), createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" FED logo "),
                    createVNode(VImg, {
                      class: "third-logo",
                      "max-width": "120",
                      "max-height": "48",
                      cover: "",
                      src: _ctx.form.fed_logo_url && _ctx.form.fed_logo_url
                    }, null, 8, ["src"])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : createCommentVNode("v-if", true)
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        })),
        createBaseVNode(
          "h4",
          _hoisted_3$6,
          toDisplayString(_ctx.form.display_name),
          1
          /* TEXT */
        )
      ]),
      createVNode(VCardText, { class: "form-header" }, {
        default: withCtx(() => [
          createCommentVNode(" eslint-disable vue/no-v-html "),
          createBaseVNode("p", {
            style: { "width": "100%" },
            innerHTML: _ctx.form.description
          }, null, 8, _hoisted_4$5),
          createCommentVNode("eslint-enable")
        ]),
        _: 1
        /* STABLE */
      }),
      _ctx.formValidationMessage != "" ? (openBlock(), createBlock(VAlert, {
        key: 0,
        density: "compact",
        variant: "outlined",
        type: "error",
        class: "mx-4"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_5$5, [
            createBaseVNode(
              "span",
              _hoisted_6$4,
              toDisplayString(_ctx.formValidationMessage),
              1
              /* TEXT */
            )
          ])
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createVNode(VForm, {
        ref: "form",
        modelValue: _ctx.formValid,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.formValid = $event),
        autocomplete: "off",
        class: "v-form"
      }, {
        default: withCtx(() => [
          createVNode(VContainer, { flex: "" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.form.fields, (field) => {
                  return openBlock(), createBlock(
                    VRow,
                    {
                      key: field.id
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          VCol,
                          null,
                          {
                            default: withCtx(() => [
                              field.type == "employmentInformation" ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
                                (openBlock(), createBlock(_component_MfpWorkLocation, {
                                  key: field.id,
                                  modelValue: field.value,
                                  "onUpdate:modelValue": ($event) => field.value = $event,
                                  field,
                                  required: field.required,
                                  designer: _ctx.designer
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "required", "designer"]))
                              ])) : field.type == "billingAddress" ? (openBlock(), createElementBlock("div", _hoisted_8$4, [
                                (openBlock(), createBlock(_component_MfpGenericField, {
                                  key: _ctx.uniqueKey,
                                  "item-key": field.order,
                                  field,
                                  required: field.required
                                }, null, 8, ["item-key", "field", "required"]))
                              ])) : (openBlock(), createElementBlock("div", _hoisted_9$4, [
                                createVNode(_component_MfpGenericField, {
                                  "item-key": field.order,
                                  field,
                                  required: field.required
                                }, null, 8, ["item-key", "field", "required"])
                              ]))
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
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"]),
      createVNode(VCardActions, { class: "d-flex justify-center" }, {
        default: withCtx(() => [
          createVNode(VBtn, {
            disabled: _ctx.disableButton,
            color: "primary",
            class: "px-6",
            size: "large",
            onClick: $options.onSubmit
          }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createTextVNode(" Join! ")
            ])),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "onClick"])
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "black",
        opacity: "0.25",
        class: "align-center justify-center"
      }, {
        default: withCtx(() => [
          createVNode(VProgressCircular, {
            color: "primary",
            indeterminate: "",
            size: "64"
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model-value"]),
      createVNode(_component_MfpErrorDialog, { "error-response": _ctx.errorResponse }, null, 8, ["error-response"]),
      createCommentVNode(" Mobile back to top fab button "),
      createBaseVNode("div", null, [
        withDirectives(createVNode(VBtn, {
          fixed: "",
          location: "bottom right",
          color: "#6F9FCD",
          onClick: $options.toTop,
          icon: "mdi:mdi-chevron-up"
        }, null, 8, ["onClick"]), [
          [vShow, _ctx.fab],
          [Scroll, $options.onScroll]
        ])
      ])
    ]),
    _: 1
    /* STABLE */
  });
}
const PageDataForm = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-050fd449"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageDataForm.vue"]]);
const _sfc_main$9 = {
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
      api$2.getForm(id).then((response) => {
        this.form = response.data;
        this.thankYouHeaderContent = this.form.thankyou_fields.fields.thankyouHeader.value;
        this.thankYouBodyContent = this.form.thankyou_fields.fields.thankyouBody.value;
      });
    }
  }
};
const _hoisted_1$8 = ["innerHTML"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
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
          createBaseVNode("span", { innerHTML: _ctx.thankYouBodyContent }, null, 8, _hoisted_1$8),
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
const PageDataFormThankYou = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-22f4f84f"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageDataFormThankYou.vue"]]);
const _sfc_main$8 = {
  name: "PageDuesCategoryCreation",
  data: () => ({
    affiliateId: null,
    billHighwayGroupId: null,
    nationalPerCapitaCategory: null,
    billingTypes: [],
    selectedBillingType: null,
    nationalPerCapitaList: [],
    duesAlert: false,
    duesError: false,
    errorMessage: "",
    isButtonDisabled: false
  }),
  created() {
    this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
    this.billHighwayGroupId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].BillHighwayGroupId : null;
  },
  mounted() {
    this.getNationalPerCapita();
    this.billHighwayCategories();
  },
  methods: {
    getNationalPerCapita() {
      if (!this.affiliateId) {
        return;
      }
      this.loading = true;
      api$1.search("nationalPerCapita").then((response) => {
        this.nationalPerCapitaList = response.data;
      }).finally(() => {
      });
    },
    billHighwayCategories() {
      if (!this.affiliateId) {
        return;
      }
      this.loading = true;
      api$1.search("recurringBillingTypes", "", { affiliateId: this.affiliateId, groupId: this.billHighwayGroupId, from: "form" }).then((response) => {
        this.billingTypes = response.data;
        this.billingTypes = this.billingTypes ? this.billingTypes.filter((i) => i.IsActive) : [];
      }).finally(() => {
        this.loading = false;
      });
    },
    async saveDuesCategory() {
      if (!this.affiliateId) {
        return;
      }
      this.loading = true;
      this.duesError = false;
      this.isButtonDisabled = true;
      await api$1.createDuesCategory({
        affiliateId: this.affiliateId,
        NationalPerCapitaId: this.nationalPerCapitaCategory.NationalPerCapitaId,
        StatePerCapitaId: null,
        LocalDuesCategoryName: this.selectedBillingType.LocalDuesCategoryName,
        billingTypeId: this.selectedBillingType.LocalDuesCategoryId,
        LocalDuesAmount: this.selectedBillingType.LocalDuesAmount,
        LocalDuesPercentage: this.selectedBillingType.LocalDuesPercentage,
        PaymentFrequency: this.selectedBillingType.FrequencyDescription,
        StartDate: this.selectedBillingType.EffectiveDate,
        EndDate: this.selectedBillingType.EndDate
      }).then(() => {
        this.duesAlert = true;
      }).catch((e) => {
        let errorMessage = "somthing went wrong";
        if (e.response) {
          const LocalDuesCategoryNameMessage = e.response.data.errors.billingTypeId[0];
          if (LocalDuesCategoryNameMessage) {
            errorMessage = LocalDuesCategoryNameMessage;
          }
        }
        this.errorMessage = errorMessage;
        this.duesError = true;
        this.isButtonDisabled = false;
        console.log("Error", e);
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[4] || (_cache[4] = [
              createBaseVNode(
                "h2",
                null,
                "Please select mapping to create:",
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, { class: "pl-3" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VAlert, {
                modelValue: _ctx.duesAlert,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.duesAlert = $event),
                variant: "outlined",
                type: "success",
                class: "mb-0"
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode(" Created Dues Mapping successfully ")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"]),
              createVNode(VAlert, {
                modelValue: _ctx.duesError,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.duesError = $event),
                variant: "outlined",
                type: "error",
                class: "mb-0"
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(_ctx.errorMessage),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"])
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
          createVNode(VCol, {
            cols: "12",
            sm: "6"
          }, {
            default: withCtx(() => [
              createVNode(VSelect, {
                modelValue: _ctx.selectedBillingType,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.selectedBillingType = $event),
                items: _ctx.billingTypes,
                "item-title": "LocalDuesCategoryName",
                "item-value": "LocalDuesCategoryId",
                label: "Select Billhighway Billing Type",
                "return-object": "",
                "hide-details": "",
                variant: "outlined",
                required: ""
              }, null, 8, ["modelValue", "items"]),
              _ctx.selectedBillingType != null ? (openBlock(), createBlock(VRow, {
                key: 0,
                class: "ml-1 mt-0"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    sm: "4"
                  }, {
                    default: withCtx(() => [
                      _cache[6] || (_cache[6] = createBaseVNode(
                        "span",
                        { class: "font-weight-light" },
                        " Dues Amount: ",
                        -1
                        /* HOISTED */
                      )),
                      createBaseVNode(
                        "span",
                        null,
                        "$" + toDisplayString(_ctx.selectedBillingType.LocalDuesAmount),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    sm: "6"
                  }, {
                    default: withCtx(() => [
                      _cache[7] || (_cache[7] = createBaseVNode(
                        "span",
                        { class: "font-weight-light" },
                        " Frequency: ",
                        -1
                        /* HOISTED */
                      )),
                      createBaseVNode(
                        "span",
                        null,
                        toDisplayString(_ctx.selectedBillingType.FrequencyDescription),
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
              })) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "6"
          }, {
            default: withCtx(() => [
              createVNode(VSelect, {
                modelValue: _ctx.nationalPerCapitaCategory,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.nationalPerCapitaCategory = $event),
                items: _ctx.nationalPerCapitaList,
                "item-title": "NationalPerCapitaName",
                "item-value": "NationalPerCapitaId",
                label: "National Per Capita Category",
                "return-object": "",
                variant: "outlined",
                required: ""
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
          createVNode(VCol, {
            cols: "12",
            sm: "2"
          }, {
            default: withCtx(() => [
              _ctx.nationalPerCapitaCategory && _ctx.selectedBillingType ? (openBlock(), createBlock(VBtn, {
                key: 0,
                color: "#0A2A5C",
                disabled: _ctx.isButtonDisabled,
                onClick: $options.saveDuesCategory
              }, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode(" Create ")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["disabled", "onClick"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "2"
          }, {
            default: withCtx(() => [
              _ctx.nationalPerCapitaCategory && _ctx.selectedBillingType && _ctx.isButtonDisabled ? (openBlock(), createBlock(VBtn, {
                key: 0,
                color: "#0A2A5C",
                href: "/app/memberforms/admin/dues-create"
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode(" Create new dues category ")
                ])),
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
      })
    ]),
    _: 1
    /* STABLE */
  });
}
const PageDuesCategoryCreation = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-8209e8e8"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageDuesCategoryCreation.vue"]]);
const _sfc_main$7 = {
  name: "PageDuesMapping",
  data: () => ({
    loading: false,
    affiliateId: null,
    items: [],
    localDuesModel: [],
    valid: true,
    localDuesLabel: "Local Dues ID:",
    billingTypeLabel: "Billing Type ID:",
    select: { name: "Select Billing Type", disabled: false },
    billingTypes: [],
    disabled: true,
    selectedMappings: {},
    existingMappings: {},
    existingMappingsClone: {},
    duesMapping: [],
    duesAlert: false,
    dialog: false,
    hasNewSubmission: false
  }),
  watch: {},
  created() {
    this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
  },
  mounted() {
    this.duesMappingCategories();
    this.billHighwayCategories();
    this.hasNewSubmissionForDues();
    setTimeout(this.showItems, 5e3);
  },
  methods: {
    showItems() {
      console.log(this.items);
    },
    changeBillingType(event, item) {
      const selected = Object.values(this.selectedMappings);
      const existing = Object.values(this.existingMappings);
      const allSelected = [...selected, ...existing];
      if (event.id !== 1 && allSelected.includes(event.id)) {
        this.dialog = true;
        setTimeout(() => {
          this.existingMappings = {};
          const dataKeys = Object.keys(this.existingMappingsClone);
          const dataValues = Object.values(this.existingMappingsClone);
          dataValues.forEach((dueValue, key) => {
            const LocalDuesCategoryId = dataKeys[key];
            this.existingMappings[LocalDuesCategoryId] = dueValue;
          });
        }, 1e3);
      } else {
        this.selectedMappings[this.localDuesModel] = parseInt(event.id, 10);
        this.existingMappingsClone[item.LocalDuesCategoryId] = parseInt(event.id, 10);
      }
    },
    async getDuesMapping() {
      this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
      try {
        if (!this.affiliateId) {
          return;
        }
        this.loading = true;
        const { data } = await api$1.duesMappingList(this.affiliateId).catch((err) => {
          throw new Error(err);
        });
        data.forEach((dueValue) => {
          this.existingMappings[dueValue.dues_category_id] = parseInt(dueValue.bill_highway_type_id, 10);
          this.existingMappingsClone[dueValue.dues_category_id] = parseInt(dueValue.bill_highway_type_id, 10);
        });
      } catch (error) {
        console.log("Error fetching URL Redirects: ", error);
      }
      this.loading = false;
    },
    async saveDuesMapping() {
      this.$refs.form.validate();
      if (!this.affiliateId) {
        return;
      }
      if (!this.valid) {
        return;
      }
      this.loading = true;
      this.duesAlert = true;
      await api$1.duesMappingCreate({
        affiliateId: this.affiliateId,
        selectedData: this.selectedMappings
      }).then(() => {
      }).catch(() => {
      }).finally(() => {
        this.loading = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    hasNewSubmissionForDues() {
      if (!this.affiliateId) {
        return;
      }
      this.loading = true;
      api$1.hasNewSubmissionForDues(this.affiliateId).then((response) => {
        this.hasNewSubmission = response.data.hasNewSubmissionForDues;
      }).finally(() => {
        this.loading = false;
      });
    },
    duesMappingCategories() {
      if (!this.affiliateId) {
        return;
      }
      this.loading = true;
      api$1.search("duescategory", "", { affiliateId: this.affiliateId, from: "duesmapping" }).then((response) => {
        this.items = response.data;
      }).finally(() => {
      });
    },
    billHighwayCategories() {
      if (!this.affiliateId) {
        return;
      }
      this.loading = true;
      api$1.search("billingtypes", "", { affiliateId: this.affiliateId }).then((response) => {
        this.billingTypes = [{ id: 1, name: "Do Not Map" }, ...response.data];
        setTimeout(() => {
          this.getDuesMapping();
        }, 1e3);
      }).finally(() => {
        this.loading = false;
      });
    },
    validate() {
      this.$refs.form.validate();
    }
  }
};
const _hoisted_1$7 = { class: "text-subtitle-1" };
const _hoisted_2$6 = {
  key: 0,
  style: { "color": "#ff0000" }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VForm, {
    ref: "form",
    modelValue: _ctx.valid,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.valid = $event)
  }, {
    default: withCtx(() => [
      createVNode(VContainer, { fluid: "" }, {
        default: withCtx(() => [
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createBaseVNode(
                    "h2",
                    null,
                    "Local Dues Mapping",
                    -1
                    /* HOISTED */
                  )
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
                  createVNode(VBtn, {
                    color: "#0A2A5C",
                    to: { name: "dues-create" }
                  }, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(" Create Local Dues Mapping ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VAlert, {
                    modelValue: _ctx.duesAlert,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.duesAlert = $event),
                    density: "compact",
                    type: "success",
                    class: "mb-0"
                  }, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode(" Saved Local Dues Mapping ")
                    ])),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue"])
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
                  createVNode(VContainer, { class: "list-container" }, {
                    default: withCtx(() => [
                      _cache[9] || (_cache[9] = createBaseVNode(
                        "h4",
                        null,
                        " Local Dues Category ",
                        -1
                        /* HOISTED */
                      )),
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.items, (item) => {
                          return openBlock(), createBlock(VRow, {
                            key: item.LocalDuesCategoryId,
                            value: item.LocalDuesCategoryId,
                            "active-class": "indigo--text text--accent-4",
                            class: "dues-items pt-3"
                          }, {
                            default: withCtx(() => [
                              createVNode(
                                VCol,
                                null,
                                {
                                  default: withCtx(() => [
                                    createBaseVNode(
                                      "span",
                                      _hoisted_1$7,
                                      toDisplayString(item.LocalDuesCategoryName),
                                      1
                                      /* TEXT */
                                    ),
                                    item.LocalDuesAmount || item.LocalDuesAmount === 0 ? (openBlock(), createBlock(
                                      VRow,
                                      { key: 0 },
                                      {
                                        default: withCtx(() => [
                                          createVNode(
                                            VCol,
                                            null,
                                            {
                                              default: withCtx(() => [
                                                _cache[7] || (_cache[7] = createBaseVNode(
                                                  "span",
                                                  { class: "text-subtitle-2" },
                                                  " Dues Amount: ",
                                                  -1
                                                  /* HOISTED */
                                                )),
                                                createBaseVNode(
                                                  "span",
                                                  null,
                                                  "$" + toDisplayString(item.LocalDuesAmount),
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
                                            VCol,
                                            null,
                                            {
                                              default: withCtx(() => [
                                                _cache[8] || (_cache[8] = createBaseVNode(
                                                  "span",
                                                  { class: "font-weight-light" },
                                                  " Frequency: ",
                                                  -1
                                                  /* HOISTED */
                                                )),
                                                createBaseVNode(
                                                  "span",
                                                  null,
                                                  toDisplayString(item.PaymentFrequencyName),
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
                                      },
                                      1024
                                      /* DYNAMIC_SLOTS */
                                    )) : (openBlock(), createBlock(
                                      VRow,
                                      { key: 1 },
                                      {
                                        default: withCtx(() => [
                                          createVNode(
                                            VCol,
                                            null,
                                            {
                                              default: withCtx(() => [
                                                createTextVNode(
                                                  " $" + toDisplayString(item.LocalDuesAmount),
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
                                      },
                                      1024
                                      /* DYNAMIC_SLOTS */
                                    ))
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              ),
                              createVNode(
                                VCol,
                                null,
                                {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: _ctx.existingMappings[item.LocalDuesCategoryId],
                                      "onUpdate:modelValue": [($event) => _ctx.existingMappings[item.LocalDuesCategoryId] = $event, ($event) => $options.changeBillingType($event, item)],
                                      items: _ctx.billingTypes,
                                      density: "compact",
                                      "item-title": "name",
                                      "item-value": "id",
                                      label: "Select Billing Type",
                                      rules: [(v) => !!v || "Please select a billing type"],
                                      "return-object": "",
                                      variant: "outlined",
                                      required: "",
                                      class: "ml-auto"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "rules"])
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              ),
                              createVNode(VDivider)
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["value"]);
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
          }),
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    disabled: _ctx.hasNewSubmission || !_ctx.valid,
                    color: "#0A2A5C",
                    onClick: $options.saveDuesMapping
                  }, {
                    default: withCtx(() => _cache[10] || (_cache[10] = [
                      createTextVNode(" Save ")
                    ])),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled", "onClick"]),
                  _ctx.hasNewSubmission ? (openBlock(), createElementBlock("p", _hoisted_2$6, " You should be able to Save once there are no New submissions! ")) : createCommentVNode("v-if", true)
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
      }),
      createVNode(VDialog, {
        modelValue: _ctx.dialog,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.dialog = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[11] || (_cache[11] = [
                  createTextVNode("This option is already in use, please try another one")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.dialog = false)
                  }, {
                    default: withCtx(() => _cache[12] || (_cache[12] = [
                      createTextVNode(" Dismiss ")
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
      }, 8, ["modelValue"]),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["modelValue"]);
}
const PageDuesMapping = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-750a2a26"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageDuesMapping.vue"]]);
const _sfc_main$6 = {
  name: "PageForm",
  components: {
    MfpErrorDialog,
    MfpGenericField,
    MfpWorkLocation
  },
  props: {
    disabled: { type: Boolean, default: false },
    formPredefined: { type: Object, required: false }
  },
  data: () => ({
    loading: false,
    formValid: false,
    form: {},
    errorResponse: null,
    disableButton: false,
    designer: false,
    fab: false
  }),
  watch: {
    form: {
      deep: true,
      handler() {
        console.log("FORM CHANGED", this.form);
        this.updateSource();
      }
    }
  },
  mounted() {
    this.disableButton = this.disabled;
    if (this.$route.params.id || this.formPredefined) {
      this.getData(this.$route.params.id);
    } else {
      this.getFormIdForCustomUrl(this.$route.params.affiliateNumber, this.$route.params.customUrl);
    }
  },
  methods: {
    getData(id) {
      this.loading = true;
      if (this.formPredefined) {
        this.form = this.formPredefined;
        this.loading = false;
      } else {
        api$1.getForm(id).then((response) => {
          this.form = response.data;
          this.disableButton = true;
          this.loading = false;
        });
      }
    },
    getFormIdForCustomUrl(affiliateNumber, customUrl) {
      api$1.getFormIdByCustomUrl(affiliateNumber, customUrl).then((response) => {
        this.getData(response.data);
      });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    validate() {
      this.$refs.form.validate();
    },
    getFormField(fieldName) {
      return this.form.fields[Object.keys(this.form.fields).find((key) => this.form.fields[key].fieldName === fieldName)];
    },
    updateSource() {
      console.log("form", this.form);
      if (this.form.fields) {
        const employmentInformationField = this.getFormField("employmentInformation");
        const workLocationField = this.getFormField("workLocation");
        if (workLocationField) {
          workLocationField.source = employmentInformationField.value;
        }
        const workStructureField = this.getFormField("workStructure");
        if (workStructureField) {
          workStructureField.source = employmentInformationField.value;
        }
        const jobTitleField = this.getFormField("jobTitle");
        if (jobTitleField) {
          jobTitleField.source = employmentInformationField.value;
        }
      }
    },
    submit() {
      console.log("form", this.form);
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.disableButton = true;
        api$1.sendFormData(this.form.id, this.form).then((response) => {
          console.log(response.data);
          this.$router.push({ name: "thankyou", params: { id: this.form.id } });
        }).catch((error) => {
          this.errorResponse = error.response;
          this.disableButton = false;
          console.log("FORM ERRORS", error.response);
        }).finally(() => {
          this.loading = false;
        });
      }
      this.$vuetify.goTo(0);
    }
  }
};
const _hoisted_1$6 = ["innerHTML"];
const _hoisted_2$5 = { key: 0 };
const _hoisted_3$5 = { key: 1 };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MfpWorkLocation = resolveComponent("MfpWorkLocation");
  const _component_MfpGenericField = resolveComponent("MfpGenericField");
  const _component_MfpErrorDialog = resolveComponent("MfpErrorDialog");
  return openBlock(), createBlock(VCard, null, {
    default: withCtx(() => [
      createVNode(VCardTitle, { class: "form-title d-flex pa-8" }, {
        default: withCtx(() => [
          _ctx.form.show_aft_logo ? (openBlock(), createBlock(VImg, {
            key: 0,
            class: "mr-2",
            "max-width": "41",
            src: "/vendor/memberforms/images/aft-small.png"
          })) : createCommentVNode("v-if", true),
          createBaseVNode(
            "h4",
            null,
            toDisplayString(_ctx.form.display_name),
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
          createBaseVNode("p", {
            style: { "width": "100%" },
            innerHTML: _ctx.form.description
          }, null, 8, _hoisted_1$6),
          createCommentVNode("eslint-enable")
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VForm, {
        ref: "form",
        modelValue: _ctx.formValid,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.formValid = $event),
        autocomplete: "off",
        class: "v-form"
      }, {
        default: withCtx(() => [
          createVNode(VContainer, { flex: "" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.form.fields, (field) => {
                  return openBlock(), createBlock(
                    VRow,
                    {
                      key: field.id
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          VCol,
                          null,
                          {
                            default: withCtx(() => [
                              field.type == "employmentInformation" ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
                                (openBlock(), createBlock(_component_MfpWorkLocation, {
                                  key: field.id,
                                  modelValue: field.value,
                                  "onUpdate:modelValue": ($event) => field.value = $event,
                                  field,
                                  required: field.required,
                                  designer: _ctx.designer
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "required", "designer"]))
                              ])) : (openBlock(), createElementBlock("div", _hoisted_3$5, [
                                createVNode(_component_MfpGenericField, {
                                  "item-key": field.order,
                                  field,
                                  required: field.required
                                }, null, 8, ["item-key", "field", "required"])
                              ]))
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
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"]),
      createVNode(VCardActions, { class: "d-flex justify-center" }, {
        default: withCtx(() => [
          createVNode(VBtn, {
            disabled: _ctx.disableButton,
            color: "primary",
            class: "px-6",
            size: "large",
            onClick: $options.submit
          }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createTextVNode(" Join! ")
            ])),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "onClick"])
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "black",
        opacity: "0.25",
        class: "align-center justify-center"
      }, {
        default: withCtx(() => [
          createVNode(VProgressCircular, {
            color: "primary",
            indeterminate: "",
            size: "64"
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model-value"]),
      createVNode(_component_MfpErrorDialog, { "error-response": _ctx.errorResponse }, null, 8, ["error-response"]),
      createCommentVNode(" Mobile back to top fab button "),
      createBaseVNode("div", null, [
        withDirectives(createVNode(VBtn, {
          fixed: "",
          location: "bottom right",
          color: "#6F9FCD",
          onClick: $options.toTop,
          icon: "mdi:mdi-chevron-up"
        }, null, 8, ["onClick"]), [
          [vShow, _ctx.fab],
          [Scroll, $options.onScroll]
        ])
      ])
    ]),
    _: 1
    /* STABLE */
  });
}
const PageForm = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-860cc8ce"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageForm.vue"]]);
const _sfc_main$5 = {
  name: "PageManageForms",
  data: () => ({
    loading: false,
    affiliateId: null,
    affiliateNumber: null,
    tableHeaders: [
      { title: "Form Name", value: "system_name" },
      { title: "Form Title", value: "display_name" },
      { title: "Submissions", value: "form_submissions_count" },
      { title: "Template", value: "form_template_display_name" },
      { title: "Action", value: "action" }
    ],
    forms: [],
    actions: api$1.getFormActions(),
    searchValue: "",
    dialogClone: {},
    dialogEdit: {},
    dialogEditConfirmation: {},
    dialogDelete: {},
    dialogArchive: {},
    dialogUnarchive: {},
    dialogDataForm: {}
  }),
  computed: {
    displayDate(date) {
      return format(date, "MMMM dd, yyyy");
    }
  },
  watch: {
    affiliateId() {
      this.$nextTick(() => {
        localStorage.mfpAffiliateId = JSON.stringify(this.affiliateId);
        this.getForms();
      });
    }
  },
  created() {
    this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
    this.affiliateNumber = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateNumber : null;
  },
  methods: {
    getForms() {
      if (!this.affiliateId) {
        return;
      }
      this.loading = true;
      api$1.formList(this.affiliateId).then((response) => {
        this.forms = response.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    searchFor(query) {
      this.searchValue = query;
    },
    cloneFormToDataForm(form) {
      this.dialogDataForm[form.id] = false;
      api$1.formCloneToDataForm(form.id).then((response) => {
        this.getForms();
      }).finally(() => {
        this.loading = false;
      });
    },
    cloneForm(form) {
      this.dialogClone[form.id] = false;
      this.buildForm(2, this.actions.clone, form);
    },
    deleteForm(form) {
      api$1.formDelete(form.id).then((response) => {
        if (response.data[0] === "success") {
          this.getForms();
        }
      }).finally(() => {
        this.dialogDelete[form.id] = false;
      });
    },
    archiveForm(form) {
      api$1.formArchive(form.id).then((response) => {
        if (response.data[0] === "success") {
          this.getForms();
        }
      }).finally(() => {
        this.dialogArchive[form.id] = false;
      });
    },
    unarchiveForm(form) {
      api$1.formUnarchive(form.id).then((response) => {
        if (response.data[0] === "success") {
          this.getForms();
        }
      }).finally(() => {
        this.dialogArchive[form.id] = false;
      });
    },
    editConfirmation(form) {
      this.dialogEditConfirmation[form.id] = false;
      if (this.isPerformingSameFormAction(this.actions.editConfirmation, form)) {
        this.$router.push({ path: "edit" });
      } else {
        this.buildForm(5, this.actions.editConfirmation, form);
      }
    },
    editForm(form) {
      this.dialogEdit[form.id] = false;
      if (this.isPerformingSameFormAction(this.actions.edit, form)) {
        this.$router.push({ path: "edit" });
      } else {
        this.buildForm(2, this.actions.edit, form);
      }
    },
    isPerformingSameFormAction(action, form) {
      const localStorageActiveTemplate = localStorage.formBuilderActiveTemplate ? JSON.parse(localStorage.formBuilderActiveTemplate) : null;
      return localStorageActiveTemplate && localStorageActiveTemplate.action && localStorageActiveTemplate.action === action && localStorageActiveTemplate.formId === form.id;
    },
    buildForm(step, action, form) {
      const templateIds = {
        PD_CopeOnly: 3,
        PP_CopeOnly: 6,
        PP_StateFed: 8
      };
      api$1.formShow(form.id).then((responseForm) => {
        const existingForm = responseForm.data;
        api$1.templateShow(existingForm.form_template_id).then((responseTemplate) => {
          const defaultTemplate = responseTemplate.data;
          const formToLoad = {
            templateId: existingForm.form_template_id,
            affiliateId: existingForm.affiliate_id,
            chapterId: existingForm.employment_information_fields ? existingForm.employment_information_fields.chapterId : null,
            employerId: existingForm.employment_information_fields ? existingForm.employment_information_fields.employerId : null,
            unitId: existingForm.employment_information_fields ? existingForm.employment_information_fields.unitId : null,
            formDescription: existingForm.description,
            formName: existingForm.system_name,
            formTitle: existingForm.display_name,
            formShowAftLogo: existingForm.show_aft_logo,
            formShowLocalLogo: existingForm.show_local_logo,
            formShowFedLogo: existingForm.show_fed_logo,
            form: this.extractForm(defaultTemplate, existingForm),
            step,
            action
          };
          if (action === this.actions.edit || action === this.actions.editConfirmation) {
            formToLoad.formId = existingForm.id;
          } else if (action === this.actions.clone) {
            formToLoad.formName = "";
            formToLoad.formTitle = "";
          }
          if (parseInt(existingForm.form_template_id, 10) === templateIds.PD_CopeOnly || parseInt(existingForm.form_template_id, 10) === templateIds.PP_CopeOnly) {
            if (action === this.actions.editConfirmation) {
              formToLoad.step = 4;
            }
            formToLoad.reloadRoute = true;
          } else {
            const duesCategories = this.extractDuesCategories(responseForm.data.fields);
            if (duesCategories && duesCategories.length > 0) {
              formToLoad.duesCategories = duesCategories;
            }
          }
          if (parseInt(existingForm.form_template_id, 10) === templateIds.PP_CopeOnly) {
            formToLoad.billHighwayBillingTypeId = existingForm.sources.copeOnlyBillingTypeId;
          }
          if (parseInt(existingForm.form_template_id, 10) === templateIds.PP_StateFed) {
            const localIds = this.extractLocalIds(responseForm.data.fields);
            if (localIds && localIds.length > 0) {
              formToLoad.localId = localIds;
            }
          }
          localStorage.formBuilderActiveTemplate = JSON.stringify(formToLoad);
          if (action === this.actions.clone) {
            this.$router.push({ path: "create" });
          } else {
            this.$router.push({ path: "edit" });
          }
        });
      }).finally(() => {
      });
    },
    extractForm(defaultTemplate, existingForm) {
      const form = JSON.parse(JSON.stringify(defaultTemplate));
      form.fields = [];
      form.optional_fields = [];
      for (const [key, value] of Object.entries(existingForm.fields)) {
        form.fields.push(value);
      }
      if (existingForm.optional_fields) {
        for (const [key, value] of Object.entries(existingForm.optional_fields)) {
          form.optional_fields.push(value);
        }
      }
      form.thankyou_fields = existingForm.thankyou_fields;
      form.confirmation_email_fields = existingForm.confirmation_email_fields;
      return form;
    },
    extractDuesCategories(formFields) {
      const duesCategories = [];
      Object.values(formFields).forEach((fieldValue) => {
        if (fieldValue.fieldName.toLowerCase() === "localduescategory") {
          Object.values(fieldValue.source).forEach((duesCategory) => {
            duesCategories.push(duesCategory.LocalDuesCategoryId);
          });
        }
      });
      return duesCategories;
    },
    extractLocalIds(formFields) {
      let localIdList = null;
      Object.values(formFields).forEach((fieldValue) => {
        if (fieldValue.fieldName.toLowerCase() === "childaffiliate") {
          localIdList = fieldValue.localId;
        }
      });
      return localIdList;
    }
  }
};
const _hoisted_1$5 = { key: 0 };
const _hoisted_2$4 = ["href"];
const _hoisted_3$4 = { key: 1 };
const _hoisted_4$4 = ["href"];
const _hoisted_5$4 = { key: 2 };
const _hoisted_6$3 = ["href"];
const _hoisted_7$3 = { key: 3 };
const _hoisted_8$3 = ["href"];
const _hoisted_9$3 = ["colspan"];
const _hoisted_10$2 = { class: "form-details" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[0] || (_cache[0] = [
              createBaseVNode(
                "h2",
                null,
                "Manage Forms",
                -1
                /* HOISTED */
              )
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
              createVNode(VDataTable, {
                headers: _ctx.tableHeaders,
                items: _ctx.forms,
                "show-expand": "",
                search: _ctx.searchValue,
                class: "v-outlined forms-table"
              }, {
                [`item.system_name`]: withCtx(({ item }) => [
                  !item.url_redirect && item.archived == 1 ? (openBlock(), createElementBlock("span", _hoisted_1$5, [
                    createBaseVNode("a", {
                      href: "/app/memberforms/admin" + item.url
                    }, toDisplayString(item.system_name), 9, _hoisted_2$4)
                  ])) : !item.url_redirect && item.archived == 0 && item.form_template_id == 7 ? (openBlock(), createElementBlock("span", _hoisted_3$4, [
                    createBaseVNode("a", {
                      href: "/app/memberforms/admin" + item.url.replace("/form", "/dataform")
                    }, toDisplayString(item.system_name), 9, _hoisted_4$4)
                  ])) : !item.url_redirect && item.archived == 0 ? (openBlock(), createElementBlock("span", _hoisted_5$4, [
                    createBaseVNode("a", {
                      href: "/app/memberforms" + item.url
                    }, toDisplayString(item.system_name), 9, _hoisted_6$3)
                  ])) : item.url_redirect ? (openBlock(), createElementBlock("span", _hoisted_7$3, [
                    createBaseVNode("a", {
                      href: "/app/memberforms/" + _ctx.affiliateNumber + "/" + item.url_redirect
                    }, toDisplayString(item.system_name), 9, _hoisted_8$3)
                  ])) : createCommentVNode("v-if", true)
                ]),
                [`item.CreatedAt`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "span",
                    null,
                    toDisplayString($options.displayDate(item.CreatedAt)),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.UpdatedAt`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "span",
                    null,
                    toDisplayString($options.displayDate(item.UpdatedAt)),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.action`]: withCtx(({ item }) => [
                  createVNode(
                    VTooltip,
                    { location: "top" },
                    {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps(props, {
                          disabled: item.form_template_id == 7,
                          class: "ma-2",
                          variant: "text",
                          icon: "mdi:mdi-content-copy"
                        }), {
                          default: withCtx(() => [
                            createVNode(VIcon),
                            createVNode(
                              VDialog,
                              {
                                activator: "parent",
                                "max-width": "290"
                              },
                              {
                                default: withCtx(({ isActive }) => [
                                  createVNode(
                                    VCard,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, { class: "text-h5" }, {
                                          default: withCtx(() => _cache[1] || (_cache[1] = [
                                            createTextVNode(" Clone Form ")
                                          ])),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCardText,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                ' Would you like to clone the form "' + toDisplayString(item.display_name) + '"? ',
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
                                          VCardActions,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createVNode(VSpacer),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => isActive.value = false
                                              }, {
                                                default: withCtx(() => _cache[2] || (_cache[2] = [
                                                  createTextVNode(" Cancel ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"]),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => {
                                                  $options.cloneForm(item);
                                                }
                                              }, {
                                                default: withCtx(() => _cache[3] || (_cache[3] = [
                                                  createTextVNode(" Clone ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"])
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
                        }, 1040, ["disabled"])
                      ]),
                      default: withCtx(() => [
                        _cache[4] || (_cache[4] = createBaseVNode(
                          "span",
                          null,
                          "Clone",
                          -1
                          /* HOISTED */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  createCommentVNode(" eslint-enable "),
                  createVNode(
                    VTooltip,
                    { location: "top" },
                    {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps(props, {
                          disabled: item.form_submissions_count > 0 || item.archived == 1,
                          class: "ma-2",
                          variant: "text",
                          icon: "mdi:mdi-square-edit-outline"
                        }), {
                          default: withCtx(() => [
                            createVNode(VIcon),
                            createVNode(
                              VDialog,
                              {
                                activator: "parent",
                                "max-width": "290"
                              },
                              {
                                default: withCtx(({ isActive }) => [
                                  createVNode(
                                    VCard,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, { class: "text-h5" }, {
                                          default: withCtx(() => _cache[5] || (_cache[5] = [
                                            createTextVNode(" Edit Form ")
                                          ])),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCardText,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                ' Would you like to edit the form "' + toDisplayString(item.display_name) + '"? ',
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
                                          VCardActions,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createVNode(VSpacer),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => isActive.value = false
                                              }, {
                                                default: withCtx(() => _cache[6] || (_cache[6] = [
                                                  createTextVNode(" Cancel ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"]),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => {
                                                  $options.editForm(item);
                                                }
                                              }, {
                                                default: withCtx(() => _cache[7] || (_cache[7] = [
                                                  createTextVNode(" Edit ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"])
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
                        }, 1040, ["disabled"])
                      ]),
                      default: withCtx(() => [
                        _cache[8] || (_cache[8] = createBaseVNode(
                          "span",
                          null,
                          "Edit",
                          -1
                          /* HOISTED */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  createVNode(
                    VTooltip,
                    { location: "top" },
                    {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps(props, {
                          disabled: item.archived == 1 || item.form_template_id == 7,
                          class: "ma-2",
                          variant: "text",
                          icon: "mdi:mdi-checkbox-marked-outline"
                        }), {
                          default: withCtx(() => [
                            createVNode(VIcon),
                            createVNode(
                              VDialog,
                              {
                                activator: "parent",
                                "max-width": "290"
                              },
                              {
                                default: withCtx(({ isActive }) => [
                                  createVNode(
                                    VCard,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, { class: "text-h5" }, {
                                          default: withCtx(() => _cache[9] || (_cache[9] = [
                                            createTextVNode(" Update Confirmation ")
                                          ])),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCardText,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                ' Would you like to update confirmation message for the form "' + toDisplayString(item.display_name) + '"? ',
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
                                          VCardActions,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createVNode(VSpacer),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => isActive.value = false
                                              }, {
                                                default: withCtx(() => _cache[10] || (_cache[10] = [
                                                  createTextVNode(" Cancel ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"]),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => {
                                                  $options.editConfirmation(item);
                                                }
                                              }, {
                                                default: withCtx(() => _cache[11] || (_cache[11] = [
                                                  createTextVNode(" Update ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"])
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
                        }, 1040, ["disabled"])
                      ]),
                      default: withCtx(() => [
                        _cache[12] || (_cache[12] = createBaseVNode(
                          "span",
                          null,
                          "Update Confirmation",
                          -1
                          /* HOISTED */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  createVNode(
                    VTooltip,
                    { loocation: "top" },
                    {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps(props, {
                          disabled: item.form_submissions_count > 0 || item.form_url_redirect_count > 0 || item.archived == 1,
                          class: "ma-2",
                          variant: "text",
                          icon: "mdi:mdi-trash-can-outline"
                        }), {
                          default: withCtx(() => [
                            createVNode(VIcon),
                            createVNode(
                              VDialog,
                              {
                                activator: "parent",
                                "max-width": "290"
                              },
                              {
                                default: withCtx(({ isActive }) => [
                                  createVNode(
                                    VCard,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, { class: "text-h5" }, {
                                          default: withCtx(() => _cache[13] || (_cache[13] = [
                                            createTextVNode(" Delete Form ")
                                          ])),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCardText,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                ' Deleted forms can not be recovered through the Membership Forms Portal. For assistance contact AFT. "' + toDisplayString(item.display_name) + '"? ',
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
                                          VCardActions,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createVNode(VSpacer),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => isActive.value = false
                                              }, {
                                                default: withCtx(() => _cache[14] || (_cache[14] = [
                                                  createTextVNode(" Cancel ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"]),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => {
                                                  $options.deleteForm(item);
                                                }
                                              }, {
                                                default: withCtx(() => _cache[15] || (_cache[15] = [
                                                  createTextVNode(" Delete ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"])
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
                        }, 1040, ["disabled"])
                      ]),
                      default: withCtx(() => [
                        _cache[16] || (_cache[16] = createBaseVNode(
                          "span",
                          null,
                          "Delete",
                          -1
                          /* HOISTED */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  item.archived == 0 ? (openBlock(), createBlock(
                    VTooltip,
                    {
                      key: 0,
                      location: "top"
                    },
                    {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps(props, {
                          disabled: item.archived == 1,
                          class: "ma-2",
                          variant: "text",
                          icon: "mdi:mdi-archive-outline"
                        }), {
                          default: withCtx(() => [
                            createVNode(VIcon),
                            createVNode(
                              VDialog,
                              {
                                activator: "parent",
                                "max-width": "290"
                              },
                              {
                                default: withCtx(({ isActive }) => [
                                  createVNode(
                                    VCard,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, { class: "text-h5" }, {
                                          default: withCtx(() => _cache[17] || (_cache[17] = [
                                            createTextVNode(" Archive Form ")
                                          ])),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCardText,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                ' Would you like to archive the form "' + toDisplayString(item.display_name) + '"? ',
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
                                          VCardActions,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createVNode(VSpacer),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => isActive.value = false
                                              }, {
                                                default: withCtx(() => _cache[18] || (_cache[18] = [
                                                  createTextVNode(" Cancel ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"]),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => {
                                                  $options.archiveForm(item);
                                                }
                                              }, {
                                                default: withCtx(() => _cache[19] || (_cache[19] = [
                                                  createTextVNode(" Archive ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"])
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
                        }, 1040, ["disabled"])
                      ]),
                      default: withCtx(() => [
                        _cache[20] || (_cache[20] = createBaseVNode(
                          "span",
                          null,
                          "Archive",
                          -1
                          /* HOISTED */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )) : createCommentVNode("v-if", true),
                  item.archived == 1 ? (openBlock(), createBlock(
                    VTooltip,
                    {
                      key: 1,
                      location: "top"
                    },
                    {
                      activator: withCtx(({ props }) => [
                        createVNode(
                          VBtn,
                          mergeProps(props, {
                            class: "ma-2",
                            variant: "text",
                            icon: "mdi:mdi-archive-arrow-up-outline"
                          }),
                          {
                            default: withCtx(() => [
                              createVNode(VIcon),
                              createVNode(
                                VDialog,
                                {
                                  activator: "parent",
                                  "max-width": "290"
                                },
                                {
                                  default: withCtx(({ isActive }) => [
                                    createVNode(
                                      VCard,
                                      null,
                                      {
                                        default: withCtx(() => [
                                          createVNode(VCardTitle, { class: "text-h5" }, {
                                            default: withCtx(() => _cache[21] || (_cache[21] = [
                                              createTextVNode(" Unarchive Form ")
                                            ])),
                                            _: 1
                                            /* STABLE */
                                          }),
                                          createVNode(
                                            VCardText,
                                            null,
                                            {
                                              default: withCtx(() => [
                                                createTextVNode(
                                                  ' Would you like to unarchive the form "' + toDisplayString(item.display_name) + '"? ',
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
                                            VCardActions,
                                            null,
                                            {
                                              default: withCtx(() => [
                                                createVNode(VSpacer),
                                                createVNode(VBtn, {
                                                  color: "primary-darken-1",
                                                  variant: "text",
                                                  onClick: ($event) => isActive.value = false
                                                }, {
                                                  default: withCtx(() => _cache[22] || (_cache[22] = [
                                                    createTextVNode(" Cancel ")
                                                  ])),
                                                  _: 2
                                                  /* DYNAMIC */
                                                }, 1032, ["onClick"]),
                                                createVNode(VBtn, {
                                                  color: "primary-darken-1",
                                                  variant: "text",
                                                  onClick: ($event) => {
                                                    $options.unarchiveForm(item);
                                                  }
                                                }, {
                                                  default: withCtx(() => _cache[23] || (_cache[23] = [
                                                    createTextVNode(" Unarchive ")
                                                  ])),
                                                  _: 2
                                                  /* DYNAMIC */
                                                }, 1032, ["onClick"])
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
                          },
                          1040
                          /* FULL_PROPS, DYNAMIC_SLOTS */
                        )
                      ]),
                      default: withCtx(() => [
                        _cache[24] || (_cache[24] = createBaseVNode(
                          "span",
                          null,
                          "Unarchive",
                          -1
                          /* HOISTED */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )) : createCommentVNode("v-if", true),
                  createVNode(
                    VTooltip,
                    { location: "top" },
                    {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps(props, {
                          disabled: !(item.form_template_id == 4 || item.form_template_id == 5),
                          class: "ma-2",
                          variant: "text",
                          icon: "mdi:mdi-content-duplicate"
                        }), {
                          default: withCtx(() => [
                            createVNode(VIcon),
                            createVNode(
                              VDialog,
                              {
                                activator: "parent",
                                "max-width": "290"
                              },
                              {
                                default: withCtx(({ isActive }) => [
                                  createVNode(
                                    VCard,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, { class: "text-h5" }, {
                                          default: withCtx(() => _cache[25] || (_cache[25] = [
                                            createTextVNode(" Clone To Data Form ")
                                          ])),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCardText,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                ' Would you like to create a new Data Form by cloning the form "' + toDisplayString(item.display_name) + '"? ',
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
                                          VCardActions,
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createVNode(VSpacer),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => isActive.value = false
                                              }, {
                                                default: withCtx(() => _cache[26] || (_cache[26] = [
                                                  createTextVNode(" Cancel ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"]),
                                              createVNode(VBtn, {
                                                color: "primary-darken-1",
                                                variant: "text",
                                                onClick: ($event) => {
                                                  $options.cloneFormToDataForm(item);
                                                }
                                              }, {
                                                default: withCtx(() => _cache[27] || (_cache[27] = [
                                                  createTextVNode(" Clone ")
                                                ])),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["onClick"])
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
                        }, 1040, ["disabled"])
                      ]),
                      default: withCtx(() => [
                        _cache[28] || (_cache[28] = createBaseVNode(
                          "span",
                          null,
                          "Clone to Data Form",
                          -1
                          /* HOISTED */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  createCommentVNode(" eslint-enable ")
                ]),
                "item.data-table-expand": withCtx(({ internalItem, isExpanded, toggleExpand }) => [
                  createVNode(VBtn, {
                    icon: isExpanded(internalItem) ? "mdi:mdi-chevron-up" : "mdi:mdi-chevron-down",
                    variant: "text",
                    onClick: ($event) => toggleExpand(internalItem)
                  }, null, 8, ["icon", "onClick"])
                ]),
                "expanded-row": withCtx(({ columns, item }) => [
                  createBaseVNode("td", {
                    colspan: columns.length
                  }, [
                    createBaseVNode("div", _hoisted_10$2, [
                      createCommentVNode("\n                                <div><strong> Affiliate Id: </strong> {{ item.affiliate_id }} </div>\n                                <div><strong> Form Id: </strong> {{ item.id }} </div>\n                                <div>\n                                    <strong> Show in directory: </strong>\n                                    {{ item.show_in_directory ? 'No' : 'Yes' }}\n                                </div>\n                                "),
                      createBaseVNode("div", null, [
                        _cache[29] || (_cache[29] = createBaseVNode(
                          "strong",
                          null,
                          " Created By: ",
                          -1
                          /* HOISTED */
                        )),
                        createTextVNode(
                          " " + toDisplayString(item.CreatedBy),
                          1
                          /* TEXT */
                        )
                      ]),
                      createBaseVNode("div", null, [
                        _cache[30] || (_cache[30] = createBaseVNode(
                          "strong",
                          null,
                          " Created At: ",
                          -1
                          /* HOISTED */
                        )),
                        createTextVNode(
                          " " + toDisplayString($options.displayDate(item.CreatedAt)),
                          1
                          /* TEXT */
                        )
                      ]),
                      createBaseVNode("div", null, [
                        _cache[31] || (_cache[31] = createBaseVNode(
                          "strong",
                          null,
                          " Updated By: ",
                          -1
                          /* HOISTED */
                        )),
                        createTextVNode(
                          " " + toDisplayString(item.UpdatedBy),
                          1
                          /* TEXT */
                        )
                      ]),
                      createBaseVNode("div", null, [
                        _cache[32] || (_cache[32] = createBaseVNode(
                          "strong",
                          null,
                          " Updated At: ",
                          -1
                          /* HOISTED */
                        )),
                        createTextVNode(
                          " " + toDisplayString($options.displayDate(item.UpdatedAt)),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ], 8, _hoisted_9$3)
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["headers", "items", "search"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const PageManageForms = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageManageForms.vue"]]);
const _sfc_main$4 = {
  name: "PageSettings",
  components: {},
  data: () => ({
    isLocalSelecting: false,
    isFedSelecting: false,
    files: {},
    fedFileName: "",
    localFileName: "",
    logoData: {},
    dialog: false,
    deleteType: "",
    alert: false,
    alertType: "success",
    alertText: ""
  }),
  computed: {
    selectedAffiliate() {
      return this.$store.getters["user/selectedAffiliate"].AffiliateId;
    }
  },
  mounted() {
    this.getLogos();
  },
  methods: {
    handleLocalFileImport() {
      this.isLocalSelecting = true;
      window.addEventListener("focus", () => {
        this.isLocalSelecting = false;
      }, { once: true });
      this.$refs.localUploader.click();
    },
    handleFedFileImport() {
      this.isFedSelecting = true;
      window.addEventListener("focus", () => {
        this.isFedSelecting = false;
      }, { once: true });
      this.$refs.fedUploader.click();
    },
    onFileChanged(e) {
      const selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i += 1) {
        this.files[e.target.name] = selectedFiles[i];
      }
      console.log("this.files:", this.files);
      if (e.target.name === "fed") {
        this.fedFileName = URL.createObjectURL(this.files.fed);
      }
      if (e.target.name === "local") {
        this.localFileName = URL.createObjectURL(this.files.local);
      }
    },
    getLogos() {
      const url = "/api/v3/memberforms/admin/get-logos";
      return axios.post(url, { affiliateId: this.selectedAffiliate }).then((response) => {
        this.logoData = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    removeLogoDialog(type) {
      this.dialog = true;
      this.deleteType = type;
    },
    removeLogo(logoType) {
      const url = "/api/v3/memberforms/admin/remove-logo";
      return axios.post(url, { affiliateId: this.selectedAffiliate, type: logoType }).then((response) => {
        console.log(response);
        this.dialog = false;
        this.deleteType = "";
        this.getLogos();
        this.cancelFiles();
        this.alert = true;
        this.alertType = "success";
        this.alertText = "Logo removed successfully.";
      }).catch((error) => {
        console.log(error);
      });
    },
    cancelFiles() {
      this.files = {};
      this.fedFileName = "";
      this.localFileName = "";
    },
    uploadFiles() {
      const url = "/api/v3/memberforms/admin/upload-logos";
      const formData = new FormData();
      formData.append("fed", this.files.fed);
      formData.append("local", this.files.local);
      formData.append("affiliateId", this.selectedAffiliate);
      axios.post(
        url,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      ).then((response) => {
        if (response) {
          this.getLogos();
        }
        this.alert = true;
        this.alertType = "success";
        this.alertText = "Logo updated.";
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};
const _hoisted_1$4 = { class: "logo-item" };
const _hoisted_2$3 = {
  key: 0,
  class: "uploaded-logo"
};
const _hoisted_3$3 = ["src"];
const _hoisted_4$3 = { key: 1 };
const _hoisted_5$3 = ["src"];
const _hoisted_6$2 = { class: "logo-item" };
const _hoisted_7$2 = {
  key: 0,
  class: "uploaded-logo"
};
const _hoisted_8$2 = ["src"];
const _hoisted_9$2 = { key: 1 };
const _hoisted_10$1 = ["src"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, { class: "mt-8" }, {
    default: withCtx(() => [
      createVNode(VAlert, {
        modelValue: _ctx.alert,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.alert = $event),
        type: _ctx.alertType,
        closable: "",
        "close-text": "Dismiss"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString(_ctx.alertText),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue", "type"]),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "10" }, {
            default: withCtx(() => [
              _cache[10] || (_cache[10] = createBaseVNode(
                "h4",
                { class: "mt-3 mb-0" },
                " Local Logo: ",
                -1
                /* HOISTED */
              )),
              createBaseVNode("div", _hoisted_1$4, [
                createVNode(VBtn, {
                  class: "mr-6",
                  color: "primary",
                  name: "local-btn",
                  loading: _ctx.isLocalSelecting,
                  onClick: $options.handleLocalFileImport,
                  "append-icon": "mdi:mdi-cloud-upload"
                }, {
                  default: withCtx(() => _cache[8] || (_cache[8] = [
                    createTextVNode(" Upload ")
                  ])),
                  _: 1
                  /* STABLE */
                }, 8, ["loading", "onClick"]),
                createBaseVNode(
                  "input",
                  {
                    ref: "localUploader",
                    class: "d-none",
                    type: "file",
                    name: "local",
                    accept: ".png, .jpg, .svg",
                    onChange: _cache[1] || (_cache[1] = (...args) => $options.onFileChanged && $options.onFileChanged(...args))
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ),
                _ctx.logoData && _ctx.logoData.localLogo ? (openBlock(), createElementBlock("span", _hoisted_2$3, [
                  createBaseVNode("img", {
                    src: _ctx.logoData.localLogo,
                    alt: "localLogo",
                    width: "60"
                  }, null, 8, _hoisted_3$3),
                  createVNode(VTooltip, { location: "top" }, {
                    activator: withCtx(({ props }) => [
                      createVNode(
                        VBtn,
                        mergeProps({ class: "ml-4" }, props, {
                          onClick: _cache[2] || (_cache[2] = ($event) => $options.removeLogoDialog("local")),
                          icon: "mdi:mdi-trash-can-outline",
                          variant: "text"
                        }),
                        {
                          default: withCtx(() => [
                            createVNode(VIcon, { color: "red" })
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1040
                        /* FULL_PROPS, DYNAMIC_SLOTS */
                      )
                    ]),
                    default: withCtx(() => [
                      _cache[9] || (_cache[9] = createTextVNode(" Discard "))
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])) : _ctx.localFileName !== "" ? (openBlock(), createElementBlock("span", _hoisted_4$3, [
                  createBaseVNode("img", {
                    src: _ctx.localFileName,
                    alt: "fedLogo",
                    width: "60"
                  }, null, 8, _hoisted_5$3)
                ])) : createCommentVNode("v-if", true)
              ])
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
          createVNode(VCol, { cols: "10" }, {
            default: withCtx(() => [
              _cache[13] || (_cache[13] = createBaseVNode(
                "h4",
                { class: "mt-3 mb-0" },
                " State Federation/Other Logo: ",
                -1
                /* HOISTED */
              )),
              createBaseVNode("div", _hoisted_6$2, [
                createVNode(VBtn, {
                  class: "mr-6",
                  color: "primary",
                  name: "fed-btn",
                  loading: _ctx.isFedSelecting,
                  onClick: $options.handleFedFileImport,
                  "append-icon": "mdi:mdi-cloud-upload"
                }, {
                  default: withCtx(() => _cache[11] || (_cache[11] = [
                    createTextVNode(" Upload ")
                  ])),
                  _: 1
                  /* STABLE */
                }, 8, ["loading", "onClick"]),
                createBaseVNode(
                  "input",
                  {
                    ref: "fedUploader",
                    name: "fed",
                    class: "d-none",
                    type: "file",
                    accept: "image/*",
                    onChange: _cache[3] || (_cache[3] = (...args) => $options.onFileChanged && $options.onFileChanged(...args))
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ),
                _ctx.logoData && _ctx.logoData.fedLogo ? (openBlock(), createElementBlock("span", _hoisted_7$2, [
                  createBaseVNode("img", {
                    src: _ctx.logoData.fedLogo,
                    alt: "fedLogo",
                    width: "60"
                  }, null, 8, _hoisted_8$2),
                  createVNode(VTooltip, { location: "top" }, {
                    activator: withCtx(({ props }) => [
                      createVNode(
                        VBtn,
                        mergeProps({ class: "ml-4" }, props, {
                          onClick: _cache[4] || (_cache[4] = ($event) => $options.removeLogoDialog("fed")),
                          icon: "mdi:mdi-trash-can-outline",
                          variant: "text"
                        }),
                        {
                          default: withCtx(() => [
                            createVNode(VIcon, { color: "red" })
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1040
                        /* FULL_PROPS, DYNAMIC_SLOTS */
                      )
                    ]),
                    default: withCtx(() => [
                      _cache[12] || (_cache[12] = createTextVNode(" Discard "))
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])) : _ctx.fedFileName !== "" ? (openBlock(), createElementBlock("span", _hoisted_9$2, [
                  createBaseVNode("img", {
                    src: _ctx.fedFileName,
                    alt: "fedLogo",
                    width: "60"
                  }, null, 8, _hoisted_10$1)
                ])) : createCommentVNode("v-if", true)
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, { class: "mt-8" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            class: "d-flex ga-4"
          }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                size: "large",
                color: "red",
                onClick: $options.cancelFiles
              }, {
                default: withCtx(() => _cache[14] || (_cache[14] = [
                  createTextVNode(" Cancel ")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: $options.uploadFiles
              }, {
                default: withCtx(() => _cache[15] || (_cache[15] = [
                  createTextVNode(" Save Changes ")
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
      }),
      createVNode(VDialog, {
        modelValue: _ctx.dialog,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.dialog = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[16] || (_cache[16] = [
                  createTextVNode(" Are you sure? ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[17] || (_cache[17] = [
                  createTextVNode(" Logo will be deleted permanently. ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    color: "red-darken-1",
                    variant: "text",
                    onClick: _cache[5] || (_cache[5] = ($event) => _ctx.dialog = false)
                  }, {
                    default: withCtx(() => _cache[18] || (_cache[18] = [
                      createTextVNode(" NO ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: _cache[6] || (_cache[6] = ($event) => $options.removeLogo(_ctx.deleteType))
                  }, {
                    default: withCtx(() => _cache[19] || (_cache[19] = [
                      createTextVNode(" YES ")
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
    ]),
    _: 1
    /* STABLE */
  });
}
const PageSetting = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-bbeaa217"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageSettings.vue"]]);
const _sfc_main$3 = {
  name: "FormSubmissionPreview",
  filters: {
    truncate: function(text, length, clamp) {
      const clmp = clamp || "...";
      const node = document.createElement("div");
      node.innerHTML = text;
      const content = node.textContent;
      return content.length > length ? content.slice(0, length) + clmp : content;
    }
  },
  props: {
    submission: { type: Object, required: true },
    individualData: { type: Object, required: false }
  },
  computed: {
    fullName() {
      let n = "";
      if (this.submission.firstName) {
        n += `${this.submission.firstName.data_value} `;
      }
      if (this.submission.middleName) {
        n += `${this.submission.middleName.data_value} `;
      }
      if (this.submission.lastName) {
        n += `${this.submission.lastName.data_value} `;
      }
      return n.trim();
    }
  }
};
const _hoisted_1$3 = ["href"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      $props.individualData && ($props.individualData.submission_status_id === "2" || $props.individualData.submission_status_id === "3") && $props.individualData.IndividualId ? (openBlock(), createBlock(VRow, { key: 0 }, {
        default: withCtx(() => [
          createBaseVNode("a", {
            href: "/individuals/" + $props.individualData.IndividualId
          }, toDisplayString($options.fullName), 9, _hoisted_1$3)
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      !$props.individualData || $props.individualData.submission_status_id !== "2" && $props.individualData.submission_status_id !== "3" ? (openBlock(), createBlock(VRow, { key: 1 }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($options.fullName),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true)
    ]),
    _: 1
    /* STABLE */
  });
}
const FormSubmissionPreview = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/components/FormSumbissionPreview.vue"]]);
const _sfc_main$2 = {
  name: "PageSubmissionList",
  components: { FormSubmissionPreview, FormSearchSelector },
  data: () => ({
    loading: false,
    affiliateId: null,
    formId: null,
    headers: [
      { title: "Full Name", value: "form_submission_data", align: "left" },
      { title: "Form Title", value: "form.display_name", align: "left" },
      { title: "Form Name", value: "form.system_name", align: "left" },
      { title: "View Submission", value: "createNew", align: "left" },
      { title: "Download", value: "download", align: "left" },
      { title: "Resend Email", value: "resendEmail", align: "left" },
      { title: "Date Submitted", value: "CreatedAt", align: "left" },
      { title: "Submission Type", value: "submission_status.status_name", align: "left" }
    ],
    fName: "",
    fNameField: {
      label: "First Name"
    },
    lName: "",
    lNameField: {
      label: "Last Name"
    },
    submissions: [],
    submissionType: "all",
    submissionsList: [
      { typeValue: "all", typeText: "All Submissions" },
      { typeValue: "new", typeText: "New Submissions" },
      { typeValue: "Created Individual", typeText: "Created Individual" },
      { typeValue: "Exists in connect", typeText: "Exists in connect" },
      { typeValue: "not a member", typeText: "Not a Member" }
    ],
    message: "",
    dialog: false,
    dialogConfirm: false,
    downloading: false,
    downloadingCancelToken: null,
    downloadRecordCount: 0,
    downloadRecordTotal: 0,
    downloadRecordChunk: 0,
    downloadPercent: 0,
    downloadSize: "calculating"
  }),
  computed: {
    displayDate() {
      return (date) => format(date, "MMMM dd, yyyy");
    }
  },
  watch: {
    affiliateId() {
      this.$nextTick(() => {
        localStorage.mfpAffiliateId = JSON.stringify(this.affiliateId);
        this.$refs.formSelector.reset();
        this.getSubmissions();
      });
    },
    submissionType() {
      this.getSubmissions();
    },
    formId() {
      this.getSubmissions();
    },
    "$route.query.type"() {
      this.submissions = [];
      this.getSubmissions();
    }
  },
  created() {
    if (localStorage.mfpAffiliateId) {
      this.affiliateId = JSON.parse(localStorage.mfpAffiliateId);
    } else {
      this.affiliateId = null;
    }
  },
  mounted() {
    this.getSubmissions();
  },
  methods: {
    async getSubmissions() {
      var _a;
      this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
      try {
        if (!this.affiliateId) {
          return;
        }
        this.loading = true;
        const submissionType = ((_a = this.$route.query) == null ? void 0 : _a.type) ? this.$route.query.type : this.submissionType;
        const { data } = await api$1.submissionListV2(
          this.affiliateId,
          this.formId,
          submissionType,
          this.fName,
          this.lName
        ).catch((err) => {
          throw new Error(err);
        });
        this.submissions = data;
      } catch (error) {
        console.log("Error fetching submissions: ", error);
      }
      this.loading = false;
    },
    async downloadSubmissions() {
      var _a;
      this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
      try {
        if (!this.affiliateId) {
          return;
        }
        this.loading = true;
        this.downloading = true;
        const self2 = this;
        const submissionType = ((_a = this.$route.query) == null ? void 0 : _a.type) ? this.$route.query.type : this.submissionType;
        await api$1.downloadSubmissions(
          this.affiliateId,
          this.formId,
          submissionType,
          this.fName,
          this.lName,
          this.onDownloadProgress,
          self2
        ).then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          let filename = "download.csv";
          const disposition = response.headers["content-disposition"];
          if (disposition && disposition.indexOf("attachment") !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches2 = filenameRegex.exec(disposition);
            if (matches2 != null && matches2[1]) {
              filename = matches2[1].replace(/['"]/g, "");
            }
          }
          fileLink.setAttribute("download", filename);
          document.body.appendChild(fileLink);
          fileLink.click();
          fileLink.remove();
        }).catch((err) => {
          this.downloadingCancelToken = null;
          this.downloading = false;
          throw new Error(err);
        }).finally(() => {
          this.downloadingCancelToken = null;
          this.downloading = false;
          this.downloadSize = "calculating";
          this.downloadRecordCount = 0;
          this.downloadRecordTotal = 0;
          this.downloadPercent = 0;
        });
      } catch (error) {
        console.log("Error fetching submissions: ", error);
      }
      this.loading = false;
    },
    performSearch() {
      if (this.fName !== "" || this.lName !== "") {
        this.getSubmissions();
      }
    },
    onDownloadProgress(event) {
      this.downloadRecordTotal = parseInt(event.target.getResponseHeader("Content-Record-Count"), 10);
      this.downloadRecordChunk = parseInt(event.target.getResponseHeader("Content-Record-Chunk"), 10);
      this.downloadSize = event.loaded;
      this.downloadRecordCount += this.downloadRecordChunk;
      if (this.downloadRecordCount >= this.downloadRecordTotal) {
        this.downloadRecordCount = this.downloadRecordTotal;
        this.downloadPercent = 100;
      } else {
        this.downloadPercent = Math.round(this.downloadRecordCount * 100 / this.downloadRecordTotal);
      }
    },
    downloadList() {
      if (this.formId !== "") {
        this.downloadSubmissions();
      }
    },
    clearSearch() {
      this.fName = null;
      this.lName = null;
      this.getSubmissions();
    },
    download(id) {
      this.loading = true;
      api$1.submissionDownload(id).finally(() => {
        this.loading = false;
      });
    },
    openDialog(id) {
      this.dialogConfirm = true;
      this.id = id;
    },
    resendEmail() {
      this.loading = true;
      this.dialogConfirm = false;
      api$1.resendEmail(this.id).then(() => {
        this.message = "Email sent successfully";
        this.dialog = true;
      }).catch(() => {
        this.message = "Something went wrong, please contact support team";
        this.dialog = true;
      }).finally(() => {
        this.loading = false;
      });
    },
    clickNewRecord(item) {
      const {
        id,
        form_submission_data: {
          firstName: {
            data_value: fName
          },
          lastName: {
            data_value: lName
          },
          middleName: {
            data_value: middle
          },
          preferredName: {
            data_value: preferred
          }
        }
      } = item;
      const mName = !middle ? fName : middle;
      const pName = !preferred ? lName : preferred;
      const { origin } = window.location;
      const url = `${origin}/individuals/new/${fName}/${lName}/${mName}/${pName}/?submissionId=${id}`;
      window.open(url, "_blank");
    },
    downloadCancel() {
      if (this.downloadingCancelToken) {
        this.downloadingCancelToken.cancel();
        this.downloadingCancelToken = null;
      }
      this.loading = false;
      this.downloading = false;
    }
  }
};
const _hoisted_1$2 = { class: "submissionTitle" };
const _hoisted_2$2 = { class: "col-md" };
const _hoisted_3$2 = { class: "col-md" };
const _hoisted_4$2 = { class: "downloadButton" };
const _hoisted_5$2 = { class: "mb-0" };
const _hoisted_6$1 = {
  key: 0,
  class: "mb-0 small"
};
const _hoisted_7$1 = ["onClick"];
const _hoisted_8$1 = ["onClick"];
const _hoisted_9$1 = ["href"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormSearchSelector = resolveComponent("FormSearchSelector");
  const _component_FormSubmissionPreview = resolveComponent("FormSubmissionPreview");
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createBaseVNode(
                "h2",
                _hoisted_1$2,
                toDisplayString(_ctx.$route && _ctx.$route.query && _ctx.$route.query.type !== void 0 ? _ctx.$route.query.type + " Submissions" : _ctx.submissionType + " Submissions"),
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
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(_component_FormSearchSelector, {
                ref: "formSelector",
                modelValue: _ctx.formId,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.formId = $event),
                label: "Select a Form Name",
                "item-value": "id",
                "search-type": "form",
                "search-args": { affiliateId: _ctx.affiliateId, sortBy: "system_name" },
                "item-title": "system_name",
                outlined: "",
                clearable: ""
              }, null, 8, ["modelValue", "search-args"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(_component_FormSearchSelector, {
                ref: "formTitleSelector",
                modelValue: _ctx.formId,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.formId = $event),
                label: "Select a Form Title",
                "item-value": "id",
                "search-type": "form",
                "search-args": { affiliateId: _ctx.affiliateId, sortBy: "display_name" },
                "item-title": "display_name",
                outlined: "",
                clearable: ""
              }, null, 8, ["modelValue", "search-args"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      !_ctx.$route.query.type ? (openBlock(), createElementBlock(
        Fragment,
        { key: 0 },
        [
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    modelValue: _ctx.submissionType,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.submissionType = $event),
                    items: _ctx.submissionsList,
                    label: "Submission Type",
                    variant: "outlined",
                    clearable: false,
                    "item-value": "typeValue",
                    "item-title": "typeText"
                  }, null, 8, ["modelValue", "items"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          !_ctx.$route.query.type ? (openBlock(), createBlock(VRow, { key: 0 }, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2$2, [
                    createVNode(VTextField, {
                      modelValue: _ctx.fName,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.fName = $event),
                      label: "First Name",
                      variant: "underlined"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$2, [
                    createVNode(VTextField, {
                      modelValue: _ctx.lName,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.lName = $event),
                      label: "Last Name",
                      variant: "underlined"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VCol, { class: "continueButton d-flex align-center" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "#0A2A5C",
                    class: "submit-button",
                    onClick: _cache[5] || (_cache[5] = ($event) => $options.performSearch())
                  }, {
                    default: withCtx(() => _cache[14] || (_cache[14] = [
                      createTextVNode(" Search ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    class: "btn-default",
                    onClick: _cache[6] || (_cache[6] = ($event) => $options.clearSearch())
                  }, {
                    default: withCtx(() => _cache[15] || (_cache[15] = [
                      createTextVNode(" Clear ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createBaseVNode("div", _hoisted_4$2, [
                    _ctx.formId > 0 ? (openBlock(), createBlock(VBtn, {
                      key: 0,
                      class: "downloadBtn",
                      onClick: _cache[7] || (_cache[7] = ($event) => $options.downloadList()),
                      icon: "mdi:mdi-cloud-download"
                    })) : createCommentVNode("v-if", true),
                    !_ctx.formId ? (openBlock(), createBlock(VTooltip, {
                      key: 1,
                      location: "top"
                    }, {
                      activator: withCtx(({ props }) => [
                        createBaseVNode(
                          "div",
                          mergeProps({ class: "disable-download-btn" }, props),
                          [
                            createVNode(VBtn, {
                              disabled: "",
                              icon: "mdi:mdi-cloud-download"
                            })
                          ],
                          16
                          /* FULL_PROPS */
                        )
                      ]),
                      default: withCtx(() => [
                        _cache[16] || (_cache[16] = createBaseVNode(
                          "span",
                          null,
                          "Choose a Form to Download",
                          -1
                          /* HOISTED */
                        ))
                      ]),
                      _: 1
                      /* STABLE */
                    })) : createCommentVNode("v-if", true)
                  ]),
                  createVNode(VDialog, {
                    modelValue: _ctx.downloading,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.downloading = $event),
                    persistent: "",
                    "max-width": "320"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-h5" }, {
                            default: withCtx(() => _cache[17] || (_cache[17] = [
                              createTextVNode(" Downloading... ")
                            ])),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(VCardText, { class: "pb-0" }, {
                            default: withCtx(() => [
                              createVNode(VProgressLinear, {
                                indeterminate: _ctx.downloadRecordTotal == 0,
                                "model-value": _ctx.downloadRecordCount * 100 / _ctx.downloadRecordTotal
                              }, null, 8, ["indeterminate", "model-value"]),
                              createBaseVNode(
                                "p",
                                _hoisted_5$2,
                                toDisplayString(_ctx.downloadPercent) + "% : " + toDisplayString(_ctx.downloadRecordCount) + " of " + toDisplayString(_ctx.downloadRecordTotal) + " records received... ",
                                1
                                /* TEXT */
                              ),
                              _ctx.downloadSize > 0 ? (openBlock(), createElementBlock(
                                "p",
                                _hoisted_6$1,
                                toDisplayString(_ctx.downloadSize) + " bytes received... ",
                                1
                                /* TEXT */
                              )) : createCommentVNode("v-if", true)
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                onClick: _cache[8] || (_cache[8] = ($event) => $options.downloadCancel())
                              }, {
                                default: withCtx(() => _cache[18] || (_cache[18] = [
                                  createTextVNode(" Cancel ")
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
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      )) : createCommentVNode("v-if", true),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VDataTable, {
                headers: _ctx.headers,
                items: _ctx.submissions,
                class: "v-outlined"
              }, {
                [`item.CreatedAt`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "span",
                    null,
                    toDisplayString($options.displayDate(item.CreatedAt)),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.form_submission_data`]: withCtx(({ item }) => [
                  createVNode(_component_FormSubmissionPreview, {
                    submission: {
                      firstName: { data_value: item.firstName },
                      middleName: { data_value: item.middleName ? item.middleName : "" },
                      lastName: { data_value: item.lastName }
                    },
                    "individual-data": {
                      IndividualId: item.IndividualId,
                      submission_status_id: item.submission_status_id
                    }
                  }, null, 8, ["submission", "individual-data"])
                ]),
                "item.download": withCtx(({ item }) => [
                  createBaseVNode("a", {
                    onClick: ($event) => $options.download(item.id)
                  }, [
                    createVNode(VImg, {
                      "max-height": "32",
                      "max-width": "32",
                      src: "/vendor/memberforms/images/PDF_32.png"
                    })
                  ], 8, _hoisted_7$1)
                ]),
                "item.resendEmail": withCtx(({ item }) => [
                  createBaseVNode("a", {
                    onClick: ($event) => $options.openDialog(item.id)
                  }, [
                    createVNode(VImg, {
                      "max-height": "32",
                      "max-width": "32",
                      src: "/vendor/memberforms/images/mail.png"
                    })
                  ], 8, _hoisted_8$1)
                ]),
                "item.createNew": withCtx(({ item }) => [
                  createBaseVNode("a", {
                    href: "/app/memberforms/admin/view-submission/" + item.id
                  }, " View Submission ", 8, _hoisted_9$1)
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["headers", "items"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VDialog, {
        modelValue: _ctx.dialogConfirm,
        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.dialogConfirm = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[19] || (_cache[19] = [
                  createTextVNode(" Are you sure ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[20] || (_cache[20] = [
                  createTextVNode("Do you want to resend email?")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    color: "red-darken-1",
                    variant: "text",
                    onClick: _cache[10] || (_cache[10] = ($event) => _ctx.dialogConfirm = false)
                  }, {
                    default: withCtx(() => _cache[21] || (_cache[21] = [
                      createTextVNode(" Cancel ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: $options.resendEmail
                  }, {
                    default: withCtx(() => [
                      _cache[22] || (_cache[22] = createTextVNode(" Send ")),
                      createVNode(VImg, {
                        "max-height": "32",
                        "max-width": "32",
                        src: "/vendor/memberforms/images/mail.png"
                      })
                    ]),
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
      createVNode(VDialog, {
        modelValue: _ctx.dialog,
        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.dialog = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(_ctx.message),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: _cache[12] || (_cache[12] = ($event) => _ctx.dialog = false)
                  }, {
                    default: withCtx(() => _cache[23] || (_cache[23] = [
                      createTextVNode(" Dismiss ")
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
      }, 8, ["modelValue"]),
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const PageSubmissionList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageSubmissionList.vue"]]);
const _sfc_main$1 = {
  name: "PageViewSubmission",
  components: { FormSearchSelector: FormSearchSelector$1 },
  data: () => ({
    loading: false,
    affiliateId: null,
    submissionId: null,
    submissionData: [],
    submittedBy: null,
    submittedOn: null,
    formSubmission: {},
    filters: [
      { name: "firstName", value: "" },
      { name: "lastName", value: "" },
      { name: "email", value: "" },
      { name: "preferredName", value: "" },
      { name: "middleName", value: "" },
      { name: "memberId", value: "" },
      { name: "filterAffiliateId", value: null },
      { name: "employeeId", value: "" }
    ],
    filterId: {
      firstName: 0,
      lastName: 1,
      email: 2,
      preferredName: 3,
      middleName: 4,
      memberId: 5,
      filterAffiliateId: 6,
      employeeId: 7
    },
    totalIndividuals: 0,
    individuals: [],
    searched: false,
    options: {
      sortBy: [{ key: "IndividualId", order: "asc" }],
      page: 1,
      itemsPerPage: 10
    },
    headers: [],
    form_template_id: null,
    dialogDeleteSubmission: false,
    phoneNumberData: "",
    copeDialog: false,
    individualId: null,
    selectedAffiliateId: null
  }),
  watch: {
    options: {
      handler() {
        if (this.filters.length > 0 && this.searched) {
          this.getDataFromApi();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.selectedAffiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
    this.filters.find((filter) => filter.name === "filterAffiliateId").value = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
    console.log({ filters: this.filters, filterAffiliate: this.filters.find((filter) => filter.name === "filterAffiliateId"), selectedAffiliate: this.$store.getters["/user/selectedAffiliate"] });
  },
  computed: {
    isCopeForm() {
      return this.form_template_id && ["3", "6", "8"].includes(this.form_template_id);
    }
  },
  mounted() {
    this.submissionId = this.$route.params.id;
    this.getSubmissionDetails();
    this.updatePhoneFormat();
    this.headers = [
      {
        title: "First Name",
        value: "FirstName",
        visible: true,
        sortable: false
      },
      {
        title: "Middle Name",
        value: "MiddleName",
        visible: true,
        sortable: false
      },
      {
        title: "Last Name",
        value: "LastName",
        visible: true,
        sortable: false
      },
      {
        title: "Preferred Name",
        value: "PreferredName",
        visible: true,
        sortable: false
      },
      {
        title: "Union Relationships",
        value: "UnionRelationshipType",
        visible: true,
        sortable: false
      },
      {
        title: "Affiliate Number",
        value: "AffiliateNumber",
        visible: true,
        sortable: false
      },
      {
        title: "Email",
        value: "individualEmails",
        visible: true,
        sortable: false
      },
      {
        title: "Member Id",
        value: "individualMembers",
        visible: true,
        sortable: false
      },
      {
        title: "Employee Id",
        value: "activeIndividualEmployers",
        visible: true,
        sortable: false
      },
      {
        title: "Action",
        value: "update",
        visible: true,
        sortable: false
      }
    ];
  },
  methods: {
    updateDialog(value) {
      this.dialogDeleteSubmission = value;
    },
    openCopeDialog(individualId) {
      this.copeDialog = true;
      this.individualId = individualId;
    },
    proceedCope() {
      this.copeDialog = false;
      this.loading = true;
      api$1.proceedCope(this.submissionId, this.individualId, 3, this.affiliateId).then(() => {
        this.loading = true;
        api$1.eduesEnrollment(this.submissionId, this.individualId, this.affiliateId, "Online Membership Form").then(() => {
          const { origin } = window.location;
          const url = `${origin}/edues`;
          window.location.href = url;
        }).finally(() => {
          this.loading = false;
          this.searched = true;
        });
      }).finally(() => {
        this.loading = false;
        this.searched = true;
      });
    },
    checkActive(item) {
      const { length } = item.activeIndividualAffiliates.length;
      const { lastLength } = item.lastDeactivatedIndividualAffiliate.length;
      return length === 0 && lastLength > 0;
    },
    checkParentAffiliate(item) {
      const parentAffiliate = this.formSubmission && this.formSubmission.Form && this.formSubmission.Form.affiliate_id ? this.formSubmission && this.formSubmission.Form && this.formSubmission.Form.affiliate_id : null;
      const formTemplateId = this.formSubmission && this.formSubmission.Form && this.formSubmission.Form.form_template_id ? this.formSubmission && this.formSubmission.Form && this.formSubmission.Form.form_template_id : null;
      let returnValue = false;
      if (formTemplateId === 8) {
        returnValue = true;
      } else if (item.activeIndividualAffiliates.length > 0 && parentAffiliate) {
        item.activeIndividualAffiliates.forEach((aff) => {
          returnValue = aff.Affiliate.AffiliateId === parentAffiliate;
        });
      }
      return returnValue;
    },
    triggerSearch() {
      this.$nextTick(() => {
        const { searchButton } = this.$refs;
        if (searchButton) {
          searchButton.$el.click();
        }
      });
    },
    getSubmissionDetails() {
      if (!this.submissionId) {
        return;
      }
      this.loading = true;
      api$1.submissionDetails(this.submissionId).then((response) => {
        this.submissionData = response.data.submissionData;
        this.submittedBy = response.data.submittedBy;
        this.submittedOn = format(response.data.submittedOn, "MMMM do yyyy");
        this.formSubmission = response.data.formSubmission;
        this.form_template_id = response.data.formSubmission.Form.form_template_id;
        this.affiliateId = response.data.formSubmission.Form.affiliate_id;
        const names = this.submittedBy.split(" ");
        if (names) {
          const firstName = names[0];
          const lastName = names[names.length - 1];
          this.filters = this.filters.map((filter) => {
            if (filter.name === "firstName") {
              return { ...filter, value: firstName };
            }
            if (filter.name === "lastName") {
              return { ...filter, value: lastName };
            }
            return filter;
          });
          this.triggerSearch();
        }
        console.log(this.submissionData);
      }).finally(() => {
        this.loading = false;
      });
    },
    updatePhoneFormat() {
      if (!this.submissionId) {
        return;
      }
      this.loading = true;
      api$1.submissionDetails(this.submissionId).then((response) => {
        this.submissionData = response.data.submissionData;
        const pClassArray = document.querySelectorAll(".phoneDataFormat");
        pClassArray.forEach((value) => {
          const pText = value;
          const childEl = pText.innerText;
          const xNum = childEl.toString().replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          this.childEl = !xNum[2] ? xNum[1] : `(${xNum[1]}) ${xNum[2]}-${xNum[3]}`;
          pText.innerText = this.childEl;
        });
      }).finally(() => {
        this.loading = false;
      });
    },
    clickNewRecord() {
      const { id } = this.formSubmission;
      const { origin } = window.location;
      const url = `${origin}/individuals/new/?submissionId=${id}`;
      window.location.href = url;
    },
    compareIndividual(individualId) {
      const { id } = this.formSubmission;
      const { origin } = window.location;
      const url = `${origin}/compare-individual/${individualId}/?submissionId=${id}`;
      window.location.href = url;
    },
    viewIndividual(id) {
      const { origin } = window.location;
      const url = `${origin}/individuals/${id}`;
      window.open(url, "_blank");
    },
    markAsCope() {
      if (!this.submissionId) {
        return;
      }
      this.loading = true;
      api$1.markSubmissionAsCope(this.submissionId).then(() => {
        const { origin } = window.location;
        const url = `${origin}/app/memberforms/admin/list?type=new`;
        window.location.href = url;
      }).finally(() => {
        this.loading = false;
      });
    },
    markAsNotAMember() {
      if (!this.submissionId) {
        return;
      }
      this.loading = true;
      api$1.markSubmissionAsNotAMember(this.submissionId).then(() => {
        const { origin } = window.location;
        const url = `${origin}/app/memberforms/admin/list?type=new`;
        window.location.href = url;
      }).finally(() => {
        this.loading = false;
      });
    },
    markAsNew() {
      if (!this.submissionId) {
        return;
      }
      this.loading = true;
      api$1.markSubmissionAsNew(this.submissionId).then(() => {
        const { origin } = window.location;
        const url = `${origin}/app/memberforms/admin/list?type=new`;
        window.location.href = url;
      }).finally(() => {
        this.loading = false;
      });
    },
    markAsDuplicate() {
      if (!this.submissionId) {
        return;
      }
      this.loading = true;
      api$1.markSubmissionAsDuplicate(this.submissionId).then(() => {
        const { origin } = window.location;
        const url = `${origin}/app/memberforms/admin/list?type=new`;
        window.location.href = url;
      }).finally(() => {
        this.loading = false;
      });
    },
    existingIndividual(individualId) {
      if (parseInt(this.form_template_id, 10) === 8) {
        this.openCopeDialog(individualId);
      } else {
        this.compareIndividual(individualId);
      }
    },
    updateIndividualId(individualId) {
      this.loading = true;
      console.log(individualId);
      api$1.updateIndividualId(this.submissionId, individualId, 3).then(() => {
        this.compareIndividual(individualId);
      }).finally(() => {
        this.loading = false;
        this.searched = true;
      });
    },
    // restoreSubmission() {
    //     this.loading = true;
    //     api.updateIndividualId(this.submissionId, null, 1)
    //         .then(() => {
    //             const { origin } = window.location;
    //             const url = `${origin}/app/memberforms/admin/list?type=new`;
    //             window.location.href = url;
    //         })
    //         .finally(() => {
    //             this.loading = false;
    //             this.searched = true;
    //         });
    // },
    getDataFromApi() {
      this.loading = true;
      const { sortBy, page, itemsPerPage } = this.options;
      const sortDefault = sortBy[0] ?? { key: "IndividualId", order: "asc" };
      let sortByField = sortDefault.key ?? "IndividualId";
      const sortDirection = sortDefault.order === "asc" ? "" : "-";
      if (sortBy[0] === "FullName") {
        sortByField = `LastName,FirstName`;
      }
      let url = "/api/v2/aggregate/individual/search";
      const affiliate = this.formSubmission && this.formSubmission.Form && this.formSubmission.Form.affiliate_id ? this.formSubmission && this.formSubmission.Form && this.formSubmission.Form.affiliate_id : null;
      if (affiliate === null) {
        return;
      }
      url += `?page=${page}&per_page=${itemsPerPage}&sort=${sortDirection}${sortByField}`;
      url += `&parentAffiliateId=${affiliate}`;
      let filterUrl = "";
      this.filters.map((filter) => {
        if (filter.value !== "") {
          filterUrl += `&${filter.name}=${filter.value}`;
        }
        return filter;
      });
      if (filterUrl !== "") {
        url += filterUrl;
      }
      api$1.individualList(url).then((response) => {
        this.individuals = response.data.data;
        this.totalIndividuals = response.data.meta.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    firstEmail(emails) {
      return emails.slice(0, 1);
    },
    firstMemberId(memberIds) {
      return memberIds.slice(0, 1);
    },
    deleteFormSubmission(formSubmissionId) {
      api$1.submissionDelete(formSubmissionId).then((response) => {
        if (response.data[0] === "success") {
          this.dialogDeleteSubmission = false;
        }
      }).finally(() => {
        this.$router.push(
          {
            path: "/list?type=new"
          }
        );
      });
    },
    clear() {
      this.filters.map((filter) => {
        filter.value = "";
        return filter;
      });
      this.$refs.filterAffiliateIdRef.reset();
      this.individuals = [];
    }
  }
};
const _hoisted_1$1 = { class: "form-header" };
const _hoisted_2$1 = { key: 0 };
const _hoisted_3$1 = {
  key: 2,
  class: "py-4 form-title"
};
const _hoisted_4$1 = { key: 0 };
const _hoisted_5$1 = { key: 1 };
const _hoisted_6 = { key: 2 };
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = { key: 0 };
const _hoisted_10 = { key: 1 };
const _hoisted_11 = { key: 0 };
const _hoisted_12 = { key: 1 };
const _hoisted_13 = { key: 0 };
const _hoisted_14 = { key: 1 };
const _hoisted_15 = { key: 0 };
const _hoisted_16 = { key: 1 };
const _hoisted_17 = {
  key: 0,
  class: "phoneDataFormat"
};
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { key: 0 };
const _hoisted_20 = { key: 1 };
const _hoisted_21 = { key: 0 };
const _hoisted_22 = { key: 1 };
const _hoisted_23 = { key: 0 };
const _hoisted_24 = { key: 1 };
const _hoisted_25 = { class: "mb-5" };
const _hoisted_26 = { class: "mb-5" };
const _hoisted_27 = { class: "mb-5" };
const _hoisted_28 = { class: "mb-5" };
const _hoisted_29 = { key: 0 };
const _hoisted_30 = { key: 1 };
const _hoisted_31 = {
  align: "right",
  class: "mr-6 pt-6"
};
const _hoisted_32 = {
  key: 0,
  class: "text-center"
};
const _hoisted_33 = { key: 0 };
const _hoisted_34 = {
  key: 1,
  class: "text-center"
};
const _hoisted_35 = { key: 0 };
const _hoisted_36 = ["onClick"];
const _hoisted_37 = ["onClick"];
const _hoisted_38 = ["onClick"];
const _hoisted_39 = { key: 0 };
const _hoisted_40 = { key: 0 };
const _hoisted_41 = {
  key: 0,
  class: "text-center"
};
const _hoisted_42 = { key: 1 };
const _hoisted_43 = { key: 2 };
const _hoisted_44 = {
  key: 1,
  class: "text-center"
};
const _hoisted_45 = { key: 1 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormSearchSelector = resolveComponent("FormSearchSelector");
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$1, [
                _ctx.formSubmission.Form && _ctx.formSubmission.Form.show_aft_logo == false && _ctx.formSubmission.Form.show_local_logo == false && _ctx.formSubmission.Form.show_fed_logo == false ? (openBlock(), createElementBlock("div", _hoisted_2$1)) : (openBlock(), createBlock(VCardTitle, {
                  key: 1,
                  class: "d-flex justify-space-between",
                  flat: "",
                  tile: ""
                }, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        _ctx.formSubmission.Form && _ctx.formSubmission.Form.show_aft_logo == "1" ? (openBlock(), createBlock(VImg, {
                          key: 0,
                          class: "first-logo",
                          "max-width": "120",
                          "max-height": "48",
                          cover: "",
                          src: "/vendor/memberforms/images/aft-small.png"
                        })) : _ctx.formSubmission.Form && (_ctx.formSubmission.Form.show_aft_logo == false && _ctx.formSubmission.Form.show_fed_logo == true && _ctx.formSubmission.Form.show_local_logo == false || _ctx.formSubmission.Form.show_aft_logo == false && _ctx.formSubmission.Form.show_fed_logo == false && _ctx.formSubmission.Form.show_local_logo == true) ? (openBlock(), createBlock(VImg, {
                          key: 1,
                          class: "first-logo",
                          "max-width": "120",
                          "max-height": "48",
                          cover: ""
                        })) : _ctx.formSubmission.Form && _ctx.formSubmission.Form.show_aft_logo == false && _ctx.formSubmission.Form.show_fed_logo == true ? (openBlock(), createBlock(VImg, {
                          key: 2,
                          class: "first-logo",
                          "max-width": "120",
                          "max-height": "48",
                          cover: "",
                          src: _ctx.formSubmission.Form.fed_logo_url && _ctx.formSubmission.Form.fed_logo_url
                        }, null, 8, ["src"])) : createCommentVNode("v-if", true)
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "4",
                      class: "d-flex justify-center"
                    }, {
                      default: withCtx(() => [
                        _ctx.formSubmission.Form && _ctx.formSubmission.Form.show_fed_logo && _ctx.formSubmission.Form.show_aft_logo == true && _ctx.formSubmission.Form.show_local_logo == true ? (openBlock(), createBlock(VImg, {
                          key: 0,
                          class: "second-logo",
                          "max-width": "120",
                          "max-height": "48",
                          cover: "",
                          src: _ctx.formSubmission.Form.fed_logo_url && _ctx.formSubmission.Form.fed_logo_url
                        }, null, 8, ["src"])) : createCommentVNode("v-if", true)
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        _ctx.formSubmission.Form && _ctx.formSubmission.Form.show_local_logo && _ctx.formSubmission.Form.show_local_logo == true ? (openBlock(), createBlock(VImg, {
                          key: 0,
                          class: "third-logo",
                          "max-width": "120",
                          "max-height": "48",
                          cover: "",
                          src: _ctx.formSubmission.Form.local_logo_url && _ctx.formSubmission.Form.local_logo_url
                        }, null, 8, ["src"])) : _ctx.formSubmission.Form && _ctx.formSubmission.Form.show_local_logo == false && _ctx.formSubmission.Form.show_fed_logo == true ? (openBlock(), createBlock(VImg, {
                          key: 1,
                          class: "third-logo",
                          "max-width": "120",
                          "max-height": "48",
                          cover: "",
                          src: _ctx.formSubmission.Form.fed_logo_url && _ctx.formSubmission.Form.fed_logo_url
                        }, null, 8, ["src"])) : createCommentVNode("v-if", true)
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })),
                _ctx.formSubmission.Form ? (openBlock(), createElementBlock(
                  "h3",
                  _hoisted_3$1,
                  toDisplayString(_ctx.formSubmission.Form.display_name),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true)
              ]),
              createCommentVNode(" <v-divider /> ")
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
            default: withCtx(() => _cache[24] || (_cache[24] = [
              createBaseVNode(
                "h2",
                null,
                "Submission Details",
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, { class: "submission-cols pa-6" }, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.submissionData, (item, index2) => {
                  return openBlock(), createElementBlock("p", {
                    key: index2,
                    class: "mb-5"
                  }, [
                    item.data_name != "legal" && item.data_name != "signature" && item.data_name != "copeLegal" && item.data_name != "copeSignature" && item.data_name != "signatureOther" ? (openBlock(), createBlock(
                      VRow,
                      { key: 0 },
                      {
                        default: withCtx(() => [
                          item.data_type !== "markup" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 0,
                              cols: "12",
                              sm: "2",
                              class: "col-one pa-3"
                            },
                            {
                              default: withCtx(() => [
                                item.data_label === "Token" ? (openBlock(), createElementBlock("span", _hoisted_4$1, " Payment Information: ")) : item.data_name !== "agree" ? (openBlock(), createElementBlock(
                                  "span",
                                  _hoisted_5$1,
                                  toDisplayString(item.data_label),
                                  1
                                  /* TEXT */
                                )) : (openBlock(), createElementBlock("span", _hoisted_6, " Opt for text "))
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : createCommentVNode("v-if", true),
                          item.data_type == "drawing" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 1,
                              cols: "11",
                              class: "ml-6 pa-2"
                            },
                            {
                              default: withCtx(() => [
                                createBaseVNode("span", null, [
                                  createVNode(VImg, {
                                    style: { "max-width": "100%" },
                                    src: item.data_value
                                  }, null, 8, ["src"])
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "textarea" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 2,
                              cols: "11"
                            },
                            {
                              default: withCtx(() => [
                                createCommentVNode(" eslint-disable vue/no-v-html "),
                                createBaseVNode("blockquote", {
                                  class: "blockquote pl-6 pt-0",
                                  innerHTML: item.data_value
                                }, null, 8, _hoisted_7),
                                createCommentVNode("eslint-enable")
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "markup" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 3,
                              cols: "11"
                            },
                            {
                              default: withCtx(() => [
                                createCommentVNode(" eslint-disable vue/no-v-html "),
                                createBaseVNode("blockquote", {
                                  class: "blockquote pl-6 pt-0",
                                  innerHTML: item.data_value
                                }, null, 8, _hoisted_8),
                                createCommentVNode("eslint-enable")
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "checkbox" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 4,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                item.data_value ? (openBlock(), createElementBlock("span", _hoisted_9, " Yes ")) : (openBlock(), createElementBlock("span", _hoisted_10, " No "))
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "workLocation" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 5,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(item.data_value, (workLocation, index22) => {
                                    return openBlock(), createElementBlock("p", {
                                      key: index22,
                                      class: "mb-5"
                                    }, [
                                      createVNode(
                                        VRow,
                                        null,
                                        {
                                          default: withCtx(() => [
                                            createVNode(
                                              VCol,
                                              {
                                                cols: "12",
                                                sm: "2",
                                                class: "col-one pa-3"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  createBaseVNode(
                                                    "span",
                                                    null,
                                                    toDisplayString(workLocation.data_label) + ":",
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
                                              VCol,
                                              {
                                                cols: "12",
                                                sm: "9",
                                                class: "pa-3 col-two"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  createBaseVNode(
                                                    "span",
                                                    null,
                                                    toDisplayString(workLocation.data_value),
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
                                        },
                                        1024
                                        /* DYNAMIC_SLOTS */
                                      )
                                    ]);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "workStructure" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 6,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(item.data_value, (workStructure, index3) => {
                                    return openBlock(), createElementBlock("p", {
                                      key: index3,
                                      class: "mb-5"
                                    }, [
                                      createVNode(
                                        VRow,
                                        null,
                                        {
                                          default: withCtx(() => [
                                            createVNode(
                                              VCol,
                                              {
                                                cols: "12",
                                                sm: "2",
                                                class: "col-one pa-3"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  createBaseVNode(
                                                    "span",
                                                    null,
                                                    toDisplayString(workStructure.data_label) + ":",
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
                                              VCol,
                                              {
                                                cols: "12",
                                                sm: "9",
                                                class: "pa-3 col-two"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  createBaseVNode(
                                                    "span",
                                                    null,
                                                    toDisplayString(workStructure.data_value),
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
                                        },
                                        1024
                                        /* DYNAMIC_SLOTS */
                                      )
                                    ]);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "phone" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 7,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(item.data_value, (phones, index3) => {
                                    return openBlock(), createElementBlock("p", {
                                      key: index3,
                                      class: "mb-5"
                                    }, [
                                      createVNode(
                                        VRow,
                                        null,
                                        {
                                          default: withCtx(() => [
                                            createVNode(
                                              VCol,
                                              {
                                                cols: "12",
                                                sm: "9",
                                                class: "pa-3 col-two"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  (openBlock(true), createElementBlock(
                                                    Fragment,
                                                    null,
                                                    renderList(phones.data_value, (phone, index4) => {
                                                      return openBlock(), createElementBlock("p", {
                                                        key: index4,
                                                        class: "mb-5"
                                                      }, [
                                                        createVNode(
                                                          VRow,
                                                          null,
                                                          {
                                                            default: withCtx(() => [
                                                              createVNode(
                                                                VCol,
                                                                {
                                                                  cols: "12",
                                                                  sm: "4",
                                                                  class: "col-one pa-3 text-right"
                                                                },
                                                                {
                                                                  default: withCtx(() => [
                                                                    phone.data_name !== "agree" ? (openBlock(), createElementBlock(
                                                                      "span",
                                                                      _hoisted_11,
                                                                      toDisplayString(phone.data_label) + ": ",
                                                                      1
                                                                      /* TEXT */
                                                                    )) : (openBlock(), createElementBlock("span", _hoisted_12, " Opt for text: "))
                                                                  ]),
                                                                  _: 2
                                                                  /* DYNAMIC */
                                                                },
                                                                1024
                                                                /* DYNAMIC_SLOTS */
                                                              ),
                                                              phone.data_type === "checkbox" ? (openBlock(), createBlock(
                                                                VCol,
                                                                {
                                                                  key: 0,
                                                                  cols: "12",
                                                                  sm: "8",
                                                                  class: "pa-3 col-two"
                                                                },
                                                                {
                                                                  default: withCtx(() => [
                                                                    phone.data_value ? (openBlock(), createElementBlock("span", _hoisted_13, " Yes ")) : (openBlock(), createElementBlock("span", _hoisted_14, " No "))
                                                                  ]),
                                                                  _: 2
                                                                  /* DYNAMIC */
                                                                },
                                                                1024
                                                                /* DYNAMIC_SLOTS */
                                                              )) : phone.data_type === "checktext" ? (openBlock(), createBlock(
                                                                VCol,
                                                                {
                                                                  key: 1,
                                                                  cols: "12",
                                                                  sm: "8",
                                                                  class: "pa-3 col-two"
                                                                },
                                                                {
                                                                  default: withCtx(() => [
                                                                    phone.data_value ? (openBlock(), createElementBlock("span", _hoisted_15, " Yes ")) : (openBlock(), createElementBlock("span", _hoisted_16, " No "))
                                                                  ]),
                                                                  _: 2
                                                                  /* DYNAMIC */
                                                                },
                                                                1024
                                                                /* DYNAMIC_SLOTS */
                                                              )) : (openBlock(), createBlock(
                                                                VCol,
                                                                {
                                                                  key: 2,
                                                                  cols: "12",
                                                                  sm: "8",
                                                                  class: "pa-3 col-two"
                                                                },
                                                                {
                                                                  default: withCtx(() => [
                                                                    phone.data_label !== "Ext" && phone.data_label !== "Country" ? (openBlock(), createElementBlock(
                                                                      "span",
                                                                      _hoisted_17,
                                                                      toDisplayString(phone.data_value),
                                                                      1
                                                                      /* TEXT */
                                                                    )) : (openBlock(), createElementBlock(
                                                                      "span",
                                                                      _hoisted_18,
                                                                      toDisplayString(phone.data_value),
                                                                      1
                                                                      /* TEXT */
                                                                    ))
                                                                  ]),
                                                                  _: 2
                                                                  /* DYNAMIC */
                                                                },
                                                                1024
                                                                /* DYNAMIC_SLOTS */
                                                              ))
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
                                    ]);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "email" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 8,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(item.data_value, (emails, emailIndex1) => {
                                    return openBlock(), createElementBlock("p", {
                                      key: emailIndex1,
                                      class: "mb-5"
                                    }, [
                                      createVNode(
                                        VRow,
                                        null,
                                        {
                                          default: withCtx(() => [
                                            createVNode(
                                              VCol,
                                              {
                                                cols: "12",
                                                sm: "9",
                                                class: "pa-3 col-two"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  (openBlock(true), createElementBlock(
                                                    Fragment,
                                                    null,
                                                    renderList(emails.data_value, (email, emailIndex2) => {
                                                      return openBlock(), createElementBlock("p", {
                                                        key: emailIndex2,
                                                        class: "mb-5"
                                                      }, [
                                                        createVNode(
                                                          VRow,
                                                          null,
                                                          {
                                                            default: withCtx(() => [
                                                              createVNode(
                                                                VCol,
                                                                {
                                                                  cols: "12",
                                                                  sm: "4",
                                                                  class: "col-one pa-3 text-right"
                                                                },
                                                                {
                                                                  default: withCtx(() => [
                                                                    createBaseVNode(
                                                                      "span",
                                                                      null,
                                                                      toDisplayString(email.data_label) + ":",
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
                                                              email.data_type === "checkbox" ? (openBlock(), createBlock(
                                                                VCol,
                                                                {
                                                                  key: 0,
                                                                  cols: "12",
                                                                  sm: "8",
                                                                  class: "pa-3 col-two"
                                                                },
                                                                {
                                                                  default: withCtx(() => [
                                                                    email.data_value ? (openBlock(), createElementBlock("span", _hoisted_19, " Yes ")) : (openBlock(), createElementBlock("span", _hoisted_20, " No "))
                                                                  ]),
                                                                  _: 2
                                                                  /* DYNAMIC */
                                                                },
                                                                1024
                                                                /* DYNAMIC_SLOTS */
                                                              )) : (openBlock(), createBlock(
                                                                VCol,
                                                                {
                                                                  key: 1,
                                                                  cols: "12",
                                                                  sm: "8",
                                                                  class: "pa-3 col-two"
                                                                },
                                                                {
                                                                  default: withCtx(() => [
                                                                    createBaseVNode(
                                                                      "span",
                                                                      null,
                                                                      toDisplayString(email.data_value),
                                                                      1
                                                                      /* TEXT */
                                                                    )
                                                                  ]),
                                                                  _: 2
                                                                  /* DYNAMIC */
                                                                },
                                                                1024
                                                                /* DYNAMIC_SLOTS */
                                                              ))
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
                                    ]);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "address" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 9,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(item.data_value, (address, addressIndex) => {
                                    return openBlock(), createElementBlock("p", {
                                      key: addressIndex,
                                      class: "mb-5"
                                    }, [
                                      createVNode(
                                        VRow,
                                        null,
                                        {
                                          default: withCtx(() => [
                                            createVNode(
                                              VCol,
                                              {
                                                cols: "12",
                                                sm: "3",
                                                class: "col-one pa-3"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  address.data_label === "Address Line 2" ? (openBlock(), createElementBlock("span", _hoisted_21, " Suite/Apt: ")) : (openBlock(), createElementBlock(
                                                    "span",
                                                    _hoisted_22,
                                                    toDisplayString(address.data_label) + ": ",
                                                    1
                                                    /* TEXT */
                                                  ))
                                                ]),
                                                _: 2
                                                /* DYNAMIC */
                                              },
                                              1024
                                              /* DYNAMIC_SLOTS */
                                            ),
                                            address.data_type === "checkbox" ? (openBlock(), createBlock(
                                              VCol,
                                              {
                                                key: 0,
                                                cols: "12",
                                                sm: "8",
                                                class: "pa-3 col-two"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  address.data_value ? (openBlock(), createElementBlock("span", _hoisted_23, " Yes ")) : (openBlock(), createElementBlock("span", _hoisted_24, " No "))
                                                ]),
                                                _: 2
                                                /* DYNAMIC */
                                              },
                                              1024
                                              /* DYNAMIC_SLOTS */
                                            )) : (openBlock(), createBlock(
                                              VCol,
                                              {
                                                key: 1,
                                                cols: "12",
                                                sm: "9",
                                                class: "pa-3 col-two"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  createBaseVNode(
                                                    "span",
                                                    null,
                                                    toDisplayString(address.data_value),
                                                    1
                                                    /* TEXT */
                                                  )
                                                ]),
                                                _: 2
                                                /* DYNAMIC */
                                              },
                                              1024
                                              /* DYNAMIC_SLOTS */
                                            ))
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
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "childAffiliate" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 10,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                createBaseVNode("p", _hoisted_25, [
                                  createVNode(
                                    VRow,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        (openBlock(true), createElementBlock(
                                          Fragment,
                                          null,
                                          renderList(item.data_value, (childAffiliate, index4) => {
                                            return openBlock(), createBlock(
                                              VCol,
                                              {
                                                key: index4,
                                                cols: "12",
                                                sm: "5",
                                                class: "pa-3"
                                              },
                                              {
                                                default: withCtx(() => [
                                                  createBaseVNode(
                                                    "span",
                                                    null,
                                                    toDisplayString(childAffiliate.data_value),
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
                                      _: 2
                                      /* DYNAMIC */
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  )
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_type === "payment" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 11,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                createBaseVNode("p", _hoisted_26, [
                                  createVNode(
                                    VRow,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          cols: "12",
                                          sm: "3",
                                          class: "col-one pa-3"
                                        }, {
                                          default: withCtx(() => [..._cache[25] || (_cache[25] = [
                                            createBaseVNode(
                                              "span",
                                              null,
                                              "Payment Method:",
                                              -1
                                              /* HOISTED */
                                            )
                                          ])]),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCol,
                                          {
                                            cols: "12",
                                            sm: "9",
                                            class: "pa-3 col-two"
                                          },
                                          {
                                            default: withCtx(() => [
                                              createBaseVNode(
                                                "span",
                                                null,
                                                toDisplayString(JSON.parse(item.data_value).CardDetails ? "Credit Card" : "Bank Draft"),
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
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  )
                                ]),
                                createBaseVNode("p", _hoisted_27, [
                                  createVNode(
                                    VRow,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          cols: "12",
                                          sm: "3",
                                          class: "col-one pa-3"
                                        }, {
                                          default: withCtx(() => [..._cache[26] || (_cache[26] = [
                                            createBaseVNode(
                                              "span",
                                              null,
                                              "Type:",
                                              -1
                                              /* HOISTED */
                                            )
                                          ])]),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCol,
                                          {
                                            cols: "12",
                                            sm: "9",
                                            class: "pa-3 col-two"
                                          },
                                          {
                                            default: withCtx(() => [
                                              createBaseVNode(
                                                "span",
                                                null,
                                                toDisplayString(JSON.parse(item.data_value).CardDetails ? JSON.parse(item.data_value).CardDetails.CardType : JSON.parse(item.data_value).AchDetails.AccountType),
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
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  )
                                ]),
                                createBaseVNode("p", _hoisted_28, [
                                  createVNode(
                                    VRow,
                                    null,
                                    {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          cols: "12",
                                          sm: "3",
                                          class: "col-one pa-3"
                                        }, {
                                          default: withCtx(() => [..._cache[27] || (_cache[27] = [
                                            createBaseVNode(
                                              "span",
                                              null,
                                              "Account No. Last Four:",
                                              -1
                                              /* HOISTED */
                                            )
                                          ])]),
                                          _: 1
                                          /* STABLE */
                                        }),
                                        createVNode(
                                          VCol,
                                          {
                                            cols: "12",
                                            sm: "9",
                                            class: "pa-3 col-two"
                                          },
                                          {
                                            default: withCtx(() => [
                                              createBaseVNode(
                                                "span",
                                                null,
                                                toDisplayString(JSON.parse(item.data_value).CardDetails ? JSON.parse(item.data_value).CardDetails.Last4 : JSON.parse(item.data_value).AchDetails.AccountNumberLast4),
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
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  )
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : item.data_name === "agree" ? (openBlock(), createBlock(
                            VCol,
                            {
                              key: 12,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(item.data_value === "1" ? "Yes" : "No"),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : (openBlock(), createBlock(
                            VCol,
                            {
                              key: 13,
                              cols: "12",
                              sm: "9",
                              class: "pa-3 col-two"
                            },
                            {
                              default: withCtx(() => [
                                item.data_label === "Dues Amount" ? (openBlock(), createElementBlock(
                                  "span",
                                  _hoisted_29,
                                  toDisplayString(item.data_value),
                                  1
                                  /* TEXT */
                                )) : (openBlock(), createElementBlock(
                                  "span",
                                  _hoisted_30,
                                  toDisplayString(item.data_value),
                                  1
                                  /* TEXT */
                                ))
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          ))
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    )) : createCommentVNode("v-if", true)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              createBaseVNode("p", _hoisted_31, [
                createTextVNode(
                  toDisplayString(_ctx.submittedBy) + " ",
                  1
                  /* TEXT */
                ),
                _cache[28] || (_cache[28] = createBaseVNode(
                  "br",
                  null,
                  null,
                  -1
                  /* HOISTED */
                )),
                createTextVNode(
                  " " + toDisplayString(_ctx.submittedOn),
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      _ctx.filters && !_ctx.formSubmission.IndividualId && _ctx.formSubmission.submission_status_id != 4 ? (openBlock(), createBlock(VRow, { key: 0 }, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                key: "text-first-name",
                modelValue: _ctx.filters[_ctx.filterId["firstName"]].value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filters[_ctx.filterId["firstName"]].value = $event),
                label: "First Name",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                key: "text-middle-name",
                modelValue: _ctx.filters[_ctx.filterId["middleName"]].value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.filters[_ctx.filterId["middleName"]].value = $event),
                label: "Middle Name",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                key: "text-last-name",
                modelValue: _ctx.filters[_ctx.filterId["lastName"]].value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.filters[_ctx.filterId["lastName"]].value = $event),
                label: "Last Name",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                key: "text-preferred-name",
                modelValue: _ctx.filters[_ctx.filterId["preferredName"]].value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.filters[_ctx.filterId["preferredName"]].value = $event),
                label: "Preferred Name",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                key: "text-email",
                modelValue: _ctx.filters[_ctx.filterId["email"]].value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.filters[_ctx.filterId["email"]].value = $event),
                label: "Email",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                key: "text-member-id",
                modelValue: _ctx.filters[_ctx.filterId["memberId"]].value,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.filters[_ctx.filterId["memberId"]].value = $event),
                label: "Member Id",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                key: "text-employee-id",
                modelValue: _ctx.filters[_ctx.filterId["employeeId"]].value,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.filters[_ctx.filterId["employeeId"]].value = $event),
                label: "Employee Id",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(_component_FormSearchSelector, {
                ref: "filterAffiliateIdRef",
                modelValue: _ctx.filters[_ctx.filterId["filterAffiliateId"]].value,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.filters[_ctx.filterId["filterAffiliateId"]].value = $event),
                label: "Affiliate",
                "item-value": "AffiliateId",
                "search-type": "affiliate",
                "item-title": (item) => item.AffiliateNumber + " - " + item.AffiliateName
              }, null, 8, ["modelValue", "item-title"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, { class: "buttons" }, {
            default: withCtx(() => [
              createVNode(
                VBtn,
                {
                  ref: "searchButton",
                  elevation: "0",
                  color: "primary",
                  class: "mb-4 btn-block actionButtons",
                  onClick: _cache[8] || (_cache[8] = ($event) => {
                    $options.getDataFromApi();
                    _ctx.searched = true;
                  })
                },
                {
                  default: withCtx(() => _cache[29] || (_cache[29] = [
                    createTextVNode(" Search ")
                  ])),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              createVNode(VBtn, {
                elevation: "0",
                color: "default",
                class: "mb-4 btn-block actionButtons",
                onClick: _cache[9] || (_cache[9] = ($event) => $options.clear())
              }, {
                default: withCtx(() => _cache[30] || (_cache[30] = [
                  createTextVNode(" Clear ")
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
      })) : createCommentVNode("v-if", true),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { class: "buttons center" }, {
            default: withCtx(() => [
              _ctx.form_template_id == 3 || _ctx.form_template_id == 6 || _ctx.form_template_id == 8 ? (openBlock(), createElementBlock("div", _hoisted_32, [
                _ctx.formSubmission.submission_status_id == 4 ? (openBlock(), createElementBlock("span", _hoisted_33, " Not a Member Added ")) : createCommentVNode("v-if", true),
                !_ctx.formSubmission.IndividualId && _ctx.formSubmission.submission_status_id == 4 ? (openBlock(), createBlock(VBtn, {
                  key: 1,
                  elevation: "0",
                  color: "primary",
                  class: "mb-4 btn-block actionButtons",
                  onClick: _cache[10] || (_cache[10] = ($event) => $options.markAsNew())
                }, {
                  default: withCtx(() => _cache[31] || (_cache[31] = [
                    createTextVNode(" Revert ")
                  ])),
                  _: 1
                  /* STABLE */
                })) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true),
              _ctx.formSubmission.submission_status_id != 4 ? (openBlock(), createElementBlock("div", _hoisted_34, [
                _ctx.formSubmission.submission_status_id == 3 ? (openBlock(), createElementBlock("span", _hoisted_35, " Marked as Existing Record ")) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      !_ctx.formSubmission.IndividualId && _ctx.formSubmission.submission_status_id != 4 ? (openBlock(), createBlock(VRow, { key: 1 }, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VDataTableServer, {
                headers: _ctx.headers,
                items: _ctx.individuals,
                options: _ctx.options,
                "onUpdate:options": _cache[11] || (_cache[11] = ($event) => _ctx.options = $event),
                "items-length": _ctx.totalIndividuals,
                loading: _ctx.loading,
                "mobile-breakpoint": 960,
                class: "elevation-1 mobile-individual-search"
              }, {
                loader: withCtx(() => [
                  createVNode(VProgressLinear, {
                    indeterminate: "",
                    height: "8",
                    color: "#3f98c9"
                  })
                ]),
                [`item.FirstName`]: withCtx(({ item }) => [
                  createBaseVNode("a", {
                    onClick: ($event) => $options.viewIndividual(item.IndividualId)
                  }, toDisplayString(item.FirstName), 9, _hoisted_36)
                ]),
                [`item.MiddleName`]: withCtx(({ item }) => [
                  createBaseVNode("a", {
                    onClick: ($event) => $options.viewIndividual(item.IndividualId)
                  }, toDisplayString(item.MiddleName), 9, _hoisted_37)
                ]),
                [`item.LastName`]: withCtx(({ item }) => [
                  createBaseVNode("a", {
                    onClick: ($event) => $options.viewIndividual(item.IndividualId)
                  }, toDisplayString(item.LastName), 9, _hoisted_38)
                ]),
                [`item.UnionRelationshipType`]: withCtx(({ item }) => [
                  item.activeIndividualAffiliates.length > 0 ? (openBlock(), createBlock(
                    VContainer,
                    { key: 0 },
                    {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(item.activeIndividualAffiliates, (affiliate) => {
                            return openBlock(), createElementBlock(
                              "span",
                              mergeProps({ ref_for: true }, affiliate, {
                                key: affiliate.IndividualAffiliateId
                              }),
                              [
                                affiliate.UnionRelationshipType ? (openBlock(), createElementBlock(
                                  "span",
                                  _hoisted_39,
                                  toDisplayString(affiliate.UnionRelationshipType.UnionRelationshipTypeName),
                                  1
                                  /* TEXT */
                                )) : createCommentVNode("v-if", true)
                              ],
                              16
                              /* FULL_PROPS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )) : $options.checkActive(item) ? (openBlock(), createBlock(
                    VContainer,
                    { key: 1 },
                    {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(item.lastDeactivatedIndividualAffiliate, (affiliate) => {
                            return openBlock(), createElementBlock(
                              "span",
                              mergeProps({ ref_for: true }, affiliate, {
                                key: affiliate.IndividualAffiliateId,
                                class: "greyed-out"
                              }),
                              [
                                affiliate.UnionRelationshipType ? (openBlock(), createElementBlock(
                                  "span",
                                  _hoisted_40,
                                  toDisplayString(affiliate.UnionRelationshipType.UnionRelationshipTypeName),
                                  1
                                  /* TEXT */
                                )) : createCommentVNode("v-if", true)
                              ],
                              16
                              /* FULL_PROPS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )) : (openBlock(), createBlock(VContainer, { key: 2 }, {
                    default: withCtx(() => _cache[32] || (_cache[32] = [
                      createBaseVNode(
                        "span",
                        { class: "greyed-out" },
                        " No relationship ",
                        -1
                        /* HOISTED */
                      )
                    ])),
                    _: 1
                    /* STABLE */
                  }))
                ]),
                [`item.individualEmails`]: withCtx(({ item }) => [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList($options.firstEmail(item.individualEmailsOrdered), (email) => {
                      return openBlock(), createElementBlock(
                        "span",
                        mergeProps({ ref_for: true }, email, {
                          key: email.IndividualEmailId,
                          class: item.activeIndividualAffiliates.length === 0 ? "greyed-out" : ""
                        }),
                        toDisplayString(email.Email),
                        17
                        /* TEXT, FULL_PROPS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                [`item.AffiliateNumber`]: withCtx(({ item }) => [
                  item.activeIndividualAffiliates.length > 0 ? (openBlock(), createBlock(
                    VContainer,
                    { key: 0 },
                    {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(item.activeIndividualAffiliates, (affiliate) => {
                            return openBlock(), createElementBlock(
                              "span",
                              mergeProps({ ref_for: true }, affiliate, {
                                key: affiliate.IndividualAffiliateId + "-id"
                              }),
                              toDisplayString(affiliate.Affiliate.AffiliateNumber),
                              17
                              /* TEXT, FULL_PROPS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )) : createCommentVNode("v-if", true)
                ]),
                [`item.individualMembers`]: withCtx(({ item }) => [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList($options.firstMemberId(item.individualMembers), (memberIds) => {
                      return openBlock(), createElementBlock(
                        "span",
                        mergeProps({ ref_for: true }, memberIds, {
                          key: memberIds.MemberId
                        }),
                        toDisplayString(memberIds.MemberId),
                        17
                        /* TEXT, FULL_PROPS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                [`item.activeIndividualEmployers`]: withCtx(({ item }) => [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(item.activeIndividualEmployers, (employers) => {
                      return openBlock(), createElementBlock(
                        "span",
                        mergeProps({ ref_for: true }, employers, {
                          key: employers.EmployeeId
                        }),
                        toDisplayString(employers.EmployeeId),
                        17
                        /* TEXT, FULL_PROPS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                [`item.update`]: withCtx(({ item }) => [
                  createVNode(
                    VTooltip,
                    null,
                    {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps(props, {
                          disabled: !$options.checkParentAffiliate(item),
                          color: "primary",
                          class: "mb-4 btn-block actionButtons",
                          onClick: ($event) => $options.existingIndividual(item.IndividualId, item.AffiliateId)
                        }), {
                          default: withCtx(() => _cache[33] || (_cache[33] = [
                            createTextVNode(" Compare ")
                          ])),
                          _: 2
                          /* DYNAMIC */
                        }, 1040, ["disabled", "onClick"])
                      ]),
                      default: withCtx(() => [
                        _cache[34] || (_cache[34] = createTextVNode(" Existing Record in Connect "))
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
              }, 1032, ["headers", "items", "options", "items-length", "loading"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { class: "buttons center" }, {
            default: withCtx(() => [
              $options.isCopeForm ? (openBlock(), createElementBlock("div", _hoisted_41, [
                !_ctx.formSubmission.IndividualId && _ctx.formSubmission.submission_status_id != 3 && _ctx.formSubmission.Form.form_template_id != 9 ? (openBlock(), createBlock(VBtn, {
                  key: 0,
                  elevation: "0",
                  color: "primary",
                  class: "mb-4 btn-block actionButtons",
                  disabled: !_ctx.searched,
                  onClick: _cache[12] || (_cache[12] = ($event) => $options.clickNewRecord())
                }, {
                  default: withCtx(() => _cache[35] || (_cache[35] = [
                    createTextVNode(" Create New Record ")
                  ])),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled"])) : createCommentVNode("v-if", true),
                _ctx.formSubmission.IndividualId && _ctx.formSubmission.submission_status_id != 3 ? (openBlock(), createElementBlock("span", _hoisted_42, " Record Created ")) : createCommentVNode("v-if", true),
                _ctx.formSubmission.submission_status_id == 1 ? (openBlock(), createElementBlock("span", _hoisted_43, [
                  createVNode(VDialog, {
                    modelValue: _ctx.dialogDeleteSubmission,
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.dialogDeleteSubmission = $event),
                    persistent: "",
                    color: "error",
                    "max-width": "290"
                  }, {
                    activator: withCtx(({ props }) => [
                      createVNode(
                        VBtn,
                        mergeProps({
                          elevation: "0",
                          color: "error",
                          class: "mb-4 btn-block actionButtons"
                        }, props, {
                          onClick: _cache[13] || (_cache[13] = withModifiers(($event) => $options.updateDialog(true), ["stop"]))
                        }),
                        {
                          default: withCtx(() => _cache[36] || (_cache[36] = [
                            createTextVNode(" Delete Submission ")
                          ])),
                          _: 2
                          /* DYNAMIC */
                        },
                        1040
                        /* FULL_PROPS, DYNAMIC_SLOTS */
                      )
                    ]),
                    default: withCtx(() => [
                      createVNode(VCard, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-h6" }, {
                            default: withCtx(() => _cache[37] || (_cache[37] = [
                              createTextVNode(" Delete Form Submission ")
                            ])),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => _cache[38] || (_cache[38] = [
                              createTextVNode(" Deleted submissions can not be recovered through the Membership Forms Portal. For assistance contact AFT. ")
                            ])),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                color: "green-darken-1",
                                variant: "text",
                                onClick: _cache[14] || (_cache[14] = withModifiers(($event) => $options.updateDialog(false), ["stop"]))
                              }, {
                                default: withCtx(() => _cache[39] || (_cache[39] = [
                                  createTextVNode(" Cancel ")
                                ])),
                                _: 1
                                /* STABLE */
                              }),
                              createVNode(VBtn, {
                                color: "green-darken-1",
                                variant: "text",
                                onClick: _cache[15] || (_cache[15] = ($event) => {
                                  $options.deleteFormSubmission(_ctx.formSubmission.id);
                                })
                              }, {
                                default: withCtx(() => _cache[40] || (_cache[40] = [
                                  createTextVNode(" Delete ")
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
                ])) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true),
              $options.isCopeForm ? (openBlock(), createElementBlock("div", _hoisted_44, [
                _ctx.formSubmission.submission_status_id != 4 && _ctx.formSubmission.submission_status_id != 5 && !_ctx.formSubmission.IndividualId ? (openBlock(), createBlock(VBtn, {
                  key: 0,
                  elevation: "0",
                  color: "primary",
                  class: "mb-4 btn-block actionButtons",
                  onClick: _cache[17] || (_cache[17] = ($event) => $options.markAsNotAMember())
                }, {
                  default: withCtx(() => _cache[41] || (_cache[41] = [
                    createTextVNode(" Not a Member ")
                  ])),
                  _: 1
                  /* STABLE */
                })) : createCommentVNode("v-if", true),
                _ctx.formSubmission.submission_status_id == 1 ? (openBlock(), createElementBlock("span", _hoisted_45, [
                  createVNode(VDialog, {
                    modelValue: _ctx.dialogDeleteSubmission,
                    "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => _ctx.dialogDeleteSubmission = $event),
                    persistent: "",
                    color: "error",
                    "max-width": "290"
                  }, {
                    activator: withCtx(({ props }) => [
                      createVNode(
                        VBtn,
                        mergeProps({
                          elevation: "0",
                          color: "error",
                          class: "mb-4 btn-block actionButtons"
                        }, props, {
                          onClick: _cache[18] || (_cache[18] = withModifiers(($event) => $options.updateDialog(true), ["stop"]))
                        }),
                        {
                          default: withCtx(() => _cache[42] || (_cache[42] = [
                            createTextVNode(" Delete Submission ")
                          ])),
                          _: 2
                          /* DYNAMIC */
                        },
                        1040
                        /* FULL_PROPS, DYNAMIC_SLOTS */
                      )
                    ]),
                    default: withCtx(() => [
                      createVNode(VCard, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-h6" }, {
                            default: withCtx(() => _cache[43] || (_cache[43] = [
                              createTextVNode(" Delete Form Submission ")
                            ])),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => _cache[44] || (_cache[44] = [
                              createTextVNode(" Would you like to delete the form submission? ")
                            ])),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                color: "green-darken-1",
                                variant: "text",
                                onClick: _cache[19] || (_cache[19] = withModifiers(($event) => $options.updateDialog(false), ["stop"]))
                              }, {
                                default: withCtx(() => _cache[45] || (_cache[45] = [
                                  createTextVNode(" Cancel ")
                                ])),
                                _: 1
                                /* STABLE */
                              }),
                              createVNode(VBtn, {
                                color: "green-darken-1",
                                variant: "text",
                                onClick: _cache[20] || (_cache[20] = ($event) => {
                                  $options.deleteFormSubmission(_ctx.formSubmission.id);
                                })
                              }, {
                                default: withCtx(() => _cache[46] || (_cache[46] = [
                                  createTextVNode(" Delete ")
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
                ])) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VDialog, {
        modelValue: _ctx.copeDialog,
        "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => _ctx.copeDialog = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[47] || (_cache[47] = [
                  createTextVNode(" Warning ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[48] || (_cache[48] = [
                  createTextVNode(" You are attempting to process this individual for a recurring COPE only payment, if this is correct, please proceed. ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    color: "red-darken-1",
                    variant: "text",
                    onClick: _cache[22] || (_cache[22] = ($event) => _ctx.copeDialog = false)
                  }, {
                    default: withCtx(() => _cache[49] || (_cache[49] = [
                      createTextVNode(" Cancel ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: $options.proceedCope
                  }, {
                    default: withCtx(() => _cache[50] || (_cache[50] = [
                      createTextVNode(" Proceed ")
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
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const PageViewSubmission = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-5aafaa15"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/PageViewSubmission.vue"]]);
const _sfc_main = {
  name: "PageSubmissionList",
  components: { FormSearchSelector: FormSearchSelector$1 },
  data: () => ({
    loading: false,
    alert: false,
    alertType: "success",
    alertText: "",
    affiliateId: null,
    affiliateName: null,
    affiliateNumber: null,
    formId: null,
    headers: [
      { title: "Form URL", value: "form_id" },
      { title: "Custom URL", value: "custom_url" },
      { title: "Form Name", value: "form.display_name" },
      { title: "QR", value: "qr_code" },
      { title: "Date Created", value: "CreatedAt" },
      { title: "Action", value: "id" }
    ],
    baseUrl: "/",
    customUrl: "",
    customUrlField: {
      label: "Custom URL"
    },
    urlRedirects: [],
    qrCodeDialog: false,
    qrCode: "",
    customFormUrl: ""
  }),
  computed: {
    displayDate(date) {
      return format(date, "MMMM dd, yyyy hh:mm a");
    }
  },
  watch: {
    affiliateId() {
      this.$nextTick(() => {
        localStorage.mfpAffiliateId = JSON.stringify(this.affiliateId);
        this.$refs.formSelector.reset();
        this.getUrlRedirects();
      });
    }
  },
  created() {
    if (localStorage.mfpAffiliateId) {
      this.affiliateName = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateName : null;
      this.affiliateNumber = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateNumber : null;
      this.affiliateId = JSON.parse(localStorage.mfpAffiliateId);
    } else {
      this.affiliateId = null;
    }
  },
  mounted() {
    this.getUrlRedirects();
    this.baseUrl = window.location.origin;
  },
  methods: {
    copyUrlToClipBoard(url) {
      navigator.clipboard.writeText(url);
    },
    async deleteUrl(id) {
      try {
        if (!id) {
          return;
        }
        this.loading = true;
        const data = await api$1.urlRedirectDelete(id).then(() => {
          this.getUrlRedirects();
        }).catch((err) => {
          throw new Error(err);
        });
        this.urlRedirects = data;
      } catch (error) {
        console.log("Error deleting URL Redirects: ", error);
      }
      this.loading = false;
    },
    async getUrlRedirects() {
      this.affiliateId = this.$store.getters["user/selectedAffiliate"] ? this.$store.getters["user/selectedAffiliate"].AffiliateId : null;
      try {
        this.alert = false;
        this.alertType = "success";
        this.alertText = "";
        if (!this.affiliateName) {
          return;
        }
        this.loading = true;
        const { data } = await api$1.urlRedirectList(this.affiliateName).catch((err) => {
          throw new Error(err);
        });
        this.urlRedirects = data;
      } catch (error) {
        console.log("Error fetching URL Redirects: ", error);
      }
      this.loading = false;
    },
    async saveUrlRedirect() {
      try {
        if (!this.affiliateName) {
          return;
        }
        if (this.customUrl === "") {
          return;
        }
        this.alert = false;
        this.alertType = "success";
        this.alertText = "";
        if (/\s/.test(this.customUrl)) {
          this.alert = true;
          this.alertType = "error";
          this.alertText = "Please enter valid URL";
          return;
        }
        this.loading = true;
        await api$1.urlRedirectCreate({
          customUrl: this.customUrl,
          affiliateName: this.affiliateName,
          affiliateNumber: this.affiliateNumber,
          formId: this.formId
        }).then((response) => {
          if (response.data && response.data.errors) {
            this.alert = true;
            this.alertText = response.data.errors.customUrl[0];
            this.alertType = "error";
          } else {
            this.getUrlRedirects();
            this.clearForm();
          }
        }).catch((err) => {
          if (err.response.status === 422) {
            this.alert = true;
            this.alertType = "error";
            this.alertText = err.response.data.errors.formId ? err.response.data.errors.formId[0] : err.response.data.errors.customUrl[0];
          }
        });
      } catch (error) {
        console.log("Error fetching URL Redirects: ", error);
      }
      this.loading = false;
    },
    clearForm() {
      this.formId = null;
      this.$refs.formSelector.reset();
      this.customUrl = "";
    },
    generateQrCode(customUrl) {
      this.loading = true;
      const url = `${this.baseUrl}/app/memberforms/${this.affiliateNumber}/${customUrl}`;
      this.customFormUrl = url;
      api$1.submissionQrCode(url).then((response) => {
        this.qrCode = response.data;
        this.qrCodeDialog = true;
      }).finally(() => {
        this.loading = false;
      });
    },
    downloadQrCode() {
      this.loading = true;
      api$1.downloadQrCode(this.customFormUrl).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        const filename = "qr_code.svg";
        fileLink.setAttribute("download", filename);
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
const _hoisted_1 = ["href"];
const _hoisted_2 = ["href"];
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["href"];
const _hoisted_5 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormSearchSelector = resolveComponent("FormSearchSelector");
  return openBlock(), createBlock(VContainer, { fluid: "" }, {
    default: withCtx(() => [
      createVNode(VAlert, {
        modelValue: _ctx.alert,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.alert = $event),
        type: _ctx.alertType,
        closable: "",
        "close-text": "Dismiss"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString(_ctx.alertText),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue", "type"]),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => _cache[7] || (_cache[7] = [
              createBaseVNode(
                "h2",
                { class: "submissionTitle" },
                " URL Redirects ",
                -1
                /* HOISTED */
              )
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
              createVNode(_component_FormSearchSelector, {
                ref: "formSelector",
                modelValue: _ctx.formId,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.formId = $event),
                label: "Select a Form",
                "item-value": "id",
                "search-type": "form",
                "search-args": { affiliateId: _ctx.affiliateId, sortBy: "system_name" },
                "item-title": "system_name",
                outlined: "",
                clearable: ""
              }, null, 8, ["modelValue", "search-args"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      _ctx.formId ? (openBlock(), createBlock(VCol, { key: 0 }, {
        default: withCtx(() => [
          _cache[8] || (_cache[8] = createBaseVNode(
            "strong",
            null,
            " Original public form URL:",
            -1
            /* HOISTED */
          )),
          createBaseVNode("a", {
            href: "/app/memberforms/form/" + _ctx.formId,
            target: "_blank"
          }, toDisplayString(_ctx.baseUrl) + "/app/memberforms/form/" + toDisplayString(_ctx.formId), 9, _hoisted_1)
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.customUrl,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.customUrl = $event),
                label: "Custom URL",
                prefix: "/app/memberforms/" + _ctx.affiliateNumber + "/",
                class: "",
                variant: "outlined",
                disabled: !_ctx.formId
              }, null, 8, ["modelValue", "prefix", "disabled"])
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
          createVNode(VCol, { class: "continueButton" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#0A2A5C",
                class: "submit-button",
                onClick: _cache[3] || (_cache[3] = ($event) => $options.saveUrlRedirect())
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode(" Save ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                class: "btn-default",
                onClick: _cache[4] || (_cache[4] = ($event) => $options.clearForm())
              }, {
                default: withCtx(() => _cache[10] || (_cache[10] = [
                  createTextVNode(" Clear ")
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
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, null, {
            default: withCtx(() => [
              createVNode(VDataTable, {
                headers: _ctx.headers,
                items: _ctx.urlRedirects,
                class: "v-outlined"
              }, {
                [`item.CreatedAt`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "span",
                    null,
                    toDisplayString($options.displayDate(item.CreatedAt)),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.form_id`]: withCtx(({ item }) => [
                  createBaseVNode("span", null, [
                    createBaseVNode("a", {
                      href: "/app/memberforms/form/" + item.form_id,
                      target: "_blank"
                    }, toDisplayString("/app/memberforms/form/" + item.form_id), 9, _hoisted_2)
                  ]),
                  createVNode(VIcon, {
                    start: "",
                    class: "clipboardIcon",
                    onClick: ($event) => $options.copyUrlToClipBoard(_ctx.baseUrl + "/app/memberforms/form/" + item.form_id),
                    icon: "mdi:mdi-clipboard-multiple"
                  }, null, 8, ["onClick"])
                ]),
                [`item.qr_code`]: withCtx(({ item }) => [
                  createBaseVNode("a", {
                    onClick: ($event) => $options.generateQrCode(item.custom_url)
                  }, [
                    createVNode(VImg, {
                      "max-height": "32",
                      "max-width": "32",
                      src: "/vendor/memberforms/images/qr-code.png"
                    })
                  ], 8, _hoisted_3)
                ]),
                [`item.custom_url`]: withCtx(({ item }) => [
                  createBaseVNode("span", null, [
                    createBaseVNode("a", {
                      href: "/app/memberforms/" + _ctx.affiliateNumber + "/" + item.custom_url,
                      target: "_blank"
                    }, toDisplayString("/app/memberforms/" + _ctx.affiliateNumber + "/" + item.custom_url), 9, _hoisted_4)
                  ]),
                  createVNode(VIcon, {
                    start: "",
                    class: "clipboardIcon",
                    onClick: ($event) => $options.copyUrlToClipBoard(_ctx.baseUrl + "/app/memberforms/" + _ctx.affiliateNumber + "/" + item.custom_url),
                    icon: "mdi:mdi-clipboard-multiple"
                  }, null, 8, ["onClick"])
                ]),
                [`item.id`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    size: "small",
                    elevation: "2",
                    onClick: ($event) => {
                      $options.deleteUrl(item.id);
                    }
                  }, {
                    default: withCtx(() => _cache[11] || (_cache[11] = [
                      createTextVNode(" Delete ")
                    ])),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["onClick"])
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["headers", "items"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VDialog, {
        modelValue: _ctx.qrCodeDialog,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.qrCodeDialog = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createBaseVNode("div", { innerHTML: _ctx.qrCode }, null, 8, _hoisted_5)
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: _cache[5] || (_cache[5] = ($event) => _ctx.qrCodeDialog = false)
                  }, {
                    default: withCtx(() => _cache[12] || (_cache[12] = [
                      createTextVNode(" Dismiss ")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "blue-darken-1",
                    variant: "text",
                    onClick: $options.downloadQrCode
                  }, {
                    default: withCtx(() => _cache[13] || (_cache[13] = [
                      createTextVNode(" Download ")
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
      createVNode(VOverlay, {
        "model-value": _ctx.loading,
        scrim: "#FFF"
      }, null, 8, ["model-value"])
    ]),
    _: 1
    /* STABLE */
  });
}
const UrlRedirects = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/private/UrlRedirects.vue"]]);
const routes = createRouter({
  history: createWebHistory("/app/memberforms/admin"),
  routes: [
    {
      path: "/",
      component: PageDashboard,
      meta: {
        label: "Dashboard",
        navTitle: "Dashboard",
        icon: "mdi-view-dashboard",
        visible: false
      },
      name: "dashboard"
    },
    {
      path: "/list",
      component: PageSubmissionList,
      meta: {
        label: "Submission List",
        icon: "mdi:mdi-format-list-bulleted",
        visible: true
      },
      menuItems: [
        {
          path: "/list?type=new",
          label: "New Submissions",
          name: "new-submissions",
          icon: "mdi:mdi-clipboard-check-multiple-outline"
        },
        {
          path: "/list",
          label: "All Submissions",
          name: "all-submissions",
          icon: "mdi:mdi-clipboard-text-multiple-outline"
        }
      ],
      name: "list"
    },
    {
      path: "/view-submission/:id",
      component: PageViewSubmission,
      meta: {
        label: "ViewSubmission",
        visible: false
      },
      name: "view-submission"
    },
    {
      path: "/manage",
      component: PageManageForms,
      meta: {
        label: "Manage Forms",
        icon: "mdi:mdi-clipboard-edit-outline",
        visible: true
      },
      name: "manage"
    },
    {
      path: "/create",
      component: PageCreateForm,
      meta: {
        label: "Create Form",
        icon: "mdi:mdi-clipboard-plus-outline",
        visible: true
      },
      name: "create"
    },
    {
      path: "/edit",
      component: PageCreateForm,
      meta: {
        label: "Edit Form",
        icon: "mdi:mdi-table-plus",
        visible: false
      },
      name: "edit"
    },
    {
      path: "/url-redirects",
      component: UrlRedirects,
      meta: {
        label: "URL Redirects",
        icon: "mdi:mdi-cached",
        visible: true
      },
      name: "url-redirects"
    },
    {
      path: "/dues-mapping",
      component: PageDuesMapping,
      meta: {
        label: "Dues Mapping",
        icon: "mdi:mdi-format-horizontal-align-center",
        visible: true
      },
      name: "dues-mapping"
    },
    {
      path: "/dues-create",
      component: PageDuesCategoryCreation,
      meta: {
        label: "Create Dues Mapping",
        icon: "mdi:mdi-format-list-checkbox",
        visible: false
      },
      name: "dues-create"
    },
    {
      path: "/settings",
      component: PageSetting,
      meta: {
        label: "Settings",
        icon: "mdi:mdi-cog-outline",
        visible: true
      },
      name: "settings"
    },
    {
      path: "/form/:id",
      component: PageForm,
      meta: {
        displayName: "Form"
      },
      name: "form"
    },
    {
      path: "/dataform/:id",
      component: PageDataForm,
      meta: {
        displayName: "Data Form"
      },
      name: "data-form"
    },
    {
      path: "/dataformThankyou/:id",
      component: PageDataFormThankYou,
      meta: {
        displayName: "Data Form"
      },
      name: "data-form-thank-you"
    },
    {
      path: "/debug",
      component: DebugInfo,
      meta: {
        label: "Debug Information",
        icon: "mdi:mdi-map-check-outline",
        visible: false
      },
      name: "debug"
    },
    {
      path: "/reports",
      component: NewReportsComponent,
      meta: {
        label: "Reports",
        icon: "mdi:mdi-format-list-checkbox",
        visible: true
      },
      name: "reports"
    }
    /* {
        path: '/test',
        component: PageTest,
        meta: {
            label: 'Test', icon: 'mdi-test-tube',
        },
        name: 'create',
    }, */
  ]
});
const state = {
  user: {}
};
const getters = {
  selectedEntity: (stateObj) => ({
    type: stateObj.user.profile.selected_entity.entity_type,
    id: stateObj.user.profile.selected_entity.entity_id
  }),
  selectedAffiliate: (stateObj) => stateObj.user.selectedAffiliate,
  userAbilities: (stateObj) => {
    const abilities = stateObj.user.AuthUserAbilities;
    if (stateObj.user.type === "admin") {
      abilities.unshift({ AuthAbility: { name: "Access Site Administration", type: "admin", order: -1 }, order: -1 });
      return abilities;
    }
    return abilities;
  }
};
const actions = {
  async getUser({ commit }) {
    return new Promise((resolve) => {
      api$1.getUser().then((response) => {
        commit("setUser", response.data.data);
        resolve();
      });
    });
  },
  async setUserSelectedEntity({ commit }, entityId) {
    return new Promise((resolve) => {
      api$1.setUserSelectedEntity({
        entityId
      }).then((response) => {
        commit("setUser", response.data.data);
        resolve();
      });
    });
  }
};
const mutations = {
  setUser(stateObj, payload) {
    state.user = payload;
  }
};
const userModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
const store = createStore({
  modules: {
    user: userModule
  },
  state: {
    //
  },
  getters: {
    //
  },
  actions: {
    //
  },
  mutations: {
    //
  }
});
const app = createApp(PrivateApp);
app.use(routes);
app.use(store);
app.use(vuetify);
app.component("VueSignaturePad", script);
app.use(MfpTypes);
store.dispatch("user/getUser").then(
  () => {
    app.mount("#app");
  }
);
//# sourceMappingURL=private-CxVR9LTw.js.map
