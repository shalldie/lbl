import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';

export interface ILayer extends AbsMountable, IDisposable {
    dom: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    resize(): void;
    clear(): void;
}
