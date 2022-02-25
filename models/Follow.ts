/**
 * @file Declares Follow data type representing relationship between
 * different users, as in user follows another user.
 */
import User from "./User";

/**
 * @typedef Follow Represents follows relationship between different users,
 * as in a user follows another user
 * @property {User} userFollowed User who is being followed.
 * @property {User} userFollowing User who is following.
 */
export default interface Follow{
    userFollowed: User
    userFollowing: User
}