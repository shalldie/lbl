import { DomContainer } from './container';
import { EMouseAction } from './handlers';
import './style.css';
import './assets/styles.scss';
import { Pie } from './shapes/Pie';
import { sleep } from './common/utils';
import { Rectangle } from './shapes';
import { CanvasLayer } from './Layer';

async function main() {
    const wrap = document.getElementById('app')!;
    const container = new DomContainer().mount(wrap);
    // const layer = new CanvasLayer();
    // layer.mount(container.dom);

    const rect = new Rectangle({
        x: 50,
        y: 50,
        width: 200,
        height: 100
    });
    // rect.layer = layer;
    rect.mount(container.dom);
    await sleep();
    rect.active = true;
    rect.draw();
    rect.makeDragable(container.mouseHandler);

    // container.mouseHandler.on(EMouseAction.click, async ex => {
    //     const { offsetX, offsetY } = ex;

    //     const rect = new Rectangle({
    //         x: offsetX,
    //         y: offsetY,
    //         width: 200,
    //         height: 100
    //     });
    //     // rect.layer = layer;
    //     rect.mount(container.dom);
    //     await sleep();
    //     rect.draw();
    // });
}

main();
