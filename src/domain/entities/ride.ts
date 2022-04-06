import Call from "./call";
import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";

@Entity()
class Ride{

    @PrimaryColumn()
    private id: string;

    @OneToOne(() => Call)
    @JoinColumn()
    private call: Call;

    @Column()
    private riderArrivedStartLocation: boolean;

    @Column()
    private startDate: Date;

    constructor(id: string, call: Call, riderArrivedStartLocation: boolean, startDate: Date) {
        this.id = id
        this.call = call;
        this.riderArrivedStartLocation = riderArrivedStartLocation;
        this.startDate = startDate;
    }


}

export {Ride};