import express from "express";
import {buildSchema} from "graphql";
import registerCaller from "./registerCaller.route";
import logInCaller from "./logInCaller.route";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerCaller,
    logInCaller
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


  type Token{
    token: String!
  }

  type Query {
    getCaller(name: String!): String
  }
  
  type Mutation {
    registerCaller(input: RegisterCallerInput): Caller
    logInCaller(input: LogInCallerInput): Token
  }
`);

router.use('/caller', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));

export {router as callerRouter};