import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { PageInformationCollector } from "../src/PageInformationCollector.js";

let testHtmlGenerator = new TestHtmlGenerator();
let pageInformationCollector = new PageInformationCollector();

it('max no of pages', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    expect(pageInformationCollector.getMaxNoOfPages()).toBe(2);
})

it('triple digits pageXOfY', () => {
    let result = pageInformationCollector.parsePageXOfY(' Page 1 of 482  ');

    expect(result).toBe(482);
})