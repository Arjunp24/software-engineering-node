/**
 * @file Declares Message data type representing relationship between
 * different users, as in user messages another user.
 */
import User from "./User";

/**
 * @typedef Message Represents messages relationship between different users,
 * as in a user messages another user.
 * @property {string} message Message being sent.
 * @property {User} to User for whom the message is being sent to.
 * @property {User} from User who is sending the message.
 * @property {Date} sentOn Date the message was sent on.
 */
export default interface Message{
    message: string
    to: User
    from: User
    sentOn: Date
}