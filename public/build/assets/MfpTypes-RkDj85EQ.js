import { aP as Popper, au as axios, aQ as defineComponent, aS as h, _ as _export_sfc, k as createBlock, o as openBlock, w as withCtx, x as createCommentVNode, a3 as VTooltip, r as createBaseVNode, y as toDisplayString, l as createVNode, ay as VIcon, a0 as mergeProps, v as createElementBlock, t as createTextVNode, M as VTextField, b0 as mergeModels, b1 as useModel, b2 as computed, S as Fragment, aq as VLabel, a$ as VSheet, B as VAutocomplete, C as resolveComponent, F as VCardTitle, u as VCheckbox, G as VCardText, E as VCard, J as VCol, I as VRow, bL as isValid, $ as VDatePicker, Z as VMenu, K as VSelect, W as withDirectives, at as vShow, N as VCardActions, O as VSpacer, s as VBtn, A as normalizeClass, aw as VTextarea, af as VRadioGroup, ag as VRadio, T as renderList, bC as resolveDynamicComponent, bM as VCardSubtitle, V as VContainer, U as VDialog, a7 as useGoTo, av as VImg, H as VAlert, as as withModifiers, D as VForm, ao as VProgressCircular, am as VOverlay, ac as Scroll } from "./vuetify-EeS5qzD-.js";
import { a0 as Essentials, a1 as Paragraph, a2 as Bold, a3 as Italic, a4 as Underline, a5 as FontSize, a8 as Alignment, a9 as List, aa as Link, ab as AutoLink, ac as _sfc_main$f, ad as ClassicEditor } from "./ckeditor5-5vcNS2fJ.js";
import { d as debounce } from "./debounce-DRMZstlG.js";
window.Popper = Popper;
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
/*!
 * Signature Pad v3.0.0-beta.4 | https://github.com/szimek/signature_pad
 * (c) 2020 Szymon Nowak | Released under the MIT license
 */
class Point {
  constructor(x, y, time) {
    this.x = x;
    this.y = y;
    this.time = time || Date.now();
  }
  distanceTo(start) {
    return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
  }
  equals(other) {
    return this.x === other.x && this.y === other.y && this.time === other.time;
  }
  velocityFrom(start) {
    return this.time !== start.time ? this.distanceTo(start) / (this.time - start.time) : 0;
  }
}
class Bezier {
  constructor(startPoint, control2, control1, endPoint, startWidth, endWidth) {
    this.startPoint = startPoint;
    this.control2 = control2;
    this.control1 = control1;
    this.endPoint = endPoint;
    this.startWidth = startWidth;
    this.endWidth = endWidth;
  }
  static fromPoints(points, widths) {
    const c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
    const c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
    return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
  }
  static calculateControlPoints(s1, s2, s3) {
    const dx1 = s1.x - s2.x;
    const dy1 = s1.y - s2.y;
    const dx2 = s2.x - s3.x;
    const dy2 = s2.y - s3.y;
    const m1 = { x: (s1.x + s2.x) / 2, y: (s1.y + s2.y) / 2 };
    const m2 = { x: (s2.x + s3.x) / 2, y: (s2.y + s3.y) / 2 };
    const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const dxm = m1.x - m2.x;
    const dym = m1.y - m2.y;
    const k = l2 / (l1 + l2);
    const cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
    const tx = s2.x - cm.x;
    const ty = s2.y - cm.y;
    return {
      c1: new Point(m1.x + tx, m1.y + ty),
      c2: new Point(m2.x + tx, m2.y + ty)
    };
  }
  length() {
    const steps = 10;
    let length = 0;
    let px;
    let py;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
      const cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
      if (i > 0) {
        const xdiff = cx - px;
        const ydiff = cy - py;
        length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      }
      px = cx;
      py = cy;
    }
    return length;
  }
  point(t, start, c1, c2, end) {
    return start * (1 - t) * (1 - t) * (1 - t) + 3 * c1 * (1 - t) * (1 - t) * t + 3 * c2 * (1 - t) * t * t + end * t * t * t;
  }
}
function throttle(fn, wait = 250) {
  let previous = 0;
  let timeout = null;
  let result;
  let storedContext;
  let storedArgs;
  const later = () => {
    previous = Date.now();
    timeout = null;
    result = fn.apply(storedContext, storedArgs);
    if (!timeout) {
      storedContext = null;
      storedArgs = [];
    }
  };
  return function wrapper(...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    storedContext = this;
    storedArgs = args;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(storedContext, storedArgs);
      if (!timeout) {
        storedContext = null;
        storedArgs = [];
      }
    } else if (!timeout) {
      timeout = window.setTimeout(later, remaining);
    }
    return result;
  };
}
class SignaturePad {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
    this._handleMouseDown = (event) => {
      if (event.which === 1) {
        this._mouseButtonDown = true;
        this._strokeBegin(event);
      }
    };
    this._handleMouseMove = (event) => {
      if (this._mouseButtonDown) {
        this._strokeMoveUpdate(event);
      }
    };
    this._handleMouseUp = (event) => {
      if (event.which === 1 && this._mouseButtonDown) {
        this._mouseButtonDown = false;
        this._strokeEnd(event);
      }
    };
    this._handleTouchStart = (event) => {
      event.preventDefault();
      if (event.targetTouches.length === 1) {
        const touch = event.changedTouches[0];
        this._strokeBegin(touch);
      }
    };
    this._handleTouchMove = (event) => {
      event.preventDefault();
      const touch = event.targetTouches[0];
      this._strokeMoveUpdate(touch);
    };
    this._handleTouchEnd = (event) => {
      const wasCanvasTouched = event.target === this.canvas;
      if (wasCanvasTouched) {
        event.preventDefault();
        const touch = event.changedTouches[0];
        this._strokeEnd(touch);
      }
    };
    this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
    this.minWidth = options.minWidth || 0.5;
    this.maxWidth = options.maxWidth || 2.5;
    this.throttle = "throttle" in options ? options.throttle : 16;
    this.minDistance = "minDistance" in options ? options.minDistance : 5;
    this.dotSize = options.dotSize || function dotSize() {
      return (this.minWidth + this.maxWidth) / 2;
    };
    this.penColor = options.penColor || "black";
    this.backgroundColor = options.backgroundColor || "rgba(0,0,0,0)";
    this.onBegin = options.onBegin;
    this.onEnd = options.onEnd;
    this._strokeMoveUpdate = this.throttle ? throttle(SignaturePad.prototype._strokeUpdate, this.throttle) : SignaturePad.prototype._strokeUpdate;
    this._ctx = canvas.getContext("2d");
    this.clear();
    this.on();
  }
  clear() {
    const { _ctx: ctx, canvas } = this;
    ctx.fillStyle = this.backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._data = [];
    this._reset();
    this._isEmpty = true;
  }
  fromDataURL(dataUrl, options = {}, callback) {
    const image = new Image();
    const ratio = options.ratio || window.devicePixelRatio || 1;
    const width = options.width || this.canvas.width / ratio;
    const height = options.height || this.canvas.height / ratio;
    this._reset();
    image.onload = () => {
      this._ctx.drawImage(image, 0, 0, width, height);
      if (callback) {
        callback();
      }
    };
    image.onerror = (error) => {
      if (callback) {
        callback(error);
      }
    };
    image.src = dataUrl;
    this._isEmpty = false;
  }
  toDataURL(type = "image/png", encoderOptions) {
    switch (type) {
      case "image/svg+xml":
        return this._toSVG();
      default:
        return this.canvas.toDataURL(type, encoderOptions);
    }
  }
  on() {
    this.canvas.style.touchAction = "none";
    this.canvas.style.msTouchAction = "none";
    if (window.PointerEvent) {
      this._handlePointerEvents();
    } else {
      this._handleMouseEvents();
      if ("ontouchstart" in window) {
        this._handleTouchEvents();
      }
    }
  }
  off() {
    this.canvas.style.touchAction = "auto";
    this.canvas.style.msTouchAction = "auto";
    this.canvas.removeEventListener("pointerdown", this._handleMouseDown);
    this.canvas.removeEventListener("pointermove", this._handleMouseMove);
    document.removeEventListener("pointerup", this._handleMouseUp);
    this.canvas.removeEventListener("mousedown", this._handleMouseDown);
    this.canvas.removeEventListener("mousemove", this._handleMouseMove);
    document.removeEventListener("mouseup", this._handleMouseUp);
    this.canvas.removeEventListener("touchstart", this._handleTouchStart);
    this.canvas.removeEventListener("touchmove", this._handleTouchMove);
    this.canvas.removeEventListener("touchend", this._handleTouchEnd);
  }
  isEmpty() {
    return this._isEmpty;
  }
  fromData(pointGroups) {
    this.clear();
    this._fromData(pointGroups, ({ color, curve }) => this._drawCurve({ color, curve }), ({ color, point }) => this._drawDot({ color, point }));
    this._data = pointGroups;
  }
  toData() {
    return this._data;
  }
  _strokeBegin(event) {
    const newPointGroup = {
      color: this.penColor,
      points: []
    };
    if (typeof this.onBegin === "function") {
      this.onBegin(event);
    }
    this._data.push(newPointGroup);
    this._reset();
    this._strokeUpdate(event);
  }
  _strokeUpdate(event) {
    if (this._data.length === 0) {
      this._strokeBegin(event);
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    const point = this._createPoint(x, y);
    const lastPointGroup = this._data[this._data.length - 1];
    const lastPoints = lastPointGroup.points;
    const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
    const isLastPointTooClose = lastPoint ? point.distanceTo(lastPoint) <= this.minDistance : false;
    const color = lastPointGroup.color;
    if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
      const curve = this._addPoint(point);
      if (!lastPoint) {
        this._drawDot({ color, point });
      } else if (curve) {
        this._drawCurve({ color, curve });
      }
      lastPoints.push({
        time: point.time,
        x: point.x,
        y: point.y
      });
    }
  }
  _strokeEnd(event) {
    this._strokeUpdate(event);
    if (typeof this.onEnd === "function") {
      this.onEnd(event);
    }
  }
  _handlePointerEvents() {
    this._mouseButtonDown = false;
    this.canvas.addEventListener("pointerdown", this._handleMouseDown);
    this.canvas.addEventListener("pointermove", this._handleMouseMove);
    document.addEventListener("pointerup", this._handleMouseUp);
  }
  _handleMouseEvents() {
    this._mouseButtonDown = false;
    this.canvas.addEventListener("mousedown", this._handleMouseDown);
    this.canvas.addEventListener("mousemove", this._handleMouseMove);
    document.addEventListener("mouseup", this._handleMouseUp);
  }
  _handleTouchEvents() {
    this.canvas.addEventListener("touchstart", this._handleTouchStart);
    this.canvas.addEventListener("touchmove", this._handleTouchMove);
    this.canvas.addEventListener("touchend", this._handleTouchEnd);
  }
  _reset() {
    this._lastPoints = [];
    this._lastVelocity = 0;
    this._lastWidth = (this.minWidth + this.maxWidth) / 2;
    this._ctx.fillStyle = this.penColor;
  }
  _createPoint(x, y) {
    const rect = this.canvas.getBoundingClientRect();
    return new Point(x - rect.left, y - rect.top, (/* @__PURE__ */ new Date()).getTime());
  }
  _addPoint(point) {
    const { _lastPoints } = this;
    _lastPoints.push(point);
    if (_lastPoints.length > 2) {
      if (_lastPoints.length === 3) {
        _lastPoints.unshift(_lastPoints[0]);
      }
      const widths = this._calculateCurveWidths(_lastPoints[1], _lastPoints[2]);
      const curve = Bezier.fromPoints(_lastPoints, widths);
      _lastPoints.shift();
      return curve;
    }
    return null;
  }
  _calculateCurveWidths(startPoint, endPoint) {
    const velocity = this.velocityFilterWeight * endPoint.velocityFrom(startPoint) + (1 - this.velocityFilterWeight) * this._lastVelocity;
    const newWidth = this._strokeWidth(velocity);
    const widths = {
      end: newWidth,
      start: this._lastWidth
    };
    this._lastVelocity = velocity;
    this._lastWidth = newWidth;
    return widths;
  }
  _strokeWidth(velocity) {
    return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
  }
  _drawCurveSegment(x, y, width) {
    const ctx = this._ctx;
    ctx.moveTo(x, y);
    ctx.arc(x, y, width, 0, 2 * Math.PI, false);
    this._isEmpty = false;
  }
  _drawCurve({ color, curve }) {
    const ctx = this._ctx;
    const widthDelta = curve.endWidth - curve.startWidth;
    const drawSteps = Math.floor(curve.length()) * 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    for (let i = 0; i < drawSteps; i += 1) {
      const t = i / drawSteps;
      const tt = t * t;
      const ttt = tt * t;
      const u = 1 - t;
      const uu = u * u;
      const uuu = uu * u;
      let x = uuu * curve.startPoint.x;
      x += 3 * uu * t * curve.control1.x;
      x += 3 * u * tt * curve.control2.x;
      x += ttt * curve.endPoint.x;
      let y = uuu * curve.startPoint.y;
      y += 3 * uu * t * curve.control1.y;
      y += 3 * u * tt * curve.control2.y;
      y += ttt * curve.endPoint.y;
      const width = Math.min(curve.startWidth + ttt * widthDelta, this.maxWidth);
      this._drawCurveSegment(x, y, width);
    }
    ctx.closePath();
    ctx.fill();
  }
  _drawDot({ color, point }) {
    const ctx = this._ctx;
    const width = typeof this.dotSize === "function" ? this.dotSize() : this.dotSize;
    ctx.beginPath();
    this._drawCurveSegment(point.x, point.y, width);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  _fromData(pointGroups, drawCurve, drawDot) {
    for (const group of pointGroups) {
      const { color, points } = group;
      if (points.length > 1) {
        for (let j = 0; j < points.length; j += 1) {
          const basicPoint = points[j];
          const point = new Point(basicPoint.x, basicPoint.y, basicPoint.time);
          this.penColor = color;
          if (j === 0) {
            this._reset();
          }
          const curve = this._addPoint(point);
          if (curve) {
            drawCurve({ color, curve });
          }
        }
      } else {
        this._reset();
        drawDot({
          color,
          point: points[0]
        });
      }
    }
  }
  _toSVG() {
    const pointGroups = this._data;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const minX = 0;
    const minY = 0;
    const maxX = this.canvas.width / ratio;
    const maxY = this.canvas.height / ratio;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", this.canvas.width.toString());
    svg.setAttribute("height", this.canvas.height.toString());
    this._fromData(pointGroups, ({ color, curve }) => {
      const path = document.createElement("path");
      if (!isNaN(curve.control1.x) && !isNaN(curve.control1.y) && !isNaN(curve.control2.x) && !isNaN(curve.control2.y)) {
        const attr = `M ${curve.startPoint.x.toFixed(3)},${curve.startPoint.y.toFixed(3)} C ${curve.control1.x.toFixed(3)},${curve.control1.y.toFixed(3)} ${curve.control2.x.toFixed(3)},${curve.control2.y.toFixed(3)} ${curve.endPoint.x.toFixed(3)},${curve.endPoint.y.toFixed(3)}`;
        path.setAttribute("d", attr);
        path.setAttribute("stroke-width", (curve.endWidth * 2.25).toFixed(3));
        path.setAttribute("stroke", color);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        svg.appendChild(path);
      }
    }, ({ color, point }) => {
      const circle = document.createElement("circle");
      const dotSize = typeof this.dotSize === "function" ? this.dotSize() : this.dotSize;
      circle.setAttribute("r", dotSize.toString());
      circle.setAttribute("cx", point.x.toString());
      circle.setAttribute("cy", point.y.toString());
      circle.setAttribute("fill", color);
      svg.appendChild(circle);
    });
    const prefix = "data:image/svg+xml;base64,";
    const header = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${minX} ${minY} ${maxX} ${maxY}" width="${maxX}" height="${maxY}">`;
    let body = svg.innerHTML;
    if (body === void 0) {
      const dummy = document.createElement("dummy");
      const nodes = svg.childNodes;
      dummy.innerHTML = "";
      for (let i = 0; i < nodes.length; i += 1) {
        dummy.appendChild(nodes[i].cloneNode(true));
      }
      body = dummy.innerHTML;
    }
    const footer = "</svg>";
    const data = header + body + footer;
    return prefix + btoa(data);
  }
}
var defaultOptions$1 = {
  format: "image/png",
  quality: 0.92,
  width: void 0,
  height: void 0,
  Canvas: void 0,
  crossOrigin: void 0
};
var mergeImages = function(sources, options) {
  if (sources === void 0) sources = [];
  if (options === void 0) options = {};
  return new Promise(function(resolve) {
    options = Object.assign({}, defaultOptions$1, options);
    var canvas = options.Canvas ? new options.Canvas() : window.document.createElement("canvas");
    var Image2 = options.Canvas ? options.Canvas.Image : window.Image;
    if (options.Canvas) {
      options.quality *= 100;
    }
    var images = sources.map(function(source) {
      return new Promise(function(resolve2, reject) {
        if (source.constructor.name !== "Object") {
          source = { src: source };
        }
        var img = new Image2();
        img.crossOrigin = options.crossOrigin;
        img.onerror = function() {
          return reject(new Error("Couldn't load image"));
        };
        img.onload = function() {
          return resolve2(Object.assign({}, source, { img }));
        };
        img.src = source.src;
      });
    });
    var ctx = canvas.getContext("2d");
    resolve(Promise.all(images).then(function(images2) {
      var getSize = function(dim) {
        return options[dim] || Math.max.apply(Math, images2.map(function(image) {
          return image.img[dim];
        }));
      };
      canvas.width = getSize("width");
      canvas.height = getSize("height");
      images2.forEach(function(image) {
        ctx.globalAlpha = image.opacity ? image.opacity : 1;
        return ctx.drawImage(image.img, image.x || 0, image.y || 0);
      });
      if (options.Canvas && options.format === "image/jpeg") {
        return new Promise(function(resolve2) {
          canvas.toDataURL(options.format, {
            quality: options.quality,
            progressive: false
          }, function(err, jpeg) {
            if (err) {
              throw err;
            }
            resolve2(jpeg);
          });
        });
      }
      return canvas.toDataURL(options.format, options.quality);
    }));
  });
};
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];
const checkSaveType = (type) => IMAGE_TYPES.includes(type);
const DEFAULT_OPTIONS = {
  dotSize: (0.5 + 2.5) / 2,
  minWidth: 0.5,
  maxWidth: 2.5,
  throttle: 16,
  minDistance: 5,
  backgroundColor: "rgba(0,0,0,0)",
  penColor: "black",
  velocityFilterWeight: 0.7,
  onBegin: () => {
  },
  onEnd: () => {
  }
};
const convert2NonReactive = (observerValue) => JSON.parse(JSON.stringify(observerValue));
const TRANSPARENT_PNG = {
  src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  x: 0,
  y: 0
};
var script = defineComponent({
  name: "VueSignaturePad",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    },
    images: {
      type: Array,
      default: () => []
    },
    scaleToDevicePixelRatio: {
      type: Boolean,
      default: () => true
    }
  },
  data: () => ({
    signaturePad: {},
    cacheImages: [],
    signatureData: TRANSPARENT_PNG,
    onResizeHandler: null
  }),
  computed: {
    propsImagesAndCustomImages() {
      const nonReactiveProrpImages = convert2NonReactive(this.images);
      const nonReactiveCachImages = convert2NonReactive(this.cacheImages);
      return [...nonReactiveProrpImages, ...nonReactiveCachImages];
    }
  },
  watch: {
    options: function(nextOptions) {
      Object.keys(nextOptions).forEach((option) => {
        if (this.signaturePad[option]) {
          this.signaturePad[option] = nextOptions[option];
        }
      });
    }
  },
  mounted() {
    const {
      options
    } = this;
    const canvas = this.$refs.signaturePadCanvas;
    const signaturePad = new SignaturePad(canvas, {
      ...DEFAULT_OPTIONS,
      ...options
    });
    this.signaturePad = signaturePad;
    if (options.resizeHandler) {
      this.resizeCanvas = options.resizeHandler.bind(this);
    }
    this.onResizeHandler = this.resizeCanvas.bind(this);
    window.addEventListener("resize", this.onResizeHandler, false);
    this.resizeCanvas();
  },
  beforeUnmount() {
    if (this.onResizeHandler) {
      window.removeEventListener("resize", this.onResizeHandler, false);
    }
  },
  methods: {
    resizeCanvas() {
      const canvas = this.$refs.signaturePadCanvas;
      const data = this.signaturePad.toData();
      const ratio = this.scaleToDevicePixelRatio ? Math.max(window.devicePixelRatio || 1, 1) : 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      this.signaturePad.clear();
      this.signatureData = TRANSPARENT_PNG;
      this.signaturePad.fromData(data);
    },
    saveSignature() {
      let type = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : IMAGE_TYPES[0];
      let encoderOptions = arguments.length > 1 ? arguments[1] : void 0;
      const {
        signaturePad
      } = this;
      const status = {
        isEmpty: false,
        data: void 0
      };
      if (!checkSaveType(type)) {
        const imageTypesString = IMAGE_TYPES.join(", ");
        throw new Error(`The Image type is incorrect! We are support ${imageTypesString} types.`);
      }
      if (signaturePad.isEmpty()) {
        return {
          ...status,
          isEmpty: true
        };
      } else {
        this.signatureData = signaturePad.toDataURL(type, encoderOptions);
        return {
          ...status,
          data: this.signatureData
        };
      }
    },
    undoSignature() {
      const {
        signaturePad
      } = this;
      const record = signaturePad.toData();
      if (record) {
        return signaturePad.fromData(record.slice(0, -1));
      }
    },
    mergeImageAndSignature(customSignature) {
      this.signatureData = customSignature;
      return mergeImages([...this.images, ...this.cacheImages, this.signatureData]);
    },
    addImages() {
      let images = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      this.cacheImages = [...this.cacheImages, ...images];
      return mergeImages([...this.images, ...this.cacheImages, this.signatureData]);
    },
    fromDataURL(data) {
      let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let callback = arguments.length > 2 ? arguments[2] : void 0;
      return this.signaturePad.fromDataURL(data, options, callback);
    },
    fromData(data) {
      return this.signaturePad.fromData(data);
    },
    toData() {
      return this.signaturePad.toData();
    },
    lockSignaturePad() {
      return this.signaturePad.off();
    },
    openSignaturePad() {
      return this.signaturePad.on();
    },
    isEmpty() {
      return this.signaturePad.isEmpty();
    },
    getPropImagesAndCacheImages() {
      return this.propsImagesAndCustomImages;
    },
    clearCacheImages() {
      this.cacheImages = [];
      return this.cacheImages;
    },
    clearSignature() {
      return this.signaturePad.clear();
    }
  },
  render() {
    const {
      width,
      height,
      customStyle
    } = this;
    return h("div", {
      style: {
        width,
        height,
        ...customStyle
      }
    }, [h("canvas", {
      style: {
        width,
        height
      },
      ref: "signaturePadCanvas"
    })]);
  }
});
script.__file = "src/components/VueSignaturePad.vue";
const phoneError1 = "Please enter a valid 10 digit phone number.";
const zipCodeError = "Please enter a valid 5 digit zip code.";
const _sfc_main$e = {
  name: "MfpTextField",
  props: {
    field: { type: Object, required: true },
    value: { type: String, default: null },
    outlined: { type: Boolean, default: false },
    solo: { type: Boolean, default: false },
    designer: { type: Boolean, default: false },
    max: { type: Number, default: 100 },
    parent: { type: Object, required: false, default: null }
  },
  data: () => ({
    text: null,
    rules: [],
    prefix: ""
  }),
  computed: {
    fieldLabel() {
      if (this.field.label) {
        return `${this.field.label}${this.field.required ? " (required)" : ""}`;
      }
      return "";
    }
  },
  watch: {
    text() {
      this.change();
    },
    parent: {
      deep: true,
      handler() {
        if (this.field.type === "home" || this.field.type === "mobile" || this.field.type === "work") {
          this.rules = [];
          if (this.isPhoneFormatApplicable()) {
            this.rules.push(
              (v) => !v || /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v) || phoneError1
            );
          }
        }
      }
    }
  },
  mounted() {
    this.text = this.value;
    this.rules.push((v) => !this.field.required || !!v || this.field.label + " is required");
    if (this.field.type === "email") {
      this.rules.push((v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid");
    }
    if (this.field.type === "home" || this.field.type === "mobile" || this.field.type === "work") {
      if (this.isPhoneFormatApplicable()) {
        this.rules.push(
          (v) => !v || /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v) || phoneError1
        );
      }
    }
    if (this.field.type === "amount") {
      this.prefix = "$";
      this.rules.push((v) => !v || /(?!0.00)(?=.*?\d)^\$?(([1-9]\d{0,2}(d{3})*)|\d+)?(\.[0-9]{2})?$/.test(v) || "Please enter a valid amount (00.00)");
    }
    if (this.field.label === "Zip Code") {
      this.rules.push((v) => /^\d{5}$/.test(v) || zipCodeError);
    }
    if (this.field.label === "Address Line 2") {
      this.field.label = "Suite/Apt";
    }
    this.change = debounce(() => {
      this.$emit("input", this.acceptInputText());
    }, 500);
  },
  methods: {
    acceptInputText() {
      if (this.field.type === "home" || this.field.type === "mobile" || this.field.type === "work") {
        if (this.isPhoneFormatApplicable()) {
          const x = this.text.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          this.text = !x[2] ? x[1] : `(${x[1]}) ${x[2]}-${x[3]}`;
          return this.revertPhoneFormat(this.text);
        }
      } else if (this.field.type === "amount") {
        return "$" + this.text;
      }
      return this.text;
    },
    revertPhoneFormat() {
      return this.text.replace(/[^\d]/g, "");
    },
    isPhoneFormatApplicable() {
      const formatApplicableCountryIds = [2, 4];
      if (this.parent.fields.phoneHomeCountry) {
        if (typeof this.parent.fields.phoneHomeCountry.value !== "undefined" && formatApplicableCountryIds.includes(this.parent.fields.phoneHomeCountry.value)) {
          return true;
        }
      } else if (this.parent.fields.phoneWorkCountry) {
        if (typeof this.parent.fields.phoneWorkCountry.value !== "undefined" && formatApplicableCountryIds.includes(this.parent.fields.phoneWorkCountry.value)) {
          return true;
        }
      } else if (this.parent.fields.phoneMobileCountry) {
        if (typeof this.parent.fields.phoneMobileCountry.value !== "undefined" && formatApplicableCountryIds.includes(this.parent.fields.phoneMobileCountry.value)) {
          return true;
        }
      }
      return false;
    }
  }
};
const _hoisted_1$9 = { key: 0 };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VTextField, {
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.text = $event),
    variant: "underlined",
    disabled: $props.field.disabled,
    rules: _ctx.rules,
    prefix: _ctx.prefix,
    "hide-details": "auto"
  }, {
    label: withCtx(() => [
      $props.field.required ? (openBlock(), createElementBlock("span", _hoisted_1$9, _cache[1] || (_cache[1] = [
        createBaseVNode(
          "strong",
          { class: "text-red" },
          " * ",
          -1
          /* HOISTED */
        )
      ]))) : createCommentVNode("v-if", true),
      createTextVNode(
        " " + toDisplayString($options.fieldLabel),
        1
        /* TEXT */
      )
    ]),
    "append-inner": withCtx(() => [
      $props.field.tooltip ? (openBlock(), createBlock(VTooltip, {
        key: 0,
        location: "right",
        color: "primary-darken-2"
      }, {
        activator: withCtx(({ props }) => [
          createVNode(
            VIcon,
            mergeProps({
              icon: "mdi:mdi-information-outline",
              class: "ml-4"
            }, props),
            null,
            16
            /* FULL_PROPS */
          )
        ]),
        default: withCtx(() => [
          createBaseVNode(
            "span",
            null,
            toDisplayString($props.field.toolText),
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
  }, 8, ["modelValue", "disabled", "rules", "prefix"]);
}
const MfpTextField = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-0b73deff"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpTextField.vue"]]);
const _sfc_main$d = {
  __name: "MfpTextAreaField",
  props: /* @__PURE__ */ mergeModels({
    field: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
    designer: { type: Boolean, default: false }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const model = useModel(__props, "modelValue");
    const config = computed(() => {
      return {
        licenseKey: "GPL",
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Underline,
          FontSize,
          Alignment,
          List,
          Link,
          AutoLink
        ],
        toolbar: [
          "undo",
          "redo",
          "|",
          "fontSize",
          "alignment",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "numberedList",
          "bulletedList",
          "|",
          "link"
        ]
      };
    });
    function reviseLinkURLs(text) {
      if (this.designer) {
        const el = document.createElement("html");
        el.innerHTML = text;
        const links = el.getElementsByTagName("a");
        if (links && links.length > 0) {
          Array.prototype.forEach.call(links, (link) => {
            const currentPath = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
            if (link.href.includes(currentPath)) {
              link.setAttribute("href", `http://${link.href.substring(currentPath.length, link.href.length)}`);
            }
          });
          this.text = el.innerHTML;
        }
      }
    }
    const __returned__ = { props, model, config, reviseLinkURLs, computed, get ClassicEditor() {
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
    }, get Alignment() {
      return Alignment;
    }, get List() {
      return List;
    }, get AutoLink() {
      return AutoLink;
    }, get Link() {
      return Link;
    }, get Ckeditor() {
      return _sfc_main$f;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$8 = ["innerHTML"];
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    $props.field.fixed || !$props.designer ? (openBlock(), createElementBlock(
      Fragment,
      { key: 0 },
      [
        createCommentVNode(" eslint-disable vue/no-v-html "),
        createBaseVNode("p", { innerHTML: $setup.model }, null, 8, _hoisted_1$8),
        createCommentVNode("eslint-enable")
      ],
      64
      /* STABLE_FRAGMENT */
    )) : (openBlock(), createBlock(VSheet, { key: 1 }, {
      default: withCtx(() => [
        createVNode(VLabel, null, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($props.field.label),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }),
        createVNode($setup["Ckeditor"], {
          modelValue: $setup.model,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.model = $event),
          editor: $setup.ClassicEditor,
          config: $setup.config
        }, null, 8, ["modelValue", "editor", "config"])
      ]),
      _: 1
      /* STABLE */
    }))
  ]);
}
const MfpTextAreaField = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpTextAreaField.vue"]]);
const api = {
  STATE_LIST: "api/v3/memberforms/state",
  STATE_FORMS: "api/v3/memberforms/state",
  COUNTRY_LIST: "api/v3/memberforms/countries",
  FORM_SHOW: "api/v3/memberforms/form",
  FORM_SUBMIT: "api/v3/memberforms/form",
  FORM_ID_CUSTOM_URL: "api/v3/memberforms/form-url/get-form-id-custom-url",
  SEARCH: "/api/v3/memberforms/search",
  ACCESS: "/api/v3/memberforms/search"
};
const defaultOptions = {
  something: "nothing"
};
const api$1 = {
  name: "PublicApi",
  install(options) {
    const opts = { ...defaultOptions, ...options };
    console.log("private api installed", opts);
  },
  getListOfStates() {
    return axios({
      method: "get",
      url: api.STATE_LIST,
      baseURL: "/"
    });
  },
  getForms(state) {
    return axios({
      method: "get",
      url: `${api.STATE_FORMS}/${state}`,
      baseURL: "/"
    });
  },
  getListOfCountries() {
    return axios({
      method: "get",
      url: api.COUNTRY_LIST,
      baseURL: "/"
    });
  },
  getForm(id) {
    return axios({
      method: "get",
      url: `${api.FORM_SHOW}/${id}`,
      baseURL: "/"
    });
  },
  sendFormData(id, field) {
    return axios({
      method: "POST",
      url: `${api.FORM_SUBMIT}/${id}`,
      baseURL: "/",
      data: field,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });
  },
  getFormIdByCustomUrl(affiliateNumber, customUrl) {
    return axios({
      method: "POST",
      url: `${api.FORM_ID_CUSTOM_URL}`,
      baseURL: "/",
      data: { affiliateNumber, customUrl },
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });
  },
  search(type, search, args) {
    return axios.post(api.SEARCH, {
      type,
      text: search,
      ...args
    });
  },
  access(type, id) {
    return axios.get(`${api.ACCESS}/${type}/${id}`);
  }
};
const _sfc_main$c = {
  name: "FormSearchSelector",
  props: {
    itemValue: { type: String, default: "" },
    itemText: { type: [String, Function], default: "" },
    searchType: { type: String, required: true },
    searchArgs: { type: Object, default: () => ({}) },
    modelValue: { type: [Number, Array], default: null },
    label: { type: String, default: "Combobox" },
    outlined: { type: Boolean, default: false },
    rules: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false }
  },
  data: () => ({
    loading: false,
    selected: null,
    searchText: null,
    items: []
  }),
  emits: ["update:modelValue"],
  computed: {
    entries() {
      return this.items.map((item) => {
        let name = "";
        switch (typeof this.itemText) {
          case "string":
            name = item[this.itemText];
            break;
          case "function":
            name = this.itemText(item);
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
    // selected() {
    //     if (this.selected) {
    //         if (this.multiple) {
    //             const selectedItems = this.selected.map((item) => item[this.itemValue]);
    //             this.$emit('input', selectedItems);
    //         } else {
    //             this.$emit('input', this.selected[this.itemValue]);
    //         }
    //     } else {
    //         this.$emit('input', null);
    //     }
    // },
    searchText() {
      this.search();
    },
    searchArgs() {
      this.search();
    }
    // value: {
    //     handler(value) {
    //         if (!value) {
    //             this.selected = null;
    //         }
    //     },
    // },
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
        if (this.searchType === "localJobClass") {
          this.customSortLocalJobClass();
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    customSortLocalJobClass() {
      const itemNamesToMoveAtEnd = ["Job Not Listed", "Unknown", "Other"];
      itemNamesToMoveAtEnd.forEach((itemName) => {
        const indexToMove = this.items.findIndex(
          (item) => item.LocalJobClassName.toLowerCase() === itemName.toLowerCase()
        );
        this.items.push(this.items.splice(indexToMove, 1)[0]);
      });
    },
    handleSelected() {
      this.$emit("update:modelValue", this.selected);
    }
  }
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
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
    "menu-props": { attach: true },
    rules: $props.rules,
    "item-value": $props.itemValue,
    disabled: $props.disabled,
    clearable: $props.clearable,
    "item-title": "name",
    multiple: $props.multiple,
    variant: $props.outlined ? "outlined" : "underlined"
  }, null, 8, ["modelValue", "search", "items", "loading", "label", "rules", "item-value", "disabled", "clearable", "multiple", "variant", "onUpdate:modelValue"]);
}
const FormSearchSelector = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/public/FormSearchSelector.vue"]]);
const _sfc_main$b = {
  name: "MfpWorkLocation",
  components: { FormSearchSelector, MfpTextField },
  props: {
    field: { type: Object, required: true, default: { value: {} } },
    designer: { type: Boolean, default: false },
    required: { type: Boolean, default: false }
  },
  data: () => ({
    activeEditTemplate: {},
    fieldRequired: true
  }),
  computed: {
    searchableEmployerId() {
      return Array.isArray(this.field.value.employerId) ? parseInt(this.field.value.employerId[0]) : parseInt(this.field.value.employerId);
    }
  },
  created() {
    if (this.designer) {
      this.activeEditTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
      this.field.value = {
        chapterId: this.activeEditTemplate.chapterId || null,
        employerId: this.activeEditTemplate.employerId || null,
        unitId: this.activeEditTemplate.unitId || null,
        localJobClassId: this.activeEditTemplate.localJobClassId || null,
        jobTitleId: this.activeEditTemplate.jobTitleId || null
      };
    } else {
      this.field.value = { ...this.field.source };
    }
  }
};
const _hoisted_1$7 = { class: "d-flex ga-2" };
const _hoisted_2$3 = { class: "flex-1-0" };
const _hoisted_3$3 = { key: 1 };
const _hoisted_4$2 = {
  key: 1,
  class: "handle mx-2"
};
const _hoisted_5$1 = { key: 0 };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const _component_MfpTextField = resolveComponent("MfpTextField");
  const _component_FormSearchSelector = resolveComponent("FormSearchSelector");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      $props.designer ? (openBlock(), createBlock(VCard, {
        key: 0,
        variant: "elevated",
        class: "mb-2 elevation-4"
      }, {
        default: withCtx(() => [
          createVNode(VCardTitle, {
            class: "genericTitle",
            color: "aft-dark-blue"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$7, [
                $props.designer ? (openBlock(), createBlock(VIcon, {
                  key: 0,
                  class: "handle",
                  icon: "mdi:mdi-arrow-up-down"
                })) : createCommentVNode("v-if", true),
                createBaseVNode("div", _hoisted_2$3, [
                  $props.designer ? (openBlock(), createBlock(_component_MfpTextField, {
                    key: 0,
                    modelValue: $props.field.label,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.field.label = $event),
                    field: {},
                    designer: $props.designer,
                    solo: "",
                    class: "mr-4"
                  }, null, 8, ["modelValue", "designer"])) : (openBlock(), createElementBlock(
                    "span",
                    _hoisted_3$3,
                    toDisplayString($props.field.label),
                    1
                    /* TEXT */
                  ))
                ]),
                createBaseVNode("div", null, [
                  $props.designer ? (openBlock(), createBlock(VCheckbox, {
                    key: 0,
                    modelValue: _ctx.fieldRequired,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.fieldRequired = $event),
                    disabled: $props.field.fixed,
                    designer: $props.designer,
                    label: "Required",
                    class: "mr-4"
                  }, null, 8, ["modelValue", "disabled", "designer"])) : createCommentVNode("v-if", true)
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCardText, null, {
            default: withCtx(() => [
              !$props.field.value.chapterId ? (openBlock(), createBlock(_component_FormSearchSelector, {
                key: 0,
                ref: "chapterSelector",
                modelValue: $props.field.value.chapterId,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.field.value.chapterId = $event),
                label: "Select a Chapter",
                "item-value": "ChapterId",
                "search-type": "chapter",
                "item-title": "ChapterName",
                disabled: true,
                outlined: ""
              }, null, 8, ["modelValue"])) : createCommentVNode("v-if", true),
              !$props.field.value.employerId ? (openBlock(), createBlock(_component_FormSearchSelector, {
                key: 1,
                ref: "employerSelector",
                modelValue: $props.field.value.employerId,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $props.field.value.employerId = $event),
                label: "Select an Employer",
                "item-value": "EmployerId",
                "search-type": "employer",
                "item-title": "EmployerName",
                disabled: true,
                outlined: ""
              }, null, 8, ["modelValue"])) : createCommentVNode("v-if", true),
              !$props.field.value.unitId ? (openBlock(), createBlock(_component_FormSearchSelector, {
                key: 2,
                ref: "unitSelector",
                modelValue: $props.field.value.unitId,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $props.field.value.unitId = $event),
                label: "Select a Unit",
                "item-value": "UnitId",
                "search-type": "unit",
                "item-title": "UnitName",
                disabled: true,
                outlined: "",
                clearable: ""
              }, null, 8, ["modelValue"])) : createCommentVNode("v-if", true),
              !$props.field.value.localJobClassId ? (openBlock(), createBlock(_component_FormSearchSelector, {
                key: 3,
                ref: "localJobClassSelector",
                modelValue: $props.field.value.localJobClassId,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $props.field.value.localJobClassId = $event),
                label: "Local Job Class",
                "item-value": "LocalJobClassId",
                "search-type": "localJobClass",
                "item-title": "LocalJobClassName",
                disabled: true,
                outlined: "",
                clearable: ""
              }, null, 8, ["modelValue"])) : createCommentVNode("v-if", true),
              createCommentVNode(' <form-search-selector\n                v-if="!jobTitleId"\n                ref="jobTitleSelector"\n                v-model="jobTitleId"\n                label="Job Title"\n                item-value="JobTitleId"\n                search-type="jobTitle"\n                item-text="JobTitleName"\n                :disabled="true"\n                outlined\n                clearable\n            /> ')
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      !$props.designer ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
        !((_b = (_a = $props.field) == null ? void 0 : _a.source) == null ? void 0 : _b.employerId) || !((_d = (_c = $props.field) == null ? void 0 : _c.source) == null ? void 0 : _d.localJobClassId) ? (openBlock(), createBlock(VRow, { key: 0 }, {
          default: withCtx(() => [
            createVNode(VCol, null, {
              default: withCtx(() => [
                $props.field.required ? (openBlock(), createElementBlock("span", _hoisted_5$1, _cache[10] || (_cache[10] = [
                  createBaseVNode(
                    "strong",
                    { class: "text-red" },
                    " * ",
                    -1
                    /* HOISTED */
                  )
                ]))) : createCommentVNode("v-if", true),
                createTextVNode(
                  " " + toDisplayString($props.field.label) + " " + toDisplayString($props.field.required ? " (required)" : ""),
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
        })) : createCommentVNode("v-if", true),
        ((_f = (_e = $props.field) == null ? void 0 : _e.source) == null ? void 0 : _f.chapterId) === null ? (openBlock(), createBlock(VRow, { key: 1 }, {
          default: withCtx(() => [
            createVNode(VCol, null, {
              default: withCtx(() => [
                createVNode(_component_FormSearchSelector, {
                  ref: "chapterSelector",
                  modelValue: $props.field.value.chapterId,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $props.field.value.chapterId = $event),
                  name: "chapterId",
                  label: "Choose a Chapter",
                  "item-value": "ChapterId",
                  "search-type": "chapter",
                  "search-args": { affiliateId: $props.field.value.affiliateId },
                  "item-title": "ChapterName",
                  disabled: !$props.field.value.affiliateId || !!$props.field.value.employerId,
                  outlined: "",
                  clearable: !$props.field.value.employerId && !$props.field.value.unitId
                }, null, 8, ["modelValue", "search-args", "disabled", "clearable"])
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        })) : createCommentVNode("v-if", true),
        ((_h = (_g = $props.field) == null ? void 0 : _g.source) == null ? void 0 : _h.employerId) === null ? (openBlock(), createBlock(VRow, { key: 2 }, {
          default: withCtx(() => [
            createVNode(VCol, null, {
              default: withCtx(() => [
                createVNode(_component_FormSearchSelector, {
                  ref: "employerSelector",
                  modelValue: $props.field.value.employerId,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $props.field.value.employerId = $event),
                  name: "employerId",
                  label: "Choose an Employer",
                  "item-value": "EmployerId",
                  "search-type": "employer",
                  rules: [(v) => !!v || `Employer is required`],
                  "search-args": { chapterId: $props.field.value.chapterId, selectedEmployerIds: $props.field.value.employerId },
                  "item-title": "EmployerName",
                  disabled: !$props.field.value.chapterId || !!$props.field.value.unitId,
                  outlined: "",
                  clearable: !$props.field.value.unitId
                }, null, 8, ["modelValue", "rules", "search-args", "disabled", "clearable"])
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        })) : createCommentVNode("v-if", true),
        ((_j = (_i = $props.field) == null ? void 0 : _i.source) == null ? void 0 : _j.unitId) === null ? (openBlock(), createBlock(VRow, { key: 3 }, {
          default: withCtx(() => [
            createVNode(VCol, null, {
              default: withCtx(() => [
                createVNode(_component_FormSearchSelector, {
                  ref: "unitSelector",
                  modelValue: $props.field.value.unitId,
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $props.field.value.unitId = $event),
                  name: "unitId",
                  label: "Choose a Unit",
                  "item-value": "UnitId",
                  "search-type": "unit",
                  rules: [(v) => !!v || `Unit is required`],
                  "search-args": { employerId: $options.searchableEmployerId },
                  "item-title": "UnitName",
                  disabled: !$props.field.value.employerId,
                  outlined: "",
                  clearable: ""
                }, null, 8, ["modelValue", "rules", "search-args", "disabled"])
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        })) : createCommentVNode("v-if", true),
        ((_l = (_k = $props.field) == null ? void 0 : _k.source) == null ? void 0 : _l.localJobClassId) === null ? (openBlock(), createBlock(VRow, { key: 4 }, {
          default: withCtx(() => [
            createVNode(VCol, null, {
              default: withCtx(() => [
                createVNode(_component_FormSearchSelector, {
                  ref: "localJobClassSelector",
                  modelValue: $props.field.value.localJobClassId,
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $props.field.value.localJobClassId = $event),
                  label: "Local Job Class",
                  "item-value": "LocalJobClassId",
                  "search-type": "localJobClass",
                  rules: [(v) => !!v || `Local Job Class is required`],
                  "search-args": { unitId: $props.field.value.unitId },
                  "item-title": "LocalJobClassName",
                  disabled: !$props.field.value.unitId,
                  outlined: "",
                  clearable: ""
                }, null, 8, ["modelValue", "rules", "search-args", "disabled"])
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        })) : createCommentVNode("v-if", true),
        createCommentVNode(' <v-row v-if="storeData && storeData.localJobClassId === null">\n                <v-col>\n                    <form-search-selector\n                        ref="jobTitleSelector"\n                        v-model="jobTitleId"\n                        label="Job Title"\n                        item-value="JobTitleId"\n                        search-type="jobTitle"\n                        :search-args="{ localJobClassId: localJobClassId }"\n                        item-text="JobTitleName"\n                        :disabled="!localJobClassId"\n                        outlined\n                        clearable\n                    />\n                </v-col>\n            </v-row> ')
      ])) : createCommentVNode("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const MfpWorkLocation = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpWorkLocation.vue"]]);
const _sfc_main$a = {
  name: "DateOfBirth",
  props: {
    value: { type: String, default: "" },
    field: { type: Object, required: true },
    designer: { type: Boolean, default: false }
  },
  emits: ["input"],
  data: () => ({
    activePicker: null,
    date: null,
    dateFormatted: "",
    menu: false,
    minDate: "1950-01-01",
    maxDate: (/* @__PURE__ */ new Date()).toISOString().substr(0, 10),
    rules: []
  }),
  computed: {
    selected: {
      get() {
        return this.date;
      },
      set(value) {
        this.$emit("input", value);
        this.date = value;
      }
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
    menu(val) {
      if (val) {
        setTimeout(() => {
          this.activePicker = "YEAR";
        }, 0);
      }
    }
  },
  mounted() {
    this.date = this.value;
    this.rules.push((v) => !v || /^(\d{4})-(\d{2})-(\d{2})+$/.test(v) || "Date must be valid (YYYY-MM-DD)");
    this.rules.push((v) => !v || isValid(this.dateFormatted) || "Please enter a valid date");
  },
  methods: {
    formatDateValue() {
      const ele = this.dateFormatted;
      if (!ele) return null;
      const x = ele.replace(/\D/g, "").match(/(\d{0,4})(\d{0,2})(\d{0,2})/);
      this.dateFormatted = !x[2] ? x[1] : `${x[1]}-${x[2]}-${x[3]}`;
      return this.dateFormatted;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      console.log(year, month, day);
      return `${year}-${month}-${day}`;
    },
    save(date) {
      this.$emit("input", date);
      this.$refs.menu.save(date);
    }
  }
};
const _hoisted_1$6 = {
  key: 0,
  class: "text-red"
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VMenu, {
    ref: "menu",
    modelValue: _ctx.menu,
    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.menu = $event),
    "close-on-content-click": false,
    transition: "scale-transition",
    offset: "40",
    "min-width": "290px"
  }, {
    activator: withCtx(({ props }) => [
      createVNode(VTextField, mergeProps({
        modelValue: _ctx.dateFormatted,
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = ($event) => _ctx.dateFormatted = $event),
          _cache[1] || (_cache[1] = ($event) => _ctx.$emit("input", $event))
        ],
        rules: _ctx.rules,
        hint: "YYYY-MM-DD",
        "prepend-icon": "mdi:mdi-calendar",
        required: $props.field.required || false,
        role: "",
        maxlength: "10",
        designer: $props.designer,
        disabled: $props.designer,
        clearable: "",
        onkeyup: $options.formatDateValue(),
        onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.date = $options.parseDate(_ctx.dateFormatted))
      }, props, { onChange: $options.save }), {
        label: withCtx(() => [
          $props.field.required ? (openBlock(), createElementBlock("span", _hoisted_1$6, _cache[6] || (_cache[6] = [
            createBaseVNode(
              "strong",
              null,
              "* ",
              -1
              /* HOISTED */
            )
          ]))) : createCommentVNode("v-if", true),
          createTextVNode(
            " " + toDisplayString($props.field.label + ($props.field.required ? " (required)" : "")),
            1
            /* TEXT */
          )
        ]),
        _: 2
        /* DYNAMIC */
      }, 1040, ["modelValue", "rules", "required", "designer", "disabled", "onkeyup", "onChange"])
    ]),
    default: withCtx(() => [
      createVNode(VDatePicker, {
        modelValue: _ctx.date,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.date = $event),
        "no-title": "",
        scrollable: "",
        "show-current": true,
        min: _ctx.minDate,
        max: $props.field.dataSource === "dateOfBirth" ? _ctx.maxDate : "",
        onInput: _cache[4] || (_cache[4] = ($event) => _ctx.menu = false),
        onChange: $options.save
      }, null, 8, ["modelValue", "min", "max", "onChange"])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["modelValue"]);
}
const DateOfBirth = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/DateOfBirth.vue"]]);
const _sfc_main$9 = {
  name: "LocalDuesCategory",
  props: {
    value: { type: String, default: "" },
    field: { type: Object, default: () => {
    } },
    label: { type: String, default: "MFP Select Field" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    designer: { type: Boolean, default: false }
  },
  data: () => ({
    localDues: [],
    localDuesCategories: [],
    selectedLocalDuesCategory: null,
    selectedLocalDuesCategoryPrice: 0,
    // copeAmount: 0,
    draftAmount: 0,
    // other: '',
    localDuesCategoriesLabel: "",
    isPercentage: false
  }),
  watch: {
    localDuesCategoriesLabel() {
      this.field.label = this.localDuesCategoriesLabel;
      if (this.field.fieldName === "LocalDuesCategory") {
        this.field.source[0].label = this.field.label;
      }
    },
    field: {
      deep: true,
      handler() {
        this.localDuesCategories = this.field.source;
      }
    },
    selectedLocalDuesCategory: {
      handler() {
        const localDuesCategoryObj = this.getLocalDuesCategory(this.selectedLocalDuesCategory);
        if (localDuesCategoryObj) {
          if (localDuesCategoryObj.LocalDuesPercentage) {
            this.selectedLocalDuesCategoryPrice = parseFloat(localDuesCategoryObj.LocalDuesPercentage, 10);
            this.isPercentage = true;
          } else {
            this.selectedLocalDuesCategoryPrice = parseFloat(localDuesCategoryObj.LocalDuesAmount, 10);
            this.isPercentage = false;
          }
          if (this.selectedLocalDuesCategoryPrice > 0) {
            if (localDuesCategoryObj.LocalDuesPercentage) {
              this.draftAmount = 0;
            } else {
              this.draftAmount = this.selectedLocalDuesCategoryPrice;
            }
          }
        }
        this.change();
      },
      deep: true
    }
  },
  created() {
    this.localDuesCategoriesLabel = this.field.label;
  },
  mounted() {
    this.localDuesCategories = this.field.source;
  },
  methods: {
    getLocalDuesCategory(ldc) {
      return this.localDuesCategories.filter((localDues) => localDues.LocalDuesCategoryId === ldc)[0];
    },
    change() {
      this.$emit("input", `${this.selectedLocalDuesCategory}`);
    }
  }
};
const _hoisted_1$5 = { key: 0 };
const _hoisted_2$2 = {
  key: 0,
  class: "text-h5"
};
const _hoisted_3$2 = {
  key: 1,
  class: "text-h5"
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VRow, null, {
    default: withCtx(() => [
      createVNode(VCol, null, {
        default: withCtx(() => [
          $props.field.templateId !== 3 && $props.field.templateId !== 6 && $props.field.templateId !== 8 ? (openBlock(), createBlock(VRow, { key: 0 }, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  $props.designer ? (openBlock(), createBlock(VCheckbox, {
                    key: 0,
                    modelValue: $props.field.showPrice,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.field.showPrice = $event),
                    designer: $props.designer,
                    label: "Dues Amount",
                    class: "mr-4 dues-check"
                  }, null, 8, ["modelValue", "designer"])) : createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true),
          $props.field.templateId !== 3 && $props.field.templateId !== 6 && $props.field.templateId !== 8 ? (openBlock(), createBlock(VRow, { key: 1 }, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(VSelect, {
                    modelValue: _ctx.selectedLocalDuesCategory,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.selectedLocalDuesCategory = $event),
                    items: _ctx.localDuesCategories,
                    rules: [(v) => !!v || `${_ctx.localDuesCategoriesLabel + " is required"}`],
                    "item-value": "LocalDuesCategoryId",
                    "item-title": "LocalDuesCategoryName",
                    variant: "underlined"
                  }, {
                    label: withCtx(() => [
                      $props.field.required ? (openBlock(), createElementBlock("span", _hoisted_1$5, _cache[2] || (_cache[2] = [
                        createBaseVNode(
                          "strong",
                          { class: "text-red" },
                          " * ",
                          -1
                          /* HOISTED */
                        )
                      ]))) : createCommentVNode("v-if", true),
                      createTextVNode(
                        " " + toDisplayString(_ctx.localDuesCategoriesLabel + ($props.field.required ? " (required)" : "")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "items", "rules"])
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
              $props.field.showPrice && ($props.field.templateId !== 3 && $props.field.templateId !== 6 && $props.field.templateId !== 8) ? (openBlock(), createBlock(VCol, {
                key: 0,
                class: "text-center dues-highlight"
              }, {
                default: withCtx(() => [
                  _cache[3] || (_cache[3] = createBaseVNode(
                    "div",
                    null,
                    [
                      createBaseVNode("h3", null, "Dues Amount")
                    ],
                    -1
                    /* HOISTED */
                  )),
                  !_ctx.isPercentage ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_2$2,
                    " $ " + toDisplayString(_ctx.selectedLocalDuesCategoryPrice),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  _ctx.isPercentage ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_3$2,
                    toDisplayString(_ctx.selectedLocalDuesCategoryPrice) + " % ",
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
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
      })
    ]),
    _: 1
    /* STABLE */
  });
}
const LocalDuesCategory = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/LocalDuesCategory.vue"]]);
const _sfc_main$8 = {
  name: "MfpSignatureField",
  props: {
    pad: {},
    value: { type: String, default: null },
    itemKey: { type: Number, required: true },
    label: { type: String, default: "MFP Signature Field" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    designer: { type: Boolean, default: false },
    className: { type: String, default: "" }
  },
  data: () => ({
    signature: null
  }),
  watch: {
    disabled() {
      if (this.disabled) {
        console.log("lock");
        this.$refs.pad.lockSignaturePad();
      } else {
        console.log("open");
        this.$refs.pad.openSignaturePad();
      }
    },
    signature() {
      this.$emit("input", this.signature);
    }
  },
  mounted() {
    console.log(this.className);
  },
  methods: {
    onBegin() {
    },
    onEnd() {
      const data = this.$refs.pad.saveSignature();
      if (!data.isEmpty) {
        this.signature = data.data;
      }
    },
    clear() {
      this.$refs.pad.clearSignature();
      this.signature = null;
    }
  }
};
const _hoisted_1$4 = { class: "watermark" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_vue_signature_pad = resolveComponent("vue-signature-pad");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass($props.className)
    },
    [
      withDirectives(createBaseVNode(
        "div",
        _hoisted_1$4,
        " Sign here ",
        512
        /* NEED_PATCH */
      ), [
        [vShow, !_ctx.signature]
      ]),
      createVNode(VCard, {
        border: "",
        class: "below-sig"
      }, {
        default: withCtx(() => [
          createVNode(VCardText, null, {
            default: withCtx(() => [
              createVNode(_component_vue_signature_pad, {
                ref: "pad",
                options: { onBegin: $options.onBegin, onEnd: $options.onEnd, backgroundColor: "rgba(248,248,252,0.2)" },
                height: "150px",
                class: "canvas-pad"
              }, null, 8, ["options"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCardActions, null, {
            default: withCtx(() => [
              createVNode(VSpacer),
              createVNode(VBtn, {
                size: "small",
                onClick: $options.clear,
                variant: "elevated"
              }, {
                default: withCtx(() => _cache[0] || (_cache[0] = [
                  createTextVNode(" Clear ")
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
    ],
    2
    /* CLASS */
  );
}
const MfpSignatureField = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpSignatureField.vue"]]);
const _sfc_main$7 = {
  name: "MfpCustomCope",
  components: { MfpSignatureField, MfpTextAreaField },
  props: {
    modelValue: {
      type: [Object, String],
      default() {
        return {
          copeAmountChoices: [],
          copeAmountSelected: "",
          copeOtherAmount: "",
          signatureText: "",
          signature: "",
          showSignature: true
        };
      }
    },
    field: { type: Object, required: true },
    label: { type: String, default: "Cope Amount" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    designer: { type: Boolean, default: false },
    itemKey: { type: Number, required: true }
  },
  emits: ["update:modelValue"],
  data: () => ({
    copeAmountSelected: "",
    copeOtherAmount: "",
    copeAmountChoices: "",
    otherRules: [(v) => /(?!0.00)(?=.*?\d)^\$?(([1-9]\d{0,2}(d{3})*)|\d+)?(\.[0-9]{2})?$/.test(v) || "Please enter a valid amount (00.00)"],
    signatureTextObject: {
      value: "",
      default: ""
    },
    signature: "",
    showSignature: true,
    messageInvalidAmount: ""
  }),
  computed: {
    customCopeRules() {
      if (this.field.required) {
        return [
          this.copeAmountSelected.length !== 0 || "At least one item should be selected"
        ];
      }
      return [];
    },
    classObject() {
      return {
        canvasEnabled: this.copeAmountSelected
      };
    }
  },
  created() {
    this.signatureTextObject.value = this.field.defaultSignatureText;
    if (this.modelValue) {
      if (!this.designer) {
        this.reviseAmountChoices();
      }
      this.copeAmountChoices = this.convertToString(
        this.modelValue.copeAmountChoices
      );
      if (this.modelValue.signatureText !== "") {
        this.signatureTextObject.value = this.modelValue.signatureText;
      }
      if (this.modelValue.hasOwnProperty("showSignature")) {
        this.showSignature = this.modelValue.showSignature;
      }
    }
  },
  methods: {
    reviseAmountChoices() {
      if (this.modelValue.copeAmountChoices.length > 0) {
        for (let index = 0; index < this.modelValue.copeAmountChoices.length; index++) {
          if (this.modelValue.copeAmountChoices[index] === "other") {
            continue;
          }
          const amt = parseFloat(this.modelValue.copeAmountChoices[index]);
          this.modelValue.copeAmountChoices[index] = amt.toFixed(2).toString();
          if (amt === 0 || Number.isNaN(amt)) {
            this.modelValue.copeAmountChoices.splice(index, 1);
            index--;
          }
        }
      }
    },
    getCopeObject() {
      if (this.copeAmountSelected !== "other") {
        this.copeOtherAmount = "";
      }
      return {
        copeAmountChoices: this.convertToArray(this.copeAmountChoices),
        copeAmountSelected: this.copeAmountSelected,
        copeOtherAmount: this.copeOtherAmount,
        signatureText: this.signatureTextObject.value,
        signature: this.signature
      };
    },
    choicesKeydown(e) {
      const arrIgnoreKeys = [
        "backspace",
        "delete",
        "shift",
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright"
      ];
      if (arrIgnoreKeys.includes(e.key.toLowerCase())) {
        return;
      }
      const regex = /([0-9]|\.)/;
      if (e.key.toLowerCase() !== "enter" && !regex.test(e.key)) {
        e.preventDefault();
      }
      const arrAmts = this.convertToArray(this.copeAmountChoices);
      const index = arrAmts.length - 1;
      const amt = arrAmts[index];
      this.messageInvalidAmount = "";
      if (amt !== "" && !this.isExpectedAmount(amt, index + 1, e.key)) {
        if (this.messageInvalidAmount === "") {
          this.messageInvalidAmount = `Line ${index.toString()} : Enter valid amount`;
        }
        e.preventDefault();
      }
    },
    isExpectedAmount(amt, lineNumber, key) {
      if (key === ".") {
        if (amt && amt.split(".").length - 1 > 0) {
          this.messageInvalidAmount = `Line ${lineNumber}: Enter valid amount`;
          return false;
        }
      }
      if (amt && amt.indexOf(".") >= 0 && amt.length - (amt.indexOf(".") + 1) > 2) {
        this.messageInvalidAmount = `Line ${lineNumber}: Enter valid amount with two decimal numbers only`;
        return false;
      }
      return true;
    },
    convertToArray(stringData) {
      if (stringData !== "") {
        return stringData.split("\n").filter(Boolean);
      }
      return [];
    },
    convertToString(arrayData) {
      if (typeof arrayData === "object") {
        return arrayData.join("\n");
      }
      return "";
    },
    handleChange() {
      this.$emit("update:modelValue", this.getCopeObject());
    }
  }
};
const _hoisted_1$3 = { style: { "color": "red" } };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MfpTextAreaField = resolveComponent("MfpTextAreaField");
  const _component_MfpSignatureField = resolveComponent("MfpSignatureField");
  return openBlock(), createBlock(VRow, null, {
    default: withCtx(() => [
      $props.designer ? (openBlock(), createBlock(VCol, {
        key: 0,
        cols: "12"
      }, {
        default: withCtx(() => [
          createBaseVNode(
            "span",
            _hoisted_1$3,
            toDisplayString(_ctx.messageInvalidAmount),
            1
            /* TEXT */
          ),
          createVNode(VTextarea, {
            modelValue: _ctx.copeAmountChoices,
            "onUpdate:modelValue": [
              _cache[0] || (_cache[0] = ($event) => _ctx.copeAmountChoices = $event),
              $options.handleChange
            ],
            variant: "outlined",
            name: "input-textarea",
            label: "Enter choices for amount (hit enter to separate choices)",
            class: "custom-dues-textarea",
            onKeydown: _cache[1] || (_cache[1] = ($event) => $options.choicesKeydown($event))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      !$props.designer ? (openBlock(), createBlock(VCol, {
        key: 1,
        cols: "12"
      }, {
        default: withCtx(() => [
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, { class: "text-center radio-btn-dues" }, {
                default: withCtx(() => [
                  createVNode(VRadioGroup, {
                    modelValue: _ctx.copeAmountSelected,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.copeAmountSelected = $event),
                    "hide-details": "",
                    rules: $options.customCopeRules
                  }, {
                    label: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode(" COPE Amount ")
                    ])),
                    default: withCtx(() => [
                      createVNode(VRadio, {
                        label: "$0.00",
                        value: `0.00`,
                        class: "mb-0"
                      }),
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList($props.modelValue.copeAmountChoices.length, (n) => {
                          return openBlock(), createBlock(VRadio, {
                            label: "$" + $props.modelValue.copeAmountChoices[n - 1],
                            value: $props.modelValue.copeAmountChoices[n - 1],
                            key: $props.modelValue.copeAmountChoices[n - 1]
                          }, null, 8, ["label", "value"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      createVNode(VRadio, {
                        label: "Other",
                        value: `other`,
                        rules: $options.customCopeRules,
                        "hide-details": ""
                      }, null, 8, ["rules"]),
                      _ctx.copeAmountSelected == "other" ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: _ctx.copeOtherAmount,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.copeOtherAmount = $event),
                        prefix: "$",
                        rules: _ctx.otherRules
                      }, null, 8, ["modelValue", "rules"])) : createCommentVNode("v-if", true)
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "rules"])
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
      })) : createCommentVNode("v-if", true),
      _ctx.showSignature ? (openBlock(), createBlock(VCol, {
        key: 2,
        cols: "12"
      }, {
        default: withCtx(() => [
          createVNode(_component_MfpTextAreaField, {
            modelValue: _ctx.signatureTextObject.value,
            "onUpdate:modelValue": [
              _cache[4] || (_cache[4] = ($event) => _ctx.signatureTextObject.value = $event),
              $options.handleChange
            ],
            field: _ctx.signatureTextObject,
            designer: $props.designer,
            class: "formHeader"
          }, null, 8, ["modelValue", "field", "designer", "onUpdate:modelValue"]),
          createVNode(_component_MfpSignatureField, {
            modelValue: _ctx.signature,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.signature = $event),
            class: normalizeClass(["mfp-signature-field", $options.classObject]),
            required: $props.field.required,
            "item-key": $props.itemKey,
            onInput: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("input", $options.getCopeObject()))
          }, null, 8, ["modelValue", "class", "required", "item-key"])
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true)
    ]),
    _: 1
    /* STABLE */
  });
}
const MfpCustomCopeField = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-1bb41b2f"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpCustomCopeField.vue"]]);
const _sfc_main$6 = {
  name: "MfpCheckboxField",
  props: {
    value: { type: Boolean, default: false },
    label: { type: String, default: "MFP Checkbox Field" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    checked: false
  }),
  watch: {
    checked() {
      this.change();
    }
  },
  mounted() {
    this.checked = this.value;
    this.change = debounce(() => {
      this.$emit("input", this.checked);
    }, 500);
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VCheckbox, {
    modelValue: _ctx.checked,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.checked = $event),
    disabled: $props.disabled,
    label: $props.label + ($props.required ? " (required)" : ""),
    required: $props.required
  }, null, 8, ["modelValue", "disabled", "label", "required"]);
}
const MfpCheckboxField = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpCheckboxField.vue"]]);
const _sfc_main$5 = {
  name: "MfpCountryCallingCodeSelect",
  props: {
    field: { type: Object, required: false },
    required: { type: Boolean, default: false },
    designer: { type: Boolean, default: false }
  },
  data: () => ({
    countries: []
  }),
  mounted() {
    if (this.field.default) {
      this.field.value = this.field.default;
    }
    this.getCountries();
  },
  methods: {
    getCountries() {
      api$1.getListOfCountries().then((response) => {
        this.countries = response.data;
      });
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VAutocomplete, {
    items: _ctx.countries,
    "item-title": "CountryCallingCodeDisplay",
    "item-value": "CountryId",
    modelValue: $props.field.value,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.field.value = $event),
    label: $props.field.label,
    required: $props.field.required,
    disabled: $props.designer
  }, null, 8, ["items", "modelValue", "label", "required", "disabled"]);
}
const MfpCountryCallingCodeSelect = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpCountryCallingCodeSelect.vue"]]);
const _sfc_main$4 = {
  name: "MfpSearchSelectField",
  props: {
    itemValue: { type: String, default: "" },
    itemText: { type: [String, Function], default: "" },
    searchArgs: { type: Object, default: () => ({}) },
    value: { type: Number, default: null },
    label: { type: String, default: "Combobox" },
    outlined: { type: Boolean, default: false },
    rules: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    field: { type: Object, required: true }
  },
  data: () => ({
    loading: false,
    selected: null,
    searchText: null,
    items: []
  }),
  computed: {
    entries() {
      if (typeof this.items !== "object") {
        return [this.items];
      }
      return this.items.map((item) => ({ ...item }));
    }
  },
  watch: {
    disabled() {
      if (!this.disabled) {
        this.search();
      }
    },
    selected() {
      if (this.selected) {
        this.$emit("input", parseInt(this.selected.itemValue, 10));
      } else {
        this.$emit("input", null);
      }
    },
    searchText() {
      this.search();
    }
  },
  created() {
    var _a;
    if ((_a = this.field) == null ? void 0 : _a.source) {
      this.items = this.field.source;
    }
    this.search = debounce(() => {
      this.doSearch();
    }, 500);
    if (this.value) {
      this.loading = true;
      this.loading = false;
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
      if (this.searchText === ((_a = this.selected) == null ? void 0 : _a.itemText)) {
        return;
      }
      this.loading = true;
      this.loading = false;
    }
  }
};
const _hoisted_1$2 = { key: 0 };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VAutocomplete, {
    modelValue: _ctx.selected,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selected = $event),
    search: _ctx.searchText,
    "onUpdate:search": _cache[1] || (_cache[1] = ($event) => _ctx.searchText = $event),
    items: $options.entries,
    loading: _ctx.loading,
    outlined: $props.outlined,
    "menu-props": { attach: true },
    rules: $props.rules,
    "item-value": $props.itemValue,
    disabled: $props.disabled,
    clearable: $props.clearable,
    "item-title": "itemText",
    "return-object": "",
    autocomplete: "new-password"
  }, {
    label: withCtx(() => [
      $props.field.required ? (openBlock(), createElementBlock("span", _hoisted_1$2, _cache[2] || (_cache[2] = [
        createBaseVNode(
          "strong",
          { class: "text-red" },
          " * ",
          -1
          /* HOISTED */
        )
      ]))) : createCommentVNode("v-if", true),
      createTextVNode(
        " " + toDisplayString($props.label + ($props.field.required ? " (required)" : "")),
        1
        /* TEXT */
      )
    ]),
    _: 1
    /* STABLE */
  }, 8, ["modelValue", "search", "items", "loading", "outlined", "rules", "item-value", "disabled", "clearable"]);
}
const MfpSearchSelectField = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpSearchSelectField.vue"]]);
const _sfc_main$3 = {
  name: "MfpGroupField",
  props: {
    itemKey: { type: Number, required: true },
    field: { type: Object, required: true },
    designer: { type: Boolean, default: false }
  },
  components: {
    MfpCheckboxField,
    MfpCountryCallingCodeSelect,
    MfpSearchSelectField,
    MfpSignatureField,
    MfpTextAreaField,
    MfpTextField
  },
  mounted() {
  },
  methods: {
    remove(index) {
      this.$emit("remove", index);
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.field.fieldsAsRows ? "v-container" : "v-row"), null, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($props.field.fields, (subField) => {
          return openBlock(), createBlock(
            resolveDynamicComponent($props.field.fieldsAsRows ? "v-row" : "v-col"),
            {
              key: subField.order,
              class: "m-col"
            },
            {
              default: withCtx(() => [
                (openBlock(), createBlock(
                  resolveDynamicComponent($props.field.fieldsAsRows ? "v-col" : "div"),
                  null,
                  {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.$MfpMapFieldTypeToComponent(subField.type)), {
                        modelValue: subField.value,
                        "onUpdate:modelValue": ($event) => subField.value = $event,
                        label: subField.label,
                        fixed: subField.fixed,
                        required: subField.required,
                        field: subField,
                        designer: $props.designer,
                        disabled: $props.designer,
                        "item-key": $props.itemKey,
                        "class-name": $props.field.fieldName,
                        parent: $props.field
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "fixed", "required", "field", "designer", "disabled", "item-key", "class-name", "parent"]))
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
const MfpGroupField = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-d0101fe8"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpGroupField.vue"]]);
const _sfc_main$2 = {
  name: "MfpGenericField",
  components: {
    DateOfBirth,
    LocalDuesCategory,
    MfpCustomCopeField,
    MfpGroupField,
    MfpTextField
  },
  props: {
    itemKey: { type: Number, required: true },
    field: { type: Object, required: true },
    designer: { type: Boolean, default: false }
  },
  data: () => ({
    fieldRequired: false,
    fieldOrderAbove: false,
    fieldOrderBelow: false,
    fieldTextLabel: ""
  }),
  watch: {
    fieldTextLabel() {
      this.field.label = this.fieldTextLabel;
      if (this.field.fieldName === "emailPersonalGroup") {
        this.field.fields.email.label = this.field.label;
      } else if (this.field.fieldName === "emailWorkGroup") {
        this.field.fields.emailWork.label = this.field.label;
      } else if (this.field.fieldName === "phoneHomeGroup") {
        this.field.fields.phoneHome.label = this.field.label;
      } else if (this.field.fieldName === "phoneWorkGroup") {
        this.field.fields.phoneWork.label = this.field.label;
      } else if (this.field.fieldName === "phoneMobile") {
        this.field.fields.phoneMobileGroup.fields.phoneMobile.label = this.field.label;
      }
    },
    fieldRequired() {
      this.field.required = this.fieldRequired;
      if (this.field.type === "group") {
        if (this.field.fieldsAsRows) {
          if (this.field.fields[this.field.fieldName] != null) {
            this.field.fields[this.field.fieldName].required = this.fieldRequired;
          }
          const mobileGroup = { ...this.field.fields.phoneMobileGroup };
          const { fields } = mobileGroup;
          const fieldsArr = { ...fields };
          if (fieldsArr.phoneMobile) {
            fieldsArr.phoneMobile.required = this.fieldRequired;
          }
        }
        if (this.field.fields.phoneHome) {
          this.field.fields.phoneHome.required = this.fieldRequired;
        }
        if (this.field.fields.phoneWork) {
          this.field.fields.phoneWork.required = this.fieldRequired;
        }
        if (this.field.fields.emailWork) {
          this.field.fields.emailWork.required = this.fieldRequired;
        }
      }
    },
    fieldOrderAbove() {
      this.field.orderAbove = this.fieldOrderAbove;
    },
    fieldOrderBelow() {
      this.field.orderAbove = this.fieldOrderBelow;
    }
  },
  created() {
    this.fieldTextLabel = this.field.label;
  },
  mounted() {
    this.fieldRequired = this.field.required;
    this.fieldOrderAbove = this.field.orderAbove;
    this.fieldOrderBelow = this.field.fieldOrderBelow;
    if (this.field.fieldName === "phoneHomeGroup") {
      this.field.fields = {
        phoneHomeCountry: this.getCountryCallingCodeObject(),
        ...this.field.fields
      };
    } else if (this.field.fieldName === "phoneWorkGroup") {
      this.field.fields = {
        phoneWorkCountry: this.getCountryCallingCodeObject(),
        ...this.field.fields
      };
    } else if (this.field.fieldName === "phoneMobile") {
      this.field.fields.phoneMobileGroup.fields = {
        phoneMobileCountry: this.getCountryCallingCodeObject(),
        ...this.field.fields.phoneMobileGroup.fields
      };
    }
  },
  methods: {
    remove(index) {
      this.$emit("remove", index);
    },
    getCountryCallingCodeObject() {
      return {
        order: 0,
        type: "countryCallingCodes",
        label: "Country",
        required: true,
        default: 4
      };
    }
  }
};
const _hoisted_1$1 = { class: "form-designer-col" };
const _hoisted_2$1 = { class: "d-flex ga-2" };
const _hoisted_3$1 = { class: "flex-1-0" };
const _hoisted_4$1 = { key: 1 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MfpTextField = resolveComponent("MfpTextField");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    !$props.designer && $props.field.type == "markup" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$MfpMapFieldTypeToComponent($props.field.type)), {
      key: 0,
      modelValue: $props.field.value,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.field.value = $event),
      "item-key": $props.itemKey,
      field: $props.field,
      label: $props.field.label,
      required: $props.field.required,
      fixed: $props.field.fixed,
      designer: $props.designer,
      disabled: $props.designer
    }, null, 8, ["modelValue", "item-key", "field", "label", "required", "fixed", "designer", "disabled"])) : $props.field.type !== "hidden" ? (openBlock(), createBlock(VCard, {
      key: 1,
      variant: "elevated",
      class: "mb-2 elevation-4"
    }, {
      append: withCtx(() => [
        !$props.field.fixed && $props.designer ? (openBlock(), createBlock(VBtn, {
          key: 0,
          onClick: _cache[1] || (_cache[1] = ($event) => $options.remove($props.itemKey)),
          icon: "mdi:mdi-close",
          variant: "total",
          density: "compact"
        })) : createCommentVNode("v-if", true)
      ]),
      default: withCtx(() => [
        createVNode(VCardTitle, {
          class: "genericTitle",
          color: "aft-dark-blue"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2$1, [
              $props.designer ? (openBlock(), createBlock(VIcon, {
                key: 0,
                class: "handle",
                icon: "mdi:mdi-arrow-up-down",
                size: "small"
              })) : createCommentVNode("v-if", true),
              createBaseVNode("div", _hoisted_3$1, [
                $props.designer ? (openBlock(), createBlock(_component_MfpTextField, {
                  key: 0,
                  modelValue: _ctx.fieldTextLabel,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.fieldTextLabel = $event),
                  field: {},
                  designer: $props.designer,
                  solo: "",
                  class: "mr-4"
                }, null, 8, ["modelValue", "designer"])) : $props.field.type != "markup" ? (openBlock(), createElementBlock(
                  "span",
                  _hoisted_4$1,
                  toDisplayString(_ctx.fieldTextLabel),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true),
                $props.designer ? (openBlock(), createElementBlock(
                  "span",
                  {
                    key: 2,
                    class: normalizeClass(["d-flex justify-end pt-4 pr-4 text-caption", { "text-error": _ctx.fieldTextLabel.length > 100 }])
                  },
                  toDisplayString(_ctx.fieldTextLabel.length) + "/100 ",
                  3
                  /* TEXT, CLASS */
                )) : createCommentVNode("v-if", true)
              ]),
              createBaseVNode("div", null, [
                $props.designer ? (openBlock(), createBlock(VCheckbox, {
                  key: 0,
                  modelValue: _ctx.fieldRequired,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.fieldRequired = $event),
                  disabled: $props.field.fixed,
                  designer: $props.designer,
                  label: "Required",
                  class: "mr-4"
                }, null, 8, ["modelValue", "disabled", "designer"])) : createCommentVNode("v-if", true),
                $props.designer && $props.field.type == "markup" ? (openBlock(), createBlock(VCheckbox, {
                  key: 1,
                  modelValue: _ctx.fieldOrderAbove,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.fieldOrderAbove = $event),
                  designer: $props.designer,
                  label: "Display Above",
                  class: "mr-4"
                }, null, 8, ["modelValue", "designer"])) : createCommentVNode("v-if", true),
                $props.designer && $props.field.type == "markup" ? (openBlock(), createBlock(VCheckbox, {
                  key: 2,
                  modelValue: _ctx.fieldOrderBelow,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.fieldOrderBelow = $event),
                  designer: $props.designer,
                  label: "Display Below",
                  class: "mr-4"
                }, null, 8, ["modelValue", "designer"])) : createCommentVNode("v-if", true)
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }),
        createVNode(VCardText, null, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.$MfpMapFieldTypeToComponent($props.field.type)), {
              modelValue: $props.field.value,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $props.field.value = $event),
              "item-key": $props.itemKey,
              field: $props.field,
              label: $props.field.label,
              required: $props.field.required,
              fixed: $props.field.fixed,
              designer: $props.designer,
              disabled: $props.designer
            }, null, 8, ["modelValue", "item-key", "field", "label", "required", "fixed", "designer", "disabled"]))
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      _: 1
      /* STABLE */
    })) : createCommentVNode("v-if", true)
  ]);
}
const MfpGenericField = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpGenericField.vue"]]);
const _sfc_main$1 = {
  name: "MfpErrorDialog",
  props: {
    errorResponse: { type: Object, default: null }
  },
  data: () => ({
    dialog: false,
    title: "Error",
    message: "There was an error",
    errors: []
  }),
  watch: {
    errorResponse(newErrorResponse) {
      this.title = newErrorResponse.statusText === "Unprocessable Entity" ? "Unable to Process" : newErrorResponse.statusText;
      this.message = newErrorResponse.data.message;
      this.errors = newErrorResponse.data.errors;
      this.dialog = !!this.errors;
    }
  },
  methods: {
    close() {
      this.dialog = false;
      this.title = "Error";
      this.message = "There was an error";
      this.errors = [];
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VDialog, {
    modelValue: _ctx.dialog,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.dialog = $event),
    "max-width": "600px"
  }, {
    default: withCtx(() => [
      createVNode(VCard, null, {
        default: withCtx(() => [
          createVNode(VCardTitle, { class: "text-white bg-error-darken-2" }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString(_ctx.title),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCardText, null, {
            default: withCtx(() => [
              createVNode(VCardSubtitle, null, {
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
              createVNode(VContainer, null, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createBaseVNode("ul", null, [
                            (openBlock(true), createElementBlock(
                              Fragment,
                              null,
                              renderList(_ctx.errors, (error, index) => {
                                return openBlock(), createElementBlock(
                                  "li",
                                  { key: index },
                                  toDisplayString(error[0]),
                                  1
                                  /* TEXT */
                                );
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
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(VCardActions, null, {
            default: withCtx(() => [
              createVNode(VSpacer),
              createVNode(VBtn, {
                color: "blue-darken-1",
                variant: "text",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.close())
              }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
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
  }, 8, ["modelValue"]);
}
const MfpErrorDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/shared/components/MfpErrorDialog.vue"]]);
const _sfc_main = {
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
    formValidationMessage: "",
    signatureError: "",
    designer: false,
    fab: false,
    uniqueKey: 0,
    reCaptchaEnabled: false,
    reCaptchaKey: null,
    qImage: null,
    randomImageId: null,
    mathCaptchaEnabled: false,
    mathCaptchaAnswer: "",
    eDuesPaymentTemplateIds: [4, 5, 6],
    formNotFound: false
  }),
  setup() {
    const goTo = useGoTo();
    return {
      goTo
    };
  },
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
    this.disableButton = this.disabled;
    if (this.$route.params.id || this.formPredefined) {
      this.getData(this.$route.params.id);
    } else {
      this.getFormIdForCustomUrl(this.$route.params.affiliateNumber, this.$route.params.customUrl);
    }
  },
  methods: {
    captchaInit() {
      if (this.eDuesPaymentTemplateIds.includes(parseInt(this.form.form_template_id, 10))) {
        if (!this.reCaptchaKey) {
          axios.get("/api/v3/memberforms/recaptcha/get-info").then((response) => {
            if (response.data && response.data.key && response.data.key.length > 0) {
              this.reCaptchaEnabled = response.data.enabled;
              this.reCaptchaKey = atob(response.data.key);
            }
          });
        }
        if (!this.qImage) {
          axios.get("/api/v3/memberforms/mathcaptcha/get-info").then((response) => {
            if (response.data) {
              this.mathCaptchaEnabled = response.data.enabled;
              if (this.mathCaptchaEnabled) {
                this.fetchMathCaptcha();
              }
            }
          });
        }
      }
    },
    getData(id) {
      this.loading = true;
      if (this.formPredefined) {
        this.form = this.formPredefined;
        this.loading = false;
      } else {
        api$1.getForm(id).then((response) => {
          this.form = response.data;
          if (!this.form) {
            this.disableButton = true;
          }
          this.captchaInit();
          this.loading = false;
        });
      }
    },
    getFormIdForCustomUrl(affiliateNumber, customUrl) {
      api$1.getFormIdByCustomUrl(affiliateNumber, customUrl).then((response) => {
        if (response.data) {
          this.getData(response.data);
        } else {
          this.formNotFound = true;
        }
      });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.goTo(0);
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
        if (mailingAddress && billingAddress) {
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
            this.uniqueKey = Math.floor(Math.random() * 10);
          }
        }
      }
    },
    getStateName(stateList, stateCode) {
      if (stateCode && stateCode > 0) {
        const oState = stateList.filter((state) => state.itemValue === stateCode.toString());
        return oState ? oState[0].itemText : "";
      }
      return "";
    },
    reCaptchaInit(userAction) {
      if (!this.reCaptchaEnabled) {
        return false;
      }
      if (typeof window === "undefined" || !this.reCaptchaKey) {
        return false;
      }
      if (Object.hasOwn(window, "grecaptcha")) {
        window.grecaptcha.enterprise.ready(async () => {
          const token = await window.grecaptcha.enterprise.execute(
            this.reCaptchaKey,
            { action: userAction }
          );
          axios.post("/api/v3/memberforms/recaptcha/create-assessment", {
            action: userAction,
            token
          }).then((response) => {
          });
        });
      }
      return true;
    },
    fetchMathCaptcha() {
      axios.get("/api/v3/memberforms/mathcaptcha/generate").then((response) => {
        if (response.data) {
          this.qImage = response.data.img;
          this.randomImageId = response.data.randomImageId;
        }
      });
    },
    async onSubmit(event) {
      const results = await event;
      const signatureField = this.getFormField("signature");
      const customCopeField = this.getFormField("customCope");
      const signatureOtherField = this.getFormField("signatureOther");
      let signature = false;
      if (this.eDuesPaymentTemplateIds.includes(parseInt(this.form.form_template_id, 10))) {
        if (this.reCaptchaEnabled) {
          this.reCaptchaInit("PublicForm/submit");
        }
      }
      if (!results.valid) {
        this.formValidationMessage = "Please fill in all required fields.";
      }
      if (customCopeField) {
        if (customCopeField.value.signature === "" || customCopeField.value.signature == null) {
          this.validate();
          document.querySelector(".mfp-signature-field").classList.add("sig-err");
          await this.goTo(0);
        } else {
          signature = true;
          document.querySelector(".mfp-signature-field").classList.remove("sig-err");
          await this.goTo(0);
        }
      }
      if (signatureOtherField) {
        if (typeof signatureOtherField.fields.signatureOther.value === "undefined" && signatureOtherField.fields.signatureOther.required === true || signatureOtherField.fields.signatureOther.value == null && signatureOtherField.fields.signatureOther.required === true) {
          this.validate();
          document.querySelector(".signatureOther").classList.add("sig-err");
          await this.goTo(0);
        } else {
          signature = true;
          document.querySelector(".signatureOther").classList.remove("sig-err");
          await this.goTo(0);
        }
      }
      if (signatureField) {
        if (typeof signatureField.fields.signature.value === "undefined" && signatureField.fields.signature.required === true || signatureField.fields.signature.value == null && signatureField.fields.signature.required === true) {
          this.validate();
          document.querySelector(".signature").classList.add("sig-err");
          await this.goTo(0);
        } else {
          signature = true;
          document.querySelector(".signature").classList.remove("sig-err");
          await this.goTo(0);
        }
      }
      if (signature) {
        await this.submit(results.valid);
      }
    },
    async submit(isValid2) {
      console.log("form", this.form, isValid2);
      if (isValid2) {
        this.loading = true;
        this.disableButton = true;
        this.form.mathCaptchaAnswer = this.mathCaptchaAnswer;
        this.form.randomImageId = this.randomImageId;
        api$1.sendFormData(this.form.id, this.form).then((response) => {
          console.log(response.data);
          this.$router.push({ name: "thankyou", params: { id: this.form.id } });
        }).catch((error) => {
          this.errorResponse = error.response;
          this.disableButton = false;
          if (this.eDuesPaymentTemplateIds.includes(parseInt(this.form.form_template_id, 10))) {
            this.fetchMathCaptcha();
            this.mathCaptchaAnswer = "";
          }
          console.log("FORM ERRORS", error.response);
        }).finally(() => {
          this.loading = false;
        });
      }
      await this.goTo(0);
    }
  }
};
const _hoisted_1 = { class: "form-card-header" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { class: "py-4 form-title" };
const _hoisted_4 = { class: "sig-alert" };
const _hoisted_5 = { class: "d-block" };
const _hoisted_6 = ["innerHTML"];
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = { key: 2 };
const _hoisted_10 = ["src"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MfpWorkLocation = resolveComponent("MfpWorkLocation");
  const _component_MfpGenericField = resolveComponent("MfpGenericField");
  const _component_MfpErrorDialog = resolveComponent("MfpErrorDialog");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      !_ctx.formNotFound ? (openBlock(), createBlock(VForm, {
        key: 0,
        ref: "form",
        modelValue: _ctx.formValid,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.formValid = $event),
        autocomplete: "off",
        class: "v-form",
        disabled: $props.disabled,
        "validate-on": "submit",
        onSubmit: withModifiers($options.onSubmit, ["prevent"])
      }, {
        default: withCtx(() => [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                _ctx.form.show_fed_logo == false && _ctx.form.show_aft_logo == false && _ctx.form.show_local_logo == false ? (openBlock(), createElementBlock("div", _hoisted_2)) : (openBlock(), createBlock(VCardTitle, {
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
                  _hoisted_3,
                  toDisplayString(_ctx.form.display_name),
                  1
                  /* TEXT */
                )
              ]),
              createVNode(VCardText, { class: "form-header" }, {
                default: withCtx(() => [
                  !_ctx.formValid && _ctx.formValidationMessage ? (openBlock(), createBlock(VAlert, {
                    key: 0,
                    density: "compact",
                    variant: "outlined",
                    type: "error",
                    class: "mx-4"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_4, [
                        createBaseVNode(
                          "span",
                          _hoisted_5,
                          toDisplayString(_ctx.formValidationMessage),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })) : createCommentVNode("v-if", true),
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createCommentVNode(" eslint-disable vue/no-v-html "),
                              createBaseVNode("p", {
                                innerHTML: _ctx.form.description
                              }, null, 8, _hoisted_6),
                              createCommentVNode("eslint-enable")
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }),
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
                                      field.type == "employmentInformation" ? (openBlock(), createElementBlock("div", _hoisted_7, [
                                        createVNode(_component_MfpWorkLocation, {
                                          field,
                                          required: field.required,
                                          designer: _ctx.designer
                                        }, null, 8, ["field", "required", "designer"])
                                      ])) : field.type == "billingAddress" ? (openBlock(), createElementBlock("div", _hoisted_8, [
                                        (openBlock(), createBlock(_component_MfpGenericField, {
                                          key: _ctx.uniqueKey,
                                          "item-key": field.order,
                                          field,
                                          required: field.required
                                        }, null, 8, ["item-key", "field", "required"]))
                                      ])) : (openBlock(), createElementBlock("div", _hoisted_9, [
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
                      )),
                      _ctx.mathCaptchaEnabled ? (openBlock(), createBlock(VRow, { key: 0 }, {
                        default: withCtx(() => [
                          !$props.disabled && !_ctx.loading && _ctx.form.form_template_id && _ctx.eDuesPaymentTemplateIds.includes(parseInt(_ctx.form.form_template_id, 10)) ? (openBlock(), createBlock(VCol, { key: 0 }, {
                            default: withCtx(() => [
                              _cache[5] || (_cache[5] = createTextVNode(" Please solve the following math question ")),
                              createBaseVNode("img", { src: _ctx.qImage }, null, 8, _hoisted_10),
                              createVNode(VTooltip, {
                                location: "right",
                                color: "primary-darken-2"
                              }, {
                                activator: withCtx(({ props }) => [
                                  createVNode(
                                    VBtn,
                                    mergeProps({
                                      color: "primary",
                                      class: "btn-tooltip ml-4"
                                    }, props, {
                                      onClick: _cache[0] || (_cache[0] = ($event) => $options.fetchMathCaptcha()),
                                      icon: "mdi:mdi-cached"
                                    }),
                                    null,
                                    16
                                    /* FULL_PROPS */
                                  )
                                ]),
                                default: withCtx(() => [
                                  _cache[3] || (_cache[3] = createBaseVNode(
                                    "span",
                                    null,
                                    "Refresh Math question",
                                    -1
                                    /* HOISTED */
                                  ))
                                ]),
                                _: 1
                                /* STABLE */
                              }),
                              createVNode(VTextField, {
                                modelValue: _ctx.mathCaptchaAnswer,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.mathCaptchaAnswer = $event),
                                label: "Math answer",
                                maxlength: "3",
                                required: ""
                              }, {
                                label: withCtx(() => _cache[4] || (_cache[4] = [
                                  createBaseVNode(
                                    "span",
                                    null,
                                    [
                                      createBaseVNode("strong", { class: "text-red" }, " * ")
                                    ],
                                    -1
                                    /* HOISTED */
                                  ),
                                  createTextVNode(" Math answer (required) ")
                                ])),
                                _: 1
                                /* STABLE */
                              }, 8, ["modelValue"])
                            ]),
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
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(VCardActions, { class: "d-flex justify-center" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    disabled: _ctx.disableButton,
                    color: "primary",
                    class: "px-6",
                    size: "large",
                    type: "submit",
                    variant: "elevated"
                  }, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode(" Join! ")
                    ])),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"])
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_MfpErrorDialog, { "error-response": _ctx.errorResponse }, null, 8, ["error-response"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue", "disabled", "onSubmit"])) : (openBlock(), createBlock(VCard, {
        key: 1,
        class: "bg-404"
      }, {
        default: withCtx(() => [
          createVNode(VCardTitle, null, {
            default: withCtx(() => _cache[7] || (_cache[7] = [
              createBaseVNode(
                "strong",
                null,
                "Oops! This page does not exist!",
                -1
                /* HOISTED */
              )
            ])),
            _: 1
            /* STABLE */
          }),
          createVNode(VCardText, null, {
            default: withCtx(() => _cache[8] || (_cache[8] = [
              createTextVNode(" 404: Page not found ")
            ])),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })),
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
      withDirectives(createVNode(VBtn, {
        position: "fixed",
        location: "bottom right",
        class: "ma-4",
        color: "#6F9FCD",
        onClick: withModifiers($options.toTop, ["prevent"]),
        icon: "mdi:mdi-chevron-up"
      }, null, 8, ["onClick"]), [
        [vShow, _ctx.fab],
        [Scroll, $options.onScroll]
      ])
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const PageForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a3bdc682"], ["__file", "/var/www/html/packages/aft/memberforms/resources/js/src/public/PageForm.vue"]]);
const MfpTypes = {
  install(app, options) {
    app.config.globalProperties.$MfpMapFieldTypeToComponent = (type) => {
      switch (type) {
        case "text":
          return "MfpTextField";
        case "textarea":
          return "MfpTextAreaField";
        case "email":
          return "MfpTextField";
        case "markup":
          return "MfpMarkupField";
        case "select":
          return "MfpSelectField";
        case "checkbox":
          return "MfpCheckboxField";
        case "checktext":
          return "MfpChecktextField";
        case "drawing":
          return "MfpSignatureField";
        case "group":
          return "MfpGroupField";
        case "search":
          return "MfpSearchSelectField";
        case "date":
          return "DateOfBirth";
        case "LocalDuesCategory":
          return "LocalDuesCategory";
        case "childAffiliate":
          return "ChildAffiliate";
        case "workLocation":
          return "WorkLocation";
        case "workStructure":
          return "WorkStructure";
        case "jobTitle":
          return "JobTitle";
        case "hidden":
          return "MfpHiddenField";
        case "phone":
          return "Phone";
        case "customSelectionField":
          return "MfpCustomSelectionField";
        case "payment":
          return "MfpPayment";
        case "customCope":
          return "MfpCustomCopeField";
        case "employmentInformation":
          return "MfpWorkLocation";
        case "billingAddress":
          return "MfpBillingAddress";
        case "countryCallingCodes":
          return "MfpCountryCallingCodeSelect";
        default:
          return "MfpTextField";
      }
    };
  }
};
export {
  FormSearchSelector as F,
  MfpTextAreaField as M,
  PageForm as P,
  MfpTextField as a,
  MfpGenericField as b,
  MfpWorkLocation as c,
  MfpErrorDialog as d,
  api$1 as e,
  MfpTypes as f,
  script as s
};
//# sourceMappingURL=MfpTypes-RkDj85EQ.js.map
