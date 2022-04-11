import { Ride } from "../../../../../domain/entities/ride";
import IAcceptCallListener from "../listeners/acceptCall.listener";

abstract class AcceptCallObservableController {

    private listeners: IAcceptCallListener[];

    constructor(){
        this.listeners = [];
    }

    addListener(listener: IAcceptCallListener): void {
        this.listeners.push(listener);
    }

    notify(ride: Ride): void{
        for (const listener of this.listeners) {
            listener.newRide(ride);
        }
    }
}

export default AcceptCallObservableController;