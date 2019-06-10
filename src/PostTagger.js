export { PostTagger }
import { ElementFinder } from "./ElementFinder.js";
import { PostsFormatter } from "./PostsFormatter.js";

class PostTagger {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.postsFormatter = new PostsFormatter();
    }

    highlightUserPosts(usernames) {
        for (let username of usernames) {
            let userPosts = this.elementFinder.getUserPosts(username);
            this.postsFormatter.highlightPosts(userPosts);
        }
    }


}