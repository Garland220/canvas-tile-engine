import { Map } from './world';
import { IEntity } from './Entity';
import { Item } from './item';
import { Mobile } from './mobile';
import { Direction } from './mobile/Movement';
import { Point3D } from './world/Geometry';


export interface IMount {
  Rider:Mobile;
  OnRiderDamaged(amount:number, from:Mobile, willKill:boolean): void;
}

export interface IMountItem {
  Mount:IMount;
}

export interface IVendor {
  // OnBuyItems(from: Mobile, BuyItemResponse[]): boolean;
  // OnSellItems(from: Mobile, SellItemResponse[]): boolean;
  LastRestock:Date;
  RestockDelay:number;
  Restock():void;
}

export interface ICarvable {
  Carve(from:Mobile, item:Item): void;
}

export interface IWeapon {
  MaxRange:number;
  OnBeforeSwing(attacker:Mobile, defender:Mobile): void;
  OnSwing(attacker:Mobile, defender:Mobile): number;
  // GetStatusDamage(from: Mobile, promise: Promise): void;
}

export interface IHued {
  HuedItemID:number;
}

export interface ISpell {
  IsCasting:boolean;
  OnCasterHurt(): void;
  OnCasterKilled(): void;
  OnConnectionChanged(): void;
  OnCasterMoving(direction:Direction): boolean;
  OnCasterEquiping(item:Item): boolean;
  OnCasterUsingObject(object:object): boolean;
  // OnCastInTown(region: Region): boolean;
}

export interface IParty {
  OnStamChanged(mobile:Mobile):void;
  OnManaChanged(mobile:Mobile):void;
  OnStatsQuery(beholder:Mobile, beheld:Mobile):void;
}

export interface ISpawner {
  UnlinkOnTaming:boolean;
  HomeLocation:Point3D;
  HomeRange:number;
  Remove(spawn:ISpawnable): void;
}

export interface ISpawnable extends IEntity {
  OnBeforeSpawn(location:Point3D, map:Map): void;
  MoveToWorld(location:Point3D, map:Map): void;
  OnAfterSpawn(): void;
  Spawner:ISpawner;
}