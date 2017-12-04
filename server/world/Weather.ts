import { Map } from '../world';
import { Point2D, Rectangle2D } from '../world/Geometry';

export class Weather {
  private active:boolean = false;
  private bounds:Rectangle2D;
  private map:Map;

  private temperature:number = 0;

  public get Active():boolean {
    return this.active;
  }

  public get Bounds():Rectangle2D {
    return this.bounds;
  }

  public get Map():Map {
    return this.map;
  }

  constructor(map:Map) {
    this.map = map;
    this.active = true;
  }

  public CheckIntersection(rectangle1:Rectangle2D, rectangle2:Rectangle2D):boolean {
    if (rectangle1.Start.X >= (rectangle2.Start.X + rectangle2.Width)) {
      return false;
    }
    if (rectangle2.Start.X >= (rectangle1.Start.X + rectangle1.Width)) {
      return false;
    }
    if (rectangle1.Start.Y >= (rectangle2.Start.Y + rectangle2.Height)) {
      return false;
    }
    if (rectangle2.Start.Y >= (rectangle1.Start.Y + rectangle1.Height)) {
      return false;
    }

    return true;
  }

  public IntersectsWith(weather:Weather):boolean {
    return this.CheckIntersection(this.Bounds, weather.Bounds);
  }

  public ReCenter(point2D:Point2D):void {
    // let halfLength = this.Bounds.Center;

    // newPoint.X = point2D.X;
    // newPoint.Y = point2D.Y;
  }

  public OnTick():void {

  }
}