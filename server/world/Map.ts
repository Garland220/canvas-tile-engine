import { Mobile } from '../mobile';
import { Item } from '../item';


export class Map {
  public id:number;
  public name:string;
  // public properties: propList;
  // public tiledata;

  public mobiles:Mobile[];
  public items:Item[];

  public get Mobiles():Mobile[] {
      return this.mobiles;
  }

  public get MobilesCount():number {
      return this.mobiles.length;
  }

  constructor() {

  }

  public AddMobile(mobile:Mobile):void {
    if (this.mobiles.indexOf(mobile) === -1) {
        this.mobiles.push(mobile);
    }
  }

  public RemoveMobile(mobile:Mobile):void {
      let index = this.mobiles.indexOf(mobile);

      if (index !== -1) {
          this.mobiles.splice(index, 1);
      }
  }

  public save(): boolean {
    return false;
  }

  public load(): boolean {
    return false;
  }
}