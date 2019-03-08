"use strict";
export { toggleHeaderReduction };
import { getReducibleHeaderElements, getBreadCrumbs } from "./elementFinder.js";
import { hideElements, showElements } from "./elementVisibilityUpdater.js";

function toggleHeaderReduction(){
    window.onscroll = function() {
        if(isTopOfPage()){
            restoreHeader();
        }
        else{
            reduceHeader();
        }
    }
}

function reduceHeader(){
    const breadcrumbs = getBreadCrumbs();
    breadcrumbs.style.top = '0px';
    hideElements(getReducibleHeaderElements());
}

function restoreHeader(){
    const breadcrumbs = getBreadCrumbs();
    breadcrumbs.style.top = '87px';
    showElements(getReducibleHeaderElements());
}

function isTopOfPage(){
    return window.scrollY == 0;
}