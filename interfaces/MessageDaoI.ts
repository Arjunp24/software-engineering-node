import Message from "../models/Message";

export default interface MessageDaoI {
    sendMessage(u1id: string, u2id: string, message: string): Promise<Message>
    deleteMessage(u1id: string, message: string): Promise<any>
    findAllSentMessagesByUser(uid: string): Promise<Message[]>
    findAllReceivedMessagesByUser(uid: string): Promise<Message[]>
};