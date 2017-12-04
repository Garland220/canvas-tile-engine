import { Entity } from '../Entity';


export class Static extends Entity {
  private movable = false;

  public get Movable():boolean {
    return this.movable;
  }
  public set Movable(movable:boolean) {
    this.movable = movable;
  }

  constructor() {
    super();
  }

  public Decays():boolean {
    return false;
  }

  public VerifyMove():boolean {
    return this.movable;
  }
}
