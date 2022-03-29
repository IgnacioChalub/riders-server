import LogInRiderController from "../../controllers/rider/logInRider.controller";

const logInRider = async ({input}: any): Promise<any> => {
    const {email, password} = input;
    const token: string = await LogInRiderController.getController().run(email, password);
    return {
        token: token
    }
}

export default logInRider;