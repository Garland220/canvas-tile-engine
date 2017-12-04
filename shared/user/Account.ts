
export interface IAccount {
  Username: string;
  Email: string;
  Created: Date;
  Age: string;
  TryPassword(password: string): boolean;
  toJSON(): any;
}