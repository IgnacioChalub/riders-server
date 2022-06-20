import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImplementation";
import IRiderRepository from "../../../aplication/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import LogInRiderAplicationService from "../../../aplication/aplicationServices/rider/logInRider.aplicationService";
import ILogger from "../../../aplication/infrastructureServices/logger";
import JWTLogger from "../../services/logger";
import EmailService from "../../services/emailServiceImplementation";

class LogInRiderController{

    private static logInRiderController: LogInRiderController;

    private logInRiderAplicationService: LogInRiderAplicationService;

    private constructor(logInRiderAplicationService: LogInRiderAplicationService) {
        this.logInRiderAplicationService = logInRiderAplicationService;
    }

    static create(): LogInRiderController{
        const riderRepository: IRiderRepository = RiderDAO.getInstance();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();
        const logger: ILogger = new JWTLogger();
        const logInRiderAplicationService: LogInRiderAplicationService = new LogInRiderAplicationService(logger, passwordHasher, riderRepository, EmailService.getInstance());
        return new LogInRiderController(logInRiderAplicationService);
    }

    static getController(): LogInRiderController{
        if(!this.logInRiderController) this.logInRiderController = LogInRiderController.create();
        return this.logInRiderController;
    }

    async run(email: string, password: string): Promise<string>{
        return await this.logInRiderAplicationService.run(email, password);
    }

}

export default LogInRiderController;