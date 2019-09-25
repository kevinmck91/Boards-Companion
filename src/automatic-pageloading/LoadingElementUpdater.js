export { LoadingElementUpdater }
import { NavigationElementFinder } from "../finders/NavigationElementFinder.js";
import { ForumHomepageUpdater } from "../page-updater/ForumHomepageUpdater.js";
import { ThreadPageUpdater } from "../page-updater/ThreadPageUpdater.js";
import { AutomaticPageLoadingElementGenerator } from "../element-generators/AutomaticPageLoadingElementGenerator.js";

class LoadingElementUpdater {

    constructor() {
        this.navigationElementFinder = new NavigationElementFinder();
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.threadPageUpdater = new ThreadPageUpdater();
        this.automaticPageLoadingElementGenerator = new AutomaticPageLoadingElementGenerator();
    }

    insertThreadPageLoadingElement() {
        let loadingElement = this.automaticPageLoadingElementGenerator.generateLoadingElement();
        this.threadPageUpdater.appendElement(loadingElement);
    }

    insertForumPageLoadingElement() {
        let loadingElement = this.automaticPageLoadingElementGenerator.generateLoadingElement();
        this.forumHomepageUpdater.appendElement(loadingElement);
    }

    prependThreadPageLoadingElement() {
        let loadingElement = this.automaticPageLoadingElementGenerator.generateLoadingElement();
        this.threadPageUpdater.prependElement(loadingElement);
    }

    prependForumPageLoadingElement() {
        let loadingElement = this.automaticPageLoadingElementGenerator.generateLoadingElement();
        this.forumHomepageUpdater.prependElement(loadingElement);
    }

    removeLoadingElements() {
        for (let loadingElement of this.navigationElementFinder.getLoadingElements()) {
            if (loadingElement != null) {
                loadingElement.parentElement.removeChild(loadingElement);
            }
        }
    }
}