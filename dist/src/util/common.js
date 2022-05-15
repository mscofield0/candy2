"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unreachable = exports.todo = exports.assert = void 0;
function assert(expr, ...msgs) {
    if (!expr) {
        if (msgs.length == 0) {
            throw new Error('assertion failed');
        }
        else {
            // Allows logging objects nicely in console
            console.error(...msgs);
            throw new Error();
        }
    }
}
exports.assert = assert;
function todo(...msgs) {
    if (msgs.length == 0) {
        throw new Error('reached code marked as \'todo\'');
    }
    else {
        console.error(...msgs);
        throw new Error();
    }
}
exports.todo = todo;
function unreachable(...msgs) {
    if (msgs.length == 0) {
        throw new Error('unreachable reached');
    }
    else {
        console.error(...msgs);
        throw new Error();
    }
}
exports.unreachable = unreachable;
