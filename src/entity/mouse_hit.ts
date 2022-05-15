import Flatten from "@flatten-js/core";
import { NodeGeometry, Rectangle } from "@timohausmann/quadtree-ts";
import { Entity } from "./entity";
import * as util from '../util/common';

export class MouseHit extends Entity {
    protected position_: Flatten.Point;

    public constructor(x: number, y: number) {
        super();

        this.position_ = new Flatten.Point(x, y);
    }

    public static fromMouseEvent(event: MouseEvent): MouseHit {
        return new MouseHit(event.clientX, event.clientY);
    }

    public qtIndex(node: NodeGeometry): number[] {
        return Rectangle.prototype.qtIndex.call({
            x: this.position_.x,
            y: this.position_.y,
            width: 0,
            height: 0,
        }, node);
    }

    public get position(): Flatten.Point {
        return this.position_;
    }
    
    public set position(value: Flatten.Point) {
        this.position_ = value;
    }

    public get rotation(): number {
        util.unreachable();
        return 0;
    }

    public set rotation(_value: number) {
        util.unreachable();
    }

    public get points(): Flatten.Point[] {
        return [this.position_];
    }

    protected set points(value: Flatten.Point[]) {
        util.assert(value.length == 1, `A MouseHit is composed of a single point, you passed in ${value.length}!`);
        this.position_ = value[0];
    }

    public translate(_by: Flatten.Vector): Flatten.Point {
        util.unreachable();
        return new Flatten.Point(0, 0);
    }

    public translateX(_by: number): Flatten.Point {
        util.unreachable();
        return new Flatten.Point(0, 0);
    }

    public translateY(_by: number): Flatten.Point {
        util.unreachable();
        return new Flatten.Point(0, 0);
    }

    public rotate(_by: number): number {
        util.unreachable();
        return 0;
    }
    
    public shape(): Flatten.Shape {
        return this.position_.clone();
    }

    public render(_ctx: CanvasRenderingContext2D): void {
        util.unreachable();
    }
}

export function mouseHit(event: MouseEvent) {
    return MouseHit.fromMouseEvent(event);
}

