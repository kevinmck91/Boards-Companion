export { PostTagger }
import { ElementFinder } from "./ElementFinder.js";
import { PostsFormatter } from "./PostsFormatter.js";

class PostTagger { //todo class is either named wrong or isn't necessary

    constructor() {
        this.elementFinder = new ElementFinder();
        this.postsFormatter = new PostsFormatter();
    }

    highlightUsers(usernames) {
        for (let username of usernames) {
            let userPosts = this.elementFinder.getUserPosts(username);
            this.postsFormatter.highlightPosts(userPosts);
        }
    }


}