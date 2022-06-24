import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Payment{

    @PrimaryColumn()
    private paymentId: string;

    @Column()
    private callerId: string;

    
    @Column()
    private amountInCents: number;
    
    @Column()
    private date: Date;


    constructor(paymentId: string, callerId: string, amountInCents: number, date: Date){
        this.paymentId = paymentId;
        this.callerId = callerId;
        this.amountInCents = amountInCents;
        this.date = date;
    }
}

export {Payment};