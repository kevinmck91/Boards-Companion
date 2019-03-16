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

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=2");
})

it('test starting on page 2', () => {
    testPageManipulator.loadNthThreadUrl(2);
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(2, 3);

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=3");
})

it('test last page only loads once', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(2, 2);

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls.length).toBe(0);
})

it('get next page url from nnth page', () => {
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

function triggerNextPageLoad() {
    testPageManipulator.setScrollPosition(10);
    automaticPageLoader.autoScrollPages();
    testPageManipulator.triggerScrollEvent();
}