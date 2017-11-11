import { Mobile } from './mobiles/Mobile';
import { Item } from './items/Item';


export class Map {
    public id:number;
    public name:string;
    // public properties: propList;
    // public tiledata;

    public mobiles:Mobile[];
    public items:Item[];

    constructor() {

    }

    public save(): boolean {
        return false;
    }

    public load(): boolean {
        return false;
    }
}