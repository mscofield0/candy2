"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneRenderContextData = exports.defaultRenderContextData = void 0;
function defaultRenderContextData() {
    return {
        fillStyle: '#000',
        font: '10px sans-serif',
        globalAlpha: 1.0,
        globalCompositeOperation: 'source-over',
        imageSmoothingEnabled: true,
        lineCap: 'butt',
        lineDashOffset: 0.0,
        lineJoin: 'miter',
        lineWidth: 1.0,
        miterLimit: 10.0,
        shadowBlur: 0,
        shadowColor: '#000',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        strokeStyle: '#000',
        textAlign: 'start',
        textBaseline: 'alphabetic',
    };
}
exports.defaultRenderContextData = defaultRenderContextData;
function cloneRenderContextData(from) {
    return {
        fillStyle: from.fillStyle,
        font: from.font,
        globalAlpha: from.globalAlpha,
        globalCompositeOperation: from.globalCompositeOperation,
        imageSmoothingEnabled: from.imageSmoothingEnabled,
        lineCap: from.lineCap,
        lineDashOffset: from.lineDashOffset,
        lineJoin: from.lineJoin,
        lineWidth: from.lineWidth,
        miterLimit: from.miterLimit,
        shadowBlur: from.shadowBlur,
        shadowColor: from.shadowColor,
        shadowOffsetX: from.shadowOffsetX,
        shadowOffsetY: from.shadowOffsetY,
        strokeStyle: from.strokeStyle,
        textAlign: from.textAlign,
        textBaseline: from.textBaseline,
    };
}
exports.cloneRenderContextData = cloneRenderContextData;
