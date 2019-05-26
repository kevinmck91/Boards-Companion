export { AutomaticPageLoader }
import { PageInformationCollector } from "./PageInformationCollector.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { NextPageAppender } from "./NextPageAppender.js";
import { PreviousPageAppender } from "./PreviousPageAppender.js";

class AutomaticPageLoader {

    constructor() {
        this.isPageLoading = false;
        this.pageInformationCollector = new PageInformationCollector();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.nextPageAppender = new NextPageAppender();
        this.previousPageAppender = new PreviousPageAppender();
        this.hidePostElements = true;
    }

    autoScrollPages(hidePostElements) {
        this.hidePostElements = hidePostElements;
        this._conditionallyLoadPage();
        window.addEventListener('scroll', () => {
            this._conditionallyLoadPage();
        });
    }

    _conditionallyLoadPage() {
        try {
            if (this._isPageLoadRequired()) {
                if (this._isNextPageLoadRequired()) {
                    if (this.pageInformationCollector.isThreadPage()) {
                        this._loadNextPage();
                    } else if (this.pageInformationCollector.isForumHomePage()) {
                        this._loadNextForumPage();
                    }
                }
                else if (this.pageInformationCollector.isThreadPage()) {
                    this._loadPreviousPage();
                }
            }
        } catch (error) {
            this.isPageLoading = false;
            console.error("Error loading new page: " + error.stack);
        }
    }

    _isPageLoadRequired() {
        return (this._isNextPageLoadRequired() || this._isPreviousPageLoadRequired()) &&
            !this.isPageLoading;
    }

    _isNextPageLoadRequired() {
        return this.pageInformationCollector.isBottomOfPage() && !this.pageInformationCollector.isLastPage();
    }

    _isPreviousPageLoadRequired() {
        return this.pageInformationCollector.isTopOfPage() && !this.pageInformationCollector.isFirstPageOfTopNavigator();
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
        this.loadingElementUpdater.insertThreadPageLoadingElement();
    }

    _loadPreviousPage() {
        this.isPageLoading = true;
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', this.pageInformationCollector.getPreviousPageUrl(), true);
        httpRequest.send();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                _this._prependPreviousThreadPage(httpRequest);
                _this.isPageLoading = false;
            }
        }
        this.loadingElementUpdater.prependThreadPageLoadingElement();
    }

    _loadNextForumPage() {
        this.isPageLoading = true;
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', this.pageInformationCollector.getNextPageUrl(), true);
        httpRequest.send();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                _this._appendNextForumPage(httpRequest);
                _this.isPageLoading = false;
            }
        }
        this.loadingElementUpdater.insertForumPageLoadingElement();
    }

    _appendNextPage(successfulHttpRequest) {
        let nextPageDocument = this._extractDocument(successfulHttpRequest);
        this.nextPageAppender.appendNextPage(nextPageDocument, this.hidePostElements);
    }

    _prependPreviousThreadPage(successfulHttpRequest) {
        let previousPageDocument = this._extractDocument(successfulHttpRequest);
        this.previousPageAppender.prependPreviousThreadPage(previousPageDocument, this.hidePostElements);
    }

    _appendNextForumPage(successfulHttpRequest) {
        let previousPageDocument = this._extractDocument(successfulHttpRequest);
        this.nextPageAppender.appendNextForumPage(previousPageDocument);
    }

    _extractDocument(successfulHttpRequest) {
        let loadedPageContent = successfulHttpRequest.responseText;
        let parser = new DOMParser();
        return parser.parseFromString(loadedPageContent, "text/html");
    }

}