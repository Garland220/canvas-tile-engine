
export interface IShape {
  Center: Point2D | Point3D;
  Contains(point: Point3D): boolean;
  toJSON(): any;
  toString(): string;
}

export class Point2D {
  private x: number;
  private y: number;

  public static readonly Zero: Point2D = new Point2D(0, 0);

  public get X(): number {
    return this.x;
  }
  public set X(x: number) {
    this.x = x;
  }

  public get Y(): number {
    return this.y;
  }
  public set Y(y: number) {
    this.y = y;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public Clone(): Point2D {
    return new Point2D(this.X, this.Y);
  }

  public Add(point:Point2D|Point3D): void {
    this.X += point.X;
    this.Y += point.Y;
  }

  public Subtract(point: Point2D | Point3D): void {
    this.X -= point.X;
    this.Y -= point.Y;
  }

  public Distance(point: Point2D | Point3D): number {
    let z = (<Point3D>point).Z || 0;

    return Math.sqrt(Math.pow(this.X - point.X, 2) + Math.pow(this.Y - point.Y, 2) + Math.pow(0 - z, 2));
  }

  public isEqual(point: Point2D | Point3D): boolean {
    return (point.X === this.X && point.Y === this.Y);
  }

  public toJSON(): {[key: string]: any;} {
    let json:any = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        json[<string>key] = this[key];
      }
    }
    return json;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}


export class Point3D extends Point2D {
  public z: number;

  public static readonly Zero: Point3D = new Point3D(0, 0, 0);

  public get Z(): number {
    return this.z;
  }
  public set Z(z: number) {
    this.z = z;
  }

  constructor(x: number, y: number, z: number) {
    super(x, y);
    this.z = z;
  }

  public Clone(): Point3D {
    return new Point3D(this.X, this.Y, this.Z);
  }

  public Add(point: Point2D | Point3D):void {
    this.X += point.X;
    this.Y += point.Y;
    if ((<Point3D>point).Z) {
      this.Z += (<Point3D>point).Z;
    }
  }

  public Subtract(point: Point2D | Point3D): void {
    this.X -= point.X;
    this.Y -= point.Y;
    if ((<Point3D>point).Z) {
      this.Z -= (<Point3D>point).Z;
    }
  }

  public Distance(point: Point2D | Point3D): number {
    let z = (<Point3D>point).Z || 0;

    return Math.sqrt(Math.pow(this.X - point.X, 2) + Math.pow(this.Y - point.Y, 2) + Math.pow(this.Z - z, 2));
  }

  public isEqual(point: Point2D | Point3D): boolean {
    if ((<Point3D>point).Z && (<Point3D>point).Z !== this.Z) {
      return false;
    }
    return (point.X === this.X && point.Y === this.Y);
  }

  public toJSON(): { [key: string]: any; } {
    let json:any = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        json[<string>key] = this[key];
      }
    }
    return json;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}


export class Rectangle2D implements IShape {
  private start: Point2D;
  private end: Point2D;

  public get Start(): Point2D {
    return this.start;
  }

  public get End(): Point2D {
    return this.end;
  }

  public get Width(): number {
    return this.end.X - this.start.X;
  }

  public get Height(): number {
    return this.end.Y - this.end.Y;
  }

  public get Center(): Point2D {
    return new Point2D(
      this.start.X + (this.Width / 2),
      this.start.Y + (this.Height / 2)
    );
  }

  constructor(start: Point2D | Point3D, end: Point2D | Point3D) {
    this.start = new Point2D(start.X, start.Y);
    this.end = new Point2D(end.X, end.Y);;
  }

  public Contains(point: Point3D): boolean {
    return (
      this.start.X <= point.X &&
      this.start.Y <= point.Y &&
      this.end.X > point.X &&
      this.end.Y > point.Y
    );
  }

  public toJSON(): { [key: string]: any; } {
    let json:any = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        json[<string>key] = this[key];
      }
    }
    return json;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}


export class Rectangle3D implements IShape {
  private start: Point3D;
  private end: Point3D;

  public get Start(): Point3D {
    return this.start;
  }

  public get End(): Point3D {
    return this.end;
  }

  public get Width(): number {
    return this.end.X - this.start.X;
  }

  public get Height(): number {
    return this.end.Y - this.end.Y;
  }

  public get Depth(): number {
    return this.end.Z - this.start.Z;
  }

  public get Center(): Point2D {
    return new Point3D(
      this.start.X + (this.Width / 2),
      this.start.Y + (this.Height / 2),
      this.start.Z + (this.Depth / 2)
    );
  }

  constructor(start: Point3D, end: Point3D) {
    this.start = start;
    this.end = end;
  }

  public Contains(point: Point3D): boolean {
    return (
      this.start.X <= point.X &&
      this.start.Y <= point.Y &&
      this.start.Z <= point.Z &&
      this.end.X > point.X &&
      this.end.Y > point.Y &&
      this.end.Z > point.Z
    );
  }

  public toJSON(): { [key: string]: any; } {
    let json:any = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        json[<string>key] = this[key];
      }
    }
    return json;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}


export class Triangle implements IShape {
  private point1: Point2D;
  private point2: Point2D;
  private point3: Point2D;

  public get Point1(): Point2D {
    return this.point1;
  }

  public get Point2(): Point2D {
    return this.point2;
  }

  public get Point3(): Point2D {
    return this.point3;
  }

  public get Center(): Point2D {
    return new Point2D(
      (this.point1.X + this.point2.X + this.point3.X) / 3,
      (this.point1.Y + this.point2.Y + this.point3.Y) / 3
    );
  }

  constructor(point1: Point2D | Point3D, point2: Point2D | Point3D, point3: Point2D | Point3D) {
    this.point1 = new Point2D(point1.X, point1.Y);
    this.point2 = new Point2D(point2.X, point2.Y);
    this.point3 = new Point2D(point3.X, point3.Y);
  }

  public Contains(point: Point3D): boolean {
    let delta1 = new Point2D(
      this.point3.X - this.point1.X,
      this.point3.Y - this.point3.Y
    );
    let delta2 = new Point2D(
      this.point2.X - this.point1.X,
      this.point2.Y - this.point1.Y
    );
    let delta3 = new Point2D(
      point.X - this.point1.X,
      point.Y - this.point1.Y
    );

    let envelope: number[] = [
      (delta1.X * delta1.X) + (delta1.Y * delta1.Y),
      (delta1.X * delta2.X) + (delta1.Y * delta2.Y),
      (delta1.X * delta3.X) + (delta1.Y * delta3.Y),
      (delta2.X * delta2.X) + (delta2.Y * delta2.Y),
      (delta2.X * delta3.X) + (delta2.Y * delta3.Y),
    ];

    let invDenom = 1 / (envelope[0] * envelope[3] - envelope[1] * envelope[1]);
    let u = (envelope[3] * envelope[2] - envelope[1] * envelope[4]) * invDenom;
    let v = (envelope[0] * envelope[4] - envelope[1] * envelope[2]) * invDenom;

    return ((u >= 0) && (v >= 0) && (u + v < 1));
  }

  public toJSON(): { [key: string]: any; } {
    let json:any = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        json[<string>key] = this[key];
      }
    }
    return json;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}


export class Cone implements IShape {
  private start: Point3D;
  private end: Point3D;
  private length: number;

  public get Start():Point3D {
    return this.start;
  }

  public get End():Point3D {
    return this.end;
  }

  public get Length():number {
    return this.length;
  }

  public get Center():Point3D {
    return Point3D.Zero;
  }

  constructor(start:Point3D, end:Point3D) {
    this.start = start;
    this.end = end;

    this.length = start.Distance(end);
  }

  public Contains(point: Point3D): boolean {
    // TODO Implement
    return false;
  }

  public toJSON(): { [key: string]: any; } {
    let json:any = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        json[<string>key] = this[key];
      }
    }
    return json;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}


export class Circle implements IShape {
  private start: Point2D;
  private radius: number;

  public get Center(): Point2D {
    return this.start;
  }

  public get Radius(): number {
    return this.radius;
  }

  constructor(start: Point2D | Point3D, radius: number) {
    this.start = new Point2D(start.X, start.Y);
    this.radius = radius;
  }

  public Contains(point: Point3D): boolean {
    let dx = (point.X - this.start.X);
    let dy = (point.Y - this.start.Y);

    return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.radius, 2);
  }

  public toJSON() {
    let json:any = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        json[<string>key] = this[key];
      }
    }
    return json;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}


export class Sphere implements IShape {
  private start: Point3D;
  private radius: number;

  public get Center(): Point3D {
    return this.start;
  }

  public get Radius(): number {
    return this.radius;
  }

  constructor(start: Point2D | Point3D, radius: number) {
    let z = (<Point3D>start).Z || 0;

    this.start = new Point3D(start.X, start.Y, z);
    this.radius = radius;
  }

  public Contains(point: Point3D): boolean {
    let dx = (point.X - this.start.X);
    let dy = (point.Y - this.start.Y);
    let dz = (point.Z - this.start.Z);

    return Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dy, 2) <= Math.pow(this.radius, 2);
  }

  public toJSON(): { [key: string]: any; } {
    let json:any = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        json[<string>key] = this[key];
      }
    }
    return json;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
