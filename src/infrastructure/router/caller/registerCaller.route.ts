import {Caller} from "../../../domain/entities/caller";
import RegisterCallerController from "../../controllers/caller/registerCaller.controller";

const registerCaller = async ({input}: any): Promise<Caller> => {
    const {name, surname, DNI, email, password} = input;
    return await RegisterCallerController.getController().run(name, surname, DNI, email, password);
}

export default registerCaller;