import {Caller} from "../../domain/entities/caller";

interface ICallerRepository{
    generateId(): Promise<string>;
    save(caller: Caller): void;
    getByDNIorEmail(DNI: number, emailAddress: string): Promise<Caller>;
    getByEmail(email: string): Promise<Caller>;
    getById(id: string): Promise<Caller>;
    saveRating(caller: Caller): Promise<void>;
    setEmailNotifications(caller: Caller): Promise<void>;
    saveNewBalance(caller: Caller): Promise<void>;
}

export default ICallerRepository;