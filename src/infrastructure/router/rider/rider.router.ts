import express from "express";
import {buildSchema} from "graphql";
import registerRider from "./registerRider.route";
import logInRider from "./logInRider.route";
import getRider from "./getRider.route";
import {Request} from "express";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerRider,
    logInRider,
    getRider
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
  
  type Rider {
    id: String!
    name: String!
    surname: String!
    DNI: Int!
    email: Email!
    vehicle: Vehicle!
    rating: Rating!
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
  }
`);

router.use('/rider', expressGraphql({
    schema: schema,
    rootValue: root
}));

export {router as riderRouter};