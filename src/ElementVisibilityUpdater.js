"use strict";
export { ElementVisibilityUpdater };
import { ElementFinder } from "./finders/ElementFinder.js";
import { AvatarDetailsFinder } from "./finders/AvatarDetailsFinder.js";

class ElementVisibilityUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.avatarDetailsFinder = new AvatarDetailsFinder();
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
        try {
            element.style.display = 'none';
        } catch (error) {
            console.error("Failed to hide element: " + error, error.stack);
        }
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

    removeWhitespaceElements(element) {
        element.innerHTML = element.innerHTML.replace(/\&nbsp;/g, '');
        element.innerHTML = element.innerHTML.replace(/<br>/g, '');
    }

    _hideEachPostsAvatarInfo() {
        for (let post of this.elementFinder.getAllPosts()) {
            this._hidePostAvatarInfo(post);
        }
    }

    _hidePostAvatarInfo(post) {
        let avatarInfoElement = this.avatarDetailsFinder.getAvatarInfoElement(post);
        this.removeWhitespaceElements(avatarInfoElement);
        this.hideElements(this.avatarDetailsFinder.getHideableElements(post));
    }

    _showPostAvatarInfo(post) {
        this.showElements(this.avatarDetailsFinder.getHideableElements(post));
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