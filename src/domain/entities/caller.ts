import {Column, Entity, PrimaryColumn} from "typeorm";
import {Email} from "./email";

@Entity()
class Caller{

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

    constructor(id: string, name: string, surname: string, DNI: number, email: Email, password: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.DNI = DNI;
        this.email = email;
        this.password = password;
    }

    getId(): string{
        return this.id;
    }

    getPassword(): string{
        return this.password;
    }
}

export {Caller};