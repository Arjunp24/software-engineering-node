/**
 * @file Defines the schema for documents in the tuits collection.
 */
import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: String, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    tags: {type: Array, ref: "TagModel"},
    topics: {type: Array, ref: "TopicModel"},
}, {collection: 'tuits'});
export default TuitSchema;