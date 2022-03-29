import GetRiderAplicationService from "../../../aplication/aplicationServices/rider/getRider.aplicationService";
import IRiderRepository from "../../../aplication/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import Rider from "../../../domain/entities/rider";

class GetRiderController{

    private static getRiderController: GetRiderController;

    private getRiderAplicationService: GetRiderAplicationService;

    private constructor(getRiderAplicationService: GetRiderAplicationService) {
        this.getRiderAplicationService = getRiderAplicationService;
    }

    static create(): GetRiderController{
        const riderRepository:  IRiderRepository = new RiderDAO();
        const getRiderAplicationService: GetRiderAplicationService = new GetRiderAplicationService(riderRepository);
        return new GetRiderController(getRiderAplicationService);
    }

    static getController(): GetRiderController{
        if(!this.getRiderController){
            this.getRiderController = GetRiderController.create();
        }
        return this.getRiderController;
    }

    async run(id: string): Promise<Rider>{
        return await this.getRiderAplicationService.run(id);
    }
}

export default GetRiderController;