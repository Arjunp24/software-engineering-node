import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    findAllFollowersByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowed")
            .exec();
    findAllFollowingByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowing")
            .exec();
    followUser = async (u1id: string, u2id: string): Promise<any> =>
        FollowModel.create({userFollowing: u1id, userFollowed: u2id});
    unfollowUser = async (u1id: string, u2id: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: u1id, userFollowed: u2id});
}