import {Column, Entity, PrimaryColumn} from "typeorm";
import {Vehicle} from "./vehicle";

@Entity()
class Rider{

    @PrimaryColumn()
    private id: string;

    @Column()
    private name: string;

    @Column()
    private surname: string;

    @Column()
    private DNI: number;

    @Column()
    private email: string;

    @Column()
    private password: string;

    @Column(type => Vehicle)
    private vehicle: Vehicle;

    constructor(id: string, name: string, surname: string, DNI: number, email: string, password: string, vehicle: Vehicle) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.DNI = DNI;
        this.email = email;
        this.password = password;
        this.vehicle = vehicle;
    }

    getId(): string{
        return this.id;
    }

    getPassword(): string{
        return this.password;
    }
}

export default Rider;