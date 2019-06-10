import { TestPageBuilder } from "./TestPageBuilder.js";
import { PostHtmlUpdater } from "../src/PostHtmlUpdater.js";
import { ElementFinder } from "../src/ElementFinder.js";

let testPageBuilder = new TestPageBuilder();
let postHtmlUpdater = new PostHtmlUpdater();
let elementFinder = new ElementFinder();

it('test tag post', () => {
    document.body.innerHTML = testPageBuilder.withMultiplePosts(2).buildPage();

    postHtmlUpdater.addTagElementToAllPosts();
    let usernameElement = elementFinder.getUserDetailsElementFromPost(elementFinder.getAllPosts()[0]);

    expect(usernameElement.outerHTML.indexOf('<div class="tagUser">tag</div>')).not.toBe(-1);
})