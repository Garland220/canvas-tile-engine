import { Mobile } from '../mobile';
import { Item } from '../item';

class MobileHash {
    [id: number]: Mobile;
}

class ItemHash {
    [id: number]: Item;
}

export class World {
    private static paused: boolean = false;

    // Dictionaries
    private static mobiles: MobileHash = {};
    private static items: ItemHash = {};

    private static mobileCount: number = 0;
    private static itemCount: number = 0;

    public static get Mobiles(): MobileHash {
        return World.mobiles;
    }

    public static get MobilesCount(): number {
        return World.mobileCount;
    }

    public static get MobilesArray(): Mobile[] {
        return Object.keys(World.mobiles).map(function(mobileId: string) {
            return World.mobiles[<any>mobileId];
        });
    }

    public static get Items(): ItemHash {
        return World.items;
    }

    public static get ItemsCount(): number {
        return World.itemCount;
    }

    public static get ItemsArray(): Item[] {
        return Object.keys(World.items).map(function(itemId: string) {
            return World.items[<any>itemId];
        });
    }

    public static AddMobile(mobile: Mobile): void {
        if (!(mobile instanceof Mobile)) {
            return;
        }

        if (!World.mobiles[mobile.ID]) {
            World.mobiles[mobile.ID] = mobile;
            World.mobileCount += 1;
        }
    }

    public static RemoveMobile(mobile: Mobile): void {
        if (!(mobile instanceof Mobile)) {
            return;
        }

        if (World.mobiles[mobile.ID]) {
            World.mobiles[mobile.ID] = null;
            delete World.mobiles[mobile.ID];
            World.mobileCount -= 1;
        }
    }

    public static GetMobile(mobileId: number): Mobile {
        if (World.mobiles[mobileId]) {
            return World.mobiles[mobileId];
        }
        return null;
    }

    public static AddItem(item: Item): void {
        if (!(item instanceof Item)) {
            return;
        }

        if (!World.items[item.ID]) {
            World.items[item.ID] = item;
            World.itemCount += 1;
        }
    }

    public static RemoveItem(item: Item): void {
        if (!(item instanceof Item)) {
            return;
        }

        if (World.items[item.ID]) {
            World.items[item.ID] = null;
            delete World.items[item.ID];
            World.itemCount -= 1;
        }
    }

    public static GetItem(itemId: number): Item {
        if (World.items[itemId]) {
            return World.items[itemId];
        }
        return null;
    }

    public static Broadcast(color: string, text: string): void {
        // p = new UnicodeMessage(Serial.MinusOne, -1, MessageType.Regular, hue, 3, "ENU", "System", text);

        // List < NetState > list = NetState.Instances;

        // p.Acquire();

        // for (int i = 0; i < list.Count; ++i ) {
        //     if (list[i].Mobile != null)
        //         list[i].Send(p);
        // }

        // p.Release();
    }

    public static Pause(): void {
        World.paused = true;
    }

    public static Resume(): void {
        World.paused = false;
    }

    public static Save(): boolean {
        World.Pause();
        return false;
    }

    public static Load(): boolean {
        World.Pause();
        return false;
    }
}