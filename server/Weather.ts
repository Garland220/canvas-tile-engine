import { Map } from './Map';
import { Point2D, Rectangle2D } from './Geometry';

export class Weather {
  private active:boolean = false;
  private bounds:Rectangle2D;
  private map:Map;

  constructor(map:Map) {
      this.map = map;
  }

  public ReCenter(point2D:Point2D):void {

  }

  public OnTick():void {

  }
}