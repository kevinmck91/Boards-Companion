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

    getPostsFromDocument(htmlDocument) {
        let divsContainingPosts = Array.from(htmlDocument.querySelectorAll('div[align="center"]'));
        const posts = [];
        for(let div of divsContainingPosts){
            if(div.querySelector('div[id^=edit]')!=null){
                posts.push(div);
            }
        }
        return posts;
    }

    getAvatarInfoElementsFromPost(post) {
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

    getTopPageNavigatorFromDocument(htmlDocument){
        return htmlDocument.querySelectorAll('.pagenav')[0];
    }

}