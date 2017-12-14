import { Movement } from '../mobile';
import { Map, Region, World } from '../world';

import { Point2D, Point3D } from '../../../shared/Geometry';
import { BaseMobile, Direction } from '../../../shared/mobile';


export abstract class Mobile extends BaseMobile {
    // private guild:Guild;
    private region: Region;

    private isPlayer: boolean = false;

    private undead: boolean = false;
    private demonic: boolean = false;
    private cursed: boolean = false;

    private blessed: boolean = false;

    public get Region(): Region {
        return this.region;
    }

    public get IsPlayer(): boolean {
        return this.isPlayer;
    }

    public get IsUndead(): boolean {
        return this.undead;
    }

    public set IsUndead(value: boolean) {
        this.undead = value;
    }

    public get IsUnholy(): boolean {
        return this.undead || this.demonic || this.cursed;
    }

    public get IsHoly(): boolean {
        return this.blessed;
    }

    constructor() {
        super();
    }

    public Kill(): void {
        if (!this.CanBeDamaged)
            return;
        else if (!this.Alive /*|| IsDeadBondedPet*/)
            return;
        else if (this.Deleted)
            return;
        // else if(!this.Region.OnBeforeDeath( this ))
        // return;
        else if (!this.OnBeforeDeath())
            return;

        this.OnDeath();
    }

    public OnBeforeDeath(): boolean {
        return true;
    }

    public OnDeath(): void {
        // Region onDeath
        // Global onDeath
        // Guild onDeath

        // DeathSound
    }

    public Delete(): void {
        this.OnDelete();

        // Cancel Trades
        super.Delete();
        // Remove Items
        // Remove Bank account
        // Remove Virtual items
        // Remove stabled pets
        // Unlink pets
        // Unlink Guild

        World.RemoveMobile(this);
        this.OnAfterDelete();
    }

    public OnDelete(): void {

    }

    public OnAfterDelete(): void {

    }

    public PathedDistance(point: Point3D): number {
        return 0;
    }

    public CheckMove(direction: Direction): boolean {
        return Movement.CheckMove(this, direction);
    }

    public Move(direction: Direction): boolean {
        if (this.Deleted || !direction) {
            return false;
        }

        if (!this.CanMove) {
            return false;
        }

        let oldLocation: Point3D = this.Location.Clone();

        if (this.CheckMove(direction)) {
            let newLocation: Point3D = this.Location.Clone();
            let offset: Point2D = Movement.GetOffset(direction);

            newLocation.X += offset.X;
            newLocation.Y += offset.Y;
            newLocation.Z += this.Map.GetZAt(newLocation);
        }

        this.Direction = direction;

        this.OnAfterMove(oldLocation);
        return true;
    }

    public OnAfterMove(oldLocation: Point3D): void {

    }
}
