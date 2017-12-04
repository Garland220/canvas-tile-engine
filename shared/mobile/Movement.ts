import { Point3D } from '../Geometry';


export interface IMovementImpl {
  // CheckMovement(mobile: Mobile, map: Map, location: Point3D, direction: Direction): boolean;
}

export enum Direction {
  North,
  NorthEast,
  East,
  SouthEast,
  South,
  SouthWest,
  West,
  NorthWest,
  Up,
  Down
}
