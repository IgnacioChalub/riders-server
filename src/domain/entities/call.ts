import {Location} from "./location";
import {Column, Entity, PrimaryColumn} from "typeorm";
import RequestedVehicles from "./requestedVehicles";

@Entity()
class Call{

    @PrimaryColumn()
    private id: string;

    @Column()
    private callerId: string;

    @Column()
    private callerRatingStars: number;


    @Column(() => RequestedVehicles)
    private requestedVehicles: RequestedVehicles;

    @Column()
    private priceInCents: number;

    @Column()
    private description: string;

    @Column(() => Location)
    private startLocation: Location;

    @Column(() => Location)
    private finishLocation: Location;

    @Column()
    private active: boolean;

    constructor(id: string, callerId: string, callerRatingStars: number, requestedVehicles: RequestedVehicles, priceInCents: number, description: string, startLocation: Location, finishLocation: Location, active: boolean) {
        this.id = id;
        this.callerId = callerId;
        this.callerRatingStars = callerRatingStars;
        this.requestedVehicles = requestedVehicles;
        this.priceInCents = priceInCents;
        this.description = description;
        this.startLocation = startLocation;
        this.finishLocation = finishLocation;
        this.active = active;
    }
}

export default Call;