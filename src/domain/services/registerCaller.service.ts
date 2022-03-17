import Caller from "../entities/caller";
import ICallerRepository from "../repositories/caller.repository";
import IPasswordHasher from "../infrastructureServices/passwordHasher";
import IIdGenerator from "../infrastructureServices/idGenerator";

class RegisterCallerService{

    private callerRepository: ICallerRepository;
    private passwordHasher: IPasswordHasher;
    private idGenerator: IIdGenerator;
    private fede: string = "FEDE";

    constructor(callerRepository: ICallerRepository, passwordHasher: IPasswordHasher, idGenerator: IIdGenerator) {
        this.callerRepository = callerRepository;
        this.passwordHasher = passwordHasher;
        this.idGenerator = idGenerator;
    }

    registerCaller(name: string, surname: string, DNI: number, email: string, password: string): Caller{
        if(password.length < 7) throw Error("Password should contain more than 7 characters");
        if(DNI < 0) throw Error("DNI not valid");
        const caller: Caller = this.callerRepository.getByDNIorEmail(DNI, email);
        if(caller) throw Error("DNI or email not available");
        const hashedPassword = this.passwordHasher.hash(password);
        const id: string = this.idGenerator.generateId();
        const newCaller: Caller = new Caller(id, name, surname, DNI, email, hashedPassword);
        this.callerRepository.create(newCaller);
        return newCaller;
    }

}

export default RegisterCallerService;