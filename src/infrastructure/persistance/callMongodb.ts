import ICallRepository from "../../aplication/repositories/call.repository";
import Call from "../../domain/entities/call";

class CallMongodb implements ICallRepository{
    generateId(): Promise<string> {
        return Promise.resolve("holaaaaaaaaaaa");
    }

    save(call: Call): void {
        console.log(call)
    }
}
export default CallMongodb;