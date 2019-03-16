import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { PageInformationCollector } from "../src/PageInformationCollector.js";
import { TestPageManipulator } from "./TestPageManipulator.js";

let testHtmlGenerator = new TestHtmlGenerator();
let pageInformationCollector = new PageInformationCollector();

it('max no of pages', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    expect(pageInformationCollector.getMaxNoOfPages()).toBe(2);
})

it('triple digits pageXOfY', () => {
    document.body.innerHTML = testHtmlGenerator.getPageNavigator(1, 482);

    let result = pageInformationCollector.getMaxNoOfPages(document);

    expect(result).toBe(482);
})