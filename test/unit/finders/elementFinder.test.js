import { ElementFinder } from "../../../src/finders/ElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";
import { TestPostBuilder } from "../test-environment/html-builders/TestPostBuilder.js";

let elementFinder = new ElementFinder();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testThreadPageBuilder = null;
let testForumPageBuilder = new TestForumPageBuilder();
let testPostBuilder = new TestPostBuilder();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testThreadPageBuilder = new TestThreadPageBuilder();
    testForumPageBuilder = new TestForumPageBuilder();
    testPostBuilder = new TestPostBuilder();
});

it('test get posts from document', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts from unsigned in user page', () => {
    let post = testPostBuilder.isSignedOut().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts from new signed in user page', () => {
    document.body.innerHTML = testThreadPageBuilder.isNewUser().buildPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts container from new signed in user page', () => {
    document.body.innerHTML = testThreadPageBuilder.isNewUser().buildPage();

    let posts = elementFinder.getPostsContainerFromDocument(document);

    expect(posts).not.toBe(null);
})

it('test get threads from document', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    let threadsContainer = elementFinder.getThreadsContainerFromDocument(document);

    expect(threadsContainer).not.toBe(null);
})

it('test get user posts', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    let userPosts = elementFinder.getUserPosts('testusername');

    expect(userPosts.length).toBe(3);
})

