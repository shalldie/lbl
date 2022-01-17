import { getSqrLen } from '~/common/utils';
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

    public fillStyle = '#047bd88c';

    constructor(options: Partial<Pie> = {}) {
        super();
        Object.assign(this, options);
    }

    public draw(): void {
        const ctx = this.ctx;

        // 画圆、边框
        ctx.fillStyle = this.fillStyle;
        if (this.active) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = '#2ad';
            ctx.lineWidth = 2;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    public contains(point: IPoint): boolean {
        return getSqrLen(this, point) <= this.r;
    }
}
