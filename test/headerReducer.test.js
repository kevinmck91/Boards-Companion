"use strict";
import { HeaderReducer } from "../src/HeaderReducer.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { TestPageManipulator } from "./TestPageManipulator.js";
import { PageInformationCollector } from "../src/PageInformationCollector.js";

let headerReducer = new HeaderReducer();
let elementFinder = new ElementFinder();
let testHtmlGenerator = new TestHtmlGenerator();
let testPageManipulator = new TestPageManipulator();
let pageInformationCollector = new PageInformationCollector();

beforeEach(() => {
    testPageManipulator.loadThreadUrl();
});

it('Test mid page header reduced', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    testPageManipulator.setScrollPosition(10);

    headerReducer.toggleHeaderReduction();
    testPageManipulator.triggerScrollEvent();

    expect(elementFinder.getBreadCrumbs().style.top).toBe('0px');
})

it('Test top of page restored header', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    testPageManipulator.setScrollPosition(0);

    headerReducer.toggleHeaderReduction();
    testPageManipulator.triggerScrollEvent();

    expect(pageInformationCollector.isHeaderRestored()).toBe(true);
})

it('Test restored on non-thread page', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    expect(elementFinder.getBreadCrumbs().style.top).toBe('87px');
    testPageManipulator.loadNonThreadUrl();
    testPageManipulator.setScrollPosition(10);

    headerReducer.toggleHeaderReduction();
    testPageManipulator.triggerScrollEvent();

    expect(pageInformationCollector.isHeaderRestored()).toBe(true);
})

