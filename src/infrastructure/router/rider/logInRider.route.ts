import LogInRiderControllerProvider from "../../controllersProviders/rider/logInRider.controllerProvider";

const logInRider = async ({input}: any): Promise<any> => {
    const {email, password} = input;
    const token: string = await LogInRiderControllerProvider.getController().logIn(email, password);
    return {
        token: token
    }
}

export default logInRider;