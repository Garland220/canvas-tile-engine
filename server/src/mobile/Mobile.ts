import { Entity } from '../Entity';
import { Movement } from '../mobile';
import { Map, Region, World } from '../world';

import { Point2D, Point3D } from '../../../shared/Geometry';
import { Direction } from '../../../shared/mobile';


export abstract class Mobile extends Entity {
  private isPlayer:boolean = false;
  private alive:boolean = false;

  private flying:boolean = false;
  private swimming:boolean = false;

  private dazed:boolean = false;
  private frozen:boolean = false;
  private paralyzed:boolean = false;

  // private guild:Guild;
  private region:Region;

  // Flags
  private canMove:boolean = true;
  private canFly:boolean = false;
  private canSwim:boolean = false;

  private invulnerable:boolean = false;

  public get Alive():boolean {
    return this.alive;
  }

  public get Region():Region {
    return this.region;
  }

  public get CanMove():boolean {
    return (
      this.canMove &&
      !this.frozen &&
      !this.paralyzed
    );
  }

  public get CanRun():boolean {
    return !this.dazed;
  }

  public get CanBeDamaged():boolean {
    return !this.invulnerable;
  }

  constructor() {
    super();
  }

  public IsPlayer():boolean {
    return this.isPlayer;
  }

  public Kill():void {
    if(!this.CanBeDamaged)
      return;
    else if(!this.Alive /*|| IsDeadBondedPet*/)
      return;
    else if(this.Deleted)
      return;
    // else if(!this.Region.OnBeforeDeath( this ))
      // return;
    else if( !this.OnBeforeDeath() )
      return;

    this.OnDeath();
  }

  public OnBeforeDeath():boolean {
    return true;
  }

  public OnDeath():void {
    // Region onDeath
    // Global onDeath
    // Guild onDeath

    // DeathSound
  }

  public Delete():void {
    this.OnDelete();

    // Cancel Trades
    super.Delete();
    // Remove Items
    // Remove Bank account
    // Remove Virtual items
    // Remove stabled pets
    // Unlink pets
    // Unlink Guild

    World.RemoveMobile(this);
    this.OnAfterDelete();
  }

  public OnDelete():void {

  }

  public OnAfterDelete():void {

  }

  public CheckMove(direction:Direction):boolean {
    return Movement.CheckMove(this, direction);
  }

  public Move(direction:Direction):boolean {
    if (this.Deleted || !direction) {
      return false;
    }

    if (!this.CanMove) {
      return false;
    }

    let oldLocation:Point3D = this.Location.Clone();

    if (this.CheckMove(direction)) {
      let newLocation:Point3D = this.Location.Clone();
      let offset:Point2D = Movement.GetOffset(direction);

      newLocation.X += offset.X;
      newLocation.Y += offset.Y;
      newLocation.Z += this.Map.GetZAt(newLocation);
    }

    this.Direction = direction;

    this.OnAfterMove(oldLocation);
    return true;
  }

  public OnAfterMove(oldLocation:Point3D):void {

  }
}