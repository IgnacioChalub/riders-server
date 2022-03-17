const registerCaller = ({input}: any) => {
    const {name, surname, DNI, email, password} = input;
    const id = 14;
    return {
        id,
        name,
        surname,
        DNI,
        email,
        password
    }
}

export default registerCaller;