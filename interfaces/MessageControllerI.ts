import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllSentMessagesByUser (req: Request, res: Response): void;
    findAllReceivedMessagesByUser (req: Request, res: Response): void;
    sendMessage (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
};