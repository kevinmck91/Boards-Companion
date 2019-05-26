export { NextPageAppender }
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { ElementFinder } from "./ElementFinder.js";
import { PostsFormatter } from "./PostsFormatter.js";
import { BoardsScriptInserter } from "./BoardsScriptInserter.js";
import { BoardsScriptGenerator } from "./BoardsScriptGenerator.js";
import { PageInformationCollector } from "./PageInformationCollector.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { ForumHomepageUpdater } from "./ForumHomepageUpdater.js";
import { ThreadPageUpdater } from "./ThreadPageUpdater.js";

class NextPageAppender {

    constructor() {
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.elementFinder = new ElementFinder();
        this.postsFormatter = new PostsFormatter();
        this.boardsScriptInserter = new BoardsScriptInserter();
        this.pageInformationCollector = new PageInformationCollector();
        this.elementGenerator = new ElementGenerator();
        this.boardsScriptGenerator = new BoardsScriptGenerator();
        this.forumHomepageUpdater = new ForumHomepageUpdater();
        this.threadPageUpdater = new ThreadPageUpdater();
    }

    appendNextThreadPage(nextPageDocument, hidePostElements) {
        this._insertNextThreadPageNumber(nextPageDocument);
        let nextPagePosts = this.elementFinder.getPostsFromDocument(nextPageDocument);
        this.threadPageUpdater.appendElements(nextPagePosts);
        this._updateBottomThreadPageNavigator(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
        this.boardsScriptInserter.insertScript(this.boardsScriptGenerator.GeneratePostPostsInsertScript());
        this.postsFormatter.formatPosts(nextPagePosts, hidePostElements);
    }

    appendNextForumPage(nextPageDocument) {
        this._insertNextForumPageNumber(nextPageDocument);
        let nextPageThreadContainer = this.elementFinder.getThreadsContainerFromDocument(nextPageDocument);
        this.forumHomepageUpdater.appendElement(nextPageThreadContainer);
        this._updateBottomThreadPageNavigator(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
    }

    _insertNextThreadPageNumber(nextPageDocument) {
        let pageNoElement = this._getPageNoElement(nextPageDocument);
        this.threadPageUpdater.appendElement(pageNoElement);
    }

    _insertNextForumPageNumber(nextPageDocument) {
        let pageNoElement = this._getPageNoElement(nextPageDocument);
        this.forumHomepageUpdater.appendElement(pageNoElement);
    }

    _updateBottomThreadPageNavigator(nextPageDocument) {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(nextPageDocument);
        this.threadPageUpdater.updateBottomPageNavigator(newNavigator);
    }

    _getPageNoElement(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        return this.elementGenerator.generatePageNoElement(nextPageNo);
    }
}