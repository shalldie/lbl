/**
 * 用于存储全局状态
 *
 * @export
 * @class StateTree
 */

import { IDisposable } from '~/interface';
import { EventEmitter } from '~/libs/EventEmitter';
import { AbsShape } from '~/shapes';
import { AbsToolable, createToolInstance, EToolType } from '~/tools';

export enum ECursor {
    default = 'default',
    auto = 'auto',
    crosshair = 'crosshair',
    pointer = 'pointer',
    move = 'move'
}

export class StateTree extends EventEmitter implements IDisposable {
    private _tool: AbsToolable = createToolInstance(this, EToolType.RECTANGLE);

    public get tool() {
        return this._tool;
    }

    public set tool(tool: AbsToolable) {
        this.tool.dispose();
        this._tool = tool;
        this.emit('tool', tool);
    }

    // #region cursor
    private _cursor = ECursor.default;

    get cursor() {
        return this._cursor;
    }

    set cursor(cursor: ECursor) {
        this._cursor = cursor;
        this.emit('cursor', cursor);
    }
    // #endregion

    public shapes: AbsShape[] = [];

    dispose(): void {
        super.dispose();
        this.tool.dispose();
        this.shapes.forEach(n => n.dispose());
    }
}
