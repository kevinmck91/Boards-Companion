export { ForumHomepageAppender }
import { ForumHomepageElementFinder } from "../finders/ForumHomepageElementFinder.js";
import { NavigationElementFinder } from "../finders/NavigationElementFinder.js";
import { ForumHomepageUpdater } from "../page-updater/ForumHomepageUpdater.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { NavigationRibbonStyler } from "./NavigationRibbonStyler.js";
import { PageInformationCollector } from "../page/PageInformationCollector.js";

class ForumHomepageAppender {

    constructor() {
        this.forumHomepageElementFinder = new ForumHomepageElementFinder();
        this.navigationElementFinder = new NavigationElementFinder();
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.navigatorUpdater = new NavigatorUpdater();
        this.navigationRibbonStyler = new NavigationRibbonStyler();
        this.pageInformationCollector = new PageInformationCollector();
    }

    appendNextPage(nextPageDocument) {
        this._insertNavigationRibbon(nextPageDocument);
        let nextPageThreadContainer = this.forumHomepageElementFinder.getThreadsContainerFromDocument(nextPageDocument);
        this.forumHomepageUpdater.appendContentElement(nextPageThreadContainer);
        this.navigatorUpdater.updateBottomPageNavigatorFromDocument(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
    }

    _insertNavigationRibbon(nextPageDocument) {
        let navigationRibbon = this.navigationElementFinder.getForumBottomNavigationRibbonFromDocument(nextPageDocument);
        this.navigationRibbonStyler.styleAppendedNavigationRibbon(navigationRibbon);
        this.forumHomepageUpdater.appendContentElement(navigationRibbon);
    }

}