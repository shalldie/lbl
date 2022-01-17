import { IPoint } from '~/shapes';

export function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(undefined);
        }, delay);
    });
}

export function offset2point(ex: { offsetX: number; offsetY: number }) {
    return {
        x: ex.offsetX,
        y: ex.offsetY
    };
}

export function getSqrLen(p1: IPoint, p2: IPoint) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
