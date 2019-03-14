"use strict";
export { ElementFinder };

class ElementFinder {

    getWelcomeNotice() {
        return document.getElementById('notices');
    }

    getAllPosts() {
        return Array.from(document.querySelectorAll("[id^='edit']"));
    }

    getPostsContainer(){
        return document.querySelector('.left-col');

    }

    getDocumentPosts(htmlDocument) {
        let postsXpath = "//div[@align='center'][descendant::div[starts-with(@id,'edit')]]";
        let xpathResult = htmlDocument.evaluate(postsXpath, htmlDocument.body, null, XPathResult.ANY_TYPE, null);
        const posts = [];
        let post = xpathResult.iterateNext();
        while (post) {
            posts.push(post);
            post = xpathResult.iterateNext();
        }
        return posts;
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

    getTopPageNavigator() {
        return document.querySelectorAll('.pagenav')[0];
    }

    getBottomPageNavigator(){
        return document.querySelectorAll('.pagenav')[1];
    }

}