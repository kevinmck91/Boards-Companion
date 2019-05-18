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
    }

    appendNextPage(nextPageDocument) {
        this._insertNextPageNumber(nextPageDocument);
        let nextPagePosts = this.elementFinder.getPostsFromDocument(nextPageDocument);
        this._appendNewPosts(nextPagePosts);
        this._updateCurrentPageNavigator(nextPageDocument);
        this.removeLoadingElement();
        this.insertPostPostsInsertScript();
        this.configurationSettingExecutor.ConditionallyExecute(Settings.HidePostElementsEnabled, () => {
            this.elementVisibilityUpdater.hideEachPostsElements();
            this.postsCompressionToggler.applyCompressionTogglingToPosts(nextPagePosts);
        });
    }

    insertLoadingElement() {
        let postsContainer = this.elementFinder.getPostsContainer();
        let loadingElement = this.elementGenerator.generateLoadingElement();
        postsContainer.appendChild(loadingElement);
    }

    insertPostPostsInsertScript() {
        document.body.appendChild(this.BoardsScriptGenerator.GeneratePostPostsInsertScript());
    }

    removeLoadingElement() {
        let loadingElement = document.querySelector('.loading');
        if (loadingElement != null) {
            loadingElement.parentElement.removeChild(loadingElement);
        }
    }

    restoreConsole() {
        let iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        window.console = iframe.contentWindow.console;
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

    _updateCurrentPageNavigator(nextPageDocument) {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(nextPageDocument);
        let currentNavigator = this.elementFinder.getBottomPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }
}