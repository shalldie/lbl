import { AbsShape, IPoint } from '.';
import { EShapeType } from './Shape';

/**
 * 圆
 *
 * @export
 * @class Pie
 * @extends {AbsShape}
 */
export class Pie extends AbsShape {
    public type: EShapeType = EShapeType.Resizer;

    public r = 6; // 半径

    constructor(options: Partial<Pie> = {}) {
        super();
        Object.assign(this, options);
    }

    public draw(): void {
        const ctx = this.ctx;

        // 画圆、边框
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#2ad';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    public contains({ x, y }: IPoint): boolean {
        return Math.sqrt(Math.pow(Math.abs(x - this.x), 2) + Math.pow(Math.abs(y - this.y), 2)) < this.r;
    }
}
