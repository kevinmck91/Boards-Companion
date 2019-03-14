export { AutomaticPageLoader }
import { ElementFinder } from "./ElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { PageInformationCollector } from "./PageInformationCollector.js";

class AutomaticPageLoader {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.elementGenerator = new ElementGenerator();
        this.isNextPagePageLoading = false;
        this.pageInformationCollector = new PageInformationCollector();
        this.pageNo = 2;
    }

    autoScrollPages() {
        window.addEventListener('scroll', () => {
            if (this.isPageLoadRequired()) {
                this.loadNextPage();
            }
        });
    }

    isPageLoadRequired() {
        return this.IsBottomOfPage() && !this.isNextPagePageLoading && !this.isLastPage();
    }

    isLastPage() {
        return this.pageNo > this.pageInformationCollector.getMaxNoOfPages();
    }

    IsBottomOfPage() {
        return (window.innerHeight + window.scrollY) >= document.querySelector(".wrapper").offsetHeight;;
    }

    loadNextPage() {
        this.isNextPagePageLoading = true;
        let httpRequest = new XMLHttpRequest();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                let nextPagePosts = _this.extractPosts(httpRequest);
                _this.appendNextPage(nextPagePosts);
                _this.pageNo++;
                _this.isNextPagePageLoading = false;
            }
        }
        httpRequest.open('GET', this.pageInformationCollector.getNextPageUrl(this.pageNo), true);
        httpRequest.send();
        this.insertLoadingElement();
    }

    appendNextPage(nextPagePosts) {
        this.insertNextPageNumber();
        this.appendNewPosts(nextPagePosts);
        this.removeLoadingElement();
        this.elementVisibilityUpdater.hideEachPostsElements();
    }

    extractPosts(successfulHttpRequest) {
        let nextPageDocument = this.extractDocument(successfulHttpRequest);
        return this.elementFinder.getDocumentPosts(nextPageDocument);
    }

    appendNewPosts(nextPagePostsArray) {
        let postsContainer = this.elementFinder.getPostsContainer();
        for (let post of nextPagePostsArray) {
            postsContainer.appendChild(post);
        }
    }

    extractDocument(successfulHttpRequest) {
        let loadedPageContent = successfulHttpRequest.responseText;
        let parser = new DOMParser();
        return parser.parseFromString(loadedPageContent, "text/html");
    }

    insertLoadingElement() {
        let postsContainer = this.elementFinder.getPostsContainer();
        let loadingElement = this.elementGenerator.generateLoadingElement();
        postsContainer.appendChild(loadingElement);
    }

    removeLoadingElement() {
        let loadingElement = document.querySelector('.loading');
        loadingElement.parentElement.removeChild(loadingElement);
    }

    insertNextPageNumber() {
        let postsContainer = this.elementFinder.getPostsContainer();
        let pageNoElement = this.elementGenerator.generatePageNoElement(this.pageNo);
        postsContainer.appendChild(pageNoElement);
    }
}