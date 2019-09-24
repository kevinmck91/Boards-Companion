"use strict";
export { ElementFinder };
import { ElementRemover } from "../ElementRemover.js";

class ElementFinder {

    constructor() {
        this.elementRemover = new ElementRemover();
    }

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

    getFirstPost() {
        return this.getAllPosts()[0];
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

    getForumHomepageThreadContainer() {
        return document.getElementById('inlinemodform');
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
        return this.getBottomPageNavigatorFromDocument(document);
    }

    getBottomPageNavigatorFromDocument(htmlDocument) {
        const navigators = htmlDocument.querySelectorAll('.pagenav');
        return navigators[navigators.length - 1];
    }

    getForumBottomNavigationRibbonFromDocument(htmlDocument) {
        let bottomPageNavigator = this.getBottomPageNavigatorFromDocument(htmlDocument);
        let bottomNavationRibbon = this.findParentElement(bottomPageNavigator, 8);
        return bottomNavationRibbon;
    }

    getThreadBottomNavigationRibbonFromDocument(htmlDocument) {
        let bottomPageNavigator = this.getBottomPageNavigatorFromDocument(htmlDocument);
        let bottomPageNavigatorRibbon = this.findParentElement(bottomPageNavigator, 11);
        this._cleanPageNavigationRibbonElement(bottomPageNavigatorRibbon);
        return bottomPageNavigatorRibbon;
    }

    findParentElement(candidateElement, noOfGenerations) {
        for (let i = 1; i <= noOfGenerations; i++) {
            candidateElement = candidateElement.parentElement;
        }
        return candidateElement;
    }

    _cleanPageNavigationRibbonElement(pageNavigationRibbon) {
        let table = pageNavigationRibbon.querySelectorAll('table')[0];
        let elementsForDeletion = this.getElementSiblings(table);
        this.elementRemover.removeElements(elementsForDeletion);
    }

    getElementSiblings(candidateElement) {
        let siblings = [];
        let sibling = candidateElement.parentNode.firstChild;
        while (sibling) {
            if (sibling !== candidateElement) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling
        }
        return siblings;
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
            if (tagIconElement != null)
                tagIconElements.push(tagIconElement);
        }
        return tagIconElements;
    }

    getTagIconElementFromPost(post) {
        return post.querySelector('.tag-icon');
    }

    getUserDetailsElementFromTagElement(tagElement) {
        return tagElement.parentElement.parentElement.parentElement;
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

    getUserTagElementFromPost(post) {
        return post.querySelector('.user-tag');
    }

}