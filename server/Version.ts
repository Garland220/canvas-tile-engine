
export class Version {
  private static major:number = 0;
  private static minor:number = 0;
  private static patch:number = 0;

  public static toString(): string {
    return this.major + '.' + this.minor + '.' + this.patch;
  }
}