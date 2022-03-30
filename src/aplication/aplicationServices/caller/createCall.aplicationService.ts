import ICallRepository from "../../repositories/call.repository";
import Call from "../../../domain/entities/call";
import ICallerRepository from "../../repositories/caller.repository";
import {Caller} from "../../../domain/entities/caller";
import {Location} from "../../../domain/entities/location";
import CreateCallDomainService from "../../../domain/services/caller/createCall.domainService";

class CreateCallAplicationService{

    private callRepository: ICallRepository;
    private callerRepository: ICallerRepository;
    private createCallDomainService: CreateCallDomainService;

    constructor(callRepository: ICallRepository, callerRepository: ICallerRepository, createCallDomainService: CreateCallDomainService) {
        this.callRepository = callRepository;
        this.callerRepository = callerRepository;
        this.createCallDomainService = createCallDomainService;
    }

    async run(callerId: string, vehicleTypes: string[], priceInCents: number, description: string, startAddress: string, finishAddress: string, startLat: number, startLong: number, finishLat: number, finishLong: number): Promise<Call>{
        const caller: Caller = await this.callerRepository.getById(callerId);
        const startLocation: Location = Location.create(startAddress, startLat, startLong);
        const finishLocation: Location = Location.create(finishAddress, finishLat, finishLong);
        const id: string = await this.callRepository.generateId();
        const call: Call = this.createCallDomainService.run(id, caller, vehicleTypes, priceInCents, description, startLocation, finishLocation);
        this.callRepository.save(call);
        return call;
    }

}

export default CreateCallAplicationService;