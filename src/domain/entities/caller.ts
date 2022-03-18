import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
class Caller{
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

    constructor(id: string, name: string, surname: string, DNI: number, email: string, password: string) {
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