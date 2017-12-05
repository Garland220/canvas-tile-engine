import { Direction } from './mobile';
import { Point3D } from './Geometry';


export interface IEntity {
  ID: number;
  Name: String;
  Deleted: boolean;
  Visible: boolean;
  Location: Point3D;
  Direction: Direction;
  // Map: Map;
  Delete(): void;
  ProcessDelta(): void;
}
