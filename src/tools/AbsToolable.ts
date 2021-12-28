import { IContainer } from '~/container';
import { IDisposable } from '~/interface';
import { EToolType, TToolType } from './tool.types';

export abstract class AbsToolable implements IDisposable {
    public abstract type: TToolType;

    public container!: IContainer;

    public get dom() {
        return this.container.dom;
    }

    public get mouseHandler() {
        return this.container.mouseHandler;
    }

    public dispose(): void {}

    public static create(type: TToolType) {
        return new (EToolType.getItemById(type)!.tool)();
    }
}
