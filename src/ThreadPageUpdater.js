export { ThreadPageUpdater }
import { ElementFinder } from "./ElementFinder.js";

class ThreadPageUpdater {
    constructor() {
        this.elementFinder = new ElementFinder();
    }

    appendElement(element) {
        let postsContainer = this.elementFinder.getPostsContainer();
        postsContainer.appendChild(element);
    }

    appendElements(elements) {
        let postsContainer = this.elementFinder.getPostsContainer();
        for (let element of elements) {
            postsContainer.appendChild(element);
        }
    }

    prependElement(element) {
        let postsContainer = this.elementFinder.getPostsContainer();
        postsContainer.insertBefore(element, postsContainer.children[0]);
    }

    prependElements(elements) {
        let postsContainer = this.elementFinder.getPostsContainer();
        for (let i = elements.length - 1; i >= 0; i--) {
            postsContainer.insertBefore(elements[i], postsContainer.children[0]);
        }
    }

    updateBottomPageNavigator(navigator) {
        let currentNavigator = this.elementFinder.getBottomPageNavigator();
        currentNavigator.parentNode.replaceChild(navigator, currentNavigator);
    }
}