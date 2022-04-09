import * as yup from "yup";

const callSchema = yup.object().shape({
    priceInCents: yup.number().required(),
    description: yup.string().required(),
    bicycle: yup.boolean().required(),
    motorcycle: yup.boolean().required(),
    car: yup.boolean().required(),
    van: yup.boolean().required(),
    startAddress: yup.string().required(),
    finishAddress: yup.string().required(),
    startLat: yup.number().required(),
    startLong: yup.number().required(),
    finishLat: yup.number().required(),
    finishLong: yup.number().required()
});

export default callSchema;