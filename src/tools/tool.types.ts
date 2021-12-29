import { enumxFactory } from '~/common/enumFactory';
import { ToolRectangle } from './ToolRectangle';

export const EToolType = enumxFactory({
    RECTANGLE: { id: 'RECTANGLE' as const, label: '矩形框', tool: ToolRectangle }
});

export type TToolType = typeof EToolType.idsEnum;

export function createToolInstance(toolType: TToolType) {
    return new (EToolType.getItemById(toolType)!.tool)();
}
