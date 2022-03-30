import Call from "../../domain/entities/call";

interface ICallRepository{
    generateId(): Promise<string>;
    save(call: Call): void;
}

export default ICallRepository;