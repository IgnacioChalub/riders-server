
import ICallerRepository from "../repositories/caller.repository";
import IPasswordHasher from "../infrastructureServices/passwordHasher";
import IIdGenerator from "../infrastructureServices/idGenerator";
import {Caller} from "../entities/caller";

class RegisterCallerService{

    private callerRepository: ICallerRepository;
    private passwordHasher: IPasswordHasher;
    private idGenerator: IIdGenerator;

    constructor(callerRepository: ICallerRepository, passwordHasher: IPasswordHasher, idGenerator: IIdGenerator) {
        this.callerRepository = callerRepository;
        this.passwordHasher = passwordHasher;
        this.idGenerator = idGenerator;
    }

    /**
     * TODO: dont generate duplicated id
     */
    async registerCaller(name: string, surname: string, DNI: number, email: string, password: string): Promise<Caller> {
        if (password.length < 7) throw Error("Password should contain more than 7 characters");
        if (DNI < 0) throw Error("DNI not valid");
        const caller: Caller = await this.callerRepository.getByDNIorEmail(DNI, email);
        if (caller) throw Error("DNI or email not available");
        const hashedPassword = this.passwordHasher.hash(password);
        const id: string = this.idGenerator.generateId();
        const newCaller: Caller = new Caller(id, name, surname, DNI, email, hashedPassword);
        this.callerRepository.save(newCaller);
        return newCaller;
    }

}

export default RegisterCallerService;