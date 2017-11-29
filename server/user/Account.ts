import { Mobile } from '../mobile';


export enum AccessLevel {
  Player = 0,
  Assistant,
  GameMaster,
  Seer,
  Administrator,
  Developer,
  Owner
}

export class Account {
  private username:string;
  private email:string;
  private created:Date;

  private accessLevel:AccessLevel;
  private mobiles:Mobile[];

  constructor() {

  }

  public toJSON(): {} {
    return {
      username: this.username,
      email: this.email,
      accessLevel: this.accessLevel,
      created: this.created,
      mobiles: this.mobiles.map(function(mobile:Mobile) {
        return mobile.ID;
      })
    };
  }

  public Delete(): void {

  }

  public SetPassword(password:string): void {

  }

  public TryPassword(password:string): boolean {
    return false;
  }
}
