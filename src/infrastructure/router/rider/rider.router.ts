import express from "express";
import {buildSchema} from "graphql";
import registerRider from "./registerRider.route";
import logInRider from "./logInRider.route";
import getRider from "./getRider.route";
import getCalls from "./getCalls.route";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerRider,
    logInRider,
    getRider,
    getCalls
};

const schema = buildSchema(`
  input RegisterRiderInput {
    name: String!
    surname: String!
    DNI: Int!
    email: String!
    password: String!
    vehicleType: String!
  }
  
  input LogInRiderInput{
    email: String!
    password: String!
  }
  
  input GetCallsInput {
    lat: Float!
    long: Float!
  }
  
  type Rider {
    id: String!
    name: String!
    surname: String!
    DNI: Int!
    email: Email!
    vehicle: Vehicle!
    rating: Rating!
  }
  
  type Call {
    id: String
    callerRatingStars: Int!
    requestedVehicles: RequestedVehicles!
    priceInCents: Int!
    description: String!
    startLocation: Location!
    finishLocation:Location!
  }
  
  type RequestedVehicles{
    bicycle: Boolean!
    motorcycle: Boolean!
    car: Boolean!
    van: Boolean!
  }
  
  type Location {
    address: String!
    lat: Float!
    long: Float!
  }
  
  type Email{
    address: String!
  }
  
  type Vehicle{
    type: String!
  }
  
  type Rating{
    stars: Int!
  }

  type Token{
    token: String!
  }

  type Query {
    getRider: Rider
  }
  
  type Mutation {
    registerRider(input: RegisterRiderInput): Rider
    logInRider(input: LogInRiderInput): Token
    getCalls(input: GetCallsInput): [Call]!
  }
`);

router.use('/rider', expressGraphql({
    schema: schema,
    rootValue: root
}));

export {router as riderRouter};