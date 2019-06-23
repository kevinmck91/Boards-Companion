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

    postHtmlUpdater.addTagIconElementToPosts(elementFinder.getAllPosts());
    let userDetailsElement = elementFinder.getUserDetailsElementFromPost(elementFinder.getAllPosts()[0]);

    expect(userDetailsElement.querySelector(".tag-icon")).not.toBe(null);
})