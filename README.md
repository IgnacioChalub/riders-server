# riders-server

## '/caller'

mutation {
  registerCaller(input: {
    name: "alejo",
    surname: "demi",
    DNI: 1,
    email: "1223@alejo.com",
    password: "password"
  }) {
    id
    name
    surname
    DNI
    email
  }
}

mutation {
  logInCaller(input: {
    email: "alejo@alejo.com",
    password: "password"
  }) {
      token
  }
}

### '/rider'

mutation {
  registerRider(input: {
    name: "fede",
    surname: "pochat",
    DNI: 2,
    email: "fede2@afede.com",
    password: "password",
    vehicleType: "bicycle"
  }) {
    id
    name
    surname
    DNI
    email
  }
}

mutation {
  logInRider(input: {
    email: "alejo@alejo.com",
    password: "password"
  }) {
      token
  }
}
