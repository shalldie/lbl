import { ECursor, StateTree } from '~/core/StateTree';
import { IDisposable } from '~/interface';
import { EMouseAction, MouseHandler } from './MouseHandler';

/**
 * cursor 逻辑
 *
 * @export
 * @class CursorHandler
 * @implements {IDisposable}
 */
export class CursorHandler implements IDisposable {
    constructor(private state: StateTree, private mouseHandler: MouseHandler) {
        this.initialize();
    }

    private initialize() {
        this.handleClick();
        this.handleCursor();
    }

    private handleClick() {
        this.mouseHandler.on(EMouseAction.click, point => {
            const shapes = this.state.shapes.slice().reverse();
            // 处理 active
            const activeShape = shapes.find(n => n.contains(point));
            if (activeShape) {
                activeShape.active = true;
            }
            shapes.filter(n => n !== activeShape).forEach(n => (n.active = false));
        });
    }

    private handleCursor() {
        this.mouseHandler.on(EMouseAction.mousemove, point => {
            const shapes = this.state.shapes.slice().reverse();
            const hoverShapes = shapes.filter(n => n.contains(point));
            const activeShape = hoverShapes.find(n => n.active);

            // 优先使用 active shape
            if (activeShape) {
                this.state.cursor = activeShape.activeCursor(point) || ECursor.move;
            }
            // 再处理普通 hover
            else if (hoverShapes.length) {
                this.state.cursor = ECursor.pointer;
            }
            // 默认 default
            else {
                this.state.cursor = ECursor.default;
            }
        });
    }

    public dispose(): void {}
}
