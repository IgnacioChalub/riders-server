import RegisterCallerService from "../../../domain/services/registerCaller.service";
import Caller from "../../../domain/entities/caller";

class RegisterCallerController{

    private registerCallerService: RegisterCallerService;

    constructor(registerCallerService: RegisterCallerService) {
        this.registerCallerService = registerCallerService;
    }

    public registerCaller(name: string, surname: string, DNI: number, email: string, password: string): Caller{
        return this.registerCallerService.registerCaller(name, surname, DNI, email, password);
    }

}

export default RegisterCallerController;