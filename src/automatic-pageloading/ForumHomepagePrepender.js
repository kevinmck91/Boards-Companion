export { ForumHomepagePrepender }
import { PageInformationCollector } from "../page/PageInformationCollector.js";
import { ElementFinder } from "../finders/ElementFinder.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { ForumHomepageUpdater } from "../page-updater/ForumHomepageUpdater.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { AutomaticPageLoadingElementGenerator } from "../element-generators/AutomaticPageLoadingElementGenerator.js";

class ForumHomepagePrepender {

    constructor() {
        this.pageInformationCollector = new PageInformationCollector();
        this.elementFinder = new ElementFinder();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.originalDocumentHeight = 0;
        this.originalYCoordinate = 0;
        this.previousPageDocument = "";
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.navigatorUpdater = new NavigatorUpdater();
        this.automaticPageLoadingElementGenerator = new AutomaticPageLoadingElementGenerator();
    }

    prependPage(previousPageDocument) {
        this.previousPageDocument = previousPageDocument;
        this._setOriginalPosition();
        this._insertPreviousPageNumber();
        let nextPageThreadContainer = this.elementFinder.getThreadsContainerFromDocument(this.previousPageDocument);
        this.forumHomepageUpdater.prependElement(nextPageThreadContainer);
        this.loadingElementUpdater.removeLoadingElements();
        this.navigatorUpdater.updateTopPageNavigatorFromDocument(this.previousPageDocument);
        this._scrollToOriginalPosition();
    }

    _setOriginalPosition() {
        this.originalDocumentHeight = this.pageInformationCollector.getDocumentHeight();
        this.originalYCoordinate = this.pageInformationCollector.getCurrentYCoordinate();
    }

    _scrollToOriginalPosition() {
        window.scrollTo(0, (this.originalYCoordinate + this.pageInformationCollector.getDocumentHeight() - this.originalDocumentHeight));
    }

    _insertPreviousPageNumber() {
        let previousPageNo = this.pageInformationCollector.getPageNoFromDocument(this.previousPageDocument);
        let pageNoElement = this.automaticPageLoadingElementGenerator.generateForumTopPageNoElement(previousPageNo);
        this.forumHomepageUpdater.prependElement(pageNoElement)
    }
}