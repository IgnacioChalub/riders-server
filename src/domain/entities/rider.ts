import {Column, Entity, PrimaryColumn} from "typeorm";
import {Vehicle} from "./vehicle";
import {Email} from "./email";

@Entity()
class Rider{

    @PrimaryColumn()
    private readonly id: string;

    @Column()
    private name: string;

    @Column()
    private surname: string;

    @Column()
    private DNI: number;

    @Column(() => Email)
    private email: Email;

    @Column()
    private readonly password: string;

    @Column(() => Vehicle)
    private vehicle: Vehicle;

    // @Column()
    // private rating: number;

    constructor(id: string, name: string, surname: string, DNI: number, email: Email, password: string, vehicle: Vehicle) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.DNI = DNI;
        this.email = email;
        this.password = password;
        this.vehicle = vehicle;
        //this.rating = rating;
    }

    getId(): string{
        return this.id;
    }

    getPassword(): string{
        return this.password;
    }
}

export default Rider;