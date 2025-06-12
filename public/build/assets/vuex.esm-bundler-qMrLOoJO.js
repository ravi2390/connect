import { au as axios, _ as _export_sfc, k as createBlock, w as withCtx, am as VOverlay, o as openBlock, l as createVNode, ao as VProgressCircular, C as resolveComponent, E as VCard, aI as VNavigationDrawer, aA as VListItem, aB as VListItemTitle, t as createTextVNode, bF as VListItemSubtitle, ap as VDivider, ay as VIcon, M as VTextField, bG as VInput, K as VSelect, J as VCol, bC as resolveDynamicComponent, V as VContainer, I as VRow, v as createElementBlock, S as Fragment, T as renderList, x as createCommentVNode, s as VBtn, bH as effectScope, bI as reactive, aX as watch, b2 as computed, bJ as setupDevtoolsPlugin } from "./vuetify-EeS5qzD-.js";
import { d as debounce } from "./debounce-DRMZstlG.js";
const api = {
  REPORTS_LIST: "/api/v3/reports/",
  REPORT_OPTIONS: "/api/v3/reports/options",
  REPORT_SHOW: "/api/v3/reports/show",
  REPORT_DOWNLOAD: "/api/v3/reports/download",
  emptyPromise: () => Promise.resolve({ data: "..." })
};
const defaultOptions = {
  something: "nothing"
};
const api$1 = {
  name: "ReportsApi",
  install(Vue, options) {
    const opts = { ...defaultOptions, ...options };
    console.log("reports api installed", opts);
  },
  makeParams(parameters) {
    let params = [];
    for (let prop in parameters) {
      if (parameters.hasOwnProperty(prop)) {
        params.push(encodeURI(prop + "=" + parameters[prop]));
      }
    }
    return params;
  },
  reportsList(path) {
    return axios.get(api.REPORTS_LIST + path);
  },
  reportGetOptions(path) {
    if (path === "") {
      return api.emptyPromise();
    }
    return axios.get(api.REPORT_OPTIONS + path);
  },
  reportGet(path, parameters) {
    if (path === "") {
      return api.emptyPromise();
    }
    console.log("AXIOS SHOW POST PARAMETERS", parameters);
    return axios.post(api.REPORT_SHOW + path, { parameters });
  },
  reportDownload(path, parameters) {
    if (path === "") {
      return api.emptyPromise();
    }
    console.log("AXIOS DOWNLOAD POST PARAMETERS", parameters);
    const params = this.makeParams(parameters);
    console.log("DOWNLOAD URL", api.REPORT_DOWNLOAD + path + "?" + params);
    return axios.request({ url: api.REPORT_DOWNLOAD + path + "?" + params, method: "GET", responseType: "blob" });
  }
};
const _sfc_main$d = {
  name: "LoadingOverlay",
  props: {
    loading: { type: Boolean, default: false }
  }
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VOverlay, {
    absolute: "",
    "model-value": $props.loading
  }, {
    default: withCtx(() => [
      createVNode(VProgressCircular, {
        indeterminate: "",
        size: "64"
      })
    ]),
    _: 1
    /* STABLE */
  }, 8, ["model-value"]);
}
const LoadingComponent = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/LoadingOverlay.vue"]]);
const _sfc_main$c = {
  name: "ReportsNavigation",
  components: { LoadingComponent },
  props: {
    value: { type: String, default: "" },
    path: { type: String, default: "" }
  },
  data: () => ({
    loading: false,
    open: [],
    tree: [],
    items: [],
    active: [""],
    types: {
      directory: "mdi:mdi-folder",
      report: "mdi:mdi-file-table-outline",
      unknown: "mdi:mdi-file-question"
    },
    selected: ""
  }),
  watch: {
    active: function(newValue, oldValue) {
    },
    value: function(newValue) {
      console.log("NAV VALUE", newValue);
    }
  },
  mounted() {
    this.selected = this.value;
    this.loadNavigation(document.URL);
  },
  methods: {
    loadNavigation(path) {
      let query = "";
      if (path.includes("memberforms")) {
        query = "?source=mfp";
      }
      this.loading = true;
      return api$1.reportsList(query).then((response) => {
        console.log("REPORTNAV LOADED");
        this.items = response.data.items;
        if (response.data.report !== (this.active[0] || "")) {
          console.log("REPORTNAV SET", response.data.report);
          this.active = [response.data.report];
        }
      }).catch((error) => {
        console.log("SSRS NAV ERROR", error);
      }).finally(() => {
        this.loading = false;
      });
    },
    select() {
      if (!this.active || this.active.length === 0) {
        return;
      }
      if (this.selected === this.active[0]) {
        return;
      }
      this.selected = this.active[0];
      console.log("SELECT", this.selected);
      this.$emit("input", this.selected);
    }
  }
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_treeview = resolveComponent("v-treeview");
  const _component_loading_component = resolveComponent("loading-component");
  return openBlock(), createBlock(VCard, {
    class: "rounded-0",
    width: "100%",
    height: "100%"
  }, {
    default: withCtx(() => [
      createVNode(VNavigationDrawer, {
        permanent: "",
        width: "100%"
      }, {
        default: withCtx(() => [
          createVNode(VListItem, null, {
            default: withCtx(() => [
              createVNode(VListItemTitle, { class: "text-h6" }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode(" Reports ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VListItemSubtitle, null, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode(" Choose a report from below ")
                ])),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VDivider),
          createVNode(_component_v_treeview, {
            modelValue: _ctx.tree,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.tree = $event),
            items: _ctx.items,
            open: _ctx.open,
            "onUpdate:open": _cache[1] || (_cache[1] = ($event) => _ctx.open = $event),
            active: _ctx.active,
            "onUpdate:active": [
              _cache[2] || (_cache[2] = ($event) => _ctx.active = $event),
              $options.select
            ],
            activatable: "",
            "item-value": "path",
            "open-on-click": ""
          }, {
            prepend: withCtx(({ item, isOpen }) => [
              item.type === "directory" ? (openBlock(), createBlock(VIcon, {
                key: 0,
                icon: isOpen ? "mdi-folder-open" : "mdi-folder"
              }, null, 8, ["icon"])) : _ctx.types[item.type] ? (openBlock(), createBlock(VIcon, {
                key: 1,
                icon: _ctx.types[item.type]
              }, null, 8, ["icon"])) : (openBlock(), createBlock(VIcon, {
                key: 2,
                icon: _ctx.types["unknown"]
              }, null, 8, ["icon"]))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue", "items", "open", "active", "onUpdate:active"])
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_loading_component, { loading: _ctx.loading }, null, 8, ["loading"])
    ]),
    _: 1
    /* STABLE */
  });
}
const ReportsNavigation = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/ReportsNavigation.vue"]]);
const _sfc_main$b = {
  name: "UnknownParameter",
  props: {
    parameter: { type: Object, required: true }
  }
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VTextField, {
    label: $props.parameter.label,
    placeholder: "Unknown Data",
    "hide-details": true,
    variant: "outlined",
    density: "compact"
  }, null, 8, ["label"]);
}
const UnknownParameter = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/parameters/UnknownParameter.vue"]]);
const _sfc_main$a = {
  name: "BooleanParameter",
  props: {
    parameter: { type: Object, required: true }
  }
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VInput);
}
const BooleanParameter = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/parameters/BooleanParameter.vue"]]);
const _sfc_main$9 = {
  name: "NumberParameter",
  props: {
    value: { type: Number, default: null },
    parameter: { type: Object, required: true }
  },
  data: () => ({
    number: null
  }),
  watch: { number() {
    this.updated();
  } },
  mounted() {
    this.number = this.parameter.default[0] || this.parameter.value;
    this.updated = debounce(() => {
      this.$emit("input", this.number);
    }, 500);
  }
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VTextField, {
    modelValue: _ctx.number,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.number = $event),
    label: $props.parameter.label,
    "hide-details": true,
    placeholder: "Text",
    variant: "outlined",
    density: "compact"
  }, null, 8, ["modelValue", "label"]);
}
const NumberParameter = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/parameters/NumberParameter.vue"]]);
const _sfc_main$8 = {
  name: "TextParameter",
  props: {
    value: { type: String, default: null },
    parameter: { type: Object, required: true }
  },
  data: () => ({
    text: null
  }),
  watch: { text() {
    this.updated();
  } },
  mounted() {
    this.text = this.parameter.default[0] || this.parameter.value;
    this.updated = debounce(() => {
      this.$emit("input", this.text);
    }, 500);
  }
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VTextField, {
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.text = $event),
    label: $props.parameter.label,
    "hide-details": true,
    placeholder: "Text",
    variant: "outlined",
    density: "compact"
  }, null, 8, ["modelValue", "label"]);
}
const TextParameter = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/parameters/TextParameter.vue"]]);
const _sfc_main$7 = {
  name: "SelectParameter",
  props: {
    value: { type: String, default: null },
    parameter: { type: Object, required: true }
  },
  data: () => ({
    selected: null
  }),
  watch: { selected() {
    this.updated();
  } },
  mounted() {
    this.selected = this.parameter.default[0] || this.parameter.value;
  },
  methods: {
    updated() {
      this.$emit("input", this.selected);
    }
  }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VSelect, {
    modelValue: _ctx.selected,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selected = $event),
    label: $props.parameter.label,
    "hide-details": true,
    items: $props.parameter.values,
    "item-value": "value",
    "item-title": "label",
    placeholder: "Select",
    variant: "outlined",
    density: "compact"
  }, null, 8, ["modelValue", "label", "items"]);
}
const SelectParameter = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/parameters/SelectParameter.vue"]]);
const _sfc_main$6 = {
  name: "MultiSelectParameter",
  props: {
    parameter: { type: Object, required: true }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
const MultiSelectParameter = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/parameters/MultiSelectParameter.vue"]]);
const _sfc_main$5 = {
  name: "DateTimeParameter",
  props: {
    value: { type: String, default: null },
    parameter: { type: Object, required: true }
  },
  data: () => ({
    datetime: null
  }),
  watch: { datetime() {
    this.updated();
  } },
  methods: {
    updated() {
      this.$emit("input", this.datetime);
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VTextField, {
    modelValue: _ctx.datetime,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.datetime = $event),
    label: $props.parameter.label,
    "hide-details": true,
    placeholder: "DateTime",
    variant: "outlined",
    density: "compact"
  }, null, 8, ["modelValue", "label"]);
}
const DateTimeParameter = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/parameters/DateTimeParameter.vue"]]);
const _sfc_main$4 = {
  name: "GenericParameter",
  components: {
    UnknownParameter,
    BooleanParameter,
    NumberParameter,
    TextParameter,
    SelectParameter,
    MultiSelectParameter,
    DateTimeParameter
  },
  props: {
    value: { type: null },
    parameter: { type: Object, required: true }
  },
  data: () => ({
    data: null
  }),
  watch: { data() {
    this.updated();
  } },
  computed: {
    parameterTypeToComponent() {
      switch (this.parameter.type) {
        case "number":
          return NumberParameter;
        case "text":
          return TextParameter;
        case "select":
          return SelectParameter;
        case "multiselect":
          return MultiSelectParameter;
        case "datetime":
          return DateTimeParameter;
      }
      console.log("UNKNOWN PARAMETER TYPE", this.parameter.type);
      return UnknownParameter;
    }
  },
  mounted() {
    this.data = this.parameter.value;
  },
  methods: {
    updated() {
      console.log("GENERIC PARAMETER INPUT", this.data);
      this.$emit("input", this.data);
    }
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VCol, null, {
    default: withCtx(() => [
      (openBlock(), createBlock(resolveDynamicComponent($options.parameterTypeToComponent), {
        modelValue: _ctx.data,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.data = $event),
        parameter: $props.parameter
      }, null, 8, ["modelValue", "parameter"]))
    ]),
    _: 1
    /* STABLE */
  });
}
const GenericParameter = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/parameters/GenericParameter.vue"]]);
const _sfc_main$3 = {
  name: "ReportToolbar",
  components: { GenericParameter, LoadingOverlay: LoadingComponent },
  props: {
    value: { type: Object, default: null },
    path: { type: String, default: "" },
    affiliate: { type: String, default: "" }
  },
  data: () => ({
    loading: false,
    disabled: false,
    errors: false,
    reportParameters: [],
    sendParameters: {}
  }),
  watch: {
    path: function(newValue, oldValue) {
      console.log("TOOLBAR CHANGED", newValue);
      this.loadReportOptions(newValue);
    },
    sendParameters: {
      deep: true,
      handler() {
        console.log("SEND PARAMETERS CHANGED", this.sendParameters);
        this.validateSendParameters();
      }
    }
  },
  mounted() {
  },
  methods: {
    loadReportOptions(path) {
      this.loading = true;
      this.disabled = false;
      this.errors = false;
      api$1.reportGetOptions(path).then((response) => {
        console.log("SET REPORT OPTIONS", response.data);
        this.reportParameters = response.data.parameters;
        this.validateSendParameters();
      }).catch((error) => {
        console.log("SSRS TOOLBAR ERROR", error);
        this.disabled = true;
        this.errors = true;
      }).finally(() => {
        this.loading = false;
      });
    },
    updateSendParameters(name, value) {
      console.log("UPDATE SEND PARAMETERS", this.sendParameters, name, value);
      this.sendParameters[name] = value;
      this.validateSendParameters();
    },
    validateSendParameters() {
      console.log("VALIDATE SEND PARAMETERS", this.sendParameters);
      this.$emit("input", this.sendParameters);
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_generic_parameter = resolveComponent("generic-parameter");
  const _component_loading_overlay = resolveComponent("loading-overlay");
  return openBlock(), createBlock(VCard, null, {
    default: withCtx(() => [
      createVNode(VContainer, { fluid: "" }, {
        default: withCtx(() => [
          !_ctx.errors ? (openBlock(), createBlock(VRow, {
            key: 0,
            "no-gutters": ""
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.reportParameters, (parameter) => {
                  return openBlock(), createBlock(
                    VCol,
                    {
                      key: parameter.name
                    },
                    {
                      default: withCtx(() => [
                        createVNode(_component_generic_parameter, {
                          parameter,
                          onInput: ($event) => $options.updateSendParameters(parameter.name, $event)
                        }, null, 8, ["parameter", "onInput"])
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
          })) : (openBlock(), createBlock(VRow, { key: 1 }, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => _cache[0] || (_cache[0] = [
                  createTextVNode(" Something went wrong! ")
                ])),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }))
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_loading_overlay, { loading: _ctx.loading }, null, 8, ["loading"])
    ]),
    _: 1
    /* STABLE */
  });
}
const ReportToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/ReportToolbar.vue"]]);
const _sfc_main$2 = {
  name: "ReportView",
  components: { ReportToolbar, LoadingComponent },
  props: {
    path: { type: String, default: "" }
  },
  data: () => ({
    loading: false,
    disabled: false,
    errors: false,
    affiliate: "",
    report: "",
    parameters: {}
  }),
  watch: {
    path: function(value, old) {
    },
    parameters: {
      deep: true,
      handler() {
        console.log("LOAD REPORT");
      }
    }
  },
  mounted() {
  },
  methods: {
    loadReport(path) {
      const p = this.parameters;
      console.log("REPORTVIEW LOAD REPORT", path, p);
      this.loading = true;
      this.disabled = false;
      this.errors = false;
      console.log("REALLY?", p);
      api$1.reportGet(path, p).then((response) => {
        this.report = response.data;
      }).catch((error) => {
        console.log("SSRS VIEW ERROR", error);
        this.disabled = true;
        this.errors = true;
      }).finally(() => {
        this.loading = false;
      });
    },
    downloadReport() {
      const path = this.path;
      const p = this.parameters;
      console.log("REPORTVIEW DOWNLOAD REPORT", path, p);
      this.loading = true;
      this.disabled = false;
      this.errors = false;
      const pa = api$1.makeParams(p);
      console.log("REALLY?", p);
      axios.request({ url: "/api/v3/reports/download" + path + "?" + pa, method: "GET", responseType: "blob" }).then((response) => {
        console.log("DOWNLOAD AXIOS REQUEST RESPONSE", response);
        let cd = response.headers["content-disposition"].split("; ");
        let disposition = [];
        cd.forEach(function(item) {
          let t = item.split("=");
          disposition[t[0]] = t[1];
        });
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", disposition["filename"]);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }).finally(() => {
        this.loading = false;
      });
    },
    updateParameters() {
      console.log("REPORTVIEW UPDATE PARAMETERS", this.parameters);
      this.loadReport(this.path);
    }
  }
};
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = {
  key: 1,
  class: "container",
  style: { "width": "100%", "height": "100%" }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_report_toolbar = resolveComponent("report-toolbar");
  const _component_loading_component = resolveComponent("loading-component");
  return openBlock(), createBlock(VCard, {
    class: "rounded-0",
    width: "100%",
    height: "100%"
  }, {
    default: withCtx(() => [
      createVNode(_component_report_toolbar, {
        modelValue: _ctx.parameters,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.parameters = $event),
        path: $props.path,
        affiliate: _ctx.affiliate,
        errors: _ctx.errors,
        onInput: $options.updateParameters
      }, null, 8, ["modelValue", "path", "affiliate", "errors", "onInput"]),
      createVNode(VContainer, { fluid: "" }, {
        default: withCtx(() => [
          $props.path !== "" ? (openBlock(), createBlock(VRow, {
            key: 0,
            "no-gutters": ""
          }, {
            default: withCtx(() => [
              createVNode(VBtn, { onClick: $options.downloadReport }, {
                default: withCtx(() => _cache[1] || (_cache[1] = [
                  createTextVNode("Download")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true),
          createVNode(VRow, { dense: "" }, {
            default: withCtx(() => [
              !_ctx.errors ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "container",
                style: { "width": "100%", "height": "100%" },
                innerHTML: _ctx.report
              }, null, 8, _hoisted_1)) : (openBlock(), createElementBlock("div", _hoisted_2, "Something went wrong!"))
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_loading_component, { loading: _ctx.loading }, null, 8, ["loading"])
    ]),
    _: 1
    /* STABLE */
  });
}
const ReportView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/components/ReportView.vue"]]);
const _sfc_main$1 = {
  name: "SsrsReportsComponent",
  components: { ReportsNavigation, ReportView },
  data: () => ({
    reportPath: ""
  })
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_reports_navigation = resolveComponent("reports-navigation");
  const _component_report_view = resolveComponent("report-view");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, { "no-gutters": "" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "4"
          }, {
            default: withCtx(() => [
              createVNode(_component_reports_navigation, {
                modelValue: _ctx.reportPath,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.reportPath = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "8"
          }, {
            default: withCtx(() => [
              createVNode(_component_report_view, { path: _ctx.reportPath }, null, 8, ["path"])
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
const SsrsReports = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/html/packages/aft/ssrs/resources/js/SsrsReports.vue"]]);
const _sfc_main = {
  name: "NewReportsComponent",
  components: { SsrsReports }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ssrs_reports = resolveComponent("ssrs-reports");
  return openBlock(), createBlock(_component_ssrs_reports);
}
const NewReportsComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/html/resources/js/components/Common/NewReportsComponent.vue"]]);
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var storeKey = "store";
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function(key) {
    return fn(obj[key], key);
  });
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
function isPromise(val) {
  return val && typeof val.then === "function";
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}
function partial(fn, arg) {
  return function() {
    return fn(arg);
  };
}
function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  return function() {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}
function resetStore(store, hot) {
  store._actions = /* @__PURE__ */ Object.create(null);
  store._mutations = /* @__PURE__ */ Object.create(null);
  store._wrappedGetters = /* @__PURE__ */ Object.create(null);
  store._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var state = store.state;
  installModule(store, state, [], store._modules.root, true);
  resetStoreState(store, state, hot);
}
function resetStoreState(store, state, hot) {
  var oldState = store._state;
  var oldScope = store._scope;
  store.getters = {};
  store._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computedObj = {};
  var computedCache = {};
  var scope = effectScope(true);
  scope.run(function() {
    forEachValue(wrappedGetters, function(fn, key) {
      computedObj[key] = partial(fn, store);
      computedCache[key] = computed(function() {
        return computedObj[key]();
      });
      Object.defineProperty(store.getters, key, {
        get: function() {
          return computedCache[key].value;
        },
        enumerable: true
        // for local getters
      });
    });
  });
  store._state = reactive({
    data: state
  });
  store._scope = scope;
  if (store.strict) {
    enableStrictMode(store);
  }
  if (oldState) {
    if (hot) {
      store._withCommit(function() {
        oldState.data = null;
      });
    }
  }
  if (oldScope) {
    oldScope.stop();
  }
}
function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && true) {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
    }
    store._modulesNamespaceMap[namespace] = module;
  }
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function() {
      {
        if (moduleName in parentState) {
          console.warn(
            '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
          );
        }
      }
      parentState[moduleName] = module.state;
    });
  }
  var local = module.context = makeLocalContext(store, namespace, path);
  module.forEachMutation(function(mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });
  module.forEachAction(function(action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });
  module.forEachGetter(function(getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });
  module.forEachChild(function(child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === "";
  var local = {
    dispatch: noNamespace ? store.dispatch : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }
      return store.dispatch(type, payload);
    },
    commit: noNamespace ? store.commit : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }
      store.commit(type, payload, options);
    }
  };
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function() {
        return store.getters;
      } : function() {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function() {
        return getNestedState(store.state, path);
      }
    }
  });
  return local;
}
function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function(type) {
      if (type.slice(0, splitPos) !== namespace) {
        return;
      }
      var localType = type.slice(splitPos);
      Object.defineProperty(gettersProxy, localType, {
        get: function() {
          return store.getters[type];
        },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }
  return store._makeLocalGettersCache[namespace];
}
function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}
function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function(err) {
        store._devtoolHook.emit("vuex:error", err);
        throw err;
      });
    } else {
      return res;
    }
  });
}
function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    {
      console.error("[vuex] duplicate getter key: " + type);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store2) {
    return rawGetter(
      local.state,
      // local state
      local.getters,
      // local getters
      store2.state,
      // root state
      store2.getters
      // root getters
    );
  };
}
function enableStrictMode(store) {
  watch(function() {
    return store._state.data;
  }, function() {
    {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, flush: "sync" });
}
function getNestedState(state, path) {
  return path.reduce(function(state2, key) {
    return state2[key];
  }, state);
}
function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }
  {
    assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
  }
  return { type, payload, options };
}
var LABEL_VUEX_BINDINGS = "vuex bindings";
var MUTATIONS_LAYER_ID = "vuex:mutations";
var ACTIONS_LAYER_ID = "vuex:actions";
var INSPECTOR_ID = "vuex";
var actionId = 0;
function addDevtools(app, store) {
  setupDevtoolsPlugin(
    {
      id: "org.vuejs.vuex",
      app,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [LABEL_VUEX_BINDINGS]
    },
    function(api2) {
      api2.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: "Vuex Mutations",
        color: COLOR_LIME_500
      });
      api2.addTimelineLayer({
        id: ACTIONS_LAYER_ID,
        label: "Vuex Actions",
        color: COLOR_LIME_500
      });
      api2.addInspector({
        id: INSPECTOR_ID,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      });
      api2.on.getInspectorTree(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          if (payload.filter) {
            var nodes = [];
            flattenStoreForInspectorTree(nodes, store._modules.root, payload.filter, "");
            payload.rootNodes = nodes;
          } else {
            payload.rootNodes = [
              formatStoreForInspectorTree(store._modules.root, "")
            ];
          }
        }
      });
      api2.on.getInspectorState(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          makeLocalGetters(store, modulePath);
          payload.state = formatStoreForInspectorState(
            getStoreModule(store._modules, modulePath),
            modulePath === "root" ? store.getters : store._makeLocalGettersCache,
            modulePath
          );
        }
      });
      api2.on.editInspectorState(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          var path = payload.path;
          if (modulePath !== "root") {
            path = modulePath.split("/").filter(Boolean).concat(path);
          }
          store._withCommit(function() {
            payload.set(store._state.data, path, payload.state.value);
          });
        }
      });
      store.subscribe(function(mutation, state) {
        var data = {};
        if (mutation.payload) {
          data.payload = mutation.payload;
        }
        data.state = state;
        api2.notifyComponentUpdate();
        api2.sendInspectorTree(INSPECTOR_ID);
        api2.sendInspectorState(INSPECTOR_ID);
        api2.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: Date.now(),
            title: mutation.type,
            data
          }
        });
      });
      store.subscribeAction({
        before: function(action, state) {
          var data = {};
          if (action.payload) {
            data.payload = action.payload;
          }
          action._id = actionId++;
          action._time = Date.now();
          data.state = state;
          api2.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: action._time,
              title: action.type,
              groupId: action._id,
              subtitle: "start",
              data
            }
          });
        },
        after: function(action, state) {
          var data = {};
          var duration = Date.now() - action._time;
          data.duration = {
            _custom: {
              type: "duration",
              display: duration + "ms",
              tooltip: "Action duration",
              value: duration
            }
          };
          if (action.payload) {
            data.payload = action.payload;
          }
          data.state = state;
          api2.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: action.type,
              groupId: action._id,
              subtitle: "end",
              data
            }
          });
        }
      });
    }
  );
}
var COLOR_LIME_500 = 8702998;
var COLOR_DARK = 6710886;
var COLOR_WHITE = 16777215;
var TAG_NAMESPACED = {
  label: "namespaced",
  textColor: COLOR_WHITE,
  backgroundColor: COLOR_DARK
};
function extractNameFromPath(path) {
  return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
}
function formatStoreForInspectorTree(module, path) {
  return {
    id: path || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: extractNameFromPath(path),
    tags: module.namespaced ? [TAG_NAMESPACED] : [],
    children: Object.keys(module._children).map(
      function(moduleName) {
        return formatStoreForInspectorTree(
          module._children[moduleName],
          path + moduleName + "/"
        );
      }
    )
  };
}
function flattenStoreForInspectorTree(result, module, filter, path) {
  if (path.includes(filter)) {
    result.push({
      id: path || "root",
      label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
      tags: module.namespaced ? [TAG_NAMESPACED] : []
    });
  }
  Object.keys(module._children).forEach(function(moduleName) {
    flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
  });
}
function formatStoreForInspectorState(module, getters, path) {
  getters = path === "root" ? getters : getters[path];
  var gettersKeys = Object.keys(getters);
  var storeState = {
    state: Object.keys(module.state).map(function(key) {
      return {
        key,
        editable: true,
        value: module.state[key]
      };
    })
  };
  if (gettersKeys.length) {
    var tree = transformPathsToObjectTree(getters);
    storeState.getters = Object.keys(tree).map(function(key) {
      return {
        key: key.endsWith("/") ? extractNameFromPath(key) : key,
        editable: false,
        value: canThrow(function() {
          return tree[key];
        })
      };
    });
  }
  return storeState;
}
function transformPathsToObjectTree(getters) {
  var result = {};
  Object.keys(getters).forEach(function(key) {
    var path = key.split("/");
    if (path.length > 1) {
      var target = result;
      var leafKey = path.pop();
      path.forEach(function(p) {
        if (!target[p]) {
          target[p] = {
            _custom: {
              value: {},
              display: p,
              tooltip: "Module",
              abstract: true
            }
          };
        }
        target = target[p]._custom.value;
      });
      target[leafKey] = canThrow(function() {
        return getters[key];
      });
    } else {
      result[key] = canThrow(function() {
        return getters[key];
      });
    }
  });
  return result;
}
function getStoreModule(moduleMap, path) {
  var names = path.split("/").filter(function(n) {
    return n;
  });
  return names.reduce(
    function(module, moduleName, i) {
      var child = module[moduleName];
      if (!child) {
        throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
      }
      return i === names.length - 1 ? child : child._children;
    },
    path === "root" ? moduleMap : moduleMap.root._children
  );
}
function canThrow(cb) {
  try {
    return cb();
  } catch (e) {
    return e;
  }
}
var Module = function Module2(rawModule, runtime) {
  this.runtime = runtime;
  this._children = /* @__PURE__ */ Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
};
var prototypeAccessors$1 = { namespaced: { configurable: true } };
prototypeAccessors$1.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};
Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};
Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};
Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};
Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};
Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};
Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};
Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};
Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};
Object.defineProperties(Module.prototype, prototypeAccessors$1);
var ModuleCollection = function ModuleCollection2(rawRootModule) {
  this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function(module, key) {
    return module.getChild(key);
  }, this.root);
};
ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function(namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + "/" : "");
  }, "");
};
ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update2([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1$1 = this;
  if (runtime === void 0) runtime = true;
  {
    assertRawModule(path, rawModule);
  }
  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function(rawChildModule, key) {
      this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};
ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);
  if (!child) {
    {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is not registered"
      );
    }
    return;
  }
  if (!child.runtime) {
    return;
  }
  parent.removeChild(key);
};
ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (parent) {
    return parent.hasChild(key);
  }
  return false;
};
function update2(path, targetModule, newModule) {
  {
    assertRawModule(path, newModule);
  }
  targetModule.update(newModule);
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
          );
        }
        return;
      }
      update2(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}
var functionAssert = {
  assert: function(value) {
    return typeof value === "function";
  },
  expected: "function"
};
var objectAssert = {
  assert: function(value) {
    return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
  },
  expected: 'function or object with "handler" function'
};
var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};
function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function(key) {
    if (!rawModule[key]) {
      return;
    }
    var assertOptions = assertTypes[key];
    forEachValue(rawModule[key], function(value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}
function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
  if (path.length > 0) {
    buf += ' in module "' + path.join(".") + '"';
  }
  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}
function createStore(options) {
  return new Store(options);
}
var Store = function Store2(options) {
  var this$1$1 = this;
  if (options === void 0) options = {};
  {
    assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store2, "store must be called with the new operator.");
  }
  var plugins = options.plugins;
  if (plugins === void 0) plugins = [];
  var strict = options.strict;
  if (strict === void 0) strict = false;
  var devtools = options.devtools;
  this._committing = false;
  this._actions = /* @__PURE__ */ Object.create(null);
  this._actionSubscribers = [];
  this._mutations = /* @__PURE__ */ Object.create(null);
  this._wrappedGetters = /* @__PURE__ */ Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  this._subscribers = [];
  this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  this._scope = null;
  this._devtools = devtools;
  var store = this;
  var ref = this;
  var dispatch2 = ref.dispatch;
  var commit2 = ref.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch2.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options2) {
    return commit2.call(store, type, payload, options2);
  };
  this.strict = strict;
  var state = this._modules.root.state;
  installModule(this, state, [], this._modules.root);
  resetStoreState(this, state);
  plugins.forEach(function(plugin) {
    return plugin(this$1$1);
  });
};
var prototypeAccessors = { state: { configurable: true } };
Store.prototype.install = function install(app, injectKey) {
  app.provide(injectKey || storeKey, this);
  app.config.globalProperties.$store = this;
  var useDevtools = this._devtools !== void 0 ? this._devtools : true;
  if (useDevtools) {
    addDevtools(app, this);
  }
};
prototypeAccessors.state.get = function() {
  return this._state.data;
};
prototypeAccessors.state.set = function(v) {
  {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};
Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1$1 = this;
  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;
  var mutation = { type, payload };
  var entry = this._mutations[type];
  if (!entry) {
    {
      console.error("[vuex] unknown mutation type: " + type);
    }
    return;
  }
  this._withCommit(function() {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.slice().forEach(function(sub) {
    return sub(mutation, this$1$1.state);
  });
  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
    );
  }
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1$1 = this;
  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;
  var action = { type, payload };
  var entry = this._actions[type];
  if (!entry) {
    {
      console.error("[vuex] unknown action type: " + type);
    }
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(sub) {
      return sub.before;
    }).forEach(function(sub) {
      return sub.before(action, this$1$1.state);
    });
  } catch (e) {
    {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }
  var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function(resolve, reject) {
    result.then(function(res) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.after;
        }).forEach(function(sub) {
          return sub.after(action, this$1$1.state);
        });
      } catch (e) {
        {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function(error) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.error;
        }).forEach(function(sub) {
          return sub.error(action, this$1$1.state, error);
        });
      } catch (e) {
        {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  });
};
Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};
Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === "function" ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};
Store.prototype.watch = function watch$1(getter, cb, options) {
  var this$1$1 = this;
  {
    assert(typeof getter === "function", "store.watch only accepts a function.");
  }
  return watch(function() {
    return getter(this$1$1.state, this$1$1.getters);
  }, cb, Object.assign({}, options));
};
Store.prototype.replaceState = function replaceState(state) {
  var this$1$1 = this;
  this._withCommit(function() {
    this$1$1._state.data = state;
  });
};
Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0) options = {};
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, "cannot register the root module by using registerModule.");
  }
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  resetStoreState(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1$1 = this;
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  this._modules.unregister(path);
  this._withCommit(function() {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    delete parentState[path[path.length - 1]];
  });
  resetStore(this);
};
Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  return this._modules.isRegistered(path);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors);
export {
  NewReportsComponent as N,
  createStore as c
};
//# sourceMappingURL=vuex.esm-bundler-qMrLOoJO.js.map
