export { PostHtmlUpdater }
import { AvatarElementFinder } from "../finders/AvatarElementFinder.js";
import { UserTaggingElementGenerator } from "../element-generators/UserTaggingElementGenerator.js";

class PostHtmlUpdater {

    constructor() {
        this.avatarElementFinder = new AvatarElementFinder();
        this.userTaggingElementGenerator = new UserTaggingElementGenerator();
    }

    addTagIconElementToPosts(posts) {
        for (let post of posts) {
            try {
                this._addTagIconElementToPost(post);
            } catch (ex) {
                console.error("Error adding tag icon: " + ex.stack);
            }
        }
    }

    _addTagIconElementToPost(post) {
        let tagElement = this.userTaggingElementGenerator.generateTagIconElement();
        let postCountElement = this.avatarElementFinder.getPostCountElement(post);
        postCountElement.innerHTML = postCountElement.innerHTML + tagElement.outerHTML;
    }
}