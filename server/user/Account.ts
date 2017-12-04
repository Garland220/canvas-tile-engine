import { Mobile } from '../mobile';
import { IAccount } from '../../shared/user';


export enum AccessLevel {
  Player = 0,
  Assistant,
  GameMaster,
  Seer,
  Administrator,
  Developer,
  Owner
}

export class Account implements IAccount {
  private username:string;
  private email:string;
  private created:Date;

  private accessLevel:AccessLevel;
  private mobiles:Mobile[];

  public get Username(): string {
    return this.username;
  }

  public get Email():string {
    return this.email;
  }

  public get Created():Date {
    return this.created;
  }

  public get Age():string {
    return this.created.toString();
  }

  constructor() {

  }

  public Delete(): void {

  }

  public SetPassword(password:string): void {

  }

  public TryPassword(password:string): boolean {
    return false;
  }

  public toJSON(): {} {
      return {
          username: this.username,
          email: this.email,
          accessLevel: this.accessLevel,
          created: this.created,
          mobiles: this.mobiles.map(function(mobile: Mobile) {
              return mobile.ID;
          })
      };
  }
}
