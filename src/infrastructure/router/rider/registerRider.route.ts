import RegisterRiderControllerProvider from "../../controllersProviders/rider/registerRIder.controllerProvider";
import Rider from "../../../domain/entities/rider";

const registerRider = async ({input}: any): Promise<Rider> => {
    const {name, surname, DNI, email, password, vehicleType} = input;
    return await RegisterRiderControllerProvider.getController().registerRider(name, surname, DNI, email, password, vehicleType);
}

export default registerRider;