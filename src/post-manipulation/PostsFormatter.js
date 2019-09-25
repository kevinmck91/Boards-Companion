export { PostsFormatter }
import { PostElementsVisibilityUpdater } from "../element-visibility/PostElementsVisibilityUpdater.js";
import { PostsCompressionToggler } from "./PostsCompressionToggler.js";
import { ElementFinder } from "../finders/ElementFinder.js";
import { AvatarElementFinder } from "../finders/AvatarElementFinder.js";
import { UserTaggingElementGenerator } from "../element-generators/UserTaggingElementGenerator.js";

class PostsFormatter {

    constructor() {
        this.postsCompressionToggler = new PostsCompressionToggler();
        this.elementFinder = new ElementFinder();
        this.avatarElementFinder = new AvatarElementFinder();
        this.postElementsVisibilityUpdater = new PostElementsVisibilityUpdater();
        this.userTaggingElementGenerator = new UserTaggingElementGenerator();
    }

    formatPosts(nextPagePosts, hidePostElements) {
        if (hidePostElements) {
            this.postElementsVisibilityUpdater.hideEachPostsElements();
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
            let usernameElement = this.avatarElementFinder.getUsernameElementFromPost(post);
            this._ensureExistingTagsRemoved(post);
            let userTagElement = this.userTaggingElementGenerator.generateUserTagElement(taggedUserDetails);
            usernameElement.appendChild(userTagElement);
        }
    }

    _ensureExistingTagsRemoved(post) {
        let usernameElement = this.avatarElementFinder.getUsernameElementFromPost(post);
        let existingTagElement = this.avatarElementFinder.getUserTagElementFromPost(post);
        if (existingTagElement != null) {
            usernameElement.removeChild(existingTagElement);
        }
    }
}