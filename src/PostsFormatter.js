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

    highlightPosts(posts) {
        for (let post of posts) {
            let userDetailsElement = this.elementFinder.getUserDetailsElementFromPost(post);
            userDetailsElement.style.backgroundColor = 'red';
        }
    }
}