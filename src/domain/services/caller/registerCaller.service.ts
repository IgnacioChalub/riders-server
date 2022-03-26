import ICallerRepository from "../../repositories/caller.repository";
import IPasswordHasher from "../../infrastructureServices/passwordHasher";
import {Caller} from "../../entities/caller";
import {Email} from "../../entities/email";
import {Rating} from "../../entities/rating";

class RegisterCallerService{

    private callerRepository: ICallerRepository;
    private passwordHasher: IPasswordHasher;

    constructor(callerRepository: ICallerRepository, passwordHasher: IPasswordHasher) {
        this.callerRepository = callerRepository;
        this.passwordHasher = passwordHasher;
    }

    async registerCaller(name: string, surname: string, DNI: number, email: string, password: string): Promise<Caller> {
        if (password.length < 7) throw Error("Password should contain more than 7 characters");
        if (DNI < 0) throw Error("DNI not valid");

        const caller: Caller = await this.callerRepository.getByDNIorEmail(DNI, email);
        if (caller) throw Error("DNI or email not available");

        const hashedPassword = this.passwordHasher.hash(password);
        const id: string = await this.callerRepository.generateId();
        const newCaller: Caller = new Caller(id, name, surname, DNI, Email.create(email), hashedPassword, Rating.create());
        this.callerRepository.save(newCaller);
        return newCaller;
    }
}

export default RegisterCallerService;