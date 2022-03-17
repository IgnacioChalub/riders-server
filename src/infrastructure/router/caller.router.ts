import express, {NextFunction, Request, Response} from "express";
import {buildSchema} from "graphql";
import registerCaller from "./registerCaller.route";


const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerCaller,
};

const schema = buildSchema(`
  input RegisterCallerInput {
    name: String!
    surname: String!
    DNI: String!
    email: String!
    password: String!
  }

  type Caller {
    id: String!
    name: String!
    surname: String!
    DNI: String!
    email: String!
  }

   type Query {
    getCaller(name: String!): String
   }
  
  type Mutation {
    registerCaller(input: RegisterCallerInput): Caller
  }
`);

router.use('/caller', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));

export {router as callerRouter};