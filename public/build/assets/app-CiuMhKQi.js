var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
import { au as axios$1, aQ as defineComponent, aR as shallowRef, aS as h, aT as version$1, aU as ref, aV as onMounted, aW as onUnmounted, aX as watch, aY as toRaw, aZ as nextTick, a_ as isProxy, _ as _export_sfc, C as resolveComponent, v as createElementBlock, o as openBlock, x as createCommentVNode, l as createVNode, S as Fragment, k as createBlock, w as withCtx, T as renderList, a$ as VSheet, r as createBaseVNode, y as toDisplayString, I as VRow, J as VCol, E as VCard, G as VCardText, V as VContainer, s as VBtn, t as createTextVNode, p as VDataTableServer, U as VDialog, F as VCardTitle, N as VCardActions, O as VSpacer, ao as VProgressCircular, am as VOverlay, M as VTextField, K as VSelect, a1 as format, B as VAutocomplete, b0 as mergeModels, b1 as useModel, b2 as computed, L as VSwitch, ar as VCheckboxBtn, q as VDataTable, H as VAlert, D as VForm, af as VRadioGroup, ag as VRadio, u as VCheckbox, a0 as mergeProps, ay as VIcon, X as VProgressLinear, aq as VLabel, aG as createRouter, b3 as RouterView, aH as createWebHistory, b4 as VFooter, a9 as VAppBar, aL as VAppBarNavIcon, as as withModifiers, b5 as VAppBarTitle, aK as VToolbarItems, aI as VNavigationDrawer, az as VList, aA as VListItem, aB as VListItemTitle, ap as VDivider, b6 as VMain, aM as VApp, b7 as useRoute, b8 as useRouter, aN as createApp, aO as vuetify } from "./vuetify-EeS5qzD-.js";
import "./bootstrap-BJGpzKVK.js";
import { d as debounce$1 } from "./debounce-DRMZstlG.js";
import { b as baseForOwn, P as Plugin, l as logWarning, C as Collection, a as PendingActions, O as ObservableMixin, u as uid$1, c as CKEditorError, S as ShiftEnter, U as UpcastWriter, d as ClipboardPipeline, e as createDropdown, i as icons, f as addListToDropdown, M as MenuBarMenuView, g as MenuBarMenuListView, h as MenuBarMenuListItemView, j as MenuBarMenuListItemButtonView, k as Model, m as Command, n as first, o as SplitButtonView, W as Widget, p as WidgetResize, q as ContextualBalloon, r as CssTransitionDisablerMixin, s as clickOutsideHandler, B as ButtonView, N as Notification, t as env, F as FileDialogButtonView, v as MenuBarMenuListItemFileDialogButtonView, D as Dialog, w as DomEmitterMixin, x as global, y as toWidget, z as isWidget, V as View, A as FocusTracker, K as KeystrokeHandler, E as ViewCollection, G as FocusCycler, H as CollapsibleView, I as submitHandler, J as Observer, L as BalloonPanelView, Q as calculateResizeHostAncestorWidth, R as Rect, T as DropdownButtonView, X as toArray, Y as LabeledFieldView, Z as createLabeledInputText, _ as findOptimalInsertionRange, $ as createLabeledInputNumber, a0 as Essentials, a1 as Paragraph, a2 as Bold, a3 as Italic, a4 as Underline, a5 as FontSize, a6 as FontColor, a7 as FontBackgroundColor, a8 as Alignment, a9 as List, aa as Link, ab as AutoLink, ac as _sfc_main$q, ad as ClassicEditor } from "./ckeditor5-5vcNS2fJ.js";
import { a as arrayMap, b as baseIteratee } from "./_baseSet-BOCO_qUt.js";
import { i as isArrayLike, a as isArray$1 } from "./_Uint8Array-C929yYkW.js";
import "./_commonjsHelpers-DyYX6rOH.js";
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = -1, iterable = Object(collection);
    while (++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var baseEach = createBaseEach(baseForOwn);
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
  baseEach(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
function map$2(collection, iteratee) {
  var func = isArray$1(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee));
}
window.axios = axios$1;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function round(v) {
  return v + 0.5 | 0;
}
const lim = (v, l, h3) => Math.max(Math.min(v, h3), l);
function p2b(v) {
  return lim(round(v * 2.55), 0, 255);
}
function n2b(v) {
  return lim(round(v * 255), 0, 255);
}
function b2n(v) {
  return lim(round(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
  return lim(round(v * 100), 0, 100);
}
const map$1 = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 };
const hex = [..."0123456789ABCDEF"];
const h1 = (b) => hex[b & 15];
const h2 = (b) => hex[(b & 240) >> 4] + hex[b & 15];
const eq = (b) => (b & 240) >> 4 === (b & 15);
const isShort = (v) => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
function hexParse(str) {
  var len = str.length;
  var ret;
  if (str[0] === "#") {
    if (len === 4 || len === 5) {
      ret = {
        r: 255 & map$1[str[1]] * 17,
        g: 255 & map$1[str[2]] * 17,
        b: 255 & map$1[str[3]] * 17,
        a: len === 5 ? map$1[str[4]] * 17 : 255
      };
    } else if (len === 7 || len === 9) {
      ret = {
        r: map$1[str[1]] << 4 | map$1[str[2]],
        g: map$1[str[3]] << 4 | map$1[str[4]],
        b: map$1[str[5]] << 4 | map$1[str[6]],
        a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
      };
    }
  }
  return ret;
}
const alpha = (a, f) => a < 255 ? f(a) : "";
function hexString(v) {
  var f = isShort(v) ? h1 : h2;
  return v ? "#" + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f) : void 0;
}
const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h3, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h3 / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}
function hsv2rgbn(h3, s, v) {
  const f = (n, k = (n + h3 / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
}
function hwb2rgbn(h3, w, b) {
  const rgb = hsl2rgbn(h3, 1, 0.5);
  let i;
  if (w + b > 1) {
    i = 1 / (w + b);
    w *= i;
    b *= i;
  }
  for (i = 0; i < 3; i++) {
    rgb[i] *= 1 - w - b;
    rgb[i] += w;
  }
  return rgb;
}
function hueValue(r, g, b, d, max) {
  if (r === max) {
    return (g - b) / d + (g < b ? 6 : 0);
  }
  if (g === max) {
    return (b - r) / d + 2;
  }
  return (r - g) / d + 4;
}
function rgb2hsl(v) {
  const range = 255;
  const r = v.r / range;
  const g = v.g / range;
  const b = v.b / range;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h3, s, d;
  if (max !== min) {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h3 = hueValue(r, g, b, d, max);
    h3 = h3 * 60 + 0.5;
  }
  return [h3 | 0, s || 0, l];
}
function calln(f, a, b, c) {
  return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
}
function hsl2rgb(h3, s, l) {
  return calln(hsl2rgbn, h3, s, l);
}
function hwb2rgb(h3, w, b) {
  return calln(hwb2rgbn, h3, w, b);
}
function hsv2rgb(h3, s, v) {
  return calln(hsv2rgbn, h3, s, v);
}
function hue(h3) {
  return (h3 % 360 + 360) % 360;
}
function hueParse(str) {
  const m = HUE_RE.exec(str);
  let a = 255;
  let v;
  if (!m) {
    return;
  }
  if (m[5] !== v) {
    a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
  }
  const h3 = hue(+m[2]);
  const p1 = +m[3] / 100;
  const p2 = +m[4] / 100;
  if (m[1] === "hwb") {
    v = hwb2rgb(h3, p1, p2);
  } else if (m[1] === "hsv") {
    v = hsv2rgb(h3, p1, p2);
  } else {
    v = hsl2rgb(h3, p1, p2);
  }
  return {
    r: v[0],
    g: v[1],
    b: v[2],
    a
  };
}
function rotate(v, deg) {
  var h3 = rgb2hsl(v);
  h3[0] = hue(h3[0] + deg);
  h3 = hsl2rgb(h3);
  v.r = h3[0];
  v.g = h3[1];
  v.b = h3[2];
}
function hslString(v) {
  if (!v) {
    return;
  }
  const a = rgb2hsl(v);
  const h3 = a[0];
  const s = n2p(a[1]);
  const l = n2p(a[2]);
  return v.a < 255 ? `hsla(${h3}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h3}, ${s}%, ${l}%)`;
}
const map = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
};
const names$1 = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function unpack() {
  const unpacked = {};
  const keys = Object.keys(names$1);
  const tkeys = Object.keys(map);
  let i, j, k, ok, nk;
  for (i = 0; i < keys.length; i++) {
    ok = nk = keys[i];
    for (j = 0; j < tkeys.length; j++) {
      k = tkeys[j];
      nk = nk.replace(k, map[k]);
    }
    k = parseInt(names$1[ok], 16);
    unpacked[nk] = [k >> 16 & 255, k >> 8 & 255, k & 255];
  }
  return unpacked;
}
let names;
function nameParse(str) {
  if (!names) {
    names = unpack();
    names.transparent = [0, 0, 0, 0];
  }
  const a = names[str.toLowerCase()];
  return a && {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a.length === 4 ? a[3] : 255
  };
}
const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
  const m = RGB_RE.exec(str);
  let a = 255;
  let r, g, b;
  if (!m) {
    return;
  }
  if (m[7] !== r) {
    const v = +m[7];
    a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
  }
  r = +m[1];
  g = +m[3];
  b = +m[5];
  r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
  g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
  b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
  return {
    r,
    g,
    b,
    a
  };
}
function rgbString(v) {
  return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
}
const to = (v) => v <= 31308e-7 ? v * 12.92 : Math.pow(v, 1 / 2.4) * 1.055 - 0.055;
const from = (v) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
function interpolate$1(rgb1, rgb2, t) {
  const r = from(b2n(rgb1.r));
  const g = from(b2n(rgb1.g));
  const b = from(b2n(rgb1.b));
  return {
    r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
    g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
    b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
    a: rgb1.a + t * (rgb2.a - rgb1.a)
  };
}
function modHSL(v, i, ratio) {
  if (v) {
    let tmp = rgb2hsl(v);
    tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
    tmp = hsl2rgb(tmp);
    v.r = tmp[0];
    v.g = tmp[1];
    v.b = tmp[2];
  }
}
function clone$1(v, proto) {
  return v ? Object.assign(proto || {}, v) : v;
}
function fromObject(input) {
  var v = { r: 0, g: 0, b: 0, a: 255 };
  if (Array.isArray(input)) {
    if (input.length >= 3) {
      v = { r: input[0], g: input[1], b: input[2], a: 255 };
      if (input.length > 3) {
        v.a = n2b(input[3]);
      }
    }
  } else {
    v = clone$1(input, { r: 0, g: 0, b: 0, a: 1 });
    v.a = n2b(v.a);
  }
  return v;
}
function functionParse(str) {
  if (str.charAt(0) === "r") {
    return rgbParse(str);
  }
  return hueParse(str);
}
class Color {
  constructor(input) {
    if (input instanceof Color) {
      return input;
    }
    const type = typeof input;
    let v;
    if (type === "object") {
      v = fromObject(input);
    } else if (type === "string") {
      v = hexParse(input) || nameParse(input) || functionParse(input);
    }
    this._rgb = v;
    this._valid = !!v;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var v = clone$1(this._rgb);
    if (v) {
      v.a = b2n(v.a);
    }
    return v;
  }
  set rgb(obj) {
    this._rgb = fromObject(obj);
  }
  rgbString() {
    return this._valid ? rgbString(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? hexString(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? hslString(this._rgb) : void 0;
  }
  mix(color2, weight) {
    if (color2) {
      const c1 = this.rgb;
      const c2 = color2.rgb;
      let w2;
      const p = weight === w2 ? 0.5 : weight;
      const w = 2 * p - 1;
      const a = c1.a - c2.a;
      const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
      w2 = 1 - w1;
      c1.r = 255 & w1 * c1.r + w2 * c2.r + 0.5;
      c1.g = 255 & w1 * c1.g + w2 * c2.g + 0.5;
      c1.b = 255 & w1 * c1.b + w2 * c2.b + 0.5;
      c1.a = p * c1.a + (1 - p) * c2.a;
      this.rgb = c1;
    }
    return this;
  }
  interpolate(color2, t) {
    if (color2) {
      this._rgb = interpolate$1(this._rgb, color2._rgb, t);
    }
    return this;
  }
  clone() {
    return new Color(this.rgb);
  }
  alpha(a) {
    this._rgb.a = n2b(a);
    return this;
  }
  clearer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 - ratio;
    return this;
  }
  greyscale() {
    const rgb = this._rgb;
    const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
    rgb.r = rgb.g = rgb.b = val;
    return this;
  }
  opaquer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 + ratio;
    return this;
  }
  negate() {
    const v = this._rgb;
    v.r = 255 - v.r;
    v.g = 255 - v.g;
    v.b = 255 - v.b;
    return this;
  }
  lighten(ratio) {
    modHSL(this._rgb, 2, ratio);
    return this;
  }
  darken(ratio) {
    modHSL(this._rgb, 2, -ratio);
    return this;
  }
  saturate(ratio) {
    modHSL(this._rgb, 1, ratio);
    return this;
  }
  desaturate(ratio) {
    modHSL(this._rgb, 1, -ratio);
    return this;
  }
  rotate(deg) {
    rotate(this._rgb, deg);
    return this;
  }
}
/*!
 * Chart.js v4.4.8
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
const uid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => id++;
})();
function isNullOrUndef(value) {
  return value === null || value === void 0;
}
function isArray(value) {
  if (Array.isArray && Array.isArray(value)) {
    return true;
  }
  const type = Object.prototype.toString.call(value);
  if (type.slice(0, 7) === "[object" && type.slice(-6) === "Array]") {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && Object.prototype.toString.call(value) === "[object Object]";
}
function isNumberFinite(value) {
  return (typeof value === "number" || value instanceof Number) && isFinite(+value);
}
function finiteOrDefault(value, defaultValue) {
  return isNumberFinite(value) ? value : defaultValue;
}
function valueOrDefault(value, defaultValue) {
  return typeof value === "undefined" ? defaultValue : value;
}
const toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
function callback(fn, args, thisArg) {
  if (fn && typeof fn.call === "function") {
    return fn.apply(thisArg, args);
  }
}
function each(loopable, fn, thisArg, reverse) {
  let i, len, keys;
  if (isArray(loopable)) {
    len = loopable.length;
    {
      for (i = 0; i < len; i++) {
        fn.call(thisArg, loopable[i], i);
      }
    }
  } else if (isObject(loopable)) {
    keys = Object.keys(loopable);
    len = keys.length;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, loopable[keys[i]], keys[i]);
    }
  }
}
function _elementsEqual(a0, a1) {
  let i, ilen, v0, v1;
  if (!a0 || !a1 || a0.length !== a1.length) {
    return false;
  }
  for (i = 0, ilen = a0.length; i < ilen; ++i) {
    v0 = a0[i];
    v1 = a1[i];
    if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
      return false;
    }
  }
  return true;
}
function clone(source) {
  if (isArray(source)) {
    return source.map(clone);
  }
  if (isObject(source)) {
    const target = /* @__PURE__ */ Object.create(null);
    const keys = Object.keys(source);
    const klen = keys.length;
    let k = 0;
    for (; k < klen; ++k) {
      target[keys[k]] = clone(source[keys[k]]);
    }
    return target;
  }
  return source;
}
function isValidKey(key) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(key) === -1;
}
function _merger(key, target, source, options) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    merge(tval, sval, options);
  } else {
    target[key] = clone(sval);
  }
}
function merge(target, source, options) {
  const sources = isArray(source) ? source : [
    source
  ];
  const ilen = sources.length;
  if (!isObject(target)) {
    return target;
  }
  options = options || {};
  const merger = options.merger || _merger;
  let current;
  for (let i = 0; i < ilen; ++i) {
    current = sources[i];
    if (!isObject(current)) {
      continue;
    }
    const keys = Object.keys(current);
    for (let k = 0, klen = keys.length; k < klen; ++k) {
      merger(keys[k], target, current, options);
    }
  }
  return target;
}
function mergeIf(target, source) {
  return merge(target, source, {
    merger: _mergerIf
  });
}
function _mergerIf(key, target, source) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    mergeIf(tval, sval);
  } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
    target[key] = clone(sval);
  }
}
const keyResolvers = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (v) => v,
  // default resolvers
  x: (o) => o.x,
  y: (o) => o.y
};
function _splitKey(key) {
  const parts = key.split(".");
  const keys = [];
  let tmp = "";
  for (const part of parts) {
    tmp += part;
    if (tmp.endsWith("\\")) {
      tmp = tmp.slice(0, -1) + ".";
    } else {
      keys.push(tmp);
      tmp = "";
    }
  }
  return keys;
}
function _getKeyResolver(key) {
  const keys = _splitKey(key);
  return (obj) => {
    for (const k of keys) {
      if (k === "") {
        break;
      }
      obj = obj && obj[k];
    }
    return obj;
  };
}
function resolveObjectKey(obj, key) {
  const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
  return resolver(obj);
}
function _capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const defined = (value) => typeof value !== "undefined";
const isFunction = (value) => typeof value === "function";
const setsEqual = (a, b) => {
  if (a.size !== b.size) {
    return false;
  }
  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
};
function _isClickEvent(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const PI = Math.PI;
const TAU = 2 * PI;
const PITAU = TAU + PI;
const INFINITY = Number.POSITIVE_INFINITY;
const HALF_PI = PI / 2;
const log10 = Math.log10;
const sign = Math.sign;
function almostEquals(x, y, epsilon) {
  return Math.abs(x - y) < epsilon;
}
function niceNum(range) {
  const roundedRange = Math.round(range);
  range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
  const niceRange = Math.pow(10, Math.floor(log10(range)));
  const fraction = range / niceRange;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * niceRange;
}
function _factorize(value) {
  const result = [];
  const sqrt = Math.sqrt(value);
  let i;
  for (i = 1; i < sqrt; i++) {
    if (value % i === 0) {
      result.push(i);
      result.push(value / i);
    }
  }
  if (sqrt === (sqrt | 0)) {
    result.push(sqrt);
  }
  result.sort((a, b) => a - b).pop();
  return result;
}
function isNonPrimitive(n) {
  return typeof n === "symbol" || typeof n === "object" && n !== null && !(Symbol.toPrimitive in n || "toString" in n || "valueOf" in n);
}
function isNumber(n) {
  return !isNonPrimitive(n) && !isNaN(parseFloat(n)) && isFinite(n);
}
function almostWhole(x, epsilon) {
  const rounded = Math.round(x);
  return rounded - epsilon <= x && rounded + epsilon >= x;
}
function _setMinAndMaxByKey(array, target, property) {
  let i, ilen, value;
  for (i = 0, ilen = array.length; i < ilen; i++) {
    value = array[i][property];
    if (!isNaN(value)) {
      target.min = Math.min(target.min, value);
      target.max = Math.max(target.max, value);
    }
  }
}
function toRadians(degrees) {
  return degrees * (PI / 180);
}
function toDegrees(radians) {
  return radians * (180 / PI);
}
function _decimalPlaces(x) {
  if (!isNumberFinite(x)) {
    return;
  }
  let e = 1;
  let p = 0;
  while (Math.round(x * e) / e !== x) {
    e *= 10;
    p++;
  }
  return p;
}
function getAngleFromPoint(centrePoint, anglePoint) {
  const distanceFromXCenter = anglePoint.x - centrePoint.x;
  const distanceFromYCenter = anglePoint.y - centrePoint.y;
  const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
  let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
  if (angle < -0.5 * PI) {
    angle += TAU;
  }
  return {
    angle,
    distance: radialDistanceFromCenter
  };
}
function distanceBetweenPoints(pt1, pt2) {
  return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function _angleDiff(a, b) {
  return (a - b + PITAU) % TAU - PI;
}
function _normalizeAngle(a) {
  return (a % TAU + TAU) % TAU;
}
function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
  const a = _normalizeAngle(angle);
  const s = _normalizeAngle(start);
  const e = _normalizeAngle(end);
  const angleToStart = _normalizeAngle(s - a);
  const angleToEnd = _normalizeAngle(e - a);
  const startToAngle = _normalizeAngle(a - s);
  const endToAngle = _normalizeAngle(a - e);
  return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
}
function _limitValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function _int16Range(value) {
  return _limitValue(value, -32768, 32767);
}
function _isBetween(value, start, end, epsilon = 1e-6) {
  return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}
function _lookup(table, value, cmp) {
  cmp = cmp || ((index) => table[index] < value);
  let hi = table.length - 1;
  let lo = 0;
  let mid;
  while (hi - lo > 1) {
    mid = lo + hi >> 1;
    if (cmp(mid)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return {
    lo,
    hi
  };
}
const _lookupByKey = (table, key, value, last) => _lookup(table, value, last ? (index) => {
  const ti = table[index][key];
  return ti < value || ti === value && table[index + 1][key] === value;
} : (index) => table[index][key] < value);
const _rlookupByKey = (table, key, value) => _lookup(table, value, (index) => table[index][key] >= value);
function _filterBetween(values, min, max) {
  let start = 0;
  let end = values.length;
  while (start < end && values[start] < min) {
    start++;
  }
  while (end > start && values[end - 1] > max) {
    end--;
  }
  return start > 0 || end < values.length ? values.slice(start, end) : values;
}
const arrayEvents = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function listenArrayEvents(array, listener) {
  if (array._chartjs) {
    array._chartjs.listeners.push(listener);
    return;
  }
  Object.defineProperty(array, "_chartjs", {
    configurable: true,
    enumerable: false,
    value: {
      listeners: [
        listener
      ]
    }
  });
  arrayEvents.forEach((key) => {
    const method = "_onData" + _capitalize(key);
    const base = array[key];
    Object.defineProperty(array, key, {
      configurable: true,
      enumerable: false,
      value(...args) {
        const res = base.apply(this, args);
        array._chartjs.listeners.forEach((object) => {
          if (typeof object[method] === "function") {
            object[method](...args);
          }
        });
        return res;
      }
    });
  });
}
function unlistenArrayEvents(array, listener) {
  const stub = array._chartjs;
  if (!stub) {
    return;
  }
  const listeners = stub.listeners;
  const index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners.splice(index, 1);
  }
  if (listeners.length > 0) {
    return;
  }
  arrayEvents.forEach((key) => {
    delete array[key];
  });
  delete array._chartjs;
}
function _arrayUnique(items) {
  const set2 = new Set(items);
  if (set2.size === items.length) {
    return items;
  }
  return Array.from(set2);
}
const requestAnimFrame = function() {
  if (typeof window === "undefined") {
    return function(callback2) {
      return callback2();
    };
  }
  return window.requestAnimationFrame;
}();
function throttled(fn, thisArg) {
  let argsToUse = [];
  let ticking = false;
  return function(...args) {
    argsToUse = args;
    if (!ticking) {
      ticking = true;
      requestAnimFrame.call(window, () => {
        ticking = false;
        fn.apply(thisArg, argsToUse);
      });
    }
  };
}
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    if (delay) {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay, args);
    } else {
      fn.apply(this, args);
    }
    return delay;
  };
}
const _toLeftRightCenter = (align) => align === "start" ? "left" : align === "end" ? "right" : "center";
const _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
  const pointCount = points.length;
  let start = 0;
  let count = pointCount;
  if (meta._sorted) {
    const { iScale, vScale, _parsed } = meta;
    const spanGaps = meta.dataset ? meta.dataset.options ? meta.dataset.options.spanGaps : null : null;
    const axis = iScale.axis;
    const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
    if (minDefined) {
      start = Math.min(
        // @ts-expect-error Need to type _parsed
        _lookupByKey(_parsed, axis, min).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo
      );
      if (spanGaps) {
        const distanceToDefinedLo = _parsed.slice(0, start + 1).reverse().findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        start -= Math.max(0, distanceToDefinedLo);
      }
      start = _limitValue(start, 0, pointCount - 1);
    }
    if (maxDefined) {
      let end = Math.max(
        // @ts-expect-error Need to type _parsed
        _lookupByKey(_parsed, iScale.axis, max, true).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1
      );
      if (spanGaps) {
        const distanceToDefinedHi = _parsed.slice(end - 1).findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        end += Math.max(0, distanceToDefinedHi);
      }
      count = _limitValue(end, start, pointCount) - start;
    } else {
      count = pointCount - start;
    }
  }
  return {
    start,
    count
  };
}
function _scaleRangesChanged(meta) {
  const { xScale, yScale, _scaleRanges } = meta;
  const newRanges = {
    xmin: xScale.min,
    xmax: xScale.max,
    ymin: yScale.min,
    ymax: yScale.max
  };
  if (!_scaleRanges) {
    meta._scaleRanges = newRanges;
    return true;
  }
  const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
  Object.assign(_scaleRanges, newRanges);
  return changed;
}
const atEdge = (t) => t === 0 || t === 1;
const elasticIn = (t, s, p) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p));
const elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
const effects = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => -t * (t - 2),
  easeInOutQuad: (t) => (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (t -= 1) * t * t + 1,
  easeInOutCubic: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
  easeInOutQuart: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
  easeInOutQuint: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
  easeInSine: (t) => -Math.cos(t * HALF_PI) + 1,
  easeOutSine: (t) => Math.sin(t * HALF_PI),
  easeInOutSine: (t) => -0.5 * (Math.cos(PI * t) - 1),
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
  easeInOutExpo: (t) => atEdge(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => atEdge(t) ? t : elasticIn(t, 0.075, 0.3),
  easeOutElastic: (t) => atEdge(t) ? t : elasticOut(t, 0.075, 0.3),
  easeInOutElastic(t) {
    const s = 0.1125;
    const p = 0.45;
    return atEdge(t) ? t : t < 0.5 ? 0.5 * elasticIn(t * 2, s, p) : 0.5 + 0.5 * elasticOut(t * 2 - 1, s, p);
  },
  easeInBack(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
  },
  easeOutBack(t) {
    const s = 1.70158;
    return (t -= 1) * t * ((s + 1) * t + s) + 1;
  },
  easeInOutBack(t) {
    let s = 1.70158;
    if ((t /= 0.5) < 1) {
      return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
    }
    return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
  },
  easeInBounce: (t) => 1 - effects.easeOutBounce(1 - t),
  easeOutBounce(t) {
    const m = 7.5625;
    const d = 2.75;
    if (t < 1 / d) {
      return m * t * t;
    }
    if (t < 2 / d) {
      return m * (t -= 1.5 / d) * t + 0.75;
    }
    if (t < 2.5 / d) {
      return m * (t -= 2.25 / d) * t + 0.9375;
    }
    return m * (t -= 2.625 / d) * t + 0.984375;
  },
  easeInOutBounce: (t) => t < 0.5 ? effects.easeInBounce(t * 2) * 0.5 : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};
function isPatternOrGradient(value) {
  if (value && typeof value === "object") {
    const type = value.toString();
    return type === "[object CanvasPattern]" || type === "[object CanvasGradient]";
  }
  return false;
}
function color(value) {
  return isPatternOrGradient(value) ? value : new Color(value);
}
function getHoverColor(value) {
  return isPatternOrGradient(value) ? value : new Color(value).saturate(0.5).darken(0.1).hexString();
}
const numbers = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
];
const colors = [
  "color",
  "borderColor",
  "backgroundColor"
];
function applyAnimationsDefaults(defaults2) {
  defaults2.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  });
  defaults2.describe("animation", {
    _fallback: false,
    _indexable: false,
    _scriptable: (name) => name !== "onProgress" && name !== "onComplete" && name !== "fn"
  });
  defaults2.set("animations", {
    colors: {
      type: "color",
      properties: colors
    },
    numbers: {
      type: "number",
      properties: numbers
    }
  });
  defaults2.describe("animations", {
    _fallback: "animation"
  });
  defaults2.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (v) => v | 0
        }
      }
    }
  });
}
function applyLayoutsDefaults(defaults2) {
  defaults2.set("layout", {
    autoPadding: true,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const intlCache = /* @__PURE__ */ new Map();
function getNumberFormat(locale, options) {
  options = options || {};
  const cacheKey = locale + JSON.stringify(options);
  let formatter = intlCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    intlCache.set(cacheKey, formatter);
  }
  return formatter;
}
function formatNumber(num, locale, options) {
  return getNumberFormat(locale, options).format(num);
}
const formatters = {
  values(value) {
    return isArray(value) ? value : "" + value;
  },
  numeric(tickValue, index, ticks) {
    if (tickValue === 0) {
      return "0";
    }
    const locale = this.chart.options.locale;
    let notation;
    let delta = tickValue;
    if (ticks.length > 1) {
      const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
      if (maxTick < 1e-4 || maxTick > 1e15) {
        notation = "scientific";
      }
      delta = calculateDelta(tickValue, ticks);
    }
    const logDelta = log10(Math.abs(delta));
    const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
    const options = {
      notation,
      minimumFractionDigits: numDecimal,
      maximumFractionDigits: numDecimal
    };
    Object.assign(options, this.options.ticks.format);
    return formatNumber(tickValue, locale, options);
  }
};
function calculateDelta(tickValue, ticks) {
  let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
  if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
    delta = tickValue - Math.floor(tickValue);
  }
  return delta;
}
var Ticks = {
  formatters
};
function applyScaleDefaults(defaults2) {
  defaults2.set("scale", {
    display: true,
    offset: false,
    reverse: false,
    beginAtZero: false,
    bounds: "ticks",
    clip: true,
    grace: 0,
    grid: {
      display: true,
      lineWidth: 1,
      drawOnChartArea: true,
      drawTicks: true,
      tickLength: 8,
      tickWidth: (_ctx, options) => options.lineWidth,
      tickColor: (_ctx, options) => options.color,
      offset: false
    },
    border: {
      display: true,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: false,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: false,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: true,
      autoSkip: true,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ticks.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: false,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  });
  defaults2.route("scale.ticks", "color", "", "color");
  defaults2.route("scale.grid", "color", "", "borderColor");
  defaults2.route("scale.border", "color", "", "borderColor");
  defaults2.route("scale.title", "color", "", "color");
  defaults2.describe("scale", {
    _fallback: false,
    _scriptable: (name) => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
    _indexable: (name) => name !== "borderDash" && name !== "tickBorderDash" && name !== "dash"
  });
  defaults2.describe("scales", {
    _fallback: "scale"
  });
  defaults2.describe("scale.ticks", {
    _scriptable: (name) => name !== "backdropPadding" && name !== "callback",
    _indexable: (name) => name !== "backdropPadding"
  });
}
const overrides = /* @__PURE__ */ Object.create(null);
const descriptors = /* @__PURE__ */ Object.create(null);
function getScope$1(node, key) {
  if (!key) {
    return node;
  }
  const keys = key.split(".");
  for (let i = 0, n = keys.length; i < n; ++i) {
    const k = keys[i];
    node = node[k] || (node[k] = /* @__PURE__ */ Object.create(null));
  }
  return node;
}
function set(root, scope, values) {
  if (typeof scope === "string") {
    return merge(getScope$1(root, scope), values);
  }
  return merge(getScope$1(root, ""), scope);
}
class Defaults {
  constructor(_descriptors2, _appliers) {
    this.animation = void 0;
    this.backgroundColor = "rgba(0,0,0,0.1)";
    this.borderColor = "rgba(0,0,0,0.1)";
    this.color = "#666";
    this.datasets = {};
    this.devicePixelRatio = (context) => context.chart.platform.getDevicePixelRatio();
    this.elements = {};
    this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ];
    this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    };
    this.hover = {};
    this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
    this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
    this.hoverColor = (ctx, options) => getHoverColor(options.color);
    this.indexAxis = "x";
    this.interaction = {
      mode: "nearest",
      intersect: true,
      includeInvisible: false
    };
    this.maintainAspectRatio = true;
    this.onHover = null;
    this.onClick = null;
    this.parsing = true;
    this.plugins = {};
    this.responsive = true;
    this.scale = void 0;
    this.scales = {};
    this.showLine = true;
    this.drawActiveElementsOnTop = true;
    this.describe(_descriptors2);
    this.apply(_appliers);
  }
  set(scope, values) {
    return set(this, scope, values);
  }
  get(scope) {
    return getScope$1(this, scope);
  }
  describe(scope, values) {
    return set(descriptors, scope, values);
  }
  override(scope, values) {
    return set(overrides, scope, values);
  }
  route(scope, name, targetScope, targetName) {
    const scopeObject = getScope$1(this, scope);
    const targetScopeObject = getScope$1(this, targetScope);
    const privateName = "_" + name;
    Object.defineProperties(scopeObject, {
      [privateName]: {
        value: scopeObject[name],
        writable: true
      },
      [name]: {
        enumerable: true,
        get() {
          const local = this[privateName];
          const target = targetScopeObject[targetName];
          if (isObject(local)) {
            return Object.assign({}, target, local);
          }
          return valueOrDefault(local, target);
        },
        set(value) {
          this[privateName] = value;
        }
      }
    });
  }
  apply(appliers) {
    appliers.forEach((apply) => apply(this));
  }
}
var defaults = /* @__PURE__ */ new Defaults({
  _scriptable: (name) => !name.startsWith("on"),
  _indexable: (name) => name !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: false,
    _indexable: false
  }
}, [
  applyAnimationsDefaults,
  applyLayoutsDefaults,
  applyScaleDefaults
]);
function toFontString(font) {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return null;
  }
  return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
}
function _measureText(ctx, data, gc, longest, string) {
  let textWidth = data[string];
  if (!textWidth) {
    textWidth = data[string] = ctx.measureText(string).width;
    gc.push(string);
  }
  if (textWidth > longest) {
    longest = textWidth;
  }
  return longest;
}
function _alignPixel(chart, pixel, width) {
  const devicePixelRatio = chart.currentDevicePixelRatio;
  const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
  return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
function clearCanvas(canvas, ctx) {
  if (!ctx && !canvas) {
    return;
  }
  ctx = ctx || canvas.getContext("2d");
  ctx.save();
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
function _isPointInArea(point, area, margin) {
  margin = margin || 0.5;
  return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
}
function clipArea(ctx, area) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
  ctx.clip();
}
function unclipArea(ctx) {
  ctx.restore();
}
function _steppedLineTo(ctx, previous, target, flip, mode) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  if (mode === "middle") {
    const midpoint = (previous.x + target.x) / 2;
    ctx.lineTo(midpoint, previous.y);
    ctx.lineTo(midpoint, target.y);
  } else if (mode === "after" !== !!flip) {
    ctx.lineTo(previous.x, target.y);
  } else {
    ctx.lineTo(target.x, previous.y);
  }
  ctx.lineTo(target.x, target.y);
}
function _bezierCurveTo(ctx, previous, target, flip) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
}
function setRenderOpts(ctx, opts) {
  if (opts.translation) {
    ctx.translate(opts.translation[0], opts.translation[1]);
  }
  if (!isNullOrUndef(opts.rotation)) {
    ctx.rotate(opts.rotation);
  }
  if (opts.color) {
    ctx.fillStyle = opts.color;
  }
  if (opts.textAlign) {
    ctx.textAlign = opts.textAlign;
  }
  if (opts.textBaseline) {
    ctx.textBaseline = opts.textBaseline;
  }
}
function decorateText(ctx, x, y, line, opts) {
  if (opts.strikethrough || opts.underline) {
    const metrics = ctx.measureText(line);
    const left = x - metrics.actualBoundingBoxLeft;
    const right = x + metrics.actualBoundingBoxRight;
    const top = y - metrics.actualBoundingBoxAscent;
    const bottom = y + metrics.actualBoundingBoxDescent;
    const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.lineWidth = opts.decorationWidth || 2;
    ctx.moveTo(left, yDecoration);
    ctx.lineTo(right, yDecoration);
    ctx.stroke();
  }
}
function drawBackdrop(ctx, opts) {
  const oldColor = ctx.fillStyle;
  ctx.fillStyle = opts.color;
  ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
  ctx.fillStyle = oldColor;
}
function renderText(ctx, text, x, y, font, opts = {}) {
  const lines = isArray(text) ? text : [
    text
  ];
  const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
  let i, line;
  ctx.save();
  ctx.font = font.string;
  setRenderOpts(ctx, opts);
  for (i = 0; i < lines.length; ++i) {
    line = lines[i];
    if (opts.backdrop) {
      drawBackdrop(ctx, opts.backdrop);
    }
    if (stroke) {
      if (opts.strokeColor) {
        ctx.strokeStyle = opts.strokeColor;
      }
      if (!isNullOrUndef(opts.strokeWidth)) {
        ctx.lineWidth = opts.strokeWidth;
      }
      ctx.strokeText(line, x, y, opts.maxWidth);
    }
    ctx.fillText(line, x, y, opts.maxWidth);
    decorateText(ctx, x, y, line, opts);
    y += Number(font.lineHeight);
  }
  ctx.restore();
}
const LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
const FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function toLineHeight(value, size) {
  const matches = ("" + value).match(LINE_HEIGHT);
  if (!matches || matches[1] === "normal") {
    return size * 1.2;
  }
  value = +matches[2];
  switch (matches[3]) {
    case "px":
      return value;
    case "%":
      value /= 100;
      break;
  }
  return size * value;
}
const numberOrZero = (v) => +v || 0;
function _readValueToProps(value, props) {
  const ret = {};
  const objProps = isObject(props);
  const keys = objProps ? Object.keys(props) : props;
  const read = isObject(value) ? objProps ? (prop) => valueOrDefault(value[prop], value[props[prop]]) : (prop) => value[prop] : () => value;
  for (const prop of keys) {
    ret[prop] = numberOrZero(read(prop));
  }
  return ret;
}
function toTRBL(value) {
  return _readValueToProps(value, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function toPadding(value) {
  const obj = toTRBL(value);
  obj.width = obj.left + obj.right;
  obj.height = obj.top + obj.bottom;
  return obj;
}
function toFont(options, fallback) {
  options = options || {};
  fallback = fallback || defaults.font;
  let size = valueOrDefault(options.size, fallback.size);
  if (typeof size === "string") {
    size = parseInt(size, 10);
  }
  let style = valueOrDefault(options.style, fallback.style);
  if (style && !("" + style).match(FONT_STYLE)) {
    console.warn('Invalid font style specified: "' + style + '"');
    style = void 0;
  }
  const font = {
    family: valueOrDefault(options.family, fallback.family),
    lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
    size,
    style,
    weight: valueOrDefault(options.weight, fallback.weight),
    string: ""
  };
  font.string = toFontString(font);
  return font;
}
function resolve(inputs, context, index, info) {
  let i, ilen, value;
  for (i = 0, ilen = inputs.length; i < ilen; ++i) {
    value = inputs[i];
    if (value === void 0) {
      continue;
    }
    if (value !== void 0) {
      return value;
    }
  }
}
function _addGrace(minmax, grace, beginAtZero) {
  const { min, max } = minmax;
  const change = toDimension(grace, (max - min) / 2);
  const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
  return {
    min: keepZero(min, -Math.abs(change)),
    max: keepZero(max, change)
  };
}
function createContext(parentContext, context) {
  return Object.assign(Object.create(parentContext), context);
}
function _createResolver(scopes, prefixes = [
  ""
], rootScopes, fallback, getTarget = () => scopes[0]) {
  const finalRootScopes = rootScopes || scopes;
  if (typeof fallback === "undefined") {
    fallback = _resolve("_fallback", scopes);
  }
  const cache = {
    [Symbol.toStringTag]: "Object",
    _cacheable: true,
    _scopes: scopes,
    _rootScopes: finalRootScopes,
    _fallback: fallback,
    _getTarget: getTarget,
    override: (scope) => _createResolver([
      scope,
      ...scopes
    ], prefixes, finalRootScopes, fallback)
  };
  return new Proxy(cache, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(target, prop) {
      delete target[prop];
      delete target._keys;
      delete scopes[0][prop];
      return true;
    },
    /**
    * A trap for getting property values.
    */
    get(target, prop) {
      return _cached(target, prop, () => _resolveWithPrefixes(prop, prefixes, scopes, target));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(scopes[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(target, prop) {
      return getKeysFromAllScopes(target).includes(prop);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(target) {
      return getKeysFromAllScopes(target);
    },
    /**
    * A trap for setting property values.
    */
    set(target, prop, value) {
      const storage = target._storage || (target._storage = getTarget());
      target[prop] = storage[prop] = value;
      delete target._keys;
      return true;
    }
  });
}
function _attachContext(proxy, context, subProxy, descriptorDefaults) {
  const cache = {
    _cacheable: false,
    _proxy: proxy,
    _context: context,
    _subProxy: subProxy,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: _descriptors(proxy, descriptorDefaults),
    setContext: (ctx) => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
    override: (scope) => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
  };
  return new Proxy(cache, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(target, prop) {
      delete target[prop];
      delete proxy[prop];
      return true;
    },
    /**
    * A trap for getting property values.
    */
    get(target, prop, receiver) {
      return _cached(target, prop, () => _resolveWithContext(target, prop, receiver));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(target, prop) {
      return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
        enumerable: true,
        configurable: true
      } : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(proxy);
    },
    /**
    * A trap for the in operator.
    */
    has(target, prop) {
      return Reflect.has(proxy, prop);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(proxy);
    },
    /**
    * A trap for setting property values.
    */
    set(target, prop, value) {
      proxy[prop] = value;
      delete target[prop];
      return true;
    }
  });
}
function _descriptors(proxy, defaults2 = {
  scriptable: true,
  indexable: true
}) {
  const { _scriptable = defaults2.scriptable, _indexable = defaults2.indexable, _allKeys = defaults2.allKeys } = proxy;
  return {
    allKeys: _allKeys,
    scriptable: _scriptable,
    indexable: _indexable,
    isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
    isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
  };
}
const readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
const needsSubResolver = (prop, value) => isObject(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
function _cached(target, prop, resolve2) {
  if (Object.prototype.hasOwnProperty.call(target, prop) || prop === "constructor") {
    return target[prop];
  }
  const value = resolve2();
  target[prop] = value;
  return value;
}
function _resolveWithContext(target, prop, receiver) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  let value = _proxy[prop];
  if (isFunction(value) && descriptors2.isScriptable(prop)) {
    value = _resolveScriptable(prop, value, target, receiver);
  }
  if (isArray(value) && value.length) {
    value = _resolveArray(prop, value, target, descriptors2.isIndexable);
  }
  if (needsSubResolver(prop, value)) {
    value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors2);
  }
  return value;
}
function _resolveScriptable(prop, getValue, target, receiver) {
  const { _proxy, _context, _subProxy, _stack } = target;
  if (_stack.has(prop)) {
    throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
  }
  _stack.add(prop);
  let value = getValue(_context, _subProxy || receiver);
  _stack.delete(prop);
  if (needsSubResolver(prop, value)) {
    value = createSubResolver(_proxy._scopes, _proxy, prop, value);
  }
  return value;
}
function _resolveArray(prop, value, target, isIndexable) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  if (typeof _context.index !== "undefined" && isIndexable(prop)) {
    return value[_context.index % value.length];
  } else if (isObject(value[0])) {
    const arr = value;
    const scopes = _proxy._scopes.filter((s) => s !== arr);
    value = [];
    for (const item of arr) {
      const resolver = createSubResolver(scopes, _proxy, prop, item);
      value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors2));
    }
  }
  return value;
}
function resolveFallback(fallback, prop, value) {
  return isFunction(fallback) ? fallback(prop, value) : fallback;
}
const getScope = (key, parent) => key === true ? parent : typeof key === "string" ? resolveObjectKey(parent, key) : void 0;
function addScopes(set2, parentScopes, key, parentFallback, value) {
  for (const parent of parentScopes) {
    const scope = getScope(key, parent);
    if (scope) {
      set2.add(scope);
      const fallback = resolveFallback(scope._fallback, key, value);
      if (typeof fallback !== "undefined" && fallback !== key && fallback !== parentFallback) {
        return fallback;
      }
    } else if (scope === false && typeof parentFallback !== "undefined" && key !== parentFallback) {
      return null;
    }
  }
  return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
  const rootScopes = resolver._rootScopes;
  const fallback = resolveFallback(resolver._fallback, prop, value);
  const allScopes = [
    ...parentScopes,
    ...rootScopes
  ];
  const set2 = /* @__PURE__ */ new Set();
  set2.add(value);
  let key = addScopesFromKey(set2, allScopes, prop, fallback || prop, value);
  if (key === null) {
    return false;
  }
  if (typeof fallback !== "undefined" && fallback !== prop) {
    key = addScopesFromKey(set2, allScopes, fallback, key, value);
    if (key === null) {
      return false;
    }
  }
  return _createResolver(Array.from(set2), [
    ""
  ], rootScopes, fallback, () => subGetTarget(resolver, prop, value));
}
function addScopesFromKey(set2, allScopes, key, fallback, item) {
  while (key) {
    key = addScopes(set2, allScopes, key, fallback, item);
  }
  return key;
}
function subGetTarget(resolver, prop, value) {
  const parent = resolver._getTarget();
  if (!(prop in parent)) {
    parent[prop] = {};
  }
  const target = parent[prop];
  if (isArray(target) && isObject(value)) {
    return value;
  }
  return target || {};
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
  let value;
  for (const prefix of prefixes) {
    value = _resolve(readKey(prefix, prop), scopes);
    if (typeof value !== "undefined") {
      return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
    }
  }
}
function _resolve(key, scopes) {
  for (const scope of scopes) {
    if (!scope) {
      continue;
    }
    const value = scope[key];
    if (typeof value !== "undefined") {
      return value;
    }
  }
}
function getKeysFromAllScopes(target) {
  let keys = target._keys;
  if (!keys) {
    keys = target._keys = resolveKeysFromAllScopes(target._scopes);
  }
  return keys;
}
function resolveKeysFromAllScopes(scopes) {
  const set2 = /* @__PURE__ */ new Set();
  for (const scope of scopes) {
    for (const key of Object.keys(scope).filter((k) => !k.startsWith("_"))) {
      set2.add(key);
    }
  }
  return Array.from(set2);
}
const EPSILON = Number.EPSILON || 1e-14;
const getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
const getValueAxis = (indexAxis) => indexAxis === "x" ? "y" : "x";
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
  const previous = firstPoint.skip ? middlePoint : firstPoint;
  const current = middlePoint;
  const next = afterPoint.skip ? middlePoint : afterPoint;
  const d01 = distanceBetweenPoints(current, previous);
  const d12 = distanceBetweenPoints(next, current);
  let s01 = d01 / (d01 + d12);
  let s12 = d12 / (d01 + d12);
  s01 = isNaN(s01) ? 0 : s01;
  s12 = isNaN(s12) ? 0 : s12;
  const fa = t * s01;
  const fb = t * s12;
  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y)
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y)
    }
  };
}
function monotoneAdjust(points, deltaK, mK) {
  const pointsLen = points.length;
  let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i = 0; i < pointsLen - 1; ++i) {
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent || !pointAfter) {
      continue;
    }
    if (almostEquals(deltaK[i], 0, EPSILON)) {
      mK[i] = mK[i + 1] = 0;
      continue;
    }
    alphaK = mK[i] / deltaK[i];
    betaK = mK[i + 1] / deltaK[i];
    squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
    if (squaredMagnitude <= 9) {
      continue;
    }
    tauK = 3 / Math.sqrt(squaredMagnitude);
    mK[i] = alphaK * tauK * deltaK[i];
    mK[i + 1] = betaK * tauK * deltaK[i];
  }
}
function monotoneCompute(points, mK, indexAxis = "x") {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  let delta, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i = 0; i < pointsLen; ++i) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent) {
      continue;
    }
    const iPixel = pointCurrent[indexAxis];
    const vPixel = pointCurrent[valueAxis];
    if (pointBefore) {
      delta = (iPixel - pointBefore[indexAxis]) / 3;
      pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
      pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
    }
    if (pointAfter) {
      delta = (pointAfter[indexAxis] - iPixel) / 3;
      pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
      pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
    }
  }
}
function splineCurveMonotone(points, indexAxis = "x") {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  const deltaK = Array(pointsLen).fill(0);
  const mK = Array(pointsLen);
  let i, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (i = 0; i < pointsLen; ++i) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent) {
      continue;
    }
    if (pointAfter) {
      const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
      deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
    }
    mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
  }
  monotoneAdjust(points, deltaK, mK);
  monotoneCompute(points, mK, indexAxis);
}
function capControlPoint(pt, min, max) {
  return Math.max(Math.min(pt, max), min);
}
function capBezierPoints(points, area) {
  let i, ilen, point, inArea, inAreaPrev;
  let inAreaNext = _isPointInArea(points[0], area);
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    inAreaPrev = inArea;
    inArea = inAreaNext;
    inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
    if (!inArea) {
      continue;
    }
    point = points[i];
    if (inAreaPrev) {
      point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
      point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
    }
    if (inAreaNext) {
      point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
      point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
    }
  }
}
function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
  let i, ilen, point, controlPoints;
  if (options.spanGaps) {
    points = points.filter((pt) => !pt.skip);
  }
  if (options.cubicInterpolationMode === "monotone") {
    splineCurveMonotone(points, indexAxis);
  } else {
    let prev = loop ? points[points.length - 1] : points[0];
    for (i = 0, ilen = points.length; i < ilen; ++i) {
      point = points[i];
      controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
      point.cp1x = controlPoints.previous.x;
      point.cp1y = controlPoints.previous.y;
      point.cp2x = controlPoints.next.x;
      point.cp2y = controlPoints.next.y;
      prev = point;
    }
  }
  if (options.capBezierPoints) {
    capBezierPoints(points, area);
  }
}
function _isDomSupported() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function _getParentNode(domNode) {
  let parent = domNode.parentNode;
  if (parent && parent.toString() === "[object ShadowRoot]") {
    parent = parent.host;
  }
  return parent;
}
function parseMaxStyle(styleValue, node, parentProperty) {
  let valueInPixels;
  if (typeof styleValue === "string") {
    valueInPixels = parseInt(styleValue, 10);
    if (styleValue.indexOf("%") !== -1) {
      valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
    }
  } else {
    valueInPixels = styleValue;
  }
  return valueInPixels;
}
const getComputedStyle = (element) => element.ownerDocument.defaultView.getComputedStyle(element, null);
function getStyle(el, property) {
  return getComputedStyle(el).getPropertyValue(property);
}
const positions = [
  "top",
  "right",
  "bottom",
  "left"
];
function getPositionedStyle(styles, style, suffix) {
  const result = {};
  suffix = suffix ? "-" + suffix : "";
  for (let i = 0; i < 4; i++) {
    const pos = positions[i];
    result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
  }
  result.width = result.left + result.right;
  result.height = result.top + result.bottom;
  return result;
}
const useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
function getCanvasPosition(e, canvas) {
  const touches = e.touches;
  const source = touches && touches.length ? touches[0] : e;
  const { offsetX, offsetY } = source;
  let box = false;
  let x, y;
  if (useOffsetPos(offsetX, offsetY, e.target)) {
    x = offsetX;
    y = offsetY;
  } else {
    const rect = canvas.getBoundingClientRect();
    x = source.clientX - rect.left;
    y = source.clientY - rect.top;
    box = true;
  }
  return {
    x,
    y,
    box
  };
}
function getRelativePosition(event, chart) {
  if ("native" in event) {
    return event;
  }
  const { canvas, currentDevicePixelRatio } = chart;
  const style = getComputedStyle(canvas);
  const borderBox = style.boxSizing === "border-box";
  const paddings = getPositionedStyle(style, "padding");
  const borders = getPositionedStyle(style, "border", "width");
  const { x, y, box } = getCanvasPosition(event, canvas);
  const xOffset = paddings.left + (box && borders.left);
  const yOffset = paddings.top + (box && borders.top);
  let { width, height } = chart;
  if (borderBox) {
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  return {
    x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
    y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
  };
}
function getContainerSize(canvas, width, height) {
  let maxWidth, maxHeight;
  if (width === void 0 || height === void 0) {
    const container = canvas && _getParentNode(canvas);
    if (!container) {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
    } else {
      const rect = container.getBoundingClientRect();
      const containerStyle = getComputedStyle(container);
      const containerBorder = getPositionedStyle(containerStyle, "border", "width");
      const containerPadding = getPositionedStyle(containerStyle, "padding");
      width = rect.width - containerPadding.width - containerBorder.width;
      height = rect.height - containerPadding.height - containerBorder.height;
      maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
      maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
    }
  }
  return {
    width,
    height,
    maxWidth: maxWidth || INFINITY,
    maxHeight: maxHeight || INFINITY
  };
}
const round1 = (v) => Math.round(v * 10) / 10;
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
  const style = getComputedStyle(canvas);
  const margins = getPositionedStyle(style, "margin");
  const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
  const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
  const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
  let { width, height } = containerSize;
  if (style.boxSizing === "content-box") {
    const borders = getPositionedStyle(style, "border", "width");
    const paddings = getPositionedStyle(style, "padding");
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  width = Math.max(0, width - margins.width);
  height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
  width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
  height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
  if (width && !height) {
    height = round1(width / 2);
  }
  const maintainHeight = bbWidth !== void 0 || bbHeight !== void 0;
  if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
    height = containerSize.height;
    width = round1(Math.floor(height * aspectRatio));
  }
  return {
    width,
    height
  };
}
function retinaScale(chart, forceRatio, forceStyle) {
  const pixelRatio = forceRatio || 1;
  const deviceHeight = Math.floor(chart.height * pixelRatio);
  const deviceWidth = Math.floor(chart.width * pixelRatio);
  chart.height = Math.floor(chart.height);
  chart.width = Math.floor(chart.width);
  const canvas = chart.canvas;
  if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
    canvas.style.height = `${chart.height}px`;
    canvas.style.width = `${chart.width}px`;
  }
  if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
    chart.currentDevicePixelRatio = pixelRatio;
    canvas.height = deviceHeight;
    canvas.width = deviceWidth;
    chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return true;
  }
  return false;
}
const supportsEventListenerOptions = function() {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    if (_isDomSupported()) {
      window.addEventListener("test", null, options);
      window.removeEventListener("test", null, options);
    }
  } catch (e) {
  }
  return passiveSupported;
}();
function readUsedSize(element, property) {
  const value = getStyle(element, property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : void 0;
}
function _pointInLine(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y)
  };
}
function _steppedInterpolation(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: mode === "middle" ? t < 0.5 ? p1.y : p2.y : mode === "after" ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
  };
}
function _bezierInterpolation(p1, p2, t, mode) {
  const cp1 = {
    x: p1.cp2x,
    y: p1.cp2y
  };
  const cp2 = {
    x: p2.cp1x,
    y: p2.cp1y
  };
  const a = _pointInLine(p1, cp1, t);
  const b = _pointInLine(cp1, cp2, t);
  const c = _pointInLine(cp2, p2, t);
  const d = _pointInLine(a, b, t);
  const e = _pointInLine(b, c, t);
  return _pointInLine(d, e, t);
}
function propertyFn(property) {
  if (property === "angle") {
    return {
      between: _angleBetween,
      compare: _angleDiff,
      normalize: _normalizeAngle
    };
  }
  return {
    between: _isBetween,
    compare: (a, b) => a - b,
    normalize: (x) => x
  };
}
function normalizeSegment({ start, end, count, loop, style }) {
  return {
    start: start % count,
    end: end % count,
    loop: loop && (end - start + 1) % count === 0,
    style
  };
}
function getSegment(segment, points, bounds) {
  const { property, start: startBound, end: endBound } = bounds;
  const { between, normalize } = propertyFn(property);
  const count = points.length;
  let { start, end, loop } = segment;
  let i, ilen;
  if (loop) {
    start += count;
    end += count;
    for (i = 0, ilen = count; i < ilen; ++i) {
      if (!between(normalize(points[start % count][property]), startBound, endBound)) {
        break;
      }
      start--;
      end--;
    }
    start %= count;
    end %= count;
  }
  if (end < start) {
    end += count;
  }
  return {
    start,
    end,
    loop,
    style: segment.style
  };
}
function _boundSegment(segment, points, bounds) {
  if (!bounds) {
    return [
      segment
    ];
  }
  const { property, start: startBound, end: endBound } = bounds;
  const count = points.length;
  const { compare, between, normalize } = propertyFn(property);
  const { start, end, loop, style } = getSegment(segment, points, bounds);
  const result = [];
  let inside = false;
  let subStart = null;
  let value, point, prevValue;
  const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
  const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
  const shouldStart = () => inside || startIsBefore();
  const shouldStop = () => !inside || endIsBefore();
  for (let i = start, prev = start; i <= end; ++i) {
    point = points[i % count];
    if (point.skip) {
      continue;
    }
    value = normalize(point[property]);
    if (value === prevValue) {
      continue;
    }
    inside = between(value, startBound, endBound);
    if (subStart === null && shouldStart()) {
      subStart = compare(value, startBound) === 0 ? i : prev;
    }
    if (subStart !== null && shouldStop()) {
      result.push(normalizeSegment({
        start: subStart,
        end: i,
        loop,
        count,
        style
      }));
      subStart = null;
    }
    prev = i;
    prevValue = value;
  }
  if (subStart !== null) {
    result.push(normalizeSegment({
      start: subStart,
      end,
      loop,
      count,
      style
    }));
  }
  return result;
}
function _boundSegments(line, bounds) {
  const result = [];
  const segments = line.segments;
  for (let i = 0; i < segments.length; i++) {
    const sub = _boundSegment(segments[i], line.points, bounds);
    if (sub.length) {
      result.push(...sub);
    }
  }
  return result;
}
function findStartAndEnd(points, count, loop, spanGaps) {
  let start = 0;
  let end = count - 1;
  if (loop && !spanGaps) {
    while (start < count && !points[start].skip) {
      start++;
    }
  }
  while (start < count && points[start].skip) {
    start++;
  }
  start %= count;
  if (loop) {
    end += start;
  }
  while (end > start && points[end % count].skip) {
    end--;
  }
  end %= count;
  return {
    start,
    end
  };
}
function solidSegments(points, start, max, loop) {
  const count = points.length;
  const result = [];
  let last = start;
  let prev = points[start];
  let end;
  for (end = start + 1; end <= max; ++end) {
    const cur = points[end % count];
    if (cur.skip || cur.stop) {
      if (!prev.skip) {
        loop = false;
        result.push({
          start: start % count,
          end: (end - 1) % count,
          loop
        });
        start = last = cur.stop ? end : null;
      }
    } else {
      last = end;
      if (prev.skip) {
        start = end;
      }
    }
    prev = cur;
  }
  if (last !== null) {
    result.push({
      start: start % count,
      end: last % count,
      loop
    });
  }
  return result;
}
function _computeSegments(line, segmentOptions) {
  const points = line.points;
  const spanGaps = line.options.spanGaps;
  const count = points.length;
  if (!count) {
    return [];
  }
  const loop = !!line._loop;
  const { start, end } = findStartAndEnd(points, count, loop, spanGaps);
  if (spanGaps === true) {
    return splitByStyles(line, [
      {
        start,
        end,
        loop
      }
    ], points, segmentOptions);
  }
  const max = end < start ? end + count : end;
  const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
  return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
}
function splitByStyles(line, segments, points, segmentOptions) {
  if (!segmentOptions || !segmentOptions.setContext || !points) {
    return segments;
  }
  return doSplitByStyles(line, segments, points, segmentOptions);
}
function doSplitByStyles(line, segments, points, segmentOptions) {
  const chartContext = line._chart.getContext();
  const baseStyle = readStyle(line.options);
  const { _datasetIndex: datasetIndex, options: { spanGaps } } = line;
  const count = points.length;
  const result = [];
  let prevStyle = baseStyle;
  let start = segments[0].start;
  let i = start;
  function addStyle(s, e, l, st) {
    const dir = spanGaps ? -1 : 1;
    if (s === e) {
      return;
    }
    s += count;
    while (points[s % count].skip) {
      s -= dir;
    }
    while (points[e % count].skip) {
      e += dir;
    }
    if (s % count !== e % count) {
      result.push({
        start: s % count,
        end: e % count,
        loop: l,
        style: st
      });
      prevStyle = st;
      start = e % count;
    }
  }
  for (const segment of segments) {
    start = spanGaps ? start : segment.start;
    let prev = points[start % count];
    let style;
    for (i = start + 1; i <= segment.end; i++) {
      const pt = points[i % count];
      style = readStyle(segmentOptions.setContext(createContext(chartContext, {
        type: "segment",
        p0: prev,
        p1: pt,
        p0DataIndex: (i - 1) % count,
        p1DataIndex: i % count,
        datasetIndex
      })));
      if (styleChanged(style, prevStyle)) {
        addStyle(start, i - 1, segment.loop, prevStyle);
      }
      prev = pt;
      prevStyle = style;
    }
    if (start < i - 1) {
      addStyle(start, i - 1, segment.loop, prevStyle);
    }
  }
  return result;
}
function readStyle(options) {
  return {
    backgroundColor: options.backgroundColor,
    borderCapStyle: options.borderCapStyle,
    borderDash: options.borderDash,
    borderDashOffset: options.borderDashOffset,
    borderJoinStyle: options.borderJoinStyle,
    borderWidth: options.borderWidth,
    borderColor: options.borderColor
  };
}
function styleChanged(style, prevStyle) {
  if (!prevStyle) {
    return false;
  }
  const cache = [];
  const replacer = function(key, value) {
    if (!isPatternOrGradient(value)) {
      return value;
    }
    if (!cache.includes(value)) {
      cache.push(value);
    }
    return cache.indexOf(value);
  };
  return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
}
/*!
 * Chart.js v4.4.8
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class Animator {
  constructor() {
    this._request = null;
    this._charts = /* @__PURE__ */ new Map();
    this._running = false;
    this._lastDate = void 0;
  }
  _notify(chart, anims, date, type) {
    const callbacks = anims.listeners[type];
    const numSteps = anims.duration;
    callbacks.forEach((fn) => fn({
      chart,
      initial: anims.initial,
      numSteps,
      currentStep: Math.min(date - anims.start, numSteps)
    }));
  }
  _refresh() {
    if (this._request) {
      return;
    }
    this._running = true;
    this._request = requestAnimFrame.call(window, () => {
      this._update();
      this._request = null;
      if (this._running) {
        this._refresh();
      }
    });
  }
  _update(date = Date.now()) {
    let remaining = 0;
    this._charts.forEach((anims, chart) => {
      if (!anims.running || !anims.items.length) {
        return;
      }
      const items = anims.items;
      let i = items.length - 1;
      let draw2 = false;
      let item;
      for (; i >= 0; --i) {
        item = items[i];
        if (item._active) {
          if (item._total > anims.duration) {
            anims.duration = item._total;
          }
          item.tick(date);
          draw2 = true;
        } else {
          items[i] = items[items.length - 1];
          items.pop();
        }
      }
      if (draw2) {
        chart.draw();
        this._notify(chart, anims, date, "progress");
      }
      if (!items.length) {
        anims.running = false;
        this._notify(chart, anims, date, "complete");
        anims.initial = false;
      }
      remaining += items.length;
    });
    this._lastDate = date;
    if (remaining === 0) {
      this._running = false;
    }
  }
  _getAnims(chart) {
    const charts = this._charts;
    let anims = charts.get(chart);
    if (!anims) {
      anims = {
        running: false,
        initial: true,
        items: [],
        listeners: {
          complete: [],
          progress: []
        }
      };
      charts.set(chart, anims);
    }
    return anims;
  }
  listen(chart, event, cb) {
    this._getAnims(chart).listeners[event].push(cb);
  }
  add(chart, items) {
    if (!items || !items.length) {
      return;
    }
    this._getAnims(chart).items.push(...items);
  }
  has(chart) {
    return this._getAnims(chart).items.length > 0;
  }
  start(chart) {
    const anims = this._charts.get(chart);
    if (!anims) {
      return;
    }
    anims.running = true;
    anims.start = Date.now();
    anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
    this._refresh();
  }
  running(chart) {
    if (!this._running) {
      return false;
    }
    const anims = this._charts.get(chart);
    if (!anims || !anims.running || !anims.items.length) {
      return false;
    }
    return true;
  }
  stop(chart) {
    const anims = this._charts.get(chart);
    if (!anims || !anims.items.length) {
      return;
    }
    const items = anims.items;
    let i = items.length - 1;
    for (; i >= 0; --i) {
      items[i].cancel();
    }
    anims.items = [];
    this._notify(chart, anims, Date.now(), "complete");
  }
  remove(chart) {
    return this._charts.delete(chart);
  }
}
var animator = /* @__PURE__ */ new Animator();
const transparent = "transparent";
const interpolators = {
  boolean(from2, to2, factor) {
    return factor > 0.5 ? to2 : from2;
  },
  color(from2, to2, factor) {
    const c0 = color(from2 || transparent);
    const c1 = c0.valid && color(to2 || transparent);
    return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to2;
  },
  number(from2, to2, factor) {
    return from2 + (to2 - from2) * factor;
  }
};
class Animation {
  constructor(cfg, target, prop, to2) {
    const currentValue = target[prop];
    to2 = resolve([
      cfg.to,
      to2,
      currentValue,
      cfg.from
    ]);
    const from2 = resolve([
      cfg.from,
      currentValue,
      to2
    ]);
    this._active = true;
    this._fn = cfg.fn || interpolators[cfg.type || typeof from2];
    this._easing = effects[cfg.easing] || effects.linear;
    this._start = Math.floor(Date.now() + (cfg.delay || 0));
    this._duration = this._total = Math.floor(cfg.duration);
    this._loop = !!cfg.loop;
    this._target = target;
    this._prop = prop;
    this._from = from2;
    this._to = to2;
    this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(cfg, to2, date) {
    if (this._active) {
      this._notify(false);
      const currentValue = this._target[this._prop];
      const elapsed = date - this._start;
      const remain = this._duration - elapsed;
      this._start = date;
      this._duration = Math.floor(Math.max(remain, cfg.duration));
      this._total += elapsed;
      this._loop = !!cfg.loop;
      this._to = resolve([
        cfg.to,
        to2,
        currentValue,
        cfg.from
      ]);
      this._from = resolve([
        cfg.from,
        currentValue,
        to2
      ]);
    }
  }
  cancel() {
    if (this._active) {
      this.tick(Date.now());
      this._active = false;
      this._notify(false);
    }
  }
  tick(date) {
    const elapsed = date - this._start;
    const duration = this._duration;
    const prop = this._prop;
    const from2 = this._from;
    const loop = this._loop;
    const to2 = this._to;
    let factor;
    this._active = from2 !== to2 && (loop || elapsed < duration);
    if (!this._active) {
      this._target[prop] = to2;
      this._notify(true);
      return;
    }
    if (elapsed < 0) {
      this._target[prop] = from2;
      return;
    }
    factor = elapsed / duration % 2;
    factor = loop && factor > 1 ? 2 - factor : factor;
    factor = this._easing(Math.min(1, Math.max(0, factor)));
    this._target[prop] = this._fn(from2, to2, factor);
  }
  wait() {
    const promises = this._promises || (this._promises = []);
    return new Promise((res, rej) => {
      promises.push({
        res,
        rej
      });
    });
  }
  _notify(resolved) {
    const method = resolved ? "res" : "rej";
    const promises = this._promises || [];
    for (let i = 0; i < promises.length; i++) {
      promises[i][method]();
    }
  }
}
class Animations {
  constructor(chart, config) {
    this._chart = chart;
    this._properties = /* @__PURE__ */ new Map();
    this.configure(config);
  }
  configure(config) {
    if (!isObject(config)) {
      return;
    }
    const animationOptions = Object.keys(defaults.animation);
    const animatedProps = this._properties;
    Object.getOwnPropertyNames(config).forEach((key) => {
      const cfg = config[key];
      if (!isObject(cfg)) {
        return;
      }
      const resolved = {};
      for (const option of animationOptions) {
        resolved[option] = cfg[option];
      }
      (isArray(cfg.properties) && cfg.properties || [
        key
      ]).forEach((prop) => {
        if (prop === key || !animatedProps.has(prop)) {
          animatedProps.set(prop, resolved);
        }
      });
    });
  }
  _animateOptions(target, values) {
    const newOptions = values.options;
    const options = resolveTargetOptions(target, newOptions);
    if (!options) {
      return [];
    }
    const animations = this._createAnimations(options, newOptions);
    if (newOptions.$shared) {
      awaitAll(target.options.$animations, newOptions).then(() => {
        target.options = newOptions;
      }, () => {
      });
    }
    return animations;
  }
  _createAnimations(target, values) {
    const animatedProps = this._properties;
    const animations = [];
    const running = target.$animations || (target.$animations = {});
    const props = Object.keys(values);
    const date = Date.now();
    let i;
    for (i = props.length - 1; i >= 0; --i) {
      const prop = props[i];
      if (prop.charAt(0) === "$") {
        continue;
      }
      if (prop === "options") {
        animations.push(...this._animateOptions(target, values));
        continue;
      }
      const value = values[prop];
      let animation = running[prop];
      const cfg = animatedProps.get(prop);
      if (animation) {
        if (cfg && animation.active()) {
          animation.update(cfg, value, date);
          continue;
        } else {
          animation.cancel();
        }
      }
      if (!cfg || !cfg.duration) {
        target[prop] = value;
        continue;
      }
      running[prop] = animation = new Animation(cfg, target, prop, value);
      animations.push(animation);
    }
    return animations;
  }
  update(target, values) {
    if (this._properties.size === 0) {
      Object.assign(target, values);
      return;
    }
    const animations = this._createAnimations(target, values);
    if (animations.length) {
      animator.add(this._chart, animations);
      return true;
    }
  }
}
function awaitAll(animations, properties) {
  const running = [];
  const keys = Object.keys(properties);
  for (let i = 0; i < keys.length; i++) {
    const anim = animations[keys[i]];
    if (anim && anim.active()) {
      running.push(anim.wait());
    }
  }
  return Promise.all(running);
}
function resolveTargetOptions(target, newOptions) {
  if (!newOptions) {
    return;
  }
  let options = target.options;
  if (!options) {
    target.options = newOptions;
    return;
  }
  if (options.$shared) {
    target.options = options = Object.assign({}, options, {
      $shared: false,
      $animations: {}
    });
  }
  return options;
}
function scaleClip(scale, allowedOverflow) {
  const opts = scale && scale.options || {};
  const reverse = opts.reverse;
  const min = opts.min === void 0 ? allowedOverflow : 0;
  const max = opts.max === void 0 ? allowedOverflow : 0;
  return {
    start: reverse ? max : min,
    end: reverse ? min : max
  };
}
function defaultClip(xScale, yScale, allowedOverflow) {
  if (allowedOverflow === false) {
    return false;
  }
  const x = scaleClip(xScale, allowedOverflow);
  const y = scaleClip(yScale, allowedOverflow);
  return {
    top: y.end,
    right: x.end,
    bottom: y.start,
    left: x.start
  };
}
function toClip(value) {
  let t, r, b, l;
  if (isObject(value)) {
    t = value.top;
    r = value.right;
    b = value.bottom;
    l = value.left;
  } else {
    t = r = b = l = value;
  }
  return {
    top: t,
    right: r,
    bottom: b,
    left: l,
    disabled: value === false
  };
}
function getSortedDatasetIndices(chart, filterVisible) {
  const keys = [];
  const metasets = chart._getSortedDatasetMetas(filterVisible);
  let i, ilen;
  for (i = 0, ilen = metasets.length; i < ilen; ++i) {
    keys.push(metasets[i].index);
  }
  return keys;
}
function applyStack(stack, value, dsIndex, options = {}) {
  const keys = stack.keys;
  const singleMode = options.mode === "single";
  let i, ilen, datasetIndex, otherValue;
  if (value === null) {
    return;
  }
  let found = false;
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    datasetIndex = +keys[i];
    if (datasetIndex === dsIndex) {
      found = true;
      if (options.all) {
        continue;
      }
      break;
    }
    otherValue = stack.values[datasetIndex];
    if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) {
      value += otherValue;
    }
  }
  if (!found && !options.all) {
    return 0;
  }
  return value;
}
function convertObjectDataToArray(data, meta) {
  const { iScale, vScale } = meta;
  const iAxisKey = iScale.axis === "x" ? "x" : "y";
  const vAxisKey = vScale.axis === "x" ? "x" : "y";
  const keys = Object.keys(data);
  const adata = new Array(keys.length);
  let i, ilen, key;
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    key = keys[i];
    adata[i] = {
      [iAxisKey]: key,
      [vAxisKey]: data[key]
    };
  }
  return adata;
}
function isStacked(scale, meta) {
  const stacked = scale && scale.options.stacked;
  return stacked || stacked === void 0 && meta.stack !== void 0;
}
function getStackKey(indexScale, valueScale, meta) {
  return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
}
function getUserBounds(scale) {
  const { min, max, minDefined, maxDefined } = scale.getUserBounds();
  return {
    min: minDefined ? min : Number.NEGATIVE_INFINITY,
    max: maxDefined ? max : Number.POSITIVE_INFINITY
  };
}
function getOrCreateStack(stacks, stackKey, indexValue) {
  const subStack = stacks[stackKey] || (stacks[stackKey] = {});
  return subStack[indexValue] || (subStack[indexValue] = {});
}
function getLastIndexInStack(stack, vScale, positive, type) {
  for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
    const value = stack[meta.index];
    if (positive && value > 0 || !positive && value < 0) {
      return meta.index;
    }
  }
  return null;
}
function updateStacks(controller, parsed) {
  const { chart, _cachedMeta: meta } = controller;
  const stacks = chart._stacks || (chart._stacks = {});
  const { iScale, vScale, index: datasetIndex } = meta;
  const iAxis = iScale.axis;
  const vAxis = vScale.axis;
  const key = getStackKey(iScale, vScale, meta);
  const ilen = parsed.length;
  let stack;
  for (let i = 0; i < ilen; ++i) {
    const item = parsed[i];
    const { [iAxis]: index, [vAxis]: value } = item;
    const itemStacks = item._stacks || (item._stacks = {});
    stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
    stack[datasetIndex] = value;
    stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
    stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
    const visualValues = stack._visualValues || (stack._visualValues = {});
    visualValues[datasetIndex] = value;
  }
}
function getFirstScaleId(chart, axis) {
  const scales = chart.scales;
  return Object.keys(scales).filter((key) => scales[key].axis === axis).shift();
}
function createDatasetContext(parent, index) {
  return createContext(parent, {
    active: false,
    dataset: void 0,
    datasetIndex: index,
    index,
    mode: "default",
    type: "dataset"
  });
}
function createDataContext(parent, index, element) {
  return createContext(parent, {
    active: false,
    dataIndex: index,
    parsed: void 0,
    raw: void 0,
    element,
    index,
    mode: "default",
    type: "data"
  });
}
function clearStacks(meta, items) {
  const datasetIndex = meta.controller.index;
  const axis = meta.vScale && meta.vScale.axis;
  if (!axis) {
    return;
  }
  items = items || meta._parsed;
  for (const parsed of items) {
    const stacks = parsed._stacks;
    if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) {
      return;
    }
    delete stacks[axis][datasetIndex];
    if (stacks[axis]._visualValues !== void 0 && stacks[axis]._visualValues[datasetIndex] !== void 0) {
      delete stacks[axis]._visualValues[datasetIndex];
    }
  }
}
const isDirectUpdateMode = (mode) => mode === "reset" || mode === "none";
const cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
const createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && {
  keys: getSortedDatasetIndices(chart, true),
  values: null
};
class DatasetController {
  constructor(chart, datasetIndex) {
    this.chart = chart;
    this._ctx = chart.ctx;
    this.index = datasetIndex;
    this._cachedDataOpts = {};
    this._cachedMeta = this.getMeta();
    this._type = this._cachedMeta.type;
    this.options = void 0;
    this._parsing = false;
    this._data = void 0;
    this._objectData = void 0;
    this._sharedOptions = void 0;
    this._drawStart = void 0;
    this._drawCount = void 0;
    this.enableOptionSharing = false;
    this.supportsDecimation = false;
    this.$context = void 0;
    this._syncList = [];
    this.datasetElementType = new.target.datasetElementType;
    this.dataElementType = new.target.dataElementType;
    this.initialize();
  }
  initialize() {
    const meta = this._cachedMeta;
    this.configure();
    this.linkScales();
    meta._stacked = isStacked(meta.vScale, meta);
    this.addElements();
    if (this.options.fill && !this.chart.isPluginEnabled("filler")) {
      console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
    }
  }
  updateIndex(datasetIndex) {
    if (this.index !== datasetIndex) {
      clearStacks(this._cachedMeta);
    }
    this.index = datasetIndex;
  }
  linkScales() {
    const chart = this.chart;
    const meta = this._cachedMeta;
    const dataset = this.getDataset();
    const chooseId = (axis, x, y, r) => axis === "x" ? x : axis === "r" ? r : y;
    const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
    const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
    const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
    const indexAxis = meta.indexAxis;
    const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
    const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
    meta.xScale = this.getScaleForId(xid);
    meta.yScale = this.getScaleForId(yid);
    meta.rScale = this.getScaleForId(rid);
    meta.iScale = this.getScaleForId(iid);
    meta.vScale = this.getScaleForId(vid);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(scaleID) {
    return this.chart.scales[scaleID];
  }
  _getOtherScale(scale) {
    const meta = this._cachedMeta;
    return scale === meta.iScale ? meta.vScale : meta.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const meta = this._cachedMeta;
    if (this._data) {
      unlistenArrayEvents(this._data, this);
    }
    if (meta._stacked) {
      clearStacks(meta);
    }
  }
  _dataCheck() {
    const dataset = this.getDataset();
    const data = dataset.data || (dataset.data = []);
    const _data = this._data;
    if (isObject(data)) {
      const meta = this._cachedMeta;
      this._data = convertObjectDataToArray(data, meta);
    } else if (_data !== data) {
      if (_data) {
        unlistenArrayEvents(_data, this);
        const meta = this._cachedMeta;
        clearStacks(meta);
        meta._parsed = [];
      }
      if (data && Object.isExtensible(data)) {
        listenArrayEvents(data, this);
      }
      this._syncList = [];
      this._data = data;
    }
  }
  addElements() {
    const meta = this._cachedMeta;
    this._dataCheck();
    if (this.datasetElementType) {
      meta.dataset = new this.datasetElementType();
    }
  }
  buildOrUpdateElements(resetNewElements) {
    const meta = this._cachedMeta;
    const dataset = this.getDataset();
    let stackChanged = false;
    this._dataCheck();
    const oldStacked = meta._stacked;
    meta._stacked = isStacked(meta.vScale, meta);
    if (meta.stack !== dataset.stack) {
      stackChanged = true;
      clearStacks(meta);
      meta.stack = dataset.stack;
    }
    this._resyncElements(resetNewElements);
    if (stackChanged || oldStacked !== meta._stacked) {
      updateStacks(this, meta._parsed);
      meta._stacked = isStacked(meta.vScale, meta);
    }
  }
  configure() {
    const config = this.chart.config;
    const scopeKeys = config.datasetScopeKeys(this._type);
    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
    this.options = config.createResolver(scopes, this.getContext());
    this._parsing = this.options.parsing;
    this._cachedDataOpts = {};
  }
  parse(start, count) {
    const { _cachedMeta: meta, _data: data } = this;
    const { iScale, _stacked } = meta;
    const iAxis = iScale.axis;
    let sorted = start === 0 && count === data.length ? true : meta._sorted;
    let prev = start > 0 && meta._parsed[start - 1];
    let i, cur, parsed;
    if (this._parsing === false) {
      meta._parsed = data;
      meta._sorted = true;
      parsed = data;
    } else {
      if (isArray(data[start])) {
        parsed = this.parseArrayData(meta, data, start, count);
      } else if (isObject(data[start])) {
        parsed = this.parseObjectData(meta, data, start, count);
      } else {
        parsed = this.parsePrimitiveData(meta, data, start, count);
      }
      const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
      for (i = 0; i < count; ++i) {
        meta._parsed[i + start] = cur = parsed[i];
        if (sorted) {
          if (isNotInOrderComparedToPrev()) {
            sorted = false;
          }
          prev = cur;
        }
      }
      meta._sorted = sorted;
    }
    if (_stacked) {
      updateStacks(this, parsed);
    }
  }
  parsePrimitiveData(meta, data, start, count) {
    const { iScale, vScale } = meta;
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const labels = iScale.getLabels();
    const singleScale = iScale === vScale;
    const parsed = new Array(count);
    let i, ilen, index;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      parsed[i] = {
        [iAxis]: singleScale || iScale.parse(labels[index], index),
        [vAxis]: vScale.parse(data[index], index)
      };
    }
    return parsed;
  }
  parseArrayData(meta, data, start, count) {
    const { xScale, yScale } = meta;
    const parsed = new Array(count);
    let i, ilen, index, item;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      item = data[index];
      parsed[i] = {
        x: xScale.parse(item[0], index),
        y: yScale.parse(item[1], index)
      };
    }
    return parsed;
  }
  parseObjectData(meta, data, start, count) {
    const { xScale, yScale } = meta;
    const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
    const parsed = new Array(count);
    let i, ilen, index, item;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      item = data[index];
      parsed[i] = {
        x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
        y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
      };
    }
    return parsed;
  }
  getParsed(index) {
    return this._cachedMeta._parsed[index];
  }
  getDataElement(index) {
    return this._cachedMeta.data[index];
  }
  applyStack(scale, parsed, mode) {
    const chart = this.chart;
    const meta = this._cachedMeta;
    const value = parsed[scale.axis];
    const stack = {
      keys: getSortedDatasetIndices(chart, true),
      values: parsed._stacks[scale.axis]._visualValues
    };
    return applyStack(stack, value, meta.index, {
      mode
    });
  }
  updateRangeFromParsed(range, scale, parsed, stack) {
    const parsedValue = parsed[scale.axis];
    let value = parsedValue === null ? NaN : parsedValue;
    const values = stack && parsed._stacks[scale.axis];
    if (stack && values) {
      stack.values = values;
      value = applyStack(stack, parsedValue, this._cachedMeta.index);
    }
    range.min = Math.min(range.min, value);
    range.max = Math.max(range.max, value);
  }
  getMinMax(scale, canStack) {
    const meta = this._cachedMeta;
    const _parsed = meta._parsed;
    const sorted = meta._sorted && scale === meta.iScale;
    const ilen = _parsed.length;
    const otherScale = this._getOtherScale(scale);
    const stack = createStack(canStack, meta, this.chart);
    const range = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    const { min: otherMin, max: otherMax } = getUserBounds(otherScale);
    let i, parsed;
    function _skip() {
      parsed = _parsed[i];
      const otherValue = parsed[otherScale.axis];
      return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
    }
    for (i = 0; i < ilen; ++i) {
      if (_skip()) {
        continue;
      }
      this.updateRangeFromParsed(range, scale, parsed, stack);
      if (sorted) {
        break;
      }
    }
    if (sorted) {
      for (i = ilen - 1; i >= 0; --i) {
        if (_skip()) {
          continue;
        }
        this.updateRangeFromParsed(range, scale, parsed, stack);
        break;
      }
    }
    return range;
  }
  getAllParsedValues(scale) {
    const parsed = this._cachedMeta._parsed;
    const values = [];
    let i, ilen, value;
    for (i = 0, ilen = parsed.length; i < ilen; ++i) {
      value = parsed[i][scale.axis];
      if (isNumberFinite(value)) {
        values.push(value);
      }
    }
    return values;
  }
  getMaxOverflow() {
    return false;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const iScale = meta.iScale;
    const vScale = meta.vScale;
    const parsed = this.getParsed(index);
    return {
      label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
      value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
    };
  }
  _update(mode) {
    const meta = this._cachedMeta;
    this.update(mode || "default");
    meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
  }
  update(mode) {
  }
  draw() {
    const ctx = this._ctx;
    const chart = this.chart;
    const meta = this._cachedMeta;
    const elements = meta.data || [];
    const area = chart.chartArea;
    const active = [];
    const start = this._drawStart || 0;
    const count = this._drawCount || elements.length - start;
    const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
    let i;
    if (meta.dataset) {
      meta.dataset.draw(ctx, area, start, count);
    }
    for (i = start; i < start + count; ++i) {
      const element = elements[i];
      if (element.hidden) {
        continue;
      }
      if (element.active && drawActiveElementsOnTop) {
        active.push(element);
      } else {
        element.draw(ctx, area);
      }
    }
    for (i = 0; i < active.length; ++i) {
      active[i].draw(ctx, area);
    }
  }
  getStyle(index, active) {
    const mode = active ? "active" : "default";
    return index === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
  }
  getContext(index, active, mode) {
    const dataset = this.getDataset();
    let context;
    if (index >= 0 && index < this._cachedMeta.data.length) {
      const element = this._cachedMeta.data[index];
      context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
      context.parsed = this.getParsed(index);
      context.raw = dataset.data[index];
      context.index = context.dataIndex = index;
    } else {
      context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
      context.dataset = dataset;
      context.index = context.datasetIndex = this.index;
    }
    context.active = !!active;
    context.mode = mode;
    return context;
  }
  resolveDatasetElementOptions(mode) {
    return this._resolveElementOptions(this.datasetElementType.id, mode);
  }
  resolveDataElementOptions(index, mode) {
    return this._resolveElementOptions(this.dataElementType.id, mode, index);
  }
  _resolveElementOptions(elementType, mode = "default", index) {
    const active = mode === "active";
    const cache = this._cachedDataOpts;
    const cacheKey = elementType + "-" + mode;
    const cached = cache[cacheKey];
    const sharing = this.enableOptionSharing && defined(index);
    if (cached) {
      return cloneIfNotShared(cached, sharing);
    }
    const config = this.chart.config;
    const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
    const prefixes = active ? [
      `${elementType}Hover`,
      "hover",
      elementType,
      ""
    ] : [
      elementType,
      ""
    ];
    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
    const names2 = Object.keys(defaults.elements[elementType]);
    const context = () => this.getContext(index, active, mode);
    const values = config.resolveNamedOptions(scopes, names2, context, prefixes);
    if (values.$shared) {
      values.$shared = sharing;
      cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
    }
    return values;
  }
  _resolveAnimations(index, transition, active) {
    const chart = this.chart;
    const cache = this._cachedDataOpts;
    const cacheKey = `animation-${transition}`;
    const cached = cache[cacheKey];
    if (cached) {
      return cached;
    }
    let options;
    if (chart.options.animation !== false) {
      const config = this.chart.config;
      const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
      const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
      options = config.createResolver(scopes, this.getContext(index, active, transition));
    }
    const animations = new Animations(chart, options && options.animations);
    if (options && options._cacheable) {
      cache[cacheKey] = Object.freeze(animations);
    }
    return animations;
  }
  getSharedOptions(options) {
    if (!options.$shared) {
      return;
    }
    return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
  }
  includeOptions(mode, sharedOptions) {
    return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
  }
  _getSharedOptions(start, mode) {
    const firstOpts = this.resolveDataElementOptions(start, mode);
    const previouslySharedOptions = this._sharedOptions;
    const sharedOptions = this.getSharedOptions(firstOpts);
    const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
    this.updateSharedOptions(sharedOptions, mode, firstOpts);
    return {
      sharedOptions,
      includeOptions
    };
  }
  updateElement(element, index, properties, mode) {
    if (isDirectUpdateMode(mode)) {
      Object.assign(element, properties);
    } else {
      this._resolveAnimations(index, mode).update(element, properties);
    }
  }
  updateSharedOptions(sharedOptions, mode, newOptions) {
    if (sharedOptions && !isDirectUpdateMode(mode)) {
      this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
    }
  }
  _setStyle(element, index, mode, active) {
    element.active = active;
    const options = this.getStyle(index, active);
    this._resolveAnimations(index, mode, active).update(element, {
      options: !active && this.getSharedOptions(options) || options
    });
  }
  removeHoverStyle(element, datasetIndex, index) {
    this._setStyle(element, index, "active", false);
  }
  setHoverStyle(element, datasetIndex, index) {
    this._setStyle(element, index, "active", true);
  }
  _removeDatasetHoverStyle() {
    const element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, void 0, "active", false);
    }
  }
  _setDatasetHoverStyle() {
    const element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, void 0, "active", true);
    }
  }
  _resyncElements(resetNewElements) {
    const data = this._data;
    const elements = this._cachedMeta.data;
    for (const [method, arg1, arg2] of this._syncList) {
      this[method](arg1, arg2);
    }
    this._syncList = [];
    const numMeta = elements.length;
    const numData = data.length;
    const count = Math.min(numData, numMeta);
    if (count) {
      this.parse(0, count);
    }
    if (numData > numMeta) {
      this._insertElements(numMeta, numData - numMeta, resetNewElements);
    } else if (numData < numMeta) {
      this._removeElements(numData, numMeta - numData);
    }
  }
  _insertElements(start, count, resetNewElements = true) {
    const meta = this._cachedMeta;
    const data = meta.data;
    const end = start + count;
    let i;
    const move = (arr) => {
      arr.length += count;
      for (i = arr.length - 1; i >= end; i--) {
        arr[i] = arr[i - count];
      }
    };
    move(data);
    for (i = start; i < end; ++i) {
      data[i] = new this.dataElementType();
    }
    if (this._parsing) {
      move(meta._parsed);
    }
    this.parse(start, count);
    if (resetNewElements) {
      this.updateElements(data, start, count, "reset");
    }
  }
  updateElements(element, start, count, mode) {
  }
  _removeElements(start, count) {
    const meta = this._cachedMeta;
    if (this._parsing) {
      const removed = meta._parsed.splice(start, count);
      if (meta._stacked) {
        clearStacks(meta, removed);
      }
    }
    meta.data.splice(start, count);
  }
  _sync(args) {
    if (this._parsing) {
      this._syncList.push(args);
    } else {
      const [method, arg1, arg2] = args;
      this[method](arg1, arg2);
    }
    this.chart._dataChanges.push([
      this.index,
      ...args
    ]);
  }
  _onDataPush() {
    const count = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - count,
      count
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(start, count) {
    if (count) {
      this._sync([
        "_removeElements",
        start,
        count
      ]);
    }
    const newCount = arguments.length - 2;
    if (newCount) {
      this._sync([
        "_insertElements",
        start,
        newCount
      ]);
    }
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
__publicField(DatasetController, "defaults", {});
__publicField(DatasetController, "datasetElementType", null);
__publicField(DatasetController, "dataElementType", null);
class LineController extends DatasetController {
  initialize() {
    this.enableOptionSharing = true;
    this.supportsDecimation = true;
    super.initialize();
  }
  update(mode) {
    const meta = this._cachedMeta;
    const { dataset: line, data: points = [], _dataset } = meta;
    const animationsDisabled = this.chart._animationsDisabled;
    let { start, count } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
    this._drawStart = start;
    this._drawCount = count;
    if (_scaleRangesChanged(meta)) {
      start = 0;
      count = points.length;
    }
    line._chart = this.chart;
    line._datasetIndex = this.index;
    line._decimated = !!_dataset._decimated;
    line.points = points;
    const options = this.resolveDatasetElementOptions(mode);
    if (!this.options.showLine) {
      options.borderWidth = 0;
    }
    options.segment = this.options.segment;
    this.updateElement(line, void 0, {
      animated: !animationsDisabled,
      options
    }, mode);
    this.updateElements(points, start, count, mode);
  }
  updateElements(points, start, count, mode) {
    const reset = mode === "reset";
    const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
    const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const { spanGaps, segment } = this.options;
    const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
    const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
    const end = start + count;
    const pointsCount = points.length;
    let prevParsed = start > 0 && this.getParsed(start - 1);
    for (let i = 0; i < pointsCount; ++i) {
      const point = points[i];
      const properties = directUpdate ? point : {};
      if (i < start || i >= end) {
        properties.skip = true;
        continue;
      }
      const parsed = this.getParsed(i);
      const nullData = isNullOrUndef(parsed[vAxis]);
      const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
      const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
      properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
      properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
      if (segment) {
        properties.parsed = parsed;
        properties.raw = _dataset.data[i];
      }
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
      }
      if (!directUpdate) {
        this.updateElement(point, i, properties, mode);
      }
      prevParsed = parsed;
    }
  }
  getMaxOverflow() {
    const meta = this._cachedMeta;
    const dataset = meta.dataset;
    const border = dataset.options && dataset.options.borderWidth || 0;
    const data = meta.data || [];
    if (!data.length) {
      return border;
    }
    const firstPoint = data[0].size(this.resolveDataElementOptions(0));
    const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
    return Math.max(border, firstPoint, lastPoint) / 2;
  }
  draw() {
    const meta = this._cachedMeta;
    meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
    super.draw();
  }
}
__publicField(LineController, "id", "line");
__publicField(LineController, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: true,
  spanGaps: false
});
__publicField(LineController, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
function abstract() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class DateAdapterBase {
  constructor(options) {
    __publicField(this, "options");
    this.options = options || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(members) {
    Object.assign(DateAdapterBase.prototype, members);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return abstract();
  }
  parse() {
    return abstract();
  }
  format() {
    return abstract();
  }
  add() {
    return abstract();
  }
  diff() {
    return abstract();
  }
  startOf() {
    return abstract();
  }
  endOf() {
    return abstract();
  }
}
var adapters = {
  _date: DateAdapterBase
};
function binarySearch(metaset, axis, value, intersect) {
  const { controller, data, _sorted } = metaset;
  const iScale = controller._cachedMeta.iScale;
  const spanGaps = metaset.dataset ? metaset.dataset.options ? metaset.dataset.options.spanGaps : null : null;
  if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
    const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
    if (!intersect) {
      const result = lookupMethod(data, axis, value);
      if (spanGaps) {
        const { vScale } = controller._cachedMeta;
        const { _parsed } = metaset;
        const distanceToDefinedLo = _parsed.slice(0, result.lo + 1).reverse().findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        result.lo -= Math.max(0, distanceToDefinedLo);
        const distanceToDefinedHi = _parsed.slice(result.hi).findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        result.hi += Math.max(0, distanceToDefinedHi);
      }
      return result;
    } else if (controller._sharedOptions) {
      const el = data[0];
      const range = typeof el.getRange === "function" && el.getRange(axis);
      if (range) {
        const start = lookupMethod(data, axis, value - range);
        const end = lookupMethod(data, axis, value + range);
        return {
          lo: start.lo,
          hi: end.hi
        };
      }
    }
  }
  return {
    lo: 0,
    hi: data.length - 1
  };
}
function evaluateInteractionItems(chart, axis, position, handler, intersect) {
  const metasets = chart.getSortedVisibleDatasetMetas();
  const value = position[axis];
  for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
    const { index, data } = metasets[i];
    const { lo, hi } = binarySearch(metasets[i], axis, value, intersect);
    for (let j = lo; j <= hi; ++j) {
      const element = data[j];
      if (!element.skip) {
        handler(element, index, j);
      }
    }
  }
}
function getDistanceMetricForAxis(axis) {
  const useX = axis.indexOf("x") !== -1;
  const useY = axis.indexOf("y") !== -1;
  return function(pt1, pt2) {
    const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
    const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };
}
function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
  const items = [];
  if (!includeInvisible && !chart.isPointInArea(position)) {
    return items;
  }
  const evaluationFunc = function(element, datasetIndex, index) {
    if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) {
      return;
    }
    if (element.inRange(position.x, position.y, useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index
      });
    }
  };
  evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
  return items;
}
function getNearestRadialItems(chart, position, axis, useFinalPosition) {
  let items = [];
  function evaluationFunc(element, datasetIndex, index) {
    const { startAngle, endAngle } = element.getProps([
      "startAngle",
      "endAngle"
    ], useFinalPosition);
    const { angle } = getAngleFromPoint(element, {
      x: position.x,
      y: position.y
    });
    if (_angleBetween(angle, startAngle, endAngle)) {
      items.push({
        element,
        datasetIndex,
        index
      });
    }
  }
  evaluateInteractionItems(chart, axis, position, evaluationFunc);
  return items;
}
function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
  let items = [];
  const distanceMetric = getDistanceMetricForAxis(axis);
  let minDistance = Number.POSITIVE_INFINITY;
  function evaluationFunc(element, datasetIndex, index) {
    const inRange = element.inRange(position.x, position.y, useFinalPosition);
    if (intersect && !inRange) {
      return;
    }
    const center = element.getCenterPoint(useFinalPosition);
    const pointInArea = !!includeInvisible || chart.isPointInArea(center);
    if (!pointInArea && !inRange) {
      return;
    }
    const distance = distanceMetric(position, center);
    if (distance < minDistance) {
      items = [
        {
          element,
          datasetIndex,
          index
        }
      ];
      minDistance = distance;
    } else if (distance === minDistance) {
      items.push({
        element,
        datasetIndex,
        index
      });
    }
  }
  evaluateInteractionItems(chart, axis, position, evaluationFunc);
  return items;
}
function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
  if (!includeInvisible && !chart.isPointInArea(position)) {
    return [];
  }
  return axis === "r" && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
}
function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
  const items = [];
  const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
  let intersectsItem = false;
  evaluateInteractionItems(chart, axis, position, (element, datasetIndex, index) => {
    if (element[rangeMethod] && element[rangeMethod](position[axis], useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index
      });
      intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
    }
  });
  if (intersect && !intersectsItem) {
    return [];
  }
  return items;
}
var Interaction = {
  modes: {
    index(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || "x";
      const includeInvisible = options.includeInvisible || false;
      const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
      const elements = [];
      if (!items.length) {
        return [];
      }
      chart.getSortedVisibleDatasetMetas().forEach((meta) => {
        const index = items[0].index;
        const element = meta.data[index];
        if (element && !element.skip) {
          elements.push({
            element,
            datasetIndex: meta.index,
            index
          });
        }
      });
      return elements;
    },
    dataset(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
      if (items.length > 0) {
        const datasetIndex = items[0].datasetIndex;
        const data = chart.getDatasetMeta(datasetIndex).data;
        items = [];
        for (let i = 0; i < data.length; ++i) {
          items.push({
            element: data[i],
            datasetIndex,
            index: i
          });
        }
      }
      return items;
    },
    point(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
    },
    nearest(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
    },
    x(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      return getAxisItems(chart, position, "x", options.intersect, useFinalPosition);
    },
    y(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      return getAxisItems(chart, position, "y", options.intersect, useFinalPosition);
    }
  }
};
const STATIC_POSITIONS = [
  "left",
  "top",
  "right",
  "bottom"
];
function filterByPosition(array, position) {
  return array.filter((v) => v.pos === position);
}
function filterDynamicPositionByAxis(array, axis) {
  return array.filter((v) => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
}
function sortByWeight(array, reverse) {
  return array.sort((a, b) => {
    const v0 = reverse ? b : a;
    const v1 = reverse ? a : b;
    return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
  });
}
function wrapBoxes(boxes) {
  const layoutBoxes = [];
  let i, ilen, box, pos, stack, stackWeight;
  for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
    box = boxes[i];
    ({ position: pos, options: { stack, stackWeight = 1 } } = box);
    layoutBoxes.push({
      index: i,
      box,
      pos,
      horizontal: box.isHorizontal(),
      weight: box.weight,
      stack: stack && pos + stack,
      stackWeight
    });
  }
  return layoutBoxes;
}
function buildStacks(layouts2) {
  const stacks = {};
  for (const wrap of layouts2) {
    const { stack, pos, stackWeight } = wrap;
    if (!stack || !STATIC_POSITIONS.includes(pos)) {
      continue;
    }
    const _stack = stacks[stack] || (stacks[stack] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    _stack.count++;
    _stack.weight += stackWeight;
  }
  return stacks;
}
function setLayoutDims(layouts2, params) {
  const stacks = buildStacks(layouts2);
  const { vBoxMaxWidth, hBoxMaxHeight } = params;
  let i, ilen, layout;
  for (i = 0, ilen = layouts2.length; i < ilen; ++i) {
    layout = layouts2[i];
    const { fullSize } = layout.box;
    const stack = stacks[layout.stack];
    const factor = stack && layout.stackWeight / stack.weight;
    if (layout.horizontal) {
      layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
      layout.height = hBoxMaxHeight;
    } else {
      layout.width = vBoxMaxWidth;
      layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
    }
  }
  return stacks;
}
function buildLayoutBoxes(boxes) {
  const layoutBoxes = wrapBoxes(boxes);
  const fullSize = sortByWeight(layoutBoxes.filter((wrap) => wrap.box.fullSize), true);
  const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
  const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
  const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
  const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
  const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
  const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
  return {
    fullSize,
    leftAndTop: left.concat(top),
    rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
    chartArea: filterByPosition(layoutBoxes, "chartArea"),
    vertical: left.concat(right).concat(centerVertical),
    horizontal: top.concat(bottom).concat(centerHorizontal)
  };
}
function getCombinedMax(maxPadding, chartArea, a, b) {
  return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
}
function updateMaxPadding(maxPadding, boxPadding) {
  maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
  maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
  maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
  maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
}
function updateDims(chartArea, params, layout, stacks) {
  const { pos, box } = layout;
  const maxPadding = chartArea.maxPadding;
  if (!isObject(pos)) {
    if (layout.size) {
      chartArea[pos] -= layout.size;
    }
    const stack = stacks[layout.stack] || {
      size: 0,
      count: 1
    };
    stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
    layout.size = stack.size / stack.count;
    chartArea[pos] += layout.size;
  }
  if (box.getPadding) {
    updateMaxPadding(maxPadding, box.getPadding());
  }
  const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
  const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
  const widthChanged = newWidth !== chartArea.w;
  const heightChanged = newHeight !== chartArea.h;
  chartArea.w = newWidth;
  chartArea.h = newHeight;
  return layout.horizontal ? {
    same: widthChanged,
    other: heightChanged
  } : {
    same: heightChanged,
    other: widthChanged
  };
}
function handleMaxPadding(chartArea) {
  const maxPadding = chartArea.maxPadding;
  function updatePos(pos) {
    const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
    chartArea[pos] += change;
    return change;
  }
  chartArea.y += updatePos("top");
  chartArea.x += updatePos("left");
  updatePos("right");
  updatePos("bottom");
}
function getMargins(horizontal, chartArea) {
  const maxPadding = chartArea.maxPadding;
  function marginForPositions(positions2) {
    const margin = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    positions2.forEach((pos) => {
      margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
    });
    return margin;
  }
  return horizontal ? marginForPositions([
    "left",
    "right"
  ]) : marginForPositions([
    "top",
    "bottom"
  ]);
}
function fitBoxes(boxes, chartArea, params, stacks) {
  const refitBoxes = [];
  let i, ilen, layout, box, refit, changed;
  for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
    layout = boxes[i];
    box = layout.box;
    box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
    const { same, other } = updateDims(chartArea, params, layout, stacks);
    refit |= same && refitBoxes.length;
    changed = changed || other;
    if (!box.fullSize) {
      refitBoxes.push(layout);
    }
  }
  return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}
function setBoxDims(box, left, top, width, height) {
  box.top = top;
  box.left = left;
  box.right = left + width;
  box.bottom = top + height;
  box.width = width;
  box.height = height;
}
function placeBoxes(boxes, chartArea, params, stacks) {
  const userPadding = params.padding;
  let { x, y } = chartArea;
  for (const layout of boxes) {
    const box = layout.box;
    const stack = stacks[layout.stack] || {
      placed: 0,
      weight: 1
    };
    const weight = layout.stackWeight / stack.weight || 1;
    if (layout.horizontal) {
      const width = chartArea.w * weight;
      const height = stack.size || box.height;
      if (defined(stack.start)) {
        y = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
      } else {
        setBoxDims(box, chartArea.left + stack.placed, y, width, height);
      }
      stack.start = y;
      stack.placed += width;
      y = box.bottom;
    } else {
      const height = chartArea.h * weight;
      const width = stack.size || box.width;
      if (defined(stack.start)) {
        x = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
      } else {
        setBoxDims(box, x, chartArea.top + stack.placed, width, height);
      }
      stack.start = x;
      stack.placed += height;
      x = box.right;
    }
  }
  chartArea.x = x;
  chartArea.y = y;
}
var layouts = {
  addBox(chart, item) {
    if (!chart.boxes) {
      chart.boxes = [];
    }
    item.fullSize = item.fullSize || false;
    item.position = item.position || "top";
    item.weight = item.weight || 0;
    item._layers = item._layers || function() {
      return [
        {
          z: 0,
          draw(chartArea) {
            item.draw(chartArea);
          }
        }
      ];
    };
    chart.boxes.push(item);
  },
  removeBox(chart, layoutItem) {
    const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
    if (index !== -1) {
      chart.boxes.splice(index, 1);
    }
  },
  configure(chart, item, options) {
    item.fullSize = options.fullSize;
    item.position = options.position;
    item.weight = options.weight;
  },
  update(chart, width, height, minPadding) {
    if (!chart) {
      return;
    }
    const padding = toPadding(chart.options.layout.padding);
    const availableWidth = Math.max(width - padding.width, 0);
    const availableHeight = Math.max(height - padding.height, 0);
    const boxes = buildLayoutBoxes(chart.boxes);
    const verticalBoxes = boxes.vertical;
    const horizontalBoxes = boxes.horizontal;
    each(chart.boxes, (box) => {
      if (typeof box.beforeLayout === "function") {
        box.beforeLayout();
      }
    });
    const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
    const params = Object.freeze({
      outerWidth: width,
      outerHeight: height,
      padding,
      availableWidth,
      availableHeight,
      vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
      hBoxMaxHeight: availableHeight / 2
    });
    const maxPadding = Object.assign({}, padding);
    updateMaxPadding(maxPadding, toPadding(minPadding));
    const chartArea = Object.assign({
      maxPadding,
      w: availableWidth,
      h: availableHeight,
      x: padding.left,
      y: padding.top
    }, padding);
    const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
    fitBoxes(boxes.fullSize, chartArea, params, stacks);
    fitBoxes(verticalBoxes, chartArea, params, stacks);
    if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
      fitBoxes(verticalBoxes, chartArea, params, stacks);
    }
    handleMaxPadding(chartArea);
    placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
    chartArea.x += chartArea.w;
    chartArea.y += chartArea.h;
    placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
    chart.chartArea = {
      left: chartArea.left,
      top: chartArea.top,
      right: chartArea.left + chartArea.w,
      bottom: chartArea.top + chartArea.h,
      height: chartArea.h,
      width: chartArea.w
    };
    each(boxes.chartArea, (layout) => {
      const box = layout.box;
      Object.assign(box, chart.chartArea);
      box.update(chartArea.w, chartArea.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class BasePlatform {
  acquireContext(canvas, aspectRatio) {
  }
  releaseContext(context) {
    return false;
  }
  addEventListener(chart, type, listener) {
  }
  removeEventListener(chart, type, listener) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(element, width, height, aspectRatio) {
    width = Math.max(0, width || element.width);
    height = height || element.height;
    return {
      width,
      height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
    };
  }
  isAttached(canvas) {
    return true;
  }
  updateConfig(config) {
  }
}
class BasicPlatform extends BasePlatform {
  acquireContext(item) {
    return item && item.getContext && item.getContext("2d") || null;
  }
  updateConfig(config) {
    config.options.animation = false;
  }
}
const EXPANDO_KEY = "$chartjs";
const EVENT_TYPES = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
};
const isNullOrEmpty = (value) => value === null || value === "";
function initCanvas(canvas, aspectRatio) {
  const style = canvas.style;
  const renderHeight = canvas.getAttribute("height");
  const renderWidth = canvas.getAttribute("width");
  canvas[EXPANDO_KEY] = {
    initial: {
      height: renderHeight,
      width: renderWidth,
      style: {
        display: style.display,
        height: style.height,
        width: style.width
      }
    }
  };
  style.display = style.display || "block";
  style.boxSizing = style.boxSizing || "border-box";
  if (isNullOrEmpty(renderWidth)) {
    const displayWidth = readUsedSize(canvas, "width");
    if (displayWidth !== void 0) {
      canvas.width = displayWidth;
    }
  }
  if (isNullOrEmpty(renderHeight)) {
    if (canvas.style.height === "") {
      canvas.height = canvas.width / (aspectRatio || 2);
    } else {
      const displayHeight = readUsedSize(canvas, "height");
      if (displayHeight !== void 0) {
        canvas.height = displayHeight;
      }
    }
  }
  return canvas;
}
const eventListenerOptions = supportsEventListenerOptions ? {
  passive: true
} : false;
function addListener(node, type, listener) {
  if (node) {
    node.addEventListener(type, listener, eventListenerOptions);
  }
}
function removeListener(chart, type, listener) {
  if (chart && chart.canvas) {
    chart.canvas.removeEventListener(type, listener, eventListenerOptions);
  }
}
function fromNativeEvent(event, chart) {
  const type = EVENT_TYPES[event.type] || event.type;
  const { x, y } = getRelativePosition(event, chart);
  return {
    type,
    chart,
    native: event,
    x: x !== void 0 ? x : null,
    y: y !== void 0 ? y : null
  };
}
function nodeListContains(nodeList, canvas) {
  for (const node of nodeList) {
    if (node === canvas || node.contains(canvas)) {
      return true;
    }
  }
}
function createAttachObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const observer = new MutationObserver((entries) => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.addedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
function createDetachObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const observer = new MutationObserver((entries) => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.removedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
const drpListeningCharts = /* @__PURE__ */ new Map();
let oldDevicePixelRatio = 0;
function onWindowResize() {
  const dpr = window.devicePixelRatio;
  if (dpr === oldDevicePixelRatio) {
    return;
  }
  oldDevicePixelRatio = dpr;
  drpListeningCharts.forEach((resize, chart) => {
    if (chart.currentDevicePixelRatio !== dpr) {
      resize();
    }
  });
}
function listenDevicePixelRatioChanges(chart, resize) {
  if (!drpListeningCharts.size) {
    window.addEventListener("resize", onWindowResize);
  }
  drpListeningCharts.set(chart, resize);
}
function unlistenDevicePixelRatioChanges(chart) {
  drpListeningCharts.delete(chart);
  if (!drpListeningCharts.size) {
    window.removeEventListener("resize", onWindowResize);
  }
}
function createResizeObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const container = canvas && _getParentNode(canvas);
  if (!container) {
    return;
  }
  const resize = throttled((width, height) => {
    const w = container.clientWidth;
    listener(width, height);
    if (w < container.clientWidth) {
      listener();
    }
  }, window);
  const observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    if (width === 0 && height === 0) {
      return;
    }
    resize(width, height);
  });
  observer.observe(container);
  listenDevicePixelRatioChanges(chart, resize);
  return observer;
}
function releaseObserver(chart, type, observer) {
  if (observer) {
    observer.disconnect();
  }
  if (type === "resize") {
    unlistenDevicePixelRatioChanges(chart);
  }
}
function createProxyAndListen(chart, type, listener) {
  const canvas = chart.canvas;
  const proxy = throttled((event) => {
    if (chart.ctx !== null) {
      listener(fromNativeEvent(event, chart));
    }
  }, chart);
  addListener(canvas, type, proxy);
  return proxy;
}
class DomPlatform extends BasePlatform {
  acquireContext(canvas, aspectRatio) {
    const context = canvas && canvas.getContext && canvas.getContext("2d");
    if (context && context.canvas === canvas) {
      initCanvas(canvas, aspectRatio);
      return context;
    }
    return null;
  }
  releaseContext(context) {
    const canvas = context.canvas;
    if (!canvas[EXPANDO_KEY]) {
      return false;
    }
    const initial = canvas[EXPANDO_KEY].initial;
    [
      "height",
      "width"
    ].forEach((prop) => {
      const value = initial[prop];
      if (isNullOrUndef(value)) {
        canvas.removeAttribute(prop);
      } else {
        canvas.setAttribute(prop, value);
      }
    });
    const style = initial.style || {};
    Object.keys(style).forEach((key) => {
      canvas.style[key] = style[key];
    });
    canvas.width = canvas.width;
    delete canvas[EXPANDO_KEY];
    return true;
  }
  addEventListener(chart, type, listener) {
    this.removeEventListener(chart, type);
    const proxies = chart.$proxies || (chart.$proxies = {});
    const handlers = {
      attach: createAttachObserver,
      detach: createDetachObserver,
      resize: createResizeObserver
    };
    const handler = handlers[type] || createProxyAndListen;
    proxies[type] = handler(chart, type, listener);
  }
  removeEventListener(chart, type) {
    const proxies = chart.$proxies || (chart.$proxies = {});
    const proxy = proxies[type];
    if (!proxy) {
      return;
    }
    const handlers = {
      attach: releaseObserver,
      detach: releaseObserver,
      resize: releaseObserver
    };
    const handler = handlers[type] || removeListener;
    handler(chart, type, proxy);
    proxies[type] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(canvas, width, height, aspectRatio) {
    return getMaximumSize(canvas, width, height, aspectRatio);
  }
  isAttached(canvas) {
    const container = canvas && _getParentNode(canvas);
    return !!(container && container.isConnected);
  }
}
function _detectPlatform(canvas) {
  if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return BasicPlatform;
  }
  return DomPlatform;
}
class Element {
  constructor() {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "active", false);
    __publicField(this, "options");
    __publicField(this, "$animations");
  }
  tooltipPosition(useFinalPosition) {
    const { x, y } = this.getProps([
      "x",
      "y"
    ], useFinalPosition);
    return {
      x,
      y
    };
  }
  hasValue() {
    return isNumber(this.x) && isNumber(this.y);
  }
  getProps(props, final) {
    const anims = this.$animations;
    if (!final || !anims) {
      return this;
    }
    const ret = {};
    props.forEach((prop) => {
      ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
    });
    return ret;
  }
}
__publicField(Element, "defaults", {});
__publicField(Element, "defaultRoutes");
function autoSkip(scale, ticks) {
  const tickOpts = scale.options.ticks;
  const determinedMaxTicks = determineMaxTicks(scale);
  const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
  const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
  const numMajorIndices = majorIndices.length;
  const first2 = majorIndices[0];
  const last = majorIndices[numMajorIndices - 1];
  const newTicks = [];
  if (numMajorIndices > ticksLimit) {
    skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
    return newTicks;
  }
  const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
  if (numMajorIndices > 0) {
    let i, ilen;
    const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first2) / (numMajorIndices - 1)) : null;
    skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first2 - avgMajorSpacing, first2);
    for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
      skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
    }
    skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
    return newTicks;
  }
  skip(ticks, newTicks, spacing);
  return newTicks;
}
function determineMaxTicks(scale) {
  const offset = scale.options.offset;
  const tickLength = scale._tickSize();
  const maxScale = scale._length / tickLength + (offset ? 0 : 1);
  const maxChart = scale._maxLength / tickLength;
  return Math.floor(Math.min(maxScale, maxChart));
}
function calculateSpacing(majorIndices, ticks, ticksLimit) {
  const evenMajorSpacing = getEvenSpacing(majorIndices);
  const spacing = ticks.length / ticksLimit;
  if (!evenMajorSpacing) {
    return Math.max(spacing, 1);
  }
  const factors = _factorize(evenMajorSpacing);
  for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
    const factor = factors[i];
    if (factor > spacing) {
      return factor;
    }
  }
  return Math.max(spacing, 1);
}
function getMajorIndices(ticks) {
  const result = [];
  let i, ilen;
  for (i = 0, ilen = ticks.length; i < ilen; i++) {
    if (ticks[i].major) {
      result.push(i);
    }
  }
  return result;
}
function skipMajors(ticks, newTicks, majorIndices, spacing) {
  let count = 0;
  let next = majorIndices[0];
  let i;
  spacing = Math.ceil(spacing);
  for (i = 0; i < ticks.length; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = majorIndices[count * spacing];
    }
  }
}
function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
  const start = valueOrDefault(majorStart, 0);
  const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
  let count = 0;
  let length, i, next;
  spacing = Math.ceil(spacing);
  if (majorEnd) {
    length = majorEnd - majorStart;
    spacing = length / Math.floor(length / spacing);
  }
  next = start;
  while (next < 0) {
    count++;
    next = Math.round(start + count * spacing);
  }
  for (i = Math.max(start, 0); i < end; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = Math.round(start + count * spacing);
    }
  }
}
function getEvenSpacing(arr) {
  const len = arr.length;
  let i, diff;
  if (len < 2) {
    return false;
  }
  for (diff = arr[0], i = 1; i < len; ++i) {
    if (arr[i] - arr[i - 1] !== diff) {
      return false;
    }
  }
  return diff;
}
const reverseAlign = (align) => align === "left" ? "right" : align === "right" ? "left" : align;
const offsetFromEdge = (scale, edge, offset) => edge === "top" || edge === "left" ? scale[edge] + offset : scale[edge] - offset;
const getTicksLimit = (ticksLength, maxTicksLimit) => Math.min(maxTicksLimit || ticksLength, ticksLength);
function sample(arr, numItems) {
  const result = [];
  const increment = arr.length / numItems;
  const len = arr.length;
  let i = 0;
  for (; i < len; i += increment) {
    result.push(arr[Math.floor(i)]);
  }
  return result;
}
function getPixelForGridLine(scale, index, offsetGridLines) {
  const length = scale.ticks.length;
  const validIndex = Math.min(index, length - 1);
  const start = scale._startPixel;
  const end = scale._endPixel;
  const epsilon = 1e-6;
  let lineValue = scale.getPixelForTick(validIndex);
  let offset;
  if (offsetGridLines) {
    if (length === 1) {
      offset = Math.max(lineValue - start, end - lineValue);
    } else if (index === 0) {
      offset = (scale.getPixelForTick(1) - lineValue) / 2;
    } else {
      offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
    }
    lineValue += validIndex < index ? offset : -offset;
    if (lineValue < start - epsilon || lineValue > end + epsilon) {
      return;
    }
  }
  return lineValue;
}
function garbageCollect(caches, length) {
  each(caches, (cache) => {
    const gc = cache.gc;
    const gcLen = gc.length / 2;
    let i;
    if (gcLen > length) {
      for (i = 0; i < gcLen; ++i) {
        delete cache.data[gc[i]];
      }
      gc.splice(0, gcLen);
    }
  });
}
function getTickMarkLength(options) {
  return options.drawTicks ? options.tickLength : 0;
}
function getTitleHeight(options, fallback) {
  if (!options.display) {
    return 0;
  }
  const font = toFont(options.font, fallback);
  const padding = toPadding(options.padding);
  const lines = isArray(options.text) ? options.text.length : 1;
  return lines * font.lineHeight + padding.height;
}
function createScaleContext(parent, scale) {
  return createContext(parent, {
    scale,
    type: "scale"
  });
}
function createTickContext(parent, index, tick) {
  return createContext(parent, {
    tick,
    index,
    type: "tick"
  });
}
function titleAlign(align, position, reverse) {
  let ret = _toLeftRightCenter(align);
  if (reverse && position !== "right" || !reverse && position === "right") {
    ret = reverseAlign(ret);
  }
  return ret;
}
function titleArgs(scale, offset, position, align) {
  const { top, left, bottom, right, chart } = scale;
  const { chartArea, scales } = chart;
  let rotation = 0;
  let maxWidth, titleX, titleY;
  const height = bottom - top;
  const width = right - left;
  if (scale.isHorizontal()) {
    titleX = _alignStartEnd(align, left, right);
    if (isObject(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
    } else if (position === "center") {
      titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
    } else {
      titleY = offsetFromEdge(scale, position, offset);
    }
    maxWidth = right - left;
  } else {
    if (isObject(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
    } else if (position === "center") {
      titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
    } else {
      titleX = offsetFromEdge(scale, position, offset);
    }
    titleY = _alignStartEnd(align, bottom, top);
    rotation = position === "left" ? -HALF_PI : HALF_PI;
  }
  return {
    titleX,
    titleY,
    maxWidth,
    rotation
  };
}
class Scale extends Element {
  constructor(cfg) {
    super();
    this.id = cfg.id;
    this.type = cfg.type;
    this.options = void 0;
    this.ctx = cfg.ctx;
    this.chart = cfg.chart;
    this.top = void 0;
    this.bottom = void 0;
    this.left = void 0;
    this.right = void 0;
    this.width = void 0;
    this.height = void 0;
    this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this.maxWidth = void 0;
    this.maxHeight = void 0;
    this.paddingTop = void 0;
    this.paddingBottom = void 0;
    this.paddingLeft = void 0;
    this.paddingRight = void 0;
    this.axis = void 0;
    this.labelRotation = void 0;
    this.min = void 0;
    this.max = void 0;
    this._range = void 0;
    this.ticks = [];
    this._gridLineItems = null;
    this._labelItems = null;
    this._labelSizes = null;
    this._length = 0;
    this._maxLength = 0;
    this._longestTextCache = {};
    this._startPixel = void 0;
    this._endPixel = void 0;
    this._reversePixels = false;
    this._userMax = void 0;
    this._userMin = void 0;
    this._suggestedMax = void 0;
    this._suggestedMin = void 0;
    this._ticksLength = 0;
    this._borderValue = 0;
    this._cache = {};
    this._dataLimitsCached = false;
    this.$context = void 0;
  }
  init(options) {
    this.options = options.setContext(this.getContext());
    this.axis = options.axis;
    this._userMin = this.parse(options.min);
    this._userMax = this.parse(options.max);
    this._suggestedMin = this.parse(options.suggestedMin);
    this._suggestedMax = this.parse(options.suggestedMax);
  }
  parse(raw, index) {
    return raw;
  }
  getUserBounds() {
    let { _userMin, _userMax, _suggestedMin, _suggestedMax } = this;
    _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
    _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
    _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
    _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
    return {
      min: finiteOrDefault(_userMin, _suggestedMin),
      max: finiteOrDefault(_userMax, _suggestedMax),
      minDefined: isNumberFinite(_userMin),
      maxDefined: isNumberFinite(_userMax)
    };
  }
  getMinMax(canStack) {
    let { min, max, minDefined, maxDefined } = this.getUserBounds();
    let range;
    if (minDefined && maxDefined) {
      return {
        min,
        max
      };
    }
    const metas = this.getMatchingVisibleMetas();
    for (let i = 0, ilen = metas.length; i < ilen; ++i) {
      range = metas[i].controller.getMinMax(this, canStack);
      if (!minDefined) {
        min = Math.min(min, range.min);
      }
      if (!maxDefined) {
        max = Math.max(max, range.max);
      }
    }
    min = maxDefined && min > max ? max : min;
    max = minDefined && min > max ? min : max;
    return {
      min: finiteOrDefault(min, finiteOrDefault(max, min)),
      max: finiteOrDefault(max, finiteOrDefault(min, max))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const data = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
  }
  getLabelItems(chartArea = this.chart.chartArea) {
    const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
    return items;
  }
  beforeLayout() {
    this._cache = {};
    this._dataLimitsCached = false;
  }
  beforeUpdate() {
    callback(this.options.beforeUpdate, [
      this
    ]);
  }
  update(maxWidth, maxHeight, margins) {
    const { beginAtZero, grace, ticks: tickOpts } = this.options;
    const sampleSize = tickOpts.sampleSize;
    this.beforeUpdate();
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this._margins = margins = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, margins);
    this.ticks = null;
    this._labelSizes = null;
    this._gridLineItems = null;
    this._labelItems = null;
    this.beforeSetDimensions();
    this.setDimensions();
    this.afterSetDimensions();
    this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
    if (!this._dataLimitsCached) {
      this.beforeDataLimits();
      this.determineDataLimits();
      this.afterDataLimits();
      this._range = _addGrace(this, grace, beginAtZero);
      this._dataLimitsCached = true;
    }
    this.beforeBuildTicks();
    this.ticks = this.buildTicks() || [];
    this.afterBuildTicks();
    const samplingEnabled = sampleSize < this.ticks.length;
    this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
    this.configure();
    this.beforeCalculateLabelRotation();
    this.calculateLabelRotation();
    this.afterCalculateLabelRotation();
    if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
      this.ticks = autoSkip(this, this.ticks);
      this._labelSizes = null;
      this.afterAutoSkip();
    }
    if (samplingEnabled) {
      this._convertTicksToLabels(this.ticks);
    }
    this.beforeFit();
    this.fit();
    this.afterFit();
    this.afterUpdate();
  }
  configure() {
    let reversePixels = this.options.reverse;
    let startPixel, endPixel;
    if (this.isHorizontal()) {
      startPixel = this.left;
      endPixel = this.right;
    } else {
      startPixel = this.top;
      endPixel = this.bottom;
      reversePixels = !reversePixels;
    }
    this._startPixel = startPixel;
    this._endPixel = endPixel;
    this._reversePixels = reversePixels;
    this._length = endPixel - startPixel;
    this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    callback(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    callback(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    if (this.isHorizontal()) {
      this.width = this.maxWidth;
      this.left = 0;
      this.right = this.width;
    } else {
      this.height = this.maxHeight;
      this.top = 0;
      this.bottom = this.height;
    }
    this.paddingLeft = 0;
    this.paddingTop = 0;
    this.paddingRight = 0;
    this.paddingBottom = 0;
  }
  afterSetDimensions() {
    callback(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(name) {
    this.chart.notifyPlugins(name, this.getContext());
    callback(this.options[name], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    callback(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(ticks) {
    const tickOpts = this.options.ticks;
    let i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      tick = ticks[i];
      tick.label = callback(tickOpts.callback, [
        tick.value,
        i,
        ticks
      ], this);
    }
  }
  afterTickToLabelConversion() {
    callback(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    callback(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const options = this.options;
    const tickOpts = options.ticks;
    const numTicks = getTicksLimit(this.ticks.length, options.ticks.maxTicksLimit);
    const minRotation = tickOpts.minRotation || 0;
    const maxRotation = tickOpts.maxRotation;
    let labelRotation = minRotation;
    let tickWidth, maxHeight, maxLabelDiagonal;
    if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
      this.labelRotation = minRotation;
      return;
    }
    const labelSizes = this._getLabelSizes();
    const maxLabelWidth = labelSizes.widest.width;
    const maxLabelHeight = labelSizes.highest.height;
    const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
    tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
    if (maxLabelWidth + 6 > tickWidth) {
      tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
      maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
      maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
      labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
      labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
    }
    this.labelRotation = labelRotation;
  }
  afterCalculateLabelRotation() {
    callback(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    callback(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const minSize = {
      width: 0,
      height: 0
    };
    const { chart, options: { ticks: tickOpts, title: titleOpts, grid: gridOpts } } = this;
    const display = this._isVisible();
    const isHorizontal = this.isHorizontal();
    if (display) {
      const titleHeight = getTitleHeight(titleOpts, chart.options.font);
      if (isHorizontal) {
        minSize.width = this.maxWidth;
        minSize.height = getTickMarkLength(gridOpts) + titleHeight;
      } else {
        minSize.height = this.maxHeight;
        minSize.width = getTickMarkLength(gridOpts) + titleHeight;
      }
      if (tickOpts.display && this.ticks.length) {
        const { first: first2, last, widest, highest } = this._getLabelSizes();
        const tickPadding = tickOpts.padding * 2;
        const angleRadians = toRadians(this.labelRotation);
        const cos = Math.cos(angleRadians);
        const sin = Math.sin(angleRadians);
        if (isHorizontal) {
          const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
          minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
        } else {
          const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
          minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
        }
        this._calculatePadding(first2, last, sin, cos);
      }
    }
    this._handleMargins();
    if (isHorizontal) {
      this.width = this._length = chart.width - this._margins.left - this._margins.right;
      this.height = minSize.height;
    } else {
      this.width = minSize.width;
      this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
    }
  }
  _calculatePadding(first2, last, sin, cos) {
    const { ticks: { align, padding }, position } = this.options;
    const isRotated = this.labelRotation !== 0;
    const labelsBelowTicks = position !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const offsetLeft = this.getPixelForTick(0) - this.left;
      const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
      let paddingLeft = 0;
      let paddingRight = 0;
      if (isRotated) {
        if (labelsBelowTicks) {
          paddingLeft = cos * first2.width;
          paddingRight = sin * last.height;
        } else {
          paddingLeft = sin * first2.height;
          paddingRight = cos * last.width;
        }
      } else if (align === "start") {
        paddingRight = last.width;
      } else if (align === "end") {
        paddingLeft = first2.width;
      } else if (align !== "inner") {
        paddingLeft = first2.width / 2;
        paddingRight = last.width / 2;
      }
      this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
      this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
    } else {
      let paddingTop = last.height / 2;
      let paddingBottom = first2.height / 2;
      if (align === "start") {
        paddingTop = 0;
        paddingBottom = first2.height;
      } else if (align === "end") {
        paddingTop = last.height;
        paddingBottom = 0;
      }
      this.paddingTop = paddingTop + padding;
      this.paddingBottom = paddingBottom + padding;
    }
  }
  _handleMargins() {
    if (this._margins) {
      this._margins.left = Math.max(this.paddingLeft, this._margins.left);
      this._margins.top = Math.max(this.paddingTop, this._margins.top);
      this._margins.right = Math.max(this.paddingRight, this._margins.right);
      this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
    }
  }
  afterFit() {
    callback(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis, position } = this.options;
    return position === "top" || position === "bottom" || axis === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(ticks) {
    this.beforeTickToLabelConversion();
    this.generateTickLabels(ticks);
    let i, ilen;
    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      if (isNullOrUndef(ticks[i].label)) {
        ticks.splice(i, 1);
        ilen--;
        i--;
      }
    }
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let labelSizes = this._labelSizes;
    if (!labelSizes) {
      const sampleSize = this.options.ticks.sampleSize;
      let ticks = this.ticks;
      if (sampleSize < ticks.length) {
        ticks = sample(ticks, sampleSize);
      }
      this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
    }
    return labelSizes;
  }
  _computeLabelSizes(ticks, length, maxTicksLimit) {
    const { ctx, _longestTextCache: caches } = this;
    const widths = [];
    const heights = [];
    const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
    let widestLabelSize = 0;
    let highestLabelSize = 0;
    let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
    for (i = 0; i < length; i += increment) {
      label = ticks[i].label;
      tickFont = this._resolveTickFontOptions(i);
      ctx.font = fontString = tickFont.string;
      cache = caches[fontString] = caches[fontString] || {
        data: {},
        gc: []
      };
      lineHeight = tickFont.lineHeight;
      width = height = 0;
      if (!isNullOrUndef(label) && !isArray(label)) {
        width = _measureText(ctx, cache.data, cache.gc, width, label);
        height = lineHeight;
      } else if (isArray(label)) {
        for (j = 0, jlen = label.length; j < jlen; ++j) {
          nestedLabel = label[j];
          if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
            width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
            height += lineHeight;
          }
        }
      }
      widths.push(width);
      heights.push(height);
      widestLabelSize = Math.max(width, widestLabelSize);
      highestLabelSize = Math.max(height, highestLabelSize);
    }
    garbageCollect(caches, length);
    const widest = widths.indexOf(widestLabelSize);
    const highest = heights.indexOf(highestLabelSize);
    const valueAt = (idx) => ({
      width: widths[idx] || 0,
      height: heights[idx] || 0
    });
    return {
      first: valueAt(0),
      last: valueAt(length - 1),
      widest: valueAt(widest),
      highest: valueAt(highest),
      widths,
      heights
    };
  }
  getLabelForValue(value) {
    return value;
  }
  getPixelForValue(value, index) {
    return NaN;
  }
  getValueForPixel(pixel) {
  }
  getPixelForTick(index) {
    const ticks = this.ticks;
    if (index < 0 || index > ticks.length - 1) {
      return null;
    }
    return this.getPixelForValue(ticks[index].value);
  }
  getPixelForDecimal(decimal) {
    if (this._reversePixels) {
      decimal = 1 - decimal;
    }
    const pixel = this._startPixel + decimal * this._length;
    return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
  }
  getDecimalForPixel(pixel) {
    const decimal = (pixel - this._startPixel) / this._length;
    return this._reversePixels ? 1 - decimal : decimal;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min, max } = this;
    return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
  }
  getContext(index) {
    const ticks = this.ticks || [];
    if (index >= 0 && index < ticks.length) {
      const tick = ticks[index];
      return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
    }
    return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
  }
  _tickSize() {
    const optionTicks = this.options.ticks;
    const rot = toRadians(this.labelRotation);
    const cos = Math.abs(Math.cos(rot));
    const sin = Math.abs(Math.sin(rot));
    const labelSizes = this._getLabelSizes();
    const padding = optionTicks.autoSkipPadding || 0;
    const w = labelSizes ? labelSizes.widest.width + padding : 0;
    const h3 = labelSizes ? labelSizes.highest.height + padding : 0;
    return this.isHorizontal() ? h3 * cos > w * sin ? w / cos : h3 / sin : h3 * sin < w * cos ? h3 / cos : w / sin;
  }
  _isVisible() {
    const display = this.options.display;
    if (display !== "auto") {
      return !!display;
    }
    return this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(chartArea) {
    const axis = this.axis;
    const chart = this.chart;
    const options = this.options;
    const { grid, position, border } = options;
    const offset = grid.offset;
    const isHorizontal = this.isHorizontal();
    const ticks = this.ticks;
    const ticksLength = ticks.length + (offset ? 1 : 0);
    const tl = getTickMarkLength(grid);
    const items = [];
    const borderOpts = border.setContext(this.getContext());
    const axisWidth = borderOpts.display ? borderOpts.width : 0;
    const axisHalfWidth = axisWidth / 2;
    const alignBorderValue = function(pixel) {
      return _alignPixel(chart, pixel, axisWidth);
    };
    let borderValue, i, lineValue, alignedLineValue;
    let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
    if (position === "top") {
      borderValue = alignBorderValue(this.bottom);
      ty1 = this.bottom - tl;
      ty2 = borderValue - axisHalfWidth;
      y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
      y2 = chartArea.bottom;
    } else if (position === "bottom") {
      borderValue = alignBorderValue(this.top);
      y1 = chartArea.top;
      y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
      ty1 = borderValue + axisHalfWidth;
      ty2 = this.top + tl;
    } else if (position === "left") {
      borderValue = alignBorderValue(this.right);
      tx1 = this.right - tl;
      tx2 = borderValue - axisHalfWidth;
      x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
      x2 = chartArea.right;
    } else if (position === "right") {
      borderValue = alignBorderValue(this.left);
      x1 = chartArea.left;
      x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
      tx1 = borderValue + axisHalfWidth;
      tx2 = this.left + tl;
    } else if (axis === "x") {
      if (position === "center") {
        borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
      }
      y1 = chartArea.top;
      y2 = chartArea.bottom;
      ty1 = borderValue + axisHalfWidth;
      ty2 = ty1 + tl;
    } else if (axis === "y") {
      if (position === "center") {
        borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
      }
      tx1 = borderValue - axisHalfWidth;
      tx2 = tx1 - tl;
      x1 = chartArea.left;
      x2 = chartArea.right;
    }
    const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
    const step = Math.max(1, Math.ceil(ticksLength / limit));
    for (i = 0; i < ticksLength; i += step) {
      const context = this.getContext(i);
      const optsAtIndex = grid.setContext(context);
      const optsAtIndexBorder = border.setContext(context);
      const lineWidth = optsAtIndex.lineWidth;
      const lineColor = optsAtIndex.color;
      const borderDash = optsAtIndexBorder.dash || [];
      const borderDashOffset = optsAtIndexBorder.dashOffset;
      const tickWidth = optsAtIndex.tickWidth;
      const tickColor = optsAtIndex.tickColor;
      const tickBorderDash = optsAtIndex.tickBorderDash || [];
      const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
      lineValue = getPixelForGridLine(this, i, offset);
      if (lineValue === void 0) {
        continue;
      }
      alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
      if (isHorizontal) {
        tx1 = tx2 = x1 = x2 = alignedLineValue;
      } else {
        ty1 = ty2 = y1 = y2 = alignedLineValue;
      }
      items.push({
        tx1,
        ty1,
        tx2,
        ty2,
        x1,
        y1,
        x2,
        y2,
        width: lineWidth,
        color: lineColor,
        borderDash,
        borderDashOffset,
        tickWidth,
        tickColor,
        tickBorderDash,
        tickBorderDashOffset
      });
    }
    this._ticksLength = ticksLength;
    this._borderValue = borderValue;
    return items;
  }
  _computeLabelItems(chartArea) {
    const axis = this.axis;
    const options = this.options;
    const { position, ticks: optionTicks } = options;
    const isHorizontal = this.isHorizontal();
    const ticks = this.ticks;
    const { align, crossAlign, padding, mirror } = optionTicks;
    const tl = getTickMarkLength(options.grid);
    const tickAndPadding = tl + padding;
    const hTickAndPadding = mirror ? -padding : tickAndPadding;
    const rotation = -toRadians(this.labelRotation);
    const items = [];
    let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
    let textBaseline = "middle";
    if (position === "top") {
      y = this.bottom - hTickAndPadding;
      textAlign = this._getXAxisLabelAlignment();
    } else if (position === "bottom") {
      y = this.top + hTickAndPadding;
      textAlign = this._getXAxisLabelAlignment();
    } else if (position === "left") {
      const ret = this._getYAxisLabelAlignment(tl);
      textAlign = ret.textAlign;
      x = ret.x;
    } else if (position === "right") {
      const ret = this._getYAxisLabelAlignment(tl);
      textAlign = ret.textAlign;
      x = ret.x;
    } else if (axis === "x") {
      if (position === "center") {
        y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
      }
      textAlign = this._getXAxisLabelAlignment();
    } else if (axis === "y") {
      if (position === "center") {
        x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        x = this.chart.scales[positionAxisID].getPixelForValue(value);
      }
      textAlign = this._getYAxisLabelAlignment(tl).textAlign;
    }
    if (axis === "y") {
      if (align === "start") {
        textBaseline = "top";
      } else if (align === "end") {
        textBaseline = "bottom";
      }
    }
    const labelSizes = this._getLabelSizes();
    for (i = 0, ilen = ticks.length; i < ilen; ++i) {
      tick = ticks[i];
      label = tick.label;
      const optsAtIndex = optionTicks.setContext(this.getContext(i));
      pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
      font = this._resolveTickFontOptions(i);
      lineHeight = font.lineHeight;
      lineCount = isArray(label) ? label.length : 1;
      const halfCount = lineCount / 2;
      const color2 = optsAtIndex.color;
      const strokeColor = optsAtIndex.textStrokeColor;
      const strokeWidth = optsAtIndex.textStrokeWidth;
      let tickTextAlign = textAlign;
      if (isHorizontal) {
        x = pixel;
        if (textAlign === "inner") {
          if (i === ilen - 1) {
            tickTextAlign = !this.options.reverse ? "right" : "left";
          } else if (i === 0) {
            tickTextAlign = !this.options.reverse ? "left" : "right";
          } else {
            tickTextAlign = "center";
          }
        }
        if (position === "top") {
          if (crossAlign === "near" || rotation !== 0) {
            textOffset = -lineCount * lineHeight + lineHeight / 2;
          } else if (crossAlign === "center") {
            textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
          } else {
            textOffset = -labelSizes.highest.height + lineHeight / 2;
          }
        } else {
          if (crossAlign === "near" || rotation !== 0) {
            textOffset = lineHeight / 2;
          } else if (crossAlign === "center") {
            textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
          } else {
            textOffset = labelSizes.highest.height - lineCount * lineHeight;
          }
        }
        if (mirror) {
          textOffset *= -1;
        }
        if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) {
          x += lineHeight / 2 * Math.sin(rotation);
        }
      } else {
        y = pixel;
        textOffset = (1 - lineCount) * lineHeight / 2;
      }
      let backdrop;
      if (optsAtIndex.showLabelBackdrop) {
        const labelPadding = toPadding(optsAtIndex.backdropPadding);
        const height = labelSizes.heights[i];
        const width = labelSizes.widths[i];
        let top = textOffset - labelPadding.top;
        let left = 0 - labelPadding.left;
        switch (textBaseline) {
          case "middle":
            top -= height / 2;
            break;
          case "bottom":
            top -= height;
            break;
        }
        switch (textAlign) {
          case "center":
            left -= width / 2;
            break;
          case "right":
            left -= width;
            break;
          case "inner":
            if (i === ilen - 1) {
              left -= width;
            } else if (i > 0) {
              left -= width / 2;
            }
            break;
        }
        backdrop = {
          left,
          top,
          width: width + labelPadding.width,
          height: height + labelPadding.height,
          color: optsAtIndex.backdropColor
        };
      }
      items.push({
        label,
        font,
        textOffset,
        options: {
          rotation,
          color: color2,
          strokeColor,
          strokeWidth,
          textAlign: tickTextAlign,
          textBaseline,
          translation: [
            x,
            y
          ],
          backdrop
        }
      });
    }
    return items;
  }
  _getXAxisLabelAlignment() {
    const { position, ticks } = this.options;
    const rotation = -toRadians(this.labelRotation);
    if (rotation) {
      return position === "top" ? "left" : "right";
    }
    let align = "center";
    if (ticks.align === "start") {
      align = "left";
    } else if (ticks.align === "end") {
      align = "right";
    } else if (ticks.align === "inner") {
      align = "inner";
    }
    return align;
  }
  _getYAxisLabelAlignment(tl) {
    const { position, ticks: { crossAlign, mirror, padding } } = this.options;
    const labelSizes = this._getLabelSizes();
    const tickAndPadding = tl + padding;
    const widest = labelSizes.widest.width;
    let textAlign;
    let x;
    if (position === "left") {
      if (mirror) {
        x = this.right + padding;
        if (crossAlign === "near") {
          textAlign = "left";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x += widest / 2;
        } else {
          textAlign = "right";
          x += widest;
        }
      } else {
        x = this.right - tickAndPadding;
        if (crossAlign === "near") {
          textAlign = "right";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x -= widest / 2;
        } else {
          textAlign = "left";
          x = this.left;
        }
      }
    } else if (position === "right") {
      if (mirror) {
        x = this.left + padding;
        if (crossAlign === "near") {
          textAlign = "right";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x -= widest / 2;
        } else {
          textAlign = "left";
          x -= widest;
        }
      } else {
        x = this.left + tickAndPadding;
        if (crossAlign === "near") {
          textAlign = "left";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x += widest / 2;
        } else {
          textAlign = "right";
          x = this.right;
        }
      }
    } else {
      textAlign = "right";
    }
    return {
      textAlign,
      x
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror) {
      return;
    }
    const chart = this.chart;
    const position = this.options.position;
    if (position === "left" || position === "right") {
      return {
        top: 0,
        left: this.left,
        bottom: chart.height,
        right: this.right
      };
    }
    if (position === "top" || position === "bottom") {
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: chart.width
      };
    }
  }
  drawBackground() {
    const { ctx, options: { backgroundColor }, left, top, width, height } = this;
    if (backgroundColor) {
      ctx.save();
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    }
  }
  getLineWidthForValue(value) {
    const grid = this.options.grid;
    if (!this._isVisible() || !grid.display) {
      return 0;
    }
    const ticks = this.ticks;
    const index = ticks.findIndex((t) => t.value === value);
    if (index >= 0) {
      const opts = grid.setContext(this.getContext(index));
      return opts.lineWidth;
    }
    return 0;
  }
  drawGrid(chartArea) {
    const grid = this.options.grid;
    const ctx = this.ctx;
    const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
    let i, ilen;
    const drawLine = (p1, p2, style) => {
      if (!style.width || !style.color) {
        return;
      }
      ctx.save();
      ctx.lineWidth = style.width;
      ctx.strokeStyle = style.color;
      ctx.setLineDash(style.borderDash || []);
      ctx.lineDashOffset = style.borderDashOffset;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    };
    if (grid.display) {
      for (i = 0, ilen = items.length; i < ilen; ++i) {
        const item = items[i];
        if (grid.drawOnChartArea) {
          drawLine({
            x: item.x1,
            y: item.y1
          }, {
            x: item.x2,
            y: item.y2
          }, item);
        }
        if (grid.drawTicks) {
          drawLine({
            x: item.tx1,
            y: item.ty1
          }, {
            x: item.tx2,
            y: item.ty2
          }, {
            color: item.tickColor,
            width: item.tickWidth,
            borderDash: item.tickBorderDash,
            borderDashOffset: item.tickBorderDashOffset
          });
        }
      }
    }
  }
  drawBorder() {
    const { chart, ctx, options: { border, grid } } = this;
    const borderOpts = border.setContext(this.getContext());
    const axisWidth = border.display ? borderOpts.width : 0;
    if (!axisWidth) {
      return;
    }
    const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
    const borderValue = this._borderValue;
    let x1, x2, y1, y2;
    if (this.isHorizontal()) {
      x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
      x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
      y1 = y2 = borderValue;
    } else {
      y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
      y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
      x1 = x2 = borderValue;
    }
    ctx.save();
    ctx.lineWidth = borderOpts.width;
    ctx.strokeStyle = borderOpts.color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }
  drawLabels(chartArea) {
    const optionTicks = this.options.ticks;
    if (!optionTicks.display) {
      return;
    }
    const ctx = this.ctx;
    const area = this._computeLabelArea();
    if (area) {
      clipArea(ctx, area);
    }
    const items = this.getLabelItems(chartArea);
    for (const item of items) {
      const renderTextOptions = item.options;
      const tickFont = item.font;
      const label = item.label;
      const y = item.textOffset;
      renderText(ctx, label, 0, y, tickFont, renderTextOptions);
    }
    if (area) {
      unclipArea(ctx);
    }
  }
  drawTitle() {
    const { ctx, options: { position, title, reverse } } = this;
    if (!title.display) {
      return;
    }
    const font = toFont(title.font);
    const padding = toPadding(title.padding);
    const align = title.align;
    let offset = font.lineHeight / 2;
    if (position === "bottom" || position === "center" || isObject(position)) {
      offset += padding.bottom;
      if (isArray(title.text)) {
        offset += font.lineHeight * (title.text.length - 1);
      }
    } else {
      offset += padding.top;
    }
    const { titleX, titleY, maxWidth, rotation } = titleArgs(this, offset, position, align);
    renderText(ctx, title.text, 0, 0, font, {
      color: title.color,
      maxWidth,
      rotation,
      textAlign: titleAlign(align, position, reverse),
      textBaseline: "middle",
      translation: [
        titleX,
        titleY
      ]
    });
  }
  draw(chartArea) {
    if (!this._isVisible()) {
      return;
    }
    this.drawBackground();
    this.drawGrid(chartArea);
    this.drawBorder();
    this.drawTitle();
    this.drawLabels(chartArea);
  }
  _layers() {
    const opts = this.options;
    const tz = opts.ticks && opts.ticks.z || 0;
    const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
    const bz = valueOrDefault(opts.border && opts.border.z, 0);
    if (!this._isVisible() || this.draw !== Scale.prototype.draw) {
      return [
        {
          z: tz,
          draw: (chartArea) => {
            this.draw(chartArea);
          }
        }
      ];
    }
    return [
      {
        z: gz,
        draw: (chartArea) => {
          this.drawBackground();
          this.drawGrid(chartArea);
          this.drawTitle();
        }
      },
      {
        z: bz,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: tz,
        draw: (chartArea) => {
          this.drawLabels(chartArea);
        }
      }
    ];
  }
  getMatchingVisibleMetas(type) {
    const metas = this.chart.getSortedVisibleDatasetMetas();
    const axisID = this.axis + "AxisID";
    const result = [];
    let i, ilen;
    for (i = 0, ilen = metas.length; i < ilen; ++i) {
      const meta = metas[i];
      if (meta[axisID] === this.id && (!type || meta.type === type)) {
        result.push(meta);
      }
    }
    return result;
  }
  _resolveTickFontOptions(index) {
    const opts = this.options.ticks.setContext(this.getContext(index));
    return toFont(opts.font);
  }
  _maxDigits() {
    const fontSize = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / fontSize;
  }
}
class TypedRegistry {
  constructor(type, scope, override) {
    this.type = type;
    this.scope = scope;
    this.override = override;
    this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(type) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
  }
  register(item) {
    const proto = Object.getPrototypeOf(item);
    let parentScope;
    if (isIChartComponent(proto)) {
      parentScope = this.register(proto);
    }
    const items = this.items;
    const id = item.id;
    const scope = this.scope + "." + id;
    if (!id) {
      throw new Error("class does not have id: " + item);
    }
    if (id in items) {
      return scope;
    }
    items[id] = item;
    registerDefaults(item, scope, parentScope);
    if (this.override) {
      defaults.override(item.id, item.overrides);
    }
    return scope;
  }
  get(id) {
    return this.items[id];
  }
  unregister(item) {
    const items = this.items;
    const id = item.id;
    const scope = this.scope;
    if (id in items) {
      delete items[id];
    }
    if (scope && id in defaults[scope]) {
      delete defaults[scope][id];
      if (this.override) {
        delete overrides[id];
      }
    }
  }
}
function registerDefaults(item, scope, parentScope) {
  const itemDefaults = merge(/* @__PURE__ */ Object.create(null), [
    parentScope ? defaults.get(parentScope) : {},
    defaults.get(scope),
    item.defaults
  ]);
  defaults.set(scope, itemDefaults);
  if (item.defaultRoutes) {
    routeDefaults(scope, item.defaultRoutes);
  }
  if (item.descriptors) {
    defaults.describe(scope, item.descriptors);
  }
}
function routeDefaults(scope, routes) {
  Object.keys(routes).forEach((property) => {
    const propertyParts = property.split(".");
    const sourceName = propertyParts.pop();
    const sourceScope = [
      scope
    ].concat(propertyParts).join(".");
    const parts = routes[property].split(".");
    const targetName = parts.pop();
    const targetScope = parts.join(".");
    defaults.route(sourceScope, sourceName, targetScope, targetName);
  });
}
function isIChartComponent(proto) {
  return "id" in proto && "defaults" in proto;
}
class Registry {
  constructor() {
    this.controllers = new TypedRegistry(DatasetController, "datasets", true);
    this.elements = new TypedRegistry(Element, "elements");
    this.plugins = new TypedRegistry(Object, "plugins");
    this.scales = new TypedRegistry(Scale, "scales");
    this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...args) {
    this._each("register", args);
  }
  remove(...args) {
    this._each("unregister", args);
  }
  addControllers(...args) {
    this._each("register", args, this.controllers);
  }
  addElements(...args) {
    this._each("register", args, this.elements);
  }
  addPlugins(...args) {
    this._each("register", args, this.plugins);
  }
  addScales(...args) {
    this._each("register", args, this.scales);
  }
  getController(id) {
    return this._get(id, this.controllers, "controller");
  }
  getElement(id) {
    return this._get(id, this.elements, "element");
  }
  getPlugin(id) {
    return this._get(id, this.plugins, "plugin");
  }
  getScale(id) {
    return this._get(id, this.scales, "scale");
  }
  removeControllers(...args) {
    this._each("unregister", args, this.controllers);
  }
  removeElements(...args) {
    this._each("unregister", args, this.elements);
  }
  removePlugins(...args) {
    this._each("unregister", args, this.plugins);
  }
  removeScales(...args) {
    this._each("unregister", args, this.scales);
  }
  _each(method, args, typedRegistry) {
    [
      ...args
    ].forEach((arg) => {
      const reg = typedRegistry || this._getRegistryForType(arg);
      if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
        this._exec(method, reg, arg);
      } else {
        each(arg, (item) => {
          const itemReg = typedRegistry || this._getRegistryForType(item);
          this._exec(method, itemReg, item);
        });
      }
    });
  }
  _exec(method, registry2, component) {
    const camelMethod = _capitalize(method);
    callback(component["before" + camelMethod], [], component);
    registry2[method](component);
    callback(component["after" + camelMethod], [], component);
  }
  _getRegistryForType(type) {
    for (let i = 0; i < this._typedRegistries.length; i++) {
      const reg = this._typedRegistries[i];
      if (reg.isForType(type)) {
        return reg;
      }
    }
    return this.plugins;
  }
  _get(id, typedRegistry, type) {
    const item = typedRegistry.get(id);
    if (item === void 0) {
      throw new Error('"' + id + '" is not a registered ' + type + ".");
    }
    return item;
  }
}
var registry = /* @__PURE__ */ new Registry();
class PluginService {
  constructor() {
    this._init = [];
  }
  notify(chart, hook, args, filter) {
    if (hook === "beforeInit") {
      this._init = this._createDescriptors(chart, true);
      this._notify(this._init, chart, "install");
    }
    const descriptors2 = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
    const result = this._notify(descriptors2, chart, hook, args);
    if (hook === "afterDestroy") {
      this._notify(descriptors2, chart, "stop");
      this._notify(this._init, chart, "uninstall");
    }
    return result;
  }
  _notify(descriptors2, chart, hook, args) {
    args = args || {};
    for (const descriptor of descriptors2) {
      const plugin = descriptor.plugin;
      const method = plugin[hook];
      const params = [
        chart,
        args,
        descriptor.options
      ];
      if (callback(method, params, plugin) === false && args.cancelable) {
        return false;
      }
    }
    return true;
  }
  invalidate() {
    if (!isNullOrUndef(this._cache)) {
      this._oldCache = this._cache;
      this._cache = void 0;
    }
  }
  _descriptors(chart) {
    if (this._cache) {
      return this._cache;
    }
    const descriptors2 = this._cache = this._createDescriptors(chart);
    this._notifyStateChanges(chart);
    return descriptors2;
  }
  _createDescriptors(chart, all) {
    const config = chart && chart.config;
    const options = valueOrDefault(config.options && config.options.plugins, {});
    const plugins = allPlugins(config);
    return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
  }
  _notifyStateChanges(chart) {
    const previousDescriptors = this._oldCache || [];
    const descriptors2 = this._cache;
    const diff = (a, b) => a.filter((x) => !b.some((y) => x.plugin.id === y.plugin.id));
    this._notify(diff(previousDescriptors, descriptors2), chart, "stop");
    this._notify(diff(descriptors2, previousDescriptors), chart, "start");
  }
}
function allPlugins(config) {
  const localIds = {};
  const plugins = [];
  const keys = Object.keys(registry.plugins.items);
  for (let i = 0; i < keys.length; i++) {
    plugins.push(registry.getPlugin(keys[i]));
  }
  const local = config.plugins || [];
  for (let i = 0; i < local.length; i++) {
    const plugin = local[i];
    if (plugins.indexOf(plugin) === -1) {
      plugins.push(plugin);
      localIds[plugin.id] = true;
    }
  }
  return {
    plugins,
    localIds
  };
}
function getOpts(options, all) {
  if (!all && options === false) {
    return null;
  }
  if (options === true) {
    return {};
  }
  return options;
}
function createDescriptors(chart, { plugins, localIds }, options, all) {
  const result = [];
  const context = chart.getContext();
  for (const plugin of plugins) {
    const id = plugin.id;
    const opts = getOpts(options[id], all);
    if (opts === null) {
      continue;
    }
    result.push({
      plugin,
      options: pluginOpts(chart.config, {
        plugin,
        local: localIds[id]
      }, opts, context)
    });
  }
  return result;
}
function pluginOpts(config, { plugin, local }, opts, context) {
  const keys = config.pluginScopeKeys(plugin);
  const scopes = config.getOptionScopes(opts, keys);
  if (local && plugin.defaults) {
    scopes.push(plugin.defaults);
  }
  return config.createResolver(scopes, context, [
    ""
  ], {
    scriptable: false,
    indexable: false,
    allKeys: true
  });
}
function getIndexAxis(type, options) {
  const datasetDefaults = defaults.datasets[type] || {};
  const datasetOptions = (options.datasets || {})[type] || {};
  return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
}
function getAxisFromDefaultScaleID(id, indexAxis) {
  let axis = id;
  if (id === "_index_") {
    axis = indexAxis;
  } else if (id === "_value_") {
    axis = indexAxis === "x" ? "y" : "x";
  }
  return axis;
}
function getDefaultScaleIDFromAxis(axis, indexAxis) {
  return axis === indexAxis ? "_index_" : "_value_";
}
function idMatchesAxis(id) {
  if (id === "x" || id === "y" || id === "r") {
    return id;
  }
}
function axisFromPosition(position) {
  if (position === "top" || position === "bottom") {
    return "x";
  }
  if (position === "left" || position === "right") {
    return "y";
  }
}
function determineAxis(id, ...scaleOptions) {
  if (idMatchesAxis(id)) {
    return id;
  }
  for (const opts of scaleOptions) {
    const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
    if (axis) {
      return axis;
    }
  }
  throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
}
function getAxisFromDataset(id, axis, dataset) {
  if (dataset[axis + "AxisID"] === id) {
    return {
      axis
    };
  }
}
function retrieveAxisFromDatasets(id, config) {
  if (config.data && config.data.datasets) {
    const boundDs = config.data.datasets.filter((d) => d.xAxisID === id || d.yAxisID === id);
    if (boundDs.length) {
      return getAxisFromDataset(id, "x", boundDs[0]) || getAxisFromDataset(id, "y", boundDs[0]);
    }
  }
  return {};
}
function mergeScaleConfig(config, options) {
  const chartDefaults = overrides[config.type] || {
    scales: {}
  };
  const configScales = options.scales || {};
  const chartIndexAxis = getIndexAxis(config.type, options);
  const scales = /* @__PURE__ */ Object.create(null);
  Object.keys(configScales).forEach((id) => {
    const scaleConf = configScales[id];
    if (!isObject(scaleConf)) {
      return console.error(`Invalid scale configuration for scale: ${id}`);
    }
    if (scaleConf._proxy) {
      return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
    }
    const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), defaults.scales[scaleConf.type]);
    const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
    const defaultScaleOptions = chartDefaults.scales || {};
    scales[id] = mergeIf(/* @__PURE__ */ Object.create(null), [
      {
        axis
      },
      scaleConf,
      defaultScaleOptions[axis],
      defaultScaleOptions[defaultId]
    ]);
  });
  config.data.datasets.forEach((dataset) => {
    const type = dataset.type || config.type;
    const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
    const datasetDefaults = overrides[type] || {};
    const defaultScaleOptions = datasetDefaults.scales || {};
    Object.keys(defaultScaleOptions).forEach((defaultID) => {
      const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
      const id = dataset[axis + "AxisID"] || axis;
      scales[id] = scales[id] || /* @__PURE__ */ Object.create(null);
      mergeIf(scales[id], [
        {
          axis
        },
        configScales[id],
        defaultScaleOptions[defaultID]
      ]);
    });
  });
  Object.keys(scales).forEach((key) => {
    const scale = scales[key];
    mergeIf(scale, [
      defaults.scales[scale.type],
      defaults.scale
    ]);
  });
  return scales;
}
function initOptions(config) {
  const options = config.options || (config.options = {});
  options.plugins = valueOrDefault(options.plugins, {});
  options.scales = mergeScaleConfig(config, options);
}
function initData(data) {
  data = data || {};
  data.datasets = data.datasets || [];
  data.labels = data.labels || [];
  return data;
}
function initConfig(config) {
  config = config || {};
  config.data = initData(config.data);
  initOptions(config);
  return config;
}
const keyCache = /* @__PURE__ */ new Map();
const keysCached = /* @__PURE__ */ new Set();
function cachedKeys(cacheKey, generate) {
  let keys = keyCache.get(cacheKey);
  if (!keys) {
    keys = generate();
    keyCache.set(cacheKey, keys);
    keysCached.add(keys);
  }
  return keys;
}
const addIfFound = (set2, obj, key) => {
  const opts = resolveObjectKey(obj, key);
  if (opts !== void 0) {
    set2.add(opts);
  }
};
class Config {
  constructor(config) {
    this._config = initConfig(config);
    this._scopeCache = /* @__PURE__ */ new Map();
    this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(type) {
    this._config.type = type;
  }
  get data() {
    return this._config.data;
  }
  set data(data) {
    this._config.data = initData(data);
  }
  get options() {
    return this._config.options;
  }
  set options(options) {
    this._config.options = options;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const config = this._config;
    this.clearCache();
    initOptions(config);
  }
  clearCache() {
    this._scopeCache.clear();
    this._resolverCache.clear();
  }
  datasetScopeKeys(datasetType) {
    return cachedKeys(datasetType, () => [
      [
        `datasets.${datasetType}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(datasetType, transition) {
    return cachedKeys(`${datasetType}.transition.${transition}`, () => [
      [
        `datasets.${datasetType}.transitions.${transition}`,
        `transitions.${transition}`
      ],
      [
        `datasets.${datasetType}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(datasetType, elementType) {
    return cachedKeys(`${datasetType}-${elementType}`, () => [
      [
        `datasets.${datasetType}.elements.${elementType}`,
        `datasets.${datasetType}`,
        `elements.${elementType}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(plugin) {
    const id = plugin.id;
    const type = this.type;
    return cachedKeys(`${type}-plugin-${id}`, () => [
      [
        `plugins.${id}`,
        ...plugin.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(mainScope, resetCache) {
    const _scopeCache = this._scopeCache;
    let cache = _scopeCache.get(mainScope);
    if (!cache || resetCache) {
      cache = /* @__PURE__ */ new Map();
      _scopeCache.set(mainScope, cache);
    }
    return cache;
  }
  getOptionScopes(mainScope, keyLists, resetCache) {
    const { options, type } = this;
    const cache = this._cachedScopes(mainScope, resetCache);
    const cached = cache.get(keyLists);
    if (cached) {
      return cached;
    }
    const scopes = /* @__PURE__ */ new Set();
    keyLists.forEach((keys) => {
      if (mainScope) {
        scopes.add(mainScope);
        keys.forEach((key) => addIfFound(scopes, mainScope, key));
      }
      keys.forEach((key) => addIfFound(scopes, options, key));
      keys.forEach((key) => addIfFound(scopes, overrides[type] || {}, key));
      keys.forEach((key) => addIfFound(scopes, defaults, key));
      keys.forEach((key) => addIfFound(scopes, descriptors, key));
    });
    const array = Array.from(scopes);
    if (array.length === 0) {
      array.push(/* @__PURE__ */ Object.create(null));
    }
    if (keysCached.has(keyLists)) {
      cache.set(keyLists, array);
    }
    return array;
  }
  chartOptionScopes() {
    const { options, type } = this;
    return [
      options,
      overrides[type] || {},
      defaults.datasets[type] || {},
      {
        type
      },
      defaults,
      descriptors
    ];
  }
  resolveNamedOptions(scopes, names2, context, prefixes = [
    ""
  ]) {
    const result = {
      $shared: true
    };
    const { resolver, subPrefixes } = getResolver(this._resolverCache, scopes, prefixes);
    let options = resolver;
    if (needContext(resolver, names2)) {
      result.$shared = false;
      context = isFunction(context) ? context() : context;
      const subResolver = this.createResolver(scopes, context, subPrefixes);
      options = _attachContext(resolver, context, subResolver);
    }
    for (const prop of names2) {
      result[prop] = options[prop];
    }
    return result;
  }
  createResolver(scopes, context, prefixes = [
    ""
  ], descriptorDefaults) {
    const { resolver } = getResolver(this._resolverCache, scopes, prefixes);
    return isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
  }
}
function getResolver(resolverCache, scopes, prefixes) {
  let cache = resolverCache.get(scopes);
  if (!cache) {
    cache = /* @__PURE__ */ new Map();
    resolverCache.set(scopes, cache);
  }
  const cacheKey = prefixes.join();
  let cached = cache.get(cacheKey);
  if (!cached) {
    const resolver = _createResolver(scopes, prefixes);
    cached = {
      resolver,
      subPrefixes: prefixes.filter((p) => !p.toLowerCase().includes("hover"))
    };
    cache.set(cacheKey, cached);
  }
  return cached;
}
const hasFunction = (value) => isObject(value) && Object.getOwnPropertyNames(value).some((key) => isFunction(value[key]));
function needContext(proxy, names2) {
  const { isScriptable, isIndexable } = _descriptors(proxy);
  for (const prop of names2) {
    const scriptable = isScriptable(prop);
    const indexable = isIndexable(prop);
    const value = (indexable || scriptable) && proxy[prop];
    if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) {
      return true;
    }
  }
  return false;
}
var version = "4.4.8";
const KNOWN_POSITIONS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function positionIsHorizontal(position, axis) {
  return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
}
function compare2Level(l1, l2) {
  return function(a, b) {
    return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
  };
}
function onAnimationsComplete(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  chart.notifyPlugins("afterRender");
  callback(animationOptions && animationOptions.onComplete, [
    context
  ], chart);
}
function onAnimationProgress(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  callback(animationOptions && animationOptions.onProgress, [
    context
  ], chart);
}
function getCanvas(item) {
  if (_isDomSupported() && typeof item === "string") {
    item = document.getElementById(item);
  } else if (item && item.length) {
    item = item[0];
  }
  if (item && item.canvas) {
    item = item.canvas;
  }
  return item;
}
const instances = {};
const getChart = (key) => {
  const canvas = getCanvas(key);
  return Object.values(instances).filter((c) => c.canvas === canvas).pop();
};
function moveNumericKeys(obj, start, move) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    const intKey = +key;
    if (intKey >= start) {
      const value = obj[key];
      delete obj[key];
      if (move > 0 || intKey > start) {
        obj[intKey + move] = value;
      }
    }
  }
}
function determineLastEvent(e, lastEvent, inChartArea, isClick) {
  if (!inChartArea || e.type === "mouseout") {
    return null;
  }
  if (isClick) {
    return lastEvent;
  }
  return e;
}
function getSizeForArea(scale, chartArea, field) {
  return scale.options.clip ? scale[field] : chartArea[field];
}
function getDatasetArea(meta, chartArea) {
  const { xScale, yScale } = meta;
  if (xScale && yScale) {
    return {
      left: getSizeForArea(xScale, chartArea, "left"),
      right: getSizeForArea(xScale, chartArea, "right"),
      top: getSizeForArea(yScale, chartArea, "top"),
      bottom: getSizeForArea(yScale, chartArea, "bottom")
    };
  }
  return chartArea;
}
let Chart$1 = (_a = class {
  static register(...items) {
    registry.add(...items);
    invalidatePlugins();
  }
  static unregister(...items) {
    registry.remove(...items);
    invalidatePlugins();
  }
  constructor(item, userConfig) {
    const config = this.config = new Config(userConfig);
    const initialCanvas = getCanvas(item);
    const existingChart = getChart(initialCanvas);
    if (existingChart) {
      throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "' must be destroyed before the canvas with ID '" + existingChart.canvas.id + "' can be reused.");
    }
    const options = config.createResolver(config.chartOptionScopes(), this.getContext());
    this.platform = new (config.platform || _detectPlatform(initialCanvas))();
    this.platform.updateConfig(config);
    const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
    const canvas = context && context.canvas;
    const height = canvas && canvas.height;
    const width = canvas && canvas.width;
    this.id = uid();
    this.ctx = context;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this._options = options;
    this._aspectRatio = this.aspectRatio;
    this._layers = [];
    this._metasets = [];
    this._stacks = void 0;
    this.boxes = [];
    this.currentDevicePixelRatio = void 0;
    this.chartArea = void 0;
    this._active = [];
    this._lastEvent = void 0;
    this._listeners = {};
    this._responsiveListeners = void 0;
    this._sortedMetasets = [];
    this.scales = {};
    this._plugins = new PluginService();
    this.$proxies = {};
    this._hiddenIndices = {};
    this.attached = false;
    this._animationsDisabled = void 0;
    this.$context = void 0;
    this._doResize = debounce((mode) => this.update(mode), options.resizeDelay || 0);
    this._dataChanges = [];
    instances[this.id] = this;
    if (!context || !canvas) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    animator.listen(this, "complete", onAnimationsComplete);
    animator.listen(this, "progress", onAnimationProgress);
    this._initialize();
    if (this.attached) {
      this.update();
    }
  }
  get aspectRatio() {
    const { options: { aspectRatio, maintainAspectRatio }, width, height, _aspectRatio } = this;
    if (!isNullOrUndef(aspectRatio)) {
      return aspectRatio;
    }
    if (maintainAspectRatio && _aspectRatio) {
      return _aspectRatio;
    }
    return height ? width / height : null;
  }
  get data() {
    return this.config.data;
  }
  set data(data) {
    this.config.data = data;
  }
  get options() {
    return this._options;
  }
  set options(options) {
    this.config.options = options;
  }
  get registry() {
    return registry;
  }
  _initialize() {
    this.notifyPlugins("beforeInit");
    if (this.options.responsive) {
      this.resize();
    } else {
      retinaScale(this, this.options.devicePixelRatio);
    }
    this.bindEvents();
    this.notifyPlugins("afterInit");
    return this;
  }
  clear() {
    clearCanvas(this.canvas, this.ctx);
    return this;
  }
  stop() {
    animator.stop(this);
    return this;
  }
  resize(width, height) {
    if (!animator.running(this)) {
      this._resize(width, height);
    } else {
      this._resizeBeforeDraw = {
        width,
        height
      };
    }
  }
  _resize(width, height) {
    const options = this.options;
    const canvas = this.canvas;
    const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
    const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
    const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
    const mode = this.width ? "resize" : "attach";
    this.width = newSize.width;
    this.height = newSize.height;
    this._aspectRatio = this.aspectRatio;
    if (!retinaScale(this, newRatio, true)) {
      return;
    }
    this.notifyPlugins("resize", {
      size: newSize
    });
    callback(options.onResize, [
      this,
      newSize
    ], this);
    if (this.attached) {
      if (this._doResize(mode)) {
        this.render();
      }
    }
  }
  ensureScalesHaveIDs() {
    const options = this.options;
    const scalesOptions = options.scales || {};
    each(scalesOptions, (axisOptions, axisID) => {
      axisOptions.id = axisID;
    });
  }
  buildOrUpdateScales() {
    const options = this.options;
    const scaleOpts = options.scales;
    const scales = this.scales;
    const updated = Object.keys(scales).reduce((obj, id) => {
      obj[id] = false;
      return obj;
    }, {});
    let items = [];
    if (scaleOpts) {
      items = items.concat(Object.keys(scaleOpts).map((id) => {
        const scaleOptions = scaleOpts[id];
        const axis = determineAxis(id, scaleOptions);
        const isRadial = axis === "r";
        const isHorizontal = axis === "x";
        return {
          options: scaleOptions,
          dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
          dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
        };
      }));
    }
    each(items, (item) => {
      const scaleOptions = item.options;
      const id = scaleOptions.id;
      const axis = determineAxis(id, scaleOptions);
      const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
      if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
        scaleOptions.position = item.dposition;
      }
      updated[id] = true;
      let scale = null;
      if (id in scales && scales[id].type === scaleType) {
        scale = scales[id];
      } else {
        const scaleClass = registry.getScale(scaleType);
        scale = new scaleClass({
          id,
          type: scaleType,
          ctx: this.ctx,
          chart: this
        });
        scales[scale.id] = scale;
      }
      scale.init(scaleOptions, options);
    });
    each(updated, (hasUpdated, id) => {
      if (!hasUpdated) {
        delete scales[id];
      }
    });
    each(scales, (scale) => {
      layouts.configure(this, scale, scale.options);
      layouts.addBox(this, scale);
    });
  }
  _updateMetasets() {
    const metasets = this._metasets;
    const numData = this.data.datasets.length;
    const numMeta = metasets.length;
    metasets.sort((a, b) => a.index - b.index);
    if (numMeta > numData) {
      for (let i = numData; i < numMeta; ++i) {
        this._destroyDatasetMeta(i);
      }
      metasets.splice(numData, numMeta - numData);
    }
    this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: metasets, data: { datasets } } = this;
    if (metasets.length > datasets.length) {
      delete this._stacks;
    }
    metasets.forEach((meta, index) => {
      if (datasets.filter((x) => x === meta._dataset).length === 0) {
        this._destroyDatasetMeta(index);
      }
    });
  }
  buildOrUpdateControllers() {
    const newControllers = [];
    const datasets = this.data.datasets;
    let i, ilen;
    this._removeUnreferencedMetasets();
    for (i = 0, ilen = datasets.length; i < ilen; i++) {
      const dataset = datasets[i];
      let meta = this.getDatasetMeta(i);
      const type = dataset.type || this.config.type;
      if (meta.type && meta.type !== type) {
        this._destroyDatasetMeta(i);
        meta = this.getDatasetMeta(i);
      }
      meta.type = type;
      meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
      meta.order = dataset.order || 0;
      meta.index = i;
      meta.label = "" + dataset.label;
      meta.visible = this.isDatasetVisible(i);
      if (meta.controller) {
        meta.controller.updateIndex(i);
        meta.controller.linkScales();
      } else {
        const ControllerClass = registry.getController(type);
        const { datasetElementType, dataElementType } = defaults.datasets[type];
        Object.assign(ControllerClass, {
          dataElementType: registry.getElement(dataElementType),
          datasetElementType: datasetElementType && registry.getElement(datasetElementType)
        });
        meta.controller = new ControllerClass(this, i);
        newControllers.push(meta.controller);
      }
    }
    this._updateMetasets();
    return newControllers;
  }
  _resetElements() {
    each(this.data.datasets, (dataset, datasetIndex) => {
      this.getDatasetMeta(datasetIndex).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements();
    this.notifyPlugins("reset");
  }
  update(mode) {
    const config = this.config;
    config.update();
    const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
    const animsDisabled = this._animationsDisabled = !options.animation;
    this._updateScales();
    this._checkEventBindings();
    this._updateHiddenIndices();
    this._plugins.invalidate();
    if (this.notifyPlugins("beforeUpdate", {
      mode,
      cancelable: true
    }) === false) {
      return;
    }
    const newControllers = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let minPadding = 0;
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
      const { controller } = this.getDatasetMeta(i);
      const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
      controller.buildOrUpdateElements(reset);
      minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
    }
    minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
    this._updateLayout(minPadding);
    if (!animsDisabled) {
      each(newControllers, (controller) => {
        controller.reset();
      });
    }
    this._updateDatasets(mode);
    this.notifyPlugins("afterUpdate", {
      mode
    });
    this._layers.sort(compare2Level("z", "_idx"));
    const { _active, _lastEvent } = this;
    if (_lastEvent) {
      this._eventHandler(_lastEvent, true);
    } else if (_active.length) {
      this._updateHoverStyles(_active, _active, true);
    }
    this.render();
  }
  _updateScales() {
    each(this.scales, (scale) => {
      layouts.removeBox(this, scale);
    });
    this.ensureScalesHaveIDs();
    this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const options = this.options;
    const existingEvents = new Set(Object.keys(this._listeners));
    const newEvents = new Set(options.events);
    if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
      this.unbindEvents();
      this.bindEvents();
    }
  }
  _updateHiddenIndices() {
    const { _hiddenIndices } = this;
    const changes = this._getUniformDataChanges() || [];
    for (const { method, start, count } of changes) {
      const move = method === "_removeElements" ? -count : count;
      moveNumericKeys(_hiddenIndices, start, move);
    }
  }
  _getUniformDataChanges() {
    const _dataChanges = this._dataChanges;
    if (!_dataChanges || !_dataChanges.length) {
      return;
    }
    this._dataChanges = [];
    const datasetCount = this.data.datasets.length;
    const makeSet = (idx) => new Set(_dataChanges.filter((c) => c[0] === idx).map((c, i) => i + "," + c.splice(1).join(",")));
    const changeSet = makeSet(0);
    for (let i = 1; i < datasetCount; i++) {
      if (!setsEqual(changeSet, makeSet(i))) {
        return;
      }
    }
    return Array.from(changeSet).map((c) => c.split(",")).map((a) => ({
      method: a[1],
      start: +a[2],
      count: +a[3]
    }));
  }
  _updateLayout(minPadding) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: true
    }) === false) {
      return;
    }
    layouts.update(this, this.width, this.height, minPadding);
    const area = this.chartArea;
    const noArea = area.width <= 0 || area.height <= 0;
    this._layers = [];
    each(this.boxes, (box) => {
      if (noArea && box.position === "chartArea") {
        return;
      }
      if (box.configure) {
        box.configure();
      }
      this._layers.push(...box._layers());
    }, this);
    this._layers.forEach((item, index) => {
      item._idx = index;
    });
    this.notifyPlugins("afterLayout");
  }
  _updateDatasets(mode) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode,
      cancelable: true
    }) === false) {
      return;
    }
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this.getDatasetMeta(i).controller.configure();
    }
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this._updateDataset(i, isFunction(mode) ? mode({
        datasetIndex: i
      }) : mode);
    }
    this.notifyPlugins("afterDatasetsUpdate", {
      mode
    });
  }
  _updateDataset(index, mode) {
    const meta = this.getDatasetMeta(index);
    const args = {
      meta,
      index,
      mode,
      cancelable: true
    };
    if (this.notifyPlugins("beforeDatasetUpdate", args) === false) {
      return;
    }
    meta.controller._update(mode);
    args.cancelable = false;
    this.notifyPlugins("afterDatasetUpdate", args);
  }
  render() {
    if (this.notifyPlugins("beforeRender", {
      cancelable: true
    }) === false) {
      return;
    }
    if (animator.has(this)) {
      if (this.attached && !animator.running(this)) {
        animator.start(this);
      }
    } else {
      this.draw();
      onAnimationsComplete({
        chart: this
      });
    }
  }
  draw() {
    let i;
    if (this._resizeBeforeDraw) {
      const { width, height } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null;
      this._resize(width, height);
    }
    this.clear();
    if (this.width <= 0 || this.height <= 0) {
      return;
    }
    if (this.notifyPlugins("beforeDraw", {
      cancelable: true
    }) === false) {
      return;
    }
    const layers = this._layers;
    for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
      layers[i].draw(this.chartArea);
    }
    this._drawDatasets();
    for (; i < layers.length; ++i) {
      layers[i].draw(this.chartArea);
    }
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(filterVisible) {
    const metasets = this._sortedMetasets;
    const result = [];
    let i, ilen;
    for (i = 0, ilen = metasets.length; i < ilen; ++i) {
      const meta = metasets[i];
      if (!filterVisible || meta.visible) {
        result.push(meta);
      }
    }
    return result;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(true);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: true
    }) === false) {
      return;
    }
    const metasets = this.getSortedVisibleDatasetMetas();
    for (let i = metasets.length - 1; i >= 0; --i) {
      this._drawDataset(metasets[i]);
    }
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(meta) {
    const ctx = this.ctx;
    const clip = meta._clip;
    const useClip = !clip.disabled;
    const area = getDatasetArea(meta, this.chartArea);
    const args = {
      meta,
      index: meta.index,
      cancelable: true
    };
    if (this.notifyPlugins("beforeDatasetDraw", args) === false) {
      return;
    }
    if (useClip) {
      clipArea(ctx, {
        left: clip.left === false ? 0 : area.left - clip.left,
        right: clip.right === false ? this.width : area.right + clip.right,
        top: clip.top === false ? 0 : area.top - clip.top,
        bottom: clip.bottom === false ? this.height : area.bottom + clip.bottom
      });
    }
    meta.controller.draw();
    if (useClip) {
      unclipArea(ctx);
    }
    args.cancelable = false;
    this.notifyPlugins("afterDatasetDraw", args);
  }
  isPointInArea(point) {
    return _isPointInArea(point, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, mode, options, useFinalPosition) {
    const method = Interaction.modes[mode];
    if (typeof method === "function") {
      return method(this, e, options, useFinalPosition);
    }
    return [];
  }
  getDatasetMeta(datasetIndex) {
    const dataset = this.data.datasets[datasetIndex];
    const metasets = this._metasets;
    let meta = metasets.filter((x) => x && x._dataset === dataset).pop();
    if (!meta) {
      meta = {
        type: null,
        data: [],
        dataset: null,
        controller: null,
        hidden: null,
        xAxisID: null,
        yAxisID: null,
        order: dataset && dataset.order || 0,
        index: datasetIndex,
        _dataset: dataset,
        _parsed: [],
        _sorted: false
      };
      metasets.push(meta);
    }
    return meta;
  }
  getContext() {
    return this.$context || (this.$context = createContext(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(datasetIndex) {
    const dataset = this.data.datasets[datasetIndex];
    if (!dataset) {
      return false;
    }
    const meta = this.getDatasetMeta(datasetIndex);
    return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
  }
  setDatasetVisibility(datasetIndex, visible) {
    const meta = this.getDatasetMeta(datasetIndex);
    meta.hidden = !visible;
  }
  toggleDataVisibility(index) {
    this._hiddenIndices[index] = !this._hiddenIndices[index];
  }
  getDataVisibility(index) {
    return !this._hiddenIndices[index];
  }
  _updateVisibility(datasetIndex, dataIndex, visible) {
    const mode = visible ? "show" : "hide";
    const meta = this.getDatasetMeta(datasetIndex);
    const anims = meta.controller._resolveAnimations(void 0, mode);
    if (defined(dataIndex)) {
      meta.data[dataIndex].hidden = !visible;
      this.update();
    } else {
      this.setDatasetVisibility(datasetIndex, visible);
      anims.update(meta, {
        visible
      });
      this.update((ctx) => ctx.datasetIndex === datasetIndex ? mode : void 0);
    }
  }
  hide(datasetIndex, dataIndex) {
    this._updateVisibility(datasetIndex, dataIndex, false);
  }
  show(datasetIndex, dataIndex) {
    this._updateVisibility(datasetIndex, dataIndex, true);
  }
  _destroyDatasetMeta(datasetIndex) {
    const meta = this._metasets[datasetIndex];
    if (meta && meta.controller) {
      meta.controller._destroy();
    }
    delete this._metasets[datasetIndex];
  }
  _stop() {
    let i, ilen;
    this.stop();
    animator.remove(this);
    for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this._destroyDatasetMeta(i);
    }
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas, ctx } = this;
    this._stop();
    this.config.clearCache();
    if (canvas) {
      this.unbindEvents();
      clearCanvas(canvas, ctx);
      this.platform.releaseContext(ctx);
      this.canvas = null;
      this.ctx = null;
    }
    delete instances[this.id];
    this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...args) {
    return this.canvas.toDataURL(...args);
  }
  bindEvents() {
    this.bindUserEvents();
    if (this.options.responsive) {
      this.bindResponsiveEvents();
    } else {
      this.attached = true;
    }
  }
  bindUserEvents() {
    const listeners = this._listeners;
    const platform = this.platform;
    const _add = (type, listener2) => {
      platform.addEventListener(this, type, listener2);
      listeners[type] = listener2;
    };
    const listener = (e, x, y) => {
      e.offsetX = x;
      e.offsetY = y;
      this._eventHandler(e);
    };
    each(this.options.events, (type) => _add(type, listener));
  }
  bindResponsiveEvents() {
    if (!this._responsiveListeners) {
      this._responsiveListeners = {};
    }
    const listeners = this._responsiveListeners;
    const platform = this.platform;
    const _add = (type, listener2) => {
      platform.addEventListener(this, type, listener2);
      listeners[type] = listener2;
    };
    const _remove = (type, listener2) => {
      if (listeners[type]) {
        platform.removeEventListener(this, type, listener2);
        delete listeners[type];
      }
    };
    const listener = (width, height) => {
      if (this.canvas) {
        this.resize(width, height);
      }
    };
    let detached;
    const attached = () => {
      _remove("attach", attached);
      this.attached = true;
      this.resize();
      _add("resize", listener);
      _add("detach", detached);
    };
    detached = () => {
      this.attached = false;
      _remove("resize", listener);
      this._stop();
      this._resize(0, 0);
      _add("attach", attached);
    };
    if (platform.isAttached(this.canvas)) {
      attached();
    } else {
      detached();
    }
  }
  unbindEvents() {
    each(this._listeners, (listener, type) => {
      this.platform.removeEventListener(this, type, listener);
    });
    this._listeners = {};
    each(this._responsiveListeners, (listener, type) => {
      this.platform.removeEventListener(this, type, listener);
    });
    this._responsiveListeners = void 0;
  }
  updateHoverStyle(items, mode, enabled) {
    const prefix = enabled ? "set" : "remove";
    let meta, item, i, ilen;
    if (mode === "dataset") {
      meta = this.getDatasetMeta(items[0].datasetIndex);
      meta.controller["_" + prefix + "DatasetHoverStyle"]();
    }
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      item = items[i];
      const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
      if (controller) {
        controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
      }
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(activeElements) {
    const lastActive = this._active || [];
    const active = activeElements.map(({ datasetIndex, index }) => {
      const meta = this.getDatasetMeta(datasetIndex);
      if (!meta) {
        throw new Error("No dataset found at index " + datasetIndex);
      }
      return {
        datasetIndex,
        element: meta.data[index],
        index
      };
    });
    const changed = !_elementsEqual(active, lastActive);
    if (changed) {
      this._active = active;
      this._lastEvent = null;
      this._updateHoverStyles(active, lastActive);
    }
  }
  notifyPlugins(hook, args, filter) {
    return this._plugins.notify(this, hook, args, filter);
  }
  isPluginEnabled(pluginId) {
    return this._plugins._cache.filter((p) => p.plugin.id === pluginId).length === 1;
  }
  _updateHoverStyles(active, lastActive, replay) {
    const hoverOptions = this.options.hover;
    const diff = (a, b) => a.filter((x) => !b.some((y) => x.datasetIndex === y.datasetIndex && x.index === y.index));
    const deactivated = diff(lastActive, active);
    const activated = replay ? active : diff(active, lastActive);
    if (deactivated.length) {
      this.updateHoverStyle(deactivated, hoverOptions.mode, false);
    }
    if (activated.length && hoverOptions.mode) {
      this.updateHoverStyle(activated, hoverOptions.mode, true);
    }
  }
  _eventHandler(e, replay) {
    const args = {
      event: e,
      replay,
      cancelable: true,
      inChartArea: this.isPointInArea(e)
    };
    const eventFilter = (plugin) => (plugin.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) {
      return;
    }
    const changed = this._handleEvent(e, replay, args.inChartArea);
    args.cancelable = false;
    this.notifyPlugins("afterEvent", args, eventFilter);
    if (changed || args.changed) {
      this.render();
    }
    return this;
  }
  _handleEvent(e, replay, inChartArea) {
    const { _active: lastActive = [], options } = this;
    const useFinalPosition = replay;
    const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
    const isClick = _isClickEvent(e);
    const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
    if (inChartArea) {
      this._lastEvent = null;
      callback(options.onHover, [
        e,
        active,
        this
      ], this);
      if (isClick) {
        callback(options.onClick, [
          e,
          active,
          this
        ], this);
      }
    }
    const changed = !_elementsEqual(active, lastActive);
    if (changed || replay) {
      this._active = active;
      this._updateHoverStyles(active, lastActive, replay);
    }
    this._lastEvent = lastEvent;
    return changed;
  }
  _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
    if (e.type === "mouseout") {
      return [];
    }
    if (!inChartArea) {
      return lastActive;
    }
    const hoverOptions = this.options.hover;
    return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
  }
}, __publicField(_a, "defaults", defaults), __publicField(_a, "instances", instances), __publicField(_a, "overrides", overrides), __publicField(_a, "registry", registry), __publicField(_a, "version", version), __publicField(_a, "getChart", getChart), _a);
function invalidatePlugins() {
  return each(Chart$1.instances, (chart) => chart._plugins.invalidate());
}
function setStyle(ctx, options, style = options) {
  ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
  ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
  ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
  ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
  ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
  ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
}
function lineTo(ctx, previous, target) {
  ctx.lineTo(target.x, target.y);
}
function getLineMethod(options) {
  if (options.stepped) {
    return _steppedLineTo;
  }
  if (options.tension || options.cubicInterpolationMode === "monotone") {
    return _bezierCurveTo;
  }
  return lineTo;
}
function pathVars(points, segment, params = {}) {
  const count = points.length;
  const { start: paramsStart = 0, end: paramsEnd = count - 1 } = params;
  const { start: segmentStart, end: segmentEnd } = segment;
  const start = Math.max(paramsStart, segmentStart);
  const end = Math.min(paramsEnd, segmentEnd);
  const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
  return {
    count,
    start,
    loop: segment.loop,
    ilen: end < start && !outside ? count + end - start : end - start
  };
}
function pathSegment(ctx, line, segment, params) {
  const { points, options } = line;
  const { count, start, loop, ilen } = pathVars(points, segment, params);
  const lineMethod = getLineMethod(options);
  let { move = true, reverse } = params || {};
  let i, point, prev;
  for (i = 0; i <= ilen; ++i) {
    point = points[(start + (reverse ? ilen - i : i)) % count];
    if (point.skip) {
      continue;
    } else if (move) {
      ctx.moveTo(point.x, point.y);
      move = false;
    } else {
      lineMethod(ctx, prev, point, reverse, options.stepped);
    }
    prev = point;
  }
  if (loop) {
    point = points[(start + (reverse ? ilen : 0)) % count];
    lineMethod(ctx, prev, point, reverse, options.stepped);
  }
  return !!loop;
}
function fastPathSegment(ctx, line, segment, params) {
  const points = line.points;
  const { count, start, ilen } = pathVars(points, segment, params);
  const { move = true, reverse } = params || {};
  let avgX = 0;
  let countX = 0;
  let i, point, prevX, minY, maxY, lastY;
  const pointIndex = (index) => (start + (reverse ? ilen - index : index)) % count;
  const drawX = () => {
    if (minY !== maxY) {
      ctx.lineTo(avgX, maxY);
      ctx.lineTo(avgX, minY);
      ctx.lineTo(avgX, lastY);
    }
  };
  if (move) {
    point = points[pointIndex(0)];
    ctx.moveTo(point.x, point.y);
  }
  for (i = 0; i <= ilen; ++i) {
    point = points[pointIndex(i)];
    if (point.skip) {
      continue;
    }
    const x = point.x;
    const y = point.y;
    const truncX = x | 0;
    if (truncX === prevX) {
      if (y < minY) {
        minY = y;
      } else if (y > maxY) {
        maxY = y;
      }
      avgX = (countX * avgX + x) / ++countX;
    } else {
      drawX();
      ctx.lineTo(x, y);
      prevX = truncX;
      countX = 0;
      minY = maxY = y;
    }
    lastY = y;
  }
  drawX();
}
function _getSegmentMethod(line) {
  const opts = line.options;
  const borderDash = opts.borderDash && opts.borderDash.length;
  const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== "monotone" && !opts.stepped && !borderDash;
  return useFastPath ? fastPathSegment : pathSegment;
}
function _getInterpolationMethod(options) {
  if (options.stepped) {
    return _steppedInterpolation;
  }
  if (options.tension || options.cubicInterpolationMode === "monotone") {
    return _bezierInterpolation;
  }
  return _pointInLine;
}
function strokePathWithCache(ctx, line, start, count) {
  let path = line._path;
  if (!path) {
    path = line._path = new Path2D();
    if (line.path(path, start, count)) {
      path.closePath();
    }
  }
  setStyle(ctx, line.options);
  ctx.stroke(path);
}
function strokePathDirect(ctx, line, start, count) {
  const { segments, options } = line;
  const segmentMethod = _getSegmentMethod(line);
  for (const segment of segments) {
    setStyle(ctx, options, segment.style);
    ctx.beginPath();
    if (segmentMethod(ctx, line, segment, {
      start,
      end: start + count - 1
    })) {
      ctx.closePath();
    }
    ctx.stroke();
  }
}
const usePath2D = typeof Path2D === "function";
function draw(ctx, line, start, count) {
  if (usePath2D && !line.options.segment) {
    strokePathWithCache(ctx, line, start, count);
  } else {
    strokePathDirect(ctx, line, start, count);
  }
}
class LineElement extends Element {
  constructor(cfg) {
    super();
    this.animated = true;
    this.options = void 0;
    this._chart = void 0;
    this._loop = void 0;
    this._fullLoop = void 0;
    this._path = void 0;
    this._points = void 0;
    this._segments = void 0;
    this._decimated = false;
    this._pointsUpdated = false;
    this._datasetIndex = void 0;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  updateControlPoints(chartArea, indexAxis) {
    const options = this.options;
    if ((options.tension || options.cubicInterpolationMode === "monotone") && !options.stepped && !this._pointsUpdated) {
      const loop = options.spanGaps ? this._loop : this._fullLoop;
      _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
      this._pointsUpdated = true;
    }
  }
  set points(points) {
    this._points = points;
    delete this._segments;
    delete this._path;
    this._pointsUpdated = false;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = _computeSegments(this, this.options.segment));
  }
  first() {
    const segments = this.segments;
    const points = this.points;
    return segments.length && points[segments[0].start];
  }
  last() {
    const segments = this.segments;
    const points = this.points;
    const count = segments.length;
    return count && points[segments[count - 1].end];
  }
  interpolate(point, property) {
    const options = this.options;
    const value = point[property];
    const points = this.points;
    const segments = _boundSegments(this, {
      property,
      start: value,
      end: value
    });
    if (!segments.length) {
      return;
    }
    const result = [];
    const _interpolate = _getInterpolationMethod(options);
    let i, ilen;
    for (i = 0, ilen = segments.length; i < ilen; ++i) {
      const { start, end } = segments[i];
      const p1 = points[start];
      const p2 = points[end];
      if (p1 === p2) {
        result.push(p1);
        continue;
      }
      const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
      const interpolated = _interpolate(p1, p2, t, options.stepped);
      interpolated[property] = point[property];
      result.push(interpolated);
    }
    return result.length === 1 ? result[0] : result;
  }
  pathSegment(ctx, segment, params) {
    const segmentMethod = _getSegmentMethod(this);
    return segmentMethod(ctx, this, segment, params);
  }
  path(ctx, start, count) {
    const segments = this.segments;
    const segmentMethod = _getSegmentMethod(this);
    let loop = this._loop;
    start = start || 0;
    count = count || this.points.length - start;
    for (const segment of segments) {
      loop &= segmentMethod(ctx, this, segment, {
        start,
        end: start + count - 1
      });
    }
    return !!loop;
  }
  draw(ctx, chartArea, start, count) {
    const options = this.options || {};
    const points = this.points || [];
    if (points.length && options.borderWidth) {
      ctx.save();
      draw(ctx, this, start, count);
      ctx.restore();
    }
    if (this.animated) {
      this._pointsUpdated = false;
      this._path = void 0;
    }
  }
}
__publicField(LineElement, "id", "line");
__publicField(LineElement, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: true,
  cubicInterpolationMode: "default",
  fill: false,
  spanGaps: false,
  stepped: false,
  tension: 0
});
__publicField(LineElement, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
__publicField(LineElement, "descriptors", {
  _scriptable: true,
  _indexable: (name) => name !== "borderDash" && name !== "fill"
});
function generateTicks$1(generationOptions, dataRange) {
  const ticks = [];
  const MIN_SPACING = 1e-14;
  const { bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds } = generationOptions;
  const unit = step || 1;
  const maxSpaces = maxTicks - 1;
  const { min: rmin, max: rmax } = dataRange;
  const minDefined = !isNullOrUndef(min);
  const maxDefined = !isNullOrUndef(max);
  const countDefined = !isNullOrUndef(count);
  const minSpacing = (rmax - rmin) / (maxDigits + 1);
  let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
  let factor, niceMin, niceMax, numSpaces;
  if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
    return [
      {
        value: rmin
      },
      {
        value: rmax
      }
    ];
  }
  numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
  if (numSpaces > maxSpaces) {
    spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
  }
  if (!isNullOrUndef(precision)) {
    factor = Math.pow(10, precision);
    spacing = Math.ceil(spacing * factor) / factor;
  }
  if (bounds === "ticks") {
    niceMin = Math.floor(rmin / spacing) * spacing;
    niceMax = Math.ceil(rmax / spacing) * spacing;
  } else {
    niceMin = rmin;
    niceMax = rmax;
  }
  if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
    numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
    spacing = (max - min) / numSpaces;
    niceMin = min;
    niceMax = max;
  } else if (countDefined) {
    niceMin = minDefined ? min : niceMin;
    niceMax = maxDefined ? max : niceMax;
    numSpaces = count - 1;
    spacing = (niceMax - niceMin) / numSpaces;
  } else {
    numSpaces = (niceMax - niceMin) / spacing;
    if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
      numSpaces = Math.round(numSpaces);
    } else {
      numSpaces = Math.ceil(numSpaces);
    }
  }
  const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
  factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
  niceMin = Math.round(niceMin * factor) / factor;
  niceMax = Math.round(niceMax * factor) / factor;
  let j = 0;
  if (minDefined) {
    if (includeBounds && niceMin !== min) {
      ticks.push({
        value: min
      });
      if (niceMin < min) {
        j++;
      }
      if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
        j++;
      }
    } else if (niceMin < min) {
      j++;
    }
  }
  for (; j < numSpaces; ++j) {
    const tickValue = Math.round((niceMin + j * spacing) * factor) / factor;
    if (maxDefined && tickValue > max) {
      break;
    }
    ticks.push({
      value: tickValue
    });
  }
  if (maxDefined && includeBounds && niceMax !== max) {
    if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
      ticks[ticks.length - 1].value = max;
    } else {
      ticks.push({
        value: max
      });
    }
  } else if (!maxDefined || niceMax === max) {
    ticks.push({
      value: niceMax
    });
  }
  return ticks;
}
function relativeLabelSize(value, minSpacing, { horizontal, minRotation }) {
  const rad = toRadians(minRotation);
  const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 1e-3;
  const length = 0.75 * minSpacing * ("" + value).length;
  return Math.min(minSpacing / ratio, length);
}
class LinearScaleBase extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = void 0;
    this.end = void 0;
    this._startValue = void 0;
    this._endValue = void 0;
    this._valueRange = 0;
  }
  parse(raw, index) {
    if (isNullOrUndef(raw)) {
      return null;
    }
    if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) {
      return null;
    }
    return +raw;
  }
  handleTickRangeOptions() {
    const { beginAtZero } = this.options;
    const { minDefined, maxDefined } = this.getUserBounds();
    let { min, max } = this;
    const setMin = (v) => min = minDefined ? min : v;
    const setMax = (v) => max = maxDefined ? max : v;
    if (beginAtZero) {
      const minSign = sign(min);
      const maxSign = sign(max);
      if (minSign < 0 && maxSign < 0) {
        setMax(0);
      } else if (minSign > 0 && maxSign > 0) {
        setMin(0);
      }
    }
    if (min === max) {
      let offset = max === 0 ? 1 : Math.abs(max * 0.05);
      setMax(max + offset);
      if (!beginAtZero) {
        setMin(min - offset);
      }
    }
    this.min = min;
    this.max = max;
  }
  getTickLimit() {
    const tickOpts = this.options.ticks;
    let { maxTicksLimit, stepSize } = tickOpts;
    let maxTicks;
    if (stepSize) {
      maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
      if (maxTicks > 1e3) {
        console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
        maxTicks = 1e3;
      }
    } else {
      maxTicks = this.computeTickLimit();
      maxTicksLimit = maxTicksLimit || 11;
    }
    if (maxTicksLimit) {
      maxTicks = Math.min(maxTicksLimit, maxTicks);
    }
    return maxTicks;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const opts = this.options;
    const tickOpts = opts.ticks;
    let maxTicks = this.getTickLimit();
    maxTicks = Math.max(2, maxTicks);
    const numericGeneratorOptions = {
      maxTicks,
      bounds: opts.bounds,
      min: opts.min,
      max: opts.max,
      precision: tickOpts.precision,
      step: tickOpts.stepSize,
      count: tickOpts.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: tickOpts.minRotation || 0,
      includeBounds: tickOpts.includeBounds !== false
    };
    const dataRange = this._range || this;
    const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
    if (opts.bounds === "ticks") {
      _setMinAndMaxByKey(ticks, this, "value");
    }
    if (opts.reverse) {
      ticks.reverse();
      this.start = this.max;
      this.end = this.min;
    } else {
      this.start = this.min;
      this.end = this.max;
    }
    return ticks;
  }
  configure() {
    const ticks = this.ticks;
    let start = this.min;
    let end = this.max;
    super.configure();
    if (this.options.offset && ticks.length) {
      const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
      start -= offset;
      end += offset;
    }
    this._startValue = start;
    this._endValue = end;
    this._valueRange = end - start;
  }
  getLabelForValue(value) {
    return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
  }
}
class LinearScale extends LinearScaleBase {
  determineDataLimits() {
    const { min, max } = this.getMinMax(true);
    this.min = isNumberFinite(min) ? min : 0;
    this.max = isNumberFinite(max) ? max : 1;
    this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const horizontal = this.isHorizontal();
    const length = horizontal ? this.width : this.height;
    const minRotation = toRadians(this.options.ticks.minRotation);
    const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 1e-3;
    const tickFont = this._resolveTickFontOptions(0);
    return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
  }
  getPixelForValue(value) {
    return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
  }
  getValueForPixel(pixel) {
    return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
  }
}
__publicField(LinearScale, "id", "linear");
__publicField(LinearScale, "defaults", {
  ticks: {
    callback: Ticks.formatters.numeric
  }
});
const INTERVALS = {
  millisecond: {
    common: true,
    size: 1,
    steps: 1e3
  },
  second: {
    common: true,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: true,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: true,
    size: 36e5,
    steps: 24
  },
  day: {
    common: true,
    size: 864e5,
    steps: 30
  },
  week: {
    common: false,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: true,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: false,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: true,
    size: 3154e7
  }
};
const UNITS = /* @__PURE__ */ Object.keys(INTERVALS);
function sorter(a, b) {
  return a - b;
}
function parse(scale, input) {
  if (isNullOrUndef(input)) {
    return null;
  }
  const adapter = scale._adapter;
  const { parser, round: round2, isoWeekday } = scale._parseOpts;
  let value = input;
  if (typeof parser === "function") {
    value = parser(value);
  }
  if (!isNumberFinite(value)) {
    value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
  }
  if (value === null) {
    return null;
  }
  if (round2) {
    value = round2 === "week" && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round2);
  }
  return +value;
}
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
  const ilen = UNITS.length;
  for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
    const interval = INTERVALS[UNITS[i]];
    const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
    if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
      return UNITS[i];
    }
  }
  return UNITS[ilen - 1];
}
function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
  for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
    const unit = UNITS[i];
    if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
      return unit;
    }
  }
  return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
function determineMajorUnit(unit) {
  for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
    if (INTERVALS[UNITS[i]].common) {
      return UNITS[i];
    }
  }
}
function addTick(ticks, time, timestamps) {
  if (!timestamps) {
    ticks[time] = true;
  } else if (timestamps.length) {
    const { lo, hi } = _lookup(timestamps, time);
    const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
    ticks[timestamp] = true;
  }
}
function setMajorTicks(scale, ticks, map2, majorUnit) {
  const adapter = scale._adapter;
  const first2 = +adapter.startOf(ticks[0].value, majorUnit);
  const last = ticks[ticks.length - 1].value;
  let major, index;
  for (major = first2; major <= last; major = +adapter.add(major, 1, majorUnit)) {
    index = map2[major];
    if (index >= 0) {
      ticks[index].major = true;
    }
  }
  return ticks;
}
function ticksFromTimestamps(scale, values, majorUnit) {
  const ticks = [];
  const map2 = {};
  const ilen = values.length;
  let i, value;
  for (i = 0; i < ilen; ++i) {
    value = values[i];
    map2[value] = i;
    ticks.push({
      value,
      major: false
    });
  }
  return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map2, majorUnit);
}
class TimeScale extends Scale {
  constructor(props) {
    super(props);
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
    this._unit = "day";
    this._majorUnit = void 0;
    this._offsets = {};
    this._normalized = false;
    this._parseOpts = void 0;
  }
  init(scaleOpts, opts = {}) {
    const time = scaleOpts.time || (scaleOpts.time = {});
    const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
    adapter.init(opts);
    mergeIf(time.displayFormats, adapter.formats());
    this._parseOpts = {
      parser: time.parser,
      round: time.round,
      isoWeekday: time.isoWeekday
    };
    super.init(scaleOpts);
    this._normalized = opts.normalized;
  }
  parse(raw, index) {
    if (raw === void 0) {
      return null;
    }
    return parse(this, raw);
  }
  beforeLayout() {
    super.beforeLayout();
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const options = this.options;
    const adapter = this._adapter;
    const unit = options.time.unit || "day";
    let { min, max, minDefined, maxDefined } = this.getUserBounds();
    function _applyBounds(bounds) {
      if (!minDefined && !isNaN(bounds.min)) {
        min = Math.min(min, bounds.min);
      }
      if (!maxDefined && !isNaN(bounds.max)) {
        max = Math.max(max, bounds.max);
      }
    }
    if (!minDefined || !maxDefined) {
      _applyBounds(this._getLabelBounds());
      if (options.bounds !== "ticks" || options.ticks.source !== "labels") {
        _applyBounds(this.getMinMax(false));
      }
    }
    min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
    max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
    this.min = Math.min(min, max - 1);
    this.max = Math.max(min + 1, max);
  }
  _getLabelBounds() {
    const arr = this.getLabelTimestamps();
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    if (arr.length) {
      min = arr[0];
      max = arr[arr.length - 1];
    }
    return {
      min,
      max
    };
  }
  buildTicks() {
    const options = this.options;
    const timeOpts = options.time;
    const tickOpts = options.ticks;
    const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
    if (options.bounds === "ticks" && timestamps.length) {
      this.min = this._userMin || timestamps[0];
      this.max = this._userMax || timestamps[timestamps.length - 1];
    }
    const min = this.min;
    const max = this.max;
    const ticks = _filterBetween(timestamps, min, max);
    this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
    this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
    this.initOffsets(timestamps);
    if (options.reverse) {
      ticks.reverse();
    }
    return ticksFromTimestamps(this, ticks, this._majorUnit);
  }
  afterAutoSkip() {
    if (this.options.offsetAfterAutoskip) {
      this.initOffsets(this.ticks.map((tick) => +tick.value));
    }
  }
  initOffsets(timestamps = []) {
    let start = 0;
    let end = 0;
    let first2, last;
    if (this.options.offset && timestamps.length) {
      first2 = this.getDecimalForValue(timestamps[0]);
      if (timestamps.length === 1) {
        start = 1 - first2;
      } else {
        start = (this.getDecimalForValue(timestamps[1]) - first2) / 2;
      }
      last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
      if (timestamps.length === 1) {
        end = last;
      } else {
        end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
      }
    }
    const limit = timestamps.length < 3 ? 0.5 : 0.25;
    start = _limitValue(start, 0, limit);
    end = _limitValue(end, 0, limit);
    this._offsets = {
      start,
      end,
      factor: 1 / (start + 1 + end)
    };
  }
  _generate() {
    const adapter = this._adapter;
    const min = this.min;
    const max = this.max;
    const options = this.options;
    const timeOpts = options.time;
    const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
    const stepSize = valueOrDefault(options.ticks.stepSize, 1);
    const weekday = minor === "week" ? timeOpts.isoWeekday : false;
    const hasWeekday = isNumber(weekday) || weekday === true;
    const ticks = {};
    let first2 = min;
    let time, count;
    if (hasWeekday) {
      first2 = +adapter.startOf(first2, "isoWeek", weekday);
    }
    first2 = +adapter.startOf(first2, hasWeekday ? "day" : minor);
    if (adapter.diff(max, min, minor) > 1e5 * stepSize) {
      throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
    }
    const timestamps = options.ticks.source === "data" && this.getDataTimestamps();
    for (time = first2, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++) {
      addTick(ticks, time, timestamps);
    }
    if (time === max || options.bounds === "ticks" || count === 1) {
      addTick(ticks, time, timestamps);
    }
    return Object.keys(ticks).sort(sorter).map((x) => +x);
  }
  getLabelForValue(value) {
    const adapter = this._adapter;
    const timeOpts = this.options.time;
    if (timeOpts.tooltipFormat) {
      return adapter.format(value, timeOpts.tooltipFormat);
    }
    return adapter.format(value, timeOpts.displayFormats.datetime);
  }
  format(value, format2) {
    const options = this.options;
    const formats = options.time.displayFormats;
    const unit = this._unit;
    const fmt = format2 || formats[unit];
    return this._adapter.format(value, fmt);
  }
  _tickFormatFunction(time, index, ticks, format2) {
    const options = this.options;
    const formatter = options.ticks.callback;
    if (formatter) {
      return callback(formatter, [
        time,
        index,
        ticks
      ], this);
    }
    const formats = options.time.displayFormats;
    const unit = this._unit;
    const majorUnit = this._majorUnit;
    const minorFormat = unit && formats[unit];
    const majorFormat = majorUnit && formats[majorUnit];
    const tick = ticks[index];
    const major = majorUnit && majorFormat && tick && tick.major;
    return this._adapter.format(time, format2 || (major ? majorFormat : minorFormat));
  }
  generateTickLabels(ticks) {
    let i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; ++i) {
      tick = ticks[i];
      tick.label = this._tickFormatFunction(tick.value, i, ticks);
    }
  }
  getDecimalForValue(value) {
    return value === null ? NaN : (value - this.min) / (this.max - this.min);
  }
  getPixelForValue(value) {
    const offsets = this._offsets;
    const pos = this.getDecimalForValue(value);
    return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
  }
  getValueForPixel(pixel) {
    const offsets = this._offsets;
    const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return this.min + pos * (this.max - this.min);
  }
  _getLabelSize(label) {
    const ticksOpts = this.options.ticks;
    const tickLabelWidth = this.ctx.measureText(label).width;
    const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
    const cosRotation = Math.cos(angle);
    const sinRotation = Math.sin(angle);
    const tickFontSize = this._resolveTickFontOptions(0).size;
    return {
      w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
      h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
    };
  }
  _getLabelCapacity(exampleTime) {
    const timeOpts = this.options.time;
    const displayFormats = timeOpts.displayFormats;
    const format2 = displayFormats[timeOpts.unit] || displayFormats.millisecond;
    const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [
      exampleTime
    ], this._majorUnit), format2);
    const size = this._getLabelSize(exampleLabel);
    const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
    return capacity > 0 ? capacity : 1;
  }
  getDataTimestamps() {
    let timestamps = this._cache.data || [];
    let i, ilen;
    if (timestamps.length) {
      return timestamps;
    }
    const metas = this.getMatchingVisibleMetas();
    if (this._normalized && metas.length) {
      return this._cache.data = metas[0].controller.getAllParsedValues(this);
    }
    for (i = 0, ilen = metas.length; i < ilen; ++i) {
      timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
    }
    return this._cache.data = this.normalize(timestamps);
  }
  getLabelTimestamps() {
    const timestamps = this._cache.labels || [];
    let i, ilen;
    if (timestamps.length) {
      return timestamps;
    }
    const labels = this.getLabels();
    for (i = 0, ilen = labels.length; i < ilen; ++i) {
      timestamps.push(parse(this, labels[i]));
    }
    return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
  }
  normalize(values) {
    return _arrayUnique(values.sort(sorter));
  }
}
__publicField(TimeScale, "id", "time");
__publicField(TimeScale, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: false,
    unit: false,
    round: false,
    isoWeekday: false,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: false,
    major: {
      enabled: false
    }
  }
});
function interpolate(table, val, reverse) {
  let lo = 0;
  let hi = table.length - 1;
  let prevSource, nextSource, prevTarget, nextTarget;
  if (reverse) {
    if (val >= table[lo].pos && val <= table[hi].pos) {
      ({ lo, hi } = _lookupByKey(table, "pos", val));
    }
    ({ pos: prevSource, time: prevTarget } = table[lo]);
    ({ pos: nextSource, time: nextTarget } = table[hi]);
  } else {
    if (val >= table[lo].time && val <= table[hi].time) {
      ({ lo, hi } = _lookupByKey(table, "time", val));
    }
    ({ time: prevSource, pos: prevTarget } = table[lo]);
    ({ time: nextSource, pos: nextTarget } = table[hi]);
  }
  const span = nextSource - prevSource;
  return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
}
class TimeSeriesScale extends TimeScale {
  constructor(props) {
    super(props);
    this._table = [];
    this._minPos = void 0;
    this._tableRange = void 0;
  }
  initOffsets() {
    const timestamps = this._getTimestampsForTable();
    const table = this._table = this.buildLookupTable(timestamps);
    this._minPos = interpolate(table, this.min);
    this._tableRange = interpolate(table, this.max) - this._minPos;
    super.initOffsets(timestamps);
  }
  buildLookupTable(timestamps) {
    const { min, max } = this;
    const items = [];
    const table = [];
    let i, ilen, prev, curr, next;
    for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
      curr = timestamps[i];
      if (curr >= min && curr <= max) {
        items.push(curr);
      }
    }
    if (items.length < 2) {
      return [
        {
          time: min,
          pos: 0
        },
        {
          time: max,
          pos: 1
        }
      ];
    }
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      next = items[i + 1];
      prev = items[i - 1];
      curr = items[i];
      if (Math.round((next + prev) / 2) !== curr) {
        table.push({
          time: curr,
          pos: i / (ilen - 1)
        });
      }
    }
    return table;
  }
  _generate() {
    const min = this.min;
    const max = this.max;
    let timestamps = super.getDataTimestamps();
    if (!timestamps.includes(min) || !timestamps.length) {
      timestamps.splice(0, 0, min);
    }
    if (!timestamps.includes(max) || timestamps.length === 1) {
      timestamps.push(max);
    }
    return timestamps.sort((a, b) => a - b);
  }
  _getTimestampsForTable() {
    let timestamps = this._cache.all || [];
    if (timestamps.length) {
      return timestamps;
    }
    const data = this.getDataTimestamps();
    const label = this.getLabelTimestamps();
    if (data.length && label.length) {
      timestamps = this.normalize(data.concat(label));
    } else {
      timestamps = data.length ? data : label;
    }
    timestamps = this._cache.all = timestamps;
    return timestamps;
  }
  getDecimalForValue(value) {
    return (interpolate(this._table, value) - this._minPos) / this._tableRange;
  }
  getValueForPixel(pixel) {
    const offsets = this._offsets;
    const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
  }
}
__publicField(TimeSeriesScale, "id", "timeseries");
__publicField(TimeSeriesScale, "defaults", TimeScale.defaults);
const CommonProps = {
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  },
  plugins: {
    type: Array,
    default: () => []
  },
  datasetIdKey: {
    type: String,
    default: "label"
  },
  updateMode: {
    type: String,
    default: void 0
  }
};
const A11yProps = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
};
const Props = {
  type: {
    type: String,
    required: true
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...CommonProps,
  ...A11yProps
};
const compatProps = version$1[0] === "2" ? (internals, props) => Object.assign(internals, {
  attrs: props
}) : (internals, props) => Object.assign(internals, props);
function toRawIfProxy(obj) {
  return isProxy(obj) ? toRaw(obj) : obj;
}
function cloneProxy(obj) {
  let src = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : obj;
  return isProxy(src) ? new Proxy(obj, {}) : obj;
}
function setOptions(chart, nextOptions) {
  const options = chart.options;
  if (options && nextOptions) {
    Object.assign(options, nextOptions);
  }
}
function setLabels(currentData, nextLabels) {
  currentData.labels = nextLabels;
}
function setDatasets(currentData, nextDatasets, datasetIdKey) {
  const addedDatasets = [];
  currentData.datasets = nextDatasets.map((nextDataset) => {
    const currentDataset = currentData.datasets.find((dataset) => dataset[datasetIdKey] === nextDataset[datasetIdKey]);
    if (!currentDataset || !nextDataset.data || addedDatasets.includes(currentDataset)) {
      return {
        ...nextDataset
      };
    }
    addedDatasets.push(currentDataset);
    Object.assign(currentDataset, nextDataset);
    return currentDataset;
  });
}
function cloneData(data, datasetIdKey) {
  const nextData = {
    labels: [],
    datasets: []
  };
  setLabels(nextData, data.labels);
  setDatasets(nextData, data.datasets, datasetIdKey);
  return nextData;
}
const Chart = defineComponent({
  props: Props,
  setup(props, param) {
    let { expose, slots } = param;
    const canvasRef = ref(null);
    const chartRef = shallowRef(null);
    expose({
      chart: chartRef
    });
    const renderChart = () => {
      if (!canvasRef.value) return;
      const { type, data, options, plugins, datasetIdKey } = props;
      const clonedData = cloneData(data, datasetIdKey);
      const proxiedData = cloneProxy(clonedData, data);
      chartRef.value = new Chart$1(canvasRef.value, {
        type,
        data: proxiedData,
        options: {
          ...options
        },
        plugins
      });
    };
    const destroyChart = () => {
      const chart = toRaw(chartRef.value);
      if (chart) {
        if (props.destroyDelay > 0) {
          setTimeout(() => {
            chart.destroy();
            chartRef.value = null;
          }, props.destroyDelay);
        } else {
          chart.destroy();
          chartRef.value = null;
        }
      }
    };
    const update = (chart) => {
      chart.update(props.updateMode);
    };
    onMounted(renderChart);
    onUnmounted(destroyChart);
    watch([
      () => props.options,
      () => props.data
    ], (param2, param1) => {
      let [nextOptionsProxy, nextDataProxy] = param2, [prevOptionsProxy, prevDataProxy] = param1;
      const chart = toRaw(chartRef.value);
      if (!chart) {
        return;
      }
      let shouldUpdate = false;
      if (nextOptionsProxy) {
        const nextOptions = toRawIfProxy(nextOptionsProxy);
        const prevOptions = toRawIfProxy(prevOptionsProxy);
        if (nextOptions && nextOptions !== prevOptions) {
          setOptions(chart, nextOptions);
          shouldUpdate = true;
        }
      }
      if (nextDataProxy) {
        const nextLabels = toRawIfProxy(nextDataProxy.labels);
        const prevLabels = toRawIfProxy(prevDataProxy.labels);
        const nextDatasets = toRawIfProxy(nextDataProxy.datasets);
        const prevDatasets = toRawIfProxy(prevDataProxy.datasets);
        if (nextLabels !== prevLabels) {
          setLabels(chart.config.data, nextLabels);
          shouldUpdate = true;
        }
        if (nextDatasets && nextDatasets !== prevDatasets) {
          setDatasets(chart.config.data, nextDatasets, props.datasetIdKey);
          shouldUpdate = true;
        }
      }
      if (shouldUpdate) {
        nextTick(() => {
          update(chart);
        });
      }
    }, {
      deep: true
    });
    return () => {
      return h("canvas", {
        role: "img",
        ariaLabel: props.ariaLabel,
        ariaDescribedby: props.ariaDescribedby,
        ref: canvasRef
      }, [
        h("p", {}, [
          slots.default ? slots.default() : ""
        ])
      ]);
    };
  }
});
function createTypedChart(type, registerables) {
  Chart$1.register(registerables);
  return defineComponent({
    props: CommonProps,
    setup(props, param) {
      let { expose } = param;
      const ref2 = shallowRef(null);
      const reforwardRef = (chartRef) => {
        ref2.value = chartRef == null ? void 0 : chartRef.chart;
      };
      expose({
        chart: ref2
      });
      return () => {
        return h(Chart, compatProps({
          ref: reforwardRef
        }, {
          type,
          ...props
        }));
      };
    }
  });
}
const Line = /* @__PURE__ */ createTypedChart("line", LineController);
Chart$1.register(TimeScale, LinearScale, LineElement);
const _sfc_main$p = {
  name: "ChartComponent",
  components: { Line },
  props: {
    name: { type: String, default: "myChart" },
    label: { type: String, default: "My Chart" },
    width: { type: [Number, String], default: "auto" },
    height: { type: [Number, String], default: "auto" },
    labels: { type: Array },
    data: { type: Array, required: true }
  },
  data() {
    return {
      data: {
        labels: this.labels,
        datasets: [{
          spanGaps: false,
          label: this.label,
          data: this.data,
          backgroundColor: "rgba(24, 103, 192, 0.5)"
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: TimeScale
          }],
          yAxes: [{
            type: LinearScale,
            ticks: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: 1
            }
          }]
        }
      }
    };
  }
};
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Line = resolveComponent("Line");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createCommentVNode('    <canvas :id="name" :ref="name" :width="width" :height="height"></canvas>'),
      createVNode(_component_Line, {
        data: $data.data,
        options: $data.options
      }, null, 8, ["data", "options"])
    ],
    2112
    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}
const ChartComponent = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Common/ChartComponent.vue"]]);
const _sfc_main$o = {
  name: "PerformanceLogComponent",
  components: { ChartComponent },
  data: () => ({
    events: []
  }),
  mounted() {
    this.getLogs();
  },
  methods: {
    getLogs() {
      axios.get("/admin/api/performance").then((response) => {
        this.events = response.data.data;
      }).catch((error) => {
      }).finally(() => {
      });
    },
    filterEventTimestamps(events) {
      return events.map((event) => event.created_at);
    },
    filterEventValues(events) {
      return events.map((event) => event.value);
    }
  }
};
const _hoisted_1$c = { class: "mb-0" };
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_chart_component = resolveComponent("chart-component");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.events, (group, groupName) => {
          return openBlock(), createBlock(
            VSheet,
            {
              elevation: "2",
              key: groupName,
              class: "pt-3 px-3 overflow-x-auto"
            },
            {
              default: withCtx(() => [
                createBaseVNode(
                  "h4",
                  _hoisted_1$c,
                  toDisplayString(groupName) + " health",
                  1
                  /* TEXT */
                ),
                createVNode(
                  VRow,
                  { class: "flex-nowrap" },
                  {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(group, (server, serverName) => {
                          return openBlock(), createElementBlock(
                            Fragment,
                            null,
                            [
                              (openBlock(true), createElementBlock(
                                Fragment,
                                null,
                                renderList(server, (context, contextName) => {
                                  return openBlock(), createElementBlock(
                                    Fragment,
                                    null,
                                    [
                                      (openBlock(true), createElementBlock(
                                        Fragment,
                                        null,
                                        renderList(context, (type, typeName) => {
                                          return openBlock(), createBlock(
                                            VCol,
                                            {
                                              key: groupName + serverName + contextName + typeName
                                            },
                                            {
                                              default: withCtx(() => [
                                                createVNode(
                                                  VCard,
                                                  null,
                                                  {
                                                    default: withCtx(() => [
                                                      createVNode(
                                                        VCardText,
                                                        null,
                                                        {
                                                          default: withCtx(() => [
                                                            createVNode(
                                                              VSheet,
                                                              null,
                                                              {
                                                                default: withCtx(() => [
                                                                  createVNode(_component_chart_component, {
                                                                    label: contextName + " - " + typeName + " : " + serverName,
                                                                    height: 200,
                                                                    labels: $options.filterEventTimestamps(type),
                                                                    data: $options.filterEventValues(type)
                                                                  }, null, 8, ["label", "labels", "data"])
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
                                    ],
                                    64
                                    /* STABLE_FRAGMENT */
                                  );
                                }),
                                256
                                /* UNKEYED_FRAGMENT */
                              ))
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          );
                        }),
                        256
                        /* UNKEYED_FRAGMENT */
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
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]),
    _: 1
    /* STABLE */
  });
}
const PerformanceLogComponent = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Common/PerformanceLogComponent.vue"]]);
const _sfc_main$n = {
  name: "DashboardComponent",
  components: { PerformanceLogComponent }
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_performance_log_component = resolveComponent("performance-log-component");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, {
        align: "center",
        justify: "center"
      }, {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode(
            "p",
            null,
            "Dashboard",
            -1
            /* HOISTED */
          )
        ])),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(_component_performance_log_component)
        ]),
        _: 1
        /* STABLE */
      })
    ]),
    _: 1
    /* STABLE */
  });
}
const DashboardComponent = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/DashboardComponent.vue"]]);
const _sfc_main$m = {
  name: "ContentBlockListComponent",
  data: () => ({
    loading: false,
    headers: [
      { title: "Edit", value: "edit" },
      { title: "Title", value: "title" },
      { title: "URL", value: "url" },
      { title: "Sticky", value: "sticky" },
      { title: "Application", value: "application" },
      { title: "Priority", value: "priority" },
      { title: "Published", value: "is_active" },
      { title: "Created", value: "created_at" },
      { title: "Updated", value: "updated_at" },
      { title: "Delete", value: "delete" }
    ],
    options: {
      page: 1,
      itemsPerPage: 15
    },
    contentblocks: [],
    contentBlockTotal: 0,
    dialog: false,
    contentblockId: null
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      axios.get(
        "/admin/api/content-block?page=" + page + "&perPage=" + itemsPerPage
      ).then((response) => {
        console.log({ data: response.data });
        this.contentblocks = response.data.data;
        this.options.itemsPerPage = response.data.per_page;
        this.contentBlockTotal = response.data.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    openDeleteContentBlock(contentblockId) {
      this.dialog = true;
      this.contentblockId = contentblockId;
    },
    deleteContentBlock() {
      this.dialog = false;
      axios.delete("/admin/api/content-block/" + this.contentblockId).then((response) => {
        this.getDataFromApi();
      }).catch((error) => {
      }).finally(() => {
      });
    }
  }
};
const _hoisted_1$b = ["href"];
const _hoisted_2$5 = { key: 0 };
const _hoisted_3$3 = { key: 1 };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 1 };
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#4caf50",
                to: { name: "contentBlockCreate" }
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode(" Create Content Block ")
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VDataTableServer, {
                options: _ctx.options,
                "onUpdate:options": _cache[0] || (_cache[0] = ($event) => _ctx.options = $event),
                loading: _ctx.loading,
                headers: _ctx.headers,
                items: _ctx.contentblocks,
                "item-key": _ctx.contentblocks.id,
                "items-length": _ctx.contentBlockTotal,
                "disable-sort": ""
              }, {
                [`item.url`]: withCtx(({ item }) => [
                  createBaseVNode("a", {
                    href: item.url
                  }, toDisplayString(item.url), 9, _hoisted_1$b)
                ]),
                [`item.sticky`]: withCtx(({ item }) => [
                  item.sticky == 1 ? (openBlock(), createElementBlock("span", _hoisted_2$5, " Yes ")) : createCommentVNode("v-if", true),
                  item.sticky == 0 ? (openBlock(), createElementBlock("span", _hoisted_3$3, " No ")) : createCommentVNode("v-if", true)
                ]),
                [`item.is_active`]: withCtx(({ item }) => [
                  item.is_active == 1 ? (openBlock(), createElementBlock("span", _hoisted_4, " Yes ")) : createCommentVNode("v-if", true),
                  item.is_active == 0 ? (openBlock(), createElementBlock("span", _hoisted_5, " No ")) : createCommentVNode("v-if", true)
                ]),
                [`item.edit`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    icon: "mdi:mdi-comment-edit",
                    color: "primary",
                    variant: "text",
                    to: { name: "contentBlockEdit", params: { id: item.id } }
                  }, null, 8, ["to"])
                ]),
                [`item.delete`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    icon: "mdi:mdi-delete",
                    color: "red",
                    variant: "text",
                    onClick: ($event) => $options.openDeleteContentBlock(item.id)
                  }, null, 8, ["onClick"])
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["options", "loading", "headers", "items", "item-key", "items-length"])
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
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode("Are you sure?")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("This record will be deleted permanently.")
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
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.dialog = false)
                  }, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode("NO")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: $options.deleteContentBlock
                  }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode("YES")
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
      }, 8, ["modelValue"])
    ]),
    _: 1
    /* STABLE */
  });
}
const ContentBlockListComponent = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/List/ContentBlockListComponent.vue"]]);
const _sfc_main$l = {
  name: "LoadingComponent",
  props: {
    loading: Boolean
  }
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VOverlay, {
    absolute: "",
    "z-index": "0",
    scrim: "#FFF",
    opacity: ".75",
    "model-value": $props.loading,
    class: "align-center justify-center"
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
const LoadingComponent = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Common/LoadingComponent.vue"]]);
const _sfc_main$k = {
  name: "UserListComponent",
  components: { LoadingComponent },
  data: () => ({
    loading: false,
    headers: [
      { title: "Edit", value: "edit" },
      { title: "Name", value: "name" },
      { title: "Email", value: "email" },
      { title: "Access", value: "authorizations" },
      { title: "Last Login", value: "last_login_at" },
      { title: "Created", value: "CreatedAt" },
      { title: "Updated", value: "UpdatedAt" },
      { title: "Delete", value: "delete" }
    ],
    options: {
      page: 1,
      itemsPerPage: 15
    },
    users: [],
    userTotal: 0,
    searchUserNameValue: null,
    searchUserEmailValue: null,
    searchUserStatusValue: "active",
    dialogDelete: false,
    dialogRestore: false,
    userId: null,
    userStatus: [
      { "type": "active", "label": "Active" },
      { "type": "deleted", "label": "Deleted" }
    ]
  }),
  watch: {
    searchUserNameValue: function(value) {
      this.searchUserName(value);
    },
    searchUserEmailValue: function(value) {
      this.searchUserEmail(value);
    },
    searchUserStatusValue: function(value) {
      this.searchUserStatus(value);
    }
  },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    searchUserName: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    searchUserEmail: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    searchUserStatus: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    getDataFromApi() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      const userName = this.searchUserNameValue || "";
      const userEmail = this.searchUserEmailValue || "";
      const userStatus = this.searchUserStatusValue || "";
      axios.get(
        "/admin/api/user?page=" + page + "&perPage=" + itemsPerPage + "&filterUserName=" + userName + "&filterUserEmail=" + userEmail + "&filterUserStatus=" + userStatus
      ).then((response) => {
        this.users = response.data.data;
        this.options.itemsPerPage = response.data.meta.per_page;
        this.userTotal = response.data.meta.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    openDeleteUser(userId) {
      this.dialogDelete = true;
      this.userId = userId;
    },
    openRestoreUser(userId) {
      this.dialogRestore = true;
      this.userId = userId;
    },
    deleteUser() {
      this.dialogDelete = false;
      axios.delete("/admin/api/user/" + this.userId).then((response) => {
        this.getDataFromApi();
      }).catch((error) => {
      }).finally(() => {
      });
    },
    exportUser() {
      this.loading = true;
      axios.request({ url: "/admin/api/user/export", method: "GET", responseType: "blob" }).then((response) => {
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
    restoreUser() {
      this.dialogRestore = false;
      axios.get("/admin/api/user/restore/" + this.userId).then((response) => {
        this.getDataFromApi();
      }).catch((error) => {
      }).finally(() => {
      });
    },
    formatLastLogin(date) {
      return date ? format(date, "MMMM do yyyy, h:mm a") : "never";
    }
  }
};
const _hoisted_1$a = { key: 0 };
const _hoisted_2$4 = { key: 1 };
const _hoisted_3$2 = { key: 0 };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_loading_component = resolveComponent("loading-component");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.searchUserNameValue,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.searchUserNameValue = $event),
                label: "Search by User Name",
                clearable: "",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.searchUserEmailValue,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.searchUserEmailValue = $event),
                label: "Search by Email Address",
                variant: "underlined",
                clearable: ""
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VSelect, {
                items: _ctx.userStatus,
                label: "User Status",
                "item-value": "type",
                "item-title": "label",
                modelValue: _ctx.searchUserStatusValue,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.searchUserStatusValue = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                class: "mt-2",
                color: "#4caf50",
                to: { name: "userCreate" },
                "prepend-icon": "mdi:mdi-account-plus"
              }, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode(" Create User ")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                class: "mt-2",
                color: "red",
                onClick: $options.exportUser,
                "prepend-icon": "mdi:mdi-account-arrow-right"
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode(" Export User List ")
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VDataTableServer, {
                options: _ctx.options,
                "onUpdate:options": [
                  _cache[3] || (_cache[3] = ($event) => _ctx.options = $event),
                  $options.getDataFromApi
                ],
                loading: _ctx.loading,
                headers: _ctx.headers,
                items: _ctx.users,
                "item-key": _ctx.users.id,
                "items-length": _ctx.userTotal,
                "disable-sort": ""
              }, {
                [`item.edit`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    variant: "text",
                    icon: "mdi:mdi-account-edit",
                    color: "primary",
                    to: { name: "userEdit", params: { id: item.id } }
                  }, null, 8, ["to"])
                ]),
                [`item.authorizations`]: withCtx(({ item }) => [
                  item.type === "staff" ? (openBlock(), createElementBlock("div", _hoisted_1$a, _cache[10] || (_cache[10] = [
                    createBaseVNode(
                      "em",
                      null,
                      "Staff Portal User",
                      -1
                      /* HOISTED */
                    )
                  ]))) : (openBlock(), createElementBlock("div", _hoisted_2$4, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(item.authorizations, (auth) => {
                        return openBlock(), createElementBlock("div", {
                          key: auth.id
                        }, [
                          auth.entity_id === 0 ? (openBlock(), createElementBlock(
                            Fragment,
                            { key: 0 },
                            [
                              createTextVNode(
                                toDisplayString(auth.role.name) + ": Global " + toDisplayString(auth.entity_type.substring(auth.entity_type.lastIndexOf("\\") + 1)),
                                1
                                /* TEXT */
                              )
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : (openBlock(), createElementBlock(
                            Fragment,
                            { key: 1 },
                            [
                              auth.entity ? (openBlock(), createElementBlock(
                                "span",
                                _hoisted_3$2,
                                toDisplayString(auth.role.name) + ": " + toDisplayString(auth.entity.label) + " " + toDisplayString(auth.entity.display_name),
                                1
                                /* TEXT */
                              )) : createCommentVNode("v-if", true)
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          ))
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]))
                ]),
                [`item.last_login_at`]: withCtx(({ item }) => [
                  createTextVNode(
                    toDisplayString($options.formatLastLogin(item.last_login_at)),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.delete`]: withCtx(({ item }) => [
                  !item.DeletedAt ? (openBlock(), createBlock(VBtn, {
                    key: 0,
                    variant: "text",
                    icon: "mdi:mdi-delete",
                    color: "red",
                    onClick: ($event) => $options.openDeleteUser(item.id)
                  }, null, 8, ["onClick"])) : createCommentVNode("v-if", true),
                  item.DeletedAt ? (openBlock(), createBlock(VBtn, {
                    key: 1,
                    variant: "text",
                    icon: "mdi:mdi-reload",
                    color: "green",
                    onClick: ($event) => $options.openRestoreUser(item.id)
                  }, null, 8, ["onClick"])) : createCommentVNode("v-if", true)
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["options", "loading", "headers", "items", "item-key", "items-length", "onUpdate:options"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VDialog, {
        modelValue: _ctx.dialogDelete,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.dialogDelete = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[11] || (_cache[11] = [
                  createTextVNode("Are you sure?")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[12] || (_cache[12] = [
                  createTextVNode("This record will be deleted.")
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
                    onClick: _cache[4] || (_cache[4] = ($event) => _ctx.dialogDelete = false)
                  }, {
                    default: withCtx(() => _cache[13] || (_cache[13] = [
                      createTextVNode("NO")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: $options.deleteUser
                  }, {
                    default: withCtx(() => _cache[14] || (_cache[14] = [
                      createTextVNode("YES")
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
      createVNode(VDialog, {
        modelValue: _ctx.dialogRestore,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.dialogRestore = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[15] || (_cache[15] = [
                  createTextVNode("Are you sure?")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[16] || (_cache[16] = [
                  createTextVNode("Do you want to restore this user?")
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
                    onClick: _cache[6] || (_cache[6] = ($event) => _ctx.dialogRestore = false)
                  }, {
                    default: withCtx(() => _cache[17] || (_cache[17] = [
                      createTextVNode("NO")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: $options.restoreUser
                  }, {
                    default: withCtx(() => _cache[18] || (_cache[18] = [
                      createTextVNode("YES")
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
      createVNode(_component_loading_component, { loading: _ctx.loading }, null, 8, ["loading"])
    ]),
    _: 1
    /* STABLE */
  });
}
const UserListComponent = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__scopeId", "data-v-949f14bd"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/List/UserListComponent.vue"]]);
const _sfc_main$j = {
  name: "MfpListComponent",
  components: { LoadingComponent },
  data: () => ({
    loading: false,
    headers: [
      { title: "Form Name", value: "system_name" },
      { title: "Form Title", value: "display_name" },
      { title: "Form Type", value: "Template" },
      { title: "URL", value: "url" },
      { title: "Number of Submissions", value: "FormSubmissions" },
      { title: "Affiliate Number", value: "Affiliate" },
      { title: "Created By", value: "CreatedBy" },
      { title: "Updated By", value: "UpdatedBy" }
    ],
    options: {
      page: 1,
      itemsPerPage: 15
    },
    forms: [],
    formTotal: 0,
    typesList: [
      { "value": "1", "label": "Payroll Deduction" },
      { "value": "2", "label": "Payroll Deduction And COPE" },
      { "value": "3", "label": "COPE" },
      { "value": "4", "label": "Payment processing - Dues" },
      { "value": "5", "label": "Payment processing - Dues and Cope" },
      { "value": "6", "label": "Payment Processing COPE" },
      { "value": "8", "label": "State Fed Recurring COPE" }
    ],
    statusList: [
      { "value": "", "label": "All" },
      { "value": "1", "label": "Active" },
      { "value": "2", "label": "Archive" }
    ],
    searchAffiliateNumberValue: null,
    searchFormTypeValue: null,
    searchStateFedValue: null,
    searchFormStatusValue: null,
    stateFeds: []
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
      immediate: true
    },
    searchAffiliateNumberValue: function(value) {
      this.searchAffiliateNumber(value);
    },
    searchFormTypeValue: function(value) {
      this.searchFormType(value);
    },
    searchStateFedValue: function(value) {
      this.searchStateFed(value);
    },
    searchFormStatusValue: function(value) {
      this.searchFormStatus(value);
    }
  },
  mounted() {
    axios.get("/api/v2/affiliate?scope=global&sort=AffiliateName&filter[AffiliateTypeId]=2&per_page=100").then((response) => {
      this.stateFeds = this.addEmptyElement(response.data.data, "AffiliateName", "AffiliateId");
    });
  },
  methods: {
    addEmptyElement(data, labelName, valueName) {
      const empty = {};
      empty[labelName] = "";
      empty[valueName] = "";
      data.unshift(empty);
      return data;
    },
    clearSearch() {
      this.searchAffiliateNumberValue = null;
      this.searchFormTypeValue = null;
      this.searchStateFedValue = null;
      this.searchFormStatusValue = null;
      this.options.page = 1;
      this.getDataFromApi();
    },
    searchAffiliateNumber: debounce$1(function(search) {
      this.options.page = 1;
      this.getDataFromApi();
    }, 500),
    searchFormType: debounce$1(function(search) {
      this.options.page = 1;
      this.getDataFromApi();
    }, 500),
    searchFormStatus: debounce$1(function(search) {
      this.options.page = 1;
      this.getDataFromApi();
    }, 500),
    searchStateFed: debounce$1(function(search) {
      this.options.page = 1;
      this.getDataFromApi();
    }, 500),
    getDataFromApi() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      axios.post(
        "/admin/api/form/search?page=" + page + "&perPage=" + itemsPerPage,
        {
          affiliateNumber: this.searchAffiliateNumberValue,
          formType: this.searchFormTypeValue,
          stateFed: this.searchStateFedValue,
          status: this.searchFormStatusValue
        }
      ).then((response) => {
        this.forms = response.data.data;
        this.options.itemsPerPage = response.data.meta.per_page;
        this.formTotal = response.data.meta.total;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
const _hoisted_1$9 = ["href"];
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_loading_component = resolveComponent("loading-component");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.searchAffiliateNumberValue,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.searchAffiliateNumberValue = $event),
                label: "Search by Affiliate number",
                clearable: "",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VAutocomplete, {
                label: "Search by State Feds",
                items: _ctx.stateFeds,
                "item-value": "AffiliateId",
                "item-title": "AffiliateName",
                modelValue: _ctx.searchStateFedValue,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.searchStateFedValue = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VSelect, {
                items: _ctx.typesList,
                label: "Search by Form Type",
                "item-value": "value",
                "item-title": "label",
                clearable: "",
                modelValue: _ctx.searchFormTypeValue,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.searchFormTypeValue = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VSelect, {
                items: _ctx.statusList,
                label: "Search by Form Status",
                "item-value": "value",
                "item-title": "label",
                clearable: "",
                modelValue: _ctx.searchFormStatusValue,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.searchFormStatusValue = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"]),
              createVNode(VBtn, {
                color: "default",
                class: "mb-4 btn-block actionButtons",
                onClick: $options.clearSearch
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("Clear")
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VDataTableServer, {
                options: _ctx.options,
                "onUpdate:options": _cache[4] || (_cache[4] = ($event) => _ctx.options = $event),
                loading: _ctx.loading,
                headers: _ctx.headers,
                items: _ctx.forms,
                "item-key": _ctx.forms.id,
                "items-length": _ctx.formTotal,
                "disable-sort": ""
              }, {
                [`item.FormSubmissions`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "div",
                    null,
                    toDisplayString(item.FormSubmissions.length),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.Affiliate`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "div",
                    null,
                    toDisplayString(item.Affiliate.AffiliateNumber),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.Template`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "div",
                    null,
                    toDisplayString(item.Template.display_name),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.CreatedBy`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "div",
                    null,
                    toDisplayString(item.CreatedBy.name),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.UpdatedBy`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "div",
                    null,
                    toDisplayString(item.UpdatedBy.name),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.url`]: withCtx((props) => [
                  createBaseVNode("a", {
                    href: "/app/memberforms" + props.item.url
                  }, toDisplayString(props.item.url), 9, _hoisted_1$9)
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["options", "loading", "headers", "items", "item-key", "items-length"])
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
const MfpListComponent = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/List/MfpListComponent.vue"]]);
const _sfc_main$i = {
  name: "JobClassListComponent",
  data: () => ({
    loading: false,
    response: {
      meta: {
        headers: []
      }
    },
    headers: [
      { title: "LocalJobClass ID", value: "LocalJobClassId" },
      { title: "LocalJobClass Name", value: "LocalJobClassName" },
      { title: "NationalJobClass Name", value: "NationalJobClass" },
      { title: "LocalJobClass Code", value: "LocalJobClassCode" },
      { title: "Unit ID", value: "Unit.UnitId" },
      { title: "Unit", value: "Unit" },
      { title: "Indviduals Count", value: "IndividualEmployer" },
      { title: "Created", value: "CreatedAt" },
      { title: "Updated", value: "UpdatedAt" },
      { title: "Edit", value: "edit" }
    ],
    localjobclasslist: [],
    options: {
      page: 1,
      itemsPerPage: 15
    },
    jobClassTotal: 0,
    searchJobClassName: null,
    searchUnitName: null,
    searchAffiliateName: null
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
      immediate: true
    },
    searchJobClassName: function(value) {
      this.searchJobClass(value);
    },
    searchUnitName: function(value) {
      this.searchUnit(value);
    },
    searchAffiliateName: function(value) {
      this.searchAffiliate(value);
    }
  },
  mounted() {
  },
  methods: {
    searchJobClass: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    searchUnit: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    searchAffiliate: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    getDataFromApi() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      const jobClassName = this.searchJobClassName || "";
      const unitName = this.searchUnitName || "";
      const affiliateName = this.searchAffiliateName || "";
      axios.get(
        "/admin/api/localjobclass?page=" + page + "&perPage=" + itemsPerPage + "&filterLocalJobClassName=" + jobClassName + "&filterUnitName=" + unitName + "&filterAffiliateName=" + affiliateName
      ).then((response) => {
        this.localjobclasslist = response.data.data;
        this.options.itemsPerPage = response.data.meta.per_page;
        this.jobClassTotal = response.data.meta.total;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
const _hoisted_1$8 = { key: 0 };
const _hoisted_2$3 = { key: 0 };
const _hoisted_3$1 = { key: 0 };
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.searchJobClassName,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.searchJobClassName = $event),
                label: "Search by Local Job Class Name",
                variant: "underlined",
                clearable: ""
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.searchUnitName,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.searchUnitName = $event),
                label: "Search by Unit Name",
                variant: "underlined",
                clearable: ""
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.searchAffiliateName,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.searchAffiliateName = $event),
                label: "Search by Affiliate Name",
                variant: "underlined",
                clearable: ""
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#4caf50",
                to: { name: "jobclassCreate" },
                "prepend-icon": "mdi:mdi-account-plus"
              }, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode(" Create LocalJobClass ")
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VDataTableServer, {
                options: _ctx.options,
                "onUpdate:options": _cache[3] || (_cache[3] = ($event) => _ctx.options = $event),
                loading: _ctx.loading,
                headers: _ctx.headers,
                items: _ctx.localjobclasslist,
                "item-key": _ctx.localjobclasslist.id,
                "items-length": _ctx.jobClassTotal,
                "disable-sort": ""
              }, {
                [`item.edit`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    icon: "mdi:mdi-account-edit",
                    color: "primary",
                    variant: "text",
                    to: { name: "localJobClassEdit", params: { id: item.LocalJobClassId } }
                  }, null, 8, ["to"])
                ]),
                [`item.NationalJobClass`]: withCtx(({ item }) => [
                  item.NationalJobClass ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_1$8,
                    toDisplayString(item.NationalJobClass.NationalJobClassName),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                [`item.Unit`]: withCtx(({ item }) => [
                  item.Unit ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_2$3,
                    toDisplayString(item.Unit.UnitName),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                "item.IndividualEmployer": withCtx(({ item }) => [
                  item.IndividualEmployer ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_3$1,
                    toDisplayString(item.IndividualEmployer.length),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["options", "loading", "headers", "items", "item-key", "items-length"])
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
const JobClassListComponent = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/List/JobClassListComponent.vue"]]);
/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
class FileReader extends (/* @__PURE__ */ ObservableMixin()) {
  /**
  * Creates an instance of the FileReader.
  */
  constructor() {
    super();
    __publicField(this, "total");
    /**
    * Instance of native FileReader.
    */
    __publicField(this, "_reader");
    /**
    * Holds the data of an already loaded file. The file must be first loaded
    * by using {@link module:upload/filereader~FileReader#read `read()`}.
    */
    __publicField(this, "_data");
    const reader = new window.FileReader();
    this._reader = reader;
    this._data = void 0;
    this.set("loaded", 0);
    reader.onprogress = (evt) => {
      this.loaded = evt.loaded;
    };
  }
  /**
  * Returns error that occurred during file reading.
  */
  get error() {
    return this._reader.error;
  }
  /**
  * Holds the data of an already loaded file. The file must be first loaded
  * by using {@link module:upload/filereader~FileReader#read `read()`}.
  */
  get data() {
    return this._data;
  }
  /**
  * Reads the provided file.
  *
  * @param file Native File object.
  * @returns Returns a promise that will be resolved with file's content.
  * The promise will be rejected in case of an error or when the reading process is aborted.
  */
  read(file) {
    const reader = this._reader;
    this.total = file.size;
    return new Promise((resolve2, reject) => {
      reader.onload = () => {
        const result = reader.result;
        this._data = result;
        resolve2(result);
      };
      reader.onerror = () => {
        reject("error");
      };
      reader.onabort = () => {
        reject("aborted");
      };
      this._reader.readAsDataURL(file);
    });
  }
  /**
  * Aborts file reader.
  */
  abort() {
    this._reader.abort();
  }
}
class FileRepository extends Plugin {
  constructor() {
    super(...arguments);
    /**
    * Collection of loaders associated with this repository.
    */
    __publicField(this, "loaders", new Collection());
    /**
    * Loaders mappings used to retrieve loaders references.
    */
    __publicField(this, "_loadersMap", /* @__PURE__ */ new Map());
    /**
    * Reference to a pending action registered in a {@link module:core/pendingactions~PendingActions} plugin
    * while upload is in progress. When there is no upload then value is `null`.
    */
    __publicField(this, "_pendingAction", null);
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "FileRepository";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      PendingActions
    ];
  }
  /**
  * @inheritDoc
  */
  init() {
    this.loaders.on("change", () => this._updatePendingAction());
    this.set("uploaded", 0);
    this.set("uploadTotal", null);
    this.bind("uploadedPercent").to(this, "uploaded", this, "uploadTotal", (uploaded, total) => {
      return total ? uploaded / total * 100 : 0;
    });
  }
  /**
  * Returns the loader associated with specified file or promise.
  *
  * To get loader by id use `fileRepository.loaders.get( id )`.
  *
  * @param fileOrPromise Native file or promise handle.
  */
  getLoader(fileOrPromise) {
    return this._loadersMap.get(fileOrPromise) || null;
  }
  /**
  * Creates a loader instance for the given file.
  *
  * Requires {@link #createUploadAdapter} factory to be defined.
  *
  * @param fileOrPromise Native File object or native Promise object which resolves to a File.
  */
  createLoader(fileOrPromise) {
    if (!this.createUploadAdapter) {
      logWarning("filerepository-no-upload-adapter");
      return null;
    }
    const loader = new FileLoader(Promise.resolve(fileOrPromise), this.createUploadAdapter);
    this.loaders.add(loader);
    this._loadersMap.set(fileOrPromise, loader);
    if (fileOrPromise instanceof Promise) {
      loader.file.then((file) => {
        this._loadersMap.set(file, loader);
      }).catch(() => {
      });
    }
    loader.on("change:uploaded", () => {
      let aggregatedUploaded = 0;
      for (const loader2 of this.loaders) {
        aggregatedUploaded += loader2.uploaded;
      }
      this.uploaded = aggregatedUploaded;
    });
    loader.on("change:uploadTotal", () => {
      let aggregatedTotal = 0;
      for (const loader2 of this.loaders) {
        if (loader2.uploadTotal) {
          aggregatedTotal += loader2.uploadTotal;
        }
      }
      this.uploadTotal = aggregatedTotal;
    });
    return loader;
  }
  /**
  * Destroys the given loader.
  *
  * @param fileOrPromiseOrLoader File or Promise associated with that loader or loader itself.
  */
  destroyLoader(fileOrPromiseOrLoader) {
    const loader = fileOrPromiseOrLoader instanceof FileLoader ? fileOrPromiseOrLoader : this.getLoader(fileOrPromiseOrLoader);
    loader._destroy();
    this.loaders.remove(loader);
    this._loadersMap.forEach((value, key) => {
      if (value === loader) {
        this._loadersMap.delete(key);
      }
    });
  }
  /**
  * Registers or deregisters pending action bound with upload progress.
  */
  _updatePendingAction() {
    const pendingActions = this.editor.plugins.get(PendingActions);
    if (this.loaders.length) {
      if (!this._pendingAction) {
        const t = this.editor.t;
        const getMessage = (value) => `${t("Upload in progress")} ${parseInt(value)}%.`;
        this._pendingAction = pendingActions.add(getMessage(this.uploadedPercent));
        this._pendingAction.bind("message").to(this, "uploadedPercent", getMessage);
      }
    } else {
      pendingActions.remove(this._pendingAction);
      this._pendingAction = null;
    }
  }
}
class FileLoader extends (/* @__PURE__ */ ObservableMixin()) {
  /**
  * Creates a new instance of `FileLoader`.
  *
  * @param filePromise A promise which resolves to a file instance.
  * @param uploadAdapterCreator The function which returns {@link module:upload/filerepository~UploadAdapter} instance.
  */
  constructor(filePromise, uploadAdapterCreator) {
    super();
    /**
    * Unique id of FileLoader instance.
    *
    * @readonly
    */
    __publicField(this, "id");
    /**
    * Additional wrapper over the initial file promise passed to this loader.
    */
    __publicField(this, "_filePromiseWrapper");
    /**
    * Adapter instance associated with this file loader.
    */
    __publicField(this, "_adapter");
    /**
    * FileReader used by FileLoader.
    */
    __publicField(this, "_reader");
    this.id = uid$1();
    this._filePromiseWrapper = this._createFilePromiseWrapper(filePromise);
    this._adapter = uploadAdapterCreator(this);
    this._reader = new FileReader();
    this.set("status", "idle");
    this.set("uploaded", 0);
    this.set("uploadTotal", null);
    this.bind("uploadedPercent").to(this, "uploaded", this, "uploadTotal", (uploaded, total) => {
      return total ? uploaded / total * 100 : 0;
    });
    this.set("uploadResponse", null);
  }
  /**
  * A `Promise` which resolves to a `File` instance associated with this file loader.
  */
  get file() {
    if (!this._filePromiseWrapper) {
      return Promise.resolve(null);
    } else {
      return this._filePromiseWrapper.promise.then((file) => this._filePromiseWrapper ? file : null);
    }
  }
  /**
  * Returns the file data. To read its data, you need for first load the file
  * by using the {@link module:upload/filerepository~FileLoader#read `read()`} method.
  */
  get data() {
    return this._reader.data;
  }
  /**
  * Reads file using {@link module:upload/filereader~FileReader}.
  *
  * Throws {@link module:utils/ckeditorerror~CKEditorError CKEditorError} `filerepository-read-wrong-status` when status
  * is different than `idle`.
  *
  * Example usage:
  *
  * ```ts
  * fileLoader.read()
  * 	.then( data => { ... } )
  * 	.catch( err => {
  * 		if ( err === 'aborted' ) {
  * 			console.log( 'Reading aborted.' );
  * 		} else {
  * 			console.log( 'Reading error.', err );
  * 		}
  * 	} );
  * ```
  *
  * @returns Returns promise that will be resolved with read data. Promise will be rejected if error
  * occurs or if read process is aborted.
  */
  read() {
    if (this.status != "idle") {
      throw new CKEditorError("filerepository-read-wrong-status", this);
    }
    this.status = "reading";
    return this.file.then((file) => this._reader.read(file)).then((data) => {
      if (this.status !== "reading") {
        throw this.status;
      }
      this.status = "idle";
      return data;
    }).catch((err) => {
      if (err === "aborted") {
        this.status = "aborted";
        throw "aborted";
      }
      this.status = "error";
      throw this._reader.error ? this._reader.error : err;
    });
  }
  /**
  * Reads file using the provided {@link module:upload/filerepository~UploadAdapter}.
  *
  * Throws {@link module:utils/ckeditorerror~CKEditorError CKEditorError} `filerepository-upload-wrong-status` when status
  * is different than `idle`.
  * Example usage:
  *
  * ```ts
  * fileLoader.upload()
  * 	.then( data => { ... } )
  * 	.catch( e => {
  * 		if ( e === 'aborted' ) {
  * 			console.log( 'Uploading aborted.' );
  * 		} else {
  * 			console.log( 'Uploading error.', e );
  * 		}
  * 	} );
  * ```
  *
  * @returns Returns promise that will be resolved with response data. Promise will be rejected if error
  * occurs or if read process is aborted.
  */
  upload() {
    if (this.status != "idle") {
      throw new CKEditorError("filerepository-upload-wrong-status", this);
    }
    this.status = "uploading";
    return this.file.then(() => this._adapter.upload()).then((data) => {
      this.uploadResponse = data;
      this.status = "idle";
      return data;
    }).catch((err) => {
      if (this.status === "aborted") {
        throw "aborted";
      }
      this.status = "error";
      throw err;
    });
  }
  /**
  * Aborts loading process.
  */
  abort() {
    const status = this.status;
    this.status = "aborted";
    if (!this._filePromiseWrapper.isFulfilled) {
      this._filePromiseWrapper.promise.catch(() => {
      });
      this._filePromiseWrapper.rejecter("aborted");
    } else if (status == "reading") {
      this._reader.abort();
    } else if (status == "uploading" && this._adapter.abort) {
      this._adapter.abort();
    }
    this._destroy();
  }
  /**
  * Performs cleanup.
  *
  * @internal
  */
  _destroy() {
    this._filePromiseWrapper = void 0;
    this._reader = void 0;
    this._adapter = void 0;
    this.uploadResponse = void 0;
  }
  /**
  * Wraps a given file promise into another promise giving additional
  * control (resolving, rejecting, checking if fulfilled) over it.
  *
  * @param filePromise The initial file promise to be wrapped.
  */
  _createFilePromiseWrapper(filePromise) {
    const wrapper = {};
    wrapper.promise = new Promise((resolve2, reject) => {
      wrapper.rejecter = reject;
      wrapper.isFulfilled = false;
      filePromise.then((file) => {
        wrapper.isFulfilled = true;
        resolve2(file);
      }).catch((err) => {
        wrapper.isFulfilled = true;
        reject(err);
      });
    });
    return wrapper;
  }
}
class SimpleUploadAdapter extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      FileRepository
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "SimpleUploadAdapter";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const options = this.editor.config.get("simpleUpload");
    if (!options) {
      return;
    }
    if (!options.uploadUrl) {
      logWarning("simple-upload-adapter-missing-uploadurl");
      return;
    }
    this.editor.plugins.get(FileRepository).createUploadAdapter = (loader) => {
      return new Adapter(loader, options);
    };
  }
}
class Adapter {
  /**
  * Creates a new adapter instance.
  */
  constructor(loader, options) {
    /**
    * FileLoader instance to use during the upload.
    */
    __publicField(this, "loader");
    /**
    * The configuration of the adapter.
    */
    __publicField(this, "options");
    __publicField(this, "xhr");
    this.loader = loader;
    this.options = options;
  }
  /**
  * Starts the upload process.
  *
  * @see module:upload/filerepository~UploadAdapter#upload
  */
  upload() {
    return this.loader.file.then((file) => new Promise((resolve2, reject) => {
      this._initRequest();
      this._initListeners(resolve2, reject, file);
      this._sendRequest(file);
    }));
  }
  /**
  * Aborts the upload process.
  *
  * @see module:upload/filerepository~UploadAdapter#abort
  */
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
  /**
  * Initializes the `XMLHttpRequest` object using the URL specified as
  * {@link module:upload/uploadconfig~SimpleUploadConfig#uploadUrl `simpleUpload.uploadUrl`} in the editor's
  * configuration.
  */
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open("POST", this.options.uploadUrl, true);
    xhr.responseType = "json";
  }
  /**
  * Initializes XMLHttpRequest listeners
  *
  * @param resolve Callback function to be called when the request is successful.
  * @param reject Callback function to be called when the request cannot be completed.
  * @param file Native File object.
  */
  _initListeners(resolve2, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;
    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(response && response.error && response.error.message ? response.error.message : genericErrorText);
      }
      const urls = response.url ? {
        default: response.url
      } : response.urls;
      resolve2({
        ...response,
        urls
      });
    });
    /* istanbul ignore else -- @preserve */
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }
  /**
  * Prepares the data and sends the request.
  *
  * @param file File instance to be uploaded.
  */
  _sendRequest(file) {
    let headers = this.options.headers || {};
    if (typeof headers === "function") {
      headers = headers(file);
    }
    const withCredentials = this.options.withCredentials || false;
    for (const headerName of Object.keys(headers)) {
      this.xhr.setRequestHeader(headerName, headers[headerName]);
    }
    this.xhr.withCredentials = withCredentials;
    const data = new FormData();
    data.append("upload", file);
    this.xhr.send(data);
  }
}
/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
function getNormalizedAndLocalizedLanguageDefinitions(editor) {
  const t = editor.t;
  const languageDefs = editor.config.get("codeBlock.languages");
  for (const def of languageDefs) {
    if (def.label === "Plain text") {
      def.label = t("Plain text");
    }
    if (def.class === void 0) {
      def.class = `language-${def.language}`;
    }
  }
  return languageDefs;
}
function getPropertyAssociation(languageDefs, key, value) {
  const association = {};
  for (const def of languageDefs) {
    if (key === "class") {
      const newKey = def[key].split(" ").shift();
      association[newKey] = def[value];
    } else {
      association[def[key]] = def[value];
    }
  }
  return association;
}
function getLeadingWhiteSpaces(textNode) {
  return textNode.data.match(/^(\s*)/)[0];
}
function rawSnippetTextToViewDocumentFragment(writer, text) {
  const fragment = writer.createDocumentFragment();
  const textLines = text.split("\n");
  const items = textLines.reduce((nodes, line, lineIndex) => {
    nodes.push(line);
    if (lineIndex < textLines.length - 1) {
      nodes.push(writer.createElement("br"));
    }
    return nodes;
  }, []);
  writer.appendChild(items, fragment);
  return fragment;
}
function getIndentOutdentPositions(model) {
  const selection = model.document.selection;
  const positions2 = [];
  if (selection.isCollapsed) {
    return [
      selection.anchor
    ];
  }
  const walker = selection.getFirstRange().getWalker({
    ignoreElementEnd: true,
    direction: "backward"
  });
  for (const { item } of walker) {
    let node = item.is("$textProxy") ? item.textNode : item;
    const parent = node.parent;
    if (!parent.is("element", "codeBlock") || node.is("element", "softBreak")) {
      continue;
    }
    while (node.previousSibling && !node.previousSibling.is("element", "softBreak")) {
      node = node.previousSibling;
    }
    const startOffset = !node.is("$text") ? node.startOffset : node.startOffset + getLeadingWhiteSpaces(node).length;
    const position = model.createPositionAt(parent, startOffset);
    if (positions2.every((pos) => !pos.isEqual(position))) {
      positions2.push(position);
    }
  }
  return positions2;
}
function isModelSelectionInCodeBlock(selection) {
  const firstBlock = first(selection.getSelectedBlocks());
  return !!firstBlock && firstBlock.is("element", "codeBlock");
}
function canBeCodeBlock(schema, element) {
  if (element.is("rootElement") || schema.isLimit(element)) {
    return false;
  }
  return schema.checkChild(element.parent, "codeBlock");
}
function getCodeBlockAriaAnnouncement(t, languageDefs, element, direction) {
  const languagesToLabels = getPropertyAssociation(languageDefs, "language", "label");
  const codeBlockLanguage = element.getAttribute("language");
  if (codeBlockLanguage in languagesToLabels) {
    const language = languagesToLabels[codeBlockLanguage];
    if (direction === "enter") {
      return t("Entering %0 code snippet", language);
    }
    return t("Leaving %0 code snippet", language);
  }
  if (direction === "enter") {
    return t("Entering code snippet");
  }
  return t("Leaving code snippet");
}
function getTextNodeAtLineStart(position, model) {
  if (position.textNode) {
    position = model.createPositionBefore(position.textNode);
  }
  while (position.nodeBefore && !position.nodeBefore.is("element", "softBreak")) {
    position = model.createPositionBefore(position.nodeBefore);
  }
  const nodeAtStart = position.nodeAfter;
  return nodeAtStart && nodeAtStart.is("$text") ? nodeAtStart : null;
}
class CodeBlockCommand extends Command {
  /**
  * @inheritDoc
  */
  constructor(editor) {
    super(editor);
    /**
    * Contains the last used language.
    */
    __publicField(this, "_lastLanguage");
    this._lastLanguage = null;
  }
  /**
  * @inheritDoc
  */
  refresh() {
    this.value = this._getValue();
    this.isEnabled = this._checkEnabled();
  }
  /**
  * Executes the command. When the command {@link #value is on}, all topmost code blocks within
  * the selection will be removed. If it is off, all selected blocks will be flattened and
  * wrapped by a code block.
  *
  * @fires execute
  * @param options Command options.
  * @param options.language The code block language.
  * @param options.forceValue If set, it will force the command behavior. If `true`, the command will apply a code block,
  * otherwise the command will remove the code block. If not set, the command will act basing on its current value.
  * @param options.usePreviousLanguageChoice If set on `true` and the `options.language` is not specified, the command
  * will apply the previous language (if the command was already executed) when inserting the `codeBlock` element.
  */
  execute(options = {}) {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;
    const normalizedLanguagesDefs = getNormalizedAndLocalizedLanguageDefinitions(editor);
    const firstLanguageInConfig = normalizedLanguagesDefs[0];
    const blocks = Array.from(selection.getSelectedBlocks());
    const value = options.forceValue == void 0 ? !this.value : options.forceValue;
    const language = getLanguage(options, this._lastLanguage, firstLanguageInConfig.language);
    model.change((writer) => {
      if (value) {
        this._applyCodeBlock(writer, blocks, language);
      } else {
        this._removeCodeBlock(writer, blocks);
      }
    });
  }
  /**
  * Checks the command's {@link #value}.
  *
  * @returns The current value.
  */
  _getValue() {
    const selection = this.editor.model.document.selection;
    const firstBlock = first(selection.getSelectedBlocks());
    const isCodeBlock = !!(firstBlock && firstBlock.is("element", "codeBlock"));
    return isCodeBlock ? firstBlock.getAttribute("language") : false;
  }
  /**
  * Checks whether the command can be enabled in the current context.
  *
  * @returns Whether the command should be enabled.
  */
  _checkEnabled() {
    if (this.value) {
      return true;
    }
    const selection = this.editor.model.document.selection;
    const schema = this.editor.model.schema;
    const firstBlock = first(selection.getSelectedBlocks());
    if (!firstBlock) {
      return false;
    }
    return canBeCodeBlock(schema, firstBlock);
  }
  _applyCodeBlock(writer, blocks, language) {
    this._lastLanguage = language;
    const schema = this.editor.model.schema;
    const allowedBlocks = blocks.filter((block) => canBeCodeBlock(schema, block));
    for (const block of allowedBlocks) {
      writer.rename(block, "codeBlock");
      writer.setAttribute("language", language, block);
      schema.removeDisallowedAttributes([
        block
      ], writer);
      Array.from(block.getChildren()).filter((child) => !schema.checkChild(block, child)).forEach((child) => writer.remove(child));
    }
    allowedBlocks.reverse().forEach((currentBlock, i) => {
      const nextBlock = allowedBlocks[i + 1];
      if (currentBlock.previousSibling === nextBlock) {
        writer.appendElement("softBreak", nextBlock);
        writer.merge(writer.createPositionBefore(currentBlock));
      }
    });
  }
  _removeCodeBlock(writer, blocks) {
    const codeBlocks = blocks.filter((block) => block.is("element", "codeBlock"));
    for (const block of codeBlocks) {
      const range = writer.createRangeOn(block);
      for (const item of Array.from(range.getItems()).reverse()) {
        if (item.is("element", "softBreak") && item.parent.is("element", "codeBlock")) {
          const { position } = writer.split(writer.createPositionBefore(item));
          const elementAfter = position.nodeAfter;
          writer.rename(elementAfter, "paragraph");
          writer.removeAttribute("language", elementAfter);
          writer.remove(item);
        }
      }
      writer.rename(block, "paragraph");
      writer.removeAttribute("language", block);
    }
  }
}
function getLanguage(options, lastLanguage, defaultLanguage) {
  if (options.language) {
    return options.language;
  }
  if (options.usePreviousLanguageChoice && lastLanguage) {
    return lastLanguage;
  }
  return defaultLanguage;
}
class IndentCodeBlockCommand extends Command {
  constructor(editor) {
    super(editor);
    /**
    * A sequence of characters added to the line when the command is executed.
    */
    __publicField(this, "_indentSequence");
    this._indentSequence = editor.config.get("codeBlock.indentSequence");
  }
  /**
  * @inheritDoc
  */
  refresh() {
    this.isEnabled = this._checkEnabled();
  }
  /**
  * Executes the command. When the command {@link #isEnabled is enabled}, the indentation of the
  * code lines in the selection will be increased.
  *
  * @fires execute
  */
  execute() {
    const editor = this.editor;
    const model = editor.model;
    model.change((writer) => {
      const positions2 = getIndentOutdentPositions(model);
      for (const position of positions2) {
        const indentSequenceTextElement = writer.createText(this._indentSequence);
        model.insertContent(indentSequenceTextElement, position);
      }
    });
  }
  /**
  * Checks whether the command can be enabled in the current context.
  */
  _checkEnabled() {
    if (!this._indentSequence) {
      return false;
    }
    return isModelSelectionInCodeBlock(this.editor.model.document.selection);
  }
}
class OutdentCodeBlockCommand extends Command {
  constructor(editor) {
    super(editor);
    /**
    * A sequence of characters removed from the line when the command is executed.
    */
    __publicField(this, "_indentSequence");
    this._indentSequence = editor.config.get("codeBlock.indentSequence");
  }
  /**
  * @inheritDoc
  */
  refresh() {
    this.isEnabled = this._checkEnabled();
  }
  /**
  * Executes the command. When the command {@link #isEnabled is enabled}, the indentation of the
  * code lines in the selection will be decreased.
  *
  * @fires execute
  */
  execute() {
    const editor = this.editor;
    const model = editor.model;
    model.change(() => {
      const positions2 = getIndentOutdentPositions(model);
      for (const position of positions2) {
        const range = getLastOutdentableSequenceRange(model, position, this._indentSequence);
        if (range) {
          model.deleteContent(model.createSelection(range));
        }
      }
    });
  }
  /**
  * Checks whether the command can be enabled in the current context.
  *
  * @private
  * @returns {Boolean} Whether the command should be enabled.
  */
  _checkEnabled() {
    if (!this._indentSequence) {
      return false;
    }
    const model = this.editor.model;
    if (!isModelSelectionInCodeBlock(model.document.selection)) {
      return false;
    }
    return getIndentOutdentPositions(model).some((position) => {
      return getLastOutdentableSequenceRange(model, position, this._indentSequence);
    });
  }
}
function getLastOutdentableSequenceRange(model, position, sequence) {
  const nodeAtPosition = getTextNodeAtLineStart(position, model);
  if (!nodeAtPosition) {
    return null;
  }
  const leadingWhiteSpaces = getLeadingWhiteSpaces(nodeAtPosition);
  const lastIndexOfSequence = leadingWhiteSpaces.lastIndexOf(sequence);
  if (lastIndexOfSequence + sequence.length !== leadingWhiteSpaces.length) {
    return null;
  }
  if (lastIndexOfSequence === -1) {
    return null;
  }
  const { parent, startOffset } = nodeAtPosition;
  return model.createRange(model.createPositionAt(parent, startOffset + lastIndexOfSequence), model.createPositionAt(parent, startOffset + lastIndexOfSequence + sequence.length));
}
function modelToViewCodeBlockInsertion(model, languageDefs, useLabels = false) {
  const languagesToClasses = getPropertyAssociation(languageDefs, "language", "class");
  const languagesToLabels = getPropertyAssociation(languageDefs, "language", "label");
  return (evt, data, conversionApi) => {
    const { writer, mapper, consumable } = conversionApi;
    if (!consumable.consume(data.item, "insert")) {
      return;
    }
    const codeBlockLanguage = data.item.getAttribute("language");
    const targetViewPosition = mapper.toViewPosition(model.createPositionBefore(data.item));
    const preAttributes = {};
    if (useLabels) {
      preAttributes["data-language"] = languagesToLabels[codeBlockLanguage];
      preAttributes.spellcheck = "false";
    }
    const codeAttributes = languagesToClasses[codeBlockLanguage] ? {
      class: languagesToClasses[codeBlockLanguage]
    } : void 0;
    const code = writer.createContainerElement("code", codeAttributes);
    const pre = writer.createContainerElement("pre", preAttributes, code);
    writer.insert(targetViewPosition, pre);
    mapper.bindElements(data.item, code);
  };
}
function modelToDataViewSoftBreakInsertion(model) {
  return (evt, data, conversionApi) => {
    if (data.item.parent.name !== "codeBlock") {
      return;
    }
    const { writer, mapper, consumable } = conversionApi;
    if (!consumable.consume(data.item, "insert")) {
      return;
    }
    const position = mapper.toViewPosition(model.createPositionBefore(data.item));
    writer.insert(position, writer.createText("\n"));
  };
}
function dataViewToModelCodeBlockInsertion(editingView, languageDefs) {
  const classesToLanguages = getPropertyAssociation(languageDefs, "class", "language");
  const defaultLanguageName = languageDefs[0].language;
  return (evt, data, conversionApi) => {
    const viewCodeElement = data.viewItem;
    const viewPreElement = viewCodeElement.parent;
    if (!viewPreElement || !viewPreElement.is("element", "pre")) {
      return;
    }
    if (data.modelCursor.findAncestor("codeBlock")) {
      return;
    }
    const { consumable, writer } = conversionApi;
    if (!consumable.test(viewCodeElement, {
      name: true
    })) {
      return;
    }
    const codeBlock = writer.createElement("codeBlock");
    const viewChildClasses = [
      ...viewCodeElement.getClassNames()
    ];
    if (!viewChildClasses.length) {
      viewChildClasses.push("");
    }
    for (const className of viewChildClasses) {
      const language = classesToLanguages[className];
      if (language) {
        writer.setAttribute("language", language, codeBlock);
        break;
      }
    }
    if (!codeBlock.hasAttribute("language")) {
      writer.setAttribute("language", defaultLanguageName, codeBlock);
    }
    conversionApi.convertChildren(viewCodeElement, codeBlock);
    if (!conversionApi.safeInsert(codeBlock, data.modelCursor)) {
      return;
    }
    consumable.consume(viewCodeElement, {
      name: true
    });
    conversionApi.updateConversionResult(codeBlock, data);
  };
}
function dataViewToModelTextNewlinesInsertion() {
  return (evt, data, { consumable, writer }) => {
    let position = data.modelCursor;
    if (!consumable.test(data.viewItem)) {
      return;
    }
    if (!position.findAncestor("codeBlock")) {
      return;
    }
    consumable.consume(data.viewItem);
    const text = data.viewItem.data;
    const textLines = text.split("\n").map((data2) => writer.createText(data2));
    const lastLine = textLines[textLines.length - 1];
    for (const node of textLines) {
      writer.insert(node, position);
      position = position.getShiftedBy(node.offsetSize);
      if (node !== lastLine) {
        const softBreak = writer.createElement("softBreak");
        writer.insert(softBreak, position);
        position = writer.createPositionAfter(softBreak);
      }
    }
    data.modelRange = writer.createRange(data.modelCursor, position);
    data.modelCursor = position;
  };
}
function dataViewToModelOrphanNodeConsumer() {
  return (evt, data, { consumable }) => {
    const preElement = data.viewItem;
    if (preElement.findAncestor("pre")) {
      return;
    }
    const preChildren = Array.from(preElement.getChildren());
    const childCodeElement = preChildren.find((node) => node.is("element", "code"));
    if (!childCodeElement) {
      return;
    }
    for (const child of preChildren) {
      if (child === childCodeElement || !child.is("$text")) {
        continue;
      }
      consumable.consume(child, {
        name: true
      });
    }
  };
}
const DEFAULT_ELEMENT = "paragraph";
class CodeBlockEditing extends Plugin {
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "CodeBlockEditing";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ShiftEnter
    ];
  }
  /**
  * @inheritDoc
  */
  constructor(editor) {
    super(editor);
    editor.config.define("codeBlock", {
      languages: [
        {
          language: "plaintext",
          label: "Plain text"
        },
        {
          language: "c",
          label: "C"
        },
        {
          language: "cs",
          label: "C#"
        },
        {
          language: "cpp",
          label: "C++"
        },
        {
          language: "css",
          label: "CSS"
        },
        {
          language: "diff",
          label: "Diff"
        },
        {
          language: "html",
          label: "HTML"
        },
        {
          language: "java",
          label: "Java"
        },
        {
          language: "javascript",
          label: "JavaScript"
        },
        {
          language: "php",
          label: "PHP"
        },
        {
          language: "python",
          label: "Python"
        },
        {
          language: "ruby",
          label: "Ruby"
        },
        {
          language: "typescript",
          label: "TypeScript"
        },
        {
          language: "xml",
          label: "XML"
        }
      ],
      // A single tab.
      indentSequence: "	"
    });
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const schema = editor.model.schema;
    const model = editor.model;
    const view = editor.editing.view;
    const normalizedLanguagesDefs = getNormalizedAndLocalizedLanguageDefinitions(editor);
    editor.commands.add("codeBlock", new CodeBlockCommand(editor));
    editor.commands.add("indentCodeBlock", new IndentCodeBlockCommand(editor));
    editor.commands.add("outdentCodeBlock", new OutdentCodeBlockCommand(editor));
    this.listenTo(view.document, "tab", (evt, data) => {
      const commandName = data.shiftKey ? "outdentCodeBlock" : "indentCodeBlock";
      const command = editor.commands.get(commandName);
      if (!command.isEnabled) {
        return;
      }
      editor.execute(commandName);
      data.stopPropagation();
      data.preventDefault();
      evt.stop();
    }, {
      context: "pre"
    });
    schema.register("codeBlock", {
      allowWhere: "$block",
      allowChildren: "$text",
      // Disallow `$inlineObject` and its derivatives like `inlineWidget` inside `codeBlock` to ensure that only text,
      // not other inline elements like inline images, are allowed. This maintains the semantic integrity of code blocks.
      disallowChildren: "$inlineObject",
      allowAttributes: [
        "language"
      ],
      allowAttributesOf: "$listItem",
      isBlock: true
    });
    schema.addAttributeCheck((context, attributeName) => {
      const parent = context.getItem(context.length - 2);
      const isFormatting = schema.getAttributeProperties(attributeName).isFormatting;
      if (isFormatting && parent && parent.name == "codeBlock") {
        return false;
      }
    });
    editor.editing.downcastDispatcher.on("insert:codeBlock", modelToViewCodeBlockInsertion(model, normalizedLanguagesDefs, true));
    editor.data.downcastDispatcher.on("insert:codeBlock", modelToViewCodeBlockInsertion(model, normalizedLanguagesDefs));
    editor.data.downcastDispatcher.on("insert:softBreak", modelToDataViewSoftBreakInsertion(model), {
      priority: "high"
    });
    editor.data.upcastDispatcher.on("element:code", dataViewToModelCodeBlockInsertion(view, normalizedLanguagesDefs));
    editor.data.upcastDispatcher.on("text", dataViewToModelTextNewlinesInsertion());
    editor.data.upcastDispatcher.on("element:pre", dataViewToModelOrphanNodeConsumer(), {
      priority: "high"
    });
    this.listenTo(editor.editing.view.document, "clipboardInput", (evt, data) => {
      let insertionRange = model.createRange(model.document.selection.anchor);
      if (data.targetRanges) {
        insertionRange = editor.editing.mapper.toModelRange(data.targetRanges[0]);
      }
      if (!insertionRange.start.parent.is("element", "codeBlock")) {
        return;
      }
      const text = data.dataTransfer.getData("text/plain");
      const writer = new UpcastWriter(editor.editing.view.document);
      data.content = rawSnippetTextToViewDocumentFragment(writer, text);
    });
    if (editor.plugins.has("ClipboardPipeline")) {
      editor.plugins.get(ClipboardPipeline).on("contentInsertion", (evt, data) => {
        const model2 = editor.model;
        const selection = model2.document.selection;
        if (!selection.anchor.parent.is("element", "codeBlock")) {
          return;
        }
        model2.change((writer) => {
          const contentRange = writer.createRangeIn(data.content);
          for (const item of [
            ...contentRange.getItems()
          ]) {
            if (item.is("node") && !schema.checkChild(selection.anchor, item)) {
              writer.remove(item);
            }
          }
        });
      });
    }
    this.listenTo(model, "getSelectedContent", (evt, [selection]) => {
      const anchor = selection.anchor;
      if (selection.isCollapsed || !anchor.parent.is("element", "codeBlock") || !anchor.hasSameParentAs(selection.focus)) {
        return;
      }
      model.change((writer) => {
        const docFragment = evt.return;
        if (anchor.parent.is("element") && (docFragment.childCount > 1 || selection.containsEntireContent(anchor.parent))) {
          const codeBlock = writer.createElement("codeBlock", anchor.parent.getAttributes());
          writer.append(docFragment, codeBlock);
          const newDocumentFragment = writer.createDocumentFragment();
          writer.append(codeBlock, newDocumentFragment);
          evt.return = newDocumentFragment;
          return;
        }
        const textNode = docFragment.getChild(0);
        if (schema.checkAttribute(textNode, "code")) {
          writer.setAttribute("code", true, textNode);
        }
      });
    });
  }
  /**
  * @inheritDoc
  */
  afterInit() {
    const editor = this.editor;
    const commands = editor.commands;
    const indent = commands.get("indent");
    const outdent = commands.get("outdent");
    if (indent) {
      indent.registerChildCommand(commands.get("indentCodeBlock"), {
        priority: "highest"
      });
    }
    if (outdent) {
      outdent.registerChildCommand(commands.get("outdentCodeBlock"));
    }
    this.listenTo(editor.editing.view.document, "enter", (evt, data) => {
      const positionParent = editor.model.document.selection.getLastPosition().parent;
      if (!positionParent.is("element", "codeBlock")) {
        return;
      }
      if (!leaveBlockStartOnEnter(editor, data.isSoft) && !leaveBlockEndOnEnter(editor, data.isSoft)) {
        breakLineOnEnter(editor);
      }
      data.preventDefault();
      evt.stop();
    }, {
      context: "pre"
    });
    this._initAriaAnnouncements();
  }
  /**
  * Observe when user enters or leaves code block and set proper aria value in global live announcer.
  * This allows screen readers to indicate when the user has entered and left the specified code block.
  *
  * @internal
  */
  _initAriaAnnouncements() {
    const { model, ui, t } = this.editor;
    const languageDefs = getNormalizedAndLocalizedLanguageDefinitions(this.editor);
    let lastFocusedCodeBlock = null;
    model.document.selection.on("change:range", () => {
      const focusParent = model.document.selection.focus.parent;
      if (!ui || lastFocusedCodeBlock === focusParent || !focusParent.is("element")) {
        return;
      }
      if (lastFocusedCodeBlock && lastFocusedCodeBlock.is("element", "codeBlock")) {
        ui.ariaLiveAnnouncer.announce(getCodeBlockAriaAnnouncement(t, languageDefs, lastFocusedCodeBlock, "leave"));
      }
      if (focusParent.is("element", "codeBlock")) {
        ui.ariaLiveAnnouncer.announce(getCodeBlockAriaAnnouncement(t, languageDefs, focusParent, "enter"));
      }
      lastFocusedCodeBlock = focusParent;
    });
  }
}
function breakLineOnEnter(editor) {
  const model = editor.model;
  const modelDoc = model.document;
  const lastSelectionPosition = modelDoc.selection.getLastPosition();
  let leadingWhiteSpaces;
  const node = getTextNodeAtLineStart(lastSelectionPosition, model);
  if (node && node.is("$text")) {
    leadingWhiteSpaces = getLeadingWhiteSpaces(node);
  }
  editor.model.change((writer) => {
    editor.execute("shiftEnter");
    if (leadingWhiteSpaces) {
      writer.insertText(leadingWhiteSpaces, modelDoc.selection.anchor);
    }
  });
}
function leaveBlockStartOnEnter(editor, isSoftEnter) {
  const model = editor.model;
  const modelDoc = model.document;
  const view = editor.editing.view;
  const lastSelectionPosition = modelDoc.selection.getLastPosition();
  const nodeAfter = lastSelectionPosition.nodeAfter;
  if (isSoftEnter || !modelDoc.selection.isCollapsed || !lastSelectionPosition.isAtStart) {
    return false;
  }
  if (!isSoftBreakNode(nodeAfter)) {
    return false;
  }
  editor.model.change((writer) => {
    editor.execute("enter");
    const newBlock = modelDoc.selection.anchor.parent.previousSibling;
    writer.rename(newBlock, DEFAULT_ELEMENT);
    writer.setSelection(newBlock, "in");
    editor.model.schema.removeDisallowedAttributes([
      newBlock
    ], writer);
    writer.remove(nodeAfter);
  });
  view.scrollToTheSelection();
  return true;
}
function leaveBlockEndOnEnter(editor, isSoftEnter) {
  const model = editor.model;
  const modelDoc = model.document;
  const view = editor.editing.view;
  const lastSelectionPosition = modelDoc.selection.getLastPosition();
  const nodeBefore = lastSelectionPosition.nodeBefore;
  let emptyLineRangeToRemoveOnEnter;
  if (isSoftEnter || !modelDoc.selection.isCollapsed || !lastSelectionPosition.isAtEnd || !nodeBefore || !nodeBefore.previousSibling) {
    return false;
  }
  if (isSoftBreakNode(nodeBefore) && isSoftBreakNode(nodeBefore.previousSibling)) {
    emptyLineRangeToRemoveOnEnter = model.createRange(model.createPositionBefore(nodeBefore.previousSibling), model.createPositionAfter(nodeBefore));
  } else if (isEmptyishTextNode(nodeBefore) && isSoftBreakNode(nodeBefore.previousSibling) && isSoftBreakNode(nodeBefore.previousSibling.previousSibling)) {
    emptyLineRangeToRemoveOnEnter = model.createRange(model.createPositionBefore(nodeBefore.previousSibling.previousSibling), model.createPositionAfter(nodeBefore));
  } else if (isEmptyishTextNode(nodeBefore) && isSoftBreakNode(nodeBefore.previousSibling) && isEmptyishTextNode(nodeBefore.previousSibling.previousSibling) && nodeBefore.previousSibling.previousSibling && isSoftBreakNode(nodeBefore.previousSibling.previousSibling.previousSibling)) {
    emptyLineRangeToRemoveOnEnter = model.createRange(model.createPositionBefore(nodeBefore.previousSibling.previousSibling.previousSibling), model.createPositionAfter(nodeBefore));
  } else {
    return false;
  }
  editor.model.change((writer) => {
    writer.remove(emptyLineRangeToRemoveOnEnter);
    editor.execute("enter");
    const newBlock = modelDoc.selection.anchor.parent;
    writer.rename(newBlock, DEFAULT_ELEMENT);
    editor.model.schema.removeDisallowedAttributes([
      newBlock
    ], writer);
  });
  view.scrollToTheSelection();
  return true;
}
function isEmptyishTextNode(node) {
  return node && node.is("$text") && !node.data.match(/\S/);
}
function isSoftBreakNode(node) {
  return node && node.is("element", "softBreak");
}
class CodeBlockUI extends Plugin {
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "CodeBlockUI";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const t = editor.t;
    const componentFactory = editor.ui.componentFactory;
    const normalizedLanguageDefs = getNormalizedAndLocalizedLanguageDefinitions(editor);
    const itemDefinitions = this._getLanguageListItemDefinitions(normalizedLanguageDefs);
    const command = editor.commands.get("codeBlock");
    componentFactory.add("codeBlock", (locale) => {
      const dropdownView = createDropdown(locale, SplitButtonView);
      const splitButtonView = dropdownView.buttonView;
      const accessibleLabel = t("Insert code block");
      splitButtonView.set({
        label: accessibleLabel,
        tooltip: true,
        icon: icons.codeBlock,
        isToggleable: true
      });
      splitButtonView.bind("isOn").to(command, "value", (value) => !!value);
      splitButtonView.on("execute", () => {
        editor.execute("codeBlock", {
          usePreviousLanguageChoice: true
        });
        editor.editing.view.focus();
      });
      dropdownView.on("execute", (evt) => {
        editor.execute("codeBlock", {
          language: evt.source._codeBlockLanguage,
          forceValue: true
        });
        editor.editing.view.focus();
      });
      dropdownView.class = "ck-code-block-dropdown";
      dropdownView.bind("isEnabled").to(command);
      addListToDropdown(dropdownView, itemDefinitions, {
        role: "menu",
        ariaLabel: accessibleLabel
      });
      return dropdownView;
    });
    componentFactory.add("menuBar:codeBlock", (locale) => {
      const menuView = new MenuBarMenuView(locale);
      menuView.buttonView.set({
        role: "menuitem",
        label: t("Code block"),
        icon: icons.codeBlock
      });
      menuView.bind("isEnabled").to(command);
      const listView = new MenuBarMenuListView(locale);
      listView.set({
        ariaLabel: t("Insert code block")
      });
      for (const definition of itemDefinitions) {
        const listItemView = new MenuBarMenuListItemView(locale, menuView);
        const buttonView = new MenuBarMenuListItemButtonView(locale);
        buttonView.bind(...Object.keys(definition.model)).to(definition.model);
        buttonView.set({
          isToggleable: true,
          role: "menuitemcheckbox"
        });
        buttonView.delegate("execute").to(menuView);
        buttonView.on("execute", () => {
          editor.execute("codeBlock", {
            language: definition.model._codeBlockLanguage,
            forceValue: command.value == definition.model._codeBlockLanguage ? false : true
          });
          editor.editing.view.focus();
        });
        listItemView.children.add(buttonView);
        listView.items.add(listItemView);
      }
      menuView.panelView.children.add(listView);
      return menuView;
    });
  }
  /**
  * A helper returning a collection of the `codeBlock` dropdown items representing languages
  * available for the user to choose from.
  */
  _getLanguageListItemDefinitions(normalizedLanguageDefs) {
    const editor = this.editor;
    const command = editor.commands.get("codeBlock");
    const itemDefinitions = new Collection();
    for (const languageDef of normalizedLanguageDefs) {
      const definition = {
        type: "button",
        model: new Model({
          _codeBlockLanguage: languageDef.language,
          label: languageDef.label,
          role: "menuitemradio",
          withText: true
        })
      };
      definition.model.bind("isOn").to(command, "value", (value) => {
        return value === definition.model._codeBlockLanguage;
      });
      itemDefinitions.add(definition);
    }
    return itemDefinitions;
  }
}
class CodeBlock extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      CodeBlockEditing,
      CodeBlockUI
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "CodeBlock";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
}
/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
function createInlineImageViewElement(writer) {
  return writer.createContainerElement("span", {
    class: "image-inline"
  }, writer.createEmptyElement("img"));
}
function createBlockImageViewElement(writer) {
  return writer.createContainerElement("figure", {
    class: "image"
  }, [
    writer.createEmptyElement("img"),
    writer.createSlot("children")
  ]);
}
function getImgViewElementMatcher(editor, matchImageType) {
  const imageUtils = editor.plugins.get("ImageUtils");
  const areBothImagePluginsLoaded = editor.plugins.has("ImageInlineEditing") && editor.plugins.has("ImageBlockEditing");
  return (element) => {
    if (!imageUtils.isInlineImageView(element)) {
      return null;
    }
    if (!areBothImagePluginsLoaded) {
      return getPositiveMatchPattern(element);
    }
    const imageType = element.getStyle("display") == "block" || element.findAncestor(imageUtils.isBlockImageView) ? "imageBlock" : "imageInline";
    if (imageType !== matchImageType) {
      return null;
    }
    return getPositiveMatchPattern(element);
  };
  function getPositiveMatchPattern(element) {
    const pattern = {
      name: true
    };
    if (element.hasAttribute("src")) {
      pattern.attributes = [
        "src"
      ];
    }
    return pattern;
  }
}
function determineImageTypeForInsertionAtSelection(schema, selection) {
  const firstBlock = first(selection.getSelectedBlocks());
  if (!firstBlock || schema.isObject(firstBlock)) {
    return "imageBlock";
  }
  if (firstBlock.isEmpty && firstBlock.name != "listItem") {
    return "imageBlock";
  }
  return "imageInline";
}
function getSizeValueIfInPx(size) {
  if (size && size.endsWith("px")) {
    return parseInt(size);
  }
  return null;
}
function widthAndHeightStylesAreBothSet(viewElement) {
  const widthStyle = getSizeValueIfInPx(viewElement.getStyle("width"));
  const heightStyle = getSizeValueIfInPx(viewElement.getStyle("height"));
  return !!(widthStyle && heightStyle);
}
const IMAGE_WIDGETS_CLASSES_MATCH_REGEXP = /^(image|image-inline)$/;
class ImageUtils extends Plugin {
  constructor() {
    super(...arguments);
    /**
    * DOM Emitter.
    */
    __publicField(this, "_domEmitter", new (DomEmitterMixin())());
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageUtils";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * Checks if the provided model element is an `image` or `imageInline`.
  */
  isImage(modelElement) {
    return this.isInlineImage(modelElement) || this.isBlockImage(modelElement);
  }
  /**
  * Checks if the provided view element represents an inline image.
  *
  * Also, see {@link module:image/imageutils~ImageUtils#isImageWidget}.
  */
  isInlineImageView(element) {
    return !!element && element.is("element", "img");
  }
  /**
  * Checks if the provided view element represents a block image.
  *
  * Also, see {@link module:image/imageutils~ImageUtils#isImageWidget}.
  */
  isBlockImageView(element) {
    return !!element && element.is("element", "figure") && element.hasClass("image");
  }
  /**
  * Handles inserting single file. This method unifies image insertion using {@link module:widget/utils~findOptimalInsertionRange}
  * method.
  *
  * ```ts
  * const imageUtils = editor.plugins.get( 'ImageUtils' );
  *
  * imageUtils.insertImage( { src: 'path/to/image.jpg' } );
  * ```
  *
  * @param attributes Attributes of the inserted image.
  * This method filters out the attributes which are disallowed by the {@link module:engine/model/schema~Schema}.
  * @param selectable Place to insert the image. If not specified,
  * the {@link module:widget/utils~findOptimalInsertionRange} logic will be applied for the block images
  * and `model.document.selection` for the inline images.
  *
  * **Note**: If `selectable` is passed, this helper will not be able to set selection attributes (such as `linkHref`)
  * and apply them to the new image. In this case, make sure all selection attributes are passed in `attributes`.
  *
  * @param imageType Image type of inserted image. If not specified,
  * it will be determined automatically depending of editor config or place of the insertion.
  * @param options.setImageSizes Specifies whether the image `width` and `height` attributes should be set automatically.
  * The default is `true`.
  * @return The inserted model image element.
  */
  insertImage(attributes = {}, selectable = null, imageType = null, options = {}) {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;
    const determinedImageType = determineImageTypeForInsertion(editor, selectable || selection, imageType);
    attributes = {
      ...Object.fromEntries(selection.getAttributes()),
      ...attributes
    };
    for (const attributeName in attributes) {
      if (!model.schema.checkAttribute(determinedImageType, attributeName)) {
        delete attributes[attributeName];
      }
    }
    return model.change((writer) => {
      const { setImageSizes = true } = options;
      const imageElement = writer.createElement(determinedImageType, attributes);
      model.insertObject(imageElement, selectable, null, {
        setSelection: "on",
        // If we want to insert a block image (for whatever reason) then we don't want to split text blocks.
        // This applies only when we don't have the selectable specified (i.e., we insert multiple block images at once).
        findOptimalPosition: !selectable && determinedImageType != "imageInline" ? "auto" : void 0
      });
      if (imageElement.parent) {
        if (setImageSizes) {
          this.setImageNaturalSizeAttributes(imageElement);
        }
        return imageElement;
      }
      return null;
    });
  }
  /**
  * Reads original image sizes and sets them as `width` and `height`.
  *
  * The `src` attribute may not be available if the user is using an upload adapter. In such a case,
  * this method is called again after the upload process is complete and the `src` attribute is available.
  */
  setImageNaturalSizeAttributes(imageElement) {
    const src = imageElement.getAttribute("src");
    if (!src) {
      return;
    }
    if (imageElement.getAttribute("width") || imageElement.getAttribute("height")) {
      return;
    }
    this.editor.model.change((writer) => {
      const img = new global.window.Image();
      this._domEmitter.listenTo(img, "load", () => {
        if (!imageElement.getAttribute("width") && !imageElement.getAttribute("height")) {
          this.editor.model.enqueueChange(writer.batch, (writer2) => {
            writer2.setAttribute("width", img.naturalWidth, imageElement);
            writer2.setAttribute("height", img.naturalHeight, imageElement);
          });
        }
        this._domEmitter.stopListening(img, "load");
      });
      img.src = src;
    });
  }
  /**
  * Returns an image widget editing view element if one is selected or is among the selection's ancestors.
  */
  getClosestSelectedImageWidget(selection) {
    const selectionPosition = selection.getFirstPosition();
    if (!selectionPosition) {
      return null;
    }
    const viewElement = selection.getSelectedElement();
    if (viewElement && this.isImageWidget(viewElement)) {
      return viewElement;
    }
    let parent = selectionPosition.parent;
    while (parent) {
      if (parent.is("element") && this.isImageWidget(parent)) {
        return parent;
      }
      parent = parent.parent;
    }
    return null;
  }
  /**
  * Returns a image model element if one is selected or is among the selection's ancestors.
  */
  getClosestSelectedImageElement(selection) {
    const selectedElement = selection.getSelectedElement();
    return this.isImage(selectedElement) ? selectedElement : selection.getFirstPosition().findAncestor("imageBlock");
  }
  /**
  * Returns an image widget editing view based on the passed image view.
  */
  getImageWidgetFromImageView(imageView) {
    return imageView.findAncestor({
      classes: IMAGE_WIDGETS_CLASSES_MATCH_REGEXP
    });
  }
  /**
  * Checks if image can be inserted at current model selection.
  *
  * @internal
  */
  isImageAllowed() {
    const model = this.editor.model;
    const selection = model.document.selection;
    return isImageAllowedInParent(this.editor, selection) && isNotInsideImage(selection);
  }
  /**
  * Converts a given {@link module:engine/view/element~Element} to an image widget:
  * * Adds a {@link module:engine/view/element~Element#_setCustomProperty custom property} allowing to recognize the image widget
  * element.
  * * Calls the {@link module:widget/utils~toWidget} function with the proper element's label creator.
  *
  * @param writer An instance of the view writer.
  * @param label The element's label. It will be concatenated with the image `alt` attribute if one is present.
  */
  toImageWidget(viewElement, writer, label) {
    writer.setCustomProperty("image", true, viewElement);
    const labelCreator = () => {
      const imgElement = this.findViewImgElement(viewElement);
      const altText = imgElement.getAttribute("alt");
      return altText ? `${altText} ${label}` : label;
    };
    return toWidget(viewElement, writer, {
      label: labelCreator
    });
  }
  /**
  * Checks if a given view element is an image widget.
  */
  isImageWidget(viewElement) {
    return !!viewElement.getCustomProperty("image") && isWidget(viewElement);
  }
  /**
  * Checks if the provided model element is an `image`.
  */
  isBlockImage(modelElement) {
    return !!modelElement && modelElement.is("element", "imageBlock");
  }
  /**
  * Checks if the provided model element is an `imageInline`.
  */
  isInlineImage(modelElement) {
    return !!modelElement && modelElement.is("element", "imageInline");
  }
  /**
  * Get the view `<img>` from another view element, e.g. a widget (`<figure class="image">`), a link (`<a>`).
  *
  * The `<img>` can be located deep in other elements, so this helper performs a deep tree search.
  */
  findViewImgElement(figureView) {
    if (this.isInlineImageView(figureView)) {
      return figureView;
    }
    const editingView = this.editor.editing.view;
    for (const { item } of editingView.createRangeIn(figureView)) {
      if (this.isInlineImageView(item)) {
        return item;
      }
    }
  }
  /**
  * @inheritDoc
  */
  destroy() {
    this._domEmitter.stopListening();
    return super.destroy();
  }
}
function isImageAllowedInParent(editor, selection) {
  const imageType = determineImageTypeForInsertion(editor, selection, null);
  if (imageType == "imageBlock") {
    const parent = getInsertImageParent(selection, editor.model);
    if (editor.model.schema.checkChild(parent, "imageBlock")) {
      return true;
    }
  } else if (editor.model.schema.checkChild(selection.focus, "imageInline")) {
    return true;
  }
  return false;
}
function isNotInsideImage(selection) {
  return [
    ...selection.focus.getAncestors()
  ].every((ancestor) => !ancestor.is("element", "imageBlock"));
}
function getInsertImageParent(selection, model) {
  const insertionRange = findOptimalInsertionRange(selection, model);
  const parent = insertionRange.start.parent;
  if (parent.isEmpty && !parent.is("element", "$root")) {
    return parent.parent;
  }
  return parent;
}
function determineImageTypeForInsertion(editor, selectable, imageType) {
  const schema = editor.model.schema;
  const configImageInsertType = editor.config.get("image.insert.type");
  if (!editor.plugins.has("ImageBlockEditing")) {
    return "imageInline";
  }
  if (!editor.plugins.has("ImageInlineEditing")) {
    return "imageBlock";
  }
  if (imageType) {
    return imageType;
  }
  if (configImageInsertType === "inline") {
    return "imageInline";
  }
  if (configImageInsertType !== "auto") {
    return "imageBlock";
  }
  if (selectable.is("selection")) {
    return determineImageTypeForInsertionAtSelection(schema, selectable);
  }
  return schema.checkChild(selectable, "imageInline") ? "imageInline" : "imageBlock";
}
class ImageTextAlternativeCommand extends Command {
  /**
  * @inheritDoc
  */
  refresh() {
    const editor = this.editor;
    const imageUtils = editor.plugins.get("ImageUtils");
    const element = imageUtils.getClosestSelectedImageElement(this.editor.model.document.selection);
    this.isEnabled = !!element;
    if (this.isEnabled && element.hasAttribute("alt")) {
      this.value = element.getAttribute("alt");
    } else {
      this.value = false;
    }
  }
  /**
  * Executes the command.
  *
  * @fires execute
  * @param options
  * @param options.newValue The new value of the `alt` attribute to set.
  */
  execute(options) {
    const editor = this.editor;
    const imageUtils = editor.plugins.get("ImageUtils");
    const model = editor.model;
    const imageElement = imageUtils.getClosestSelectedImageElement(model.document.selection);
    model.change((writer) => {
      writer.setAttribute("alt", options.newValue, imageElement);
    });
  }
}
class ImageTextAlternativeEditing extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageUtils
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageTextAlternativeEditing";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    this.editor.commands.add("imageTextAlternative", new ImageTextAlternativeCommand(this.editor));
  }
}
class TextAlternativeFormView extends View {
  /**
  * @inheritDoc
  */
  constructor(locale) {
    super(locale);
    /**
    * Tracks information about the DOM focus in the form.
    */
    __publicField(this, "focusTracker");
    /**
    * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
    */
    __publicField(this, "keystrokes");
    /**
    * An input with a label.
    */
    __publicField(this, "labeledInput");
    /**
    * A button used to submit the form.
    */
    __publicField(this, "saveButtonView");
    /**
    * A button used to cancel the form.
    */
    __publicField(this, "cancelButtonView");
    /**
    * A collection of views which can be focused in the form.
    */
    __publicField(this, "_focusables");
    /**
    * Helps cycling over {@link #_focusables} in the form.
    */
    __publicField(this, "_focusCycler");
    const t = this.locale.t;
    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();
    this.labeledInput = this._createLabeledInputView();
    this.saveButtonView = this._createButton(t("Save"), icons.check, "ck-button-save");
    this.saveButtonView.type = "submit";
    this.cancelButtonView = this._createButton(t("Cancel"), icons.cancel, "ck-button-cancel", "cancel");
    this._focusables = new ViewCollection();
    this._focusCycler = new FocusCycler({
      focusables: this._focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        // Navigate form fields backwards using the Shift + Tab keystroke.
        focusPrevious: "shift + tab",
        // Navigate form fields forwards using the Tab key.
        focusNext: "tab"
      }
    });
    this.setTemplate({
      tag: "form",
      attributes: {
        class: [
          "ck",
          "ck-text-alternative-form",
          "ck-responsive-form"
        ],
        // https://github.com/ckeditor/ckeditor5-image/issues/40
        tabindex: "-1"
      },
      children: [
        this.labeledInput,
        this.saveButtonView,
        this.cancelButtonView
      ]
    });
  }
  /**
  * @inheritDoc
  */
  render() {
    super.render();
    this.keystrokes.listenTo(this.element);
    submitHandler({
      view: this
    });
    [
      this.labeledInput,
      this.saveButtonView,
      this.cancelButtonView
    ].forEach((v) => {
      this._focusables.add(v);
      this.focusTracker.add(v.element);
    });
  }
  /**
  * @inheritDoc
  */
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
    this.keystrokes.destroy();
  }
  /**
  * Creates the button view.
  *
  * @param label The button label
  * @param icon The button's icon.
  * @param className The additional button CSS class name.
  * @param eventName The event name that the ButtonView#execute event will be delegated to.
  * @returns The button view instance.
  */
  _createButton(label, icon, className, eventName) {
    const button = new ButtonView(this.locale);
    button.set({
      label,
      icon,
      tooltip: true
    });
    button.extendTemplate({
      attributes: {
        class: className
      }
    });
    if (eventName) {
      button.delegate("execute").to(this, eventName);
    }
    return button;
  }
  /**
  * Creates an input with a label.
  *
  * @returns Labeled field view instance.
  */
  _createLabeledInputView() {
    const t = this.locale.t;
    const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
    labeledInput.label = t("Text alternative");
    return labeledInput;
  }
}
function repositionContextualBalloon(editor) {
  const balloon = editor.plugins.get("ContextualBalloon");
  const imageUtils = editor.plugins.get("ImageUtils");
  if (imageUtils.getClosestSelectedImageWidget(editor.editing.view.document.selection)) {
    const position = getBalloonPositionData(editor);
    balloon.updatePosition(position);
  }
}
function getBalloonPositionData(editor) {
  const editingView = editor.editing.view;
  const defaultPositions = BalloonPanelView.defaultPositions;
  const imageUtils = editor.plugins.get("ImageUtils");
  return {
    target: editingView.domConverter.mapViewToDom(imageUtils.getClosestSelectedImageWidget(editingView.document.selection)),
    positions: [
      defaultPositions.northArrowSouth,
      defaultPositions.northArrowSouthWest,
      defaultPositions.northArrowSouthEast,
      defaultPositions.southArrowNorth,
      defaultPositions.southArrowNorthWest,
      defaultPositions.southArrowNorthEast,
      defaultPositions.viewportStickyNorth
    ]
  };
}
class ImageTextAlternativeUI extends Plugin {
  constructor() {
    super(...arguments);
    /**
    * The contextual balloon plugin instance.
    */
    __publicField(this, "_balloon");
    /**
    * A form containing a textarea and buttons, used to change the `alt` text value.
    */
    __publicField(this, "_form");
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ContextualBalloon
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageTextAlternativeUI";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    this._createButton();
  }
  /**
  * @inheritDoc
  */
  destroy() {
    super.destroy();
    if (this._form) {
      this._form.destroy();
    }
  }
  /**
  * Creates a button showing the balloon panel for changing the image text alternative and
  * registers it in the editor {@link module:ui/componentfactory~ComponentFactory ComponentFactory}.
  */
  _createButton() {
    const editor = this.editor;
    const t = editor.t;
    editor.ui.componentFactory.add("imageTextAlternative", (locale) => {
      const command = editor.commands.get("imageTextAlternative");
      const view = new ButtonView(locale);
      view.set({
        label: t("Change image text alternative"),
        icon: icons.textAlternative,
        tooltip: true
      });
      view.bind("isEnabled").to(command, "isEnabled");
      view.bind("isOn").to(command, "value", (value) => !!value);
      this.listenTo(view, "execute", () => {
        this._showForm();
      });
      return view;
    });
  }
  /**
  * Creates the {@link module:image/imagetextalternative/ui/textalternativeformview~TextAlternativeFormView}
  * form.
  */
  _createForm() {
    const editor = this.editor;
    const view = editor.editing.view;
    const viewDocument = view.document;
    const imageUtils = editor.plugins.get("ImageUtils");
    this._balloon = this.editor.plugins.get("ContextualBalloon");
    this._form = new (CssTransitionDisablerMixin(TextAlternativeFormView))(editor.locale);
    this._form.render();
    this.listenTo(this._form, "submit", () => {
      editor.execute("imageTextAlternative", {
        newValue: this._form.labeledInput.fieldView.element.value
      });
      this._hideForm(true);
    });
    this.listenTo(this._form, "cancel", () => {
      this._hideForm(true);
    });
    this._form.keystrokes.set("Esc", (data, cancel) => {
      this._hideForm(true);
      cancel();
    });
    this.listenTo(editor.ui, "update", () => {
      if (!imageUtils.getClosestSelectedImageWidget(viewDocument.selection)) {
        this._hideForm(true);
      } else if (this._isVisible) {
        repositionContextualBalloon(editor);
      }
    });
    clickOutsideHandler({
      emitter: this._form,
      activator: () => this._isVisible,
      contextElements: () => [
        this._balloon.view.element
      ],
      callback: () => this._hideForm()
    });
  }
  /**
  * Shows the {@link #_form} in the {@link #_balloon}.
  */
  _showForm() {
    if (this._isVisible) {
      return;
    }
    if (!this._form) {
      this._createForm();
    }
    const editor = this.editor;
    const command = editor.commands.get("imageTextAlternative");
    const labeledInput = this._form.labeledInput;
    this._form.disableCssTransitions();
    if (!this._isInBalloon) {
      this._balloon.add({
        view: this._form,
        position: getBalloonPositionData(editor)
      });
    }
    labeledInput.fieldView.value = labeledInput.fieldView.element.value = command.value || "";
    this._form.labeledInput.fieldView.select();
    this._form.enableCssTransitions();
  }
  /**
  * Removes the {@link #_form} from the {@link #_balloon}.
  *
  * @param focusEditable Controls whether the editing view is focused afterwards.
  */
  _hideForm(focusEditable = false) {
    if (!this._isInBalloon) {
      return;
    }
    if (this._form.focusTracker.isFocused) {
      this._form.saveButtonView.focus();
    }
    this._balloon.remove(this._form);
    if (focusEditable) {
      this.editor.editing.view.focus();
    }
  }
  /**
  * Returns `true` when the {@link #_form} is the visible view in the {@link #_balloon}.
  */
  get _isVisible() {
    return !!this._balloon && this._balloon.visibleView === this._form;
  }
  /**
  * Returns `true` when the {@link #_form} is in the {@link #_balloon}.
  */
  get _isInBalloon() {
    return !!this._balloon && this._balloon.hasView(this._form);
  }
}
class ImageTextAlternative extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageTextAlternativeEditing,
      ImageTextAlternativeUI
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageTextAlternative";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
}
function upcastImageFigure(imageUtils) {
  const converter = (evt, data, conversionApi) => {
    if (!conversionApi.consumable.test(data.viewItem, {
      name: true,
      classes: "image"
    })) {
      return;
    }
    const viewImage = imageUtils.findViewImgElement(data.viewItem);
    if (!viewImage || !conversionApi.consumable.test(viewImage, {
      name: true
    })) {
      return;
    }
    conversionApi.consumable.consume(data.viewItem, {
      name: true,
      classes: "image"
    });
    const conversionResult = conversionApi.convertItem(viewImage, data.modelCursor);
    const modelImage = first(conversionResult.modelRange.getItems());
    if (!modelImage) {
      conversionApi.consumable.revert(data.viewItem, {
        name: true,
        classes: "image"
      });
      return;
    }
    conversionApi.convertChildren(data.viewItem, modelImage);
    conversionApi.updateConversionResult(modelImage, data);
  };
  return (dispatcher) => {
    dispatcher.on("element:figure", converter);
  };
}
function downcastSrcsetAttribute(imageUtils, imageType) {
  const converter = (evt, data, conversionApi) => {
    if (!conversionApi.consumable.consume(data.item, evt.name)) {
      return;
    }
    const writer = conversionApi.writer;
    const element = conversionApi.mapper.toViewElement(data.item);
    const img = imageUtils.findViewImgElement(element);
    if (data.attributeNewValue === null) {
      writer.removeAttribute("srcset", img);
      writer.removeAttribute("sizes", img);
    } else {
      if (data.attributeNewValue) {
        writer.setAttribute("srcset", data.attributeNewValue, img);
        writer.setAttribute("sizes", "100vw", img);
      }
    }
  };
  return (dispatcher) => {
    dispatcher.on(`attribute:srcset:${imageType}`, converter);
  };
}
function downcastImageAttribute(imageUtils, imageType, attributeKey) {
  const converter = (evt, data, conversionApi) => {
    if (!conversionApi.consumable.consume(data.item, evt.name)) {
      return;
    }
    const viewWriter = conversionApi.writer;
    const element = conversionApi.mapper.toViewElement(data.item);
    const img = imageUtils.findViewImgElement(element);
    viewWriter.setAttribute(data.attributeKey, data.attributeNewValue || "", img);
  };
  return (dispatcher) => {
    dispatcher.on(`attribute:${attributeKey}:${imageType}`, converter);
  };
}
class ImageLoadObserver extends Observer {
  /**
  * @inheritDoc
  */
  observe(domRoot) {
    this.listenTo(domRoot, "load", (event, domEvent) => {
      const domElement = domEvent.target;
      if (this.checkShouldIgnoreEventFromTarget(domElement)) {
        return;
      }
      if (domElement.tagName == "IMG") {
        this._fireEvents(domEvent);
      }
    }, {
      useCapture: true
    });
  }
  /**
  * @inheritDoc
  */
  stopObserving(domRoot) {
    this.stopListening(domRoot);
  }
  /**
  * Fires {@link module:engine/view/document~Document#event:layoutChanged} and
  * {@link module:engine/view/document~Document#event:imageLoaded}
  * if observer {@link #isEnabled is enabled}.
  *
  * @param domEvent The DOM event.
  */
  _fireEvents(domEvent) {
    if (this.isEnabled) {
      this.document.fire("layoutChanged");
      this.document.fire("imageLoaded", domEvent);
    }
  }
}
class InsertImageCommand extends Command {
  /**
  * @inheritDoc
  */
  constructor(editor) {
    super(editor);
    const configImageInsertType = editor.config.get("image.insert.type");
    if (!editor.plugins.has("ImageBlockEditing")) {
      if (configImageInsertType === "block") {
        logWarning("image-block-plugin-required");
      }
    }
    if (!editor.plugins.has("ImageInlineEditing")) {
      if (configImageInsertType === "inline") {
        logWarning("image-inline-plugin-required");
      }
    }
  }
  /**
  * @inheritDoc
  */
  refresh() {
    const imageUtils = this.editor.plugins.get("ImageUtils");
    this.isEnabled = imageUtils.isImageAllowed();
  }
  /**
  * Executes the command.
  *
  * @fires execute
  * @param options Options for the executed command.
  * @param options.imageType The type of the image to insert. If not specified, the type will be determined automatically.
  * @param options.source The image source or an array of image sources to insert.
  * @param options.breakBlock If set to `true`, the block at the selection start will be broken before inserting the image.
  * See the documentation of the command to learn more about accepted formats.
  */
  execute(options) {
    const sourceDefinitions = toArray(options.source);
    const selection = this.editor.model.document.selection;
    const imageUtils = this.editor.plugins.get("ImageUtils");
    const selectionAttributes = Object.fromEntries(selection.getAttributes());
    sourceDefinitions.forEach((sourceDefinition, index) => {
      const selectedElement = selection.getSelectedElement();
      if (typeof sourceDefinition === "string") {
        sourceDefinition = {
          src: sourceDefinition
        };
      }
      if (index && selectedElement && imageUtils.isImage(selectedElement)) {
        const position = this.editor.model.createPositionAfter(selectedElement);
        imageUtils.insertImage({
          ...sourceDefinition,
          ...selectionAttributes
        }, position, options.imageType);
      } else if (options.breakBlock) {
        imageUtils.insertImage({
          ...sourceDefinition,
          ...selectionAttributes
        }, selection.getFirstPosition(), options.imageType);
      } else {
        imageUtils.insertImage({
          ...sourceDefinition,
          ...selectionAttributes
        }, null, options.imageType);
      }
    });
  }
}
class ReplaceImageSourceCommand extends Command {
  constructor(editor) {
    super(editor);
    this.decorate("cleanupImage");
  }
  /**
  * @inheritDoc
  */
  refresh() {
    const editor = this.editor;
    const imageUtils = editor.plugins.get("ImageUtils");
    const element = this.editor.model.document.selection.getSelectedElement();
    this.isEnabled = imageUtils.isImage(element);
    this.value = this.isEnabled ? element.getAttribute("src") : null;
  }
  /**
  * Executes the command.
  *
  * @fires execute
  * @param options Options for the executed command.
  * @param options.source The image source to replace.
  */
  execute(options) {
    const image = this.editor.model.document.selection.getSelectedElement();
    const imageUtils = this.editor.plugins.get("ImageUtils");
    this.editor.model.change((writer) => {
      writer.setAttribute("src", options.source, image);
      this.cleanupImage(writer, image);
      imageUtils.setImageNaturalSizeAttributes(image);
    });
  }
  /**
  * Cleanup image attributes that are not relevant to the new source.
  *
  * Removed attributes are: 'srcset', 'sizes', 'sources', 'width', 'height', 'alt'.
  *
  * This method is decorated, to allow custom cleanup logic.
  * For example, to remove 'myImageId' attribute after 'src' has changed:
  *
  * ```ts
  * replaceImageSourceCommand.on( 'cleanupImage', ( eventInfo, [ writer, image ] ) => {
  * 	writer.removeAttribute( 'myImageId', image );
  * } );
  * ```
  */
  cleanupImage(writer, image) {
    writer.removeAttribute("srcset", image);
    writer.removeAttribute("sizes", image);
    writer.removeAttribute("sources", image);
    writer.removeAttribute("width", image);
    writer.removeAttribute("height", image);
    writer.removeAttribute("alt", image);
  }
}
class ImageEditing extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageUtils
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageEditing";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const conversion = editor.conversion;
    editor.editing.view.addObserver(ImageLoadObserver);
    conversion.for("upcast").attributeToAttribute({
      view: {
        name: "img",
        key: "alt"
      },
      model: "alt"
    }).attributeToAttribute({
      view: {
        name: "img",
        key: "srcset"
      },
      model: "srcset"
    });
    const insertImageCommand = new InsertImageCommand(editor);
    const replaceImageSourceCommand = new ReplaceImageSourceCommand(editor);
    editor.commands.add("insertImage", insertImageCommand);
    editor.commands.add("replaceImageSource", replaceImageSourceCommand);
    editor.commands.add("imageInsert", insertImageCommand);
  }
}
class ImageSizeAttributes extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageUtils
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageSizeAttributes";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  afterInit() {
    this._registerSchema();
    this._registerConverters("imageBlock");
    this._registerConverters("imageInline");
  }
  /**
  * Registers the `width` and `height` attributes for inline and block images.
  */
  _registerSchema() {
    if (this.editor.plugins.has("ImageBlockEditing")) {
      this.editor.model.schema.extend("imageBlock", {
        allowAttributes: [
          "width",
          "height"
        ]
      });
    }
    if (this.editor.plugins.has("ImageInlineEditing")) {
      this.editor.model.schema.extend("imageInline", {
        allowAttributes: [
          "width",
          "height"
        ]
      });
    }
  }
  /**
  * Registers converters for `width` and `height` attributes.
  */
  _registerConverters(imageType) {
    const editor = this.editor;
    const imageUtils = editor.plugins.get("ImageUtils");
    const viewElementName = imageType === "imageBlock" ? "figure" : "img";
    editor.conversion.for("upcast").attributeToAttribute({
      view: {
        name: viewElementName,
        styles: {
          width: /.+/
        }
      },
      model: {
        key: "width",
        value: (viewElement) => {
          if (widthAndHeightStylesAreBothSet(viewElement)) {
            return getSizeValueIfInPx(viewElement.getStyle("width"));
          }
          return null;
        }
      }
    }).attributeToAttribute({
      view: {
        name: viewElementName,
        key: "width"
      },
      model: "width"
    }).attributeToAttribute({
      view: {
        name: viewElementName,
        styles: {
          height: /.+/
        }
      },
      model: {
        key: "height",
        value: (viewElement) => {
          if (widthAndHeightStylesAreBothSet(viewElement)) {
            return getSizeValueIfInPx(viewElement.getStyle("height"));
          }
          return null;
        }
      }
    }).attributeToAttribute({
      view: {
        name: viewElementName,
        key: "height"
      },
      model: "height"
    });
    editor.conversion.for("editingDowncast").add((dispatcher) => {
      attachDowncastConverter(dispatcher, "width", "width", true, true);
      attachDowncastConverter(dispatcher, "height", "height", true, true);
    });
    editor.conversion.for("dataDowncast").add((dispatcher) => {
      attachDowncastConverter(dispatcher, "width", "width", false);
      attachDowncastConverter(dispatcher, "height", "height", false);
    });
    function attachDowncastConverter(dispatcher, modelAttributeName, viewAttributeName, setRatioForInlineImage, isEditingDowncast = false) {
      dispatcher.on(`attribute:${modelAttributeName}:${imageType}`, (evt, data, conversionApi) => {
        if (!conversionApi.consumable.consume(data.item, evt.name)) {
          return;
        }
        const viewWriter = conversionApi.writer;
        const viewElement = conversionApi.mapper.toViewElement(data.item);
        const img = imageUtils.findViewImgElement(viewElement);
        if (data.attributeNewValue !== null) {
          viewWriter.setAttribute(viewAttributeName, data.attributeNewValue, img);
        } else {
          viewWriter.removeAttribute(viewAttributeName, img);
        }
        const width = data.item.getAttribute("width");
        const height = data.item.getAttribute("height");
        const hasSizes = width && height;
        if (hasSizes && isEditingDowncast) {
          viewWriter.setAttribute("loading", "lazy", img);
        }
        if (data.item.hasAttribute("sources")) {
          return;
        }
        const isResized = data.item.hasAttribute("resizedWidth");
        if (imageType === "imageInline" && !isResized && !setRatioForInlineImage) {
          return;
        }
        if (hasSizes) {
          viewWriter.setStyle("aspect-ratio", `${width}/${height}`, img);
        }
      });
    }
  }
}
class ImageTypeCommand extends Command {
  /**
  * @inheritDoc
  *
  * @param modelElementName Model element name the command converts to.
  */
  constructor(editor, modelElementName) {
    super(editor);
    /**
    * Model element name the command converts to.
    */
    __publicField(this, "_modelElementName");
    this._modelElementName = modelElementName;
  }
  /**
  * @inheritDoc
  */
  refresh() {
    const editor = this.editor;
    const imageUtils = editor.plugins.get("ImageUtils");
    const element = imageUtils.getClosestSelectedImageElement(this.editor.model.document.selection);
    if (this._modelElementName === "imageBlock") {
      this.isEnabled = imageUtils.isInlineImage(element);
    } else {
      this.isEnabled = imageUtils.isBlockImage(element);
    }
  }
  /**
  * Executes the command and changes the type of a selected image.
  *
  * @fires execute
  * @param options.setImageSizes Specifies whether the image `width` and `height` attributes should be set automatically.
  * The default is `true`.
  * @returns An object containing references to old and new model image elements
  * (for before and after the change) so external integrations can hook into the decorated
  * `execute` event and handle this change. `null` if the type change failed.
  */
  execute(options = {}) {
    const editor = this.editor;
    const model = this.editor.model;
    const imageUtils = editor.plugins.get("ImageUtils");
    const oldElement = imageUtils.getClosestSelectedImageElement(model.document.selection);
    const attributes = Object.fromEntries(oldElement.getAttributes());
    if (!attributes.src && !attributes.uploadId) {
      return null;
    }
    return model.change((writer) => {
      const { setImageSizes = true } = options;
      const markers = Array.from(model.markers).filter((marker) => marker.getRange().containsItem(oldElement));
      const newElement = imageUtils.insertImage(attributes, model.createSelection(oldElement, "on"), this._modelElementName, {
        setImageSizes
      });
      if (!newElement) {
        return null;
      }
      const newElementRange = writer.createRangeOn(newElement);
      for (const marker of markers) {
        const markerRange = marker.getRange();
        const range = markerRange.root.rootName != "$graveyard" ? markerRange.getJoined(newElementRange, true) : newElementRange;
        writer.updateMarker(marker, {
          range
        });
      }
      return {
        oldElement,
        newElement
      };
    });
  }
}
class ImagePlaceholder extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageUtils
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImagePlaceholder";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  afterInit() {
    this._setupSchema();
    this._setupConversion();
    this._setupLoadListener();
  }
  /**
  * Extends model schema.
  */
  _setupSchema() {
    const schema = this.editor.model.schema;
    if (schema.isRegistered("imageBlock")) {
      schema.extend("imageBlock", {
        allowAttributes: [
          "placeholder"
        ]
      });
    }
    if (schema.isRegistered("imageInline")) {
      schema.extend("imageInline", {
        allowAttributes: [
          "placeholder"
        ]
      });
    }
  }
  /**
  * Registers converters.
  */
  _setupConversion() {
    const editor = this.editor;
    const conversion = editor.conversion;
    const imageUtils = editor.plugins.get("ImageUtils");
    conversion.for("editingDowncast").add((dispatcher) => {
      dispatcher.on("attribute:placeholder", (evt, data, conversionApi) => {
        if (!conversionApi.consumable.test(data.item, evt.name)) {
          return;
        }
        if (!data.item.is("element", "imageBlock") && !data.item.is("element", "imageInline")) {
          return;
        }
        conversionApi.consumable.consume(data.item, evt.name);
        const viewWriter = conversionApi.writer;
        const element = conversionApi.mapper.toViewElement(data.item);
        const img = imageUtils.findViewImgElement(element);
        if (data.attributeNewValue) {
          viewWriter.addClass("image_placeholder", img);
          viewWriter.setStyle("background-image", `url(${data.attributeNewValue})`, img);
          viewWriter.setCustomProperty("editingPipeline:doNotReuseOnce", true, img);
        } else {
          viewWriter.removeClass("image_placeholder", img);
          viewWriter.removeStyle("background-image", img);
        }
      });
    });
  }
  /**
  * Prepares listener for image load.
  */
  _setupLoadListener() {
    const editor = this.editor;
    const model = editor.model;
    const editing = editor.editing;
    const editingView = editing.view;
    const imageUtils = editor.plugins.get("ImageUtils");
    editingView.addObserver(ImageLoadObserver);
    this.listenTo(editingView.document, "imageLoaded", (evt, domEvent) => {
      const imgViewElement = editingView.domConverter.mapDomToView(domEvent.target);
      if (!imgViewElement) {
        return;
      }
      const viewElement = imageUtils.getImageWidgetFromImageView(imgViewElement);
      if (!viewElement) {
        return;
      }
      const modelElement = editing.mapper.toModelElement(viewElement);
      if (!modelElement || !modelElement.hasAttribute("placeholder")) {
        return;
      }
      model.enqueueChange({
        isUndoable: false
      }, (writer) => {
        writer.removeAttribute("placeholder", modelElement);
      });
    });
  }
}
class ImageBlockEditing extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageEditing,
      ImageSizeAttributes,
      ImageUtils,
      ImagePlaceholder,
      ClipboardPipeline
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageBlockEditing";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const schema = editor.model.schema;
    schema.register("imageBlock", {
      inheritAllFrom: "$blockObject",
      allowAttributes: [
        "alt",
        "src",
        "srcset"
      ]
    });
    this._setupConversion();
    if (editor.plugins.has("ImageInlineEditing")) {
      editor.commands.add("imageTypeBlock", new ImageTypeCommand(this.editor, "imageBlock"));
      this._setupClipboardIntegration();
    }
  }
  /**
  * Configures conversion pipelines to support upcasting and downcasting
  * block images (block image widgets) and their attributes.
  */
  _setupConversion() {
    const editor = this.editor;
    const t = editor.t;
    const conversion = editor.conversion;
    const imageUtils = editor.plugins.get("ImageUtils");
    conversion.for("dataDowncast").elementToStructure({
      model: "imageBlock",
      view: (modelElement, { writer }) => createBlockImageViewElement(writer)
    });
    conversion.for("editingDowncast").elementToStructure({
      model: "imageBlock",
      view: (modelElement, { writer }) => imageUtils.toImageWidget(createBlockImageViewElement(writer), writer, t("image widget"))
    });
    conversion.for("downcast").add(downcastImageAttribute(imageUtils, "imageBlock", "src")).add(downcastImageAttribute(imageUtils, "imageBlock", "alt")).add(downcastSrcsetAttribute(imageUtils, "imageBlock"));
    conversion.for("upcast").elementToElement({
      view: getImgViewElementMatcher(editor, "imageBlock"),
      model: (viewImage, { writer }) => writer.createElement("imageBlock", viewImage.hasAttribute("src") ? {
        src: viewImage.getAttribute("src")
      } : void 0)
    }).add(upcastImageFigure(imageUtils));
  }
  /**
  * Integrates the plugin with the clipboard pipeline.
  *
  * Idea is that the feature should recognize the user's intent when an **inline** image is
  * pasted or dropped. If such an image is pasted/dropped:
  *
  * * into an empty block (e.g. an empty paragraph),
  * * on another object (e.g. some block widget).
  *
  * it gets converted into a block image on the fly. We assume this is the user's intent
  * if they decided to put their image there.
  *
  * See the `ImageInlineEditing` for the similar integration that works in the opposite direction.
  *
  * The feature also sets image `width` and `height` attributes on paste.
  */
  _setupClipboardIntegration() {
    const editor = this.editor;
    const model = editor.model;
    const editingView = editor.editing.view;
    const imageUtils = editor.plugins.get("ImageUtils");
    const clipboardPipeline = editor.plugins.get("ClipboardPipeline");
    this.listenTo(clipboardPipeline, "inputTransformation", (evt, data) => {
      const docFragmentChildren = Array.from(data.content.getChildren());
      let modelRange;
      if (!docFragmentChildren.every(imageUtils.isInlineImageView)) {
        return;
      }
      if (data.targetRanges) {
        modelRange = editor.editing.mapper.toModelRange(data.targetRanges[0]);
      } else {
        modelRange = model.document.selection.getFirstRange();
      }
      const selection = model.createSelection(modelRange);
      if (determineImageTypeForInsertionAtSelection(model.schema, selection) === "imageBlock") {
        const writer = new UpcastWriter(editingView.document);
        const blockViewImages = docFragmentChildren.map((inlineViewImage) => writer.createElement("figure", {
          class: "image"
        }, inlineViewImage));
        data.content = writer.createDocumentFragment(blockViewImages);
      }
    });
    this.listenTo(clipboardPipeline, "contentInsertion", (evt, data) => {
      if (data.method !== "paste") {
        return;
      }
      model.change((writer) => {
        const range = writer.createRangeIn(data.content);
        for (const item of range.getItems()) {
          if (item.is("element", "imageBlock")) {
            imageUtils.setImageNaturalSizeAttributes(item);
          }
        }
      });
    });
  }
}
class ImageInsertFormView extends View {
  /**
  * Creates a view for the dropdown panel of {@link module:image/imageinsert/imageinsertui~ImageInsertUI}.
  *
  * @param locale The localization services instance.
  * @param integrations An integrations object that contains components (or tokens for components) to be shown in the panel view.
  */
  constructor(locale, integrations = []) {
    super(locale);
    /**
    * Tracks information about DOM focus in the form.
    */
    __publicField(this, "focusTracker");
    /**
    * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
    */
    __publicField(this, "keystrokes");
    /**
    * A collection of views that can be focused in the form.
    */
    __publicField(this, "_focusables");
    /**
    * Helps cycling over {@link #_focusables} in the form.
    */
    __publicField(this, "_focusCycler");
    /**
    * A collection of the defined integrations for inserting the images.
    */
    __publicField(this, "children");
    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();
    this._focusables = new ViewCollection();
    this.children = this.createCollection();
    this._focusCycler = new FocusCycler({
      focusables: this._focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        // Navigate form fields backwards using the Shift + Tab keystroke.
        focusPrevious: "shift + tab",
        // Navigate form fields forwards using the Tab key.
        focusNext: "tab"
      }
    });
    for (const view of integrations) {
      this.children.add(view);
      this._focusables.add(view);
      if (view instanceof CollapsibleView) {
        this._focusables.addMany(view.children);
      }
    }
    this.setTemplate({
      tag: "form",
      attributes: {
        class: [
          "ck",
          "ck-image-insert-form"
        ],
        tabindex: -1
      },
      children: this.children
    });
  }
  /**
  * @inheritDoc
  */
  render() {
    super.render();
    submitHandler({
      view: this
    });
    for (const view of this._focusables) {
      this.focusTracker.add(view.element);
    }
    this.keystrokes.listenTo(this.element);
    const stopPropagation = (data) => data.stopPropagation();
    this.keystrokes.set("arrowright", stopPropagation);
    this.keystrokes.set("arrowleft", stopPropagation);
    this.keystrokes.set("arrowup", stopPropagation);
    this.keystrokes.set("arrowdown", stopPropagation);
  }
  /**
  * @inheritDoc
  */
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
    this.keystrokes.destroy();
  }
  /**
  * Focuses the first {@link #_focusables focusable} in the form.
  */
  focus() {
    this._focusCycler.focusFirst();
  }
}
class ImageInsertUI extends Plugin {
  /**
  * @inheritDoc
  */
  constructor(editor) {
    super(editor);
    /**
    * The dropdown view responsible for displaying the image insert UI.
    */
    __publicField(this, "dropdownView");
    /**
    * Registered integrations map.
    */
    __publicField(this, "_integrations", /* @__PURE__ */ new Map());
    editor.config.define("image.insert.integrations", [
      "upload",
      "assetManager",
      "url"
    ]);
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageInsertUI";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageUtils
    ];
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    const imageUtils = editor.plugins.get("ImageUtils");
    this.set("isImageSelected", false);
    this.listenTo(editor.model.document, "change", () => {
      this.isImageSelected = imageUtils.isImage(selection.getSelectedElement());
    });
    const componentCreator = (locale) => this._createToolbarComponent(locale);
    const menuBarComponentCreator = (locale) => this._createMenuBarComponent(locale);
    editor.ui.componentFactory.add("insertImage", componentCreator);
    editor.ui.componentFactory.add("imageInsert", componentCreator);
    editor.ui.componentFactory.add("menuBar:insertImage", menuBarComponentCreator);
  }
  /**
  * Registers the insert image dropdown integration.
  */
  registerIntegration({ name, observable, buttonViewCreator, formViewCreator, menuBarButtonViewCreator, requiresForm = false, override = false }) {
    if (this._integrations.has(name) && !override) {
      logWarning("image-insert-integration-exists", {
        name
      });
    }
    this._integrations.set(name, {
      observable,
      buttonViewCreator,
      menuBarButtonViewCreator,
      formViewCreator,
      requiresForm
    });
  }
  /**
  * Creates the toolbar component.
  */
  _createToolbarComponent(locale) {
    const editor = this.editor;
    const t = locale.t;
    const integrations = this._prepareIntegrations();
    if (!integrations.length) {
      return null;
    }
    let dropdownButton;
    const firstIntegration = integrations[0];
    if (integrations.length == 1) {
      if (!firstIntegration.requiresForm) {
        return firstIntegration.buttonViewCreator(true);
      }
      dropdownButton = firstIntegration.buttonViewCreator(true);
    } else {
      const actionButton = firstIntegration.buttonViewCreator(false);
      dropdownButton = new SplitButtonView(locale, actionButton);
      dropdownButton.tooltip = true;
      dropdownButton.bind("label").to(this, "isImageSelected", (isImageSelected) => isImageSelected ? t("Replace image") : t("Insert image"));
    }
    const dropdownView = this.dropdownView = createDropdown(locale, dropdownButton);
    const observables = integrations.map(({ observable }) => typeof observable == "function" ? observable() : observable);
    dropdownView.bind("isEnabled").toMany(observables, "isEnabled", (...isEnabled) => isEnabled.some((isEnabled2) => isEnabled2));
    dropdownView.once("change:isOpen", () => {
      const integrationViews = integrations.flatMap(({ formViewCreator }) => formViewCreator(integrations.length == 1));
      const imageInsertFormView = new ImageInsertFormView(editor.locale, integrationViews);
      dropdownView.panelView.children.add(imageInsertFormView);
    });
    return dropdownView;
  }
  /**
  * Creates the menu bar component.
  */
  _createMenuBarComponent(locale) {
    const t = locale.t;
    const integrations = this._prepareIntegrations();
    if (!integrations.length) {
      return null;
    }
    const integrationViews = integrations.flatMap(({ menuBarButtonViewCreator }) => menuBarButtonViewCreator(integrations.length == 1));
    const resultView = new MenuBarMenuView(locale);
    const listView = new MenuBarMenuListView(locale);
    resultView.panelView.children.add(listView);
    resultView.buttonView.set({
      icon: icons.image,
      label: t("Image")
    });
    for (const integrationView of integrationViews) {
      const listItemView = new MenuBarMenuListItemView(locale, resultView);
      listItemView.children.add(integrationView);
      listView.items.add(listItemView);
      integrationView.delegate("execute").to(resultView);
    }
    return resultView;
  }
  /**
  * Validates the integrations list.
  */
  _prepareIntegrations() {
    const editor = this.editor;
    const items = editor.config.get("image.insert.integrations");
    const result = [];
    if (!items.length) {
      logWarning("image-insert-integrations-not-specified");
      return result;
    }
    for (const item of items) {
      if (!this._integrations.has(item)) {
        if (![
          "upload",
          "assetManager",
          "url"
        ].includes(item)) {
          logWarning("image-insert-unknown-integration", {
            item
          });
        }
        continue;
      }
      result.push(this._integrations.get(item));
    }
    if (!result.length) {
      logWarning("image-insert-integrations-not-registered");
    }
    return result;
  }
}
class ImageBlock extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageBlockEditing,
      Widget,
      ImageTextAlternative,
      ImageInsertUI
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageBlock";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
}
class ImageInlineEditing extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageEditing,
      ImageSizeAttributes,
      ImageUtils,
      ImagePlaceholder,
      ClipboardPipeline
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageInlineEditing";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const schema = editor.model.schema;
    schema.register("imageInline", {
      inheritAllFrom: "$inlineObject",
      allowAttributes: [
        "alt",
        "src",
        "srcset"
      ],
      // Disallow inline images in captions (at least for now).
      // This is the best spot to do that because independent packages can introduce captions (ImageCaption, TableCaption, etc.).
      disallowIn: [
        "caption"
      ]
    });
    this._setupConversion();
    if (editor.plugins.has("ImageBlockEditing")) {
      editor.commands.add("imageTypeInline", new ImageTypeCommand(this.editor, "imageInline"));
      this._setupClipboardIntegration();
    }
  }
  /**
  * Configures conversion pipelines to support upcasting and downcasting
  * inline images (inline image widgets) and their attributes.
  */
  _setupConversion() {
    const editor = this.editor;
    const t = editor.t;
    const conversion = editor.conversion;
    const imageUtils = editor.plugins.get("ImageUtils");
    conversion.for("dataDowncast").elementToElement({
      model: "imageInline",
      view: (modelElement, { writer }) => writer.createEmptyElement("img")
    });
    conversion.for("editingDowncast").elementToStructure({
      model: "imageInline",
      view: (modelElement, { writer }) => imageUtils.toImageWidget(createInlineImageViewElement(writer), writer, t("image widget"))
    });
    conversion.for("downcast").add(downcastImageAttribute(imageUtils, "imageInline", "src")).add(downcastImageAttribute(imageUtils, "imageInline", "alt")).add(downcastSrcsetAttribute(imageUtils, "imageInline"));
    conversion.for("upcast").elementToElement({
      view: getImgViewElementMatcher(editor, "imageInline"),
      model: (viewImage, { writer }) => writer.createElement("imageInline", viewImage.hasAttribute("src") ? {
        src: viewImage.getAttribute("src")
      } : void 0)
    });
  }
  /**
  * Integrates the plugin with the clipboard pipeline.
  *
  * Idea is that the feature should recognize the user's intent when an **block** image is
  * pasted or dropped. If such an image is pasted/dropped into a non-empty block
  * (e.g. a paragraph with some text) it gets converted into an inline image on the fly.
  *
  * We assume this is the user's intent if they decided to put their image there.
  *
  * **Note**: If a block image has a caption, it will not be converted to an inline image
  * to avoid the confusion. Captions are added on purpose and they should never be lost
  * in the clipboard pipeline.
  *
  * See the `ImageBlockEditing` for the similar integration that works in the opposite direction.
  *
  * The feature also sets image `width` and `height` attributes when pasting.
  */
  _setupClipboardIntegration() {
    const editor = this.editor;
    const model = editor.model;
    const editingView = editor.editing.view;
    const imageUtils = editor.plugins.get("ImageUtils");
    const clipboardPipeline = editor.plugins.get("ClipboardPipeline");
    this.listenTo(clipboardPipeline, "inputTransformation", (evt, data) => {
      const docFragmentChildren = Array.from(data.content.getChildren());
      let modelRange;
      if (!docFragmentChildren.every(imageUtils.isBlockImageView)) {
        return;
      }
      if (data.targetRanges) {
        modelRange = editor.editing.mapper.toModelRange(data.targetRanges[0]);
      } else {
        modelRange = model.document.selection.getFirstRange();
      }
      const selection = model.createSelection(modelRange);
      if (determineImageTypeForInsertionAtSelection(model.schema, selection) === "imageInline") {
        const writer = new UpcastWriter(editingView.document);
        const inlineViewImages = docFragmentChildren.map((blockViewImage) => {
          if (blockViewImage.childCount === 1) {
            Array.from(blockViewImage.getAttributes()).forEach((attribute) => writer.setAttribute(...attribute, imageUtils.findViewImgElement(blockViewImage)));
            return blockViewImage.getChild(0);
          } else {
            return blockViewImage;
          }
        });
        data.content = writer.createDocumentFragment(inlineViewImages);
      }
    });
    this.listenTo(clipboardPipeline, "contentInsertion", (evt, data) => {
      if (data.method !== "paste") {
        return;
      }
      model.change((writer) => {
        const range = writer.createRangeIn(data.content);
        for (const item of range.getItems()) {
          if (item.is("element", "imageInline")) {
            imageUtils.setImageNaturalSizeAttributes(item);
          }
        }
      });
    });
  }
}
class ImageInline extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageInlineEditing,
      Widget,
      ImageTextAlternative,
      ImageInsertUI
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageInline";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
}
class Image extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageBlock,
      ImageInline
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "Image";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
}
function createImageTypeRegExp(types) {
  const regExpSafeNames = types.map((type) => type.replace("+", "\\+"));
  return new RegExp(`^image\\/(${regExpSafeNames.join("|")})$`);
}
function fetchLocalImage(image) {
  return new Promise((resolve2, reject) => {
    const imageSrc = image.getAttribute("src");
    fetch(imageSrc).then((resource) => resource.blob()).then((blob) => {
      const mimeType = getImageMimeType(blob, imageSrc);
      const ext = mimeType.replace("image/", "");
      const filename = `image.${ext}`;
      const file = new File([
        blob
      ], filename, {
        type: mimeType
      });
      resolve2(file);
    }).catch((err) => {
      return err && err.name === "TypeError" ? convertLocalImageOnCanvas(imageSrc).then(resolve2).catch(reject) : reject(err);
    });
  });
}
function isLocalImage(imageUtils, node) {
  if (!imageUtils.isInlineImageView(node) || !node.getAttribute("src")) {
    return false;
  }
  return !!node.getAttribute("src").match(/^data:image\/\w+;base64,/g) || !!node.getAttribute("src").match(/^blob:/g);
}
function getImageMimeType(blob, src) {
  if (blob.type) {
    return blob.type;
  } else if (src.match(/data:(image\/\w+);base64/)) {
    return src.match(/data:(image\/\w+);base64/)[1].toLowerCase();
  } else {
    return "image/jpeg";
  }
}
function convertLocalImageOnCanvas(imageSrc) {
  return getBlobFromCanvas(imageSrc).then((blob) => {
    const mimeType = getImageMimeType(blob, imageSrc);
    const ext = mimeType.replace("image/", "");
    const filename = `image.${ext}`;
    return new File([
      blob
    ], filename, {
      type: mimeType
    });
  });
}
function getBlobFromCanvas(imageSrc) {
  return new Promise((resolve2, reject) => {
    const image = global.document.createElement("img");
    image.addEventListener("load", () => {
      const canvas = global.document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      canvas.toBlob((blob) => blob ? resolve2(blob) : reject());
    });
    image.addEventListener("error", () => reject());
    image.src = imageSrc;
  });
}
class ImageUploadUI extends Plugin {
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageUploadUI";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("uploadImage", () => this._createToolbarButton());
    editor.ui.componentFactory.add("imageUpload", () => this._createToolbarButton());
    editor.ui.componentFactory.add("menuBar:uploadImage", () => this._createMenuBarButton("standalone"));
    if (editor.plugins.has("ImageInsertUI")) {
      editor.plugins.get("ImageInsertUI").registerIntegration({
        name: "upload",
        observable: () => editor.commands.get("uploadImage"),
        buttonViewCreator: () => this._createToolbarButton(),
        formViewCreator: () => this._createDropdownButton(),
        menuBarButtonViewCreator: (isOnly) => this._createMenuBarButton(isOnly ? "insertOnly" : "insertNested")
      });
    }
  }
  /**
  * Creates the base for various kinds of the button component provided by this feature.
  */
  _createButton(ButtonClass) {
    const editor = this.editor;
    const locale = editor.locale;
    const command = editor.commands.get("uploadImage");
    const imageTypes = editor.config.get("image.upload.types");
    const imageTypesRegExp = createImageTypeRegExp(imageTypes);
    const view = new ButtonClass(editor.locale);
    const t = locale.t;
    view.set({
      acceptedType: imageTypes.map((type) => `image/${type}`).join(","),
      allowMultipleFiles: true,
      label: t("Upload from computer"),
      icon: icons.imageUpload
    });
    view.bind("isEnabled").to(command);
    view.on("done", (evt, files) => {
      const imagesToUpload = Array.from(files).filter((file) => imageTypesRegExp.test(file.type));
      if (imagesToUpload.length) {
        editor.execute("uploadImage", {
          file: imagesToUpload
        });
        editor.editing.view.focus();
      }
    });
    return view;
  }
  /**
  * Creates a simple toolbar button, with an icon and a tooltip.
  */
  _createToolbarButton() {
    const t = this.editor.locale.t;
    const imageInsertUI = this.editor.plugins.get("ImageInsertUI");
    const uploadImageCommand = this.editor.commands.get("uploadImage");
    const button = this._createButton(FileDialogButtonView);
    button.tooltip = true;
    button.bind("label").to(imageInsertUI, "isImageSelected", uploadImageCommand, "isAccessAllowed", (isImageSelected, isAccessAllowed) => {
      if (!isAccessAllowed) {
        return t("You have no image upload permissions.");
      }
      return isImageSelected ? t("Replace image from computer") : t("Upload image from computer");
    });
    return button;
  }
  /**
  * Creates a button for the dropdown view, with an icon, text and no tooltip.
  */
  _createDropdownButton() {
    const t = this.editor.locale.t;
    const imageInsertUI = this.editor.plugins.get("ImageInsertUI");
    const button = this._createButton(FileDialogButtonView);
    button.withText = true;
    button.bind("label").to(imageInsertUI, "isImageSelected", (isImageSelected) => isImageSelected ? t("Replace from computer") : t("Upload from computer"));
    button.on("execute", () => {
      imageInsertUI.dropdownView.isOpen = false;
    });
    return button;
  }
  /**
  * Creates a button for the menu bar.
  */
  _createMenuBarButton(type) {
    const t = this.editor.locale.t;
    const button = this._createButton(MenuBarMenuListItemFileDialogButtonView);
    button.withText = true;
    switch (type) {
      case "standalone":
        button.label = t("Image from computer");
        break;
      case "insertOnly":
        button.label = t("Image");
        break;
      case "insertNested":
        button.label = t("From computer");
        break;
    }
    return button;
  }
}
class ImageUploadProgress extends Plugin {
  /**
  * @inheritDoc
  */
  constructor(editor) {
    super(editor);
    /**
    * The image placeholder that is displayed before real image data can be accessed.
    *
    * For the record, this image is a 1x1 px GIF with an aspect ratio set by CSS.
    */
    __publicField(this, "placeholder");
    /**
    * This method is called each time the image `uploadStatus` attribute is changed.
    *
    * @param evt An object containing information about the fired event.
    * @param data Additional information about the change.
    */
    __publicField(this, "uploadStatusChange", (evt, data, conversionApi) => {
      const editor = this.editor;
      const modelImage = data.item;
      const uploadId = modelImage.getAttribute("uploadId");
      if (!conversionApi.consumable.consume(data.item, evt.name)) {
        return;
      }
      const imageUtils = editor.plugins.get("ImageUtils");
      const fileRepository = editor.plugins.get(FileRepository);
      const status = uploadId ? data.attributeNewValue : null;
      const placeholder = this.placeholder;
      const viewFigure = editor.editing.mapper.toViewElement(modelImage);
      const viewWriter = conversionApi.writer;
      if (status == "reading") {
        _startAppearEffect(viewFigure, viewWriter);
        _showPlaceholder(imageUtils, placeholder, viewFigure, viewWriter);
        return;
      }
      if (status == "uploading") {
        const loader = fileRepository.loaders.get(uploadId);
        _startAppearEffect(viewFigure, viewWriter);
        if (!loader) {
          _showPlaceholder(imageUtils, placeholder, viewFigure, viewWriter);
        } else {
          _hidePlaceholder(viewFigure, viewWriter);
          _showProgressBar(viewFigure, viewWriter, loader, editor.editing.view);
          _displayLocalImage(imageUtils, viewFigure, viewWriter, loader);
        }
        return;
      }
      if (status == "complete" && fileRepository.loaders.get(uploadId)) {
        _showCompleteIcon(viewFigure, viewWriter, editor.editing.view);
      }
      _hideProgressBar(viewFigure, viewWriter);
      _hidePlaceholder(viewFigure, viewWriter);
      _stopAppearEffect(viewFigure, viewWriter);
    });
    this.placeholder = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageUploadProgress";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    if (editor.plugins.has("ImageBlockEditing")) {
      editor.editing.downcastDispatcher.on("attribute:uploadStatus:imageBlock", this.uploadStatusChange);
    }
    if (editor.plugins.has("ImageInlineEditing")) {
      editor.editing.downcastDispatcher.on("attribute:uploadStatus:imageInline", this.uploadStatusChange);
    }
  }
}
function _startAppearEffect(viewFigure, writer) {
  if (!viewFigure.hasClass("ck-appear")) {
    writer.addClass("ck-appear", viewFigure);
  }
}
function _stopAppearEffect(viewFigure, writer) {
  writer.removeClass("ck-appear", viewFigure);
}
function _showPlaceholder(imageUtils, placeholder, viewFigure, writer) {
  if (!viewFigure.hasClass("ck-image-upload-placeholder")) {
    writer.addClass("ck-image-upload-placeholder", viewFigure);
  }
  const viewImg = imageUtils.findViewImgElement(viewFigure);
  if (viewImg.getAttribute("src") !== placeholder) {
    writer.setAttribute("src", placeholder, viewImg);
  }
  if (!_getUIElement(viewFigure, "placeholder")) {
    writer.insert(writer.createPositionAfter(viewImg), _createPlaceholder(writer));
  }
}
function _hidePlaceholder(viewFigure, writer) {
  if (viewFigure.hasClass("ck-image-upload-placeholder")) {
    writer.removeClass("ck-image-upload-placeholder", viewFigure);
  }
  _removeUIElement(viewFigure, writer, "placeholder");
}
function _showProgressBar(viewFigure, writer, loader, view) {
  const progressBar = _createProgressBar(writer);
  writer.insert(writer.createPositionAt(viewFigure, "end"), progressBar);
  loader.on("change:uploadedPercent", (evt, name, value) => {
    view.change((writer2) => {
      writer2.setStyle("width", value + "%", progressBar);
    });
  });
}
function _hideProgressBar(viewFigure, writer) {
  _removeUIElement(viewFigure, writer, "progressBar");
}
function _showCompleteIcon(viewFigure, writer, view) {
  const completeIcon = writer.createUIElement("div", {
    class: "ck-image-upload-complete-icon"
  });
  writer.insert(writer.createPositionAt(viewFigure, "end"), completeIcon);
  setTimeout(() => {
    view.change((writer2) => writer2.remove(writer2.createRangeOn(completeIcon)));
  }, 3e3);
}
function _createProgressBar(writer) {
  const progressBar = writer.createUIElement("div", {
    class: "ck-progress-bar"
  });
  writer.setCustomProperty("progressBar", true, progressBar);
  return progressBar;
}
function _createPlaceholder(writer) {
  const placeholder = writer.createUIElement("div", {
    class: "ck-upload-placeholder-loader"
  });
  writer.setCustomProperty("placeholder", true, placeholder);
  return placeholder;
}
function _getUIElement(imageFigure, uniqueProperty) {
  for (const child of imageFigure.getChildren()) {
    if (child.getCustomProperty(uniqueProperty)) {
      return child;
    }
  }
}
function _removeUIElement(viewFigure, writer, uniqueProperty) {
  const element = _getUIElement(viewFigure, uniqueProperty);
  if (element) {
    writer.remove(writer.createRangeOn(element));
  }
}
function _displayLocalImage(imageUtils, viewFigure, writer, loader) {
  if (loader.data) {
    const viewImg = imageUtils.findViewImgElement(viewFigure);
    writer.setAttribute("src", loader.data, viewImg);
  }
}
class UploadImageCommand extends Command {
  /**
  * Creates an instance of the `imageUlpoad` command. When executed, the command upload one of
  * the currently selected image from computer.
  *
  * @param editor The editor instance.
  */
  constructor(editor) {
    super(editor);
    this.set("isAccessAllowed", true);
  }
  /**
  * @inheritDoc
  */
  refresh() {
    const editor = this.editor;
    const imageUtils = editor.plugins.get("ImageUtils");
    const selectedElement = editor.model.document.selection.getSelectedElement();
    this.isEnabled = imageUtils.isImageAllowed() || imageUtils.isImage(selectedElement);
  }
  /**
  * Executes the command.
  *
  * @fires execute
  * @param options Options for the executed command.
  * @param options.file The image file or an array of image files to upload.
  */
  execute(options) {
    const files = toArray(options.file);
    const selection = this.editor.model.document.selection;
    const imageUtils = this.editor.plugins.get("ImageUtils");
    const selectionAttributes = Object.fromEntries(selection.getAttributes());
    files.forEach((file, index) => {
      const selectedElement = selection.getSelectedElement();
      if (index && selectedElement && imageUtils.isImage(selectedElement)) {
        const position = this.editor.model.createPositionAfter(selectedElement);
        this._uploadImage(file, selectionAttributes, position);
      } else {
        this._uploadImage(file, selectionAttributes);
      }
    });
  }
  /**
  * Handles uploading single file.
  */
  _uploadImage(file, attributes, position) {
    const editor = this.editor;
    const fileRepository = editor.plugins.get(FileRepository);
    const loader = fileRepository.createLoader(file);
    const imageUtils = editor.plugins.get("ImageUtils");
    if (!loader) {
      return;
    }
    imageUtils.insertImage({
      ...attributes,
      uploadId: loader.id
    }, position);
  }
}
class ImageUploadEditing extends Plugin {
  /**
  * @inheritDoc
  */
  constructor(editor) {
    super(editor);
    /**
    * An internal mapping of {@link module:upload/filerepository~FileLoader#id file loader UIDs} and
    * model elements during the upload.
    *
    * Model element of the uploaded image can change, for instance, when {@link module:image/image/imagetypecommand~ImageTypeCommand}
    * is executed as a result of adding caption or changing image style. As a result, the upload logic must keep track of the model
    * element (reference) and resolve the upload for the correct model element (instead of the one that landed in the `$graveyard`
    * after image type changed).
    */
    __publicField(this, "_uploadImageElements");
    /**
    * An internal mapping of {@link module:upload/filerepository~FileLoader#id file loader UIDs} and
    * upload responses for handling images dragged during their upload process. When such images are later
    * dropped, their original upload IDs no longer exist in the registry (as the original upload completed).
    * This map preserves the upload responses to properly handle such cases.
    */
    __publicField(this, "_uploadedImages", /* @__PURE__ */ new Map());
    editor.config.define("image", {
      upload: {
        types: [
          "jpeg",
          "png",
          "gif",
          "bmp",
          "webp",
          "tiff"
        ]
      }
    });
    this._uploadImageElements = /* @__PURE__ */ new Map();
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      FileRepository,
      Notification,
      ClipboardPipeline,
      ImageUtils
    ];
  }
  static get pluginName() {
    return "ImageUploadEditing";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const doc = editor.model.document;
    const conversion = editor.conversion;
    const fileRepository = editor.plugins.get(FileRepository);
    const imageUtils = editor.plugins.get("ImageUtils");
    const clipboardPipeline = editor.plugins.get("ClipboardPipeline");
    const imageTypes = createImageTypeRegExp(editor.config.get("image.upload.types"));
    const uploadImageCommand = new UploadImageCommand(editor);
    editor.commands.add("uploadImage", uploadImageCommand);
    editor.commands.add("imageUpload", uploadImageCommand);
    conversion.for("upcast").attributeToAttribute({
      view: {
        name: "img",
        key: "uploadId"
      },
      model: "uploadId"
    }).add((dispatcher) => dispatcher.on("element:img", (evt, data, conversionApi) => {
      if (!conversionApi.consumable.test(data.viewItem, {
        attributes: [
          "data-ck-upload-id"
        ]
      })) {
        return;
      }
      const uploadId = data.viewItem.getAttribute("data-ck-upload-id");
      if (!uploadId) {
        return;
      }
      const [modelElement] = Array.from(data.modelRange.getItems({
        shallow: true
      }));
      const loader = fileRepository.loaders.get(uploadId);
      if (modelElement) {
        conversionApi.writer.setAttribute("uploadId", uploadId, modelElement);
        conversionApi.consumable.consume(data.viewItem, {
          attributes: [
            "data-ck-upload-id"
          ]
        });
        if (loader && loader.data) {
          conversionApi.writer.setAttribute("uploadStatus", loader.status, modelElement);
        }
      }
    }, {
      priority: "low"
    }));
    this.listenTo(editor.editing.view.document, "clipboardInput", (evt, data) => {
      if (isHtmlIncluded(data.dataTransfer)) {
        return;
      }
      const images = Array.from(data.dataTransfer.files).filter((file) => {
        if (!file) {
          return false;
        }
        return imageTypes.test(file.type);
      });
      if (!images.length) {
        return;
      }
      evt.stop();
      editor.model.change((writer) => {
        if (data.targetRanges) {
          writer.setSelection(data.targetRanges.map((viewRange) => editor.editing.mapper.toModelRange(viewRange)));
        }
        editor.execute("uploadImage", {
          file: images
        });
      });
      const uploadImageCommand2 = editor.commands.get("uploadImage");
      if (!uploadImageCommand2.isAccessAllowed) {
        const notification = editor.plugins.get("Notification");
        const t = editor.locale.t;
        notification.showWarning(t("You have no image upload permissions."), {
          namespace: "image"
        });
      }
    });
    this.listenTo(clipboardPipeline, "inputTransformation", (evt, data) => {
      const fetchableImages = Array.from(editor.editing.view.createRangeIn(data.content)).map((value) => value.item).filter((viewElement) => isLocalImage(imageUtils, viewElement) && !viewElement.getAttribute("uploadProcessed")).map((viewElement) => {
        return {
          promise: fetchLocalImage(viewElement),
          imageElement: viewElement
        };
      });
      if (!fetchableImages.length) {
        return;
      }
      const writer = new UpcastWriter(editor.editing.view.document);
      for (const fetchableImage of fetchableImages) {
        writer.setAttribute("uploadProcessed", true, fetchableImage.imageElement);
        const loader = fileRepository.createLoader(fetchableImage.promise);
        if (loader) {
          writer.setAttribute("src", "", fetchableImage.imageElement);
          writer.setAttribute("uploadId", loader.id, fetchableImage.imageElement);
        }
      }
    });
    editor.editing.view.document.on("dragover", (evt, data) => {
      data.preventDefault();
    });
    doc.on("change", () => {
      const changes = doc.differ.getChanges({
        includeChangesInGraveyard: true
      }).reverse();
      const insertedImagesIds = /* @__PURE__ */ new Set();
      for (const entry of changes) {
        if (entry.type == "insert" && entry.name != "$text") {
          const item = entry.position.nodeAfter;
          const isInsertedInGraveyard = entry.position.root.rootName == "$graveyard";
          for (const imageElement of getImagesFromChangeItem(editor, item)) {
            const uploadId = imageElement.getAttribute("uploadId");
            if (!uploadId) {
              continue;
            }
            const loader = fileRepository.loaders.get(uploadId);
            if (!loader) {
              if (!isInsertedInGraveyard && this._uploadedImages.has(uploadId)) {
                editor.model.enqueueChange({
                  isUndoable: false
                }, (writer) => {
                  writer.setAttribute("uploadStatus", "complete", imageElement);
                  this.fire("uploadComplete", {
                    data: this._uploadedImages.get(uploadId),
                    imageElement
                  });
                });
              }
              continue;
            }
            if (isInsertedInGraveyard) {
              if (!insertedImagesIds.has(uploadId)) {
                const allImagesThatShareUploaderInGraveyard = Array.from(this._uploadImageElements.get(uploadId)).every((element) => element.root.rootName == "$graveyard");
                if (allImagesThatShareUploaderInGraveyard) {
                  loader.abort();
                }
              }
            } else {
              insertedImagesIds.add(uploadId);
              if (!this._uploadImageElements.has(uploadId)) {
                this._uploadImageElements.set(uploadId, /* @__PURE__ */ new Set([
                  imageElement
                ]));
              } else {
                this._uploadImageElements.get(uploadId).add(imageElement);
              }
              if (loader.status == "idle") {
                this._readAndUpload(loader);
              }
            }
          }
        }
      }
    });
    this.on("uploadComplete", (evt, { imageElement, data }) => {
      const urls = data.urls ? data.urls : data;
      this.editor.model.change((writer) => {
        writer.setAttribute("src", urls.default, imageElement);
        this._parseAndSetSrcsetAttributeOnImage(urls, imageElement, writer);
        imageUtils.setImageNaturalSizeAttributes(imageElement);
      });
    }, {
      priority: "low"
    });
  }
  /**
  * @inheritDoc
  */
  afterInit() {
    const schema = this.editor.model.schema;
    if (this.editor.plugins.has("ImageBlockEditing")) {
      schema.extend("imageBlock", {
        allowAttributes: [
          "uploadId",
          "uploadStatus"
        ]
      });
      this._registerConverters("imageBlock");
    }
    if (this.editor.plugins.has("ImageInlineEditing")) {
      schema.extend("imageInline", {
        allowAttributes: [
          "uploadId",
          "uploadStatus"
        ]
      });
      this._registerConverters("imageInline");
    }
  }
  /**
  * Reads and uploads an image.
  *
  * The image is read from the disk and as a Base64-encoded string it is set temporarily to
  * `image[src]`. When the image is successfully uploaded, the temporary data is replaced with the target
  * image's URL (the URL to the uploaded image on the server).
  */
  _readAndUpload(loader) {
    const editor = this.editor;
    const model = editor.model;
    const t = editor.locale.t;
    const fileRepository = editor.plugins.get(FileRepository);
    const notification = editor.plugins.get(Notification);
    const imageUtils = editor.plugins.get("ImageUtils");
    const imageUploadElements = this._uploadImageElements;
    model.enqueueChange({
      isUndoable: false
    }, (writer) => {
      const elements = imageUploadElements.get(loader.id);
      for (const element of elements) {
        writer.setAttribute("uploadStatus", "reading", element);
      }
    });
    return loader.read().then(() => {
      const promise = loader.upload();
      if (editor.ui) {
        editor.ui.ariaLiveAnnouncer.announce(t("Uploading image"));
      }
      for (const imageElement of imageUploadElements.get(loader.id)) {
        /* istanbul ignore next -- @preserve */
        if (env.isSafari) {
          const viewFigure = editor.editing.mapper.toViewElement(imageElement);
          const viewImg = imageUtils.findViewImgElement(viewFigure);
          editor.editing.view.once("render", () => {
            if (!viewImg.parent) {
              return;
            }
            const domFigure = editor.editing.view.domConverter.mapViewToDom(viewImg.parent);
            if (!domFigure) {
              return;
            }
            const originalDisplay = domFigure.style.display;
            domFigure.style.display = "none";
            domFigure._ckHack = domFigure.offsetHeight;
            domFigure.style.display = originalDisplay;
          });
        }
        model.enqueueChange({
          isUndoable: false
        }, (writer) => {
          writer.setAttribute("uploadStatus", "uploading", imageElement);
        });
      }
      return promise;
    }).then((data) => {
      model.enqueueChange({
        isUndoable: false
      }, (writer) => {
        for (const imageElement of imageUploadElements.get(loader.id)) {
          writer.setAttribute("uploadStatus", "complete", imageElement);
          this.fire("uploadComplete", {
            data,
            imageElement
          });
        }
        if (editor.ui) {
          editor.ui.ariaLiveAnnouncer.announce(t("Image upload complete"));
        }
        this._uploadedImages.set(loader.id, data);
      });
      clean();
    }).catch((error) => {
      if (editor.ui) {
        editor.ui.ariaLiveAnnouncer.announce(t("Error during image upload"));
      }
      if (loader.status !== "error" && loader.status !== "aborted") {
        throw error;
      }
      if (loader.status == "error" && error) {
        notification.showWarning(error, {
          title: t("Upload failed"),
          namespace: "upload"
        });
      }
      model.enqueueChange({
        isUndoable: false
      }, (writer) => {
        for (const imageElement of imageUploadElements.get(loader.id)) {
          if (imageElement.root.rootName !== "$graveyard") {
            writer.remove(imageElement);
          }
        }
      });
      clean();
    });
    function clean() {
      model.enqueueChange({
        isUndoable: false
      }, (writer) => {
        for (const imageElement of imageUploadElements.get(loader.id)) {
          writer.removeAttribute("uploadId", imageElement);
          writer.removeAttribute("uploadStatus", imageElement);
        }
        imageUploadElements.delete(loader.id);
      });
      fileRepository.destroyLoader(loader);
    }
  }
  /**
  * Creates the `srcset` attribute based on a given file upload response and sets it as an attribute to a specific image element.
  *
  * @param data Data object from which `srcset` will be created.
  * @param image The image element on which the `srcset` attribute will be set.
  */
  _parseAndSetSrcsetAttributeOnImage(data, image, writer) {
    let maxWidth = 0;
    const srcsetAttribute = Object.keys(data).filter((key) => {
      const width = parseInt(key, 10);
      if (!isNaN(width)) {
        maxWidth = Math.max(maxWidth, width);
        return true;
      }
    }).map((key) => `${data[key]} ${key}w`).join(", ");
    if (srcsetAttribute != "") {
      const attributes = {
        srcset: srcsetAttribute
      };
      if (!image.hasAttribute("width") && !image.hasAttribute("height")) {
        attributes.width = maxWidth;
      }
      writer.setAttributes(attributes, image);
    }
  }
  /**
  * Registers image upload converters.
  *
  * @param imageType The type of the image.
  */
  _registerConverters(imageType) {
    const { conversion, plugins } = this.editor;
    const fileRepository = plugins.get(FileRepository);
    const imageUtils = plugins.get(ImageUtils);
    conversion.for("dataDowncast").add((dispatcher) => {
      dispatcher.on(`attribute:uploadId:${imageType}`, (evt, data, conversionApi) => {
        if (!conversionApi.consumable.test(data.item, evt.name)) {
          return;
        }
        const loader = fileRepository.loaders.get(data.attributeNewValue);
        if (!loader || !loader.data) {
          return null;
        }
        const viewElement = conversionApi.mapper.toViewElement(data.item);
        const img = imageUtils.findViewImgElement(viewElement);
        if (img) {
          conversionApi.consumable.consume(data.item, evt.name);
          conversionApi.writer.setAttribute("data-ck-upload-id", loader.id, img);
        }
      });
    });
  }
}
function isHtmlIncluded(dataTransfer) {
  return Array.from(dataTransfer.types).includes("text/html") && dataTransfer.getData("text/html") !== "";
}
function getImagesFromChangeItem(editor, item) {
  const imageUtils = editor.plugins.get("ImageUtils");
  return Array.from(editor.model.createRangeOn(item)).filter((value) => imageUtils.isImage(value.item)).map((value) => value.item);
}
class ImageUpload extends Plugin {
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageUpload";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageUploadEditing,
      ImageUploadUI,
      ImageUploadProgress
    ];
  }
}
class ImageInsertUrlView extends View {
  /**
  * Creates a view for the dropdown panel of {@link module:image/imageinsert/imageinsertui~ImageInsertUI}.
  *
  * @param locale The localization services instance.
  */
  constructor(locale) {
    super(locale);
    /**
    * The URL input field view.
    */
    __publicField(this, "urlInputView");
    /**
    * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
    */
    __publicField(this, "keystrokes");
    this.set("imageURLInputValue", "");
    this.set("isImageSelected", false);
    this.set("isEnabled", true);
    this.keystrokes = new KeystrokeHandler();
    this.urlInputView = this._createUrlInputView();
    this.setTemplate({
      tag: "form",
      attributes: {
        class: [
          "ck",
          "ck-image-insert-url"
        ],
        tabindex: "-1"
      },
      children: [
        this.urlInputView,
        {
          tag: "div",
          attributes: {
            class: [
              "ck",
              "ck-image-insert-url__action-row"
            ]
          }
        }
      ]
    });
  }
  /**
  * @inheritDoc
  */
  render() {
    super.render();
    submitHandler({
      view: this
    });
    this.keystrokes.listenTo(this.element);
  }
  /**
  * @inheritDoc
  */
  destroy() {
    super.destroy();
    this.keystrokes.destroy();
  }
  /**
  * Creates the {@link #urlInputView}.
  */
  _createUrlInputView() {
    const locale = this.locale;
    const t = locale.t;
    const urlInputView = new LabeledFieldView(locale, createLabeledInputText);
    urlInputView.bind("label").to(this, "isImageSelected", (value) => value ? t("Update image URL") : t("Insert image via URL"));
    urlInputView.bind("isEnabled").to(this);
    urlInputView.fieldView.inputMode = "url";
    urlInputView.fieldView.placeholder = "https://example.com/image.png";
    urlInputView.fieldView.bind("value").to(this, "imageURLInputValue", (value) => value || "");
    urlInputView.fieldView.on("input", () => {
      this.imageURLInputValue = urlInputView.fieldView.element.value.trim();
    });
    return urlInputView;
  }
  /**
  * Focuses the view.
  */
  focus() {
    this.urlInputView.focus();
  }
}
class ImageInsertViaUrlUI extends Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "_imageInsertUI");
    __publicField(this, "_formView");
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageInsertViaUrlUI";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageInsertUI,
      Dialog
    ];
  }
  init() {
    this.editor.ui.componentFactory.add("insertImageViaUrl", () => this._createToolbarButton());
    this.editor.ui.componentFactory.add("menuBar:insertImageViaUrl", () => this._createMenuBarButton("standalone"));
  }
  /**
  * @inheritDoc
  */
  afterInit() {
    this._imageInsertUI = this.editor.plugins.get("ImageInsertUI");
    this._imageInsertUI.registerIntegration({
      name: "url",
      observable: () => this.editor.commands.get("insertImage"),
      buttonViewCreator: () => this._createToolbarButton(),
      formViewCreator: () => this._createDropdownButton(),
      menuBarButtonViewCreator: (isOnly) => this._createMenuBarButton(isOnly ? "insertOnly" : "insertNested")
    });
  }
  /**
  * Creates the base for various kinds of the button component provided by this feature.
  */
  _createInsertUrlButton(ButtonClass) {
    const button = new ButtonClass(this.editor.locale);
    button.icon = icons.imageUrl;
    button.on("execute", () => {
      this._showModal();
    });
    return button;
  }
  /**
  * Creates a simple toolbar button, with an icon and a tooltip.
  */
  _createToolbarButton() {
    const t = this.editor.locale.t;
    const button = this._createInsertUrlButton(ButtonView);
    button.tooltip = true;
    button.bind("label").to(this._imageInsertUI, "isImageSelected", (isImageSelected) => isImageSelected ? t("Update image URL") : t("Insert image via URL"));
    return button;
  }
  /**
  * Creates a button for the dropdown view, with an icon, text and no tooltip.
  */
  _createDropdownButton() {
    const t = this.editor.locale.t;
    const button = this._createInsertUrlButton(ButtonView);
    button.withText = true;
    button.bind("label").to(this._imageInsertUI, "isImageSelected", (isImageSelected) => isImageSelected ? t("Update image URL") : t("Insert via URL"));
    return button;
  }
  /**
  * Creates a button for the menu bar.
  */
  _createMenuBarButton(type) {
    const t = this.editor.locale.t;
    const button = this._createInsertUrlButton(MenuBarMenuListItemButtonView);
    button.withText = true;
    switch (type) {
      case "standalone":
        button.label = t("Image via URL");
        break;
      case "insertOnly":
        button.label = t("Image");
        break;
      case "insertNested":
        button.label = t("Via URL");
        break;
    }
    return button;
  }
  /**
  * Creates the form view used to submit the image URL.
  */
  _createInsertUrlView() {
    const editor = this.editor;
    const locale = editor.locale;
    const replaceImageSourceCommand = editor.commands.get("replaceImageSource");
    const insertImageCommand = editor.commands.get("insertImage");
    const imageInsertUrlView = new ImageInsertUrlView(locale);
    imageInsertUrlView.bind("isImageSelected").to(this._imageInsertUI);
    imageInsertUrlView.bind("isEnabled").toMany([
      insertImageCommand,
      replaceImageSourceCommand
    ], "isEnabled", (...isEnabled) => isEnabled.some((isCommandEnabled) => isCommandEnabled));
    return imageInsertUrlView;
  }
  /**
  * Shows the insert image via URL form view in a modal.
  */
  _showModal() {
    const editor = this.editor;
    const locale = editor.locale;
    const t = locale.t;
    const dialog = editor.plugins.get("Dialog");
    if (!this._formView) {
      this._formView = this._createInsertUrlView();
      this._formView.on("submit", () => this._handleSave());
    }
    const replaceImageSourceCommand = editor.commands.get("replaceImageSource");
    this._formView.imageURLInputValue = replaceImageSourceCommand.value || "";
    dialog.show({
      id: "insertImageViaUrl",
      title: this._imageInsertUI.isImageSelected ? t("Update image URL") : t("Insert image via URL"),
      isModal: true,
      content: this._formView,
      actionButtons: [
        {
          label: t("Cancel"),
          withText: true,
          onExecute: () => dialog.hide()
        },
        {
          label: t("Accept"),
          class: "ck-button-action",
          withText: true,
          onExecute: () => this._handleSave()
        }
      ]
    });
  }
  /**
  * Executes appropriate command depending on selection and form value.
  */
  _handleSave() {
    const replaceImageSourceCommand = this.editor.commands.get("replaceImageSource");
    if (replaceImageSourceCommand.isEnabled) {
      this.editor.execute("replaceImageSource", {
        source: this._formView.imageURLInputValue
      });
    } else {
      this.editor.execute("insertImage", {
        source: this._formView.imageURLInputValue
      });
    }
    this.editor.plugins.get("Dialog").hide();
  }
}
class ImageInsertViaUrl extends Plugin {
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageInsertViaUrl";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageInsertViaUrlUI,
      ImageInsertUI
    ];
  }
}
class ImageInsert extends Plugin {
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageInsert";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageUpload,
      ImageInsertViaUrl,
      ImageInsertUI
    ];
  }
}
class ResizeImageCommand extends Command {
  /**
  * @inheritDoc
  */
  refresh() {
    const editor = this.editor;
    const imageUtils = editor.plugins.get("ImageUtils");
    const element = imageUtils.getClosestSelectedImageElement(editor.model.document.selection);
    this.isEnabled = !!element;
    if (!element || !element.hasAttribute("resizedWidth")) {
      this.value = null;
    } else {
      this.value = {
        width: element.getAttribute("resizedWidth"),
        height: null
      };
    }
  }
  /**
  * Executes the command.
  *
  * ```ts
  * // Sets the width to 50%:
  * editor.execute( 'resizeImage', { width: '50%' } );
  *
  * // Removes the width attribute:
  * editor.execute( 'resizeImage', { width: null } );
  * ```
  *
  * @param options
  * @param options.width The new width of the image.
  * @fires execute
  */
  execute(options) {
    const editor = this.editor;
    const model = editor.model;
    const imageUtils = editor.plugins.get("ImageUtils");
    const imageElement = imageUtils.getClosestSelectedImageElement(model.document.selection);
    this.value = {
      width: options.width,
      height: null
    };
    if (imageElement) {
      model.change((writer) => {
        writer.setAttribute("resizedWidth", options.width, imageElement);
        writer.removeAttribute("resizedHeight", imageElement);
        imageUtils.setImageNaturalSizeAttributes(imageElement);
      });
    }
  }
}
class ImageResizeEditing extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageUtils
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageResizeEditing";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  constructor(editor) {
    super(editor);
    editor.config.define("image", {
      resizeUnit: "%",
      resizeOptions: [
        {
          name: "resizeImage:original",
          value: null,
          icon: "original"
        },
        {
          name: "resizeImage:custom",
          value: "custom",
          icon: "custom"
        },
        {
          name: "resizeImage:25",
          value: "25",
          icon: "small"
        },
        {
          name: "resizeImage:50",
          value: "50",
          icon: "medium"
        },
        {
          name: "resizeImage:75",
          value: "75",
          icon: "large"
        }
      ]
    });
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const resizeImageCommand = new ResizeImageCommand(editor);
    this._registerConverters("imageBlock");
    this._registerConverters("imageInline");
    editor.commands.add("resizeImage", resizeImageCommand);
    editor.commands.add("imageResize", resizeImageCommand);
  }
  /**
  * @inheritDoc
  */
  afterInit() {
    this._registerSchema();
  }
  _registerSchema() {
    if (this.editor.plugins.has("ImageBlockEditing")) {
      this.editor.model.schema.extend("imageBlock", {
        allowAttributes: [
          "resizedWidth",
          "resizedHeight"
        ]
      });
    }
    if (this.editor.plugins.has("ImageInlineEditing")) {
      this.editor.model.schema.extend("imageInline", {
        allowAttributes: [
          "resizedWidth",
          "resizedHeight"
        ]
      });
    }
  }
  /**
  * Registers image resize converters.
  *
  * @param imageType The type of the image.
  */
  _registerConverters(imageType) {
    const editor = this.editor;
    const imageUtils = editor.plugins.get("ImageUtils");
    editor.conversion.for("downcast").add((dispatcher) => dispatcher.on(`attribute:resizedWidth:${imageType}`, (evt, data, conversionApi) => {
      if (!conversionApi.consumable.consume(data.item, evt.name)) {
        return;
      }
      const viewWriter = conversionApi.writer;
      const viewImg = conversionApi.mapper.toViewElement(data.item);
      if (data.attributeNewValue !== null) {
        viewWriter.setStyle("width", data.attributeNewValue, viewImg);
        viewWriter.addClass("image_resized", viewImg);
      } else {
        viewWriter.removeStyle("width", viewImg);
        viewWriter.removeClass("image_resized", viewImg);
      }
    }));
    editor.conversion.for("dataDowncast").attributeToAttribute({
      model: {
        name: imageType,
        key: "resizedHeight"
      },
      view: (modelAttributeValue) => ({
        key: "style",
        value: {
          "height": modelAttributeValue
        }
      })
    });
    editor.conversion.for("editingDowncast").add((dispatcher) => dispatcher.on(`attribute:resizedHeight:${imageType}`, (evt, data, conversionApi) => {
      if (!conversionApi.consumable.consume(data.item, evt.name)) {
        return;
      }
      const viewWriter = conversionApi.writer;
      const viewImg = conversionApi.mapper.toViewElement(data.item);
      const target = imageType === "imageInline" ? imageUtils.findViewImgElement(viewImg) : viewImg;
      if (data.attributeNewValue !== null) {
        viewWriter.setStyle("height", data.attributeNewValue, target);
      } else {
        viewWriter.removeStyle("height", target);
      }
    }));
    editor.conversion.for("upcast").attributeToAttribute({
      view: {
        name: imageType === "imageBlock" ? "figure" : "img",
        styles: {
          width: /.+/
        }
      },
      model: {
        key: "resizedWidth",
        value: (viewElement) => {
          if (widthAndHeightStylesAreBothSet(viewElement)) {
            return null;
          }
          return viewElement.getStyle("width");
        }
      }
    });
    editor.conversion.for("upcast").attributeToAttribute({
      view: {
        name: imageType === "imageBlock" ? "figure" : "img",
        styles: {
          height: /.+/
        }
      },
      model: {
        key: "resizedHeight",
        value: (viewElement) => {
          if (widthAndHeightStylesAreBothSet(viewElement)) {
            return null;
          }
          return viewElement.getStyle("height");
        }
      }
    });
  }
}
const RESIZE_ICONS = /* @__PURE__ */ (() => ({
  small: icons.objectSizeSmall,
  medium: icons.objectSizeMedium,
  large: icons.objectSizeLarge,
  custom: icons.objectSizeCustom,
  original: icons.objectSizeFull
}))();
class ImageResizeButtons extends Plugin {
  /**
  * @inheritDoc
  */
  constructor(editor) {
    super(editor);
    /**
    * The resize unit.
    * @default '%'
    */
    __publicField(this, "_resizeUnit");
    this._resizeUnit = editor.config.get("image.resizeUnit");
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageResizeEditing
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageResizeButtons";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const editor = this.editor;
    const options = editor.config.get("image.resizeOptions");
    const command = editor.commands.get("resizeImage");
    this.bind("isEnabled").to(command);
    for (const option of options) {
      this._registerImageResizeButton(option);
    }
    this._registerImageResizeDropdown(options);
  }
  /**
  * A helper function that creates a standalone button component for the plugin.
  *
  * @param resizeOption A model of the resize option.
  */
  _registerImageResizeButton(option) {
    const editor = this.editor;
    const { name, value, icon } = option;
    editor.ui.componentFactory.add(name, (locale) => {
      const button = new ButtonView(locale);
      const command = editor.commands.get("resizeImage");
      const labelText = this._getOptionLabelValue(option, true);
      if (!RESIZE_ICONS[icon]) {
        throw new CKEditorError("imageresizebuttons-missing-icon", editor, option);
      }
      button.set({
        // Use the `label` property for a verbose description (because of ARIA).
        label: labelText,
        icon: RESIZE_ICONS[icon],
        tooltip: labelText,
        isToggleable: true
      });
      button.bind("isEnabled").to(this);
      if (editor.plugins.has("ImageCustomResizeUI") && isCustomImageResizeOption(option)) {
        const customResizeUI = editor.plugins.get("ImageCustomResizeUI");
        this.listenTo(button, "execute", () => {
          customResizeUI._showForm(this._resizeUnit);
        });
      } else {
        const optionValueWithUnit = value ? value + this._resizeUnit : null;
        button.bind("isOn").to(command, "value", getIsOnButtonCallback(optionValueWithUnit));
        this.listenTo(button, "execute", () => {
          editor.execute("resizeImage", {
            width: optionValueWithUnit
          });
        });
      }
      return button;
    });
  }
  /**
  * A helper function that creates a dropdown component for the plugin containing all the resize options defined in
  * the editor configuration.
  *
  * @param options An array of configured options.
  */
  _registerImageResizeDropdown(options) {
    const editor = this.editor;
    const t = editor.t;
    const originalSizeOption = options.find((option) => !option.value);
    const componentCreator = (locale) => {
      const command = editor.commands.get("resizeImage");
      const dropdownView = createDropdown(locale, DropdownButtonView);
      const dropdownButton = dropdownView.buttonView;
      const accessibleLabel = t("Resize image");
      dropdownButton.set({
        tooltip: accessibleLabel,
        commandValue: originalSizeOption.value,
        icon: RESIZE_ICONS.medium,
        isToggleable: true,
        label: this._getOptionLabelValue(originalSizeOption),
        withText: true,
        class: "ck-resize-image-button",
        ariaLabel: accessibleLabel,
        ariaLabelledBy: void 0
      });
      dropdownButton.bind("label").to(command, "value", (commandValue) => {
        if (commandValue && commandValue.width) {
          return commandValue.width;
        } else {
          return this._getOptionLabelValue(originalSizeOption);
        }
      });
      dropdownView.bind("isEnabled").to(this);
      addListToDropdown(dropdownView, () => this._getResizeDropdownListItemDefinitions(options, command), {
        ariaLabel: t("Image resize list"),
        role: "menu"
      });
      this.listenTo(dropdownView, "execute", (evt) => {
        if ("onClick" in evt.source) {
          evt.source.onClick();
        } else {
          editor.execute(evt.source.commandName, {
            width: evt.source.commandValue
          });
          editor.editing.view.focus();
        }
      });
      return dropdownView;
    };
    editor.ui.componentFactory.add("resizeImage", componentCreator);
    editor.ui.componentFactory.add("imageResize", componentCreator);
  }
  /**
  * A helper function for creating an option label value string.
  *
  * @param option A resize option object.
  * @param forTooltip An optional flag for creating a tooltip label.
  * @returns A user-defined label combined from the numeric value and the resize unit or the default label
  * for reset options (`Original`).
  */
  _getOptionLabelValue(option, forTooltip = false) {
    const t = this.editor.t;
    if (option.label) {
      return option.label;
    } else if (forTooltip) {
      if (isCustomImageResizeOption(option)) {
        return t("Custom image size");
      } else if (option.value) {
        return t("Resize image to %0", option.value + this._resizeUnit);
      } else {
        return t("Resize image to the original size");
      }
    } else {
      if (isCustomImageResizeOption(option)) {
        return t("Custom");
      } else if (option.value) {
        return option.value + this._resizeUnit;
      } else {
        return t("Original");
      }
    }
  }
  /**
  * A helper function that parses the resize options and returns list item definitions ready for use in the dropdown.
  *
  * @param options The resize options.
  * @param command The resize image command.
  * @returns Dropdown item definitions.
  */
  _getResizeDropdownListItemDefinitions(options, command) {
    const { editor } = this;
    const itemDefinitions = new Collection();
    const optionsWithSerializedValues = options.map((option) => {
      if (isCustomImageResizeOption(option)) {
        return {
          ...option,
          valueWithUnits: "custom"
        };
      }
      if (!option.value) {
        return {
          ...option,
          valueWithUnits: null
        };
      }
      return {
        ...option,
        valueWithUnits: `${option.value}${this._resizeUnit}`
      };
    });
    for (const option of optionsWithSerializedValues) {
      let definition = null;
      if (editor.plugins.has("ImageCustomResizeUI") && isCustomImageResizeOption(option)) {
        const customResizeUI = editor.plugins.get("ImageCustomResizeUI");
        definition = {
          type: "button",
          model: new Model({
            label: this._getOptionLabelValue(option),
            role: "menuitemradio",
            withText: true,
            icon: null,
            onClick: () => {
              customResizeUI._showForm(this._resizeUnit);
            }
          })
        };
        const allDropdownValues = map$2(optionsWithSerializedValues, "valueWithUnits");
        definition.model.bind("isOn").to(command, "value", getIsOnCustomButtonCallback(allDropdownValues));
      } else {
        definition = {
          type: "button",
          model: new Model({
            commandName: "resizeImage",
            commandValue: option.valueWithUnits,
            label: this._getOptionLabelValue(option),
            role: "menuitemradio",
            withText: true,
            icon: null
          })
        };
        definition.model.bind("isOn").to(command, "value", getIsOnButtonCallback(option.valueWithUnits));
      }
      definition.model.bind("isEnabled").to(command, "isEnabled");
      itemDefinitions.add(definition);
    }
    return itemDefinitions;
  }
}
function isCustomImageResizeOption(option) {
  return option.value === "custom";
}
function getIsOnButtonCallback(value) {
  return (commandValue) => {
    const objectCommandValue = commandValue;
    if (value === null && objectCommandValue === value) {
      return true;
    }
    return objectCommandValue !== null && objectCommandValue.width === value;
  };
}
function getIsOnCustomButtonCallback(allDropdownValues) {
  return (commandValue) => !allDropdownValues.some((dropdownValue) => getIsOnButtonCallback(dropdownValue)(commandValue));
}
const RESIZABLE_IMAGES_CSS_SELECTOR = "figure.image.ck-widget > img,figure.image.ck-widget > picture > img,figure.image.ck-widget > a > img,figure.image.ck-widget > a > picture > img,span.image-inline.ck-widget > img,span.image-inline.ck-widget > picture > img";
const RESIZED_IMAGE_CLASS = "image_resized";
class ImageResizeHandles extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      WidgetResize,
      ImageUtils
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageResizeHandles";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  init() {
    const command = this.editor.commands.get("resizeImage");
    this.bind("isEnabled").to(command);
    this._setupResizerCreator();
  }
  /**
  * Attaches the listeners responsible for creating a resizer for each image, except for images inside the HTML embed preview.
  */
  _setupResizerCreator() {
    const editor = this.editor;
    const editingView = editor.editing.view;
    const imageUtils = editor.plugins.get("ImageUtils");
    editingView.addObserver(ImageLoadObserver);
    this.listenTo(editingView.document, "imageLoaded", (evt, domEvent) => {
      if (!domEvent.target.matches(RESIZABLE_IMAGES_CSS_SELECTOR)) {
        return;
      }
      const domConverter = editor.editing.view.domConverter;
      const imageView = domConverter.domToView(domEvent.target);
      const widgetView = imageUtils.getImageWidgetFromImageView(imageView);
      let resizer = this.editor.plugins.get(WidgetResize).getResizerByViewElement(widgetView);
      if (resizer) {
        resizer.redraw();
        return;
      }
      const mapper = editor.editing.mapper;
      const imageModel = mapper.toModelElement(widgetView);
      resizer = editor.plugins.get(WidgetResize).attachTo({
        unit: editor.config.get("image.resizeUnit"),
        modelElement: imageModel,
        viewElement: widgetView,
        editor,
        getHandleHost(domWidgetElement) {
          return domWidgetElement.querySelector("img");
        },
        getResizeHost() {
          return domConverter.mapViewToDom(mapper.toViewElement(imageModel));
        },
        isCentered() {
          const imageStyle = imageModel.getAttribute("imageStyle");
          return imageStyle == "alignCenter";
        },
        onCommit(newValue) {
          editingView.change((writer) => {
            writer.removeClass(RESIZED_IMAGE_CLASS, widgetView);
          });
          editor.execute("resizeImage", {
            width: newValue
          });
        }
      });
      resizer.on("updateSize", () => {
        if (!widgetView.hasClass(RESIZED_IMAGE_CLASS)) {
          editingView.change((writer) => {
            writer.addClass(RESIZED_IMAGE_CLASS, widgetView);
          });
        }
        const target = imageModel.name === "imageInline" ? imageView : widgetView;
        if (target.getStyle("height")) {
          editingView.change((writer) => {
            writer.removeStyle("height", target);
          });
        }
      });
      resizer.bind("isEnabled").to(this);
    });
  }
}
/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
function tryParseDimensionWithUnit(dimension) {
  if (!dimension) {
    return null;
  }
  const [, rawValue, unit] = dimension.trim().match(/([.,\d]+)(%|px)$/) || [];
  const parsedValue = Number.parseFloat(rawValue);
  if (Number.isNaN(parsedValue)) {
    return null;
  }
  return {
    value: parsedValue,
    unit
  };
}
function tryCastDimensionsToUnit(parentDimensionPx, dimension, targetUnit) {
  if (targetUnit === "px") {
    return {
      value: dimension.value,
      unit: "px"
    };
  }
  return {
    value: dimension.value / parentDimensionPx * 100,
    unit: "%"
  };
}
/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
function getSelectedImageEditorNodes(editor) {
  const { editing } = editor;
  const imageUtils = editor.plugins.get("ImageUtils");
  const imageModelElement = imageUtils.getClosestSelectedImageElement(editor.model.document.selection);
  if (!imageModelElement) {
    return null;
  }
  const imageViewElement = editing.mapper.toViewElement(imageModelElement);
  const imageDOMElement = editing.view.domConverter.mapViewToDom(imageViewElement);
  return {
    model: imageModelElement,
    view: imageViewElement,
    dom: imageDOMElement
  };
}
function getSelectedImageWidthInUnits(editor, targetUnit) {
  const imageNodes = getSelectedImageEditorNodes(editor);
  if (!imageNodes) {
    return null;
  }
  const parsedResizedWidth = tryParseDimensionWithUnit(imageNodes.model.getAttribute("resizedWidth") || null);
  if (!parsedResizedWidth) {
    return null;
  }
  if (parsedResizedWidth.unit === targetUnit) {
    return parsedResizedWidth;
  }
  const imageParentWidthPx = calculateResizeHostAncestorWidth(imageNodes.dom);
  const imageHolderDimension = {
    value: new Rect(imageNodes.dom).width
  };
  return tryCastDimensionsToUnit(imageParentWidthPx, imageHolderDimension, targetUnit);
}
class ImageCustomResizeFormView extends View {
  /**
  * @inheritDoc
  */
  constructor(locale, unit, validators) {
    super(locale);
    /**
    * Tracks information about the DOM focus in the form.
    */
    __publicField(this, "focusTracker");
    /**
    * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
    */
    __publicField(this, "keystrokes");
    /**
    * Resize unit shortcut.
    */
    __publicField(this, "unit");
    /**
    * An input with a label.
    */
    __publicField(this, "labeledInput");
    /**
    * A button used to submit the form.
    */
    __publicField(this, "saveButtonView");
    /**
    * A button used to cancel the form.
    */
    __publicField(this, "cancelButtonView");
    /**
    * A collection of views which can be focused in the form.
    */
    __publicField(this, "_focusables");
    /**
    * Helps cycling over {@link #_focusables} in the form.
    */
    __publicField(this, "_focusCycler");
    /**
    * An array of form validators used by {@link #isValid}.
    */
    __publicField(this, "_validators");
    const t = this.locale.t;
    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();
    this.unit = unit;
    this.labeledInput = this._createLabeledInputView();
    this.saveButtonView = this._createButton(t("Save"), icons.check, "ck-button-save");
    this.saveButtonView.type = "submit";
    this.cancelButtonView = this._createButton(t("Cancel"), icons.cancel, "ck-button-cancel", "cancel");
    this._focusables = new ViewCollection();
    this._validators = validators;
    this._focusCycler = new FocusCycler({
      focusables: this._focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        // Navigate form fields backwards using the Shift + Tab keystroke.
        focusPrevious: "shift + tab",
        // Navigate form fields forwards using the Tab key.
        focusNext: "tab"
      }
    });
    this.setTemplate({
      tag: "form",
      attributes: {
        class: [
          "ck",
          "ck-image-custom-resize-form",
          "ck-responsive-form"
        ],
        // https://github.com/ckeditor/ckeditor5-image/issues/40
        tabindex: "-1"
      },
      children: [
        this.labeledInput,
        this.saveButtonView,
        this.cancelButtonView
      ]
    });
  }
  /**
  * @inheritDoc
  */
  render() {
    super.render();
    this.keystrokes.listenTo(this.element);
    submitHandler({
      view: this
    });
    [
      this.labeledInput,
      this.saveButtonView,
      this.cancelButtonView
    ].forEach((v) => {
      this._focusables.add(v);
      this.focusTracker.add(v.element);
    });
  }
  /**
  * @inheritDoc
  */
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
    this.keystrokes.destroy();
  }
  /**
  * Creates the button view.
  *
  * @param label The button label
  * @param icon The button's icon.
  * @param className The additional button CSS class name.
  * @param eventName The event name that the ButtonView#execute event will be delegated to.
  * @returns The button view instance.
  */
  _createButton(label, icon, className, eventName) {
    const button = new ButtonView(this.locale);
    button.set({
      label,
      icon,
      tooltip: true
    });
    button.extendTemplate({
      attributes: {
        class: className
      }
    });
    if (eventName) {
      button.delegate("execute").to(this, eventName);
    }
    return button;
  }
  /**
  * Creates an input with a label.
  *
  * @returns Labeled field view instance.
  */
  _createLabeledInputView() {
    const t = this.locale.t;
    const labeledInput = new LabeledFieldView(this.locale, createLabeledInputNumber);
    labeledInput.label = t("Resize image (in %0)", this.unit);
    labeledInput.fieldView.set({
      step: 0.1
    });
    return labeledInput;
  }
  /**
  * Validates the form and returns `false` when some fields are invalid.
  */
  isValid() {
    this.resetFormStatus();
    for (const validator of this._validators) {
      const errorText = validator(this);
      if (errorText) {
        this.labeledInput.errorText = errorText;
        return false;
      }
    }
    return true;
  }
  /**
  * Cleans up the supplementary error and information text of the {@link #labeledInput}
  * bringing them back to the state when the form has been displayed for the first time.
  *
  * See {@link #isValid}.
  */
  resetFormStatus() {
    this.labeledInput.errorText = null;
  }
  /**
  * The native DOM `value` of the input element of {@link #labeledInput}.
  */
  get rawSize() {
    const { element } = this.labeledInput.fieldView;
    if (!element) {
      return null;
    }
    return element.value;
  }
  /**
  * Get numeric value of size. Returns `null` if value of size input element in {@link #labeledInput}.is not a number.
  */
  get parsedSize() {
    const { rawSize } = this;
    if (rawSize === null) {
      return null;
    }
    const parsed = Number.parseFloat(rawSize);
    if (Number.isNaN(parsed)) {
      return null;
    }
    return parsed;
  }
  /**
  * Returns serialized image input size with unit.
  * Returns `null` if value of size input element in {@link #labeledInput}.is not a number.
  */
  get sizeWithUnits() {
    const { parsedSize, unit } = this;
    if (parsedSize === null) {
      return null;
    }
    return `${parsedSize}${unit}`;
  }
}
function getSelectedImagePossibleResizeRange(editor, targetUnit) {
  const imageNodes = getSelectedImageEditorNodes(editor);
  if (!imageNodes) {
    return null;
  }
  const imageParentWidthPx = calculateResizeHostAncestorWidth(imageNodes.dom);
  const minimumImageWidth = tryParseDimensionWithUnit(window.getComputedStyle(imageNodes.dom).minWidth) || {
    value: 1
  };
  const lower = Math.max(0.1, tryCastDimensionsToUnit(imageParentWidthPx, minimumImageWidth, targetUnit).value);
  const upper = targetUnit === "px" ? imageParentWidthPx : 100;
  return {
    unit: targetUnit,
    lower,
    upper
  };
}
class ImageCustomResizeUI extends Plugin {
  constructor() {
    super(...arguments);
    /**
    * The contextual balloon plugin instance.
    */
    __publicField(this, "_balloon");
    /**
    * A form containing a textarea and buttons, used to change the `alt` text value.
    */
    __publicField(this, "_form");
  }
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ContextualBalloon
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageCustomResizeUI";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
  /**
  * @inheritDoc
  */
  destroy() {
    super.destroy();
    if (this._form) {
      this._form.destroy();
    }
  }
  /**
  * Creates the {@link module:image/imageresize/ui/imagecustomresizeformview~ImageCustomResizeFormView}
  * form.
  */
  _createForm(unit) {
    const editor = this.editor;
    this._balloon = this.editor.plugins.get("ContextualBalloon");
    this._form = new (CssTransitionDisablerMixin(ImageCustomResizeFormView))(editor.locale, unit, getFormValidators(editor));
    this._form.render();
    this.listenTo(this._form, "submit", () => {
      if (this._form.isValid()) {
        editor.execute("resizeImage", {
          width: this._form.sizeWithUnits
        });
        this._hideForm(true);
      }
    });
    this.listenTo(this._form.labeledInput, "change:errorText", () => {
      editor.ui.update();
    });
    this.listenTo(this._form, "cancel", () => {
      this._hideForm(true);
    });
    this._form.keystrokes.set("Esc", (data, cancel) => {
      this._hideForm(true);
      cancel();
    });
    clickOutsideHandler({
      emitter: this._form,
      activator: () => this._isVisible,
      contextElements: () => [
        this._balloon.view.element
      ],
      callback: () => this._hideForm()
    });
  }
  /**
  * Shows the {@link #_form} in the {@link #_balloon}.
  *
  * @internal
  */
  _showForm(unit) {
    if (this._isVisible) {
      return;
    }
    if (!this._form) {
      this._createForm(unit);
    }
    const editor = this.editor;
    const labeledInput = this._form.labeledInput;
    this._form.disableCssTransitions();
    this._form.resetFormStatus();
    if (!this._isInBalloon) {
      this._balloon.add({
        view: this._form,
        position: getBalloonPositionData(editor)
      });
    }
    const currentParsedWidth = getSelectedImageWidthInUnits(editor, unit);
    const initialInputValue = currentParsedWidth ? currentParsedWidth.value.toFixed(1) : "";
    const possibleRange = getSelectedImagePossibleResizeRange(editor, unit);
    labeledInput.fieldView.value = labeledInput.fieldView.element.value = initialInputValue;
    if (possibleRange) {
      Object.assign(labeledInput.fieldView, {
        min: possibleRange.lower.toFixed(1),
        max: Math.ceil(possibleRange.upper).toFixed(1)
      });
    }
    this._form.labeledInput.fieldView.select();
    this._form.enableCssTransitions();
  }
  /**
  * Removes the {@link #_form} from the {@link #_balloon}.
  *
  * @param focusEditable Controls whether the editing view is focused afterwards.
  */
  _hideForm(focusEditable = false) {
    if (!this._isInBalloon) {
      return;
    }
    if (this._form.focusTracker.isFocused) {
      this._form.saveButtonView.focus();
    }
    this._balloon.remove(this._form);
    if (focusEditable) {
      this.editor.editing.view.focus();
    }
  }
  /**
  * Returns `true` when the {@link #_form} is the visible view in the {@link #_balloon}.
  */
  get _isVisible() {
    return !!this._balloon && this._balloon.visibleView === this._form;
  }
  /**
  * Returns `true` when the {@link #_form} is in the {@link #_balloon}.
  */
  get _isInBalloon() {
    return !!this._balloon && this._balloon.hasView(this._form);
  }
}
function getFormValidators(editor) {
  const t = editor.t;
  return [
    (form) => {
      if (form.rawSize.trim() === "") {
        return t("The value must not be empty.");
      }
      if (form.parsedSize === null) {
        return t("The value should be a plain number.");
      }
    }
  ];
}
class ImageResize extends Plugin {
  /**
  * @inheritDoc
  */
  static get requires() {
    return [
      ImageResizeEditing,
      ImageResizeHandles,
      ImageCustomResizeUI,
      ImageResizeButtons
    ];
  }
  /**
  * @inheritDoc
  */
  static get pluginName() {
    return "ImageResize";
  }
  /**
  * @inheritDoc
  */
  static get isOfficialPlugin() {
    return true;
  }
}
const _sfc_main$h = {
  __name: "Editor",
  props: /* @__PURE__ */ mergeModels({
    uploadUrl: { type: String }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const model = useModel(__props, "modelValue");
    const props = __props;
    const colors2 = {
      colors: [
        {
          color: "black",
          label: "Black"
        },
        {
          color: "gray",
          label: "Gray"
        },
        {
          color: "silver",
          label: "Silver"
        },
        {
          color: "white",
          label: "White"
        },
        {
          color: "red",
          label: "Red"
        },
        {
          color: "green",
          label: "Green"
        },
        {
          color: "blue",
          label: "Blue"
        },
        {
          color: "yellow",
          label: "Yellow"
        },
        {
          color: "orange",
          label: "Orange"
        },
        {
          color: "purple",
          label: "Purple"
        },
        {
          color: "brown",
          label: "Brown"
        }
      ],
      columns: 7
    };
    const config = computed(() => {
      return {
        licenseKey: "GPL",
        codeBlock: {
          languages: [
            { language: "plaintext", label: "Plain text" },
            { language: "html", label: "HTML" },
            { language: "css", label: "CSS" },
            { language: "javascript", label: "JavaScript" },
            { language: "php", label: "PHP" }
          ]
        },
        fontColor: colors2,
        fontBackgroundColor: colors2,
        image: {
          insert: {
            integrations: ["upload"]
          }
        },
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Underline,
          FontSize,
          FontColor,
          FontBackgroundColor,
          Alignment,
          List,
          Link,
          AutoLink,
          CodeBlock,
          Image,
          ImageInsert,
          ImageResize,
          SimpleUploadAdapter
        ],
        simpleUpload: {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
          },
          uploadUrl: props.uploadUrl,
          withCredentials: true
        },
        toolbar: [
          "undo",
          "redo",
          "|",
          "fontSize",
          "alignment",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "numberedList",
          "bulletedList",
          "|",
          "link",
          "|",
          "codeBlock",
          "insertImage"
        ]
      };
    });
    const __returned__ = { model, props, colors: colors2, config, computed, get ClassicEditor() {
      return ClassicEditor;
    }, get Essentials() {
      return Essentials;
    }, get Paragraph() {
      return Paragraph;
    }, get Bold() {
      return Bold;
    }, get Italic() {
      return Italic;
    }, get Underline() {
      return Underline;
    }, get FontSize() {
      return FontSize;
    }, get FontColor() {
      return FontColor;
    }, get FontBackgroundColor() {
      return FontBackgroundColor;
    }, get Alignment() {
      return Alignment;
    }, get List() {
      return List;
    }, get AutoLink() {
      return AutoLink;
    }, get Link() {
      return Link;
    }, get CodeBlock() {
      return CodeBlock;
    }, get Image() {
      return Image;
    }, get ImageInsert() {
      return ImageInsert;
    }, get ImageResize() {
      return ImageResize;
    }, get SimpleUploadAdapter() {
      return SimpleUploadAdapter;
    }, get Ckeditor() {
      return _sfc_main$q;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["Ckeditor"], {
    modelValue: $setup.model,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.model = $event),
    editor: $setup.ClassicEditor,
    config: $setup.config
  }, null, 8, ["modelValue", "editor", "config"]);
}
const Editor = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Common/Editor.vue"]]);
const uploadFile = {
  data() {
    return {
      uploadUrl: "/admin/api/content-block/uploadFile"
    };
  },
  methods: {
    uploadFiles(filesToUpload) {
      const formData = new FormData();
      formData.append("upload", filesToUpload[0]);
      axios.post(this.uploadUrl, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => {
        const { url, fileName } = response.data;
        this.contentblock.content += `<p><a target="_blank" href="${url}">${fileName}</a></p>`;
      });
    }
  }
};
const _sfc_main$g = {
  name: "ContentBlockEditComponent",
  components: {
    Editor
  },
  mixins: [uploadFile],
  data: () => ({
    editor: null,
    contentblockId: null,
    contentblock: {
      title: null,
      content: null,
      is_active: false
    },
    contentEditing: "",
    application: [
      { "value": "connect", "label": "Connect" },
      { "value": "memberforms", "label": "Memberforms Portal" },
      { "value": "public", "label": "Public" }
    ],
    priorityList: [
      { "value": "normal", "label": "Normal" },
      { "value": "low", "label": "Low" },
      { "value": "medium", "label": "Medium" },
      { "value": "high", "label": "High" }
    ],
    isSelecting: false,
    files: []
  }),
  watch: {
    files(val) {
      this.previousFiles = val;
    }
  },
  mounted() {
    this.getContentBlock(this.$route.params.id);
  },
  methods: {
    getContentBlock(contentblockId) {
      this.loading = true;
      axios.get("/admin/api/content-block/" + contentblockId).then((response) => {
        this.contentblockId = response.data.id;
        this.contentblock = response.data;
        if (response.data.is_active == 1) {
          this.contentblock.is_active = true;
        } else {
          this.contentblock.is_active = false;
        }
        this.contentEditing = response.data.content;
      }).finally(() => {
        this.loading = false;
      });
    },
    editContentBlock() {
      axios.put("/admin/api/content-block/" + this.contentblockId, {
        contentblockId: this.contentblockId,
        contentblock: this.contentblock
      }).then((response) => {
        this.$router.replace({ name: "contentBlockList" });
      }).catch((error) => {
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    },
    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener("focus", () => {
        this.isSelecting = false;
      }, { once: true });
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.push(selectedFiles[i]);
      }
      this.uploadFiles(e.target.files);
    }
  }
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = resolveComponent("Editor");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "6"
          }, {
            default: withCtx(() => [
              createVNode(VSelect, {
                items: _ctx.application,
                label: "Application",
                "item-value": "value",
                "item-title": "label",
                modelValue: _ctx.contentblock.application,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.contentblock.application = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"])
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
                items: _ctx.priorityList,
                label: "Priority",
                "item-value": "value",
                "item-title": "label",
                modelValue: _ctx.contentblock.priority,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.contentblock.priority = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"])
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
              createVNode(VTextField, {
                class: "textFieldHeader",
                modelValue: _ctx.contentblock.title,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.contentblock.title = $event),
                label: "Title",
                variant: "underlined"
              }, null, 8, ["modelValue"]),
              createVNode(_component_Editor, {
                modelValue: _ctx.contentblock.content,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.contentblock.content = $event),
                "upload-url": _ctx.uploadUrl
              }, null, 8, ["modelValue", "upload-url"])
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
              createVNode(VBtn, {
                color: "primary",
                rounded: "",
                loading: _ctx.isSelecting,
                onClick: $options.handleFileImport
              }, {
                default: withCtx(() => _cache[6] || (_cache[6] = [
                  createTextVNode(" Upload PDF ")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["loading", "onClick"]),
              createBaseVNode(
                "input",
                {
                  ref: "uploader",
                  class: "d-none",
                  type: "file",
                  accept: "application/pdf",
                  onChange: _cache[4] || (_cache[4] = (...args) => $options.onFileChanged && $options.onFileChanged(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
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
          createVNode(VCol, {
            cols: "10",
            class: "switches"
          }, {
            default: withCtx(() => [
              createVNode(VSwitch, {
                label: "published",
                modelValue: _ctx.contentblock.is_active,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.contentblock.is_active = $event)
              }, null, 8, ["modelValue"])
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
                to: { name: "contentBlockList" }
              }, {
                default: withCtx(() => _cache[7] || (_cache[7] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: $options.editContentBlock
              }, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode("Save Changes")
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
  });
}
const ContentBlockEditComponent = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-34d9bad3"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Edit/ContentBlockEditComponent.vue"]]);
const _sfc_main$f = {
  name: "AuthorizationManagerComponent",
  props: {
    entityTypes: null,
    roles: null,
    authorizations: null,
    error: false,
    errorMessages: []
  },
  data: () => ({
    loading: false,
    headers: [
      { title: "Order", value: "order" },
      { title: "Authorization To", value: "entityTypeId" },
      { title: "Name", value: "entityId" },
      { title: "Role", value: "role" },
      { title: "Inherit", value: "inherit" },
      { title: "Child Count", value: "childCount" },
      { title: "Delete", value: "delete" }
    ],
    authorizationRemoveModal: false,
    authorizationRemoveTarget: -1,
    authorizationAddModal: false,
    authorizationGlobalConfirmModal: false,
    isGlobal: true,
    addAuth: {
      loading: false,
      searchText: null,
      entities: [],
      entityTypeId: null,
      entityTypeName: null,
      entity: null,
      role: null,
      inherit: false,
      childCount: 0
    },
    noEntityError: false,
    noRoleError: false
  }),
  watch: {
    authorizations: {
      handler(auths) {
        let self = this;
        self.isGlobal = true;
        auths.forEach(function(auth) {
          if (auth.entityId == 0) {
            self.isGlobal = false;
          }
          if (!auth.childCount && auth.entityTypeId == 0) {
            self.getAffiliateChildCount(auth, auth.entityId);
          }
        });
      }
    },
    "addAuth.searchText": {
      handler(value) {
        this.noEntityError = false;
        this.affiliateSearch(value);
      }
    },
    "addAuth.role": {
      handler(value) {
        this.noRoleError = false;
      }
    },
    "addAuth": {
      handler(auth) {
        if (auth.entity && !auth.childCount) {
          console.log(auth);
          this.getAffiliateChildCount(auth, auth.entity.AffiliateId);
        }
      },
      deep: true
    }
  },
  methods: {
    closeGlobalConfirmBox() {
      this.authorizationGlobalConfirmModal = false;
    },
    openGlobalConfirmBox() {
      this.authorizationGlobalConfirmModal = true;
    },
    authorizationRemoveShow(item) {
      this.authorizationRemoveTarget = this.authorizations.indexOf(item);
      this.authorizationRemoveModal = true;
    },
    authorizationRemoveCancel() {
      this.authorizationRemoveModal = false;
      this.authorizationRemoveTarget = -1;
    },
    authorizationRemove() {
      this.authorizationRemoveModal = false;
      if (this.authorizationRemoveTarget > -1) {
        this.authorizations.splice(this.authorizationRemoveTarget, 1);
      }
      this.authorizationRemoveTarget = -1;
      let index = 0;
      this.authorizations.forEach(function(item) {
        item.order = index++;
      });
    },
    authorizationAddCancel() {
      this.authorizationAddModal = false;
    },
    authorizationGlobalAdd() {
      this.authorizations.push({
        order: -1,
        entityTypeId: 0,
        entityTypeName: this.entityTypes[0].type,
        entityId: 0,
        entity: { display_name: "Global Access" },
        role: { id: 3, name: "Super Admin" },
        inherit: true,
        childCount: 0
      });
      let index = 0;
      this.authorizations.forEach(function(item) {
        item.order = index++;
      });
      this.authorizationAddModal = false;
      this.authorizationGlobalConfirmModal = false;
      this.addAuth = {
        loading: false,
        searchText: null,
        entities: null,
        entityTypeId: 1,
        entityTypeName: null,
        entity: null,
        role: null,
        inherit: false,
        childCount: 0
      };
    },
    authorizationAdd() {
      if (!this.addAuth.entity) {
        this.noEntityError = true;
      }
      if (!this.addAuth.role) {
        this.noRoleError = true;
      }
      if (this.noEntityError || this.noRoleError) {
        return;
      }
      this.authorizations.push({
        order: -1,
        entityTypeId: this.addAuth.entityTypeId,
        entityTypeName: this.entityTypes[this.addAuth.entityTypeId].type,
        entityId: this.addAuth.entity.AffiliateId,
        entity: this.addAuth.entity,
        role: this.addAuth.role,
        inherit: this.addAuth.inherit,
        childCount: this.addAuth.childCount
      });
      let index = 0;
      this.authorizations.forEach(function(item) {
        item.order = index++;
      });
      this.authorizationAddModal = false;
      this.addAuth = {
        loading: false,
        searchText: null,
        entities: null,
        entityTypeId: null,
        entityTypeName: null,
        entity: null,
        role: null,
        inherit: false,
        childCount: 0
      };
    },
    affiliateSearch: debounce$1(function(search) {
      if (!search) {
        return;
      }
      if (this.addAuth.entity && this.addAuth.entity.display_name && this.addAuth.entity.display_name === search) {
        return;
      }
      this.addAuth.loading = true;
      axios.post("/admin/api/affiliate/search", { search }).then((response) => {
        this.addAuth.entities = response.data.data;
      }).finally(() => {
        this.addAuth.loading = false;
      });
    }, 500),
    getAffiliateChildCount(dest, affiliateId) {
      axios.post("/admin/api/affiliate/childCount", { parentId: affiliateId }).then((response) => {
        dest.childCount = response.data;
      }).finally(() => {
      });
    }
  }
};
const _hoisted_1$7 = { key: 0 };
const _hoisted_2$2 = { key: 0 };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode(VDataTable, {
      loading: _ctx.loading,
      headers: _ctx.headers,
      items: $props.authorizations,
      "item-key": $props.authorizations.order,
      "disable-sort": "",
      "hide-default-footer": "",
      class: "elevation-1",
      "no-data-text": "No Authorizations"
    }, {
      "item.entityTypeId": withCtx(({ item }) => [
        createTextVNode(
          toDisplayString($props.entityTypes[item.entityTypeId].info.label),
          1
          /* TEXT */
        )
      ]),
      "item.entityId": withCtx(({ item }) => [
        item.entity ? (openBlock(), createElementBlock(
          "span",
          _hoisted_1$7,
          toDisplayString(item.entity.display_name),
          1
          /* TEXT */
        )) : createCommentVNode("v-if", true)
      ]),
      "item.role": withCtx(({ item }) => [
        createTextVNode(
          toDisplayString(item.role.name),
          1
          /* TEXT */
        )
      ]),
      "item.inherit": withCtx(({ item }) => [
        createVNode(VCheckboxBtn, {
          modelValue: item.inherit,
          "onUpdate:modelValue": ($event) => item.inherit = $event,
          disabled: ""
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      "item.delete": withCtx(({ item }) => [
        createVNode(VBtn, {
          icon: "mdi:mdi-delete",
          color: "red",
          variant: "text",
          onClick: ($event) => $options.authorizationRemoveShow(item)
        }, null, 8, ["onClick"])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["loading", "headers", "items", "item-key"]),
    $props.error ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($props.errorMessages, (error) => {
          return openBlock(), createBlock(
            VAlert,
            {
              key: error.id,
              density: "compact",
              type: "error"
            },
            {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(error),
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
    ])) : createCommentVNode("v-if", true),
    createVNode(VDialog, {
      modelValue: _ctx.authorizationRemoveModal,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.authorizationRemoveModal = $event),
      persistent: "",
      "max-width": "400px"
    }, {
      default: withCtx(() => [
        createVNode(VCard, null, {
          default: withCtx(() => [
            createVNode(VCardTitle, { class: "text-h5" }, {
              default: withCtx(() => _cache[8] || (_cache[8] = [
                createTextVNode("Delete Authorization?")
              ])),
              _: 1
              /* STABLE */
            }),
            createVNode(VCardText, null, {
              default: withCtx(() => _cache[9] || (_cache[9] = [
                createTextVNode("Are you sure you want to remove this authorization?")
              ])),
              _: 1
              /* STABLE */
            }),
            createVNode(VCardActions, null, {
              default: withCtx(() => [
                createVNode(VSpacer),
                createVNode(VBtn, {
                  color: "green darken",
                  onClick: $options.authorizationRemoveCancel
                }, {
                  default: withCtx(() => _cache[10] || (_cache[10] = [
                    createTextVNode("Cancel")
                  ])),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"]),
                createVNode(VBtn, {
                  color: "red darken",
                  onClick: $options.authorizationRemove
                }, {
                  default: withCtx(() => _cache[11] || (_cache[11] = [
                    createTextVNode("Remove Authorization")
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
    createVNode(VDialog, {
      modelValue: _ctx.authorizationAddModal,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.authorizationAddModal = $event),
      persistent: "",
      "max-width": "600px"
    }, {
      activator: withCtx(({ props }) => [
        createVNode(
          VBtn,
          mergeProps({
            class: "mt-4",
            color: "primary"
          }, props),
          {
            default: withCtx(() => _cache[12] || (_cache[12] = [
              createTextVNode("Add Authorization")
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
            createVNode(VCardTitle, null, {
              default: withCtx(() => _cache[13] || (_cache[13] = [
                createBaseVNode(
                  "span",
                  { class: "text-h5" },
                  "Add Authorization",
                  -1
                  /* HOISTED */
                )
              ])),
              _: 1
              /* STABLE */
            }),
            createVNode(VCardText, null, {
              default: withCtx(() => [
                createVNode(VForm, null, {
                  default: withCtx(() => [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                _cache[14] || (_cache[14] = createBaseVNode(
                                  "p",
                                  null,
                                  "Authorization Type",
                                  -1
                                  /* HOISTED */
                                )),
                                createVNode(VRadioGroup, {
                                  modelValue: _ctx.addAuth.entityTypeId,
                                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.addAuth.entityTypeId = $event),
                                  mandatory: true
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createElementBlock(
                                      Fragment,
                                      null,
                                      renderList($props.entityTypes, (entity, index) => {
                                        return openBlock(), createBlock(VRadio, {
                                          label: entity.info.label,
                                          key: index,
                                          disabled: entity.disabled
                                        }, null, 8, ["label", "disabled"]);
                                      }),
                                      128
                                      /* KEYED_FRAGMENT */
                                    ))
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["modelValue"])
                              ]),
                              _: 1
                              /* STABLE */
                            }),
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VAutocomplete, {
                                  loading: _ctx.addAuth.loading,
                                  modelValue: _ctx.addAuth.entity,
                                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.addAuth.entity = $event),
                                  search: _ctx.addAuth.searchText,
                                  "onUpdate:search": _cache[3] || (_cache[3] = ($event) => _ctx.addAuth.searchText = $event),
                                  "item-value": "AffiliateId",
                                  "item-title": "display_name",
                                  items: _ctx.addAuth.entities,
                                  label: "Authorization Target",
                                  variant: "underlined",
                                  "return-object": "",
                                  "no-data-text": "Enter text to search...",
                                  error: _ctx.noEntityError,
                                  required: ""
                                }, null, 8, ["loading", "modelValue", "search", "items", "error"])
                              ]),
                              _: 1
                              /* STABLE */
                            }),
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VSelect, {
                                  modelValue: _ctx.addAuth.role,
                                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.addAuth.role = $event),
                                  "item-value": "id",
                                  "item-title": "name",
                                  items: $props.roles,
                                  label: "Role",
                                  variant: "underlined",
                                  "return-object": "",
                                  error: _ctx.noRoleError,
                                  required: ""
                                }, null, 8, ["modelValue", "items", "error"])
                              ]),
                              _: 1
                              /* STABLE */
                            }),
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VCheckbox, {
                                  modelValue: _ctx.addAuth.inherit,
                                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.addAuth.inherit = $event),
                                  label: "Inherit"
                                }, null, 8, ["modelValue"]),
                                createBaseVNode(
                                  "p",
                                  null,
                                  "Children: " + toDisplayString(_ctx.addAuth.childCount),
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
                })
              ]),
              _: 1
              /* STABLE */
            }),
            createVNode(VCardActions, null, {
              default: withCtx(() => [
                createVNode(VSpacer),
                createVNode(VBtn, { onClick: $options.authorizationAddCancel }, {
                  default: withCtx(() => _cache[15] || (_cache[15] = [
                    createTextVNode("Cancel")
                  ])),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"]),
                createVNode(VBtn, {
                  color: "primary",
                  onClick: $options.authorizationAdd
                }, {
                  default: withCtx(() => _cache[16] || (_cache[16] = [
                    createTextVNode("Add Authorization")
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
    createVNode(VDialog, {
      modelValue: _ctx.authorizationGlobalConfirmModal,
      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.authorizationGlobalConfirmModal = $event),
      persistent: "",
      "max-width": "450px"
    }, {
      default: withCtx(() => [
        createVNode(VCard, null, {
          default: withCtx(() => [
            createVNode(VCardTitle, { class: "text-h5" }, {
              default: withCtx(() => _cache[17] || (_cache[17] = [
                createTextVNode("Global Access authorization requires director approval.")
              ])),
              _: 1
              /* STABLE */
            }),
            createVNode(VCardActions, null, {
              default: withCtx(() => [
                createVNode(VSpacer),
                createVNode(VBtn, {
                  color: "green darken",
                  onClick: $options.closeGlobalConfirmBox
                }, {
                  default: withCtx(() => _cache[18] || (_cache[18] = [
                    createTextVNode("Cancel")
                  ])),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"]),
                createVNode(VBtn, {
                  color: "red darken",
                  onClick: $options.authorizationGlobalAdd
                }, {
                  default: withCtx(() => _cache[19] || (_cache[19] = [
                    createTextVNode("Add Global Access")
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
    _ctx.isGlobal ? (openBlock(), createBlock(VBtn, {
      key: 1,
      class: "mt-4 ml-4",
      color: "#4caf50",
      onClick: $options.openGlobalConfirmBox
    }, {
      default: withCtx(() => _cache[20] || (_cache[20] = [
        createTextVNode("Add Global Access")
      ])),
      _: 1
      /* STABLE */
    }, 8, ["onClick"])) : createCommentVNode("v-if", true)
  ]);
}
const AuthorizationManagerComponent = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Common/AuthorizationManagerComponent.vue"]]);
const _sfc_main$e = {
  name: "IndividualAutocomplete",
  props: {
    value: {
      required: true
    },
    individual: {
      default: function() {
        return {
          FirstName: "",
          LastName: ""
        };
      }
    },
    rules: {
      default: ""
    },
    affiliateId: {
      required: true
    },
    affiliateParentFilter: {
      default: false
    },
    label: {
      default: "Individual"
    },
    filter: {
      default: ""
    }
  },
  data: () => ({
    isLoading: false,
    search: "",
    items: []
  }),
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    }
  },
  methods: {
    addLabelToIndividual(individual) {
      if (individual) {
        individual.autoCompleteLabel = individual.FirstName + " " + individual.LastName;
        if (individual.individualMembers && individual.individualMembers.length > 0) {
          individual.autoCompleteLabel += " (" + individual.individualMembers[0].MemberId + ")";
        }
        if (individual.individualAffiliates && individual.individualAffiliates.length > 0) {
          individual.autoCompleteLabel += " (";
          individual.individualAffiliates.forEach((key, individualAffiliate) => {
            if (individualAffiliate.Affiliate) {
              if (key == individual.individualAffiliates.length - 1) {
                individual.autoCompleteLabel += individualAffiliate.Affiliate.AffiliateNumber;
              } else {
                individual.autoCompleteLabel += individualAffiliate.Affiliate.AffiliateNumber + " ,";
              }
            }
          });
          individual.autoCompleteLabel += ")";
        }
      }
      return individual;
    },
    getSearchData(val) {
      this.isLoading = true;
      var url = "";
      url = "/admin/api/aggregate/individual/autocomplete?scope=global&search=" + val + "&affiliateId=" + this.affiliateId + "&filter=" + this.filter + "&affiliateParentFilter=" + this.affiliateParentFilter;
      axios.get(url).then(this.mapResponseToData).catch((err) => {
        console.log(err);
      }).finally(() => this.isLoading = false);
    },
    mapResponseToData(res) {
      this.count = res.data.meta.total;
      this.items = res.data.data.map((c) => {
        return this.addLabelToIndividual(c);
      });
    },
    doSearch(val) {
      if (this.isLoading) return;
      if (!val) val = "";
      const selected = this.items.filter((v) => v.autoCompleteLabel === val);
      if (selected && selected.length > 0) return;
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.getSearchData(val);
      }, 500);
    },
    loadSingle() {
      this.isLoading = true;
      axios.get("/api/v2/aggregate/individual/autocomplete?scope=global&id=" + this.value + "&affiliateId=" + this.affiliateId).then(this.mapResponseToData).then(() => {
        if (this.items.length > 0) {
          this.model = this.items[0].IndividualId;
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => this.isLoading = false);
    }
  },
  watch: {
    search(val) {
      this.doSearch(val);
    },
    affiliateId: {
      handler: function(val, oldVal) {
        this.getSearchData("");
      }
    },
    model: {
      handler: function(val, oldVal) {
        this.loadSingle();
      }
    }
  },
  beforeMount() {
    if (this.value) {
      this.loadSingle();
    }
  }
};
const _hoisted_1$6 = {
  key: 0,
  class: "text-red"
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VAutocomplete, {
    modelValue: $options.model,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.model = $event),
    search: _ctx.search,
    "onUpdate:search": _cache[1] || (_cache[1] = ($event) => _ctx.search = $event),
    items: _ctx.items,
    loading: _ctx.isLoading,
    "item-title": "autoCompleteLabel",
    "item-value": "IndividualId",
    variant: "underlined",
    placeholder: "First Name or Last Name or MemberId",
    "hide-no-data": "",
    "no-filter": "",
    "persistent-hint": "",
    rules: $props.rules
  }, {
    label: withCtx(() => [
      $props.rules ? (openBlock(), createElementBlock("span", _hoisted_1$6, "* ")) : createCommentVNode("v-if", true),
      createTextVNode(
        toDisplayString($props.label),
        1
        /* TEXT */
      )
    ]),
    _: 1
    /* STABLE */
  }, 8, ["modelValue", "search", "items", "loading", "rules"]);
}
const IndividualAutocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Common/IndividualAutocomplete.vue"]]);
const _sfc_main$d = {
  name: "UserAbilityManagerComponent",
  props: {
    value: { type: Array, required: true },
    userId: { type: Number, default: null }
  },
  data: () => ({
    loading: false,
    headers: [
      { title: "Ability", value: "name" }
    ],
    abilities: [],
    selected: []
  }),
  watch: {
    userId() {
      this.getAbilities();
    },
    selected() {
      this.$emit("update:modelValue", this.selected);
    }
  },
  methods: {
    getAbilities() {
      this.loading = true;
      axios.get("/admin/api/user/abilities/" + (this.userId || "")).then((response) => {
        this.abilities = response.data;
        this.selected = [];
        this.abilities.forEach((ability) => {
          if (ability.selected) {
            this.selected.push(ability);
          }
        });
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
const _hoisted_1$5 = { style: { "position": "relative" } };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createVNode(VDataTable, {
      modelValue: _ctx.selected,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selected = $event),
      headers: _ctx.headers,
      items: _ctx.abilities,
      loading: _ctx.loading,
      "show-select": "",
      "return-object": "",
      "item-key": "id",
      "hide-default-footer": ""
    }, {
      "header.data-table-select": withCtx(() => _cache[1] || (_cache[1] = [
        createTextVNode(" Assign ")
      ])),
      _: 1
      /* STABLE */
    }, 8, ["modelValue", "headers", "items", "loading"]),
    createVNode(VOverlay, {
      absolute: true,
      "model-value": _ctx.loading,
      scrim: "#FFF"
    }, null, 8, ["model-value"])
  ]);
}
const UserAbilityManagerComponent = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Common/UserAbilityManagerComponent.vue"]]);
const _sfc_main$c = {
  name: "UserEditComponent",
  components: { AuthorizationManagerComponent, IndividualAutocomplete, UserAbilityManagerComponent },
  data: () => ({
    loading: false,
    userId: null,
    userName: null,
    userEmail: null,
    userPassword: null,
    userIndividual: null,
    userPasswordReset: null,
    AffiliateName: null,
    individualName: null,
    entityTypes: [],
    roles: [],
    authorizations: [],
    errors: {},
    affiliateId: 0,
    individual: {},
    user: {},
    editMode: true,
    editIndividual: false,
    userAffiliate: null,
    userType: null,
    userTypes: [
      { type: "user", label: "Connect User" },
      { type: "staff", label: "Staff Portal User" },
      { type: "admin", label: "Connect Site Administrator" }
    ],
    userAbilities: [],
    searchText: null,
    affiliates: [],
    noEntityError: false,
    affiliateParentFilter: false,
    rules: {
      required: (value) => !!value || "Required."
    }
  }),
  computed: {
    hasUserNameError: function() {
      return this.errors && this.errors.hasOwnProperty("userName");
    },
    hasUserEmailError: function() {
      return this.errors && this.errors.hasOwnProperty("userEmail");
    },
    hasUserPasswordError: function() {
      return this.errors && this.errors.hasOwnProperty("userPassword");
    },
    hasAuthorizationsError: function() {
      return this.errors && this.errors.hasOwnProperty("authorizations");
    },
    hasUserTypeError: function() {
      return this.errors && this.errors.hasOwnProperty("userType");
    }
  },
  beforeMount() {
    this.getUser(this.$route.params.id);
  },
  watch: {
    userName: function() {
      this.errors.userName = null;
    },
    userEmail: function() {
      this.errors.userEmail = null;
    },
    userPassword: function() {
      this.errors.userPassword = null;
    },
    authorizations: function() {
      this.errors.authorizations = null;
    },
    userType: function() {
      this.errors.userType = null;
    },
    "userAffiliate": {
      handler(value) {
        if (value) {
          this.affiliateId = value.AffiliateId;
        }
      }
    },
    "individual": {
      handler(value) {
        if (value) {
          this.individualName = value.FirstName;
          this.individualName = value.FirstName + " " + value.LastName;
          if (value.individualMembers && value.individualMembers.length > 0) {
            this.individualName += " (" + value.individualMembers[0].MemberId + ")";
          }
          if (value.individualAffiliates && value.individualAffiliates.length > 0) {
            this.individualName += " (";
            var affiliates = "";
            value.individualAffiliates.forEach((key, individualAffiliate) => {
              if (individualAffiliate.Affiliate) {
                if (key == value.individualAffiliates.length - 1) {
                  affiliates += individualAffiliate.Affiliate.AffiliateNumber;
                } else {
                  affiliates += individualAffiliate.Affiliate.AffiliateNumber + " ,";
                }
              }
            });
            this.individualName += affiliates + ")";
          }
        }
      }
    }
  },
  methods: {
    getUser(userId) {
      this.loading = true;
      axios.get("/admin/api/user/" + userId).then((response) => {
        let self = this;
        this.userId = response.data.id;
        this.userName = response.data.name;
        this.userEmail = response.data.email;
        this.user = response.data;
        this.userType = response.data.type;
        this.userIndividual = response.data.individual_id;
        this.individual = response.data.individual;
        this.AffiliateName = response.data.AffiliateName;
        this.entityTypes = response.data.options.entityTypes;
        this.roles = response.data.options.roles;
        this.affiliateId = response.data.AffiliateId;
        this.loadAffiliateSearch(this.AffiliateName, response.data.Affiliate);
        response.data.authorizations.forEach(function(auth) {
          let entityTypeId = -1;
          self.entityTypes.forEach(function(item, index) {
            if (item.type === auth.entity_type) {
              entityTypeId = index;
            }
          });
          self.authorizations.push({
            order: auth.order,
            entityTypeId,
            entityTypeName: auth.entity_type,
            entityId: auth.entity_id,
            entity: auth.entity_id === 0 ? { display_name: "Global Access" } : auth.entity,
            role: auth.role,
            inherit: auth.entity_inherit === "1" ? true : false,
            childCount: null
          });
        });
      }).finally(() => {
        this.loading = false;
      });
    },
    editUser() {
      const savedata = {
        userId: this.userId,
        userName: this.userName,
        userEmail: this.userEmail,
        userPassword: this.userPassword,
        userPasswordReset: !!this.userPasswordReset,
        userIndividual: this.userIndividual,
        authorizations: this.authorizations,
        userType: this.userType,
        userAbilities: this.userAbilities
      };
      axios.put("/admin/api/user/" + this.userId, savedata).then((response) => {
        this.$router.replace({ name: "userList" });
      }).catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    },
    affiliateSearch: debounce$1(function(search) {
      if (!search) {
        return;
      }
      if (this.userAffiliate && this.userAffiliate.display_name === search) {
        return;
      }
      this.loading = true;
      axios.post("/admin/api/affiliate/search", { search }).then((response) => {
        this.affiliates = response.data.data;
      }).finally(() => {
        this.loading = false;
      });
    }, 500),
    loadAffiliateSearch(search, affiliate) {
      if (!search) {
        return;
      }
      this.loading = true;
      axios.post("/admin/api/affiliate/search", { search }).then((response) => {
        this.affiliates = response.data.data;
        this.userAffiliate = response.data.data[0];
      }).finally(() => {
        this.loading = false;
      });
    },
    enableEditIndividual() {
      this.editIndividual = true;
    },
    onSearch(search) {
      this.noEntityError = false;
      this.affiliateSearch(search);
    }
  }
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_authorization_manager_component = resolveComponent("authorization-manager-component");
  const _component_IndividualAutocomplete = resolveComponent("IndividualAutocomplete");
  const _component_user_ability_manager_component = resolveComponent("user-ability-manager-component");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              _cache[10] || (_cache[10] = createBaseVNode(
                "h3",
                null,
                "User Login Information",
                -1
                /* HOISTED */
              )),
              createVNode(VSelect, {
                items: _ctx.userTypes,
                label: "User Type",
                "item-value": "type",
                "item-title": "label",
                modelValue: _ctx.userType,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.userType = $event),
                variant: "underlined",
                rules: [_ctx.rules.required],
                error: $options.hasUserTypeError,
                "error-messages": _ctx.errors.userType
              }, null, 8, ["items", "modelValue", "rules", "error", "error-messages"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, { justify: "space-between" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(
                VForm,
                { ref: "form" },
                {
                  default: withCtx(() => [
                    createVNode(VTextField, {
                      modelValue: _ctx.userName,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.userName = $event),
                      label: "User Name",
                      variant: "underlined",
                      error: $options.hasUserNameError,
                      "error-messages": _ctx.errors.userName
                    }, null, 8, ["modelValue", "error", "error-messages"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.userEmail,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.userEmail = $event),
                      label: "Email Address",
                      variant: "underlined",
                      error: $options.hasUserEmailError,
                      "error-messages": _ctx.errors.userEmail
                    }, null, 8, ["modelValue", "error", "error-messages"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.userPassword,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.userPassword = $event),
                      label: "Password",
                      variant: "underlined",
                      error: $options.hasUserPasswordError,
                      "error-messages": _ctx.errors.userPassword
                    }, null, 8, ["modelValue", "error", "error-messages"]),
                    createVNode(VCheckbox, {
                      modelValue: _ctx.userPasswordReset,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.userPasswordReset = $event),
                      label: "Require Password Reset"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            md: "7"
          }, {
            default: withCtx(() => [
              createVNode(VIcon, {
                class: "avatar",
                icon: "mdi:mdi-account-edit"
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
          createVNode(VCol, {
            cols: "12",
            md: "10"
          }, {
            default: withCtx(() => [
              _cache[11] || (_cache[11] = createBaseVNode(
                "h3",
                null,
                "Assign Authorizations",
                -1
                /* HOISTED */
              )),
              _ctx.userType !== "staff" ? (openBlock(), createBlock(_component_authorization_manager_component, {
                key: 0,
                "entity-types": _ctx.entityTypes,
                roles: _ctx.roles,
                authorizations: _ctx.authorizations,
                error: $options.hasAuthorizationsError,
                "error-messages": _ctx.errors.authorizations
              }, null, 8, ["entity-types", "roles", "authorizations", "error", "error-messages"])) : createCommentVNode("v-if", true)
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
            sm: "8",
            md: "4"
          }, {
            default: withCtx(() => [
              _cache[12] || (_cache[12] = createBaseVNode(
                "h3",
                null,
                "Associate Individual Record",
                -1
                /* HOISTED */
              )),
              createVNode(VAutocomplete, {
                loading: _ctx.loading,
                modelValue: _ctx.userAffiliate,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.userAffiliate = $event),
                "item-value": "AffiliateId",
                "item-title": "display_name",
                items: _ctx.affiliates,
                label: "Affiliate",
                variant: "underlined",
                "no-data-text": "Enter text to search...",
                "return-object": "",
                error: _ctx.noEntityError,
                required: "",
                "onUpdate:search": $options.onSearch
              }, null, 8, ["loading", "modelValue", "items", "error", "onUpdate:search"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "4",
            md: "2"
          }, {
            default: withCtx(() => [
              createVNode(VCheckbox, {
                modelValue: _ctx.affiliateParentFilter,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.affiliateParentFilter = $event),
                label: "Search individual for selected affiliate"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      !_ctx.editIndividual ? (openBlock(), createBlock(VRow, { key: 0 }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "4",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                readonly: "",
                modelValue: _ctx.individualName,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.individualName = $event),
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "4",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(VBtn, { onClick: $options.enableEditIndividual }, {
                default: withCtx(() => _cache[13] || (_cache[13] = [
                  createTextVNode("Change")
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
      })) : createCommentVNode("v-if", true),
      _ctx.editIndividual ? (openBlock(), createBlock(VRow, { key: 1 }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "8",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(_component_IndividualAutocomplete, {
                modelValue: _ctx.userIndividual,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.userIndividual = $event),
                individual: _ctx.user.individual,
                rules: [_ctx.rules.required],
                affiliateId: this.affiliateId,
                affiliateParentFilter: this.affiliateParentFilter,
                filter: "current"
              }, null, 8, ["modelValue", "individual", "rules", "affiliateId", "affiliateParentFilter"])
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
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              _cache[14] || (_cache[14] = createBaseVNode(
                "h3",
                null,
                "Set User Abilities",
                -1
                /* HOISTED */
              )),
              createVNode(_component_user_ability_manager_component, {
                modelValue: _ctx.userAbilities,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.userAbilities = $event),
                userId: _ctx.userId
              }, null, 8, ["modelValue", "userId"])
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
                to: { name: "userList" }
              }, {
                default: withCtx(() => _cache[15] || (_cache[15] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: $options.editUser
              }, {
                default: withCtx(() => _cache[16] || (_cache[16] = [
                  createTextVNode("Save Changes")
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
  });
}
const UserEditComponent = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-a881c5ec"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Edit/UserEditComponent.vue"]]);
const _sfc_main$b = {
  name: "ContentBlockCreateComponent",
  components: {
    Editor
  },
  mixins: [uploadFile],
  data: () => ({
    editor: null,
    contentblockId: null,
    contentblock: {
      title: null,
      content: " ",
      is_active: false,
      application: null,
      priority: null,
      position: null
    },
    application: [
      { "value": "connect", "label": "Connect" },
      { "value": "memberforms", "label": "Membership Forms Portal" },
      { "value": "public", "label": "Public" }
    ],
    priorityList: [
      { "value": "normal", "label": "Normal" },
      { "value": "low", "label": "Low" },
      { "value": "medium", "label": "Medium" },
      { "value": "high", "label": "High" }
    ],
    positionList: [
      { "value": "left", "label": "Left" },
      { "value": "right", "label": "Right" }
    ],
    isSelecting: false,
    files: []
  }),
  methods: {
    saveContentBlock() {
      axios.post("/admin/api/content-block", {
        contentblock: this.contentblock
      }).then((response) => {
        this.$router.replace({ name: "contentBlockList" });
      }).catch((error) => {
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    },
    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener("focus", () => {
        this.isSelecting = false;
      }, { once: true });
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.push(selectedFiles[i]);
      }
      this.uploadFiles(e.target.files);
    }
  }
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = resolveComponent("Editor");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "6"
          }, {
            default: withCtx(() => [
              createVNode(VSelect, {
                items: _ctx.application,
                label: "Application",
                "item-value": "value",
                "item-title": "label",
                modelValue: _ctx.contentblock.application,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.contentblock.application = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"])
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
                items: _ctx.priorityList,
                label: "Priority",
                "item-value": "value",
                "item-title": "label",
                modelValue: _ctx.contentblock.priority,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.contentblock.priority = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"])
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
                items: _ctx.positionList,
                label: "Position",
                "item-value": "value",
                "item-title": "label",
                modelValue: _ctx.contentblock.position,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.contentblock.position = $event),
                variant: "underlined"
              }, null, 8, ["items", "modelValue"])
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
              createVNode(VTextField, {
                class: "textFieldHeader",
                modelValue: _ctx.contentblock.title,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.contentblock.title = $event),
                label: "Title",
                variant: "underlined"
              }, null, 8, ["modelValue"]),
              createVNode(_component_Editor, {
                modelValue: _ctx.contentblock.content,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.contentblock.content = $event),
                "upload-url": _ctx.uploadUrl
              }, null, 8, ["modelValue", "upload-url"])
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
              createVNode(VBtn, {
                color: "primary",
                rounded: "",
                loading: _ctx.isSelecting,
                onClick: $options.handleFileImport
              }, {
                default: withCtx(() => _cache[7] || (_cache[7] = [
                  createTextVNode(" Upload PDF ")
                ])),
                _: 1
                /* STABLE */
              }, 8, ["loading", "onClick"]),
              createBaseVNode(
                "input",
                {
                  ref: "uploader",
                  class: "d-none",
                  type: "file",
                  accept: "application/pdf",
                  onChange: _cache[5] || (_cache[5] = (...args) => $options.onFileChanged && $options.onFileChanged(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
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
          createVNode(VCol, {
            cols: "12",
            class: "switches"
          }, {
            default: withCtx(() => [
              createVNode(VSwitch, {
                label: "Published",
                modelValue: _ctx.contentblock.is_active,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.contentblock.is_active = $event)
              }, null, 8, ["modelValue"])
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
                to: { name: "contentBlockList" }
              }, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: $options.saveContentBlock
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode("Save Changes")
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
  });
}
const ContentBlockCreateComponent = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-c65225b2"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Create/ContentBlockCreateComponent.vue"]]);
const _sfc_main$a = {
  name: "UserCreateComponent",
  components: { AuthorizationManagerComponent, IndividualAutocomplete, UserAbilityManagerComponent },
  data: () => ({
    loading: false,
    userName: null,
    userEmail: null,
    userPassword: null,
    userPasswordReset: null,
    userIndividual: null,
    entityTypes: [],
    roles: [],
    authorizations: [],
    errors: {},
    affiliateId: 0,
    individual: {},
    rules: {
      required: (value) => !!value || "Required."
    },
    searchText: null,
    affiliates: [],
    noEntityError: false,
    userAffiliate: null,
    userType: null,
    userTypes: [
      { type: "user", label: "Connect User" },
      { type: "staff", label: "Staff Portal User" },
      { type: "admin", label: "Connect Site Administrator" }
    ],
    userAbilities: [],
    userId: null,
    affiliateParentFilter: false
  }),
  computed: {
    hasUserNameError: function() {
      return this.errors && this.errors.hasOwnProperty("userName");
    },
    hasUserEmailError: function() {
      return this.errors && this.errors.hasOwnProperty("userEmail");
    },
    hasUserPasswordError: function() {
      return this.errors && this.errors.hasOwnProperty("userPassword");
    },
    hasAuthorizationsError: function() {
      return this.errors && this.errors.hasOwnProperty("authorizations");
    },
    hasUserTypeError: function() {
      return this.errors && this.errors.hasOwnProperty("userType");
    }
  },
  watch: {
    userName: function() {
      this.errors.userName = null;
    },
    userEmail: function() {
      this.errors.userEmail = null;
    },
    userPassword: function() {
      this.errors.userPassword = null;
    },
    authorizations: function() {
      this.errors.authorizations = null;
    },
    userType: function() {
      this.errors.userType = null;
    },
    "searchText": {
      handler(value) {
        this.noEntityError = false;
        this.affiliateSearch(value);
      }
    },
    "userAffiliate": {
      handler(value) {
        this.affiliateId = value.AffiliateId;
      }
    }
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      this.loading = true;
      axios.get("/admin/api/user/options").then((response) => {
        this.entityTypes = response.data.entityTypes;
        this.roles = response.data.roles;
      }).finally(() => {
        this.loading = false;
      });
    },
    createUser() {
      axios.post("/admin/api/user", {
        userName: this.userName,
        userEmail: this.userEmail,
        userPassword: this.userPassword,
        userPasswordReset: !!this.userPasswordReset,
        userIndividual: this.userIndividual,
        authorizations: this.authorizations,
        userType: this.userType
      }).then((response) => {
        this.$router.replace({ name: "userEdit", params: { id: response.data.user } });
      }).catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    },
    affiliateSearch: debounce$1(function(search) {
      if (!search) {
        return;
      }
      if (this.userAffiliate && this.userAffiliate.display_name === search) {
        return;
      }
      this.loading = true;
      axios.post("/admin/api/affiliate/search", { search }).then((response) => {
        this.affiliates = response.data.data;
      }).finally(() => {
        this.loading = false;
      });
    }, 500)
  }
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_authorization_manager_component = resolveComponent("authorization-manager-component");
  const _component_IndividualAutocomplete = resolveComponent("IndividualAutocomplete");
  const _component_user_ability_manager_component = resolveComponent("user-ability-manager-component");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              _cache[10] || (_cache[10] = createBaseVNode(
                "h3",
                null,
                "User Login Information",
                -1
                /* HOISTED */
              )),
              createVNode(VSelect, {
                items: _ctx.userTypes,
                label: "User Type",
                "item-value": "type",
                "item-title": "label",
                modelValue: _ctx.userType,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.userType = $event),
                variant: "underlined",
                rules: [_ctx.rules.required],
                error: $options.hasUserTypeError,
                "error-messages": _ctx.errors.userType
              }, null, 8, ["items", "modelValue", "rules", "error", "error-messages"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, { justify: "space-between" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(
                VForm,
                { ref: "form" },
                {
                  default: withCtx(() => [
                    createVNode(VTextField, {
                      modelValue: _ctx.userName,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.userName = $event),
                      label: "User Name",
                      variant: "underlined",
                      error: $options.hasUserNameError,
                      "error-messages": _ctx.errors.userName
                    }, null, 8, ["modelValue", "error", "error-messages"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.userEmail,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.userEmail = $event),
                      label: "Email Address",
                      variant: "underlined",
                      error: $options.hasUserEmailError,
                      "error-messages": _ctx.errors.userEmail
                    }, null, 8, ["modelValue", "error", "error-messages"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.userPassword,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.userPassword = $event),
                      label: "Password",
                      variant: "underlined",
                      error: $options.hasUserPasswordError,
                      "error-messages": _ctx.errors.userPassword
                    }, null, 8, ["modelValue", "error", "error-messages"]),
                    createVNode(VCheckbox, {
                      modelValue: _ctx.userPasswordReset,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.userPasswordReset = $event),
                      label: "Require Password Reset"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            md: "7"
          }, {
            default: withCtx(() => [
              createVNode(VIcon, {
                icon: "mdi:mdi-account-plus",
                class: "avatar"
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
          createVNode(VCol, {
            cols: "12",
            md: "10"
          }, {
            default: withCtx(() => [
              _cache[11] || (_cache[11] = createBaseVNode(
                "h3",
                null,
                "Assign Authorizations",
                -1
                /* HOISTED */
              )),
              _ctx.userType !== "staff" ? (openBlock(), createBlock(_component_authorization_manager_component, {
                key: 0,
                "entity-types": _ctx.entityTypes,
                roles: _ctx.roles,
                authorizations: _ctx.authorizations,
                error: $options.hasAuthorizationsError,
                "error-messages": _ctx.errors.authorizations
              }, null, 8, ["entity-types", "roles", "authorizations", "error", "error-messages"])) : createCommentVNode("v-if", true)
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
            sm: "8",
            md: "4"
          }, {
            default: withCtx(() => [
              _cache[12] || (_cache[12] = createBaseVNode(
                "h3",
                null,
                "Associate Individual Record",
                -1
                /* HOISTED */
              )),
              createVNode(VAutocomplete, {
                search: _ctx.searchText,
                "onUpdate:search": _cache[5] || (_cache[5] = ($event) => _ctx.searchText = $event),
                loading: _ctx.loading,
                modelValue: _ctx.userAffiliate,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.userAffiliate = $event),
                "item-value": "AffiliateId",
                "item-title": "display_name",
                items: _ctx.affiliates,
                variant: "underlined",
                label: "Affiliate",
                "no-data-text": "Enter text to search...",
                "return-object": "",
                error: _ctx.noEntityError,
                required: ""
              }, null, 8, ["search", "loading", "modelValue", "items", "error"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "4",
            md: "2"
          }, {
            default: withCtx(() => [
              createVNode(VCheckbox, {
                modelValue: _ctx.affiliateParentFilter,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.affiliateParentFilter = $event),
                label: "Search individual for selected affiliate"
              }, null, 8, ["modelValue"])
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
            sm: "8",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(_component_IndividualAutocomplete, {
                modelValue: _ctx.userIndividual,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.userIndividual = $event),
                individual: _ctx.individual,
                rules: [_ctx.rules.required],
                affiliateId: this.affiliateId,
                affiliateParentFilter: this.affiliateParentFilter,
                filter: "current"
              }, null, 8, ["modelValue", "individual", "rules", "affiliateId", "affiliateParentFilter"])
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
            md: "4"
          }, {
            default: withCtx(() => [
              _cache[13] || (_cache[13] = createBaseVNode(
                "h3",
                null,
                "Set User Abilities",
                -1
                /* HOISTED */
              )),
              createVNode(_component_user_ability_manager_component, {
                modelValue: _ctx.userAbilities,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.userAbilities = $event),
                userId: _ctx.userId
              }, null, 8, ["modelValue", "userId"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, { class: "mt-4" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            class: "d-flex ga-4"
          }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                size: "large",
                class: "bg-red",
                to: { name: "userList" }
              }, {
                default: withCtx(() => _cache[14] || (_cache[14] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                size: "large",
                color: "#4caf50",
                onClick: $options.createUser
              }, {
                default: withCtx(() => _cache[15] || (_cache[15] = [
                  createTextVNode("Create User")
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
  });
}
const UserCreateComponent = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-78f83152"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Create/UserCreateComponent.vue"]]);
const _sfc_main$9 = {
  name: "LocalJobClassCreateComponent",
  data: () => ({
    loading: false,
    localJobClassName: null,
    localJobClassCode: null,
    nationalJobClass: null,
    unit: null,
    selectedEmployerId: null,
    selectedAffiliateId: null,
    searchText: null,
    units: [],
    employers: [],
    affiliates: [],
    nationalJobClassList: [],
    rules: {
      required: (value) => !!value || "Required."
    },
    errors: {}
  }),
  computed: {
    haslocalJobClassNameError: function() {
      return this.errors && this.errors.hasOwnProperty("localJobClassName");
    },
    haslocalJobClassCodeError: function() {
      return this.errors && this.errors.hasOwnProperty("localJobClassCode");
    },
    hasnationalJobClassError: function() {
      return this.errors && this.errors.hasOwnProperty("nationalJobClass");
    },
    hasselectedAffiliateIdError: function() {
      return this.errors && this.errors.hasOwnProperty("selectedAffiliateId");
    },
    hasunitError: function() {
      return this.errors && this.errors.hasOwnProperty("unit");
    }
  },
  watch: {
    localJobClassName: function() {
      this.errors.localJobClassName = null;
    },
    localJobClassCode: function() {
      this.errors.localJobClassCode = null;
    },
    nationalJobClass: function() {
      this.errors.nationalJobClass = null;
    },
    unit: function() {
      this.errors.unit = null;
    },
    selectedAffiliateId: {
      handler(value) {
        if (value) {
          this.getEmployers(this.selectedAffiliateId.AffiliateId);
        }
        return value;
      },
      deep: true
    },
    selectedEmployerId: {
      handler(value) {
        if (value) {
          this.loadOptions(value);
        }
        return value;
      },
      deep: true
    },
    searchText: {
      handler(value) {
        this.affiliateSearch(value);
      }
    }
  },
  mounted() {
    this.getNationalJobClass();
  },
  methods: {
    affiliateSearch: debounce$1(function(search) {
      if (!search) {
        return;
      }
      if (this.selectedAffiliateId && this.selectedAffiliateId.display_name === search) {
        return;
      }
      this.loading = true;
      axios.post("/admin/api/affiliate/search", { search }).then((response) => {
        this.affiliates = response.data.data;
      }).finally(() => {
        this.loading = false;
      });
    }, 500),
    getEmployers(affiliateId) {
      if (affiliateId) {
        axios.get("/api/v2/aggregate/employer/byaffiliate/" + affiliateId).then((response) => {
          this.employers = response.data.data;
        });
      }
    },
    loadOptions(employerId) {
      axios.get("/api/v2/aggregate/employer/units/" + employerId).then((response) => {
        this.units = response.data.data;
      });
    },
    getNationalJobClass() {
      axios.get("/admin/api/nationaljobclass?perPage=100").then((response) => {
        this.nationalJobClassList = response.data.data;
      });
    },
    createJobclass() {
      axios.post("/admin/api/localjobclass", {
        localJobClassName: this.localJobClassName,
        localJobClassCode: this.localJobClassCode,
        nationalJobClass: this.nationalJobClass,
        unit: this.unit
      }).then((response) => {
        this.$router.replace({ name: "localJobClassEdit", params: { id: response.data.localjobclassid } });
      }).catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    }
  }
};
const _hoisted_1$4 = {
  key: 0,
  class: "text-red"
};
const _hoisted_2$1 = {
  key: 0,
  class: "text-red"
};
const _hoisted_3 = {
  key: 0,
  class: "text-red"
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, { justify: "space-between" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(
                VForm,
                { ref: "form" },
                {
                  default: withCtx(() => [
                    createVNode(VAutocomplete, {
                      loading: _ctx.loading,
                      modelValue: _ctx.selectedAffiliateId,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectedAffiliateId = $event),
                      search: _ctx.searchText,
                      "onUpdate:search": _cache[1] || (_cache[1] = ($event) => _ctx.searchText = $event),
                      "item-value": "AffiliateId",
                      "item-title": "display_name",
                      items: _ctx.affiliates,
                      label: "Affiliate",
                      variant: "underlined",
                      "return-object": "",
                      "no-data-text": "Enter text to search...",
                      error: $options.hasselectedAffiliateIdError,
                      required: ""
                    }, null, 8, ["loading", "modelValue", "search", "items", "error"]),
                    createVNode(VAutocomplete, {
                      modelValue: _ctx.selectedEmployerId,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.selectedEmployerId = $event),
                      items: _ctx.employers,
                      "item-title": "EmployerName",
                      "item-value": "EmployerId",
                      variant: "underlined",
                      "persistent-hint": "",
                      rules: [_ctx.rules.required]
                    }, {
                      label: withCtx(() => [
                        _ctx.rules.required ? (openBlock(), createElementBlock("span", _hoisted_1$4, "* ")) : createCommentVNode("v-if", true),
                        _cache[7] || (_cache[7] = createTextVNode("Search for an employer "))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["modelValue", "items", "rules"]),
                    createVNode(VSelect, {
                      items: _ctx.units,
                      "item-value": "UnitId",
                      "item-title": "UnitName",
                      modelValue: _ctx.unit,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.unit = $event),
                      variant: "underlined",
                      rules: [_ctx.rules.required]
                    }, {
                      label: withCtx(() => [
                        _ctx.rules.required ? (openBlock(), createElementBlock("span", _hoisted_2$1, "* ")) : createCommentVNode("v-if", true),
                        _cache[8] || (_cache[8] = createTextVNode("Unit "))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["items", "modelValue", "rules"]),
                    createVNode(VSelect, {
                      items: _ctx.nationalJobClassList,
                      "item-value": "NationalJobClassId",
                      "item-title": "NationalJobClassName",
                      modelValue: _ctx.nationalJobClass,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.nationalJobClass = $event),
                      variant: "underlined",
                      rules: [_ctx.rules.required]
                    }, {
                      label: withCtx(() => [
                        _ctx.rules.required ? (openBlock(), createElementBlock("span", _hoisted_3, "* ")) : createCommentVNode("v-if", true),
                        _cache[9] || (_cache[9] = createTextVNode("NationalJobClass "))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["items", "modelValue", "rules"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.localJobClassName,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.localJobClassName = $event),
                      label: "LocalJobClass Name",
                      variant: "underlined",
                      error: $options.haslocalJobClassNameError,
                      "error-messages": _ctx.errors.localJobClassName
                    }, null, 8, ["modelValue", "error", "error-messages"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.localJobClassCode,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.localJobClassCode = $event),
                      label: "localjobclass Code",
                      variant: "underlined",
                      error: $options.haslocalJobClassCodeError,
                      "error-messages": _ctx.errors.localJobClassCode
                    }, null, 8, ["modelValue", "error", "error-messages"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(VRow, { class: "mt-4" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            class: "d-flex ga-4"
          }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                size: "large",
                class: "bg-red",
                to: { name: "jobClassList" }
              }, {
                default: withCtx(() => _cache[10] || (_cache[10] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: $options.createJobclass
              }, {
                default: withCtx(() => _cache[11] || (_cache[11] = [
                  createTextVNode("Create LocalJobClass")
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
  });
}
const LocalJobClassCreateComponent = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-58607d92"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Create/LocalJobClassCreateComponent.vue"]]);
const _sfc_main$8 = {
  name: "LocalJobClassEditComponent",
  data: () => ({
    loading: false,
    errors: {},
    localJobClassName: null,
    localJobClassCode: null,
    nationalJobClass: null,
    unitName: null,
    employerName: null,
    affiliateName: null,
    localJobClassId: null,
    nationalJobClassList: [],
    indviduallist: [],
    indvidualTotal: 0,
    editMode: true,
    headers: [
      { title: "indvidual ID", value: "IndividualId" },
      { title: "indvidual Name", value: "FirstName" },
      { title: "indvidual Name", value: "LastName" }
    ],
    options: {
      page: 1,
      itemsPerPage: 15
    },
    rules: {
      required: (value) => !!value || "Required."
    }
  }),
  computed: {
    haslocalJobClassNameError: function() {
      return this.errors && this.errors.hasOwnProperty("localJobClassName");
    },
    haslocalJobClassCodeError: function() {
      return this.errors && this.errors.hasOwnProperty("localJobClassCode");
    },
    hasnationalJobClassError: function() {
      return this.errors && this.errors.hasOwnProperty("nationalJobClass");
    }
  },
  watch: {
    localJobClassName: function() {
      this.errors.localJobClassName = null;
    },
    localJobClassCode: function() {
      this.errors.localJobClassCode = null;
    },
    nationalJobClass: function() {
      this.errors.nationalJobClass = null;
    }
  },
  mounted() {
    this.getNationalJobClass();
    this.getLocalJobClass(this.$route.params.id);
    this.getIndvidualsByJobclass(this.$route.params.id);
  },
  methods: {
    getLocalJobClass(jobClassId) {
      this.loading = true;
      axios.get("/admin/api/localjobclass/" + jobClassId).then((response) => {
        this.localJobClassId = response.data.LocalJobClassId;
        this.localJobClassName = response.data.LocalJobClassName;
        this.localJobClassCode = response.data.LocalJobClassCode;
        this.nationalJobClass = response.data.NationalJobClass.NationalJobClassId;
        this.affiliateName = response.data.AffiliateName;
        this.employerName = response.data.EmployerName;
        this.unitName = response.data.UnitName;
      }).finally(() => {
        this.loading = false;
      });
    },
    getNationalJobClass() {
      axios.get("/admin/api/nationaljobclass?perPage=50").then((response) => {
        this.nationalJobClassList = response.data.data;
      });
    },
    editJobClass() {
      axios.put("/admin/api/localjobclass/" + this.localJobClassId, {
        localJobClassId: this.localJobClassId,
        localJobClassName: this.localJobClassName,
        localJobClassCode: this.localJobClassCode,
        nationalJobClass: this.nationalJobClass
      }).then((response) => {
        this.$router.replace({ name: "jobClassList" });
      }).catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    },
    getIndvidualsByJobclass(localJobClassId) {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      axios.get(
        "/admin/api/localjobclass/get-individuals-by-jobclass/" + localJobClassId + "?page=" + page + "&perPage=" + itemsPerPage
      ).then((response) => {
        this.indviduallist = response.data.data;
        this.options.itemsPerPage = response.data.meta.per_page;
        this.indvidualTotal = response.data.meta.total;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
const _hoisted_1$3 = {
  key: 0,
  class: "text-red"
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, { justify: "space-between" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(
                VForm,
                { ref: "form" },
                {
                  default: withCtx(() => [
                    createVNode(VTextField, {
                      modelValue: _ctx.affiliateName,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.affiliateName = $event),
                      label: "Affiliate",
                      variant: "underlined",
                      disabled: _ctx.editMode
                    }, null, 8, ["modelValue", "disabled"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.employerName,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.employerName = $event),
                      label: "Employer",
                      variant: "underlined",
                      disabled: _ctx.editMode
                    }, null, 8, ["modelValue", "disabled"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.unitName,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.unitName = $event),
                      label: "Unit",
                      variant: "underlined",
                      disabled: _ctx.editMode
                    }, null, 8, ["modelValue", "disabled"]),
                    createVNode(VSelect, {
                      items: _ctx.nationalJobClassList,
                      "item-value": "NationalJobClassId",
                      "item-title": "NationalJobClassName",
                      modelValue: _ctx.nationalJobClass,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.nationalJobClass = $event),
                      variant: "underlined",
                      rules: [_ctx.rules.required]
                    }, {
                      label: withCtx(() => [
                        _ctx.rules.required ? (openBlock(), createElementBlock("span", _hoisted_1$3, "* ")) : createCommentVNode("v-if", true),
                        _cache[7] || (_cache[7] = createTextVNode("NationalJobClass "))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["items", "modelValue", "rules"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.localJobClassName,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.localJobClassName = $event),
                      label: "LocalJobClass Name",
                      variant: "underlined",
                      error: $options.haslocalJobClassNameError,
                      "error-messages": _ctx.errors.localJobClassName
                    }, null, 8, ["modelValue", "error", "error-messages"]),
                    createVNode(VTextField, {
                      modelValue: _ctx.localJobClassCode,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.localJobClassCode = $event),
                      label: "localjobclass Code",
                      variant: "underlined",
                      error: $options.haslocalJobClassCodeError,
                      "error-messages": _ctx.errors.localJobClassCode
                    }, null, 8, ["modelValue", "error", "error-messages"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
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
                to: { name: "jobClassList" }
              }, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: $options.editJobClass
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode("Save Changes")
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VDataTableServer, {
                options: _ctx.options,
                "onUpdate:options": _cache[6] || (_cache[6] = ($event) => _ctx.options = $event),
                loading: _ctx.loading,
                headers: _ctx.headers,
                items: _ctx.indviduallist,
                "item-key": _ctx.indviduallist.IndvidualId,
                "items-length": _ctx.indvidualTotal,
                "disable-sort": ""
              }, null, 8, ["options", "loading", "headers", "items", "item-key", "items-length"])
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
const LocalJobClassEditComponent = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-51fdc047"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Edit/LocalJobClassEditComponent.vue"]]);
const _sfc_main$7 = {
  name: "MemberFormCreateComponent",
  data: () => ({
    affiliates: [],
    affiliatesSearchText: null,
    affiliatesSearchLoading: false,
    selectedAffiliateId: null,
    editor: null,
    valid: true,
    rules: {
      required: (value) => !!value || "Required."
    },
    typesList: [
      { "value": "100", "label": "ALL templates" },
      // { 'value': '3', 'label': 'Payroll Deduction' },
      { "value": "4", "label": "Payroll Deduction and COPE" },
      { "value": "5", "label": "Payroll COPE" },
      // { 'value': '1', 'label': 'eDues' },
      { "value": "2", "label": "eDues and COPE" },
      { "value": "6", "label": "Recurring COPE" },
      { "value": "8", "label": "State Fed Recurring COPE" }
    ],
    memberFormType: null,
    isMultiple: true,
    dialog: false,
    dialog1: false
  }),
  created() {
    this.debounceInput = debounce$1(function(search) {
      if (this.selectedAffiliate && search === this.selectedAffiliate.AffiliateName) {
        return;
      }
      this.affiliatesSearchLoading = true;
      axios.post("/api/v2/search/affiliate?scope=global", {
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
    isOptionDisabled(item) {
      return this.memberFormType && this.memberFormType.includes("100") && item.value !== "100";
    },
    saveMemberFormAssign() {
      if (!this.$refs.form.validate()) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      axios.post("/admin/api/member-form-assign", {
        affiliate_id: this.selectedAffiliateId,
        type: this.memberFormType
      }).then((response) => {
        this.$router.replace({ name: "memberFormsList" });
      }).catch((error) => {
        this.errors = error.response.data.errors;
        console.log("error", this.errors);
        if (this.errors.affiliate_id) {
          this.dialog1 = true;
        }
      }).finally(() => {
      });
    },
    searchAffiliates(item, queryText, itemText) {
      const searchText = queryText.toLowerCase();
      return item.AffiliateId < 0 || item.AffiliateName.toLowerCase().indexOf(searchText) > -1 || item.AffiliateNumber.toLowerCase().indexOf(searchText) > -1;
    },
    selectAffiliate(affiliateId) {
    },
    getAffiliateLabel(affiliate) {
      let label = affiliate.AffiliateName;
      if (affiliate.AffiliateId > 0) {
        label += " (" + affiliate.AffiliateNumber + ")";
      }
      return label;
    },
    loadDefaultAffiliates() {
      if (this.affiliates.length === 1 && this.affiliates.pop().AffiliateName === this.selectedAffiliate.AffiliateName) {
        axios.post("/api/v2/search/affiliate?scope=global", {
          search: ""
        }).then((response) => {
          if (this.affiliates.indexOf((affiliate) => {
            return affiliate.AffiliateName === this.selectedAffiliate.AffiliateName;
          }) !== -1) {
            this.affiliates = [];
          }
          this.affiliates = this.affiliates.concat(response.data.data);
          if (response.data.meta.last_page > 1) {
            this.affiliates.push({ AffiliateName: '<strong style="color:#092a5c;">Click to see all affiliates here >></strong>', AffiliateNumber: "", AffiliateId: -1 });
          }
        });
      }
    }
  },
  watch: {
    affiliatesSearchText(text) {
      this.debounceInput(text);
    },
    memberFormType: function(value) {
      const selectedTypes = value;
      if (selectedTypes && selectedTypes.length > 1 && selectedTypes.includes("9")) {
        this.dialog = true;
        this.memberFormType = ["9"];
      }
    }
  }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VForm, {
        ref: "form",
        modelValue: _ctx.valid,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.valid = $event)
      }, {
        default: withCtx(() => [
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, {
                cols: "12",
                sm: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    label: "Selected Affiliate",
                    modelValue: _ctx.selectedAffiliateId,
                    "onUpdate:modelValue": [
                      _cache[0] || (_cache[0] = ($event) => _ctx.selectedAffiliateId = $event),
                      $options.selectAffiliate
                    ],
                    search: _ctx.affiliatesSearchText,
                    "onUpdate:search": _cache[1] || (_cache[1] = ($event) => _ctx.affiliatesSearchText = $event),
                    items: _ctx.affiliates,
                    customFilter: $options.searchAffiliates,
                    loading: _ctx.affiliatesSearchLoading,
                    "item-title": "AffiliateName",
                    "item-value": "AffiliateId",
                    variant: "underlined",
                    placeholder: "Select Affiliate",
                    "persistent-hint": "",
                    "hide-no-data": "",
                    rules: [_ctx.rules.required],
                    onClick: $options.loadDefaultAffiliates
                  }, {
                    [`item`]: withCtx(({ item }) => [
                      createTextVNode(
                        toDisplayString($options.getAffiliateLabel(item)),
                        1
                        /* TEXT */
                      )
                    ]),
                    progress: withCtx(() => [
                      createVNode(VProgressLinear, {
                        indeterminate: "",
                        height: "5",
                        color: "#3f98c9",
                        absolute: ""
                      })
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["modelValue", "search", "items", "customFilter", "loading", "rules", "onUpdate:modelValue", "onClick"])
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
                    items: _ctx.typesList,
                    multiple: _ctx.isMultiple,
                    label: "Collection Type",
                    "item-value": "value",
                    "item-title": "label",
                    modelValue: _ctx.memberFormType,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.memberFormType = $event),
                    variant: "underlined",
                    rules: [_ctx.rules.required],
                    "item-props": { disabled: $options.isOptionDisabled }
                  }, null, 8, ["items", "multiple", "modelValue", "rules", "item-props"])
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
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.dialog = $event),
            persistent: "",
            "max-width": "290"
          }, {
            default: withCtx(() => [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle),
                  createVNode(VCardText, null, {
                    default: withCtx(() => _cache[8] || (_cache[8] = [
                      createTextVNode('as you have selected "All templates", other options are disabled')
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        color: "green-darken-1",
                        variant: "text",
                        onClick: _cache[3] || (_cache[3] = ($event) => _ctx.dialog = false)
                      }, {
                        default: withCtx(() => _cache[9] || (_cache[9] = [
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
          createVNode(VDialog, {
            modelValue: _ctx.dialog1,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.dialog1 = $event),
            persistent: "",
            "max-width": "290"
          }, {
            default: withCtx(() => [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle),
                  createVNode(VCardText, null, {
                    default: withCtx(() => _cache[10] || (_cache[10] = [
                      createTextVNode("This affiliate has already been taken, please choose a different one")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        color: "green-darken-1",
                        variant: "text",
                        onClick: _cache[5] || (_cache[5] = ($event) => _ctx.dialog1 = false)
                      }, {
                        default: withCtx(() => _cache[11] || (_cache[11] = [
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
                    to: { name: "memberFormsList" }
                  }, {
                    default: withCtx(() => _cache[12] || (_cache[12] = [
                      createTextVNode("Cancel")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    size: "large",
                    color: "green",
                    onClick: $options.saveMemberFormAssign
                  }, {
                    default: withCtx(() => _cache[13] || (_cache[13] = [
                      createTextVNode("Save Changes")
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
      }, 8, ["modelValue"])
    ]),
    _: 1
    /* STABLE */
  });
}
const MemberFormCreateComponent = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Create/MemberFormCreateComponent.vue"]]);
const _sfc_main$6 = {
  name: "ContentBlockEditComponent",
  data: () => ({
    memberFormAssignId: null,
    affiliates: [],
    affiliatesSearchText: null,
    affiliatesSearchLoading: false,
    selectedAffiliateId: null,
    selectedAffiliate: null,
    editor: null,
    valid: true,
    rules: {
      required: (value) => !!value || "Required."
    },
    typesList: [
      { "value": "100", "label": "ALL templates" },
      { "value": "3", "label": "Payroll Deduction" },
      { "value": "4", "label": "Payroll Deduction and COPE" },
      { "value": "5", "label": "Payroll COPE" },
      { "value": "1", "label": "eDues" },
      { "value": "2", "label": "eDues and COPE" },
      { "value": "6", "label": "Recurring COPE" }
    ],
    memberFormType: null,
    isMultiple: true,
    dialog: false
  }),
  computed: {
    affiliateText() {
      if (this.selectedAffiliate) {
        return this.selectedAffiliate.AffiliateNumber + " - " + this.selectedAffiliate.AffiliateName;
      }
      return "Selected Affiliate";
    }
  },
  mounted() {
    this.getMemberForm(this.$route.params.id);
  },
  created() {
    this.debounceInput = debounce$1(function(search) {
      if (this.selectedAffiliate && search === this.selectedAffiliate.AffiliateName) {
        return;
      }
      this.affiliatesSearchLoading = true;
      axios.post("/api/v2/search/affiliate?scope=global", {
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
    isOptionDisabled(item) {
      return this.memberFormType && this.memberFormType.includes("100") && item.value !== "100";
    },
    getMemberForm(memberFormAssignId) {
      this.loading = true;
      axios.get("/admin/api/member-form-assign/" + memberFormAssignId).then((response) => {
        this.selectedAffiliate = response.data.affiliates ? response.data.affiliates : {};
        this.memberFormAssignId = response.data.id;
        this.selectedAffiliateId = response.data.affiliate_id;
        this.memberFormType = JSON.parse(response.data.type);
      }).finally(() => {
        this.loading = false;
      });
    },
    editMemberForm() {
      if (!this.$refs.form.validate()) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      axios.put("/admin/api/member-form-assign/" + this.memberFormAssignId, {
        affiliate_id: this.selectedAffiliateId,
        type: this.memberFormType
      }).then((response) => {
        this.$router.replace({ name: "memberFormsList" });
      }).catch((error) => {
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    },
    searchAffiliates(item, queryText, itemText) {
      const searchText = queryText.toLowerCase();
      return item.AffiliateId < 0 || item.AffiliateName.toLowerCase().indexOf(searchText) > -1 || item.AffiliateNumber.toLowerCase().indexOf(searchText) > -1;
    },
    selectAffiliate(affiliateId) {
    },
    getAffiliateLabel(affiliate) {
      let label = affiliate.AffiliateName;
      if (affiliate.AffiliateId > 0) {
        label += " (" + affiliate.AffiliateNumber + ")";
      }
      return label;
    },
    loadDefaultAffiliates() {
      if (this.affiliates.length === 1 && this.affiliates.pop().AffiliateName === this.selectedAffiliate.AffiliateName) {
        axios.post("/api/v2/search/affiliate?scope=global", {
          search: ""
        }).then((response) => {
          if (this.affiliates.indexOf((affiliate) => {
            return affiliate.AffiliateName === this.selectedAffiliate.AffiliateName;
          }) !== -1) {
            this.affiliates = [];
          }
          this.affiliates = this.affiliates.concat(response.data.data);
          if (response.data.meta.last_page > 1) {
            this.affiliates.push({ AffiliateName: '<strong style="color:#092a5c;">Click to see all affiliates here >></strong>', AffiliateNumber: "", AffiliateId: -1 });
          }
        });
      }
    }
  },
  watch: {
    affiliatesSearchText(text) {
      this.debounceInput(text);
    },
    memberFormType: function(value) {
      const selectedTypes = value;
      if (selectedTypes && selectedTypes.length > 1 && selectedTypes.includes("9")) {
        this.dialog = true;
        this.memberFormType = ["9"];
      }
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VForm, {
        ref: "form",
        modelValue: _ctx.valid,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.valid = $event)
      }, {
        default: withCtx(() => [
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, {
                cols: "12",
                sm: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    label: $options.affiliateText,
                    modelValue: _ctx.selectedAffiliateId,
                    "onUpdate:modelValue": [
                      _cache[0] || (_cache[0] = ($event) => _ctx.selectedAffiliateId = $event),
                      $options.selectAffiliate
                    ],
                    search: _ctx.affiliatesSearchText,
                    "onUpdate:search": _cache[1] || (_cache[1] = ($event) => _ctx.affiliatesSearchText = $event),
                    items: _ctx.affiliates,
                    customFilter: $options.searchAffiliates,
                    loading: _ctx.affiliatesSearchLoading,
                    "item-title": "AffiliateName",
                    "item-value": "AffiliateId",
                    variant: "underlined",
                    placeholder: $options.affiliateText,
                    "persistent-hint": "",
                    readonly: "",
                    "hide-no-data": "",
                    rules: [_ctx.rules.required],
                    onClick: $options.loadDefaultAffiliates
                  }, {
                    item: withCtx((data) => [
                      createTextVNode(
                        toDisplayString($options.getAffiliateLabel(data.item)),
                        1
                        /* TEXT */
                      )
                    ]),
                    progress: withCtx(() => [
                      createVNode(VProgressLinear, {
                        indeterminate: "",
                        height: "5",
                        color: "#3f98c9",
                        absolute: ""
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label", "modelValue", "search", "items", "customFilter", "loading", "placeholder", "rules", "onUpdate:modelValue", "onClick"])
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
                    items: _ctx.typesList,
                    multiple: _ctx.isMultiple,
                    label: "Collection Type",
                    "item-value": "value",
                    "item-title": "label",
                    rules: [_ctx.rules.required],
                    modelValue: _ctx.memberFormType,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.memberFormType = $event),
                    variant: "underlined",
                    "item-props": { disabled: $options.isOptionDisabled }
                  }, null, 8, ["items", "multiple", "rules", "modelValue", "item-props"])
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
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.dialog = $event),
            persistent: "",
            "max-width": "290"
          }, {
            default: withCtx(() => [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle),
                  createVNode(VCardText, null, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode('as you have selected "All templates", other options are disabled')
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        color: "green-darken-1",
                        variant: "text",
                        onClick: _cache[3] || (_cache[3] = ($event) => _ctx.dialog = false)
                      }, {
                        default: withCtx(() => _cache[7] || (_cache[7] = [
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
                    to: { name: "memberFormsList" }
                  }, {
                    default: withCtx(() => _cache[8] || (_cache[8] = [
                      createTextVNode("Cancel")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    size: "large",
                    color: "green",
                    onClick: $options.editMemberForm
                  }, {
                    default: withCtx(() => _cache[9] || (_cache[9] = [
                      createTextVNode("Save Changes")
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
      }, 8, ["modelValue"])
    ]),
    _: 1
    /* STABLE */
  });
}
const MemberFormEditComponent = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Edit/MemberFormEditComponent.vue"]]);
const _sfc_main$5 = {
  name: "MemberFormListComponent",
  data: () => ({
    loading: false,
    headers: [
      { title: "AffiliateName", value: "affiliates.AffiliateName" },
      { title: "AffiliateNumber", value: "affiliates.AffiliateNumber" },
      { title: "Type", value: "type" },
      { title: "Edit", value: "edit" },
      { title: "Delete", value: "delete" }
    ],
    options: {
      page: 1,
      itemsPerPage: 15
    },
    memberForms: [],
    memberFormAssignTotal: 0,
    typesList: [
      { "value": "3", "label": "Payroll Deduction" },
      { "value": "4", "label": "Payroll Deduction and COPE" },
      { "value": "5", "label": "Payroll COPE" },
      { "value": "1", "label": "eDues" },
      { "value": "2", "label": "eDues and COPE" },
      { "value": "6", "label": "Recurring COPE" },
      { "value": "100", "label": "ALL templates" }
    ],
    dialog: false,
    memberFormAssignId: null,
    searchAffiliateNumberValue: null,
    searchAffiliateNameValue: null,
    searchFormTypeValue: null
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
      immediate: true
    },
    searchAffiliateNumberValue: function(value) {
      this.searchAffiliateNumber(value);
    },
    searchAffiliateNameValue: function(value) {
      this.searchAffiliateName(value);
    },
    searchFormTypeValue: function(value) {
      this.searchFormType(value);
    }
  },
  methods: {
    searchAffiliateNumber: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    searchAffiliateName: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    searchFormType: debounce$1(function(search) {
      this.getDataFromApi();
    }, 500),
    getDataFromApi() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      axios.post(
        "/admin/api/member-form-assign/search?page=" + page + "&perPage=" + itemsPerPage,
        {
          affiliateNumber: this.searchAffiliateNumberValue,
          affiliateName: this.searchAffiliateNameValue,
          formType: this.searchFormTypeValue
        }
      ).then((response) => {
        console.log({ data: response.data });
        this.memberForms = response.data.data;
        this.memberForms.forEach((i) => i.type = JSON.parse(i.type));
        this.options.itemsPerPage = response.data.meta.per_page;
        this.memberFormAssignTotal = response.data.meta.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    openDeleteMemberForm(memberFormId) {
      this.dialog = true;
      this.memberFormAssignId = memberFormId;
    },
    deleteContentBlock() {
      this.dialog = false;
      axios.delete("/admin/api/member-form-assign/" + this.memberFormAssignId).then((response) => {
        this.getDataFromApi();
      }).catch((error) => {
      }).finally(() => {
      });
    },
    displayTypes(types) {
      const typeMap = {
        "1": "eDues",
        "2": "eDues and COPE",
        "3": "Payroll Deduction",
        "4": "Payroll Deduction and COPE",
        "5": "Payroll COPE",
        "6": "Recurring COPE",
        "100": "ALL templates",
        "101": "ALL eDues templates",
        "102": "ALL Payroll templates"
      };
      return types.map((type) => typeMap[type]).join(", ");
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#4caf50",
                to: { name: "memberFormCreate" }
              }, {
                default: withCtx(() => _cache[6] || (_cache[6] = [
                  createTextVNode(" ASSIGN TEMPLATE ")
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
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.searchAffiliateNameValue,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.searchAffiliateNameValue = $event),
                label: "Search by Affiliate name",
                variant: "underlined",
                clearable: ""
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.searchAffiliateNumberValue,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.searchAffiliateNumberValue = $event),
                label: "Search by Affiliate number",
                clearable: "",
                variant: "underlined"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "3"
          }, {
            default: withCtx(() => [
              createVNode(VSelect, {
                items: _ctx.typesList,
                label: "Search by Form Type",
                "item-value": "value",
                "item-title": "label",
                clearable: "",
                modelValue: _ctx.searchFormTypeValue,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.searchFormTypeValue = $event),
                variant: "underlined",
                multiple: true
              }, null, 8, ["items", "modelValue"])
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VDataTableServer, {
                options: _ctx.options,
                "onUpdate:options": _cache[3] || (_cache[3] = ($event) => _ctx.options = $event),
                loading: _ctx.loading,
                headers: _ctx.headers,
                items: _ctx.memberForms,
                "item-key": _ctx.memberForms.id,
                "items-length": _ctx.memberFormAssignTotal,
                "disable-sort": ""
              }, {
                [`item.type`]: withCtx(({ item }) => [
                  createBaseVNode(
                    "span",
                    null,
                    toDisplayString($options.displayTypes(item.type)),
                    1
                    /* TEXT */
                  )
                ]),
                [`item.edit`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    icon: "mdi:mdi-comment-edit",
                    color: "primary",
                    variant: "text",
                    to: { name: "memberFormEdit", params: { id: item.id } }
                  }, null, 8, ["to"])
                ]),
                [`item.delete`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    icon: "mdi:mdi-delete",
                    color: "red",
                    variant: "text",
                    onClick: ($event) => $options.openDeleteMemberForm(item.id)
                  }, null, 8, ["onClick"])
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["options", "loading", "headers", "items", "item-key", "items-length"])
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
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.dialog = $event),
        persistent: "",
        "max-width": "290"
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[7] || (_cache[7] = [
                  createTextVNode("Are you sure?")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode("This record will be deleted permanently.")
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
                    onClick: _cache[4] || (_cache[4] = ($event) => _ctx.dialog = false)
                  }, {
                    default: withCtx(() => _cache[9] || (_cache[9] = [
                      createTextVNode("NO")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: $options.deleteContentBlock
                  }, {
                    default: withCtx(() => _cache[10] || (_cache[10] = [
                      createTextVNode("YES")
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
      }, 8, ["modelValue"])
    ]),
    _: 1
    /* STABLE */
  });
}
const MemberFormListComponent = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/List/MemberFormListComponent.vue"]]);
const _sfc_main$4 = {
  name: "ReleaseNoteCreateComponent",
  components: {
    Editor
  },
  data: () => ({
    editor: null,
    releaseNoteId: null,
    releaseNote: {
      title: null,
      description: " ",
      is_active: false,
      order: 0
    }
  }),
  methods: {
    saveReleaseNote() {
      axios.post("/admin/api/release-note", this.releaseNote).then((response) => {
        this.$router.replace({ name: "releaseNoteList" });
      }).catch((error) => {
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    }
  }
};
const _hoisted_1$2 = { class: "mt-4" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = resolveComponent("Editor");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "10" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                class: "textFieldHeader",
                modelValue: _ctx.releaseNote.title,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.releaseNote.title = $event),
                label: "Title",
                variant: "underlined"
              }, null, 8, ["modelValue"]),
              createBaseVNode("div", _hoisted_1$2, [
                createVNode(VLabel, null, {
                  default: withCtx(() => _cache[4] || (_cache[4] = [
                    createTextVNode("Description")
                  ])),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_Editor, {
                  modelValue: _ctx.releaseNote.description,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.releaseNote.description = $event),
                  "upload-url": "/admin/api/content-block/uploadFile"
                }, null, 8, ["modelValue"])
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VSwitch, {
                label: "Published",
                modelValue: _ctx.releaseNote.is_active,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.releaseNote.is_active = $event)
              }, null, 8, ["modelValue"]),
              createVNode(VTextField, {
                class: "textFieldHeader",
                modelValue: _ctx.releaseNote.order,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.releaseNote.order = $event),
                label: "Order",
                variant: "underlined"
              }, null, 8, ["modelValue"])
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
                to: { name: "releaseNoteList" }
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: $options.saveReleaseNote
              }, {
                default: withCtx(() => _cache[6] || (_cache[6] = [
                  createTextVNode("Save Changes")
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
  });
}
const ReleaseNoteCreateComponent = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-7b3537f7"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Create/ReleaseNoteCreateComponent.vue"]]);
const _sfc_main$3 = {
  name: "ReleaseNoteEditComponent",
  components: {
    Editor
  },
  data: () => ({
    editor: null,
    releaseNoteId: null,
    releaseNote: {
      title: null,
      description: " ",
      is_active: false,
      order: 0
    }
  }),
  mounted() {
    this.getReleaseNote(this.$route.params.id);
  },
  methods: {
    getReleaseNote(releaseNoteId) {
      this.loading = true;
      axios.get("/admin/api/release-note/" + releaseNoteId).then((response) => {
        this.releaseNoteId = response.data.id;
        this.releaseNote = response.data;
        if (response.data.is_active == 1) {
          this.releaseNote.is_active = true;
        } else {
          this.releaseNote.is_active = false;
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    editReleaseNote() {
      axios.put("/admin/api/release-note/" + this.releaseNoteId, this.releaseNote).then((response) => {
        this.$router.replace({ name: "releaseNoteList" });
      }).catch((error) => {
        this.errors = error.response.data.errors;
      }).finally(() => {
      });
    }
  }
};
const _hoisted_1$1 = { class: "mt-4" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = resolveComponent("Editor");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "10" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                class: "textFieldHeader",
                modelValue: _ctx.releaseNote.title,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.releaseNote.title = $event),
                label: "Title",
                variant: "underlined"
              }, null, 8, ["modelValue"]),
              createBaseVNode("div", _hoisted_1$1, [
                createVNode(VLabel, null, {
                  default: withCtx(() => _cache[4] || (_cache[4] = [
                    createTextVNode("Description")
                  ])),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_Editor, {
                  modelValue: _ctx.releaseNote.description,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.releaseNote.description = $event),
                  "upload-url": "/admin/api/content-block/uploadFile"
                }, null, 8, ["modelValue"])
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
              createVNode(VSwitch, {
                label: "published",
                modelValue: _ctx.releaseNote.is_active,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.releaseNote.is_active = $event)
              }, null, 8, ["modelValue"]),
              createVNode(VTextField, {
                class: "textFieldHeader",
                modelValue: _ctx.releaseNote.order,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.releaseNote.order = $event),
                label: "Order",
                variant: "underlined"
              }, null, 8, ["modelValue"])
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
                to: { name: "releaseNoteList" }
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: $options.editReleaseNote
              }, {
                default: withCtx(() => _cache[6] || (_cache[6] = [
                  createTextVNode("Save Changes")
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
  });
}
const ReleaseNoteEditComponent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-2fc514c4"], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Edit/ReleaseNoteEditComponent.vue"]]);
const _sfc_main$2 = {
  name: "ReleaseNoteListComponent",
  data: () => ({
    loading: false,
    headers: [
      { title: "Title", value: "title" },
      { title: "Published", value: "is_active" },
      { title: "Order", value: "order" },
      { title: "Created", value: "created_at" },
      { title: "Updated", value: "updated_at" },
      { title: "Edit", value: "edit" },
      { title: "Delete", value: "delete" }
    ],
    options: {
      page: 1,
      itemsPerPage: 15
    },
    releaseNotes: [],
    releaseNoteTotal: 0,
    dialog: false,
    releaseNoteId: null
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      axios.get(
        "/admin/api/release-note?page=" + page + "&perPage=" + itemsPerPage
      ).then((response) => {
        this.releaseNotes = response.data.data;
        this.options.itemsPerPage = response.data.per_page;
        this.releaseNoteTotal = response.data.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    openDeleteReleaseNote(releaseNoteId) {
      this.dialog = true;
      this.releaseNoteId = releaseNoteId;
    },
    deleteReleaseNote() {
      this.dialog = false;
      axios.delete("/admin/api/release-note/" + this.releaseNoteId).then((response) => {
        this.getDataFromApi();
      }).catch((error) => {
      }).finally(() => {
      });
    }
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "#4caf50",
                to: { name: "releaseNoteCreate" }
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode(" Create Release Note ")
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VDataTableServer, {
                options: _ctx.options,
                "onUpdate:options": _cache[0] || (_cache[0] = ($event) => _ctx.options = $event),
                loading: _ctx.loading,
                headers: _ctx.headers,
                items: _ctx.releaseNotes,
                "item-key": _ctx.releaseNotes.id,
                "items-length": _ctx.releaseNoteTotal,
                "disable-sort": ""
              }, {
                [`item.is_active`]: withCtx((props) => [
                  props.item.is_active == 1 ? (openBlock(), createElementBlock("span", _hoisted_1, " Yes ")) : createCommentVNode("v-if", true),
                  props.item.is_active == 0 ? (openBlock(), createElementBlock("span", _hoisted_2, " No ")) : createCommentVNode("v-if", true)
                ]),
                [`item.edit`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    icon: "mdi:mdi-comment-edit",
                    color: "primary",
                    variant: "text",
                    to: { name: "releaseNoteEdit", params: { id: item.id } }
                  }, null, 8, ["to"])
                ]),
                [`item.delete`]: withCtx(({ item }) => [
                  createVNode(VBtn, {
                    icon: "mdi:mdi-delete",
                    color: "red",
                    variant: "text",
                    onClick: ($event) => $options.openDeleteReleaseNote(item.id)
                  }, null, 8, ["onClick"])
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["options", "loading", "headers", "items", "item-key", "items-length"])
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
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode("Are you sure?")
                ])),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("This record will be deleted permanently.")
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
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.dialog = false)
                  }, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode("NO")
                    ])),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(VBtn, {
                    color: "green-darken-1",
                    variant: "text",
                    onClick: $options.deleteReleaseNote
                  }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode("YES")
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
      }, 8, ["modelValue"])
    ]),
    _: 1
    /* STABLE */
  });
}
const ReleaseNoteListComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/List/ReleaseNoteListComponent.vue"]]);
const router = createRouter({
  history: createWebHistory("/admin"),
  routes: [
    { path: "/", component: DashboardComponent, name: "dashboard", meta: { displayName: "Dashboard", icon: "mdi:mdi-view-dashboard" } },
    {
      path: "/content-blocks",
      component: RouterView,
      meta: { displayName: "Content Blocks", icon: "mdi:mdi-comment-alert" },
      children: [
        { path: "", component: ContentBlockListComponent, name: "contentBlockList", meta: { displayName: "Content Block List", icon: "mdi:mdi-comment-multiple" } },
        { path: "create", component: ContentBlockCreateComponent, name: "contentBlockCreate", meta: { displayName: "Create Content Block", icon: "mdi:mdi-comment-plus" } },
        { path: ":id", component: ContentBlockEditComponent, name: "contentBlockEdit", meta: { displayName: "Edit Content Block", icon: "mdi:mdi-comment-edit" } }
      ]
    },
    {
      path: "/user",
      component: RouterView,
      meta: { displayName: "Users", icon: "mdi:mdi-account-group" },
      children: [
        { path: "", component: UserListComponent, name: "userList", meta: { displayName: "Users List", icon: "mdi:mdi-account-group" } },
        { path: "create", component: UserCreateComponent, name: "userCreate", meta: { displayName: "Create User", icon: "mdi:mdi-account-plus" } },
        { path: ":id", component: UserEditComponent, name: "userEdit", meta: { displayName: "User Edit", icon: "mdi:mdi-account-edit" } }
      ]
    },
    {
      path: "/mfp-forms",
      component: RouterView,
      meta: { displayName: "MFP All Forms", icon: "mdi:mdi-format-list-checkbox" },
      children: [
        { path: "", component: MfpListComponent, name: "formList", meta: { displayName: "MFP All Forms List", icon: "mdi:mdi-account-group" } }
      ]
    },
    {
      path: "/jobclass",
      component: RouterView,
      meta: { displayName: "Job Classes", icon: "mdi:mdi-alpha-j-circle" },
      children: [
        { path: "", component: JobClassListComponent, name: "jobClassList", meta: { displayName: "Job Classes", icon: "mdi:mdi-alpha-j-circle" } },
        { path: "create", component: LocalJobClassCreateComponent, name: "jobclassCreate", meta: { displayName: "LocalJobClass Create", icon: "mdi:mdi-account-plus" } },
        { path: ":id", component: LocalJobClassEditComponent, name: "localJobClassEdit", meta: { displayName: "LocalJobClass Edit", icon: "mdi:mdi-account-edit" } }
      ]
    },
    //   { path: '/activity', component: ActivityListComponent, name: 'activityList', meta: { displayName: 'Activity', icon: 'mdi:mdi-format-list-checks', divider: true } },
    //   { path: '/individual', component: IndividualListComponent, name: 'individualList', meta: { displayName: 'Individuals', icon: 'mdi:mdi-alpha-i-circle' } },
    //   { path: '/jobclass', component: JobClassListComponent, name: 'jobClassList', meta: { displayName: 'Job Classes', icon: 'mdi:mdi-alpha-j-circle' } },
    //   { path: '/unit', component: UnitListComponent, name: 'unitList', meta: { displayName: 'Units', icon: 'mdi:mdi-alpha-u-circle' } },
    //   { path: '/localagreement', component: LocalAgreementListComponent, name: 'localAgreementList', meta: { displayName: 'Local Agreements', icon: 'mdi:mdi-alpha-l-circle' } },
    //   { path: '/chapter', component: ChapterListComponent, name: 'chapterList', meta: { displayName: 'Chapters', icon: 'mdi:mdi-alpha-c-circle' } },
    //   { path: '/affiliate', component: AffiliateListComponent, name: 'affiliateList', meta: { displayName: 'Affiliates', icon: 'mdi:mdi-alpha-a-circle' } },
    {
      path: "/member-forms",
      component: RouterView,
      meta: { displayName: "MFP Templates", icon: "mdi:mdi-comment-alert" },
      children: [
        { path: "", component: MemberFormListComponent, name: "memberFormsList", meta: { displayName: "MFP Template Assignment", icon: "mdi:mdi-comment-multiple" } },
        { path: "create", component: MemberFormCreateComponent, name: "memberFormCreate", meta: { displayName: "ASSIGN TEMPLATE", icon: "mdi:mdi-comment-plus" } },
        { path: ":id", component: MemberFormEditComponent, name: "memberFormEdit", meta: { displayName: "ASSIGN TEMPLATE", icon: "mdi:mdi-comment-plus" } }
      ]
    },
    {
      path: "/release-notes",
      component: RouterView,
      meta: { displayName: "Release Notes", icon: "mdi:mdi-format-list-checkbox" },
      children: [
        { path: "", component: ReleaseNoteListComponent, name: "releaseNoteList", meta: { displayName: "Release Notes List", icon: "mdi:mdi-comment-multiple" } },
        { path: "create", component: ReleaseNoteCreateComponent, name: "releaseNoteCreate", meta: { displayName: "Create Release Note", icon: "mdi:mdi-comment-plus" } },
        { path: ":id", component: ReleaseNoteEditComponent, name: "releaseNoteEdit", meta: { displayName: "Edit Release Note", icon: "mdi:mdi-comment-edit" } }
      ]
    }
  ]
});
const _sfc_main$1 = {
  data: () => ({
    currentDateTime: ""
  }),
  created() {
    setInterval(this.getCurrentTime, 1e3);
    this.getCurrentTime();
  },
  methods: {
    getCurrentTime() {
      const now = /* @__PURE__ */ new Date();
      now.getFullYear();
      now.getMonth() + 1;
      now.getDate();
      this.currentDateTime = /* @__PURE__ */ new Date();
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VFooter, { app: "" }, {
    default: withCtx(() => [
      createBaseVNode(
        "span",
        null,
        toDisplayString(_ctx.currentDateTime),
        1
        /* TEXT */
      )
    ]),
    _: 1
    /* STABLE */
  });
}
const FooterComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/html/packages/aft/admin/resources/js/components/Common/FooterComponent.vue"]]);
const _sfc_main = {
  components: {
    FooterComponent
  },
  setup() {
    const drawer = ref(true);
    const currentRoute = useRoute();
    const router2 = useRouter();
    const routes = router2.options.routes;
    return {
      drawer,
      currentRoute,
      routes
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  const _component_footer_component = resolveComponent("footer-component");
  return openBlock(), createBlock(VApp, null, {
    default: withCtx(() => [
      createVNode(VAppBar, { density: "compact" }, {
        default: withCtx(() => [
          createVNode(VContainer, { class: "d-flex ga-2 align-center" }, {
            default: withCtx(() => [
              createVNode(VAppBarNavIcon, {
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $setup.drawer = !$setup.drawer, ["stop"]))
              }),
              createVNode(VAppBarTitle, null, {
                default: withCtx(() => [
                  createVNode(VIcon, {
                    icon: $setup.currentRoute.meta.icon
                  }, null, 8, ["icon"]),
                  createTextVNode(
                    " " + toDisplayString($setup.currentRoute.meta.displayName),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VSpacer),
              createVNode(VToolbarItems, { class: "pr-4" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    href: "/",
                    "prepend-icon": "mdi:mdi-home"
                  }, {
                    default: withCtx(() => _cache[2] || (_cache[2] = [
                      createTextVNode(" Back to Connect ")
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
      }),
      createVNode(VNavigationDrawer, {
        modelValue: $setup.drawer,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.drawer = $event),
        temporary: ""
      }, {
        default: withCtx(() => [
          createVNode(VList, { density: "compact" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList($setup.routes, (route) => {
                  return openBlock(), createElementBlock(
                    Fragment,
                    {
                      key: route.path
                    },
                    [
                      createVNode(VListItem, {
                        to: route.path,
                        link: "",
                        "prepend-icon": route.meta.icon
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
                      }, 1032, ["to", "prepend-icon"]),
                      route.divider ? (openBlock(), createBlock(VDivider, { key: 0 })) : createCommentVNode("v-if", true)
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
      }, 8, ["modelValue"]),
      createVNode(VMain, null, {
        default: withCtx(() => [
          createVNode(VContainer, null, {
            default: withCtx(() => [
              createVNode(_component_router_view)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_footer_component)
    ]),
    _: 1
    /* STABLE */
  });
}
const adminApp = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/html/packages/aft/admin/resources/js/adminApp.vue"]]);
const app = createApp(adminApp);
app.use(router);
app.use(vuetify);
app.mount("#app");
//# sourceMappingURL=app-CiuMhKQi.js.map
