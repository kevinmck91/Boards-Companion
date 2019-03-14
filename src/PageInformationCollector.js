"use strict";
export { PageInformationCollector };
import { ElementFinder } from "./ElementFinder.js";

class PageInformationCollector {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    getNextPageUrl(pageNo) {
        return window.location.href + '&page=' + pageNo;
    }

    getMaxNoOfPages() {
        const navigator = this.elementFinder.getPageNavigator();
        const pageXOfY = navigator.querySelector('.vbmenu_control').textContent;
        return this.parsePageXOfY(pageXOfY);
    }

    parsePageXOfY(pageXofY) {
        pageXofY = pageXofY.trim();
        let pageXOfYSplit = Array.from(pageXofY.split(' '));
        let noOfPages = pageXOfYSplit[pageXOfYSplit.length - 1];
        return parseInt(noOfPages);
    }

    isHeaderRestored() {
        return this.elementFinder.getBreadCrumbs().style.top == '87px';
    }
}