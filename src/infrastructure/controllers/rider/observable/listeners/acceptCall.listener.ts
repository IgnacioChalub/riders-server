import { Ride } from "../../../../../domain/entities/ride";

interface IAcceptCallListener{
    newRide(ride: Ride): void;
}

export default IAcceptCallListener;