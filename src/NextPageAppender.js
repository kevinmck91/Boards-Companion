export { NextPageAppender }
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { ElementFinder } from "./ElementFinder.js";
import { PostsFormatter } from "./PostsFormatter.js";
import { BoardsScriptInserter } from "./BoardsScriptInserter.js";
import { BoardsScriptGenerator } from "./BoardsScriptGenerator.js";
import { PageInformationCollector } from "./PageInformationCollector.js";
import { ElementGenerator } from "./ElementGenerator.js";

class NextPageAppender {

    constructor() {
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.elementFinder = new ElementFinder();
        this.postsFormatter = new PostsFormatter();
        this.boardsScriptInserter = new BoardsScriptInserter();
        this.pageInformationCollector = new PageInformationCollector();
        this.elementGenerator = new ElementGenerator();
        this.boardsScriptGenerator = new BoardsScriptGenerator();
    }

    appendNextPage(nextPageDocument, hidePostElements) {
        this._insertNextPageNumber(nextPageDocument);
        let nextPagePosts = this.elementFinder.getPostsFromDocument(nextPageDocument);
        this._appendNewPosts(nextPagePosts);
        this._updateBottomPageNavigator(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
        this.boardsScriptInserter.insertScript(this.boardsScriptGenerator.GeneratePostPostsInsertScript());
        this.postsFormatter.formatPosts(nextPagePosts, hidePostElements);
    }

    _insertNextPageNumber(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        let postsContainer = this.elementFinder.getPostsContainer();
        let pageNoElement = this.elementGenerator.generatePageNoElement(nextPageNo);
        postsContainer.appendChild(pageNoElement);
    }

    _appendNewPosts(nextPagePostsArray) {
        let postsContainer = this.elementFinder.getPostsContainer();
        for (let post of nextPagePostsArray) {
            postsContainer.appendChild(post);
        }
    }

    _updateBottomPageNavigator(nextPageDocument) {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(nextPageDocument);
        let currentNavigator = this.elementFinder.getBottomPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }
}