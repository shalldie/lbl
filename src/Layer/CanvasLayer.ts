import { AbsMountable } from '~/libs/Mountable';
import { debounce } from 'lodash';
import { IDisposable } from '~/interface';

export class CanvasLayer extends AbsMountable implements IDisposable {
    public dom = document.createElement('canvas');

    public ctx = this.dom.getContext('2d')!;

    constructor() {
        super();
        this.dom.classList.add('canvas-layer');

        this.resize();
    }

    public resize = debounce(() => {
        this.dom.width = this.dom.clientWidth;
        this.dom.height = this.dom.clientHeight;
    });

    public clear() {
        this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
    }

    public dispose(): void {
        this.dom.remove();
    }
}
