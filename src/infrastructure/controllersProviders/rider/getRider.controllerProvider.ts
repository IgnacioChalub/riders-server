import IRiderRepository from "../../../domain/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import GetRiderService from "../../../domain/services/rider/getRider.service";
import GetRiderController from "../../../aplication/controllers/rider/getRider.controller";

class GetRiderControllerProvider{

    private static getRiderController: GetRiderController;

    static create(): GetRiderController{
        const riderRepository : IRiderRepository = new RiderDAO();
        const getRiderService: GetRiderService = new GetRiderService(riderRepository);
        return new GetRiderController(getRiderService);
    }

    static getController(): GetRiderController{
        if(!this.getRiderController){
            this.getRiderController = GetRiderControllerProvider.create();
        }
        return this.getRiderController;
    }

}

export default GetRiderControllerProvider;