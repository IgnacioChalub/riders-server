import express from "express";
import {buildSchema} from "graphql";
import registerCaller from "./registerCaller.route";
import logInCaller from "./logInCaller.route";
import getCaller from "./getCaller.route";
import createCall from "./createCall.route";
import getActiveCalls from "./getActiveCalls.route";
import cancelCall from "./cancelCall.route";
import rateRider from "./rateRider.route";
import getCallerRecord from "./getCallerRecord.route";
import getCallerActiveRides from "./getCallerActiveRides.route";
import setCallerEmailNotifications from "./setCallerEmailNotifications";
import addCallerBalance from "./addCallerBalance.route";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerCaller,
    logInCaller,
    getCaller,
    createCall,
    getActiveCalls,
    cancelCall,
    rateRider,
    getCallerRecord,
    getCallerActiveRides,
    setCallerEmailNotifications,
    addCallerBalance
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
    minRiderRatingStars: Float!
  }
  
  input CancelCallInput{
    callId: String!
  }
  
  input RateRiderInput{
    rideId: String!
    stars: Int!
  }

  input SetEmailNotificationsInput{
    emailNotifications: Boolean!
  }

  input AddCallerBalanceInput{
    paymentId: String!
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
    callerRatingStars: Float!
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

  type Ride{
    id: String!
    call: Call!
    riderArrivedStartLocation: Boolean!
    date: Date!
    active: Boolean!
    vehicleUsed: String!
    finishDate: Date!
    riderRatingStars: Float!
  }

  type Token{
    token: String!
  }

  type Balance{
    balance: Int!
  }

  type Query {
    getCaller: Caller
    getActiveCalls: [Call]!
    getCallerRecord: [Ride]!
    getCallerActiveRides: [Ride]!
  }
  
  scalar Void
  
  type Mutation {
    registerCaller(input: RegisterCallerInput): Caller
    logInCaller(input: LogInCallerInput): Token
    createCall(input: CreateCallInput): Call
    cancelCall(input: CancelCallInput): Void
    rateRider(input: RateRiderInput): Void
    setCallerEmailNotifications(input: SetEmailNotificationsInput): Void
    addCallerBalance(input: AddCallerBalanceInput): Balance
  }
`);

router.use('/caller', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));

export {router as callerRouter};
