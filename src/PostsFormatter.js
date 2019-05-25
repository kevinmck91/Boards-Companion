export { PostsFormatter }
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { PostsCompressionToggler } from "./PostsCompressionToggler.js";

class PostsFormatter {

    constructor() {
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.postsCompressionToggler = new PostsCompressionToggler();
    }

    formatPosts(nextPagePosts, hidePostElements) {
        if (hidePostElements) {
            this.elementVisibilityUpdater.hideEachPostsElements();
            this.postsCompressionToggler.applyCompressionTogglingToPosts(nextPagePosts);
        }
    }
}