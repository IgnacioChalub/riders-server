import IRiderRepository from "../../aplication/repositories/rider.repository";
import {getRepository} from "typeorm";
import Rider from "../../domain/entities/rider";
import IdGeneratorImplementation from "../services/idGeneratorImplementation";

class RiderDAO implements IRiderRepository{

    private repository = getRepository(Rider, "db");
    private tableName = "rider";

    save(rider: Rider): void {
        this.repository.save(rider).then(r => r);
    }

    async getByDNIorEmail(DNI: number, emailAddress: string): Promise<Rider> {
        return <Rider>await this.repository.createQueryBuilder(this.tableName)
            .where("rider.DNI = :DNI", {DNI: DNI})
            .orWhere("rider.emailAddress = :emailAddress", {emailAddress: emailAddress})
            .getOne();
    }

    async getByEmail(emailAddress: string): Promise<Rider> {
        return <Rider>await this.repository.createQueryBuilder(this.tableName)
            .where("rider.emailAddress = :emailAddress", {emailAddress: emailAddress})
            .getOne();
    }

    async getById(id: string): Promise<Rider> {
        return <Rider>await this.repository.findOne({
            where: {
                // @ts-ignore
                id: id
            },
        })
    }

    async generateId(): Promise<string> {
        const idGenerator: IdGeneratorImplementation = new IdGeneratorImplementation();
        let rider;
        let id;
        do {
            id = idGenerator.generateId();
            rider = await this.getById(id);
        } while (rider)
        return id;
    }
}

export default RiderDAO;