import Call from "../../domain/entities/call";

interface ICallRepository{
    generateId(): Promise<string>;
    generateLocationId(): Promise<string>;
    save(call: Call): void;
    getById(id: string): Promise<Call>;
    getCallsInSquare(lat: number, long: number, km: number): Promise<Call[]>;
}

export default ICallRepository;