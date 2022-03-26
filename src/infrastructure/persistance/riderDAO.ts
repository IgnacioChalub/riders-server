import IRiderRepository from "../../domain/repositories/rider.repository";
import {getRepository} from "typeorm";
import Rider from "../../domain/entities/rider";
import {Email} from "../../domain/entities/email";

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
}

export default RiderDAO;