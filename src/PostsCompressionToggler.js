export { PostsCompressionToggler };
import { ElementFinder } from "./ElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";

class PostsCompressionToggler {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
    }

    applyCompressionToggling() {
        let posts = this.elementFinder.getAllPosts();
        this.applyCompressionTogglingToPosts(posts);
    }

    applyCompressionTogglingToPosts(posts) {
        for (let post of posts) {
            let _this = this;
            post.addEventListener('click', function (e) {
                if (!_this._isClickWithinFooterElement(e, post)) {
                    _this._togglePostCompression(post);
                }
            });
        }
    }

    _togglePostCompression(post) {
        if (this._isPostCompressed(post)) {
            this.elementVisibilityUpdater.showPostElements(post);
        }
        else {
            this.elementVisibilityUpdater.hidePostElements(post);
        }
    }

    _isPostCompressed(post) {
        return this.elementFinder.getFooterElementFromPost(post).style.display == 'none';
    }

    _isClickWithinFooterElement(clickEvent, post) {
        let postFooter = this.elementFinder.getFooterElementFromPost(post);
        return postFooter.contains(clickEvent.target);
    }
}