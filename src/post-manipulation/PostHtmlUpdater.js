export { PostHtmlUpdater }
import { ElementFinder } from "../finders/ElementFinder.js";
import { ElementGenerator } from "../ElementGenerator.js";

class PostHtmlUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementGenerator = new ElementGenerator();
    }

    addTagIconElementToPosts(posts) {
        for (let post of posts) {
            this._addTagIconElementToPost(post);
        }
    }

    _addTagIconElementToPost(post) {
        let userDetailsElement = this.elementFinder.getUserDetailsElementFromPost(post);
        let tagElement = this.elementGenerator.generateTagIconElement();
        userDetailsElement.appendChild(tagElement);
    }
}