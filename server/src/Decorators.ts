import { AccessLevel } from './user/Account';


export function Constructable<T extends { new (...args: any[]): {} }>(target:T): any {
  return class extends target {
    ConstructLevel = AccessLevel.Player;
  }
}


// This doesn't work. Need to rethink.
export function AccessRequirement(accessLevel:AccessLevel) {
  return function (target:any, propertyKey: string, descriptor: PropertyDescriptor) {
    target.WriteLevel = accessLevel;
    target.ReadLevel = accessLevel;
  }
}


export function Enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}
