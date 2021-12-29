import { MouseHandler } from '~/handlers';
import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';

export interface IContainer extends AbsMountable, IDisposable {
    mouseHandler: MouseHandler;
}
