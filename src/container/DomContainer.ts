import { StateTree } from '~/core/StateTree';
import { CursorHandler, MouseHandler } from '~/handlers';
import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';
import { IContainer } from './Container';

export class DomContainer extends AbsMountable implements IContainer {
    public dom = document.createElement('div');

    public mouseHandler = new MouseHandler(this.dom);

    public state: StateTree;

    public handlers: IDisposable[] = [];

    constructor(state: StateTree) {
        super();
        this.state = state;
        this.dom.classList.add(
            import.meta.env.VITE_CSS_PREFIX as string,
            `${import.meta.env.VITE_CSS_PREFIX}-dom-container`
        );

        this.handlers.push(
            // cursor
            new CursorHandler(this.state, this.mouseHandler)
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
