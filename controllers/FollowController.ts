/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/followed to retrieve all followers of a user
 *     </li>
 *     <li>GET /users/:uid/following to retrieve all the users that a user is following
 *     </li>
 *     <li>POST /users/:u1id/follows/:u2id to record that a user follows another user
 *     </li>
 *     <li>DELETE /users/:u1id/follows/:u2id to record that a user unfollows another user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/users/:uid/followed", FollowController.followController.findAllFollowersByUser);
            app.get("/users/:uid/following", FollowController.followController.findAllFollowingByUser);
            app.post("/users/:u1id/follows/:u2id", FollowController.followController.followUser);
            app.delete("/users/:u1id/follows/:u2id", FollowController.followController.unfollowUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all the followers of a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollowersByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowersByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users following a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollowingByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters u1id and u2id representing the user following another user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(req.params.u1id, req.params.u2id)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters u1id and u2id representing the user that is unfollowing another user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.unfollowUser(req.params.u1id, req.params.u2id)
            .then(status => res.send(status));
};