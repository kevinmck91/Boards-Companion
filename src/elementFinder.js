"use strict";
export { getAllPosts, getAvatarInfoElements, getFooterElement, getReducibleHeaderElements, getBreadCrumbs, getWelcomeNotice };

function getWelcomeNotice() {
    return document.getElementById('notices');
}

function getAllPosts() {
    return Array.from(document.querySelectorAll("[id^='edit']"));
}

function getAvatarInfoElements(post) {
    return Array.from(post.querySelectorAll('.alt2 .smallfont'));
}

function getFooterElement(post) {
    return post.querySelector('tr:nth-child(3)');
}

function getReducibleHeaderElements() {
    let headerElements = [];
    const navigationBar = document.querySelector('.nav-area');
    const searchPanel = document.getElementById('header');
    headerElements.push(navigationBar);
    headerElements.push(searchPanel);
    return headerElements;
}

function getBreadCrumbs() {
    return document.getElementById('breadcrumb');
}