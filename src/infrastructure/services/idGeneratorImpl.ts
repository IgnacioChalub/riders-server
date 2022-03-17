import IIdGenerator from "../../domain/infrastructureServices/idGenerator";

class IdGeneratorImplementation implements IIdGenerator{
    generateId(): string {
        return require('crypto').randomBytes(10).toString('hex');
    }
}