import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { PostHtmlUpdater } from "../../../src/post-manipulation/PostHtmlUpdater.js";
import { PostElementFinder } from "../../../src/finders/PostElementFinder.js";
import { AvatarElementFinder } from "../../../src/finders/AvatarElementFinder.js";

let testThreadPageBuilder = null;
let postHtmlUpdater = new PostHtmlUpdater();
let postElementFinder = new PostElementFinder();
let avatarElementFinder = new AvatarElementFinder();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
})

it('test tag post', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(2).buildPage();

    postHtmlUpdater.addTagIconElementToPosts(postElementFinder.getAllPosts());
    let userDetailsElement = avatarElementFinder.getUserDetailsElementFromPost(postElementFinder.getFirstPost());

    expect(userDetailsElement.querySelector(".tag-icon")).not.toBe(null);
})

it('tag icon within post count div', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postHtmlUpdater.addTagIconElementToPosts(postElementFinder.getAllPosts());
    let postCountElement = avatarElementFinder.getPostCountElement(postElementFinder.getFirstPost());

    expect(postCountElement.outerHTML.indexOf("tag-icon")).not.toBe(-1);
})