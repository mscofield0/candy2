export type MouseEventCategory = 'mousemove' | 'mousedown' | 'mouseup';
export type KeyEventCategory = 'keydown' | 'keyup' | 'keypress';
export type EventCategory = KeyEventCategory | MouseEventCategory;
export type EventTarget = Object;

export const EVENT_CATEGORIES: EventCategory[] = ['keydown', 'keyup', 'keypress', 'mousemove', 'mousedown', 'mouseup'];

export class EventListenerRegistry {
    protected specific: Map<EventTarget, Map<EventCategory, EventListener>>;
    protected custom: Map<string, Map<EventTarget, EventListener>>;

    public constructor() {
        this.specific = new Map();
        this.custom = new Map();
    }

    public insert(target: EventTarget, category: EventCategory, listener: EventListener): void {
        const listeners = this.specific.get(target);
        
        if (listeners != undefined) {
            listeners.set(category, listener);
        } else {
            this.specific.set(target, new Map().set(category, listener));
        }
    }

    public insertCustom(target: EventTarget, name: string, listener: EventListener): void {
        const listeners = this.custom.get(name);

        if (listeners != undefined) {
            listeners.set(target, listener);
        } else {
            this.custom.set(name, new Map().set(target, listener));
        }
    }

    public detach(target: EventTarget, category: EventCategory): void {
        const listeners = this.specific.get(target);

        if (listeners != undefined) {
            listeners.delete(category);
        }
    }

    public detachCustom(target: EventTarget, name: string): void {
        const listeners = this.custom.get(name);

        if (listeners != undefined) {
            listeners.delete(target);
        }
    }

    public remove(target: EventTarget): void {
        this.specific.delete(target);
        this.custom.forEach((listeners) => listeners.delete(target));
    }

    public dispatch(name: string, event: Event): void {
        const listeners = this.custom.get(name);

        if (listeners != undefined) {
            listeners.forEach((listener) => listener(event));
        }
    }

    public dispatchTo(target: EventTarget, category: EventCategory, event: Event): void {
        const listeners = this.specific.get(target);

        if (listeners != undefined) {
            const listener = listeners.get(category);
            listener && listener(event);
        }
    }
}

