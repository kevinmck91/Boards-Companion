"use strict";
hideWelcomeNotice();
hideAvatarInfo();
hideFooter();

function hideWelcomeNotice(){
    hideElement(document.getElementById('notices'));
}

function hideAvatarInfo(){
    for(let post of getAllPosts()){
        hideElements(getAvatarInfoElements(post));
    }
}

function hideFooter(){
    for(let post of getAllPosts()){
        hideElement(getFooterElement(post));
    }
}

function getAllPosts(){
    return Array.from(document.querySelectorAll("[id^='edit']"));
}

function hideElement(element){
    element.style.display = 'none';
}

function hideElements(elementArray){
    for(let element of elementArray){
        hideElement(element);
    }
}

function getAvatarInfoElements(post){
    return Array.from(post.querySelectorAll('.alt2 .smallfont'));
}

function getFooterElement(post){
    let result = post.querySelector('tr:nth-child(3)');
    return result;
}
