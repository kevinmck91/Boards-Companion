export { ForumHomepagePrepender }
import { PageInformationCollector } from "../page/PageInformationCollector.js";
import { ForumHomepageElementFinder } from "../finders/ForumHomepageElementFinder.js";
import { NavigationElementFinder } from "../finders/NavigationElementFinder.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { ForumHomepageUpdater } from "../page-updater/ForumHomepageUpdater.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { NavigationRibbonStyler } from "./NavigationRibbonStyler.js";

class ForumHomepagePrepender {

    constructor() {
        this.pageInformationCollector = new PageInformationCollector();
        this.forumHomepageElementFinder = new ForumHomepageElementFinder();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.originalDocumentHeight = 0;
        this.originalYCoordinate = 0;
        this.previousPageDocument = "";
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.navigatorUpdater = new NavigatorUpdater();
        this.navigationRibbonStyler = new NavigationRibbonStyler();
        this.navigationElementFinder = new NavigationElementFinder();
    }

    prependPage(previousPageDocument) {
        this.previousPageDocument = previousPageDocument;
        this._setOriginalPosition();
        this._insertNavigationRibbon();
        let nextPageThreadContainer = this.forumHomepageElementFinder.getThreadsContainerFromDocument(this.previousPageDocument);
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

    _insertNavigationRibbon() {
        let navigationRibbon = this.navigationElementFinder.getForumBottomNavigationRibbonFromDocument(this.previousPageDocument);
        this.navigationRibbonStyler.stylePrependedNavigationRibbon(navigationRibbon);
        this.forumHomepageUpdater.prependElement(navigationRibbon);
    }
}