import { IDisposable } from '~/interface';
import { AbsToolable } from './AbsToolable';
import { EToolType } from './tool.types';

export class ToolSelect extends AbsToolable implements IDisposable {
    public type = EToolType.SELECT;

    public dispose(): void {}
}
