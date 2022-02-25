import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    findAllSentMessagesByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message")
            .exec();
    findAllReceivedMessagesByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message")
            .exec();
    sendMessage = async (u1id: string, u2id: string, message: string): Promise<any> =>
        MessageModel.create({from: u1id, to: u2id, message: message});
    deleteMessage = async (u1id: string, message: string): Promise<any> =>
        MessageModel.deleteOne({from: u1id, message: message});
}