export { ForumHomepageAppender }
import { ElementFinder } from "../finders/ElementFinder.js";
import { NavigationElementFinder } from "../finders/NavigationElementFinder.js";
import { ForumHomepageUpdater } from "../page-updater/ForumHomepageUpdater.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { ThreadPageUpdater } from "../page-updater/ThreadPageUpdater.js";
import { PageInformationCollector } from "../page/PageInformationCollector.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { AutomaticPageLoadingElementGenerator } from "../element-generators/AutomaticPageLoadingElementGenerator.js";
import { NavigationRibbonStyler } from "./NavigationRibbonStyler.js";

class ForumHomepageAppender {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.navigationElementFinder = new NavigationElementFinder();
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.threadPageUpdater = new ThreadPageUpdater();
        this.pageInformationCollector = new PageInformationCollector();
        this.navigatorUpdater = new NavigatorUpdater();
        this.automaticPageLoadingElementGenerator = new AutomaticPageLoadingElementGenerator();
        this.navigationRibbonStyler = new NavigationRibbonStyler();
    }

    appendNextPage(nextPageDocument) {
        this._insertNavigationRibbon(nextPageDocument);
        let nextPageThreadContainer = this.elementFinder.getThreadsContainerFromDocument(nextPageDocument);
        this.forumHomepageUpdater.appendElement(nextPageThreadContainer);
        this.navigatorUpdater.updateBottomPageNavigatorFromDocument(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
    }

    _insertNavigationRibbon(nextPageDocument) {
        let navigationRibbon = this.navigationElementFinder.getForumBottomNavigationRibbonFromDocument(nextPageDocument);
        this.navigationRibbonStyler.styleAppendedNavigationRibbon(navigationRibbon);
        this.forumHomepageUpdater.appendElement(navigationRibbon);
    }

}