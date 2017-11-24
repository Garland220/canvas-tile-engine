import { Entity } from '../Entity';
import { Direction } from '../Movement';
import { Point3D } from '../Geometry';


export class Mobile extends Entity {
  private movementBlocked:boolean = false;

  constructor() {
    super();
  }

  public Move(direction:Direction) {
    let newLocation:Point3D = this.Location;
    let oldLocation:Point3D = newLocation;
  }
}