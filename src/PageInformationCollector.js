"use strict";
export { PageInformationCollector };
import { ElementFinder } from "./ElementFinder.js";

class PageInformationCollector {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    getNextPageUrl(nextPageNo) {
        let url = window.location.href;
        if (!this.isFirstPageInThread(url)) {
            url = url.replace(/&page=\d+/, '');
            return url + '&page=' + nextPageNo;
        }
        else {
            return url + '&page=' + nextPageNo;
        }
    }

    isFirstPageInThread(url) {
        return url.indexOf('&page=') == -1
    }

    getMaxNoOfPages() {
        const navigator = this.elementFinder.getTopPageNavigator();
        return this.parseY(this.getPageXofY(navigator));
    }

    getInitialPageNo() {
        const navigator = this.elementFinder.getTopPageNavigator();
        return this.parseX(this.getPageXofY(navigator));
    }

    getPageXofY(navigator) {
        return navigator.querySelector('.vbmenu_control').textContent;
    }

    parseY(pageXofY) {
        pageXofY = pageXofY.trim();
        let pageXOfYSplit = Array.from(pageXofY.split(' '));
        let noOfPages = pageXOfYSplit[pageXOfYSplit.length - 1];
        return parseInt(noOfPages);
    }

    parseX(pageXofY) {
        pageXofY = pageXofY.trim();
        let pageXOfYSplit = Array.from(pageXofY.split(' '));
        let x = pageXOfYSplit[1];
        return parseInt(x);
    }

    isHeaderRestored() {
        return this.elementFinder.getBreadCrumbs().style.top == '87px';
    }
}