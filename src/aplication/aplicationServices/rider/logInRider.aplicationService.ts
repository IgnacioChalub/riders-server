import ILogger from "../../infrastructureServices/logger";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import IRiderRepository from "../../repositories/rider.repository";
import Rider from "../../../domain/entities/rider";
import IEmailService from "../../infrastructureServices/emailService";

class LogInRiderAplicationService{

    private logger: ILogger;
    private passwordHasher: IPasswordHasher;
    private riderRepository: IRiderRepository;
    private emailService: IEmailService;

    constructor(logger: ILogger, passwordHasher: IPasswordHasher, riderRepository: IRiderRepository, emailService: IEmailService) {
        this.logger = logger;
        this.passwordHasher = passwordHasher;
        this.riderRepository = riderRepository;
        this.emailService = emailService;
    }

    async run(email: string, password: string): Promise<string> {
        const rider: Rider = await this.riderRepository.getByEmail(email);
        if(!rider) throw Error('Incorrect email or password');
        if(!await this.passwordHasher.compare(password, rider.getPassword())) throw Error('Incorrect email or password');
        const token = this.logger.login(rider.getId(), 'rider');
        this.emailService.sendEmail(rider.getEmail(), 'Login attempted.', 'Login attempted with your account. If it was not you, please contact the support team')
        return token;
    }
}

export default LogInRiderAplicationService;