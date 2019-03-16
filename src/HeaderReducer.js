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
            if (this._isThread()) {
                if (this._isTopOfPage()) {
                    this._restoreHeader();
                }
                else {
                    this._reduceHeader();
                }
            }
        });
    }

    _isThread() {
        return window.location.href.includes("showthread");
    }

    _reduceHeader() {
        const breadcrumbs = this.elementFinder.getBreadCrumbs();
        breadcrumbs.style.top = '0px';
        this.elementVisibilityUpdater.hideElements(this.elementFinder.getReducibleHeaderElements());
    }

    _restoreHeader() {
        const breadcrumbs = this.elementFinder.getBreadCrumbs();
        breadcrumbs.style.top = '87px';
        this.elementVisibilityUpdater.showElements(this.elementFinder.getReducibleHeaderElements());
    }

    _isTopOfPage() {
        return window.scrollY == 0;
    }
}