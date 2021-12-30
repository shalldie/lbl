import { ECursor } from '~/core/StateTree';
import { IDragEvent } from '~/handlers/DragHandler';
import { IDisposable } from '~/interface';
import { ILayer, CanvasLayer } from '~/Layer';
import { AbsMountable } from '~/libs/Mountable';

export interface IPoint {
    x: number;
    y: number;
}

export enum EShapeType {
    Resizer,
    Rectangle
}

/**
 * 所有 shape 的基类
 *
 * @export
 * @abstract
 * @class AbsShape
 * @extends {AbsMountable}
 * @implements {IDisposable}
 * @implements {IPoint}
 */
export abstract class AbsShape extends AbsMountable implements IDisposable, IPoint {
    // #region 坐标
    public x = 0;
    public y = 0;
    // #endregion

    public type = EShapeType.Rectangle;

    // #region active
    private _active = false;
    public get active() {
        return this._active;
    }
    public set active(active: boolean) {
        if (active === this._active) {
            return;
        }
        this._active = active;
        this.draw();
    }
    // #endregion

    // #region layer,dom,ctx
    private _layer!: ILayer;

    public get layer() {
        if (!this._layer) {
            this._layer = new CanvasLayer();
        }
        return this._layer;
    }

    public set layer(layer: ILayer) {
        this._layer = layer;
    }

    public get dom() {
        return this.layer.dom;
    }

    public get ctx() {
        return this.dom.getContext('2d')!;
    }
    // #endregion

    // #region drag
    public canDrag = false;
    public dragStartPoint!: IPoint;
    public handleDragStart(ev: IDragEvent) {
        if (!this.contains(ev.dragStart)) {
            return;
        }
        this.canDrag = true;
        this.dragStartPoint = {
            x: this.x,
            y: this.y
        };
    }

    public handleDragMove(ev: IDragEvent) {
        if (!this.active || !this.canDrag) {
            return;
        }
        const { dragOffset } = ev;

        this.x = this.dragStartPoint.x + dragOffset.x;
        this.y = this.dragStartPoint.y + dragOffset.y;
        this.draw();
    }

    public handleDragEnd(_ev: IDragEvent) {
        this.canDrag = false;
    }

    // #endregion

    // #region canvas 相关
    /**
     * 清空画布
     *
     * @memberof AbsShape
     */
    public clear() {
        this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
    }

    /**
     * 绘制
     *
     * @abstract
     * @memberof AbsShape
     */
    public abstract draw(): void;
    // #endregion

    /**
     * 是否包含某个点
     *
     * @abstract
     * @param {IPoint} point
     * @return {*}  {boolean}
     * @memberof AbsShape
     */
    public abstract contains(point: IPoint): boolean;

    public dispose(): void {
        this.layer.dispose();
    }

    public activeCursor(_point: IPoint): ECursor | null {
        return null;
    }
}
