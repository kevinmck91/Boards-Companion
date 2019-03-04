"use strict";
export { hideSpecifiedElements };

const hideSpecifiedElements = function () {
    hideWelcomeNotice();
    hideAvatarInfo();
    hideFooter();
}

function hideWelcomeNotice() {
    const welcomeNotice = document.getElementById('notices');
    if (welcomeNotice != null) 
        hideElement(welcomeNotice);
}

function hideAvatarInfo() {
    for (let post of getAllPosts()) {
        hideElements(getAvatarInfoElements(post));
    }
}

function hideFooter() {
    for (let post of getAllPosts()) {
        hideElement(getFooterElement(post));
    }
}

function getAllPosts() {
    return Array.from(document.querySelectorAll("[id^='edit']"));
}

function hideElement(element) {
    element.style.display = 'none';
}

function hideElements(elementArray) {
    for (let element of elementArray) {
        hideElement(element);
    }
}

function getAvatarInfoElements(post) {
    return Array.from(post.querySelectorAll('.alt2 .smallfont'));
}

function getFooterElement(post) {
    return post.querySelector('tr:nth-child(3)');
}