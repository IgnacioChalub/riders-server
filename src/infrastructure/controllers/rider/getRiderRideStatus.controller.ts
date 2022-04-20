import GetRiderRideStatusAplicationService
    from "../../../aplication/aplicationServices/rider/getRiderRideStatus.aplicationService";
import RideDAO from "../../persistance/rideDAO";
import IRideRepository from "../../../aplication/repositories/ride.repository";

class GetRiderRideStatusController{

    private static getRiderRideStatusController: GetRiderRideStatusController;

    private getRiderRideStatusAplicationService: GetRiderRideStatusAplicationService;


    constructor(getRiderRideStatusAplicationService: GetRiderRideStatusAplicationService) {
        this.getRiderRideStatusAplicationService = getRiderRideStatusAplicationService;
    }

    static create(): GetRiderRideStatusController{
        const rideRepository: IRideRepository = RideDAO.getInstance();
        const getRiderRideStatusAplicationService: GetRiderRideStatusAplicationService = new GetRiderRideStatusAplicationService(rideRepository);
        return new GetRiderRideStatusController(getRiderRideStatusAplicationService);
    }

    static getController(): GetRiderRideStatusController{
        if(!this.getRiderRideStatusController) this.getRiderRideStatusController = GetRiderRideStatusController.create();
        return this.getRiderRideStatusController;
    }

    async run(riderId: string): Promise<boolean> {
        return await this.getRiderRideStatusAplicationService.run(riderId);
    }

}

export default GetRiderRideStatusController;