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

    getThreadsContainersContainer() {
        return document.getElementById('inlinemodform');
    }

    getLastElementInThreadsContainersContainer() {
        let threadsContainersContainer = this.getThreadsContainersContainer();
        let tableElements = threadsContainersContainer.querySelectorAll("form > table");
        return tableElements[tableElements.length - 1];
    }

    getFirstElementInThreadsContainersContainer() {
        let threadsContainersContainer = this.getThreadsContainersContainer();
        let tableElements = threadsContainersContainer.querySelectorAll("form > *");
        return tableElements[0];
    }

    getLastThreadContainer() {
        let threadContainers = Array.from(document.querySelectorAll('#threadslist'));
        return threadContainers[threadContainers.length - 1];
    }

    getPostsFromDocument(htmlDocument) {
        let regularUserPosts = htmlDocument.querySelectorAll('.left-col > div:not(#lastpost)');
        let newSignedInUserPosts = htmlDocument.querySelectorAll('#posts > div:not(#lastpost)');
        if (regularUserPosts.length == 0)
            return newSignedInUserPosts;
        else
            return regularUserPosts;
    }

    getThreadsContainerFromDocument(htmlDocument) {
        return htmlDocument.getElementById("threadslist");
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

    getUserDetailsElementFromPost(post) {
        return post.querySelector('[id^="post"] > tbody > [valign="top"] > td');
    }

    getUsernameElementFromPost(post) {
        return post.querySelector('[id^="postmenu"]');
    }

    getAllTagIconElements() {
        return Array.from(document.querySelectorAll('.tag-icon'));
    }

    getTagIconElementsFromPosts(posts) {
        let tagIconElements = [];
        for (let post of posts) {
            let tagIconElement = this.getTagIconElementFromPost(post);
            tagIconElements.push(tagIconElement);
        }
        return tagIconElements;
    }

    getTagIconElementFromPost(post) {
        return post.querySelector('.tag-icon');
    }

    getUserDetailsElementFromTagElement(tagElement) {
        return tagElement.parentElement;
    }

    getUsernameElementFromUserDetailsElement(userDetailsElement) {
        return userDetailsElement.querySelector('.bigusername');
    }

    getUserPosts(username) {
        let allPosts = this.getAllPosts();
        return this.getUserPostsFromPosts(username, allPosts);
    }

    getUserPostsFromPosts(username, posts) {
        let usernamePosts = [];
        for (let post of posts) {
            let postUsername = post.querySelector('.bigusername').textContent;
            if (postUsername == username) {
                usernamePosts.push(post);
            }
        }
        return usernamePosts;
    }

    getTaggerModalElement() {
        return document.querySelector('.modal-container');
    }

    getUserTagElementFromPost(post) {
        return post.querySelector('.user-tag');
    }

    getTaggerModalUsernameElement() {
        return this.getTaggerModalElement().querySelector('#username');
    }

    getTaggerModalTitleElement() {
        return this.getTaggerModalElement().querySelector('h2');
    }

    getTaggerModalSubmitButton() {
        return this.getTaggerModalElement().querySelector('[type="submit"]');
    }

    getTaggerModalCancelButton() {
        return this.getTaggerModalElement().querySelector('[type="submit"][value="cancel"]');
    }

    getTaggerModalShowUsersElement() {
        return this.getTaggerModalElement().querySelector('#show-tagged-users');
    }

    getTaggerModalUserListElement() {
        return this.getTaggerModalElement().querySelector('#user-list');
    }

    getTaggerModalDeleteUserElements() {
        return this.getTaggerModalElement().querySelectorAll('.delete-user');
    }
}