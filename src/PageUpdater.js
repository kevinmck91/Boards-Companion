export { PageUpdater };
import { ElementFinder } from "./ElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { PageInformationCollector } from "./PageInformationCollector.js";
import { PostsCompressionToggler } from "./PostsCompressionToggler.js";
import { BoardsScriptGenerator } from "./BoardsScriptGenerator.js";
import { ConfigurationSettingExecutor } from "./ConfigurationSettingExecutor.js";
import { Settings } from "./ConfigurationSettings.js";

class PageUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.elementGenerator = new ElementGenerator();
        this.pageInformationCollector = new PageInformationCollector();
        this.postsCompressionToggler = new PostsCompressionToggler();
        this.BoardsScriptGenerator = new BoardsScriptGenerator();
        this.configurationSettingExecutor = new ConfigurationSettingExecutor();
        this.hidePostElements = true;
    }

    appendNextPage(nextPageDocument, hidePostElements) {
        this.hidePostElements = hidePostElements;
        this._insertNextPageNumber(nextPageDocument);
        let nextPagePosts = this.elementFinder.getPostsFromDocument(nextPageDocument);
        this._appendNewPosts(nextPagePosts);
        this._updateBottomPageNavigator(nextPageDocument);
        this.removeLoadingElements();
        this.insertPostPostsInsertScript();
        this._formatPosts(nextPagePosts);
    }

    prependPreviousPage(previousPageDocument, hidePostElements) {
        this.hidePostElements = hidePostElements;
        let currentDocumentHeight = this.pageInformationCollector.getDocumentHeight();
        let currentYCoordinate = this.pageInformationCollector.getCurrentYCoordinate();
        this._insertPreviousPageNumber(previousPageDocument);
        let previousPagePosts = this.elementFinder.getPostsFromDocument(previousPageDocument);
        this._prependNewPosts(previousPagePosts);
        this.removeLoadingElements();
        this.insertPostPostsInsertScript();
        this._updateTopPageNavigator(previousPageDocument);
        this._formatPosts(previousPagePosts);
        this._scrollToOriginalLocation(currentDocumentHeight, currentYCoordinate);
    }

    _scrollToOriginalLocation(originalDocumentHeight, originalYcoordinate) {
        window.scrollTo(0, (originalYcoordinate + this.pageInformationCollector.getDocumentHeight() - originalDocumentHeight));
    }

    _prependNewPosts(nextPagePostsArray) {
        let postsContainer = this.elementFinder.getPostsContainer();
        for (let i = nextPagePostsArray.length - 1; i >= 0; i--) {
            postsContainer.insertBefore(nextPagePostsArray[i], postsContainer.children[0]);
        }
    }

    insertLoadingElement() {
        let postsContainer = this.elementFinder.getPostsContainer();
        let loadingElement = this.elementGenerator.generateLoadingElement();
        postsContainer.appendChild(loadingElement);
    }

    prependLoadingElement() {
        let postsContainer = this.elementFinder.getPostsContainer();
        let loadingElement = this.elementGenerator.generateLoadingElement();
        postsContainer.insertBefore(loadingElement, postsContainer.children[0]);
    }

    removeLoadingElements() {
        for (let loadingElement of this.elementFinder.getLoadingElements()) {
            if (loadingElement != null) {
                loadingElement.parentElement.removeChild(loadingElement);
            }
        }
    }

    insertPostPostsInsertScript() {
        document.body.appendChild(this.BoardsScriptGenerator.GeneratePostPostsInsertScript());
    }

    restoreConsole() {
        let iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        window.console = iframe.contentWindow.console;
    }

    _formatPosts(nextPagePosts) {
        if (this.hidePostElements) {
            this.elementVisibilityUpdater.hideEachPostsElements();
            this.postsCompressionToggler.applyCompressionTogglingToPosts(nextPagePosts);
        }
    }

    _insertNextPageNumber(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        let postsContainer = this.elementFinder.getPostsContainer();
        let pageNoElement = this.elementGenerator.generatePageNoElement(nextPageNo);
        postsContainer.appendChild(pageNoElement);
    }

    _insertPreviousPageNumber(previousPageDocument) {
        let previousPageNo = this.pageInformationCollector.getPageNoFromDocument(previousPageDocument);
        let postsContainer = this.elementFinder.getPostsContainer();
        let pageNoElement = this.elementGenerator.generateTopPageNoElement(previousPageNo);
        postsContainer.insertBefore(pageNoElement, postsContainer.children[0]);
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

    _updateTopPageNavigator(nextPageDocument) {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(nextPageDocument);
        let currentNavigator = this.elementFinder.getTopPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }
}