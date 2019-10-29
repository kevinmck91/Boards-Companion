export { ForumHomepageElementFinder };
import { PageInformationCollector } from "../page/PageInformationCollector.js";

class ForumHomepageElementFinder {

    constructor() {
        this.pageInformationCollector = new PageInformationCollector();
    }

    getElementToAppend() {
        const threadslistElements = document.querySelectorAll('#threadslist');
        return threadslistElements[threadslistElements.length - 1];
    }

    getElementToPrepend() {
        return document.querySelectorAll('#threadslist')[0];
    }

    getThreadsContainerFromDocument(htmlDocument) {
        return this.getSignedInThreadsContainerFromDocument(htmlDocument);
    }

    getSignedInThreadsContainerFromDocument(htmlDocument) {
        return htmlDocument.getElementById("threadslist");
    }

    getSignedOutThreadsContainerFromDocument(htmlDocument) {
        return htmlDocument.querySelectorAll(".threadslist-wrapper")[0];
    }

}