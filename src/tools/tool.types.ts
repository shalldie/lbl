import { enumxFactory } from '~/common/enumFactory';
import { ToolSelect } from './ToolSelect';

export const EToolType = enumxFactory({
    SELECT: { id: 'SELECT' as const, label: '选择', tool: ToolSelect }
});

export type TToolType = typeof EToolType.idsEnum;
