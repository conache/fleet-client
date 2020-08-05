import {EventTarget} from 'event-target-shim'


export default class LimitedQueue {
    static events = {
        SPACE_AVAILABLE: "spaceAvailable",
        VALUE_AVAILABLE: "valueAvailable",
    };

    constructor(size=100) {
        this._elements = [];
        this._size = size;
        this._eventTarget = new EventTarget();
    }

    get size() {
        return this._size;
    }

    get availableSpace() {
        return this.size - this._elements.length;
    }

    enqueue(element) {
        if (this._elements.length === this.size) {
            return false;
        }

        this._elements.push(element);
        this._eventTarget.dispatchEvent(new Event(LimitedQueue.events.VALUE_AVAILABLE));
        return true;
    }

    dequeue() {
        const element = this._elements.shift();
        this._eventTarget.dispatchEvent(new Event(LimitedQueue.events.SPACE_AVAILABLE));
        return element;
    }

    isEmpty() {
        return this._elements.length > 0;
    }
    
    onSpaceAvailable(callback) {
        if (this.availableSpace > 0) {
            callback();
            return;
        }
        this.on(LimitedQueue.events.SPACE_AVAILABLE, callback);
    }

    onValueAvailable(callback) {
        if (this._elements.length > 0) {
            callback(this.dequeue());
            return;
        }

        this.on(LimitedQueue.events.VALUE_AVAILABLE, callback);
    }

    on(eventType, callback) {
        this._eventTarget.addEventListener(eventType, callback);
    }

    toString() {
        return this._elements.toString();
    }
}