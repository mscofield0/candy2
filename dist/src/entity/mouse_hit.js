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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mouseHit = exports.MouseHit = void 0;
const core_1 = __importDefault(require("@flatten-js/core"));
const quadtree_ts_1 = require("@timohausmann/quadtree-ts");
const entity_1 = require("./entity");
const util = __importStar(require("../util/common"));
class MouseHit extends entity_1.Entity {
    constructor(x, y) {
        super();
        this.position_ = new core_1.default.Point(x, y);
    }
    static fromMouseEvent(event) {
        return new MouseHit(event.clientX, event.clientY);
    }
    qtIndex(node) {
        return quadtree_ts_1.Rectangle.prototype.qtIndex.call({
            x: this.position_.x,
            y: this.position_.y,
            width: 0,
            height: 0,
        }, node);
    }
    get position() {
        return this.position_;
    }
    set position(value) {
        this.position_ = value;
    }
    get rotation() {
        util.unreachable();
        return 0;
    }
    set rotation(_value) {
        util.unreachable();
    }
    get points() {
        return [this.position_];
    }
    set points(value) {
        util.assert(value.length == 1, `A MouseHit is composed of a single point, you passed in ${value.length}!`);
        this.position_ = value[0];
    }
    translate(_by) {
        util.unreachable();
        return new core_1.default.Point(0, 0);
    }
    translateX(_by) {
        util.unreachable();
        return new core_1.default.Point(0, 0);
    }
    translateY(_by) {
        util.unreachable();
        return new core_1.default.Point(0, 0);
    }
    rotate(_by) {
        util.unreachable();
        return 0;
    }
    shape() {
        return this.position_.clone();
    }
    render(_ctx) {
        util.unreachable();
    }
}
exports.MouseHit = MouseHit;
function mouseHit(event) {
    return MouseHit.fromMouseEvent(event);
}
exports.mouseHit = mouseHit;
