import { Item } from '../item';
import { Mobile } from '../mobile';
import { Map } from '../world';
import { IShape, Circle, Rectangle2D, Point3D } from '../world/Geometry';

export class Enumerator {
    public static GetMobiles(map:Map) {
        return map.Mobiles;
    }

    public static GetMobilesInShape(map:Map, area:IShape) {
        return map.Mobiles.map((mobile) => {
            return area.Contains(mobile.Location);
        });
    }

    public static GetMobilesInBounds(map:Map, start:Point3D, end:Point3D) {
        Enumerator.GetMobilesInShape(map, new Rectangle2D(start, end));
    }

    public static GetMobilesInRadius(map:Map, point:Point3D, radius:number) {
        Enumerator.GetMobilesInShape(map, new Circle(point, radius));
    }

    public static GetItems(map:Map) {

    }
}
