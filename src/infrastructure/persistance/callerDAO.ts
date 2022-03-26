import ICallerRepository from "../../aplication/repositories/caller.repository";
import {Caller} from "../../domain/entities/caller";
import {getRepository} from "typeorm";
import IdGeneratorImplementation from "../services/idGeneratorImplementation";


class CallerDAO implements ICallerRepository{

    private repository = getRepository(Caller, "db");
    private tableName = "caller";

    save(caller: Caller): void {
        this.repository.save(caller).then(r => r);
    }

    async getByDNIorEmail(DNI: number, emailAddress: string): Promise<Caller> {
        return <Caller>await this.repository.createQueryBuilder(this.tableName)
            .where("caller.DNI = :DNI", {DNI: DNI})
            .orWhere("caller.emailAddress = :emailAddress", {emailAddress: emailAddress})
            .getOne();
    }

    async getByEmail(emailAddress: string): Promise<Caller> {
        return <Caller>await this.repository.createQueryBuilder(this.tableName)
            .where("caller.emailAddress = :emailAddress", {emailAddress: emailAddress})
            .getOne();
    }

    async getById(id: string): Promise<Caller> {
        return <Caller>await this.repository.findOne({
            where: {
                // @ts-ignore
                id: id
            },
        })
    }

    async generateId(): Promise<string> {
        const idGenerator: IdGeneratorImplementation = new IdGeneratorImplementation();
        let caller;
        let id;
        do {
            id = idGenerator.generateId();
            caller = await this.getById(id);
        } while (caller)
        return id;
    }
}

export default CallerDAO;