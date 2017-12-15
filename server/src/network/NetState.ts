import * as SocketIO from 'socket.io';

import { Account } from '../user';
import { Mobile } from '../mobile';

import { Version } from '../../../shared/Version';
import { HardwareInfo } from '../../../shared/user';


class SocketMap {
    [socket: string]: NetState
}

export class NetState {
    private active: boolean;

    private sendQueue: string[];

    private socket: SocketIO.Socket;
    private address: IPAddress;

    private account: Account;
    private mobile: Mobile;

    private connectedOn: Date;

    private hardwareInfo: HardwareInfo;
    private version: Version;

    private static _clients: SocketMap = {};
    public static get Clients(): SocketMap {
        return NetState._clients
    }

    public get Socket(): SocketIO.Socket {
        return this.socket;
    }

    constructor(socket: SocketIO.Socket) {
        this.socket = socket;
        this.address = socket.request.connection.remoteAddress;
        this.connectedOn = new Date();
        this.active = true;

        NetState.AddClient(socket, this);
    }

    public static AddClient(socket: SocketIO.Socket, instance: NetState): void {
        if (NetState.Clients[socket.id]) {
            return;
        }

        if (socket && instance) {
            NetState.Clients[socket.id] = instance;
        }
    }

    public static RemoveClient(socket: SocketIO.Socket): void {
        if (NetState.Clients[socket.id]) {
            delete NetState.Clients[socket.id];
        }
    }

    public static GetClient(socket: SocketIO.Socket): NetState {
        return NetState.Clients[socket.id];
    }

    public OnConnect(): void {

    }

    private OnLogin(event: Event): void {
    }

    public OnDisconnect(): void {
        this.Delete();
    }

    public CheckActive(): boolean {
        return true;
    }

    public Send(): void {

    }

    public OnSend(): void {

    }

    public AfterSend(): void {

    }

    public Delete(): void {
        NetState.RemoveClient(this.socket);
        this.socket = undefined;
        this.mobile = undefined;
        this.account = undefined;
        this.address = undefined;
    }
}
