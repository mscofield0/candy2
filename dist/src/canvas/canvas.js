"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const quadtree_ts_1 = require("@timohausmann/quadtree-ts");
const util = __importStar(require("../util/common"));
const event_listener_registry_1 = require("./event_listener_registry");
const mouse_hit_1 = require("../entity/mouse_hit");
const selectable_entity_1 = require("../entity/selectable_entity");
class Canvas {
    constructor(element, contextAttribs, options = {}) {
        var _a, _b, _c;
        this.domElement = element;
        const renderCtx = this.domElement.getContext('2d', contextAttribs);
        util.assert(renderCtx != null, `Could not create a '2d' context from this canvas with these context attributes`, contextAttribs);
        this.ctx = renderCtx;
        this.entities = [];
        // Defaulted to the size of the canvas element
        this.maxSize = (_a = options.maxSize) !== null && _a !== void 0 ? _a : this.size.client;
        // Generate props for quadtree
        const props = {
            maxObjects: (_b = options.maxObjects) !== null && _b !== void 0 ? _b : 2048,
            maxLevels: (_c = options.maxLevels) !== null && _c !== void 0 ? _c : 16,
            width: this.maxSize.width,
            height: this.maxSize.height,
        };
        this.quadtree = new quadtree_ts_1.Quadtree(props);
        this.eventListenerRegistry_ = new event_listener_registry_1.EventListenerRegistry();
        this.registerCanvasHooks();
    }
    registerCanvasHooks() {
        this.registerCanvasMouseHook('mousedown');
        this.registerCanvasMouseHook('mouseup');
        this.registerCanvasMouseHook('mousemove');
        this.registerCanvasKeyHook('keydown');
        this.registerCanvasKeyHook('keyup');
        this.registerCanvasKeyHook('keypress');
    }
    registerCanvasMouseHook(category) {
        this.on(category, (event) => {
            const hit = (0, mouse_hit_1.mouseHit)(event);
            console.log(`Mouse hit at (${hit.position.x}, ${hit.position.y})`);
            const entities = this.quadtree.retrieve(hit);
            console.log('Entities: ', entities);
            const intersecting = entities.filter((x) => x.isListening() && x.intersects(hit));
            console.log('Intersecting: ', intersecting);
            intersecting.forEach((x) => {
                this.eventListenerRegistry_.dispatchTo(x, category, event);
                console.log('Mouse hit: ', hit);
                console.log('Entities in quad: ', entities);
                console.log('Intersecting entities: ', intersecting);
            });
        });
    }
    registerCanvasKeyHook(category) {
        this.on(category, (event) => {
            const selectable = this.entities.filter((x) => x instanceof selectable_entity_1.SelectableEntity);
            const selected = selectable.filter((x) => x.selected);
            selected.forEach((x) => this.eventListenerRegistry_.dispatchTo(x, category, event));
        });
    }
    render() {
        this.ctx.save();
        this.entities.forEach((x) => {
            this.setContext(x.__friend_canvas_getEntityContext());
            x.render(this.ctx);
        });
        this.ctx.restore();
    }
    setContext(ctx) {
        this.ctx.fillStyle = ctx.fillStyle;
        this.ctx.font = ctx.font;
        this.ctx.globalAlpha = ctx.globalAlpha;
        this.ctx.globalCompositeOperation = ctx.globalCompositeOperation;
        this.ctx.imageSmoothingEnabled = ctx.imageSmoothingEnabled;
        this.ctx.lineCap = ctx.lineCap;
        this.ctx.lineDashOffset = ctx.lineDashOffset;
        this.ctx.lineJoin = ctx.lineJoin;
        this.ctx.lineWidth = ctx.lineWidth;
        this.ctx.miterLimit = ctx.miterLimit;
        this.ctx.shadowBlur = ctx.shadowBlur;
        this.ctx.shadowColor = ctx.shadowColor;
        this.ctx.shadowOffsetX = ctx.shadowOffsetX;
        this.ctx.shadowOffsetY = ctx.shadowOffsetY;
        this.ctx.strokeStyle = ctx.strokeStyle;
        this.ctx.textAlign = ctx.textAlign;
        this.ctx.textBaseline = ctx.textBaseline;
    }
    get size() {
        return {
            normal: { width: this.domElement.width, height: this.domElement.height },
            client: { width: this.domElement.clientWidth, height: this.domElement.clientHeight },
            offset: { width: this.domElement.offsetWidth, height: this.domElement.offsetHeight },
            scroll: { width: this.domElement.scrollWidth, height: this.domElement.scrollHeight },
        };
    }
    get width() {
        return {
            normal: this.domElement.width,
            client: this.domElement.clientWidth,
            offset: this.domElement.offsetWidth,
            scroll: this.domElement.scrollWidth,
        };
    }
    get height() {
        return {
            normal: this.domElement.height,
            client: this.domElement.clientHeight,
            offset: this.domElement.offsetHeight,
            scroll: this.domElement.scrollHeight,
        };
    }
    get eventListenerRegistry() {
        return this.eventListenerRegistry_;
    }
    toBlob(imageType, imageQuality) {
        let blob = null;
        this.domElement.toBlob((blob_) => blob = blob_, imageType, imageQuality);
        util.assert(blob != null, 'Could not convert the canvas into a Blob');
        return blob;
    }
    toDataURL(imageType, encoderOptions) {
        const dataUrl = this.domElement.toDataURL(imageType, encoderOptions);
        return dataUrl;
    }
    style(pseudoElement) {
        const style = window.getComputedStyle(this.domElement, pseudoElement);
        return style;
    }
    styleMut() {
        return this.domElement.style;
    }
    addClass(name) {
        this.domElement.classList.add(name);
    }
    removeClass(name) {
        this.domElement.classList.remove(name);
    }
    blur() {
        this.domElement.blur();
    }
    click() {
        this.domElement.click();
    }
    focus(preventScroll = false) {
        const focusOptions = { preventScroll };
        this.domElement.focus(focusOptions);
    }
    resize(size) {
        this.domElement.width = size.width;
        this.domElement.height = size.height;
    }
    on(eventName, listener, options) {
        this.domElement.addEventListener(eventName, listener, options);
        return listener;
    }
    detach(eventName, listener, options) {
        this.domElement.removeEventListener(eventName, listener, options);
    }
    dispatch(eventName, options) {
        const event = new Event(eventName, options);
        return this.domElement.dispatchEvent(event);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width.client, this.height.client);
    }
    clearEntities() {
        this.entities = [];
        this.quadtree.clear();
    }
    add(entity) {
        this.entities.push(entity);
        this.quadtree.insert(entity);
        return entity;
    }
    remove(entity) {
        const idx = this.entities.findIndex((x) => x == entity);
        this.entities.splice(idx, 1);
        this.quadtree.clear();
        this.entities.forEach((x) => this.quadtree.insert(x));
    }
    recalculate() {
        this.quadtree.clear();
        this.entities.forEach((x) => this.quadtree.insert(x));
    }
    find(pred) {
        return this.entities.find(pred);
    }
    findMany(pred) {
        let found = [];
        this.entities.forEach((obj) => {
            if (pred(obj))
                found.push(obj);
        });
        if (found.length == 0)
            return undefined;
        return found;
    }
}
exports.Canvas = Canvas;
