/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
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
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllFollowersByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowersByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllFollowingByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(req.params.u1id, req.params.u2id)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.unfollowUser(req.params.u1id, req.params.u2id)
            .then(status => res.send(status));
};