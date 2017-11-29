import { Mobile } from '../mobile';
import { Map } from '../world';
import { Item } from '../item';
import { NetState } from '../network';
import { Point2D } from './Geometry';


export class Sector {
    private active: Boolean = false;

    private start: Point2D;
    private map: Map;

    private items: Item[] = [];
    private players: Mobile[] = [];
    private mobiles: Mobile[] = [];
    private clients: NetState[] = [];

    public get Items(): Item[] {
        return this.items;
    }

    public get Players(): Mobile[] {
        return this.players;
    }

    public get Mobiles(): Mobile[] {
        return this.mobiles;
    }

    public get Clients(): NetState[] {
        return this.clients;
    }

    constructor(x:number, y:number) {

    }

    public Add(list:any[], value:any):void {
        if (!list) {
            list = [];
        }

        list.push(value);
    }

    public Remove(list:any[], value:any):void {
        if (list) {
            let index = list.indexOf(value);

            if (index !== -1) {
                list.splice(index, 1);
            }
        }
    }

    public AddMobile(mobile:Mobile): void {
        this.Add(this.mobiles, mobile);

        if (mobile.IsPlayer) {
            this.Add(this.players, mobile);
        }
    }

    public RemoveMobile(mobile:Mobile): void {
        this.Remove(this.mobiles, mobile);

        if (mobile.IsPlayer) {
            this.Remove(this.players, mobile);
        }
    }

    public AddItem(item:Item):void {
        this.Add(this.items, item);
    }

    public RemoveItem(item: Item): void {
        this.Remove(this.items, item);
    }
}