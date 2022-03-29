import Rider from "../../../domain/entities/rider";
import RegisterRiderController from "../../controllers/rider/registerRider.controller";

const registerRider = async ({input}: any): Promise<Rider> => {
    const {name, surname, DNI, email, password, vehicleType} = input;
    return await RegisterRiderController.getController().run(name, surname, DNI, email, password, vehicleType);
}

export default registerRider;