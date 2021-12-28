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
