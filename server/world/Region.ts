import { Map } from './Map';
import { Mobile } from '../mobile';
import { Item } from '../item';
import { Point3D, Rectangle2D } from './Geometry';


export class Region {
  private name: string;
  private map: Map;
  private goLocation: Point3D;
  private area: Rectangle2D[];
  private parent: Region;

  public get Name():string {
    return this.name;
  }
  public set Name(value:string) {
    this.name = value;
  }

  public get Map(): Map {
    return this.map;
  }
  public set Map(value: Map) {
    this.map = value;
  }

  public get Area(): Rectangle2D[] {
    return this.area;
  }
  public set Area(value: Rectangle2D[]) {
    this.area = value;
  }

  public get Parent(): Region {
    return this.parent;
  }

  public get GoLocation(): Point3D {
    return this.goLocation;
  }

  constructor(name: string, map: Map, area:Rectangle2D[], parent ?: Region) {

  }

  public Contains(point: Point3D):boolean {
    for (let i:number = 0, len:number = this.area.length; i < len; i++) {
      let rectangle:Rectangle2D = this.area[i];

      if (rectangle.Contains(point)) {
        return true;
      }
    }

    return false;
  }

  public GetPlayerCount():number {
    return 0;
  }

  public GetMobileCount():number {
    return 0;
  }

  public GetMobiles():Mobile[] {
    return [];
  }

  public GetItemCount(): number {
    return 0;
  }

  public GetItems(): Item[] {
    return [];
  }

  public OnEnter(mobile:Mobile):void {

  }

  public OnExit(mobile: Mobile): void {

  }

  public OnBeforeDeath(mobile:Mobile): boolean {
    return true;
  }

  public OnDeath(mobile:Mobile): void {

  }

  public AllowSpawn():boolean {
    if (this.parent) {
      return this.parent.AllowSpawn();
    }
    return true;
  }

  public Destroy():void {
    this.map = undefined;
    this.name = undefined;
    this.area = undefined;
    this.parent = undefined;
    this.goLocation = undefined;

    // for (let i: number = 0, len: number = this.sectors.length; i < len; i++) {
      // this.sectors[i].Destroy();
    // }
  }

}