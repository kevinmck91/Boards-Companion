export { ThreadPageAppender }
import { ElementFinder } from "./ElementFinder.js";
import { ThreadPageUpdater } from "./ThreadPageUpdater.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { BoardsScriptInserter } from "./BoardsScriptInserter.js";
import { PostsFormatter } from "./PostsFormatter.js";
import { PageInformationCollector } from "./PageInformationCollector.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { BoardsScriptGenerator } from "./BoardsScriptGenerator.js";

class ThreadPageAppender {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.threadPageUpdater = new ThreadPageUpdater();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.boardsScriptInserter = new BoardsScriptInserter();
        this.postsFormatter = new PostsFormatter();
        this.pageInformationCollector = new PageInformationCollector();
        this.elementGenerator = new ElementGenerator();
        this.boardsScriptGenerator = new BoardsScriptGenerator();
    }

    appendNextPage(nextPageDocument, hidePostElements) {
        this._insertPageNumber(nextPageDocument);
        let nextPagePosts = this.elementFinder.getPostsFromDocument(nextPageDocument);
        this.threadPageUpdater.appendElements(nextPagePosts);
        this._updateBottomPageNavigator(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
        this.boardsScriptInserter.insertScript(this.boardsScriptGenerator.GeneratePostPostsInsertScript());
        this.postsFormatter.formatPosts(nextPagePosts, hidePostElements);
    }

    _insertPageNumber(nextPageDocument) {
        let pageNoElement = this._getPageNoElement(nextPageDocument);
        this.threadPageUpdater.appendElement(pageNoElement);
    }

    _updateBottomPageNavigator(nextPageDocument) {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(nextPageDocument);
        this.threadPageUpdater.updateBottomPageNavigator(newNavigator);
    }

    //todo - duplicate functionality, put in separate class
    _getPageNoElement(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        return this.elementGenerator.generatePageNoElement(nextPageNo);
    }
}