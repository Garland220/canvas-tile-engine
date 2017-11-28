import { Map } from './Map';
import { Point2D, Rectangle2D } from './Geometry';

export class Weather {
  private active:boolean = false;
  private bounds:Rectangle2D;
  private map:Map;

  private temperature:number = 0;

  public get Bounds():Rectangle2D {
    return this.bounds;
  }

  constructor(map:Map) {
    this.map = map;
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

  }

  public OnTick():void {

  }
}