import Flatten from "@flatten-js/core";
import { NodeGeometry } from "@timohausmann/quadtree-ts";
import { Entity } from "./entity";
export declare class MouseHit extends Entity {
    protected position_: Flatten.Point;
    constructor(x: number, y: number);
    static fromMouseEvent(event: MouseEvent): MouseHit;
    qtIndex(node: NodeGeometry): number[];
    get position(): Flatten.Point;
    set position(value: Flatten.Point);
    get rotation(): number;
    set rotation(_value: number);
    get points(): Flatten.Point[];
    protected set points(value: Flatten.Point[]);
    translate(_by: Flatten.Vector): Flatten.Point;
    translateX(_by: number): Flatten.Point;
    translateY(_by: number): Flatten.Point;
    rotate(_by: number): number;
    shape(): Flatten.Shape;
    render(_ctx: CanvasRenderingContext2D): void;
}
export declare function mouseHit(event: MouseEvent): MouseHit;
