export { PostsFormatter }
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { PostsCompressionToggler } from "./PostsCompressionToggler.js";
import { ElementFinder } from "./ElementFinder.js";

class PostsFormatter {

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

    tagUsersPosts(taggedUserDetails) {
        let userPosts = this.elementFinder.getUserPosts(taggedUserDetails.username);
        this._tagPosts(userPosts, taggedUserDetails);
    }

    tagUsersPostsWithinPosts(posts, taggedUserDetails) {
        let userPosts = this.elementFinder.getUserPostsFromPosts(taggedUserDetails.username, posts)
        this._tagPosts(userPosts, taggedUserDetails);
    }

    _tagPosts(posts, taggedUserDetails) {
        for (let post of posts) {
            let userDetailsElement = this.elementFinder.getUserDetailsElementFromPost(post);
            userDetailsElement.style.backgroundColor = taggedUserDetails.colour;
            let usernameElement = this.elementFinder.getUsernameElementFromPost(post);
            let textElement = document.createElement('div');
            textElement.innerHTML = taggedUserDetails.text;
            usernameElement.appendChild(textElement);
        }
    }
}