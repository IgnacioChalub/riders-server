import Call from "../../domain/entities/call";

interface ICallRepository{
    generateId(): Promise<string>;
    generateLocationId(): Promise<string>;
    save(call: Call): void;
    setInactive(call: Call): void;
    getActiveCall(id: string): Promise<Call>;
    getAllActiveCalls(callerId: string): Promise<Call[]>;
    getCallsInSquare(lat: number, long: number, km: number, vehicleType: string): Promise<Call[]>;
}

export default ICallRepository;