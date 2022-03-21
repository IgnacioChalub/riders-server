import ICallerRepository from "../../repositories/caller.repository";
import IPasswordHasher from "../../infrastructureServices/passwordHasher";
import IIdGenerator from "../../infrastructureServices/idGenerator";
import {Caller} from "../../entities/caller";

class RegisterCallerService{

    private callerRepository: ICallerRepository;
    private passwordHasher: IPasswordHasher;
    private idGenerator: IIdGenerator;

    constructor(callerRepository: ICallerRepository, passwordHasher: IPasswordHasher, idGenerator: IIdGenerator) {
        this.callerRepository = callerRepository;
        this.passwordHasher = passwordHasher;
        this.idGenerator = idGenerator;
    }

    async registerCaller(name: string, surname: string, DNI: number, email: string, password: string): Promise<Caller> {
        if (password.length < 7) throw Error("Password should contain more than 7 characters");
        if (DNI < 0) throw Error("DNI not valid");
        if(!this.validEmail(email)) throw Error("Email format not valid");

        const caller: Caller = await this.callerRepository.getByDNIorEmail(DNI, email);
        if (caller) throw Error("DNI or email not available");

        const hashedPassword = this.passwordHasher.hash(password);
        const id: string = await this.generateValidId();
        const newCaller: Caller = new Caller(id, name, surname, DNI, email, hashedPassword);
        this.callerRepository.save(newCaller);
        return newCaller;
    }

    private async generateValidId(): Promise<string> {
        let caller;
        let id;
        do {
            id = this.idGenerator.generateId();
            caller = await this.callerRepository.getById(id);
        } while (caller)
        return id;
    }

    private validEmail = (email: string): boolean => {
        if (
            /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
                email,
            )
        ) {
            return true;
        }
        if (email.trim() === '') {
            return false;
        }
        return false;
    };
}

export default RegisterCallerService;