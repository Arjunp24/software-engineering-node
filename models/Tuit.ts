import Tag from "./Tag";
import Topic from "./Topic";

export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: string | null = null;
    private topics:Topic[] = [new Topic()];
    private tags:Tag[] = [new Tag()];
}
