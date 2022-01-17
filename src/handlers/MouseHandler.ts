import { EventEmitter } from '~/libs/EventEmitter';
import { IDisposable } from '~/interface';
import { IPoint } from '~/shapes';
import { getSqrLen, offset2point } from '~/common/utils';

export enum EMouseAction {
    mousedown = 'mousedown',
    mousemove = 'mousemove',
    mouseup = 'mouseup',
    mouseout = 'mouseout',
    click = 'click'
}

/**
 * 鼠标事件
 *
 * @export
 * @class MouseHandler
 * @extends {EventEmitter}
 * @implements {IDisposable}
 */
export class MouseHandler extends EventEmitter implements IDisposable {
    private _events = new Map<EMouseAction, null | ((ex: MouseEvent) => void)>([
        //
        [EMouseAction.mousedown, null],
        [EMouseAction.mousemove, null],
        [EMouseAction.mouseup, null],
        [EMouseAction.mouseout, null]
        // [EMouseAction.click, null]
    ]);

    private _dom: HTMLElement;

    constructor(dom: HTMLElement) {
        super();
        this._dom = dom;
        this.initialize();
    }

    private lastMousedownPoint: IPoint = { x: 0, y: 0 };

    private initialize() {
        for (const [eventName] of this._events) {
            const action = (ex: MouseEvent) => {
                const curPoint = offset2point(ex);
                if (eventName === EMouseAction.mousedown) {
                    this.lastMousedownPoint = curPoint;
                }
                this.emit(eventName, curPoint);
                if (eventName === EMouseAction.mouseup) {
                    // 移动距离小于6，才算 click
                    if (getSqrLen(curPoint, this.lastMousedownPoint) < 6) {
                        this.emit(EMouseAction.click, curPoint);
                    }
                }
            };
            this._dom.addEventListener(eventName, action);
            this._events.set(eventName, action);
        }
    }

    public on(event: EMouseAction, listener: (point: IPoint) => void): void {
        super.on(event, listener);
    }

    public emit(event: EMouseAction, point: IPoint): void {
        super.emit(event, point);
    }

    public dispose(): void {
        for (const [eventName, eventHandler] of this._events) {
            if (eventHandler) {
                this._dom.removeEventListener(eventName, eventHandler!);
            }
        }
    }
}
