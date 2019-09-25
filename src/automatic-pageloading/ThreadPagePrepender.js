export { ThreadPagePrepender }
import { PageInformationCollector } from "../page/PageInformationCollector.js";
import { PostElementFinder } from "../finders/PostElementFinder.js";
import { NavigationElementFinder } from "../finders/NavigationElementFinder.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { BoardsScriptInserter } from "../inserted-scripts/BoardsScriptInserter.js";
import { PostsFormatter } from "../post-manipulation/PostsFormatter.js";
import { BoardsScriptGenerator } from "../inserted-scripts/BoardsScriptGenerator.js";
import { ThreadPageUpdater } from "../page-updater/ThreadPageUpdater.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { UserTagger } from "../user-tagging/UserTagger.js";
import { AutomaticPageLoadingElementGenerator } from "../element-generators/AutomaticPageLoadingElementGenerator.js";
import { NavigationRibbonStyler } from "./NavigationRibbonStyler.js";

class ThreadPagePrepender {

    constructor() {
        this.pageInformationCollector = new PageInformationCollector();
        this.navigationElementFinder = new NavigationElementFinder();
        this.postElementFinder = new PostElementFinder();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.boardsScriptInserter = new BoardsScriptInserter();
        this.postsFormatter = new PostsFormatter();
        this.boardsScriptGenerator = new BoardsScriptGenerator();
        this.originalDocumentHeight = 0;
        this.originalYCoordinate = 0;
        this.previousPageDocument = "";
        this.threadPageUpdater = new ThreadPageUpdater();
        this.navigatorUpdater = new NavigatorUpdater();
        this.previousPagePosts = [];
        this.userTagger = new UserTagger();
        this.automaticPageLoadingElementGenerator = new AutomaticPageLoadingElementGenerator();
        this.navigationRibbonStyler = new NavigationRibbonStyler();
    }

    prependPage(previousPageDocument, hidePostElements) {
        this.previousPageDocument = previousPageDocument;
        this.previousPagePosts = this.postElementFinder.getPostsFromDocument(this.previousPageDocument);
        this._setOriginalPosition();
        this._insertNavigationRibbon();
        this.threadPageUpdater.prependElements(this.previousPagePosts);
        this.loadingElementUpdater.removeLoadingElements();
        this.boardsScriptInserter.insertScript(this.boardsScriptGenerator.GeneratePostPostsInsertScript());
        this.navigatorUpdater.updateTopPageNavigatorFromDocument(this.previousPageDocument);
        this.postsFormatter.formatPosts(this.previousPagePosts, hidePostElements);
        this._scrollToOriginalPosition();
        this.userTagger.applyTaggingToPosts(this.previousPagePosts);
    }

    _setOriginalPosition() {
        this.originalDocumentHeight = this.pageInformationCollector.getDocumentHeight();
        this.originalYCoordinate = this.pageInformationCollector.getCurrentYCoordinate();
    }

    _insertNavigationRibbon() {
        let navigationRibbon = this.navigationElementFinder.getThreadBottomNavigationRibbonFromDocument(this.previousPageDocument);
        this.navigationRibbonStyler.stylePrependedNavigationRibbon(navigationRibbon);
        this.threadPageUpdater.prependElement(navigationRibbon);
    }

    _scrollToOriginalPosition() {
        window.scrollTo(0, (this.originalYCoordinate + this.pageInformationCollector.getDocumentHeight() - this.originalDocumentHeight));
    }

}