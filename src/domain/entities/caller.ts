import {Column, Entity, PrimaryColumn} from "typeorm";
import {Email} from "./email";
import {Rating} from "./rating";

@Entity()
class Caller{

    @PrimaryColumn()
    private readonly id: string;

    @Column()
    private name: string;

    @Column()
    private surname: string;

    @Column()
    private readonly DNI: number;

    @Column(() => Email)
    private email: Email;

    @Column()
    private readonly password: string;

    @Column(() => Rating)
    private readonly rating: Rating;

    constructor(id: string, name: string, surname: string, DNI: number, email: Email, password: string, rating: Rating) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.DNI = DNI;
        this.email = email;
        this.password = password;
        this.rating = rating;
    }

    getId(): string{
        return this.id;
    }

    getPassword(): string{
        return this.password;
    }

    getRatingStart(): number{
        return this.rating.getStars();
    }

    isDNI(DNI: number): boolean{
        return this.DNI === DNI;
    }

    addRating(stars: number): void{
        this.rating.addRating(stars);
    }

    getEmail(): string{
        return this.email.getAddress();
    }

}

export {Caller};