import { Point3D } from '../../../shared/Geometry';
import { Direction } from '../../../shared/mobile';
import { IMobile } from '../../../shared/mobile';
import { IEntity } from '../../../shared';


export class Mobile implements IEntity, IMobile {
  private location: Point3D;

  public get ID(): number {
    return 0;
  }

  public get Name(): string {
    return "";
  }

  public get Deleted(): boolean {
    return false;
  }

  public get Visible(): boolean {
    return false;
  }

  public get Direction(): Direction {
    return Direction.North;
  }

  public get Alive(): boolean {
    return false;
  }

  public get Flying(): boolean {
    return false;
  }
  public get Swimming(): boolean {
    return false;
  }

  public get Dazed(): boolean {
    return false;
  }
  public get Frozen(): boolean {
    return false;
  }
  public get Paralyzed(): boolean {
    return false;
  }

  public get CanMove(): boolean {
    return false;
  }
  public get CanFly(): boolean {
    return false;
  }
  public get CanSwim(): boolean {
    return false;
  }

  public get Invulnerable(): boolean {
    return false;
  }

  public get Location(): Point3D {
    return this.location;
  }
  public set Location(location: Point3D) {
    this.location = location;
  }

  constructor() {

  }

  public Render(): void {

  }

  public CheckMove(direction: Direction): boolean {
    return false;
  }

  public Delete(): void {

  }

  public ProcessDelta(): void {

  }
}