import {AnySchema} from "yup";

const validate = async (schema: AnySchema, resource: any): Promise<boolean> => {
    try {
        await schema.validate(resource);
        return true;
    } catch (e) {
        return false;
    }
}

export default validate;