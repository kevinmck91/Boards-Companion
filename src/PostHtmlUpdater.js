export { PostHtmlUpdater }
import { ElementFinder } from "./ElementFinder.js";
import { ElementGenerator } from "./ElementGenerator.js";

class PostHtmlUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementGenerator = new ElementGenerator();
    }

    addTagElementToPosts(posts) {
        for (let post of posts) {
            this._addTagElementToPost(post);
        }
    }

    _addTagElementToPost(post) {
        let usernameElement = this.elementFinder.getUserDetailsElementFromPost(post);
        let tagElement = this.elementGenerator.generateTagElement();
        usernameElement.appendChild(tagElement);
    }
}