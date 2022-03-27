import ILogger from "../../../domain/infrastructureServices/logger";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import IRiderRepository from "../../../domain/repositories/rider.repository";
import Rider from "../../../domain/entities/rider";

class LogInRiderAplicationService{

    private logger: ILogger;
    private passwordHasher: IPasswordHasher;
    private riderRepository: IRiderRepository;

    constructor(logger: ILogger, passwordHasher: IPasswordHasher, riderRepository: IRiderRepository) {
        this.logger = logger;
        this.passwordHasher = passwordHasher;
        this.riderRepository = riderRepository;
    }

    async logIn(email: string, password: string): Promise<string> {
        const rider: Rider = await this.riderRepository.getByEmail(email);
        if(!rider) throw Error('Incorrect email or password');
        if(!await this.passwordHasher.compare(password, rider.getPassword())) throw Error('Incorrect email or password');
        return this.logger.login(rider.getId(), 'rider');
    }
}

export default LogInRiderAplicationService;