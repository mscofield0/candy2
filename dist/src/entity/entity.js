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
exports.Entity = void 0;
const render_1 = require("../util/render");
const util = __importStar(require("../util/common"));
const errors = __importStar(require("../errors"));
class Entity {
    constructor(data, ctx = (0, render_1.defaultRenderContextData)()) {
        this.ctx = ctx;
        this.data = data;
    }
    intersects(other) {
        const thisShape = this.shape();
        console.log('thisShape: ', thisShape);
        util.assert(typeof thisShape.intersect === 'function', 'Shape has no \'intersect()\' method! Shape: ', thisShape);
        const points = thisShape.intersect(other.shape());
        return points != undefined && points.length != 0;
    }
    /// Event handling API
    isListening() {
        return this.eventListenerRegistry != null;
    }
    attachEventRegistry(registry) {
        this.eventListenerRegistry = registry;
    }
    on(category, listener) {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);
        this.eventListenerRegistry.insert(this, category, listener);
    }
    onCustom(name, listener) {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);
        this.eventListenerRegistry.insertCustom(this, name, listener);
    }
    detach(category) {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);
        this.eventListenerRegistry.detach(this, category);
    }
    detachCustom(name) {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);
        this.eventListenerRegistry.detachCustom(this, name);
    }
    dispatch(name, event) {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);
        this.eventListenerRegistry.dispatch(name, event);
    }
    __friend_canvas_getEntityContext() {
        return this.ctx;
    }
    get fillStyle() { return this.ctx.fillStyle; }
    set fillStyle(value) { this.ctx.fillStyle = value; }
    get font() { return this.ctx.font; }
    set font(value) { this.ctx.font = value; }
    get globalAlpha() { return this.ctx.globalAlpha; }
    set globalAlpha(value) { this.ctx.globalAlpha = value; }
    get globalCompositeOperation() { return this.ctx.globalCompositeOperation; }
    set globalCompositeOperation(value) { this.ctx.globalCompositeOperation = value; }
    get imageSmoothingEnabled() { return this.ctx.imageSmoothingEnabled; }
    set imageSmoothingEnabled(value) { this.ctx.imageSmoothingEnabled = value; }
    get lineCap() { return this.ctx.lineCap; }
    set lineCap(value) { this.ctx.lineCap = value; }
    get lineDashOffset() { return this.ctx.lineDashOffset; }
    set lineDashOffset(value) { this.ctx.lineDashOffset = value; }
    get lineJoin() { return this.ctx.lineJoin; }
    set lineJoin(value) { this.ctx.lineJoin = value; }
    get lineWidth() { return this.ctx.lineWidth; }
    set lineWidth(value) { this.ctx.lineWidth = value; }
    get miterLimit() { return this.ctx.miterLimit; }
    set miterLimit(value) { this.ctx.miterLimit = value; }
    get shadowBlur() { return this.ctx.shadowBlur; }
    set shadowBlur(value) { this.ctx.shadowBlur = value; }
    get shadowColor() { return this.ctx.shadowColor; }
    set shadowColor(value) { this.ctx.shadowColor = value; }
    get shadowOffsetX() { return this.ctx.shadowOffsetX; }
    set shadowOffsetX(value) { this.ctx.shadowOffsetX = value; }
    get shadowOffsetY() { return this.ctx.shadowOffsetY; }
    set shadowOffsetY(value) { this.ctx.shadowOffsetY = value; }
    get strokeStyle() { return this.ctx.strokeStyle; }
    set strokeStyle(value) { this.ctx.strokeStyle = value; }
    get textAlign() { return this.ctx.textAlign; }
    set textAlign(value) { this.ctx.textAlign = value; }
    get textBaseline() { return this.ctx.textBaseline; }
    set textBaseline(value) { this.ctx.textBaseline = value; }
}
exports.Entity = Entity;
