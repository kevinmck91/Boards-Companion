"use strict";
export { ElementVisibilityUpdater };
import { ElementFinder } from "./ElementFinder.js";

class ElementVisibilityUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    hideEachPostsElements() {
        this.hideWelcomeNotice();
        this.hideAvatarInfo();
        this.hidePostFooter();
    }

    hideWelcomeNotice() {
        const welcomeNotice = this.elementFinder.getWelcomeNotice();
        if (welcomeNotice != null)
            this.hideElement(welcomeNotice);
    }

    hideAvatarInfo() {
        for (let post of this.elementFinder.getAllPosts()) {
            this.hideElements(this.elementFinder.getAvatarInfoElementsFromPost(post));
        }
    }

    hidePostFooter() {
        for (let post of this.elementFinder.getAllPosts()) {
            this.hideElement(this.elementFinder.getFooterElement(post));
        }
    }

    hideElement(element) {
        element.style.display = 'none';
    }

    hideElements(elementArray) {
        for (let element of elementArray) {
            this.hideElement(element);
        }
    }

    showElements(elementArray) {
        for (let element of elementArray) {
            this.showElement(element);
        }
    }

    showElement(element) {
        element.style.display = '';
    }
}