import ICallRepository from "../../aplication/repositories/call.repository";
import Call from "../../domain/entities/call";
import IdGeneratorImplementation from "../services/idGeneratorImplementation";
import {AppDataSource} from "../db/database";

class CallDAO implements ICallRepository{

    private repository = AppDataSource.getRepository(Call);
    private tableName = "call";

    save(call: Call): void {
        this.repository.save(call).then()
    }

    async getById(id: string): Promise<Call> {
        return <Call>await this.repository.findOne({
                where: {
                    // @ts-ignore
                    id: id,
                },
            })
    }

    async generateId(): Promise<string> {
        const idGenerator: IdGeneratorImplementation = new IdGeneratorImplementation();
        let call;
        let id;
        do {
            id = idGenerator.generateId();
            call = await this.getById(id);
        } while (call)
        return id;
    }
}
export default CallDAO;