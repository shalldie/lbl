import { MouseHandler } from '~/handlers';
import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';

export class DomContainer extends AbsMountable implements IDisposable {
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
