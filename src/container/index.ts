import { MouseHandler } from '~/handlers';
import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';

export * from './DomContainer';

export interface IContainer extends IDisposable, AbsMountable {
    mouseHandler: MouseHandler;
}
