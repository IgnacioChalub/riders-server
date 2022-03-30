import Call from "../../domain/entities/call";

interface ICallRepository{
    generateId(): Promise<string>;
    save(call: Call): void;
    getById(id: string): Promise<Call>;
}

export default ICallRepository;