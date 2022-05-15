export type GlobalCompositeOperation = 'source-over' | 'source-in' | 'source-out' | 'source-atop' | 
    'destination-over' | 'destination-in' | 'destination-out' | 'destination-atop' | 
    'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' |
    'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' |
    'hue' | 'saturation' | 'color' | 'luminosity';

export type LineCap = 'butt' | 'round' | 'square';
export type LineJoin = 'round' | 'bevel' | 'miter';
export type ColorStyle = string | CanvasGradient | CanvasPattern;
export type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end';
export type TextBaseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';

export type RenderContextData = {
    fillStyle: ColorStyle,
    font: string,
    globalAlpha: number,
    globalCompositeOperation: GlobalCompositeOperation,
    imageSmoothingEnabled: boolean,
    lineCap: LineCap,
    lineDashOffset: number,
    lineJoin: LineJoin,
    lineWidth: number,
    miterLimit: number,
    shadowBlur: number,
    shadowColor: string,
    shadowOffsetX: number,
    shadowOffsetY: number,
    strokeStyle: ColorStyle,
    textAlign: TextAlign,
    textBaseline: TextBaseline,
};

export function defaultRenderContextData(): RenderContextData {
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

export function cloneRenderContextData(from: RenderContextData): RenderContextData {
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

