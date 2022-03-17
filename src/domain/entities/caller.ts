class Caller{

    private id: string;
    private name: string;
    private surname: string;
    private DNI: number;
    private email: string;
    private password: string;


    constructor(id: string, name: string, surname: string, DNI: number, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.DNI = DNI;
        this.email = email;
        this.password = password;
    }
}

export default Caller;