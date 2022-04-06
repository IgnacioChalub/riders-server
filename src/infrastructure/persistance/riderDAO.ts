import IRiderRepository from "../../aplication/repositories/rider.repository";
import Rider from "../../domain/entities/rider";
import IdGeneratorImplementation from "../services/idGeneratorImplementation";
import {AppDataSource} from "../db/database";

class RiderDAO implements IRiderRepository{

    private static instance: IRiderRepository = new RiderDAO();

    private repository = AppDataSource.getRepository(Rider);
    private tableName = "rider";

    static getInstance(): IRiderRepository{
        return this.instance;
    }

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