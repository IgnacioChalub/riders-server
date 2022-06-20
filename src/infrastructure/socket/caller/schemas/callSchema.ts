import * as yup from "yup";

const messageSchema = yup.object().shape({
    rideId: yup.string().required(),
    text: yup.string().required(),
});

export default messageSchema;