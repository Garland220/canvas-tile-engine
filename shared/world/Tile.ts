
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
