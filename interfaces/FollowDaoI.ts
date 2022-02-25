import Follow from "../models/Follow";

export default interface FollowDaoI {
    followUser(u1id: string, u2id: string): Promise<Follow>
    unfollowUser(u1id: string, u2id: string): Promise<any>
    findAllFollowersByUser(uid: string): Promise<Follow[]>
    findAllFollowingByUser(uid: string): Promise<Follow[]>
};