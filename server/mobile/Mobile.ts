import { Entity } from '../Entity';
import { Direction } from './Movement';
import { Point3D } from '../world/Geometry';
import { Map, Region, World } from '../world';


export class Mobile extends Entity {
  private movementBlocked:boolean = false;
  private alive:boolean = false;
  private region:Region;

  public get Alive():boolean {
    return this.alive;
  }

  public get CanBeDamaged():boolean {
    return true;
  }

  public get Region():Region {
    return this.region;
  }

  constructor() {
    super();
  }

  public Kill(): void {
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

  public OnBeforeDeath(): boolean {
    return true;
  }

  public OnDeath(): void {
    // Region onDeath
    // Global onDeath
    // Guild onDeath

    // DeathSound
  }

  public Delete(): void {
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

  public OnDelete(): void {


  }

  public OnAfterDelete(): void {

  }

  public Move(direction:Direction) {
    let newLocation:Point3D = this.Location;
    let oldLocation:Point3D = newLocation;
  }
}