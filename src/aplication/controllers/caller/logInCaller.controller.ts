import LogInCallerService from "../../../domain/services/caller/logInCaller.service";

class LogInCallerController{

    private logInCallerService: LogInCallerService;

    constructor(logInCallerService: LogInCallerService) {
        this.logInCallerService = logInCallerService;
    }

    async logIn(email: string, password: string): Promise<string>{
        return await this.logInCallerService.logIn(email, password);
    }

}

export default LogInCallerController;