import { AutomaticPageLoader } from "../src/AutomaticPageLoader.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { TestPageManipulator } from "./TestPageManipulator.js";

let automaticPageLoader;
let testHtmlGenerator = new TestHtmlGenerator();
let testPageManipulator = new TestPageManipulator();

let xhrOpenMock;
beforeEach(() => {
    xhrOpenMock = jest.fn();
    const xhrMock = () => ({
        open: xhrOpenMock,
        send: jest.fn()
    })
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMock)
    automaticPageLoader = new AutomaticPageLoader();
});

it('test page 2 url loaded', () => {
    testPageManipulator.loadThreadUrl();
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    automaticPageLoader.loadNextPage();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=2");
})

it('test starting on page 2', () => {
    testPageManipulator.loadNthThreadUrl(2);
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(2, 3);

    automaticPageLoader.loadNextPage();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=3");
})

it('test last page only loads once', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(2, 2);
    testPageManipulator.setScrollPosition(10);

    automaticPageLoader.autoScrollPages();
    testPageManipulator.triggerScrollEvent();

    expect(xhrOpenMock.mock.calls.length).toBe(0);
})