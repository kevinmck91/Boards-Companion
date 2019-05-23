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
        this.isPageLoading = false;
        this.pageInformationCollector = new PageInformationCollector();
        this.isInitialPage = true;
        this.nextPageNo = 0;
        this.pageUpdater = new PageUpdater();
    }

    autoScrollPages() {
        this._conditionallyLoadPage();
        window.addEventListener('scroll', () => {
            this._conditionallyLoadPage();
        });
    }

    _conditionallyLoadPage() {
        if (this._isPageLoadRequired()) {
            if (this._isNextPageLoadRequired()) {
                this._loadNextPage();
            }
            else {
                this._loadPreviousPage();
            }
        }
    }

    _isPageLoadRequired() {
        return this.pageInformationCollector.isThreadPage() &&
            (this._isNextPageLoadRequired() || this._isPreviousPageLoadRequired()) &&
            !this.isPageLoading;
    }

    _isNextPageLoadRequired() {
        return this.pageInformationCollector.isBottomOfPage() && !this.pageInformationCollector.isLastPage();
    }

    _isPreviousPageLoadRequired() {
        return this.pageInformationCollector.isTopOfPage() && !this.pageInformationCollector.isFirstPage();
    }

    _loadNextPage() {
        this.isPageLoading = true;
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', this.pageInformationCollector.getNextPageUrl(), true);
        httpRequest.send();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                _this._appendNextPage(httpRequest);
                _this.isPageLoading = false;
            }
        }
        this.pageUpdater.insertLoadingElement();
    }

    _loadPreviousPage() {
        this.isPageLoading = true;
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', this.pageInformationCollector.getPreviousPageUrl(), true);
        httpRequest.send();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                _this._prependPreviousPage(httpRequest);
                _this.isPageLoading = false;
            }
        }
        this.pageUpdater.prependLoadingElement();
    }

    _appendNextPage(successfulHttpRequest) {
        let nextPageDocument = this._extractDocument(successfulHttpRequest);
        this.pageUpdater.appendNextPage(nextPageDocument);
    }

    _prependPreviousPage(successfulHttpRequest) {
        let previousPageDocument = this._extractDocument(successfulHttpRequest);
        this.pageUpdater.prependPreviousPage(previousPageDocument);
    }

    _extractDocument(successfulHttpRequest) {
        let loadedPageContent = successfulHttpRequest.responseText;
        let parser = new DOMParser();
        return parser.parseFromString(loadedPageContent, "text/html");
    }

}