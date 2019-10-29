export { ForumHomepageUpdater }
import { ForumHomepageElementFinder } from "../finders/ForumHomepageElementFinder.js";
import { NavigationElementFinder } from "../finders/NavigationElementFinder.js";

class ForumHomepageUpdater {

    constructor() {
        this.forumHomepageElementFinder = new ForumHomepageElementFinder();
        this.navigationElementFinder = new NavigationElementFinder();
    }

    appendLoadingElement(element) {
        let baseElement = this.forumHomepageElementFinder.getElementToAppend();
        baseElement.parentElement.insertBefore(element, baseElement.nextSibling);
    }

    appendContentElement(element) {
        const loadingElement = this.navigationElementFinder.getLoadingElements()[0];
        loadingElement.parentElement.insertBefore(element, loadingElement);
    }

    prependContentElement(element) {
        const loadingElement = this.navigationElementFinder.getLoadingElements()[0];
        loadingElement.parentElement.insertBefore(element, loadingElement.nextSibling);
    }

    prependLoadingElement(element) {
        let baseElement = this.forumHomepageElementFinder.getElementToPrepend();
        baseElement.parentElement.insertBefore(element, baseElement);
    }
}