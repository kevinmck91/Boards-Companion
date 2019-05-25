import { AutomaticPageLoader } from "../src/AutomaticPageLoader.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { TestPageManipulator } from "./TestPageManipulator.js";

let automaticPageLoader;
let testHtmlGenerator = new TestHtmlGenerator();
let testPageManipulator = new TestPageManipulator();

let xhrOpenMock;
beforeEach(() => {
    mockXmlHttpRequest();
    automaticPageLoader = new AutomaticPageLoader();
    testPageManipulator.loadThreadUrl();
});

it('test page 2 url loaded', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=2");
})

it('test starting on page 2', () => {
    testPageManipulator.loadNthThreadUrl(2);
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(2, 3);

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=3");
})

it('test next page isnt loaded when on last page', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(2, 2);

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0]).toBe(undefined);
})

it('test previous page isnt loaded when on first page', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 1);

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0]).toBe(undefined);
})

it('get next page url from nnth page', () => {
    testPageManipulator.loadNthThreadUrl(2);
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(11, 20);

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=12");
})

it('only load on pages that are threads', () => {
    testPageManipulator.loadNonThreadUrl();
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls.length).toBe(0);
})

it('test previous page url loaded', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(5, 5);

    triggerPreviousPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=4");
})

function triggerNextPageLoad() {
    testPageManipulator.setScrollPosition(10);
    automaticPageLoader.autoScrollPages(true);
    testPageManipulator.triggerScrollEvent();
}

function triggerPreviousPageLoad() {
    testPageManipulator.setScrollPosition(0);
    automaticPageLoader.autoScrollPages();
}

function mockXmlHttpRequest() {
    xhrOpenMock = jest.fn();
    const xhrMock = () => ({
        open: xhrOpenMock,
        send: jest.fn()
    })
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMock);
}