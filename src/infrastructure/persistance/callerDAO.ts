import ICallerRepository from "../../domain/repositories/caller.repository";
import Caller from "../../domain/entities/caller";

class CallerDAO implements ICallerRepository{
    create(caller: Caller): void {
    }
    getByDNIorEmail(DNI: number, email: string): Caller {
        // @ts-ignore
        return undefined;
    }
}