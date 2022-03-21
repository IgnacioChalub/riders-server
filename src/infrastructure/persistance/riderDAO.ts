import IRiderRepository from "../../domain/repositories/rider.repository";
import {getRepository} from "typeorm";
import {Caller} from "../../domain/entities/caller";
import Rider from "../../domain/entities/rider";

class RiderDAO implements IRiderRepository{

    private repository = getRepository(Rider, "db");
    private tableName = "rider";

    save(rider: Rider): void {
        this.repository.save(rider).then(r => r);
    }

    async getByDNIorEmail(DNI: number, email: string): Promise<Rider> {
        return <Rider>await this.repository.createQueryBuilder(this.tableName)
            .where("rider.DNI = :DNI", {DNI: DNI})
            .orWhere("rider.email = :email", {email: email})
            .getOne();
    }

    async getByEmail(email: string): Promise<Rider> {
        return <Rider>await this.repository.findOne({
            where: {
                // @ts-ignore
                email: email
            },
        })
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