import { Entity } from '../Entity';
import { Direction } from '../mobile';


export interface IMobile {
    Alive: boolean;
    Flying: boolean;
    Swimming: boolean;

    Dazed: boolean;
    Frozen: boolean;
    Paralyzed: boolean;

    CanMove: boolean;
    CanFly: boolean;
    CanSwim: boolean;

    Invulnerable: boolean;

    CheckMove(direction: Direction): boolean
}

export interface IMount {
    // Rider: Mobile;
    // OnRiderDamaged(amount: number, from: Mobile, willKill: boolean): void;
}

export interface IParty {
    // OnStamChanged(mobile: Mobile): void;
    // OnManaChanged(mobile: Mobile): void;
    // OnStatsQuery(beholder: Mobile, beheld: Mobile): void;
}

export class BaseMobile extends Entity implements IMobile {
    private alive: boolean = false;

    private flying: boolean = false;
    private swimming: boolean = false;

    private dazed: boolean = false;
    private frozen: boolean = false;
    private paralyzed: boolean = false;

    private canMove: boolean = true;
    private canFly: boolean = false;
    private canSwim: boolean = false;

    private invulnerable: boolean = false;

    public get Alive(): boolean {
        return this.alive;
    }
    public get Dazed(): boolean {
        return this.dazed;
    }
    public get Flying(): boolean {
        return this.flying;
    }
    public get Frozen(): boolean {
        return this.frozen;
    }
    public get Swimming(): boolean {
        return this.swimming;
    }
    public get Paralyzed(): boolean {
        return this.paralyzed;
    }
    public get Invulnerable(): boolean {
        return this.invulnerable;
    }

    public get CanMove(): boolean {
        return (
            this.canMove &&
            !this.frozen &&
            !this.paralyzed
        );
    }

    public get CanFly(): boolean {
        return (
            this.canFly &&
            !this.frozen &&
            !this.paralyzed
        );
    }

    public get CanSwim(): boolean {
        return (
            this.canSwim &&
            !this.frozen &&
            !this.paralyzed
        );
    }

    public get CanRun(): boolean {
        return !this.dazed;
    }

    public get CanBeDamaged(): boolean {
        return !this.invulnerable;
    }

    public CheckMove(direction: Direction): boolean {
        return false;
    }
}
