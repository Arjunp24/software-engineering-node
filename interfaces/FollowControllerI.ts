import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllFollowersByUser (req: Request, res: Response): void;
    findAllFollowingByUser (req: Request, res: Response): void;
    followUser (req: Request, res: Response): void;
    unfollowUser (req: Request, res: Response): void;
};