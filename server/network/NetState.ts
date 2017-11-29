import * as SocketIO from 'socket.io';

import { Account } from '../Account';
import { Mobile } from '../mobiles/Mobile';
import { IPAddress } from './IPAddress';


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