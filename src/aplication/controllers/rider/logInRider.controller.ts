import LogInRiderService from "../../../domain/services/rider/logInRider.service";

class LogInRiderController{

    private logInRiderService: LogInRiderService;

    constructor(logInRiderService: LogInRiderService) {
        this.logInRiderService = logInRiderService;
    }

    async logIn(email: string, password: string): Promise<string>{
        return await this.logInRiderService.logIn(email, password);
    }
}

export default LogInRiderController;