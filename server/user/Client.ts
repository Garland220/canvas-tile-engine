import { Mobile } from '../mobile';


export class Client {
  private active:boolean = false;
  private address:string = '';
  private account:Account;
  // private socket: Socket;
  private sendQueue:string[];

  private mobile:Mobile;
  private toString:string;




  constructor() {

  }
}