import express from 'express';
// import UserController from "../software-engineering-node/controllers/UserController";
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDao";
import mongoose from "mongoose";
import TuitDao from "./daos/TuitDao";
import TuitController from "./controllers/TuitController";


mongoose.connect('mongodb+srv://mongo:mongo@cluster0.wnv1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const app = express();
app.use(express.json())

const  userDao = new UserDao();
const userController = new UserController(app, userDao)

const  tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao)


app.get('/hello', (req, res) =>
    res.send('Hello Arjun!'));


const PORT = 4000;
app.listen(process.env.PORT || PORT);