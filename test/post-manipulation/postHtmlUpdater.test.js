import { TestThreadPageBuilder } from "../test-environment/page-builders/TestThreadPageBuilder.js";
import { PostHtmlUpdater } from "../../src/post-manipulation/PostHtmlUpdater.js";
import { ElementFinder } from "../../src/finders/ElementFinder.js";

let testThreadPageBuilder = null;
let postHtmlUpdater = new PostHtmlUpdater();
let elementFinder = new ElementFinder();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
})

it('test tag post', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(2).buildPage();

    postHtmlUpdater.addTagIconElementToPosts(elementFinder.getAllPosts());
    let userDetailsElement = elementFinder.getUserDetailsElementFromPost(elementFinder.getAllPosts()[0]);

    expect(userDetailsElement.querySelector(".tag-icon")).not.toBe(null);
})