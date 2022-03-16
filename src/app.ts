import express, {Application, Request, Response} from 'express';
import bodyParser from "body-parser";

const app: Application = express();
const PORT = 3000;

app.set('port', PORT);
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

export default app;