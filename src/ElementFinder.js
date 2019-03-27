"use strict";
export { ElementFinder };

class ElementFinder {

    searchForWelcomeNotice() {
        let notice = document.getElementById('notices');
        if (notice != null && notice.outerHTML.includes('here are some tips and tricks to help you get started')) {
            return notice;
        }
        else return null;
    }

    getNotice() {
        return document.getElementById('notices');
    }

    getAllPosts() {
        return Array.from(document.querySelectorAll("[id^='edit']"));
    }

    getPostsContainerFromDocument(htmlDocument) {
        return htmlDocument.querySelector('.left-col');
    }

    getPostsContainer() {
        return this.getPostsContainerFromDocument(document);
    }

    getPostsFromDocument(htmlDocument) {
        return htmlDocument.querySelectorAll('.left-col > div');
    }

    getAvatarInfoElementsFromPost(post) {
        return Array.from(post.querySelectorAll('.alt2 .smallfont'));
    }

    getFooterElementFromPost(post) {
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

    getTopPageNavigator() {
        return document.querySelectorAll('.pagenav')[0];
    }

    getBottomPageNavigator() {
        return document.querySelectorAll('.pagenav')[1];
    }

    getTopPageNavigatorFromDocument(htmlDocument) {
        return htmlDocument.querySelectorAll('.pagenav')[0];
    }

}