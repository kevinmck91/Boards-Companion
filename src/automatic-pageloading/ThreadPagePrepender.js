export { ThreadPagePrepender }
import { PageInformationCollector } from "../page/PageInformationCollector.js";
import { ElementFinder } from "../finders/ElementFinder.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { BoardsScriptInserter } from "../inserted-scripts/BoardsScriptInserter.js";
import { PostsFormatter } from "../post-manipulation/PostsFormatter.js";
import { ElementGenerator } from "../ElementGenerator.js";
import { BoardsScriptGenerator } from "../inserted-scripts/BoardsScriptGenerator.js";
import { ThreadPageUpdater } from "../page-updater/ThreadPageUpdater.js";
import { NavigatorUpdater } from "../NavigatorUpdater.js";
import { UserTagger } from "../user-tagging/UserTagger.js";

class ThreadPagePrepender {

    constructor() {
        this.pageInformationCollector = new PageInformationCollector();
        this.elementFinder = new ElementFinder();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.boardsScriptInserter = new BoardsScriptInserter();
        this.postsFormatter = new PostsFormatter();
        this.elementGenerator = new ElementGenerator();
        this.boardsScriptGenerator = new BoardsScriptGenerator();
        this.originalDocumentHeight = 0;
        this.originalYCoordinate = 0;
        this.previousPageDocument = "";
        this.threadPageUpdater = new ThreadPageUpdater();
        this.navigatorUpdater = new NavigatorUpdater();
        this.previousPagePosts = [];
        this.userTagger = new UserTagger();
    }

    prependPage(previousPageDocument, hidePostElements) {
        this.previousPageDocument = previousPageDocument;
        this.previousPagePosts = this.elementFinder.getPostsFromDocument(this.previousPageDocument);
        this._setOriginalPosition();
        this._insertPreviousPageNumber();
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

    _insertPreviousPageNumber() {
        let previousPageNo = this.pageInformationCollector.getPageNoFromDocument(this.previousPageDocument);
        let pageNoElement = this.elementGenerator.generateThreadTopPageNoElement(previousPageNo);
        this.threadPageUpdater.prependElement(pageNoElement)
    }

    _scrollToOriginalPosition() {
        window.scrollTo(0, (this.originalYCoordinate + this.pageInformationCollector.getDocumentHeight() - this.originalDocumentHeight));
    }


}