"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListenerRegistry = exports.EVENT_CATEGORIES = void 0;
exports.EVENT_CATEGORIES = ['keydown', 'keyup', 'keypress', 'mousemove', 'mousedown', 'mouseup'];
class EventListenerRegistry {
    constructor() {
        this.specific = new Map();
        this.custom = new Map();
    }
    insert(target, category, listener) {
        const listeners = this.specific.get(target);
        if (listeners != undefined) {
            listeners.set(category, listener);
        }
        else {
            this.specific.set(target, new Map().set(category, listener));
        }
    }
    insertCustom(target, name, listener) {
        const listeners = this.custom.get(name);
        if (listeners != undefined) {
            listeners.set(target, listener);
        }
        else {
            this.custom.set(name, new Map().set(target, listener));
        }
    }
    detach(target, category) {
        const listeners = this.specific.get(target);
        if (listeners != undefined) {
            listeners.delete(category);
        }
    }
    detachCustom(target, name) {
        const listeners = this.custom.get(name);
        if (listeners != undefined) {
            listeners.delete(target);
        }
    }
    remove(target) {
        this.specific.delete(target);
        this.custom.forEach((listeners) => listeners.delete(target));
    }
    dispatch(name, event) {
        const listeners = this.custom.get(name);
        if (listeners != undefined) {
            listeners.forEach((listener) => listener(event));
        }
    }
    dispatchTo(target, category, event) {
        const listeners = this.specific.get(target);
        if (listeners != undefined) {
            const listener = listeners.get(category);
            listener && listener(event);
        }
    }
}
exports.EventListenerRegistry = EventListenerRegistry;
