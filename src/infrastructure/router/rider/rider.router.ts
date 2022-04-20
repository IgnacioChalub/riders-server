import express from "express";
import {buildSchema} from "graphql";
import registerRider from "./registerRider.route";
import logInRider from "./logInRider.route";
import getRider from "./getRider.route";
import getAvailableCalls from "./getAvailableCalls.route";
import acceptCall from "./acceptCall.route";
import getActiveRide from "./getActiveRide.route"
import getRiderRideStatus from "./getRiderRideStatus.route";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerRider,
    logInRider,
    getRider,
    getActiveRide,
    getAvailableCalls,
    acceptCall,
    getRiderRideStatus
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
  
  input GetAvailableCallsInput {
    lat: Float!
    long: Float!
  }
  
  input AcceptCallInput {
    callId: String!
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
  
  type RiderRideStatus{
    inRide: Boolean!
  }
  
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
  
  scalar Date
  
  type Ride{
    id: String!
    call: Call!
    riderArrivedStartLocation: Boolean!
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
    getAvailableCalls(input: GetAvailableCallsInput): [Call]!
    getActiveRide: Ride
    getRiderRideStatus: RiderRideStatus!
  }
  
  type Mutation {
    registerRider(input: RegisterRiderInput): Rider
    logInRider(input: LogInRiderInput): Token
    acceptCall(input: AcceptCallInput): Ride
  }
`);

router.use('/rider', expressGraphql({
    schema: schema,
    rootValue: root
}));

export {router as riderRouter};