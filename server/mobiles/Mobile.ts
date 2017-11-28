import { Entity } from '../Entity';
import { Direction } from '../Movement';
import { Point3D } from '../Geometry';
import { World } from '../World';


export class Mobile extends Entity {
  private movementBlocked:boolean = false;

  constructor() {
    super();
  }

  public Kill(): void {
    if( !CanBeDamaged() )
      return;
    else if( !Alive || IsDeadBondedPet )
      return;
    else if( m_Deleted )
      return;
    else if( !Region.OnBeforeDeath( this ) )
      return;
    else if( !OnBeforeDeath() )
      return;

    this.OnDeath();
  }

  public OnDeath(): void {
    // Region onDeath
    // Global onDeath
    // Guild onDeath

    // DeathSound
  }

  public OnBeforeDeath(): boolean {
    return true;
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