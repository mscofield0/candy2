import Flatten from "@flatten-js/core";
import { NodeGeometry } from "@timohausmann/quadtree-ts";
import { Entity } from "./entity";

export abstract class SelectableEntity extends Entity {
    public selected: boolean = false;

    /// Spatial context API
    public abstract get rotation(): number;
    public abstract set rotation(value: number);

    public abstract get points(): Flatten.Point[];
    protected abstract set points(value: Flatten.Point[]);

    public abstract get position(): Flatten.Point;
    public abstract set position(value: Flatten.Point);

    public abstract translate(by: Flatten.Vector): Flatten.Point;
    public abstract translateX(by: number): Flatten.Point;
    public abstract translateY(by: number): Flatten.Point;

    public abstract rotate(by: number): number;

    public abstract shape(): Flatten.Shape;
    public abstract qtIndex(node: NodeGeometry): number[];

    /// Render context API
    public abstract render(ctx: CanvasRenderingContext2D): void;
}

