import {Location} from "./location";

class Call{

    private id: string;
    private callerId: string;
    private callerRatingStars: number;
    private vehicleTypes: string[];
    private priceInCents: number;
    private description: string;
    private startLocation: Location;
    private finishLocation: Location;

    constructor(id: string, callerId: string, callerRatingStars: number, vehicleTypes: string[], priceInCents: number, description: string, startLocation: Location, finishLocation: Location) {
        this.id = id;
        this.callerId = callerId;
        this.callerRatingStars = callerRatingStars;
        this.vehicleTypes = vehicleTypes;
        this.priceInCents = priceInCents;
        this.description = description;
        this.startLocation = startLocation;
        this.finishLocation = finishLocation;
    }
}

export default Call;