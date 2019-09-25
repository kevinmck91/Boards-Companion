export { ForumHomepageUpdater }
import { ForumHomepageElementFinder } from "../finders/ForumHomepageElementFinder.js";

class ForumHomepageUpdater {

    constructor() {
        this.forumHomepageElementFinder = new ForumHomepageElementFinder();
    }

    appendElement(element) {
        let parentElement = this.forumHomepageElementFinder.getForumHomepageThreadContainer();
        let threadSubContainer = parentElement.children[parentElement.children.length - 2];
        threadSubContainer.parentElement.insertBefore(element, threadSubContainer.nextSibling);
    }

    prependElement(element) {
        let parentElement = this.forumHomepageElementFinder.getForumHomepageThreadContainer();
        parentElement.insertBefore(element, parentElement.children[0]);
    }
}