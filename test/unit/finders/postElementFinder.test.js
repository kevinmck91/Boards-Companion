import { PostElementFinder } from "../../../src/finders/PostElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { TestPostBuilder } from "../test-environment/html-builders/TestPostBuilder.js";

let postElementFinder = new PostElementFinder();
let testThreadPageBuilder = null;
let testEnvironmentArranger = new TestEnvironmentArranger();
let testPostBuilder = new TestPostBuilder();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testThreadPageBuilder = new TestThreadPageBuilder();
    testPostBuilder = new TestPostBuilder();
});

it('test get posts container from new signed in user page', () => {
    document.body.innerHTML = testThreadPageBuilder.isNewUser().buildPage();

    let posts = postElementFinder.getPostsContainerFromDocument(document);

    expect(posts).not.toBe(null);
})

it('test get posts from document', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    let posts = postElementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts from unsigned in user page', () => {
    let post = testPostBuilder.isSignedOut().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    let posts = postElementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts from new signed in user page', () => {
    document.body.innerHTML = testThreadPageBuilder.isNewUser().buildPage();

    let posts = postElementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get user posts', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    let userPosts = postElementFinder.getUserPosts('testusername');

    expect(userPosts.length).toBe(3);
})
