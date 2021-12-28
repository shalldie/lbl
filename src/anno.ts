import './assets/styles.scss';
import { sleep } from '~/common/utils';
import { DomContainer } from './container';
import { EMouseAction, MouseHandler } from './handlers';

export default async function (): Promise<typeof sleep> {
    await sleep(2000);
    const container = new DomContainer();

    const handler = new MouseHandler(container.dom);

    handler.on(EMouseAction.click, ex => {
        console.log(ex.offsetX, ex.offsetY);
    });
    return sleep;
}
