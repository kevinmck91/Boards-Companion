"use strict";
export { toggleHeaderReduction };
import { getReducibleHeaderElements, getBreadCrumbs } from "./elementFinder.js";
import { hideElements, showElements } from "./elementVisibilityUpdater.js";

function toggleHeaderReduction() {
    window.onscroll = function () {
        if (isThread()) {
            if (isTopOfPage()) {
                restoreHeader();
            }
            else {
                reduceHeader();
            }
        }
    }
}


function isThread() {
    return window.location.href.includes("showthread");
}

function reduceHeader() {
    const breadcrumbs = getBreadCrumbs();
    breadcrumbs.style.top = '0px';
    hideElements(getReducibleHeaderElements());
}

function restoreHeader() {
    const breadcrumbs = getBreadCrumbs();
    breadcrumbs.style.top = '87px';
    showElements(getReducibleHeaderElements());
}

function isTopOfPage() {
    return window.scrollY == 0;
}