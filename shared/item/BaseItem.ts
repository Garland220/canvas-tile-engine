import { Entity } from '../Entity';
import { BaseMobile } from '../mobile';


export interface IItem {
    Amount: number;
    HeldBy: BaseMobile;
    Movable: boolean;
    Parent: Entity;
    Stackable: boolean;
    Weight: number;

    CanEquip(): boolean;
    Consume(): void;
    Decays(): boolean;
    VerifyMove(): void;
}

export class BaseItem extends Entity implements IItem {
    private amount: number = 1;
    private weight: number = -1;
    private heldBy: BaseMobile;
    private parent: Entity;
    private stackable: boolean = false;
    private movable = false;

    public get Movable(): boolean {
        return this.movable;
    }
    public set Movable(movable: boolean) {
        this.movable = movable;
    }

    public get Amount(): number {
        return this.amount;
    }
    public set Amount(amount: number) {
        this.amount = amount;
    }

    public get Weight(): number {
        return this.weight;
    }
    public set Weight(weight: number) {
        this.weight = weight;
    }

    public get HeldBy(): BaseMobile {
        return this.heldBy;
    }
    public set HeldBy(mobile: BaseMobile) {
        this.heldBy = mobile;
    }

    public get Parent(): Entity {
        return this.parent;
    }
    public set Parent(entity: Entity) {
        this.parent = entity;
    }
    public get ParentAsItem(): BaseItem {
        if (this.parent instanceof BaseItem) {
            return <BaseItem>this.parent;
        }
        return null;
    }
    public get ParentAsMobile(): BaseMobile {
        if (this.parent instanceof BaseMobile) {
            return <BaseMobile>this.parent;
        }
        return null;
    }

    public get Stackable(): boolean {
        return this.stackable;
    }
    public set Stackable(value: boolean) {
        this.stackable = value;
    }

    constructor() {
        super();
    }

    public CanEquip(): boolean {
        return false;
    }

    public Consume(amount: number = 1): void {
    }

    public Decays(): boolean {
        return (this.Movable && this.Visible);
    }

    public StackWith(from: BaseMobile, dropped: BaseItem): boolean {
        return false;
    }

    public VerifyMove(): boolean {
        return this.movable;
    }
}
