import { EMouseAction, MouseHandler } from '~/handlers';
import { IDisposable } from '~/interface';
import { EventEmitter } from '~/libs/EventEmitter';
import { AbsShape, IPoint } from '.';

/**
 * 拖动相关能力
 *
 * @export
 * @class ShapeDrag
 * @extends {EventEmitter}
 * @implements {IDisposable}
 */
export class ShapeDrag extends EventEmitter implements IDisposable {
    constructor(private shape: AbsShape, private mouseHandler: MouseHandler) {
        super();
        for (const [eventName, eventHandler] of this.eventMap) {
            this.mouseHandler.on(eventName, eventHandler);
        }
    }

    private canDrag = false;
    private lastShapePoint: IPoint = { x: 0, y: 0 };
    private lastMousedownPoint: IPoint = { x: 0, y: 0 };

    private handleMousedown = (point: IPoint) => {
        if (!this.shape.active) {
            return;
        }

        if (!this.shape.contains(point)) {
            return;
        }
        this.canDrag = true;
        this.lastShapePoint = {
            x: this.shape.x,
            y: this.shape.y
        };
        this.lastMousedownPoint = point;
    };

    private handleMouseup = () => {
        this.canDrag = false;
    };

    private handleMouseout = () => {
        this.canDrag = false;
    };

    private handleMousemove = (point: IPoint) => {
        if (!this.canDrag) {
            return;
        }

        const { x, y } = point;

        this.shape.x = x - this.lastMousedownPoint.x + this.lastShapePoint.x;
        this.shape.y = y - this.lastMousedownPoint.y + this.lastShapePoint.y;
        this.shape.draw();
        this.emit('drag', point);
    };
    private eventMap = new Map<EMouseAction, (ex: IPoint) => void>([
        [EMouseAction.mousedown, this.handleMousedown],
        [EMouseAction.mouseup, this.handleMouseup],
        [EMouseAction.mousemove, this.handleMousemove],
        [EMouseAction.mouseout, this.handleMouseout]
    ]);

    public dispose(): void {
        for (const [eventName, eventHandler] of this.eventMap) {
            this.mouseHandler.off(eventName, eventHandler);
        }
    }
}
