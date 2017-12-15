

export class Version {
    private major: number = 0;
    private minor: number = 0;
    private patch: number = 0;

    public toArray(): number[] {
        return [this.major, this.minor, this.patch];
    }

    public fromArray(arr: number[]|string[]): void {
        if (arr.length === 3) {
            this.major = parseInt(<string>arr[0], 10);
            this.minor = parseInt(<string>arr[1], 10);
            this.patch = parseInt(<string>arr[2], 10);
        }
    }

    public toString(): string {
        return this.major + '.' + this.minor + '.' + this.patch;
    }

    public fromString(string: string): void {
        let arr: string[] = string.split('.');

        this.fromArray(arr);
    }
}
