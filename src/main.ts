import { DomContainer } from './container';
import { EMouseAction } from './handlers';
import './dev.scss';
import './assets/styles.scss';
import { Pie } from './shapes/Pie';
import { sleep } from './common/utils';
import { Rectangle } from './shapes';
import { CanvasLayer } from './Layer';
import { Frame } from './core';
import { EToolType } from '~/tools';

let ff: Frame;

function appendTools() {
    const tools = EToolType.toArray().map(n => n.id);
    const wrap = document.getElementById('tool')!;

    for (const toolName of tools) {
        const el = document.createElement('span');
        el.innerText = toolName;
        el.onclick = () => {
            // ff?.selectTool(toolName);
            wrap.querySelectorAll('span').forEach(item => item.classList.remove('active'));
            el.classList.add('active');
        };
        wrap?.appendChild(el);
    }
}

async function main() {
    appendTools();

    const wrap = document.getElementById('app') as HTMLDivElement;
    ff = new Frame().mount(wrap);

    // const layer = new CanvasLayer();
    // layer.mount(container.dom);

    const rect = new Rectangle({
        x: 50,
        y: 50,
        width: 200,
        height: 100
    });
    // rect.layer = layer;
    rect.mount(ff.container.dom);
    await sleep();
    // rect.active = true;
    rect.draw();
    rect.makeDragable(ff.container.mouseHandler);

    const rect2 = new Rectangle({
        x: 150,
        y: 50,
        width: 200,
        height: 100
    });
    // rect.layer = layer;
    rect2.mount(ff.container.dom);
    await sleep();
    // rect2.active = true;
    rect2.draw();
    rect2.makeDragable(ff.container.mouseHandler);

    ff.state.shapes.push(rect, rect2);

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
