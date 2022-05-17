import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";
import GetRiderRecordAplicationService
    from "../../../aplication/aplicationServices/rider/getRiderRecord.aplicationService";

class GetRiderRecordController{
    private static getRiderRecordController: GetRiderRecordController;

    private getRiderRecordAplicationService: GetRiderRecordAplicationService;

    constructor(getRiderRecordAplicationService: GetRiderRecordAplicationService) {
        this.getRiderRecordAplicationService = getRiderRecordAplicationService;
    }

    static create(): GetRiderRecordController{
        const getRiderRecordAplicationService: GetRiderRecordAplicationService = new GetRiderRecordAplicationService(RideDAO.getInstance());
        return new GetRiderRecordController(getRiderRecordAplicationService);
    }

    static getController(): GetRiderRecordController{
        if(!this.getRiderRecordController) this.getRiderRecordController = GetRiderRecordController.create();
        return this.getRiderRecordController;
    }

    async run(riderId: string): Promise<Ride[]>{
        return await this.getRiderRecordAplicationService.run(riderId);
    }
}

export default GetRiderRecordController;