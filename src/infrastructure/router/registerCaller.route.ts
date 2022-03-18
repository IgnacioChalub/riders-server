import RegisterCallerControllerProvider from "../controllersProviders/caller/registerCaller.controllerProvider";
import {Caller} from "../../domain/entities/caller";

const registerCaller = async ({input}: any): Promise<Caller> => {
    const {name, surname, DNI, email, password} = input;
    return await RegisterCallerControllerProvider.getController().registerCaller(name, surname, DNI, email, password);
}

export default registerCaller;