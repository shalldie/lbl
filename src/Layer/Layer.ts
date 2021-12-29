import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';

/**
 * layer/层 接口
 *
 * @export
 * @interface ILayer
 * @extends {AbsMountable}
 * @extends {IDisposable}
 */
export interface ILayer extends AbsMountable, IDisposable {
    dom: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D; // 目前只考虑 canvas ctx
    resize(): void;
    clear(): void;
}
