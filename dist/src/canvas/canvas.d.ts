import { Quadtree } from '@timohausmann/quadtree-ts';
import { Entity } from '../entity/entity';
import * as util from '../util/common';
import { RenderContextData } from '../util/render';
import { EventListenerRegistry, KeyEventCategory, MouseEventCategory } from './event_listener_registry';
export declare class Canvas {
    protected domElement: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected entities: Entity[];
    protected quadtree: Quadtree<Entity>;
    protected maxSize: util.Size;
    protected eventListenerRegistry_: EventListenerRegistry;
    constructor(element: HTMLCanvasElement, contextAttribs?: CanvasRenderContextAttribType, options?: CanvasOptions);
    protected registerCanvasHooks(): void;
    protected registerCanvasMouseHook(category: MouseEventCategory): void;
    protected registerCanvasKeyHook(category: KeyEventCategory): void;
    render(): void;
    setContext(ctx: RenderContextData): void;
    get size(): CanvasSize;
    get width(): CanvasLength;
    get height(): CanvasLength;
    get eventListenerRegistry(): EventListenerRegistry;
    toBlob(imageType?: string, imageQuality?: number): Blob;
    toDataURL(imageType?: string, encoderOptions?: number): string;
    style(pseudoElement?: string): CSSStyleDeclaration;
    styleMut(): CSSStyleDeclaration;
    addClass(name: string): void;
    removeClass(name: string): void;
    blur(): void;
    click(): void;
    focus(preventScroll?: boolean): void;
    resize(size: util.Size): void;
    on(eventName: string, listener: EventListener, options?: EventListenerOptions): EventListener;
    detach(eventName: string, listener: EventListener, options?: EventListenerOptions): void;
    dispatch(eventName: string, options?: EventOptions): boolean;
    clear(): void;
    clearEntities(): void;
    add(entity: Entity): Entity;
    remove(entity: Entity): void;
    recalculate(): void;
    find(pred: (entity: Entity) => boolean): Entity | undefined;
    findMany(pred: (entity: Entity) => boolean): Entity[] | undefined;
}
export declare type CanvasRenderContextAttribType = {
    alpha?: boolean;
    desynchronized?: boolean;
};
export declare type EventListenerOptions = {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
    signal?: AbortSignal;
};
export declare type EventOptions = {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
};
export declare type CanvasLength = {
    normal: number;
    client: number;
    offset: number;
    scroll: number;
};
export declare type CanvasSize = {
    normal: util.Size;
    client: util.Size;
    offset: util.Size;
    scroll: util.Size;
};
export declare type CanvasOptions = {
    maxSize?: util.Size;
    maxObjects?: number;
    maxLevels?: number;
};
