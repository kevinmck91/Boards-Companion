export { ThreadPageUpdater }
import { PostElementFinder } from "../finders/PostElementFinder.js";

class ThreadPageUpdater {

    constructor() {
        this.postElementFinder = new PostElementFinder();
    }

    appendElement(element) {
        let postsContainer = this.postElementFinder.getPostsContainer();
        postsContainer.appendChild(element);
    }

    appendElements(elements) {
        let postsContainer = this.postElementFinder.getPostsContainer();
        for (let element of elements) {
            postsContainer.appendChild(element);
        }
    }

    prependElement(element) {
        let postsContainer = this.postElementFinder.getPostsContainer();
        postsContainer.insertBefore(element, postsContainer.children[0]);
    }

    prependElements(elements) {
        let postsContainer = this.postElementFinder.getPostsContainer();
        for (let i = elements.length - 1; i >= 0; i--) {
            postsContainer.insertBefore(elements[i], postsContainer.children[0]);
        }
    }
}