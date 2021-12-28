import { DomContainer } from '~/container';
import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';
import { AbsShape } from '~/shapes';
import { AbsToolable } from '~/tools/AbsToolable';
import { TToolType } from '~/tools/tool.types';
import { StateTree } from './StateTree';

export class Frame extends AbsMountable implements IDisposable {
    public dom!: HTMLDivElement;

    public state = new StateTree();

    public shapes: AbsShape[] = [];

    private container = new DomContainer();

    private tool?: AbsToolable;

    public mount(dom: HTMLDivElement) {
        this.dom = dom;
        this.container.mount(this.dom);
        return this;
    }

    public selectTool(toolType: TToolType) {
        this.tool?.dispose();
        this.tool = AbsToolable.create(toolType);
        this.tool.container = this.container;
    }

    public dispose(): void {
        this.shapes.forEach(n => n.dispose());
        this.tool?.dispose();
        this.container.dispose();
    }

    private initializeEventsHandle() {}
}
