import { Mobile } from './mobiles/Mobile';
import { Item } from './items/Item';


export class World {
    // Dictionaries
    private static mobiles:{ [id:number]:Mobile };
    private static items:{ [id:number]:Item };

    public static get Mobiles(): { [id:number]:Mobile } {
        return this.mobiles;
    }

    public static get Items(): { [id:number]:Item } {
        return this.items;
    }

    public static AddMobile(mobile:Mobile): void {
        this.mobiles[mobile.ID] = mobile;
    }

    public static FindMobile(id:number): Mobile {
        if (this.mobiles[id]) {
            return this.mobiles[id];
        }

        return null;
    }

    public static RemoveMobile(mobile:Mobile): void {
        this.mobiles[mobile.ID] = null;
        delete this.mobiles[mobile.ID];
    }


    public static AddItem(item:Item): void {
        this.items[item.ID] = item;
    }

    public static FindItem(id:number): Item {
        if (this.items[id]) {
            return this.items[id];
        }

        return null;
    }

    public static RemoveItem(item:Mobile): void {
        this.items[item.ID] = null;
        delete this.mobiles[item.ID];
    }

    public static Broadcast(color:string, text:string): void {
    //     p = new UnicodeMessage(Serial.MinusOne, -1, MessageType.Regular, hue, 3, "ENU", "System", text);

    //     List < NetState > list = NetState.Instances;

    //     p.Acquire();

    //     for (int i = 0; i < list.Count; ++i ) {
    //         if (list[i].Mobile != null)
    //             list[i].Send(p);
    //     }

    //     p.Release();

    //     NetState.FlushAll();
    }

    public static Save(): boolean {
        return false;
    }

    public static Load(): boolean {
        return false;
    }
}