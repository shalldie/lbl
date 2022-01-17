import { StateTree } from '~/core/StateTree';
import { IDisposable } from '~/interface';
import { EventEmitter } from '~/libs/EventEmitter';
import { IPoint } from '~/shapes';
import { EMouseAction, MouseHandler } from '.';

export interface IDragEvent {
    dragStart: IPoint;
    dragMove?: IPoint;
    dragOffset: IPoint;
    dragEnd?: IPoint;
}

export class DragHandler extends EventEmitter implements IDisposable {
    constructor(private state: StateTree, private mouseHandler: MouseHandler) {
        super();
        this.initialize();
    }

    private initialize() {
        for (const [eventName, eventHandler] of this.eventMap) {
            this.mouseHandler.on(eventName, eventHandler);
        }
    }

    private canDrag = false;

    private dragStartPoint: IPoint = { x: 0, y: 0 };

    private handleMousedown = (point: IPoint) => {
        this.canDrag = true;
        this.dragStartPoint = point;
        this.emit('dragStart', {
            dragStart: point,
            dragOffset: { x: 0, y: 0 }
        });
    };

    private handleMouseup = (point: IPoint) => {
        this.canDrag = false;
        this.emit('dragEnd', {
            dragStart: this.dragStartPoint,
            dragEnd: point,
            dragOffset: {
                x: point.x - this.dragStartPoint.x,
                y: point.y - this.dragStartPoint.y
            }
        });
    };

    private handleMousemove = (point: IPoint) => {
        if (!this.canDrag) {
            return;
        }

        this.emit('dragMove', {
            dragStart: this.dragStartPoint,
            dragMove: point,
            dragOffset: {
                x: point.x - this.dragStartPoint.x,
                y: point.y - this.dragStartPoint.y
            }
        });
    };

    private eventMap = new Map<EMouseAction, (ex: IPoint) => void>([
        [EMouseAction.mousedown, this.handleMousedown],
        [EMouseAction.mouseup, this.handleMouseup],
        [EMouseAction.mousemove, this.handleMousemove],
        [EMouseAction.mouseout, this.handleMouseup]
    ]);

    public dispose(): void {
        for (const [eventName, eventHandler] of this.eventMap) {
            this.mouseHandler.off(eventName, eventHandler);
        }
    }

    public on(event: keyof IDragEvent, listener: (ev: IDragEvent) => void): void {
        super.on(event, listener);
    }

    public emit(event: keyof IDragEvent, ev: IDragEvent): void {
        super.emit(event, ev);
        switch (event) {
            case 'dragStart':
                this.state.shapes.forEach(n => n.handleDragStart(ev));
                this.state.tool.handleDragStart(ev);
                break;
            case 'dragMove':
                this.state.shapes.forEach(n => n.handleDragMove(ev));
                this.state.tool.handleDragMove(ev);
                break;
            case 'dragEnd':
                this.state.shapes.forEach(n => n.handleDragEnd(ev));
                this.state.tool.handleDragEnd(ev);
                break;
        }
    }
}
