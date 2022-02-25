/**
 * @file Declares Tuit data type represented by values like tuit, postedOn, postedBy, topics and tags.
 */
import Tag from "./Tag";
import Topic from "./Topic";

/**
 * @typedef Tuit Represents tuits by values like tuit, postedOn, postedBy, topics and tags.
 * @property {string} tuit Tuit being posted.
 * @property {Date} postedOn Date the tuit was posted on.
 * @property {string} postedBy Name of the user posting the tuit.
 * @property {Topic[]} topics List of topics related to the tuit.
 * @property {Tag[]} tags List of tags in the tuit.
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: string | null = null;
    private topics:Topic[] = [new Topic()];
    private tags:Tag[] = [new Tag()];
}
