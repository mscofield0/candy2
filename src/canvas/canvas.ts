import { Quadtree } from '@timohausmann/quadtree-ts';
import { Entity } from '../entity/entity';
import * as util from '../util/common';
import { RenderContextData } from '../util/render';
import { EventCategory, EventListenerRegistry, KeyEventCategory, MouseEventCategory } from './event_listener_registry';
import { mouseHit } from '../entity/mouse_hit'; 
import { SelectableEntity } from '../entity/selectable_entity';

export class Canvas {
    protected domElement: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected entities: Entity[];
    protected quadtree: Quadtree<Entity>;
    protected maxSize: util.Size;
    protected eventListenerRegistry_: EventListenerRegistry;

    public constructor(
        element: HTMLCanvasElement,
        contextAttribs?: CanvasRenderContextAttribType,
        options: CanvasOptions = {},
    ) {
        this.domElement = element;
        const renderCtx = this.domElement.getContext('2d', contextAttribs);
        util.assert(renderCtx != null, `Could not create a '2d' context from this canvas with these context attributes`, contextAttribs);
        this.ctx = renderCtx! as CanvasRenderingContext2D;

        this.entities = [];

        // Defaulted to the size of the canvas element
        this.maxSize = options.maxSize ?? this.size.client;

        // Generate props for quadtree
        const props = {
            maxObjects: options.maxObjects ?? 2048,
            maxLevels: options.maxLevels ?? 16,
            width: this.maxSize.width,
            height: this.maxSize.height,
        };

        this.quadtree = new Quadtree(props);
        this.eventListenerRegistry_ = new EventListenerRegistry();
        this.registerCanvasHooks();
    }

    protected registerCanvasHooks() {
        this.registerCanvasMouseHook('mousedown');
        this.registerCanvasMouseHook('mouseup');
        this.registerCanvasMouseHook('mousemove');
        this.registerCanvasKeyHook('keydown');
        this.registerCanvasKeyHook('keyup');
        this.registerCanvasKeyHook('keypress');
    }

    protected registerCanvasMouseHook(category: MouseEventCategory) {
        this.on(category, (event) => {
            const hit = mouseHit(event as MouseEvent);
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

    protected registerCanvasKeyHook(category: KeyEventCategory) {
        this.on(category, (event) => {
            const selectable = this.entities.filter((x) => x instanceof SelectableEntity);
            const selected = selectable.filter((x) => (x as SelectableEntity).selected);
            selected.forEach((x) => this.eventListenerRegistry_.dispatchTo(x, category, event));
        });
    }

    public render(): void {
        this.ctx.save();
        this.entities.forEach((x) => {
            this.setContext(x.__friend_canvas_getEntityContext());
            x.render(this.ctx);
        });
        this.ctx.restore();
    }

    public setContext(ctx: RenderContextData): void {
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
    
    public get size(): CanvasSize {
        return {
            normal: { width: this.domElement.width, height: this.domElement.height },
            client: { width: this.domElement.clientWidth, height: this.domElement.clientHeight },
            offset: { width: this.domElement.offsetWidth, height: this.domElement.offsetHeight },
            scroll: { width: this.domElement.scrollWidth, height: this.domElement.scrollHeight },
        };
    }

    public get width(): CanvasLength {
        return {
            normal: this.domElement.width,
            client: this.domElement.clientWidth,
            offset: this.domElement.offsetWidth,
            scroll: this.domElement.scrollWidth,
        };
    }

    public get height(): CanvasLength {
        return {
            normal: this.domElement.height,
            client: this.domElement.clientHeight,
            offset: this.domElement.offsetHeight,
            scroll: this.domElement.scrollHeight,
        };
    }

    public get eventListenerRegistry(): EventListenerRegistry {
        return this.eventListenerRegistry_;
    }

    public toBlob(imageType?: string, imageQuality?: number): Blob {
        let blob: Blob | null = null;
        this.domElement.toBlob((blob_) => blob = blob_, imageType, imageQuality);

        util.assert(blob != null, 'Could not convert the canvas into a Blob');
        return blob!;
    }

    public toDataURL(imageType?: string, encoderOptions?: number): string {
        const dataUrl = this.domElement.toDataURL(imageType, encoderOptions);
        return dataUrl;
    }

    public style(pseudoElement?: string): CSSStyleDeclaration {
        const style = window.getComputedStyle(this.domElement, pseudoElement);
        return style;
    }
    
    public styleMut(): CSSStyleDeclaration {
        return this.domElement.style;
    }

    public addClass(name: string) {
        this.domElement.classList.add(name);
    }
    
    public removeClass(name: string) {
        this.domElement.classList.remove(name);
    }

    public blur() {
        this.domElement.blur();
    }

    public click() {
        this.domElement.click();
    }

    public focus(preventScroll: boolean = false) {
        const focusOptions = { preventScroll };
        this.domElement.focus(focusOptions);
    }

    public resize(size: util.Size) {
        this.domElement.width = size.width;
        this.domElement.height = size.height;
    }

    public on(eventName: string, listener: EventListener, options?: EventListenerOptions): EventListener {
        this.domElement.addEventListener(eventName, listener, options);
        return listener;
    }
    
    public detach(eventName: string, listener: EventListener, options?: EventListenerOptions) {
        this.domElement.removeEventListener(eventName, listener, options);
    }

    public dispatch(eventName: string, options?: EventOptions): boolean {
        const event = new Event(eventName, options);
        return this.domElement.dispatchEvent(event);
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.width.client, this.height.client);
    }
    
    public clearEntities() {
        this.entities = [];
        this.quadtree.clear();
    }

    public add(entity: Entity): Entity {
        this.entities.push(entity);
        this.quadtree.insert(entity);
        return entity;
    } 

    public remove(entity: Entity) {
        const idx = this.entities.findIndex((x) => x == entity);
        this.entities.splice(idx, 1);
        this.quadtree.clear();
        this.entities.forEach((x) => this.quadtree.insert(x));
    }

    public recalculate() {
        this.quadtree.clear();
        this.entities.forEach((x) => this.quadtree.insert(x));
    }

    public find(pred: (entity: Entity) => boolean): Entity | undefined {
        return this.entities.find(pred);
    }

    public findMany(pred: (entity: Entity) => boolean): Entity[] | undefined {
        let found: Entity[] = [];
        this.entities.forEach((obj) => {
            if (pred(obj)) found.push(obj);
        });

        if (found.length == 0) return undefined;
        return found;
    }
}

export type CanvasRenderContextAttribType = {
    alpha?: boolean,
    desynchronized?: boolean,
};

export type EventListenerOptions = {
    capture?: boolean,
    once?: boolean,
    passive?: boolean,
    signal?: AbortSignal,
};

export type EventOptions = {
    bubbles?: boolean,
    cancelable?: boolean,
    composed?: boolean,
};

export type CanvasLength = {
    normal: number,
    client: number,
    offset: number,
    scroll: number,
};

export type CanvasSize = {
    normal: util.Size,
    client: util.Size,
    offset: util.Size,
    scroll: util.Size,
};

export type CanvasOptions = {
    maxSize?: util.Size,
    maxObjects?: number,
    maxLevels?: number,
};

