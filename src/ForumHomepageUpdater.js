export { ForumHomepageUpdater }
import { ElementFinder } from "./ElementFinder.js";

class ForumHomepageUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    appendElement(element) {
        let threadsContainersContainer = this.elementFinder.getThreadsContainersContainer();
        let lastElementInThreadsContainersContainer = this.elementFinder.getLastElementInThreadsContainersContainer();
        threadsContainersContainer.insertBefore(element, lastElementInThreadsContainersContainer);
    }
}