export { ForumHomepageUpdater }
import { ElementFinder } from "../finders/ElementFinder.js";

class ForumHomepageUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    appendElement(element) {
        let parentElement = this.elementFinder.getForumHomepageThreadContainer();
        let threadSubContainer = parentElement.children[parentElement.children.length - 2];
        threadSubContainer.parentElement.insertBefore(element, threadSubContainer.nextSibling);
    }

    prependElement(element) {
        let parentElement = this.elementFinder.getForumHomepageThreadContainer();
        parentElement.insertBefore(element, parentElement.children[0]);
    }
}