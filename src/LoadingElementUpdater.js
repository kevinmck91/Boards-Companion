export { LoadingElementUpdater }
import { ElementFinder } from "./ElementFinder.js";
import { ElementGenerator } from "./ElementGenerator.js"

class LoadingElementUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementGenerator = new ElementGenerator();
    }

    insertThreadPageLoadingElement() {
        let postsContainer = this.elementFinder.getPostsContainer();
        let loadingElement = this.elementGenerator.generateLoadingElement();
        postsContainer.appendChild(loadingElement);
    }

    //todo refactor this as is repeated functionality
    insertForumPageLoadingElement() {
        let loadingElement = this.elementGenerator.generateLoadingElement();
        let threadsContainersContainer = this.elementFinder.getThreadsContainersContainer();
        let lastElementInThreadsContainersContainer = this.elementFinder.getLastElementInThreadsContainersContainer();
        threadsContainersContainer.insertBefore(loadingElement, lastElementInThreadsContainersContainer);
    }

    prependThreadPageLoadingElement() {
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
}