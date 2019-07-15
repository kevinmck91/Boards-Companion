import { PostsFormatter } from "../src/PostsFormatter.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { ElementFinder } from "../src/ElementFinder.js"

let postsFormatter = new PostsFormatter();
let testThreadPageBuilder = new TestThreadPageBuilder();
let elementFinder = new ElementFinder();

it('test highlight users posts', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    postsFormatter.tagUsersPosts({ username: "testusername", colour: "red" });

    let firstPost = elementFinder.getAllPosts()[0];
    let userTagElement = elementFinder.getUserTagElementFromPost(firstPost);
    expect(userTagElement.style.backgroundColor).toBe('red');
})

it('test old tag element is removed when new tag added', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    postsFormatter.tagUsersPosts({ username: "testusername", colour: "red" });
    postsFormatter.tagUsersPosts({ username: "testusername", colour: "green" });

    let firstPost = elementFinder.getAllPosts()[0];
    let userTagElement = elementFinder.getUserTagElementFromPost(firstPost);
    expect(userTagElement.style.backgroundColor).toBe('green');
})