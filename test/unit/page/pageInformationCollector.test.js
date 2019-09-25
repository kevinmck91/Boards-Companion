import { PageInformationCollector } from "../../../src/page/PageInformationCollector.js";
import { TestPageManipulator } from "../test-environment/TestPageManipulator.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";

let pageInformationCollector = new PageInformationCollector();
let testPageManipulator = new TestPageManipulator();
let testThreadPageBuilder = null;
let testForumPageBuilder = new TestForumPageBuilder();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testForumPageBuilder = new TestForumPageBuilder();
})

it('max no of pages', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    expect(pageInformationCollector.getMaxNoOfPages()).toBe(2);
})

it('triple digits pageXOfY', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 482).buildPage();

    let result = pageInformationCollector.getMaxNoOfPages(document);

    expect(result).toBe(482);
})

it('get next page url from navigator', () => {
    testPageManipulator.loadThreadUrl();
    document.body.innerHTML = testThreadPageBuilder.specificPage(2, 4).buildPage();

    let result = pageInformationCollector.getNextPageUrl();

    expect(result).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=3");
})

it('check if user signed out', () => {
    document.body.innerHTML = testForumPageBuilder.isSignedOut().buildPage();

    let isSignedOut = pageInformationCollector.isUserSignedOut();

    expect(isSignedOut).toBe(true);
})

it('check if user signed in', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    let isSignedOut = pageInformationCollector.isUserSignedOut();

    expect(isSignedOut).toBe(false);
})