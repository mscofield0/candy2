import Flatten from "@flatten-js/core";
import { NodeGeometry } from "@timohausmann/quadtree-ts";
import { Entity } from "./entity";
export declare abstract class SelectableEntity extends Entity {
    selected: boolean;
    abstract get rotation(): number;
    abstract set rotation(value: number);
    abstract get points(): Flatten.Point[];
    protected abstract set points(value: Flatten.Point[]);
    abstract get position(): Flatten.Point;
    abstract set position(value: Flatten.Point);
    abstract translate(by: Flatten.Vector): Flatten.Point;
    abstract translateX(by: number): Flatten.Point;
    abstract translateY(by: number): Flatten.Point;
    abstract rotate(by: number): number;
    abstract shape(): Flatten.Shape;
    abstract qtIndex(node: NodeGeometry): number[];
    abstract render(ctx: CanvasRenderingContext2D): void;
}
