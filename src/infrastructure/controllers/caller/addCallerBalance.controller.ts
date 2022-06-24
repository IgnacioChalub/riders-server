import AddCallerBalanceAplicationService from "../../../aplication/aplicationServices/caller/addCallerBalance.aplicationService";
import CallerDAO from "../../persistance/callerDAO";

class AddCallerBalanceController{

    private static addCallerBalanceController: AddCallerBalanceController;

    private addCallerBalanceAplicationService: AddCallerBalanceAplicationService; 

    constructor(addCallerBalanceAplicationService: AddCallerBalanceAplicationService){
        this.addCallerBalanceAplicationService = addCallerBalanceAplicationService;
    }

    static create(): AddCallerBalanceController{
        return new AddCallerBalanceController(new AddCallerBalanceAplicationService(CallerDAO.getInstance()));
    }

    static getInstance(): AddCallerBalanceController {
        if(!this.addCallerBalanceController) this.addCallerBalanceController = AddCallerBalanceController.create();
        return this.addCallerBalanceController;
    }

    async run(paymentId: string, callerId: string, balance: number): Promise<number> {
        return await this.addCallerBalanceAplicationService.run(paymentId, callerId, balance);
    } 

}

export default AddCallerBalanceController;