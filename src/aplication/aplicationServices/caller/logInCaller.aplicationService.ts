import ILogger from "../../infrastructureServices/logger";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import ICallerRepository from "../../repositories/caller.repository";
import {Caller} from "../../../domain/entities/caller";

class LogInCallerAplicationService{
    private logger: ILogger;
    private passwordHasher: IPasswordHasher;
    private callerRepository: ICallerRepository;

    constructor(logger: ILogger, passwordHasher: IPasswordHasher, callerRepository: ICallerRepository) {
        this.logger = logger;
        this.passwordHasher = passwordHasher;
        this.callerRepository = callerRepository;
    }

    async logIn(email: string, password: string): Promise<string> {
        const caller: Caller = await this.callerRepository.getByEmail(email);
        if(!caller) throw Error('Incorrect email or password');
        if(!await this.passwordHasher.compare(password, caller.getPassword())) throw Error('Incorrect email or password');
        return this.logger.login(caller.getId(), 'caller');
    }
}

export default LogInCallerAplicationService;