export { ForumHomepageAppender }
import { ElementFinder } from "./ElementFinder.js";
import { ForumHomepageUpdater } from "./ForumHomepageUpdater.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { ThreadPageUpdater } from "./ThreadPageUpdater.js";
import { PageInformationCollector } from "./PageInformationCollector.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { NavigatorUpdater } from "./NavigatorUpdater.js";

class ForumHomepageAppender {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.threadPageUpdater = new ThreadPageUpdater();
        this.pageInformationCollector = new PageInformationCollector();
        this.elementGenerator = new ElementGenerator();
        this.navigatorUpdater = new NavigatorUpdater();
    }

    appendNextPage(nextPageDocument) {
        this._insertNextPageNumber(nextPageDocument);
        let nextPageThreadContainer = this.elementFinder.getThreadsContainerFromDocument(nextPageDocument);
        this.forumHomepageUpdater.appendElement(nextPageThreadContainer);
        this.navigatorUpdater.updateBottomPageNavigatorFromDocument(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
    }

    _insertNextPageNumber(nextPageDocument) {
        let pageNoElement = this._getPageNoElement(nextPageDocument);
        this.forumHomepageUpdater.appendElement(pageNoElement);
    }

    _getPageNoElement(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        return this.elementGenerator.generatePageNoElement(nextPageNo);
    }
}