"use strict";
import { HeaderReducer } from "../src/HeaderReducer.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";

let headerReducer =  new HeaderReducer();
let elementFinder = new ElementFinder();
let testHtmlGenerator = new TestHtmlGenerator();

beforeEach(() => {
    loadThreadUrl();
  });

it('Test mid page header reduced', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    setScrollPosition(10);

    headerReducer.toggleHeaderReduction();
    triggerScrollEvent();
    
    expect(elementFinder.getBreadCrumbs().style.top).toBe('0px');
})

it('Test top of page restored header', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    setScrollPosition(0);

    headerReducer.toggleHeaderReduction();
    triggerScrollEvent();
    
    expect(isHeaderRestored()).toBe(true);
})

it('Test restored on non-thread page', () =>{
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    expect(elementFinder.getBreadCrumbs().style.top).toBe('87px');
    loadNonThreadUrl();
    setScrollPosition(10);
    
    headerReducer.toggleHeaderReduction();
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
    return elementFinder.getBreadCrumbs().style.top =='87px';
}