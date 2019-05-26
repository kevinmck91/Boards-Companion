export { ThreadPageAppender }
import { ElementFinder } from "./ElementFinder.js";
import { ThreadPageUpdater } from "./ThreadPageUpdater.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { BoardsScriptInserter } from "./BoardsScriptInserter.js";
import { PostsFormatter } from "./PostsFormatter.js";
import { PageInformationCollector } from "./PageInformationCollector.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { BoardsScriptGenerator } from "./BoardsScriptGenerator.js";
import { NavigatorUpdater } from "./NavigatorUpdater.js";

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
        this.navigatorUpdater = new NavigatorUpdater();
    }

    appendNextPage(nextPageDocument, hidePostElements) {
        this._insertPageNumber(nextPageDocument);
        let nextPagePosts = this.elementFinder.getPostsFromDocument(nextPageDocument);
        this.threadPageUpdater.appendElements(nextPagePosts);
        this.navigatorUpdater.updateBottomPageNavigatorFromDocument(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
        this.boardsScriptInserter.insertScript(this.boardsScriptGenerator.GeneratePostPostsInsertScript());
        this.postsFormatter.formatPosts(nextPagePosts, hidePostElements);
    }

    _insertPageNumber(nextPageDocument) {
        let pageNoElement = this._getPageNoElement(nextPageDocument);
        this.threadPageUpdater.appendElement(pageNoElement);
    }

    _getPageNoElement(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        return this.elementGenerator.generatePageNoElement(nextPageNo);
    }
}