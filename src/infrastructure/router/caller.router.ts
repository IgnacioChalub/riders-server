import express from "express";
import {graphqlHTTP} from "express-graphql";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

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
    password: String!
  }

  type Query {
    getCaller(name: String!): Caller
  }

  type Mutation {
    registerCaller(input: RegisterCallerInput): Caller
  }
`);


// @ts-ignore
const registerCaller = ({input}) => {
    const {name, surname, DNI, email, password} = input;
    const id = 17;
    return {
        id,
        name,
        surname,
        DNI,
        email,
        password
    };
}

const root = {
    registerCaller
};

router.use('/caller', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

export {router as callerRouter};