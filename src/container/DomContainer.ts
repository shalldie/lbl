import { MouseHandler } from '~/handlers';
import { AbsMountable } from '~/libs/Mountable';
import { IContainer } from './Container';

export class DomContainer extends AbsMountable implements IContainer {
    public dom = document.createElement('div');

    public mouseHandler = new MouseHandler(this.dom);

    constructor() {
        super();
        this.dom.classList.add(
            import.meta.env.VITE_CSS_PREFIX as string,
            `${import.meta.env.VITE_CSS_PREFIX}-dom-container`
        );
    }

    public dispose(): void {
        this.mouseHandler.dispose();
    }
}
