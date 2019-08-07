"use strict";
import { HeaderTransparencyToggler } from "../../src/HeaderTransparencyToggler.js";
import { ElementFinder } from "../../src/finders/ElementFinder.js";
import { TestPageManipulator } from "./test-environment/TestPageManipulator.js";
import { PageInformationCollector } from "../../src/page/PageInformationCollector.js";
import { TestThreadPageBuilder } from "./test-environment/html-builders/TestThreadPageBuilder.js";

let headerTransparencyToggler = new HeaderTransparencyToggler();
let elementFinder = new ElementFinder();
let testPageManipulator = new TestPageManipulator();
let pageInformationCollector = new PageInformationCollector();
let testThreadPageBuilder = null;

beforeEach(() => {
    testPageManipulator.loadThreadUrl();
    testThreadPageBuilder = new TestThreadPageBuilder();
});

it('Test mid page header transparent', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    testPageManipulator.setScrollPosition(10);

    headerTransparencyToggler.enableToggling();
    testPageManipulator.triggerScrollEvent();

    expect(elementFinder.getBreadCrumbs().style.opacity).toBe('0');
})

it('Test top of page non-transparent header', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    testPageManipulator.setScrollPosition(0);

    headerTransparencyToggler.enableToggling();
    testPageManipulator.triggerScrollEvent();

    expect(pageInformationCollector.isHeaderNontransparent()).toBe(true);
})

it('Test non-transparent on non-thread page', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    testPageManipulator.loadForumPageUrl();
    testPageManipulator.setScrollPosition(10);

    headerTransparencyToggler.enableToggling();
    testPageManipulator.triggerScrollEvent();

    expect(pageInformationCollector.isHeaderNontransparent()).toBe(true);
})

