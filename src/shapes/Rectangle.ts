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

    public type: EShapeType = EShapeType.Rectangle;

    public pies = Array(4)
        .fill(null)
        .map(() => new Pie());

    constructor(options: Partial<Rectangle> = {}) {
        super();
        Object.assign(this, options);
        this.pies.forEach(pie => {
            pie.layer = this.layer;
        });
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
        for (const pie of pies) {
            pie.draw();
        }
    }

    public contains({ x, y }: IPoint): boolean {
        return (
            x >= this.x &&
            //
            x < this.x + this.width &&
            y >= this.y &&
            y < this.y + this.height
        );
    }
}
