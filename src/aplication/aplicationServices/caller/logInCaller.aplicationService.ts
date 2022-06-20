import ILogger from "../../infrastructureServices/logger";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import ICallerRepository from "../../repositories/caller.repository";
import {Caller} from "../../../domain/entities/caller";
import IEmailService from "../../infrastructureServices/emailService";

class LogInCallerAplicationService{
    private logger: ILogger;
    private passwordHasher: IPasswordHasher;
    private callerRepository: ICallerRepository;
    private emailService: IEmailService;

    constructor(logger: ILogger, passwordHasher: IPasswordHasher, callerRepository: ICallerRepository, emailService: IEmailService) {
        this.logger = logger;
        this.passwordHasher = passwordHasher;
        this.callerRepository = callerRepository;
        this.emailService = emailService;
    }

    async run(email: string, password: string): Promise<string> {
        const caller: Caller = await this.callerRepository.getByEmail(email);
        if(!caller) throw Error('Incorrect email or password');
        if(!await this.passwordHasher.compare(password, caller.getPassword())) throw Error('Incorrect email or password');
        const token = this.logger.login(caller.getId(), 'caller');
        this.emailService.sendEmail(caller.getEmail(), 'Login attempted.', 'Login attempted with your account. If it was not you, please contact the support team')
        return token;
    }
}

export default LogInCallerAplicationService;