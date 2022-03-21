import ILogger from "../../infrastructureServices/logger";
import IPasswordHasher from "../../infrastructureServices/passwordHasher";
import IRiderRepository from "../../repositories/rider.repository";
import Rider from "../../entities/rider";

class LogInRiderService{

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

export default LogInRiderService;