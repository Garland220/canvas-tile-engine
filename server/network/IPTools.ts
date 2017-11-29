import * as ipaddr from 'ipaddr.js';


export class IPTools {
    public static IsValidIP(address:IPAddress):boolean {
      return false;
    }

    public static IsLocal(address:IPAddress):boolean {
      ipaddr.subnetMatch(address, [
        // new IPv4(192, 168, 0, 0),
        // new IPv4(169, 254, 0, 0)
      ]);

      return false;
    }

    public static IPMatch(pattern:string, address:IPAddress):boolean {
      return false;
    }
}