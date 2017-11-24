import { Point3D } from './Geometry';
import { Map } from './Map';


export interface IEntity {
  ID:number;
  Deleted:boolean;
  Visible:boolean;
  Location:Point3D;
  Map:Map;
  Delete(): void;
  ProcessDelta(): void;
}

export class Entity implements IEntity {
  private id:number;
  private deleted:boolean = false;
  private visible:boolean = false;
  private location:Point3D = new Point3D(0, 0, 0);
  private map:Map = null;

  public get ID(): number {
    return this.id;
  }
  public set ID(id:number) {
    this.id = id;
  }

  public get Deleted(): boolean {
    return this.deleted;
  }

  public get Visible(): boolean {
    return this.visible;
  }

  public get Location(): Point3D {
    return this.location;
  }
  public set Location(point:Point3D) {
    this.location.X = point.X;
    this.location.Y = point.Y;
    this.location.Z = point.Z;
  }

  public get Map(): Map {
    return this.map;
  }

  public get X(): number {
    return this.location.X;
  }

  public get Y(): number {
    return this.location.Y;
  }

  public get Z(): number {
    return this.location.Z;
  }

  constructor() {

  }

  public Delete(): void {
    this.deleted = true;
  }

  public ProcessDelta(): void {

  }
}