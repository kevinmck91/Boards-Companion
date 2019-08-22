export { PostHtmlUpdater }
import { ElementFinder } from "../finders/ElementFinder.js";
import { AvatarDetailsFinder } from "../finders/AvatarDetailsFinder.js";
import { UserTaggingElementGenerator } from "../element-generators/UserTaggingElementGenerator.js";

class PostHtmlUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.avatarDetailsFinder = new AvatarDetailsFinder();
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
        let postCountElement = this.avatarDetailsFinder.getPostCountElement(post);
        postCountElement.innerHTML = postCountElement.innerHTML + tagElement.outerHTML;
    }
}