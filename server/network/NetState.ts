import * as SocketIO from 'socket.io';

import { Account, Client } from '../user';
import { Mobile } from '../mobile';


export class NetState {
  private socket:SocketIO.Socket;
  private address:IPAddress;

  private account:Account;
  private mobile:Mobile;

  public get Socket():SocketIO.Socket {
    return this.socket;
  }

  constructor(socket:SocketIO.Socket) {
    this.socket = socket;
  }

  public OnConnect():void {

  }

  public OnDisconnect():void {

  }

  public CheckActive():boolean {
    return true;
  }

  public Send():void {

  }

  public OnSend():void {

  }

  public AfterSend():void {

  }

  public Destroy():void {

  }
}