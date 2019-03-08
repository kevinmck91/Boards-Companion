"use strict";
export { hideWelcomeNotice, hideAvatarInfo, hidePostFooter, showElements, hideElements };
import { getAllPosts, getAvatarInfoElements, getFooterElement, getWelcomeNotice } from "./elementFinder.js";

function hideWelcomeNotice() {
    const welcomeNotice = getWelcomeNotice();
    if (welcomeNotice != null) 
        hideElement(welcomeNotice);
}

function hideAvatarInfo() {
    for (let post of getAllPosts()) {
        hideElements(getAvatarInfoElements(post));
    }
}

function hidePostFooter() {
    for (let post of getAllPosts()) {
        hideElement(getFooterElement(post));
    }
}

function hideElement(element) {
    element.style.display = 'none';
}

function hideElements(elementArray) {
    for (let element of elementArray) {
        hideElement(element);
    }
}

function showElements(elementArray){
    for(let element of elementArray){
        showElement(element);
    }
}

function showElement(element){
    element.style.display = '';
}