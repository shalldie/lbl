import { EventEmitter } from '~/libs/EventEmitter';
import { IDisposable } from '~/interface';

export enum EMouseAction {
    mousedown = 'mousedown',
    mousemove = 'mousemove',
    mouseup = 'mouseup',
    mouseout = 'mouseout',
    click = 'click'
}

export class MouseHandler extends EventEmitter implements IDisposable {
    private _events = new Map<EMouseAction, null | ((ex: MouseEvent) => void)>([
        //
        [EMouseAction.mousedown, null],
        [EMouseAction.mousemove, null],
        [EMouseAction.mouseup, null],
        [EMouseAction.mouseout, null],
        [EMouseAction.click, null]
    ]);

    private _dom: HTMLElement;

    constructor(dom: HTMLElement) {
        super();
        this._dom = dom;
        this.initialize();
    }

    private initialize() {
        for (const [eventName] of this._events) {
            const action = (ex: MouseEvent) => {
                this.emit(eventName, ex);
            };
            this._dom.addEventListener(eventName, action);
            this._events.set(eventName, action);
        }
    }

    public on(event: EMouseAction, listener: (ex: MouseEvent) => void): void {
        super.on(event, listener);
    }

    public dispose(): void {
        for (const [eventName, eventHandler] of this._events) {
            if (eventHandler) {
                this._dom.removeEventListener(eventName, eventHandler!);
            }
        }
    }
}
