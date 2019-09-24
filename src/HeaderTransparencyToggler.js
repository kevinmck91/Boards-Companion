export { HeaderTransparencyToggler };
import { HeaderElementFinder } from "./finders/HeaderElementFinder.js";
import { ElementVisibilityUpdater } from "./element-visibility/ElementVisibilityUpdater.js";

class HeaderTransparencyToggler {

    constructor() {
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.headerElementFinder = new HeaderElementFinder();
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
        for (let headerElement of this.headerElementFinder.getHeaderElements()) {
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
        this.elementVisibilityUpdater.transparentizeElements(this.headerElementFinder.getHeaderElements());

    }

    _untransparentizeHeader() {
        this.elementVisibilityUpdater.untransparentizeElements(this.headerElementFinder.getHeaderElements());
    }

    _isTopOfPage() {
        return window.scrollY == 0;
    }
}