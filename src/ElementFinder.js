"use strict";
export { ElementFinder };

class ElementFinder {

    getWelcomeNotice() {
        return document.getElementById('notices');
    }

    getAllPosts() {
        return Array.from(document.querySelectorAll("[id^='edit']"));
    }

    getAvatarInfoElements(post) {
        return Array.from(post.querySelectorAll('.alt2 .smallfont'));
    }

    getFooterElement(post) {
        return post.querySelector('tr:nth-child(3)');
    }

    getReducibleHeaderElements() {
        let headerElements = [];
        const navigationBar = document.querySelector('.nav-area');
        const searchPanel = document.getElementById('header');
        headerElements.push(navigationBar);
        headerElements.push(searchPanel);
        return headerElements;
    }

    getBreadCrumbs() {
        return document.getElementById('breadcrumb');
    }
}