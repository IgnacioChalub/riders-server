import ICallerRepository from "../../../aplication/repositories/caller.repository";
import CallerDAO from "../../persistance/callerDAO";
import CreateCallAplicationService from "../../../aplication/aplicationServices/caller/createCall.aplicationService";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import CreateCallDomainService from "../../../domain/services/caller/createCall.domainService";
import Call from "../../../domain/entities/call";

class CreateCallController{

    private static createCallController: CreateCallController;

    private createCallAplicationService: CreateCallAplicationService;

    private constructor(createCallAplicationService: CreateCallAplicationService) {
        this.createCallAplicationService = createCallAplicationService;
    }

    static create(): CreateCallController{
        const callRepository: ICallRepository = CallDAO.getInstance();
        const callerRepository: ICallerRepository = CallerDAO.getInstance();
        const createCalDomainService: CreateCallDomainService = new CreateCallDomainService();
        const createCallAplicationService: CreateCallAplicationService = new CreateCallAplicationService(callRepository, callerRepository, createCalDomainService)
        return new CreateCallController(createCallAplicationService);
    }

    static getController(): CreateCallController{
        if(!this.createCallController) this.createCallController = CreateCallController.create();
        return this.createCallController;
    }

    async run(callerId: string, vehicleTypes: string[], priceInCents: number, description: string, bicycle: boolean, motorcycle: boolean, car: boolean, van: boolean, startAddress: string, finishAddress: string, startLat: number, startLong: number, finishLat: number, finishLong: number): Promise<Call>{
        return await this.createCallAplicationService.run(callerId, vehicleTypes, priceInCents, description, bicycle, motorcycle, car, van, startAddress, finishAddress, startLat, startLong, finishLat, finishLong);
    }
}

export default CreateCallController;