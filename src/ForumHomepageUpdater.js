export { ForumHomepageUpdater }
import { ElementFinder } from "./ElementFinder.js";

class ForumHomepageUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    appendElement(element) {
        let contentElements = this.elementFinder.getForumHomepageContentElements();
        let lastElement = contentElements[contentElements.length - 1];
        lastElement.parentElement.insertBefore(element, lastElement.nextSibling);
    }

    prependElement(element) {
        let contentElements = this.elementFinder.getForumHomepageContentElements();
        let firstElement = contentElements[0];
        firstElement.parentElement.insertBefore(element, firstElement);
    }
}