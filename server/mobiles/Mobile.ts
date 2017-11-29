import { Entity } from '../Entity';
import { Direction } from '../Movement';
import { Point3D } from '../Geometry';
import { World } from '../World';


export class Mobile extends Entity {
  private movementBlocked:boolean = false;
  private alive:boolean = false;

  public get Alive():boolean {
    return this.alive;
  }

  public get CanBeDamaged():boolean {
    return true;
  }

  constructor() {
    super();
  }

  public Kill(): void {
    if( !this.CanBeDamaged )
      return;
    else if( !this.Alive /*|| IsDeadBondedPet*/ )
      return;
    else if( this.Deleted )
      return;
    // else if( !Region.OnBeforeDeath( this ) )
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