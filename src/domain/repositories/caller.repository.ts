import {Caller} from "../entities/caller";

interface ICallerRepository{
    save(caller: Caller): void;
    getByDNIorEmail(DNI: number, email: string): Promise<Caller>;
    getByEmail(email: string): Promise<Caller>;
    getById(id: string): Promise<Caller>;
}

export default ICallerRepository;