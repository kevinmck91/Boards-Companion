"use strict";
export { PageInformationCollector };
import { ElementFinder } from "./ElementFinder.js";

class PageInformationCollector {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    getNextPageUrl() {
        const navigator = this.elementFinder.getBottomPageNavigator();
        const nextPageElement = this.elementFinder.getNextPageElementFromNavigator(navigator);
        return this._getLinkFromElement(nextPageElement);
    }

    isThreadPage() {
        return window.location.href.indexOf('showthread') != -1;
    }

    getMaxNoOfPages() {
        const navigator = this.elementFinder.getTopPageNavigator();
        return this._parseY(this._getPageXofY(navigator));
    }

    getCurrentPageNo() {
        const navigator = this.elementFinder.getBottomPageNavigator();
        return this._parseX(this._getPageXofY(navigator));
    }

    isHeaderRestored() {
        return this.elementFinder.getBreadCrumbs().style.top == '87px';
    }

    getPageNoFromDocument(htmlDocument) {
        let navigator = this.elementFinder.getTopPageNavigatorFromDocument(htmlDocument);
        return this._parseX(this._getPageXofY(navigator));
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

    _getLinkFromElement(pageLinkElement) {
        let elementHref = pageLinkElement.querySelector("a").getAttribute("href");
        let paredIdentifier = elementHref.replace("showthread.php", "");
        return window.location.origin + window.location.pathname + paredIdentifier;
    }
}