import {Location} from "./location";
import {Column, PrimaryColumn} from "typeorm";

class Call{

    private id: string;
    private callerId: string;
    private callerRatingStars: number;
    private vehicleTypes: string[];
    private priceInCents: number;
    private description: string;
    private startLocation: Location;
    private finishLocation: Location;
    private active: boolean;

    constructor(id: string, callerId: string, callerRatingStars: number, vehicleTypes: string[], priceInCents: number, description: string, startLocation: Location, finishLocation: Location, active: boolean) {
        this.id = id;
        this.callerId = callerId;
        this.callerRatingStars = callerRatingStars;
        this.vehicleTypes = vehicleTypes;
        this.priceInCents = priceInCents;
        this.description = description;
        this.startLocation = startLocation;
        this.finishLocation = finishLocation;
        this.active = active;
    }
}

export default Call;