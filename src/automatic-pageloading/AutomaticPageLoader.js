export { AutomaticPageLoader }
import { PageInformationCollector } from "../page/PageInformationCollector.js";
import { LoadingElementUpdater } from "./LoadingElementUpdater.js";
import { ThreadPageAppender } from "./ThreadPageAppender.js";
import { ThreadPagePrepender } from "./ThreadPagePrepender.js";
import { ForumHomepageAppender } from "./ForumHomepageAppender.js";
import { ForumHomepagePrepender } from "./ForumHomepagePrepender.js";

class AutomaticPageLoader {

    constructor() {
        this.isPageLoading = false;
        this.pageInformationCollector = new PageInformationCollector();
        this.loadingElementUpdater = new LoadingElementUpdater();
        this.threadPageAppender = new ThreadPageAppender();
        this.threadPagePrepender = new ThreadPagePrepender();
        this.forumHomepageAppender = new ForumHomepageAppender();
        this.hidePostElements = true;
        this.ForumHomepagePrepender = new ForumHomepagePrepender();
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
                        this._loadNextThreadPage();
                    } else if (this.pageInformationCollector.isForumHomePage()) {
                        this._loadNextForumPage();
                    }
                }
                else if (this.pageInformationCollector.isThreadPage()) {
                    this._loadPreviousThreadPage();
                }
                else if (this.pageInformationCollector.isForumHomePage()) {
                    this._loadPreviousForumPage();
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

    _loadNextThreadPage() {
        this.isPageLoading = true;
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', this.pageInformationCollector.getNextPageUrl(), true);
        httpRequest.send();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                _this._appendNextThreadPage(httpRequest);
                _this.isPageLoading = false;
            }
        }
        this.loadingElementUpdater.insertThreadPageLoadingElement();
    }

    _loadPreviousThreadPage() {
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

    _loadPreviousForumPage() {
        this.isPageLoading = true;
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', this.pageInformationCollector.getPreviousPageUrl(), true);
        httpRequest.send();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                _this._prependPreviousForumPage(httpRequest);
                _this.isPageLoading = false;
            }
        }
        this.loadingElementUpdater.prependForumPageLoadingElement();
    }

    _appendNextThreadPage(successfulHttpRequest) {
        let nextPageDocument = this._extractDocument(successfulHttpRequest);
        this.threadPageAppender.appendNextPage(nextPageDocument, this.hidePostElements);
    }

    _prependPreviousThreadPage(successfulHttpRequest) {
        let previousPageDocument = this._extractDocument(successfulHttpRequest);
        this.threadPagePrepender.prependPage(previousPageDocument, this.hidePostElements);
    }

    _appendNextForumPage(successfulHttpRequest) {
        let previousPageDocument = this._extractDocument(successfulHttpRequest);
        this.forumHomepageAppender.appendNextPage(previousPageDocument);
    }

    _prependPreviousForumPage(successfulHttpRequest) {
        let previousPageDocument = this._extractDocument(successfulHttpRequest);
        this.ForumHomepagePrepender.prependPage(previousPageDocument);
    }

    _extractDocument(successfulHttpRequest) {
        let loadedPageContent = successfulHttpRequest.responseText;
        let parser = new DOMParser();
        return parser.parseFromString(loadedPageContent, "text/html");
    }

}