import { StateTree } from '~/core/StateTree';
import { CursorHandler, MouseHandler } from '~/handlers';
import { DragHandler } from '~/handlers/DragHandler';
import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';
import { AbsShape } from '~/shapes';
import { IContainer } from './Container';

export class DomContainer extends AbsMountable implements IContainer {
    public dom = document.createElement('div');

    public mouseHandler = new MouseHandler(this.dom);

    public state: StateTree;

    public handlers: IDisposable[] = [];

    constructor(state: StateTree) {
        super();
        this.state = state;
        this.state.on('add-shape', (shape: AbsShape) => {
            this.dom.appendChild(shape.dom);
        });
        this.dom.classList.add(
            import.meta.env.VITE_CSS_PREFIX as string,
            `${import.meta.env.VITE_CSS_PREFIX}-dom-container`
        );

        this.handlers.push(
            //
            new CursorHandler(this.state, this.mouseHandler), // cursor
            new DragHandler(this.state, this.mouseHandler) // drag
        );
        this.listenCursor();
    }

    private listenCursor() {
        this.state.on('cursor', cursor => {
            this.dom.style.cursor = cursor;
        });
    }

    public dispose(): void {
        this.mouseHandler.dispose();
        this.handlers.forEach(n => n.dispose());
    }
}
