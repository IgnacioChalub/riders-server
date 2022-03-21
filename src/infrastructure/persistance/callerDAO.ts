import ICallerRepository from "../../domain/repositories/caller.repository";
import {Caller} from "../../domain/entities/caller";
import {getRepository} from "typeorm";


class CallerDAO implements ICallerRepository{

    private repository = getRepository(Caller, "db");
    private tableName = "caller";

    save(caller: Caller): void {
        this.repository.save(caller).then(r => r);
    }

    async getByDNIorEmail(DNI: number, email: string): Promise<Caller> {
        return <Caller>await this.repository.createQueryBuilder(this.tableName)
            .where("caller.DNI = :DNI", {DNI: DNI})
            .orWhere("caller.email = :email", {email: email})
            .getOne();
    }

    async getByEmail(email: string): Promise<Caller> {
        return <Caller>await this.repository.findOne({
            where: {
                // @ts-ignore
                email: email
            },
        })
    }

    async getById(id: string): Promise<Caller> {
        return <Caller>await this.repository.findOne({
            where: {
                // @ts-ignore
                id: id
            },
        })
    }
}

export default CallerDAO;