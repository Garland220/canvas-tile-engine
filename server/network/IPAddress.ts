
export type IPAddress = string;

export class IPTools {
    public static IsValidIP(address:IPAddress):boolean {

    }

    public static IsLocal(address:IPAddress):boolean {
      if (ip.AddressFamily == AddressFamily.InterNetworkV6)
        return false;

      if (Utility.IPMatch("192.168.*", ip))
        return true;
      else if (Utility.IPMatch("10.*", ip))
        return true;
      else if (Utility.IPMatch("172.16-31.*", ip))
        return true;
      else if (Utility.IPMatch("169.254.*", ip))
        return true;
      else if (Utility.IPMatch("100.64-127.*", ip))
        return true;
      else
        return false;
    }

    public static IPMatch(pattern:string, address:IPAddress):boolean {

    }
}