import { StateTree } from '~/core/StateTree';
import { IDragEvent } from '~/handlers/DragHandler';
import { IDisposable } from '~/interface';
import { TToolType } from './tool.types';

export abstract class AbsToolable implements IDisposable {
    public abstract type: TToolType;

    constructor(public state: StateTree) {}

    public dispose(): void {}

    public handleDragStart(_ev: IDragEvent) {}

    public handleDragMove(_ev: IDragEvent) {}

    public handleDragEnd(_ev: IDragEvent) {}
}
