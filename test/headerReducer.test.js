"use strict";
import { toggleHeaderReduction } from "../src/headerReducer";
import { getBreadCrumbs } from "../src/elementFinder.js";
import { getUnsignedInUserPage, getSignedInUserPage } from "./testHtmlGenerator.js";

beforeEach(() => {
    loadThreadUrl();
  });

it('Test mid page header reduced', () => {
    document.body.innerHTML = getUnsignedInUserPage();
    setScrollPosition(10);

    toggleHeaderReduction();
    triggerScrollEvent();
    
    expect(getBreadCrumbs().style.top).toBe('0px');
})

it('Test top of page restored header', () => {
    document.body.innerHTML = getUnsignedInUserPage();
    setScrollPosition(0);

    toggleHeaderReduction();
    triggerScrollEvent();
    
    expect(isHeaderRestored()).toBe(true);
})

it('Test restored on non-thread page', () =>{
    document.body.innerHTML = getUnsignedInUserPage();
    expect(getBreadCrumbs().style.top).toBe('87px');
    loadNonThreadUrl();
    setScrollPosition(10);
    
    toggleHeaderReduction();
    triggerScrollEvent();

    expect(isHeaderRestored()).toBe(true);
})

function setScrollPosition(yCoordinate){
    return Object.defineProperty(window, 'scrollY', {value: yCoordinate, writable: true});
}

function triggerScrollEvent(){
    dispatchEvent(new Event("scroll"));
}

function loadThreadUrl(){
    window.history.pushState({}, 'Title', '/vbulletin/showthread.php?t=1111');;
}

function loadNonThreadUrl(){
    window.history.pushState({}, 'Title', 'vbulletin/forumdisplay.php?f=111');;
}

function isHeaderRestored(){
    return getBreadCrumbs().style.top =='87px';
}