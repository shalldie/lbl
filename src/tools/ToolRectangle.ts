import { getSqrLen } from '~/common/utils';
import { IDragEvent } from '~/handlers/DragHandler';
import { IDisposable } from '~/interface';
import { Rectangle } from '~/shapes';
import { AbsToolable } from './AbsToolable';
import { EToolType } from './tool.types';

const INVOKE_LEN = 6;

export class ToolRectangle extends AbsToolable implements IDisposable {
    public type = EToolType.RECTANGLE;

    public dispose(): void {}

    private shouldCreate = false;
    private rect?: Rectangle;

    private createRect(ev: IDragEvent) {
        // this.removeRect();

        this.state.shapes.forEach(n => (n.active = false));
        this.rect = new Rectangle({
            active: true,
            x: ev.dragStart.x,
            y: ev.dragStart.y
        });
        this.state.emit('add-shape', this.rect);
        this.state.shapes.push(this.rect);

        this.rect.handleDragStart(ev);
        console.log(this.rect.active, this.rect.canDrag, this.rect['dragPie']);
        // console.log(this.rect.canDrag);
        setTimeout(() => {
            this.rect!.draw();
        }, 0);
    }

    private removeRect() {
        if (!this.rect) {
            return;
        }
        this.state.shapes = this.state.shapes.filter(n => n !== this.rect);
        this.rect = undefined;
    }

    public handleDragStart(_ev: IDragEvent) {
        const activeShape = this.state.shapes.find(n => n.active);
        this.shouldCreate = !activeShape?.contains(_ev.dragStart);
    }

    public handleDragMove(_ev: IDragEvent) {
        if (!this.shouldCreate) {
            return;
        }

        // const needCreate = getSqrLen(_ev.dragMove!, _ev.dragStart) > INVOKE_LEN;
        // if (!needCreate) {
        //     // this.removeRect();
        //     return;
        // }

        this.createRect(_ev);
    }

    public handleDragEnd(_ev: IDragEvent) {}
}
