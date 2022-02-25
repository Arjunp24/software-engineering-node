/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>follows</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express from 'express';
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDao";
import mongoose from "mongoose";
import TuitDao from "./daos/TuitDao";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";


// connecting to database
mongoose.connect('mongodb+srv://mongo:mongo@cluster0.wnv1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const app = express();
app.use(express.json())


// create RESTful Web service API
const  userDao = new UserDao();
const userController = new UserController(app, userDao)

const  tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao)

const likesController = LikeController.getInstance(app);

const followsController = FollowController.getInstance(app);

const bookmarksController = BookmarkController.getInstance(app);

const messagesController = MessageController.getInstance(app);

app.get('/hello', (req, res) =>
    res.send('Hello Arjun!'));


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);