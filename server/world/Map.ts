import { Item } from '../item';
import { Mobile } from '../mobile';
import { Weather } from '../world';
import { Point2D, Point3D } from '../world/Geometry';

export enum WeatherType {
  None = 0,
  Standard = 1
}

export class MapPropertiess {
  private allowTeleport: boolean;
  private allowHealing: boolean;
  private allowDamage: boolean;
  private allowPull: boolean;
  private allowPVP: boolean;
  private allowPVE: boolean;
  private allowHousing: boolean;
  private allowDecay: boolean;
  private allowSpells: boolean;
  private weatherType: WeatherType;
}

export class Tile {
  private id: number;
  private name: string;
  private height: number;
  private frames: number;

  // Flags
  private wet: boolean;
  private natural: boolean;
  private surface: boolean;
  private passable: boolean;
  private damaging: boolean;
  private animated: boolean;
  private seeThrough: boolean;
  private shootThrough: boolean;
}

export class LandTile {
  private id: number;
  private name: string;
  private z: number;
}

export class TileSet {
  private image: ImageData;
  private scale: number;
  private rows: number;
  private columns: number;

  constructor(image: ImageData, height:number, width:number, scale: number = 32) {
    this.image = image;
    this.scale = scale;
    this.rows = Math.floor(height / scale);
    this.columns = Math.floor(width / scale);
  }

  public GetPointFromID(id:number): Point2D {
    return new Point2D(Math.floor(id % this.columns), Math.floor(id / this.columns));
  }

  public SpriteAt(point:Point2D) {
    let tile = this.image;
  }
}

export class MapTileData {
  private tileSet:TileSet;
  private mapData:number[][][];
  private heightData:number[][];
}

export class Map {
  private id:number;
  private name:string;
  private height: number;
  private width: number;
  private properties: MapPropertiess;
  private tiledata: MapTileData;

  private weather: Weather[];
  private mobiles:Mobile[];
  private items:Item[];

  public get ID():number {
      return this.id;
  }

  public get Name():string {
      return this.name;
  }

  public get Mobiles():Mobile[] {
      return this.mobiles;
  }

  public get MobilesCount():number {
      return this.mobiles.length;
  }

  public get Items(): Item[] {
      return this.items;
  }

  public get ItemCount(): number {
      return this.items.length;
  }

  constructor(id: number, name: string, height: number, width: number, tiledata: MapTileData, properties: MapPropertiess) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.width = width;
    this.tiledata = tiledata;
    this.properties = properties;
  }

  public GetZAt(location:Point3D):number {
    return 0;
  }

  public AddMobile(mobile:Mobile):void {
    if (this.mobiles.indexOf(mobile) === -1) {
        this.mobiles.push(mobile);
    }
  }

  public RemoveMobile(mobile:Mobile):void {
      let index = this.mobiles.indexOf(mobile);

      if (index !== -1) {
          this.mobiles.splice(index, 1);
      }
  }

  public AddItem(item: Item): void {
      if (this.items.indexOf(item) === -1) {
          this.items.push(item);
      }
  }

  public RemoveItem(item: Item): void {
      let index = this.items.indexOf(item);

      if (index !== -1) {
          this.items.splice(index, 1);
      }
  }

  public Save(): boolean {
    return false;
  }

  public Load(): boolean {
    return false;
  }
}