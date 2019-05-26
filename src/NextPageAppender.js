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

    appendNextForumPage(nextPageDocument) {
        this._insertNextForumPageNumber(nextPageDocument);
        let nextPageThreadContainer = this.elementFinder.getThreadsContainerFromDocument(nextPageDocument);
        this._appendNewThreadContainer(nextPageThreadContainer);
        this._updateBottomPageNavigator(nextPageDocument);
        this.loadingElementUpdater.removeLoadingElements();
    }

    _insertNextPageNumber(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        let postsContainer = this.elementFinder.getPostsContainer();
        let pageNoElement = this.elementGenerator.generatePageNoElement(nextPageNo);
        postsContainer.appendChild(pageNoElement);
    }

    //todo refactor with above method as they are both similar
    _insertNextForumPageNumber(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        let pageNoElement = this.elementGenerator.generatePageNoElement(nextPageNo);
        let threadsContainersContainer = this.elementFinder.getThreadsContainersContainer();
        let lastElementInThreadsContainersContainer = this.elementFinder.getLastElementInThreadsContainersContainer();
        threadsContainersContainer.insertBefore(pageNoElement, lastElementInThreadsContainersContainer);
    }

    _appendNewPosts(nextPagePostsArray) {
        let postsContainer = this.elementFinder.getPostsContainer();
        for (let post of nextPagePostsArray) {
            postsContainer.appendChild(post);
        }
    }

    //todo refactor this with the above
    _appendNewThreadContainer(threadContainer) {
        let threadsContainersContainer = this.elementFinder.getThreadsContainersContainer();
        let lastElementInThreadsContainersContainer = this.elementFinder.getLastElementInThreadsContainersContainer();
        threadsContainersContainer.insertBefore(threadContainer, lastElementInThreadsContainersContainer);
    }

    _updateBottomPageNavigator(nextPageDocument) {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(nextPageDocument);
        let currentNavigator = this.elementFinder.getBottomPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }
}