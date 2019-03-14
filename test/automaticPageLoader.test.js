import { AutomaticPageLoader } from "../src/AutomaticPageLoader.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { TestPageManipulator } from "./TestPageManipulator.js";

let automaticPageLoader = new AutomaticPageLoader();
let testHtmlGenerator = new TestHtmlGenerator();
let testPageManipulator = new TestPageManipulator();

let xhrOpenMock;
beforeEach(() => {
    xhrOpenMock = jest.fn();
    const xhrMock = () => ({
        open: xhrOpenMock,
        send: jest.fn(),
        setRequestHeader: jest.fn(),
    })
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMock)
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