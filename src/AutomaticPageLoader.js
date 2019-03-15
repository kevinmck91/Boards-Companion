export { AutomaticPageLoader }
import { ElementFinder } from "./ElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { PageInformationCollector } from "./PageInformationCollector.js";
import { PageUpdater } from "./PageUpdater.js";

class AutomaticPageLoader {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.elementGenerator = new ElementGenerator();
        this.isNextPagePageLoading = false;
        this.pageInformationCollector = new PageInformationCollector();
        this.isInitialPage = true;
        this.nextPageNo = 0;
        this.pageUpdater = new PageUpdater();
    }

    autoScrollPages() {
        window.addEventListener('scroll', () => {
            if (this.isPageLoadRequired()) {
                this.loadNextPage();
            }
        });
    }

    isPageLoadRequired() {
        return (this.IsBottomOfPage() && !this.isNextPagePageLoading && !this.isLastPage());
    }

    isLastPage() {
        return this.getNextPageNo() > this.pageInformationCollector.getMaxNoOfPages();
    }

    IsBottomOfPage() {
        return (window.innerHeight + window.scrollY) >= document.querySelector(".wrapper").offsetHeight;
    }

    loadNextPage() {
        this.isNextPagePageLoading = true;
        let httpRequest = new XMLHttpRequest();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                _this.appendNextPage(httpRequest);
                _this.isNextPagePageLoading = false;
            }
        }
        httpRequest.open('GET', this.pageInformationCollector.getNthPageUrl(this.getNextPageNo()), true);
        httpRequest.send();
        this.pageUpdater.insertLoadingElement();
    }

    getNextPageNo() {
        return this.pageInformationCollector.getCurrentPageNo() + 1;
    }

    appendNextPage(successfulHttpRequest) {
        let nextPageDocument = this.extractDocument(successfulHttpRequest);
        this.pageUpdater.appendNextPage(nextPageDocument);
    }

    extractDocument(successfulHttpRequest) {
        let loadedPageContent = successfulHttpRequest.responseText;
        let parser = new DOMParser();
        return parser.parseFromString(loadedPageContent, "text/html");
    }
}