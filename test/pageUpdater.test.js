import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { PageUpdater } from "../src/PageUpdater.js";
import { ElementFinder } from "../src/ElementFinder.js";

let testHtmlGenerator = new TestHtmlGenerator();
let pageUpdater = new PageUpdater();
let elementFinder = new ElementFinder();

it('add next page successfully', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    appendNextPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(elementFinder.getAllPosts().length).toBe(2);
})

it('insert correct page no', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    appendNextPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(document.body.outerHTML.indexOf("page 2")).not.toBe(-1);
})

it('update navigator', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    appendNextPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));
    
    expect(document.body.outerHTML.indexOf("Page 2 of 2")).not.toBe(-1);
})

function appendNextPage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    pageUpdater.appendNextPage(htmlDocument);
}