import GetCallsAplicationService from "../../../aplication/aplicationServices/rider/getCalls.aplicationService";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import Call from "../../../domain/entities/call";
import IRiderRepository from "../../../aplication/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";

class GetCallsController{

    private static getCallsController: GetCallsController;

    private getCallsAplicationService: GetCallsAplicationService;

    private constructor(getCallsAplicationService: GetCallsAplicationService) {
        this.getCallsAplicationService = getCallsAplicationService;
    }

    static create(): GetCallsController{
        const callRepository:  ICallRepository = new CallDAO();
        const riderRepository: IRiderRepository = new RiderDAO();
        const getCallsAplicationService: GetCallsAplicationService = new GetCallsAplicationService(callRepository, riderRepository);
        return new GetCallsController(getCallsAplicationService);
    }

    static getController(): GetCallsController{
        if(!this.getCallsController){
            this.getCallsController = GetCallsController.create();
        }
        return this.getCallsController;
    }

    async run(id: string, lat: number, long: number): Promise<Call[]>{
        return await this.getCallsAplicationService.run(id, lat, long);
    }
}

export default GetCallsController;