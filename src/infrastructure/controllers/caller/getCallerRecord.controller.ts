import GetCallerRecordAplicationService
    from "../../../aplication/aplicationServices/caller/getCallerRecord.aplicationService";
import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";

class GetCallerRecordController{

    private static getCallerRecordController: GetCallerRecordController;

    private getCallerRecordAplicationService: GetCallerRecordAplicationService;

    constructor(getCallerRecordAplicationService: GetCallerRecordAplicationService) {
        this.getCallerRecordAplicationService = getCallerRecordAplicationService;
    }

    static create(): GetCallerRecordController{
        const getCallerRecordAplicationService: GetCallerRecordAplicationService = new GetCallerRecordAplicationService(RideDAO.getInstance());
        return new GetCallerRecordController(getCallerRecordAplicationService);
    }

    static getController(): GetCallerRecordController{
        if(!this.getCallerRecordController) this.getCallerRecordController = GetCallerRecordController.create();
        return this.getCallerRecordController;
    }

    async run(callerId: string): Promise<Ride[]>{
        return await this.getCallerRecordAplicationService.run(callerId);
    }

}

export default GetCallerRecordController;