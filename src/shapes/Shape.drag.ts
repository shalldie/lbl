import { offset2point } from '~/common/utils';
import { EMouseAction, MouseHandler } from '~/handlers';
import { IDisposable } from '~/interface';
import { EventEmitter } from '~/libs/EventEmitter';
import { AbsShape, IPoint } from '.';

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

    private handleMousedown = (ex: MouseEvent) => {
        if (!this.shape.active) {
            return;
        }

        const point = offset2point(ex);

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

    private handleMousemove = (ex: MouseEvent) => {
        if (!this.canDrag) {
            return;
        }

        const { x, y } = offset2point(ex);

        this.shape.x = x - this.lastMousedownPoint.x + this.lastShapePoint.x;
        this.shape.y = y - this.lastMousedownPoint.y + this.lastShapePoint.y;
        this.shape.draw();
        this.emit('drag', { x, y });
    };
    private eventMap = new Map<EMouseAction, (ex: MouseEvent) => void>([
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
