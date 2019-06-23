import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { PostsCompressionToggler } from "../src/PostsCompressionToggler.js";
import { ThreadPagePrepender } from "../src/ThreadPagePrepender.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { UserTagger } from "../src/UserTagger.js";

let testHtmlGenerator = new TestHtmlGenerator();
let postsCompressionToggler = new PostsCompressionToggler();
let elementFinder = new ElementFinder();
let threadPagePrepender = new ThreadPagePrepender();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testThreadPageBuilder = null;
let userTagger = new UserTagger();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
})

it('test post gets compressed when clicked', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postsCompressionToggler.applyCompressionToggling();
    let post = elementFinder.getAllPosts()[0];
    post.click();

    expect(isPostCompressed(post)).toBe(true);
})

it('test post gets uncompressed when clicked twice', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postsCompressionToggler.applyCompressionToggling();
    let post = elementFinder.getAllPosts()[0];
    post.click();
    post.click();

    expect(isPostUncompressed(post)).toBe(true);
})

it('test click event not triggered on any element within footer element of post', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postsCompressionToggler.applyCompressionToggling();
    let post = elementFinder.getAllPosts()[0];
    let elementWithinFooter = elementFinder.getFooterElementFromPost(post).children[0];
    elementWithinFooter.click();

    expect(isPostUncompressed(post)).toBe(true);
})

it('test compression toggling applied to prepended page', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();
    let pageHtml = testThreadPageBuilder.specificPage(2, 2).buildPage()
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);

    threadPagePrepender.prependPage(htmlDocument, true);
    let post = elementFinder.getAllPosts()[0];
    post.click();

    expect(isPostUncompressed(post)).toBe(true)
})

it('test compression toggling not applied to tag element', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    userTagger.applyTagging();
    postsCompressionToggler.applyCompressionToggling();
    let post = elementFinder.getAllPosts()[0];
    let tagElement = elementFinder.getTagIconElementFromPost(post);
    tagElement.click();

    expect(isPostCompressed(post)).toBe(false);
})

function isPostUncompressed(post) {
    return elementFinder.getAvatarInfoElementsFromPost(post)[0].style.display == '';
}

function isPostCompressed(post) {
    return elementFinder.getAvatarInfoElementsFromPost(post)[0].style.display == 'none';
}