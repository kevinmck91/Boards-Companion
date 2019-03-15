export { PageUpdater };
import { ElementFinder } from "./ElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { PageInformationCollector } from "./PageInformationCollector.js";

class PageUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.elementGenerator = new ElementGenerator();
        this.pageInformationCollector = new PageInformationCollector();
    }

    appendNextPage(nextPageDocument) {
        this.insertNextPageNumber(nextPageDocument);
        let nextPagePosts = this.elementFinder.getPostsFromDocument(nextPageDocument);
        this.appendNewPosts(nextPagePosts);
        this.updateCurrentPageNavigator(nextPageDocument);
        this.removeLoadingElement();
        this.elementVisibilityUpdater.hideEachPostsElements();
    }

    insertLoadingElement() {
        let postsContainer = this.elementFinder.getPostsContainer();
        let loadingElement = this.elementGenerator.generateLoadingElement();
        postsContainer.appendChild(loadingElement);
    }

    removeLoadingElement() {
        let loadingElement = document.querySelector('.loading');
        if (loadingElement != null) {
            loadingElement.parentElement.removeChild(loadingElement);
        }
    }

    insertNextPageNumber(nextPageDocument) {
        let nextPageNo = this.pageInformationCollector.getPageNoFromDocument(nextPageDocument);
        let postsContainer = this.elementFinder.getPostsContainer();
        let pageNoElement = this.elementGenerator.generatePageNoElement(nextPageNo);
        postsContainer.appendChild(pageNoElement);
    }

    appendNewPosts(nextPagePostsArray) {
        let postsContainer = this.elementFinder.getPostsContainer();
        for (let post of nextPagePostsArray) {
            postsContainer.appendChild(post);
        }
    }

    updateCurrentPageNavigator(nextPageDocument) {
        let navigator = this.elementFinder.getTopPageNavigatorFromDocument(nextPageDocument);
        this.updateBottomNavigator(navigator);
    }

    updateBottomNavigator(newNavigator) {
        let currentNavigator = this.elementFinder.getBottomPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }
}