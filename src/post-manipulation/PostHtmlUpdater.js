export { PostHtmlUpdater }
import { ElementFinder } from "../finders/ElementFinder.js";
import { AvatarDetailsFinder } from "../finders/AvatarDetailsFinder.js";
import { ElementGenerator } from "../ElementGenerator.js";

class PostHtmlUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementGenerator = new ElementGenerator();
        this.avatarDetailsFinder = new AvatarDetailsFinder();
    }

    addTagIconElementToPosts(posts) {
        for (let post of posts) {
            this._addTagIconElementToPost(post);
        }
    }

    _addTagIconElementToPost(post) {
        let tagElement = this.elementGenerator.generateTagIconElement();
        let postCountElement = this.avatarDetailsFinder.getPostCountElement(post);
        postCountElement.innerHTML = postCountElement.innerHTML + tagElement.outerHTML;
    }
}