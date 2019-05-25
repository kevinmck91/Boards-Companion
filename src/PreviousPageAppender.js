export { PreviousPageAppender }
import { PageInformationCollector } from "./PageInformationCollector.js";
import { ElementFinder } from "./ElementFinder.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { BoardsScriptInserter } from "./BoardsScriptInserter.js";
import { PostsFormatter } from "./PostsFormatter.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { BoardsScriptGenerator } from "./BoardsScriptGenerator.js";

class PreviousPageAppender {

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
    }

    prependPreviousPage(previousPageDocument, hidePostElements) {
        this.previousPageDocument = previousPageDocument;
        this._setOriginalPosition();
        this._insertPreviousPageNumber();
        this._prependNewPosts();
        this.loadingElementUpdater.removeLoadingElements();
        this.boardsScriptInserter.insertScript(this.boardsScriptGenerator.GeneratePostPostsInsertScript());
        this._updateTopPageNavigator();
        this.postsFormatter.formatPosts(this._getPreviousPagePosts(), hidePostElements);
        this._scrollToOriginalPosition();
    }

    _setOriginalPosition() {
        this.originalDocumentHeight = this.pageInformationCollector.getDocumentHeight();
        this.originalYCoordinate = this.pageInformationCollector.getCurrentYCoordinate();
    }

    _insertPreviousPageNumber() {
        let previousPageNo = this.pageInformationCollector.getPageNoFromDocument(this.previousPageDocument);
        let postsContainer = this.elementFinder.getPostsContainer();
        let pageNoElement = this.elementGenerator.generateTopPageNoElement(previousPageNo);
        postsContainer.insertBefore(pageNoElement, postsContainer.children[0]);
    }

    _prependNewPosts() {
        let previousPagePosts = this._getPreviousPagePosts();
        let postsContainer = this.elementFinder.getPostsContainer();
        for (let i = previousPagePosts.length - 1; i >= 0; i--) {
            postsContainer.insertBefore(previousPagePosts[i], postsContainer.children[0]);
        }
    }

    _getPreviousPagePosts() {
        return this.elementFinder.getPostsFromDocument(this.previousPageDocument);
    }

    _updateTopPageNavigator() {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(this.previousPageDocument);
        let currentNavigator = this.elementFinder.getTopPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }

    _scrollToOriginalPosition() {
        window.scrollTo(0, (this.originalYCoordinate + this.pageInformationCollector.getDocumentHeight() - this.originalDocumentHeight));
    }
}