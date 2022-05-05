import Call from "./call";
import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {Caller} from "./caller";

@Entity()
class Ride{

    @PrimaryColumn()
    private readonly id: string;

    @Column()
    private riderId: string;

    @OneToOne(() => Call)
    @JoinColumn()
    private call: Call;

    @Column()
    private riderArrivedStartLocation: boolean;

    @Column()
    private active: boolean;

    @Column()
    private date: Date;

    constructor(id: string, riderId: string, call: Call, riderArrivedStartLocation: boolean, active: boolean, date: Date) {
        this.id = id
        this.riderId = riderId;
        this.call = call;
        this.riderArrivedStartLocation = riderArrivedStartLocation;
        this.active = active;
        this.date = date;
    }

    getId(): string{
        return this.id;
    }

    getCallerId(): string{
        return this.call.getCallerId();
    }

    setRiderArrivedStartLocation(): void{
        this.riderArrivedStartLocation = true;
    }

    finishRide(): void {
        this.active = false;
    }
}

export {Ride};