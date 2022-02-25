/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/messages/sent to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /users/:uid/messages/received to retrieve all the messages received by a user
 *     </li>
 *     <li>POST /users/:u1id/messages/:u2id/:message to record that a user sends a message to another user
 *     </li>
 *     <li>DELETE /users/:uid/messages/:message to record that a user unsends a message sent to another user
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/users/:uid/messages/sent", MessageController.messageController.findAllSentMessagesByUser);
            app.get("/users/:uid/messages/received", MessageController.messageController.findAllReceivedMessagesByUser);
            app.post("/users/:u1id/messages/:u2id/:message", MessageController.messageController.sendMessage);
            app.delete("/users/:u1id/messages/:u2id/:message", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllSentMessagesByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSentMessagesByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages received by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllReceivedMessagesByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllReceivedMessagesByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters u1id and u2id representing the user sending a message to another user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.sendMessage(req.params.u1id, req.params.u2id, req.params.message)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters u1id and u2id representing the user deleting a message sent to another user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.u1id, req.params.u2id, req.params.message)
            .then(status => res.send(status));
};