export { ThreadPageAppender }
import { PostElementFinder } from "../finders/PostElementFinder.js";
import { NavigationElementFinder } from "../finders/NavigationElementFinder.js";
import { ThreadPageUpdater } from "../page-updater/ThreadPageUpdater.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { BoardsScriptInserter } from "../inserted-scripts/BoardsScriptInserter.js";
import { PostsFormatter } from "../post-manipulation/PostsFormatter.js";
import { BoardsScriptGenerator } from "../inserted-scripts/BoardsScriptGenerator.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { UserTagger } from "../user-tagging/UserTagger.js";
import { NavigationRibbonStyler } from "./NavigationRibbonStyler.js";

class ThreadPageAppender {

    constructor() {
        this.postElementFinder = new PostElementFinder();
        this.navigationElementFinder = new NavigationElementFinder();
        this.threadPageUpdater = new ThreadPageUpdater();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.boardsScriptInserter = new BoardsScriptInserter();
        this.postsFormatter = new PostsFormatter();
        this.boardsScriptGenerator = new BoardsScriptGenerator();
        this.navigatorUpdater = new NavigatorUpdater();
        this.userTagger = new UserTagger();
        this.navigationRibbonStyler = new NavigationRibbonStyler();
    }

    appendNextPage(nextPageDocument, hidePostElements) {
        this._insertNavigationRibbon(nextPageDocument);
        let nextPagePosts = this.postElementFinder.getPostsFromDocument(nextPageDocument);
        this.threadPageUpdater.appendElements(nextPagePosts);
        this.navigatorUpdater.updateBottomPageNavigatorFromDocument(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
        this.boardsScriptInserter.insertScript(this.boardsScriptGenerator.GeneratePostPostsInsertScript());
        this.postsFormatter.formatPosts(nextPagePosts, hidePostElements);
        this.userTagger.applyTaggingToPosts(nextPagePosts);
    }

    _insertNavigationRibbon(nextPageDocument) {
        let navigationRibbon = this.navigationElementFinder.getThreadBottomNavigationRibbonFromDocument(nextPageDocument);
        this.navigationRibbonStyler.styleAppendedNavigationRibbon(navigationRibbon);
        this.threadPageUpdater.appendElement(navigationRibbon);
    }

}