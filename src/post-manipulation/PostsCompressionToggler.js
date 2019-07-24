export { PostsCompressionToggler };
import { ElementFinder } from "../finders/ElementFinder.js";
import { ElementVisibilityUpdater } from "../ElementVisibilityUpdater.js";

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
                if (_this._isValidClickLocation(e, post)) {
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

    _isValidClickLocation(clickEvent, post) {
        if (this._isClickWithinFooterElement(clickEvent, post))
            return false;
        else if (this._isClickWithinTagIconElement(clickEvent, post))
            return false;
        else
            return true;
    }

    _isClickWithinFooterElement(clickEvent, post) {
        let postFooter = this.elementFinder.getFooterElementFromPost(post);
        return postFooter.contains(clickEvent.target);
    }

    _isClickWithinTagIconElement(clickEvent, post) {
        let tagElement = this.elementFinder.getTagIconElementFromPost(post);
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