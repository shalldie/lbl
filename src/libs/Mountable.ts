export abstract class AbsMountable {
    public abstract dom: HTMLElement;

    public mount(wrap: HTMLElement) {
        wrap.appendChild(this.dom);
        return this;
    }
}
