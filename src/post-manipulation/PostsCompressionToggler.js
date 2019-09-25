export { PostsCompressionToggler };
import { PostElementFinder } from "../finders/PostElementFinder.js";
import { AvatarElementFinder } from "../finders/AvatarElementFinder.js";
import { PostElementsVisibilityUpdater } from "../element-visibility/PostElementsVisibilityUpdater.js";

class PostsCompressionToggler {

    constructor() {
        this.postElementFinder = new PostElementFinder();
        this.avatarElementFinder = new AvatarElementFinder();
        this.postElementsVisibilityUpdater = new PostElementsVisibilityUpdater();
    }

    applyCompressionToggling() {
        let posts = this.postElementFinder.getAllPosts();
        this.applyCompressionTogglingToPosts(posts);
    }

    applyCompressionTogglingToPosts(posts) {
        for (let post of posts) {
            let _this = this;
            post.addEventListener('click', function (e) {
                if (_this._isValidClickLocation(e, post)) {
                    _this._togglePostCompression(post);
                }
            });
        }
    }

    _togglePostCompression(post) {
        if (this._isPostCompressed(post)) {
            this.postElementsVisibilityUpdater.showPostElements(post);
        }
        else {
            this.postElementsVisibilityUpdater.hidePostElements(post);
        }
    }

    _isPostCompressed(post) {
        return this.postElementFinder.getFooterElementFromPost(post).style.display == 'none';
    }

    _isValidClickLocation(clickEvent, post) {
        if (this._isClickWithinFooterElement(clickEvent, post))
            return false;
        else if (this._isClickWithinTagIconElement(clickEvent, post))
            return false;
        else
            return true;
    }

    _isClickWithinFooterElement(clickEvent, post) {
        let postFooter = this.postElementFinder.getFooterElementFromPost(post);
        return postFooter.contains(clickEvent.target);
    }

    _isClickWithinTagIconElement(clickEvent, post) {
        let tagElement = this.avatarElementFinder.getTagIconElementFromPost(post);
        if (tagElement == null)
            return false;
        else if (tagElement.contains(clickEvent.target))
            return true;
        else if (clickEvent.target.outerHTML == tagElement.outerHTML)
            return true;
        else
            return false;
    }
}