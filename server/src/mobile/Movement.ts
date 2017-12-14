import { Mobile } from '../mobile';
import { Map } from '../world';

import { Point2D, Point3D } from '../../../shared/Geometry';
import { Direction } from '../../../shared/mobile/Movement';


export class Movement {
    public static CheckMove(mobile: Mobile, direction: Direction): boolean {
        return false;
    }

    public static GetOffset(direction: Direction): Point2D {
        let offset = new Point2D(0, 0);

        switch (direction) {
            case Direction.North: offset.Y -= 1; break;
            case Direction.South: offset.Y += 1; break;
            case Direction.West: offset.X -= 1; break;
            case Direction.East: offset.X += 1; break;
            case Direction.NorthEast: offset.X += 1; offset.Y -= 1; break;
            case Direction.SouthWest: offset.X -= 1; offset.Y -= 1; break;
            case Direction.SouthEast: offset.X += 1; offset.Y += 1; break;
            case Direction.NorthWest: offset.X -= 1; offset.Y -= 1; break;
        }

        return offset;
    }

    public static GetOffset3D(direction: Direction): Point3D {
        let offset = new Point3D(0, 0, 0);
        let offset2d;

        switch (direction) {
            case Direction.Up: offset.Z += 1; break;
            case Direction.Down: offset.Z -= 1; break;
            default: offset2d = Movement.GetOffset(direction); break;
        }

        if (offset2d) {
            offset.X = offset2d.X;
            offset.Y = offset2d.Y;
        }

        return offset;
    }
}
