import { PostsFormatter } from "../src/PostsFormatter.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { ElementFinder } from "../src/ElementFinder.js"

let postsFormatter = new PostsFormatter();
let testThreadPageBuilder = new TestThreadPageBuilder();
let elementFinder = new ElementFinder();

it('test highlight users posts', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    postsFormatter.highlightUserPosts("testusername", "red");

    let firstPost = elementFinder.getAllPosts()[0];
    let userDetailsElement = elementFinder.getUserDetailsElementFromPost(firstPost);
    expect(userDetailsElement.style.backgroundColor).toBe('red');
})