export { ForumHomepageAppender }
import { ElementFinder } from "../finders/ElementFinder.js";
import { ForumHomepageUpdater } from "../page-updater/ForumHomepageUpdater.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { ThreadPageUpdater } from "../page-updater/ThreadPageUpdater.js";
import { PageInformationCollector } from "../page/PageInformationCollector.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { AutomaticPageLoadingElementGenerator } from "../element-generators/AutomaticPageLoadingElementGenerator.js";

class ForumHomepageAppender {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.threadPageUpdater = new ThreadPageUpdater();
        this.pageInformationCollector = new PageInformationCollector();
        this.navigatorUpdater = new NavigatorUpdater();
        this.automaticPageLoadingElementGenerator = new AutomaticPageLoadingElementGenerator();
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
        return this.automaticPageLoadingElementGenerator.generateBottomPageNoElement(nextPageNo);
    }
}