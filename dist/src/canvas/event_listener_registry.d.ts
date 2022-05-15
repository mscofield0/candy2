export declare type MouseEventCategory = 'mousemove' | 'mousedown' | 'mouseup';
export declare type KeyEventCategory = 'keydown' | 'keyup' | 'keypress';
export declare type EventCategory = KeyEventCategory | MouseEventCategory;
export declare type EventTarget = Object;
export declare const EVENT_CATEGORIES: EventCategory[];
export declare class EventListenerRegistry {
    protected specific: Map<EventTarget, Map<EventCategory, EventListener>>;
    protected custom: Map<string, Map<EventTarget, EventListener>>;
    constructor();
    insert(target: EventTarget, category: EventCategory, listener: EventListener): void;
    insertCustom(target: EventTarget, name: string, listener: EventListener): void;
    detach(target: EventTarget, category: EventCategory): void;
    detachCustom(target: EventTarget, name: string): void;
    remove(target: EventTarget): void;
    dispatch(name: string, event: Event): void;
    dispatchTo(target: EventTarget, category: EventCategory, event: Event): void;
}
