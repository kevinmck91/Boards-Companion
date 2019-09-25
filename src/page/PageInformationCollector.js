export { PageInformationCollector };
import { HeaderElementFinder } from "../finders/HeaderElementFinder.js";
import { NavigationElementFinder } from "../finders/NavigationElementFinder.js";

class PageInformationCollector {

    constructor() {
        this.headerElementFinder = new HeaderElementFinder();
        this.navigationElementFinder = new NavigationElementFinder();
    }

    getNextPageUrl() {
        const navigator = this.navigationElementFinder.getBottomPageNavigator();
        const nextPageElement = this.navigationElementFinder.getNextPageElementFromNavigator(navigator);
        return this._getLinkFromPageLinkElement(nextPageElement);
    }

    getPreviousPageUrl() {
        const navigator = this.navigationElementFinder.getTopPageNavigator();
        const previousPageElement = this.navigationElementFinder.getPreviousPageElementFromNavigator(navigator);
        return this._getLinkFromPageLinkElement(previousPageElement);
    }

    isThreadPage() {
        return window.location.href.indexOf('showthread') != -1;
    }

    isForumHomePage() {
        return window.location.href.indexOf('forumdisplay.php') != -1;
    }

    getMaxNoOfPages() {
        const navigator = this.navigationElementFinder.getTopPageNavigator();
        return this._parseY(this._getPageXofY(navigator));
    }

    getBottomNavigatorPageNo() {
        const navigator = this.navigationElementFinder.getBottomPageNavigator();
        return this._parseX(this._getPageXofY(navigator));
    }

    isHeaderNontransparent() {
        return this.headerElementFinder.getBreadCrumbs().style.opacity != '0';
    }

    getPageNoFromDocument(htmlDocument) {
        let navigator = this.navigationElementFinder.getTopPageNavigatorFromDocument(htmlDocument);
        return this._parseX(this._getPageXofY(navigator));
    }

    getNextPageNo() {
        return this.getBottomNavigatorPageNo() + 1;
    }

    isBottomOfPage() {
        return (window.innerHeight + window.scrollY) >= document.querySelector(".wrapper").offsetHeight;
    }

    isLastPage() {
        return this.getNextPageNo() > this.getMaxNoOfPages();
    }

    isFirstPageOfTopNavigator() {
        const navigator = this.navigationElementFinder.getTopPageNavigator();
        return this._parseX(this._getPageXofY(navigator)) == 1;
    }

    isTopOfPage() {
        return window.scrollY == 0;
    }

    getDocumentHeight() {
        return document.documentElement.scrollHeight;
    }

    getCurrentYCoordinate() {
        return window.scrollY;
    }

    isUserSignedOut() {
        const searchPanel = this.headerElementFinder.getSearchPanel();
        return searchPanel.outerHTML.indexOf('Login') > 0;
    }

    _getPageXofY(navigator) {
        return navigator.querySelector('.vbmenu_control').textContent;
    }

    _parseY(pageXofY) {
        pageXofY = pageXofY.trim();
        let pageXOfYSplit = Array.from(pageXofY.split(' '));
        let noOfPages = pageXOfYSplit[pageXOfYSplit.length - 1];
        return parseInt(noOfPages);
    }

    _parseX(pageXofY) {
        pageXofY = pageXofY.trim();
        let pageXOfYSplit = Array.from(pageXofY.split(' '));
        let x = pageXOfYSplit[1];
        return parseInt(x);
    }

    _getLinkFromPageLinkElement(pageLinkElement) {
        let elementHref = pageLinkElement.querySelector("a").getAttribute("href");
        let paredIdentifier = elementHref.replace("showthread.php", "");
        paredIdentifier = paredIdentifier.replace("forumdisplay.php", "");
        return window.location.origin + window.location.pathname + paredIdentifier;
    }
}