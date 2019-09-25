import { PostElementFinder } from "../../../src/finders/PostElementFinder.js";
import { AvatarElementFinder } from "../../../src/finders/AvatarElementFinder.js";
import { PostsCompressionToggler } from "../../../src/post-manipulation/PostsCompressionToggler.js";
import { ThreadPagePrepender } from "../../../src/automatic-pageloading/ThreadPagePrepender.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { UserTagger } from "../../../src/user-tagging/UserTagger.js";
import { GenericElementGenerator } from "../../../src/element-generators/GenericElementGenerator.js";

let postsCompressionToggler = new PostsCompressionToggler();
let postElementFinder = new PostElementFinder();
let avatarElementFinder = new AvatarElementFinder();
let threadPagePrepender = new ThreadPagePrepender();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testThreadPageBuilder = null;
let userTagger = new UserTagger();
let genericElementGenerator = new GenericElementGenerator();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
})

it('test post gets compressed when clicked', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postsCompressionToggler.applyCompressionToggling();
    let post = postElementFinder.getFirstPost();
    post.click();

    expect(isPostCompressed(post)).toBe(true);
})

it('test post gets uncompressed when clicked twice', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postsCompressionToggler.applyCompressionToggling();
    let post = postElementFinder.getFirstPost();
    post.click();
    post.click();

    expect(isPostUncompressed(post)).toBe(true);
})

it('test click event not triggered on any element within footer element of post', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postsCompressionToggler.applyCompressionToggling();
    let post = postElementFinder.getFirstPost();
    let elementWithinFooter = postElementFinder.getFooterElementFromPost(post).children[0];
    elementWithinFooter.click();

    expect(isPostUncompressed(post)).toBe(true);
})

it('test compression toggling applied to prepended page', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();
    let pageHtml = testThreadPageBuilder.specificPage(2, 2).buildPage()
    let htmlDocument = genericElementGenerator.generateDocument(pageHtml);

    threadPagePrepender.prependPage(htmlDocument, true);
    let post = postElementFinder.getFirstPost();
    post.click();

    expect(isPostUncompressed(post)).toBe(true)
})

it('test compression toggling not applied to tag element', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    userTagger.applyTagging();
    postsCompressionToggler.applyCompressionToggling();
    let post = postElementFinder.getFirstPost();
    let tagElement = avatarElementFinder.getTagIconElementFromPost(post);
    tagElement.click();

    expect(isPostCompressed(post)).toBe(false);
})

function isPostUncompressed(post) {
    return avatarElementFinder.getAvatarInfoElementsFromPost(post)[0].style.display == '';
}

function isPostCompressed(post) {
    return avatarElementFinder.getAvatarInfoElementsFromPost(post)[0].style.display == 'none';
}