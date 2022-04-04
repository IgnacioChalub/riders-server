import {Column, Entity, PrimaryColumn} from "typeorm";
import {Vehicle} from "./vehicle";
import {Email} from "./email";
import {Rating} from "./rating";

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

    @Column(() => Rating)
    private rating: Rating;

    constructor(id: string, name: string, surname: string, DNI: number, email: Email, password: string, vehicle: Vehicle, rating: Rating) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.DNI = DNI;
        this.email = email;
        this.password = password;
        this.vehicle = vehicle;
        this.rating = rating;
    }

    getId(): string{
        return this.id;
    }

    getPassword(): string{
        return this.password;
    }

    getVehicleType(): string {
        return this.vehicle.getType();
    }
}

export default Rider;