import { enumxFactory } from '~/common/enumFactory';
import { StateTree } from '~/core/StateTree';
import { ToolRectangle } from './ToolRectangle';

export const EToolType = enumxFactory({
    RECTANGLE: { id: 'RECTANGLE' as const, label: '矩形框', tool: ToolRectangle }
});

export type TToolType = typeof EToolType.idsEnum;

export function createToolInstance(state: StateTree, toolType: TToolType) {
    return new (EToolType.getItemById(toolType)!.tool)(state);
}
