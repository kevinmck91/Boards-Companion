"use strict";
import { HeaderTransparencyToggler } from "../src/HeaderTransparencyToggler.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { TestPageManipulator } from "./TestPageManipulator.js";
import { PageInformationCollector } from "../src/PageInformationCollector.js";

let headerTransparencyToggler = new HeaderTransparencyToggler();
let elementFinder = new ElementFinder();
let testHtmlGenerator = new TestHtmlGenerator();
let testPageManipulator = new TestPageManipulator();
let pageInformationCollector = new PageInformationCollector();

beforeEach(() => {
    testPageManipulator.loadThreadUrl();
});

it('Test mid page header transparent', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    testPageManipulator.setScrollPosition(10);

    headerTransparencyToggler.enableToggling();
    testPageManipulator.triggerScrollEvent();

    expect(elementFinder.getBreadCrumbs().style.opacity).toBe('0');
})

it('Test top of page non-transparent header', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    testPageManipulator.setScrollPosition(0);

    headerTransparencyToggler.enableToggling();
    testPageManipulator.triggerScrollEvent();

    expect(pageInformationCollector.isHeaderNontransparent()).toBe(true);
})

it('Test non-transparent on non-thread page', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    testPageManipulator.loadNonThreadUrl();
    testPageManipulator.setScrollPosition(10);

    headerTransparencyToggler.enableToggling();
    testPageManipulator.triggerScrollEvent();

    expect(pageInformationCollector.isHeaderNontransparent()).toBe(true);
})

