import Caller from "../entities/caller";

interface ICallerRepository{
    create(caller: Caller): void;
    getByDNIorEmail(DNI: number, email: string): Caller;
}

export default ICallerRepository;