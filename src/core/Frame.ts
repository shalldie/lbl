import { DomContainer, IContainer } from '~/container';
import { IDisposable } from '~/interface';
import { AbsMountable } from '~/libs/Mountable';
import { StateTree } from './StateTree';

export class Frame extends AbsMountable implements IDisposable {
    public dom!: HTMLDivElement;

    public state = new StateTree();

    public container: IContainer = new DomContainer(this.state);

    public mount(dom: HTMLDivElement) {
        this.dom = dom;
        this.container.mount(this.dom);
        return this;
    }

    // private bind

    public dispose(): void {
        this.state.dispose();
        this.container.dispose();
    }

    private initializeEventsHandle() {}
}
