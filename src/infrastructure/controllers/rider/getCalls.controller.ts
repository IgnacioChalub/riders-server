import GetCallsAplicationService from "../../../aplication/aplicationServices/rider/getCalls.aplicationService";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import Call from "../../../domain/entities/call";

class GetCallsController{

    private static getCallsController: GetCallsController;

    private getCallsAplicationService: GetCallsAplicationService;

    private constructor(getCallsAplicationService: GetCallsAplicationService) {
        this.getCallsAplicationService = getCallsAplicationService;
    }

    static create(): GetCallsController{
        const callRepository:  ICallRepository = new CallDAO();
        const getCallsAplicationService: GetCallsAplicationService = new GetCallsAplicationService(callRepository);
        return new GetCallsController(getCallsAplicationService);
    }

    static getController(): GetCallsController{
        if(!this.getCallsController){
            this.getCallsController = GetCallsController.create();
        }
        return this.getCallsController;
    }

    async run(lat: number, long: number): Promise<Call[]>{
        return await this.getCallsAplicationService.run(lat, long);
    }
}

export default GetCallsController;