import GetCallsAplicationService from "../../../aplication/aplicationServices/rider/getAvailableCalls.aplicationService";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import Call from "../../../domain/entities/call";
import IRiderRepository from "../../../aplication/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import GetAvailableCallsAplicationService from "../../../aplication/aplicationServices/rider/getAvailableCalls.aplicationService";

class GetAvailableCallsController {

    private static getAvailableCallsController: GetAvailableCallsController;

    private getAvailableCallsAplicationService: GetAvailableCallsAplicationService;

    private constructor(getAvailableCallsAplicationService: GetAvailableCallsAplicationService) {
        this.getAvailableCallsAplicationService = getAvailableCallsAplicationService;
    }

    static create(): GetAvailableCallsController{
        const callRepository:  ICallRepository = new CallDAO();
        const riderRepository: IRiderRepository = new RiderDAO();
        const getAvailableCallsAplicationService: GetAvailableCallsAplicationService = new GetAvailableCallsAplicationService(callRepository, riderRepository);
        return new GetAvailableCallsController(getAvailableCallsAplicationService);
    }

    static getController(): GetAvailableCallsController{
        if(!this.getAvailableCallsController){
            this.getAvailableCallsController = GetAvailableCallsController.create();
        }
        return this.getAvailableCallsController;
    }

    async run(id: string, lat: number, long: number): Promise<Call[]>{
        return await this.getAvailableCallsAplicationService.run(id, lat, long);
    }
}

export default GetAvailableCallsController;