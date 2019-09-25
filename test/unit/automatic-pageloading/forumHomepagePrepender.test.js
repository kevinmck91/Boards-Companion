import { ForumHomepagePrepender } from "../../../src/automatic-pageloading/ForumHomepagePrepender.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";
import { GenericElementGenerator } from "../../../src/element-generators/GenericElementGenerator.js";

let forumHomepagePrepender = new ForumHomepagePrepender();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testForumPageBuilder = null;
let genericElementGenerator = new GenericElementGenerator();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testForumPageBuilder = new TestForumPageBuilder();
})

it('ensure forum homepage elements are prepended correctly', () => {
    document.body.innerHTML = testForumPageBuilder.specificPage(2, 2).buildPage();

    prependForumHomepage(testForumPageBuilder.buildPage());

    expect(document.body.outerHTML.match(/title/g).length).toBe(2);
})

it('ensure navigation ribbon is inserted', () => {
    document.body.innerHTML = testForumPageBuilder.specificPage(2, 2).buildPage();

    prependForumHomepage(testForumPageBuilder.buildPage());

    expect(document.body.outerHTML.match(/2 of 2/g).length).toBe(3);
})

it('ensure navigation ribbon is inserted in correct location', () => {
    document.body.innerHTML = testForumPageBuilder.specificPage(2, 2).buildPage();

    prependForumHomepage(testForumPageBuilder.buildPage());

    expect(document.body.outerHTML.match(/(2 of 2[\s\S]*)title([\s\S]*)2 of 2([\s\S]*)title([\s\S]*)2 of 2/g)).not.toBe(null);
})

function prependForumHomepage(pageHtml) {
    let htmlDocument = genericElementGenerator.generateDocument(pageHtml);
    forumHomepagePrepender.prependPage(htmlDocument);
}