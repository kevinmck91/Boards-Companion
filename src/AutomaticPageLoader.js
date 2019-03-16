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
            if (this._isPageLoadRequired()) {
                this._loadNextPage();
            }
        });
    }

    _isPageLoadRequired() {
        return (this._IsBottomOfPage() && !this.isNextPagePageLoading && !this._isLastPage());
    }

    _isLastPage() {
        return this._getNextPageNo() > this.pageInformationCollector.getMaxNoOfPages();
    }

    _IsBottomOfPage() {
        return (window.innerHeight + window.scrollY) >= document.querySelector(".wrapper").offsetHeight;
    }

    _loadNextPage() {
        this.isNextPagePageLoading = true;
        let httpRequest = new XMLHttpRequest();
        let _this = this;
        httpRequest.onload = function () {
            if (this.status == 200) {
                _this._appendNextPage(httpRequest);
                _this.isNextPagePageLoading = false;
            }
        }
        httpRequest.open('GET', this._getNthPageUrl(this._getNextPageNo()), true);
        httpRequest.send();
        this.pageUpdater.insertLoadingElement();
    }

    _getNextPageNo() {
        return this.pageInformationCollector.getCurrentPageNo() + 1;
    }

    _appendNextPage(successfulHttpRequest) {
        let nextPageDocument = this._extractDocument(successfulHttpRequest);
        this.pageUpdater.appendNextPage(nextPageDocument);
    }

    _extractDocument(successfulHttpRequest) {
        let loadedPageContent = successfulHttpRequest.responseText;
        let parser = new DOMParser();
        return parser.parseFromString(loadedPageContent, "text/html");
    }

    _getNthPageUrl(pageNo) {
        let url = window.location.href;
        if (!this.pageInformationCollector.isFirstPageInThread(url)) {
            url = url.replace(/&page=\d+/, '');
            return url + '&page=' + pageNo;
        }
        else {
            return url + '&page=' + pageNo;
        }
    }
}