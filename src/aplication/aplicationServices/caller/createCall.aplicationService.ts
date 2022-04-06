import ICallRepository from "../../repositories/call.repository";
import Call from "../../../domain/entities/call";
import ICallerRepository from "../../repositories/caller.repository";
import {Caller} from "../../../domain/entities/caller";
import {Location} from "../../../domain/entities/location";
import CreateCallDomainService from "../../../domain/services/caller/createCall.domainService";
import RequestedVehicles from "../../../domain/entities/requestedVehicles";

class CreateCallAplicationService{

    private callRepository: ICallRepository;
    private callerRepository: ICallerRepository;
    private createCallDomainService: CreateCallDomainService;

    constructor(callRepository: ICallRepository, callerRepository: ICallerRepository, createCallDomainService: CreateCallDomainService) {
        this.callRepository = callRepository;
        this.callerRepository = callerRepository;
        this.createCallDomainService = createCallDomainService;
    }

    async run(callerId: string, vehicleTypes: string[], priceInCents: number, description: string, bicycle: boolean, motorcycle: boolean, car: boolean, van: boolean, startAddress: string, finishAddress: string, startLat: number, startLong: number, finishLat: number, finishLong: number): Promise<Call>{
        const caller: Caller = await this.callerRepository.getById(callerId);
        const startLocation: Location = Location.create(await this.callRepository.generateLocationId(), startAddress, startLat, startLong);
        const finishLocation: Location = Location.create(await this.callRepository.generateLocationId(), finishAddress, finishLat, finishLong);
        const id: string = await this.callRepository.generateId();
        const requestedVehicles: RequestedVehicles = RequestedVehicles.create(bicycle, motorcycle, car, van);
        const call: Call = this.createCallDomainService.run(id, caller, requestedVehicles, priceInCents, description, startLocation, finishLocation, new Date());
        this.callRepository.save(call);
        return call;
    }

}

export default CreateCallAplicationService;