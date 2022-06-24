import Call from "./call";
import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";

@Entity()
class Ride{

    @PrimaryColumn()
    private readonly id: string;

    @Column()
    private readonly riderId: string;

    @OneToOne(() => Call)
    @JoinColumn()
    private call: Call;

    @Column()
    private riderArrivedStartLocation: boolean;

    @Column()
    private active: boolean;

    @Column()
    private date: Date;

    @Column()
    private readonly callerRated: boolean;

    @Column()
    private readonly riderRated: boolean;

    @Column()
    private vehicleUsed: string;

    @Column()
    private finishDate: Date;

    @Column({type:"decimal"})
    private riderRatingStars: number;

    constructor(id: string, riderId: string, call: Call, riderArrivedStartLocation: boolean, active: boolean, date: Date, vehicelUsed: string, finishDate: Date, riderRatingStars: number) {
        this.id = id
        this.riderId = riderId;
        this.call = call;
        this.riderArrivedStartLocation = riderArrivedStartLocation;
        this.active = active;
        this.date = date;
        this.callerRated = false;
        this.riderRated = false;
        this.vehicleUsed = vehicelUsed;
        this.finishDate = finishDate;
        this.riderRatingStars = riderRatingStars;
    }

    getId(): string{
        return this.id;
    }

    getCallerId(): string{
        return this.call.getCallerId();
    }

    getRiderId(): string{
        return this.riderId;
    }

    setRiderArrivedStartLocation(): void{
        this.riderArrivedStartLocation = true;
    }

    finishRide(): void{
        this.active = false;
        this.finishDate = new Date();
    }

    riderIsRated(): boolean{
        return this.riderRated;
    }

    callerIsRated(): boolean{
        return this.callerRated;
    }

    getFinishDate(): Date{
        return this.finishDate;
    }

    getPriceInCents(): number{
        return this.call.getPriceInCents();
    }
}

export {Ride};