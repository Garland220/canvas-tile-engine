import { Static } from '../item';
import { Mobile } from '../mobile';


export class Item extends Static {
  private amount:number = 1;
  private weight:number = -1;
  private heldBy:Mobile;

  public get Amount():number {
    return this.amount;
  }
  public set Amount(amount:number) {
    this.amount = amount;
  }

  public get Weight():number {
    return this.weight;
  }
  public set Weight(weight:number) {
    this.weight = weight;
  }

  public get HeldBy():Mobile {
    return this.heldBy;
  }

  constructor() {
    super();
  }

  public CanEquip():boolean {
    return false;
  }

  public Decays():boolean {
    return (this.Movable && this.Visible);
  }

  public StackWith(from:Mobile, dropped:Item):boolean {
    return false;
  }

  public Consume(amount:number = 1):void {
    this.amount -= amount;

    if (this.amount <= 0) {
      this.Delete();
    }
  }
}
