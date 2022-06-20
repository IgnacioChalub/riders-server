import { Caller } from "../../../domain/entities/caller";
import ICallerRepository from "../../repositories/caller.repository";

class SetCallerEmailNotificationsAplicationService{

    private callerRepository: ICallerRepository;

    constructor(callerRepository: ICallerRepository){
        this.callerRepository = callerRepository;
    }

    async run(callerId: string, emailNotifications: boolean): Promise<void>{
        const caller: Caller = await this.callerRepository.getById(callerId);
        if(!caller) throw Error("Caller not found");
        caller.setEmailNotifications(emailNotifications);
        await this.callerRepository.setEmailNotifications(caller);
    }


}

export default SetCallerEmailNotificationsAplicationService;
