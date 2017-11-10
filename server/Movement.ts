import { Map } from './Map';
import { Mobile } from './mobiles/Mobile';
import { Point2D, Point3D } from './Geometry';


export interface IMovementImpl {
    CheckMovement(mobile: Mobile, map: Map, location: Point3D, direction: Direction): boolean;
}

export enum Direction {
    North,
    Right,
    East,
    Down,
    South,
    Left,
    West,
    Up
}

export class Movement {
    public static CheckMovement(mobile: Mobile, map: Map, location: Point3D, direction: Direction): boolean {
        return false;
    }

    public static Offset(direction: Direction): Point2D {
        let offset = new Point2D(0, 0);

        switch (direction) {
            case Direction.North: offset.Y -= 1; break;
            case Direction.South: offset.Y += 1; break;
            case Direction.West: offset.X -= 1; break;
            case Direction.East: offset.X += 1; break;
            case Direction.Right: offset.X += 1; offset.Y -= 1; break;
            case Direction.Left: offset.X -= 1; offset.Y -=1; break;
            case Direction.Down: offset.X += 1; offset.Y += 1; break;
            case Direction.Up: offset.X -= 1; offset.Y -= 1; break;
        }

        return offset;
    }
}
