"use strict";
export { HeaderReducer };
import { ElementFinder } from "./ElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";

class HeaderReducer {

    constructor() {
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.elementFinder = new ElementFinder();
    }

    toggleHeaderReduction() {
        window.addEventListener('scroll', () => {
            if (this.isThread()) {
                if (this.isTopOfPage()) {
                    this.restoreHeader();
                }
                else {
                    this.reduceHeader();
                }
            }
        });
    }

    processScrollEvent() {
        if (this.isThread()) {
            if (this.isTopOfPage()) {
                this.restoreHeader();
            }
            else {
                this.reduceHeader();
            }
        }
    }

    isThread() {
        return window.location.href.includes("showthread");
    }

    reduceHeader() {
        const breadcrumbs = this.elementFinder.getBreadCrumbs();
        breadcrumbs.style.top = '0px';
        this.elementVisibilityUpdater.hideElements(this.elementFinder.getReducibleHeaderElements());
    }

    restoreHeader() {
        const breadcrumbs = this.elementFinder.getBreadCrumbs();
        breadcrumbs.style.top = '87px';
        this.elementVisibilityUpdater.showElements(this.elementFinder.getReducibleHeaderElements());
    }

    isTopOfPage() {
        return window.scrollY == 0;
    }
}