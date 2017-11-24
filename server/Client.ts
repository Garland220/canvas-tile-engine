import { Mobile } from './mobiles/Mobile';


export class Client {
  private active:boolean = false;
  private address:string = '';
  private account:Account;
  // private socket: Socket;
  private sendQueue:string[];

  private mobile:Mobile;
  private toString:string;

  private connectedOn:Date;
  private version:string;


  constructor() {

  }
}