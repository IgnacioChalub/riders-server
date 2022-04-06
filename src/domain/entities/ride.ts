import Call from "./call";
import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";

@Entity()
class Ride{

    @PrimaryColumn()
    private id: string;

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
    private startDate: Date;

    constructor(id: string, riderId: string, call: Call, riderArrivedStartLocation: boolean, active: boolean, startDate: Date) {
        this.id = id
        this.riderId = riderId;
        this.call = call;
        this.riderArrivedStartLocation = riderArrivedStartLocation;
        this.active = active;
        this.startDate = startDate;
    }


}

export {Ride};