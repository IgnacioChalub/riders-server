import GetActiveCallsAplicationService
    from "../../../aplication/aplicationServices/caller/getActiveCalls.aplicationService";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import Call from "../../../domain/entities/call";

class GetActiveCallsController{

    private static getActiveCallsController: GetActiveCallsController;

    private getActiveCallsAplicationService: GetActiveCallsAplicationService;

    constructor(getActiveCallsAplicationService: GetActiveCallsAplicationService) {
        this.getActiveCallsAplicationService = getActiveCallsAplicationService;
    }

    static create(): GetActiveCallsController{
        const callRepository: ICallRepository = CallDAO.getInstance();
        const getActiveCallsAplicationService = new GetActiveCallsAplicationService(callRepository);
        return new GetActiveCallsController(getActiveCallsAplicationService);
    }

    static getController(): GetActiveCallsController{
        if(!this.getActiveCallsController) this.getActiveCallsController = GetActiveCallsController.create();
        return this.getActiveCallsController;
    }

    async run(callerId: string): Promise<Call[]>{
        return this.getActiveCallsAplicationService.run(callerId);
    }
}

export default GetActiveCallsController;