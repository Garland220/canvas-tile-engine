declare type IPAddress = string;
declare type IPVersion = 'ipv4' | 'ipv6';

declare module 'ipaddr.js' {
  interface IPAddr {
    octet:number[];
    type:() => IPVersion;
  }

  interface IPAddrModule {
    parse:(address:IPAddress) => IPAddr
    subnetMatch(address: IPAddress, rangeList: string[], defaultName?: string): string;
  }

  const module:IPAddrModule;
  export = module;
}