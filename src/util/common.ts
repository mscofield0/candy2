export function assert(expr: boolean, ...msgs: any[]) {
    if (!expr) {
        if (msgs.length == 0) {
            throw new Error('assertion failed');
        } else {
            // Allows logging objects nicely in console
            console.error(...msgs);
            throw new Error();
        }
    }
}

export function todo(...msgs: any[]) {
    if (msgs.length == 0) {
        throw new Error('reached code marked as \'todo\'');
    } else {
        console.error(...msgs);
        throw new Error();
    }
}

export function unreachable(...msgs: any[]) {
    if (msgs.length == 0) {
        throw new Error('unreachable reached');
    } else {
        console.error(...msgs);
        throw new Error();
    }
}

export type Size = {
    width: number,
    height: number,
};

