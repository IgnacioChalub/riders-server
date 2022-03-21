import express from "express";
import {buildSchema} from "graphql";
import registerRider from "./registerRider.route";

const router = express.Router();

//graphql
const expressGraphql = require('express-graphql').graphqlHTTP;

const root = {
    registerRider
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
  
  type Rider {
    id: String!
    name: String!
    surname: String!
    DNI: Int!
    email: String!
    vehicleType: String!
  }

  type Token{
    token: String!
  }

  type Query {
    getCaller(name: String!): String
  }
  
  type Mutation {
    registerRider(input: RegisterRiderInput): Rider
  }
`);

router.use('/rider', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));

export {router as riderRouter};