import express, {NextFunction, Request, Response} from "express";
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
  }

   type Query {
    getCaller(name: String!): String
   }
  
  type Mutation {
    registerCaller(input: RegisterCallerInput): Caller
  }
`);

const registerCaller = ({input}: any) => {
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

const getCaller = () => {
    return "hey";
}

const loginMiddleware = (req: Request, res: Response, next: NextFunction) =>  {
    const token = req.header('auth-token');
    if(!token) return res.status(400).json('Invalid token').send();
    next();
}

const root = {
    registerCaller,
    getCaller
};

router.use('/caller', loginMiddleware, expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));

export {router as callerRouter};