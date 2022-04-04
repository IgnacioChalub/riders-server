import {Location} from "./location";
import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
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

    @OneToOne(() => Location)
    @JoinColumn()
    private readonly startLocation: Location;

    @OneToOne(() => Location)
    @JoinColumn()
    private readonly finishLocation: Location;

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

    isInRadius(riderLat: number, riderLong: number, km: number): boolean{
        return this.startLocation.isInRadius(riderLat, riderLong, km);
    }

    getStartLocation(): Location{
        return this.startLocation;
    }

    getFinishLocation(): Location{
        return this.finishLocation;
    }
}

export default Call;