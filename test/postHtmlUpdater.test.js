import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { PostHtmlUpdater } from "../src/PostHtmlUpdater.js";
import { ElementFinder } from "../src/ElementFinder.js";

let testThreadPageBuilder = null;
let postHtmlUpdater = new PostHtmlUpdater();
let elementFinder = new ElementFinder();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
})

it('test tag post', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(2).buildPage();

    postHtmlUpdater.addTagElementToPosts(elementFinder.getAllPosts());
    let usernameElement = elementFinder.getUserDetailsElementFromPost(elementFinder.getAllPosts()[0]);

    expect(usernameElement.outerHTML.indexOf('<div class="tagUser">tag</div>')).not.toBe(-1);
})