import { Mobile } from './mobile';
import { Point3D } from '../../shared/Geometry';


export class Player {
    private mobile: Mobile;

    public get Location(): Point3D {
        return this.mobile.Location;
    }

    public Render(): void {

    }
}
