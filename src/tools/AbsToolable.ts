import { IDisposable } from '~/interface';
import { TToolType } from './tool.types';

export abstract class AbsToolable implements IDisposable {
    public abstract type: TToolType;

    public dispose(): void {}
}
