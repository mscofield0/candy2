import { Indexable, NodeGeometry } from '@timohausmann/quadtree-ts';
import { EventCategory, EventListenerRegistry } from '../canvas/event_listener_registry';
import { RenderContextData, defaultRenderContextData, ColorStyle, GlobalCompositeOperation, LineCap, LineJoin, TextAlign, TextBaseline } from '../util/render';
import * as util from '../util/common';
import * as errors from '../errors';
import Flatten from '@flatten-js/core';

export abstract class Entity implements Indexable {
    protected ctx: RenderContextData;
    protected eventListenerRegistry?: EventListenerRegistry;
    public data?: any;

    public constructor(data?: any, ctx: RenderContextData = defaultRenderContextData()) {
        this.ctx = ctx;
        this.data = data;
    }

    /// Spatial context API
    public abstract get rotation(): number;
    public abstract set rotation(value: number);

    public abstract get points(): Flatten.Point[];
    protected abstract set points(value: Flatten.Point[]);

    public abstract get position(): Flatten.Point;
    public abstract set position(value: Flatten.Point);

    public abstract translate(by: Flatten.Vector): Flatten.Point;
    public abstract translateX(by: number): Flatten.Point;
    public abstract translateY(by: number): Flatten.Point;

    public abstract rotate(by: number): number;

    public abstract shape(): Flatten.Shape;
    public abstract qtIndex(node: NodeGeometry): number[];
    
    public intersects(other: Entity): boolean {
        const thisShape = this.shape() as any;
        console.log('thisShape: ', thisShape);
        util.assert(typeof thisShape.intersect === 'function', 'Shape has no \'intersect()\' method! Shape: ', thisShape);

        const points = thisShape.intersect(other.shape());
        return points != undefined && points.length != 0;
    }

    /// Event handling API
    public isListening(): boolean {
        return this.eventListenerRegistry != null;
    }
    
    public attachEventRegistry(registry: EventListenerRegistry): void {
        this.eventListenerRegistry = registry;
    }

    public on(category: EventCategory, listener: EventListener): void {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);

        this.eventListenerRegistry!.insert(this, category, listener);
    }

    public onCustom(name: string, listener: EventListener): void {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);

        this.eventListenerRegistry!.insertCustom(this, name, listener);
    }

    public detach(category: EventCategory): void {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);

        this.eventListenerRegistry!.detach(this, category);
    }

    public detachCustom(name: string): void {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);

        this.eventListenerRegistry!.detachCustom(this, name);
    }

    public dispatch(name: string, event: Event): void {
        util.assert(this.eventListenerRegistry != null, errors.EVENT_LISTENER_REGISTRY_NOT_ATTACHED);

        this.eventListenerRegistry!.dispatch(name, event);
    }

    /// Render context API
    public abstract render(ctx: CanvasRenderingContext2D): void;

    public __friend_canvas_getEntityContext(): RenderContextData {
        return this.ctx;
    }
    
    public get fillStyle(): ColorStyle { return this.ctx.fillStyle }
    public set fillStyle(value: ColorStyle) { this.ctx.fillStyle = value }

    public get font(): string { return this.ctx.font }
    public set font(value: string) { this.ctx.font = value }

    public get globalAlpha(): number { return this.ctx.globalAlpha }
    public set globalAlpha(value: number) { this.ctx.globalAlpha = value }

    public get globalCompositeOperation(): GlobalCompositeOperation { return this.ctx.globalCompositeOperation }
    public set globalCompositeOperation(value: GlobalCompositeOperation) { this.ctx.globalCompositeOperation = value }

    public get imageSmoothingEnabled(): boolean { return this.ctx.imageSmoothingEnabled }
    public set imageSmoothingEnabled(value: boolean) { this.ctx.imageSmoothingEnabled = value }

    public get lineCap(): LineCap { return this.ctx.lineCap }
    public set lineCap(value: LineCap) { this.ctx.lineCap = value }

    public get lineDashOffset(): number { return this.ctx.lineDashOffset }
    public set lineDashOffset(value: number) { this.ctx.lineDashOffset = value }

    public get lineJoin(): LineJoin { return this.ctx.lineJoin }
    public set lineJoin(value: LineJoin) { this.ctx.lineJoin = value }

    public get lineWidth(): number { return this.ctx.lineWidth }
    public set lineWidth(value: number) { this.ctx.lineWidth = value }

    public get miterLimit(): number { return this.ctx.miterLimit }
    public set miterLimit(value: number) { this.ctx.miterLimit = value }

    public get shadowBlur(): number { return this.ctx.shadowBlur }
    public set shadowBlur(value: number) { this.ctx.shadowBlur = value }

    public get shadowColor(): string { return this.ctx.shadowColor }
    public set shadowColor(value: string) { this.ctx.shadowColor = value }

    public get shadowOffsetX(): number { return this.ctx.shadowOffsetX }
    public set shadowOffsetX(value: number) { this.ctx.shadowOffsetX = value }

    public get shadowOffsetY(): number { return this.ctx.shadowOffsetY }
    public set shadowOffsetY(value: number) { this.ctx.shadowOffsetY = value }

    public get strokeStyle(): ColorStyle { return this.ctx.strokeStyle }
    public set strokeStyle(value: ColorStyle) { this.ctx.strokeStyle = value }

    public get textAlign(): TextAlign { return this.ctx.textAlign }
    public set textAlign(value: TextAlign) { this.ctx.textAlign = value }

    public get textBaseline(): TextBaseline { return this.ctx.textBaseline }
    public set textBaseline(value: TextBaseline) { this.ctx.textBaseline = value }
}

