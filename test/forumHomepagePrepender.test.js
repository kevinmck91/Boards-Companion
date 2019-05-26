import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ForumHomepagePrepender } from "../src/ForumHomepagePrepender.js";

let testHtmlGenerator = new TestHtmlGenerator();
let forumHomepagePrepender = new ForumHomepagePrepender();

beforeEach(() => {
    window.scrollTo = () => { };
});

it('ensure forum homepage elements are prepended in correct order', () => {
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(2, 2);

    prependForumHomepage(testHtmlGenerator.getForumHomePage(1, 2));

    let pageNoElement = document.body.querySelectorAll("form > *")[1];
    expect(pageNoElement.outerHTML.indexOf('<div')).not.toBe(-1);
})

function prependForumHomepage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    forumHomepagePrepender.prependPage(htmlDocument);
}