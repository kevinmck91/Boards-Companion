export { LoadingElementUpdater }
import { ElementFinder } from "./ElementFinder.js";
import { ElementGenerator } from "./ElementGenerator.js"
import { ForumHomepageUpdater } from "./ForumHomepageUpdater.js";
import { ThreadPageUpdater } from "./ThreadPageUpdater.js";

class LoadingElementUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementGenerator = new ElementGenerator();
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.threadPageUpdater = new ThreadPageUpdater();
    }

    insertThreadPageLoadingElement() {
        let loadingElement = this.elementGenerator.generateLoadingElement();
        this.threadPageUpdater.appendElement(loadingElement);
    }

    insertForumPageLoadingElement() {
        let loadingElement = this.elementGenerator.generateLoadingElement();
        this.forumHomepageUpdater.appendElement(loadingElement);
    }

    prependThreadPageLoadingElement() {
        let loadingElement = this.elementGenerator.generateLoadingElement();
        this.threadPageUpdater.prependElement(loadingElement);
    }

    removeLoadingElements() {
        for (let loadingElement of this.elementFinder.getLoadingElements()) {
            if (loadingElement != null) {
                loadingElement.parentElement.removeChild(loadingElement);
            }
        }
    }
}