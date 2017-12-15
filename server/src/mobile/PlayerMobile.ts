import { Mobile } from '../mobile';
import { NetState } from '../network';
import { Account } from '../user';


export class PlayerMobile extends Mobile {
    account: Account;
    netstate: NetState;

    refuseTrades: boolean = false;

    public get NetState(): NetState {
        return this.netstate;
    }
    public set NetState(netstate: NetState) {
        this.netstate = netstate;
    }

    public get RefuseTrades(): boolean {
        return this.refuseTrades;
    }
    public set RefuseTrades(value: boolean) {
        this.refuseTrades = value;
    }

    public get LastOnline(): Date {
        return this.account.LastOnline;
    }

    constructor() {
        super();
    }

    public TryTrade(mobile: Mobile): boolean {
        if ((mobile instanceof PlayerMobile)) {
            return true;
        }

        return false;
    }

    public Disconnect(): void {
        if (this.netstate) {
            this.netstate.Delete();
        }
    }
}