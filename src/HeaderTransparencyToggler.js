"use strict";
export { HeaderTransparencyToggler };
import { ElementFinder } from "./ElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";

class HeaderTransparencyToggler {

    constructor() {
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.elementFinder = new ElementFinder();
    }

    enableToggling() {
        this._transparentizeHeaderOnScroll();
        this._untransparentizeOnMouseOver();
    }

    _transparentizeHeaderOnScroll() {
        window.addEventListener('scroll', () => {
            if (this._isThread()) {
                if (this._isTopOfPage()) {
                    this._untransparentizeHeader();
                }
                else {
                    this._transparentizeHeader();
                }
            }
        });
    }

    _untransparentizeOnMouseOver() {
        for (let headerElement of this.elementFinder.getHeaderElements()) {
            headerElement.addEventListener('mouseover', () => {
                if (this._isThread()) {
                    this._untransparentizeHeader();
                }
            });
        }
    }

    _isThread() {
        return window.location.href.includes("showthread");
    }

    _transparentizeHeader() {
        this.elementVisibilityUpdater.transparentizeElements(this.elementFinder.getHeaderElements());

    }

    _untransparentizeHeader() {
        this.elementVisibilityUpdater.untransparentizeElements(this.elementFinder.getHeaderElements());
    }

    _isTopOfPage() {
        return window.scrollY == 0;
    }
}