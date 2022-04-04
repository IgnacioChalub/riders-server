import IPasswordHasher from "../../infrastructureServices/passwordHasher";
import {Caller} from "../../entities/caller";
import {Email} from "../../entities/email";
import {Rating} from "../../entities/rating";

class CreateCallerDomainService {

    private passwordHasher: IPasswordHasher;

    constructor(passwordHasher: IPasswordHasher) {
        this.passwordHasher = passwordHasher;
    }

    async run(id: string, name: string, surname: string, DNI: number, email: string, password: string): Promise<Caller> {
        if (password.length < 7) throw Error("Password should contain more than 7 characters");
        if (DNI < 0) throw Error("DNI not valid");
        const hashedPassword = this.passwordHasher.hash(password);
        return new Caller(id, name, surname, DNI, Email.create(email), hashedPassword, Rating.create());
    }
}

export default CreateCallerDomainService;