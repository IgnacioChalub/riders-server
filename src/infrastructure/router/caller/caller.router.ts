import express from "express";
import {buildSchema} from "graphql";
import registerCaller from "./registerCaller.route";
import logInCaller from "./logInCaller.route";
import getCaller from "./getCaller.route";
import createCall from "./createCall.route";
import getActiveCalls from "./getActiveCalls.route";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerCaller,
    logInCaller,
    getCaller,
    createCall,
    getActiveCalls
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
    priceInCents: Int!
    description: String!
    bicycle: Boolean!
    motorcycle: Boolean!
    car: Boolean!
    van: Boolean!
    startAddress: String!
    finishAddress: String!
    startLat: Float!
    startLong: Float!
    finishLat: Float!
    finishLong: Float!
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

  scalar Date

  type Call {
    id: String
    callerRatingStars: Int!
    requestedVehicles: RequestedVehicles!
    priceInCents: Int!
    description: String!
    startLocation: Location!
    finishLocation:Location!
    date: Date!
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

  type Token{
    token: String!
  }

  type Query {
    getCaller: Caller
    getActiveCalls: [Call]!
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