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
