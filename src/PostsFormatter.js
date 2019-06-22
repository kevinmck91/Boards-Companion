export { PostsFormatter }
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { PostsCompressionToggler } from "./PostsCompressionToggler.js";
import { ElementFinder } from "./ElementFinder.js";

class PostsFormatter { //todo, change to postformatter

    constructor() {
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.postsCompressionToggler = new PostsCompressionToggler();
        this.elementFinder = new ElementFinder();
    }

    formatPosts(nextPagePosts, hidePostElements) {
        if (hidePostElements) {
            this.elementVisibilityUpdater.hideEachPostsElements();
            this.postsCompressionToggler.applyCompressionTogglingToPosts(nextPagePosts);
        }
    }

    highlightUserPosts(username, colour) {
        let userPosts = this.elementFinder.getUserPosts(username);
        this.highlightPosts(userPosts, colour);
    }

    highlightPosts(posts, colour) {
        for (let post of posts) {
            let userDetailsElement = this.elementFinder.getUserDetailsElementFromPost(post);
            userDetailsElement.style.backgroundColor = colour;
        }
    }
}