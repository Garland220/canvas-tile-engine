import { Mobile } from '../mobile';
import { BaseItem } from '../../../shared/item';


export class Item extends BaseItem {
    constructor() {
        super();
    }

    public CanEquip(): boolean {
        return false;
    }

    public Decays(): boolean {
        return (this.Movable && this.Visible);
    }

    public StackWith(from: Mobile, dropped: Item): boolean {
        if (this.Stackable && this instanceof dropped.constructor && this !== dropped) {
            this.Amount += dropped.Amount;
            dropped.Delete();
        }
        return false;
    }

    public Consume(amount: number = 1): void {
        this.Amount -= amount;

        if (this.Amount <= 0) {
            this.Delete();
        }
    }
}
