export { ThreadPageAppender }
import { ElementFinder } from "../finders/ElementFinder.js";
import { ThreadPageUpdater } from "../page-updater/ThreadPageUpdater.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { BoardsScriptInserter } from "../inserted-scripts/BoardsScriptInserter.js";
import { PostsFormatter } from "../post-manipulation/PostsFormatter.js";
import { PageInformationCollector } from "../page/PageInformationCollector.js";
import { BoardsScriptGenerator } from "../inserted-scripts/BoardsScriptGenerator.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { UserTagger } from "../user-tagging/UserTagger.js";
import { AutomaticPageLoadingElementGenerator } from "../element-generators/AutomaticPageLoadingElementGenerator.js";

class ThreadPageAppender {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.threadPageUpdater = new ThreadPageUpdater();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.boardsScriptInserter = new BoardsScriptInserter();
        this.postsFormatter = new PostsFormatter();
        this.pageInformationCollector = new PageInformationCollector();
        this.boardsScriptGenerator = new BoardsScriptGenerator();
        this.navigatorUpdater = new NavigatorUpdater();
        this.userTagger = new UserTagger();
        this.automaticPageLoadingElementGenerator = new AutomaticPageLoadingElementGenerator();
    }

    appendNextPage(nextPageDocument, hidePostElements) {
        this._insertNavigationRibbon(nextPageDocument);
        let nextPagePosts = this.elementFinder.getPostsFromDocument(nextPageDocument);
        this.threadPageUpdater.appendElements(nextPagePosts);
        this.navigatorUpdater.updateBottomPageNavigatorFromDocument(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
        this.boardsScriptInserter.insertScript(this.boardsScriptGenerator.GeneratePostPostsInsertScript());
        this.postsFormatter.formatPosts(nextPagePosts, hidePostElements);
        this.userTagger.applyTaggingToPosts(nextPagePosts);
    }

    _insertNavigationRibbon(nextPageDocument) {
        let navigationRibbon = this.elementFinder.getBottomPageNavigationRibbonFromDocument(nextPageDocument);
        this._styleNavigationRibbon(navigationRibbon);
        this.threadPageUpdater.appendElement(navigationRibbon);
    }

    _getPageNoElement(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        return this.automaticPageLoadingElementGenerator.generateBottomPageNoElement(nextPageNo);
    }

    _styleNavigationRibbon(navigationRibbon) {
        navigationRibbon.style.marginTop = '25px';
    }
}