import { ECursor } from '~/core/StateTree';
import { IDragEvent } from '~/handlers/DragHandler';
import { IPoint } from '.';
import { Pie } from './Pie';
import { AbsShape, EShapeType } from './Shape';

/**
 * 矩形
 *
 * @export
 * @class Rectangle
 * @extends {AbsShape}
 */
export class Rectangle extends AbsShape {
    width = 0;
    height = 0;

    rnd = Math.random();

    public type: EShapeType = EShapeType.Rectangle;

    public pies = Array(4)
        .fill(null)
        .map(() => new Pie({ fillStyle: '#fff' }));

    private updatePiePoints() {
        const pies = this.pies;
        Object.assign(pies[0], {
            x: this.x,
            y: this.y
        });
        Object.assign(pies[1], {
            x: this.x + this.width,
            y: this.y
        });
        Object.assign(pies[2], {
            x: this.x,
            y: this.y + this.height
        });
        Object.assign(pies[3], {
            x: this.x + this.width,
            y: this.y + this.height
        });
    }

    constructor(options: Partial<Rectangle> = {}) {
        super();
        Object.assign(this, options);
        this.pies.forEach(pie => {
            pie.layer = this.layer;
        });
        this.updatePiePoints();
    }

    private handleDragPies(ev: IDragEvent) {
        if (!this.dragPie) {
            return;
        }
        const pieIndex = this.pies.indexOf(this.dragPie);
        const { dragOffset } = ev;

        switch (pieIndex) {
            case 0:
                this.x = this.dragStartPoint.x + dragOffset.x;
                this.y = this.dragStartPoint.y + dragOffset.y;
                this.width = this.dragStartWH.width - dragOffset.x;
                this.height = this.dragStartWH.height - dragOffset.y;
                break;
            case 1:
                // this.x = this.dragStartPoint.x + dragOffset.x;
                this.y = this.dragStartPoint.y + dragOffset.y;
                this.width = this.dragStartWH.width + dragOffset.x;
                this.height = this.dragStartWH.height - dragOffset.y;
                break;
            case 2:
                this.x = this.dragStartPoint.x + dragOffset.x;
                // this.y = this.dragStartPoint.y + dragOffset.y;
                this.width = this.dragStartWH.width - dragOffset.x;
                this.height = this.dragStartWH.height + dragOffset.y;
                break;
            case 3:
                // this.x = this.dragStartPoint.x + dragOffset.x;
                // this.y = this.dragStartPoint.y + dragOffset.y;
                this.width = this.dragStartWH.width + dragOffset.x;
                this.height = this.dragStartWH.height + dragOffset.y;
                break;
        }
    }

    private dragPie?: Pie;
    private dragStartWH = { width: 0, height: 0 };
    public handleDragStart(ev: IDragEvent): void {
        super.handleDragStart(ev);
        this.dragPie = this.getContainsPie(ev.dragStart);
        this.dragStartWH = { width: this.width, height: this.height };
    }

    public handleDragMove(ev: IDragEvent): void {
        console.log(this.canDrag);
        if (!this.active || !this.canDrag) {
            return;
        }

        if (this.dragPie) {
            // console.log(this.dragStartPoint);
            this.handleDragPies(ev);
            this.draw();
        } else {
            super.handleDragMove(ev);
        }
    }

    public handleDragEnd(ev: IDragEvent): void {
        super.handleDragEnd(ev);
        // 处理反方向
        if (this.width < 0) {
            this.width = Math.abs(this.width);
            this.x -= this.width;
        }
        if (this.height < 0) {
            this.height = Math.abs(this.height);
            this.y -= this.height;
        }
    }

    public draw(): void {
        this.clear();
        const ctx = this.ctx;

        // 当前 rectangle
        ctx.fillStyle = '#047bd88c';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.active) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = '#2ad';
            ctx.lineWidth = 1;
        }
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        if (!this.active) {
            return;
        }
        // pies
        this.updatePiePoints();
        for (const pie of this.pies) {
            pie.draw();
        }
    }

    private getContainsPie(point: IPoint) {
        return this.pies.find(n => n.contains(point));
    }

    public contains(point: IPoint): boolean {
        if (this.getContainsPie(point)) {
            return true;
        }

        const { x, y } = point;
        return (
            x >= this.x &&
            //
            x < this.x + this.width &&
            y >= this.y &&
            y < this.y + this.height
        );
    }

    public activeCursor(_point: IPoint): ECursor | null {
        if (this.getContainsPie(_point)) {
            return ECursor.crosshair;
        }
        return null;
    }
}
