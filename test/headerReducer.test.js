"use strict";
import { toggleHeaderReduction } from "../src/headerReducer";
import { getBreadCrumbs } from "../src/elementFinder.js";
import { getUnsignedInUserPage, getSignedInUserPage } from "./testHtmlGenerator.js";

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
    
    expect(getBreadCrumbs().style.top).toBe('87px');
})

function setScrollPosition(yCoordinate){
    return Object.defineProperty(window, 'scrollY', {value: yCoordinate, writable: true});
}

function triggerScrollEvent(){
    dispatchEvent(new Event("scroll"));
}