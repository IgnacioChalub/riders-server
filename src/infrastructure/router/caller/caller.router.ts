import express from "express";
import {buildSchema} from "graphql";
import registerCaller from "./registerCaller.route";
import logInCaller from "./logInCaller.route";
import getCaller from "./getCaller.route";
import createCall from "./createCall.route";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerCaller,
    logInCaller,
    getCaller,
    createCall
};

const schema = buildSchema(`
  input RegisterCallerInput {
    name: String!
    surname: String!
    DNI: Int!
    email: String!
    password: String!
  }
  
  input LogInCallerInput {
    email: String!
    password: String!
  }
  
  input CreateCallInput {
    vehicleTypes: [String!]!
    priceInCents: Int!
    description: String!
    startAddress: String!
    finishAddress: String!
    startLat: Int!
    startLong: Int!
    finishLat: Int!
    finishLong: Int!
  }

  type Caller {
    id: String!
    name: String!
    surname: String!
    DNI: Int!
    email: Email!
    rating: Rating!
  }

  type Email{
    address: String!
  }
  
  type Rating{
    stars: Int!
  }

  type Call {
    id: String
    callerRatingStars: Int!
    vehicleTypes: [String!]!
    priceInCents: Int!
    description: String!
    startLocation: Location!
    finishLocation:Location!
  }
  
  type Location {
    address: String!
    lat: Int!
    long: Int!
  }

  type Token{
    token: String!
  }

  type Query {
    getCaller: Caller
  }
  
  type Mutation {
    registerCaller(input: RegisterCallerInput): Caller
    logInCaller(input: LogInCallerInput): Token
    createCall(input: CreateCallInput): Call
  }
`);

router.use('/caller', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));

export {router as callerRouter};