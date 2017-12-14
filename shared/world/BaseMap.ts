import { BaseItem } from '../item';
import { BaseMobile } from '../mobile';
import { Point2D, Point3D } from '../Geometry';


export interface IMap {
    ID: number;
    Name: string;
    Height: number;
    Width: number;

    GetZAt(location: Point3D): number;
}

export class TileSet {
    private image: ImageData;
    private scale: number;
    private rows: number;
    private columns: number;

    constructor(image: ImageData, height: number, width: number, scale: number = 32) {
        this.image = image;
        this.scale = scale;
        this.rows = Math.floor(height / scale);
        this.columns = Math.floor(width / scale);
    }

    public GetPointFromID(id: number): Point2D {
        return new Point2D(Math.floor(id % this.columns), Math.floor(id / this.columns));
    }

    public SpriteAt(point: Point2D) {
        let tile = this.image;
    }
}

export class BaseMap implements IMap {
    private id: number;
    private name: string;
    private height: number;
    private width: number;

    public get ID(): number {
        return this.id;
    }

    public get Name(): string {
        return this.name;
    }

    public get Height(): number {
        return this.height;
    }

    public get Width(): number {
        return this.width;
    }

    constructor(id: number, name: string, height: number, width: number) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.width = width;
    }

    public GetZAt(location: Point3D): number {
        return 0;
    }
}
