import { IDisposable } from '~/interface';
import { AbsToolable } from './AbsToolable';
import { EToolType } from './tool.types';

export class ToolRectangle extends AbsToolable implements IDisposable {
    public type = EToolType.RECTANGLE;

    public dispose(): void {}
}
