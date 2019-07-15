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
        let regularUserPosts = htmlDocument.querySelector('.left-col');
        let newSignedInUserPosts = htmlDocument.querySelector('#posts');
        if (regularUserPosts == null)
            return newSignedInUserPosts;
        else
            return regularUserPosts;
    }

    getPostsContainer() {
        return this.getPostsContainerFromDocument(document);
    }

    getForumHomepageContentElements() {
        return document.body.querySelectorAll('.page-number, #threadslist');
    }

    getPostsFromDocument(htmlDocument) {
        let regularUserPosts = htmlDocument.querySelectorAll('.left-col > div');
        let newSignedInUserPosts = htmlDocument.querySelectorAll('#posts > div');
        if (regularUserPosts.length == 0)
            return newSignedInUserPosts;
        else
            return regularUserPosts;
    }

    getThreadsContainerFromDocument(htmlDocument) {
        return htmlDocument.getElementById("threadslist");
    }

    getAllThreadsContainers() {
        return document.body.querySelectorAll('.left-col > #threadslist');
    }

    getAvatarInfoElementsFromPost(post) {
        return Array.from(post.querySelectorAll('.alt2 .smallfont'));
    }

    getFooterElementFromPost(post) {
        return post.querySelector('tr:nth-child(3)');
    }

    getHeaderElements() {
        let headerElements = [];
        const navigationBar = document.querySelector('.nav-area');
        const searchPanel = document.getElementById('header');
        const breadcrumbs = this.getBreadCrumbs();
        headerElements.push(navigationBar);
        headerElements.push(searchPanel);
        headerElements.push(breadcrumbs);
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

    getNextPageElementFromNavigator(navigator) {
        return navigator.querySelector('.alt2 + .alt1');
    }

    getPreviousPageElementFromNavigator(navigator) {
        return navigator.querySelector('.alt2').previousElementSibling;
    }

    getLoadingElements() {
        return Array.from(document.querySelectorAll('.loading'));
    }

}