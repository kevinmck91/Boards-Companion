"use strict";
export { ElementVisibilityUpdater };
import { ElementFinder } from "./ElementFinder.js";

class ElementVisibilityUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    hideEachPostsElements() {
        this._hideEachPostsAvatarInfo();
        this._hideEachPostsFooter();
    }

    hidePostElements(post) {
        this._hidePostAvatarInfo(post);
        this._hidePostFooter(post);
    }

    showPostElements(post) {
        this._showPostAvatarInfo(post);
        this._showPostFooter(post);
    }

    hideWelcomeNotice() {
        const welcomeNotice = this.elementFinder.searchForWelcomeNotice();
        if (welcomeNotice != null)
            this.hideElement(welcomeNotice);
    }

    hideElement(element) {
        element.style.display = 'none';
    }

    hideElements(elementArray) {
        for (let element of elementArray) {
            this.hideElement(element);
        }
    }

    transparentizeElements(elements) {
        for (let element of elements) {
            this.transparentizeElement(element);
        }
    }

    transparentizeElement(element) {
        element.style.opacity = '0';
    }

    untransparentizeElements(elements) {
        for (let element of elements) {
            this.untransparentizeElement(element);
        }
    }

    untransparentizeElement(element) {
        element.style.opacity = '1';
    }

    showElements(elementArray) {
        for (let element of elementArray) {
            this.showElement(element);
        }
    }

    showElement(element) {
        element.style.display = '';
    }

    _hideEachPostsAvatarInfo() {
        for (let post of this.elementFinder.getAllPosts()) {
            this.hideElements(this.elementFinder.getAvatarInfoElementsFromPost(post));
        }
    }

    _hidePostAvatarInfo(post) {
        this.hideElements(this.elementFinder.getAvatarInfoElementsFromPost(post));
    }

    _showPostAvatarInfo(post) {
        this.showElements(this.elementFinder.getAvatarInfoElementsFromPost(post));
    }

    _hideEachPostsFooter() {
        for (let post of this.elementFinder.getAllPosts()) {
            this.hideElement(this.elementFinder.getFooterElementFromPost(post));
        }
    }

    _hidePostFooter(post) {
        this.hideElement(this.elementFinder.getFooterElementFromPost(post));
    }

    _showPostFooter(post) {
        this.showElement(this.elementFinder.getFooterElementFromPost(post));
    }
}