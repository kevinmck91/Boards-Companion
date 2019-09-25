import { ElementFinder } from "../../../src/finders/ElementFinder.js";
import { AvatarElementFinder } from "../../../src/finders/AvatarElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { PostElementsVisibilityUpdater } from "../../../src/element-visibility/PostElementsVisibilityUpdater.js";
import { TestPostBuilder } from "../test-environment/html-builders/TestPostBuilder.js";

let elementFinder = new ElementFinder();
let testThreadPageBuilder = null;
let avatarElementFinder = new AvatarElementFinder();
let postElementsVisibilityUpdater = new PostElementsVisibilityUpdater();
let testPostBuilder = new TestPostBuilder();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testPostBuilder = new TestPostBuilder();
});

it('Registered user element hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    expect(avatarElementFinder.getAvatarInfoElementsFromPost(elementFinder.getFirstPost())[0].style.display).toBe('none');
})

it('Join date element displayed', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    expect(avatarElementFinder.getJoinDateElement(elementFinder.getFirstPost()).style.display).toBe('');
})

it('Avatar links elements hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();
    let linksSectionElements = avatarElementFinder.getLinksSectionElements(elementFinder.getFirstPost());

    expect(linksSectionElements[0].style.display).toBe('none');
})

it('Stars element hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    let starsElement = avatarElementFinder.getStarsElement(elementFinder.getFirstPost());
    expect(starsElement.style.display).toBe('none');
})


it('&nbsp; removed from avatar info', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    expect(elementFinder.getFirstPost().outerHTML.indexOf('&nbsp;')).toBe(-1);
})

it('links element not visible when no avatar', () => {
    let post = testPostBuilder.withoutAvatarPicture().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    let linksSectionElements = avatarElementFinder.getLinksSectionElements(elementFinder.getFirstPost());
    expect(linksSectionElements[1].style.display).toBe("none");
})

it('post count visible when no avatar', () => {
    let post = testPostBuilder.withoutAvatarPicture().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    let postCountElement = avatarElementFinder.getPostCountElement(elementFinder.getFirstPost());

    expect(postCountElement.style.display).toBe("");
    expect(postCountElement.parentElement.style.display).toBe("");
})

it('avatar hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    let avatarPictureElement = avatarElementFinder.getAvatarPictureElement(elementFinder.getFirstPost());
    expect(avatarPictureElement.style.display).toBe("none");
})

it('links element not visible when moderator post', () => {
    let post = testPostBuilder.isModerator().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    let linksSectionElements = avatarElementFinder.getLinksSectionElements(elementFinder.getFirstPost());
    expect(linksSectionElements[1].style.display).toBe("none");
})

it('join date visible when no registered user element, stars element, or avatar picture', () => {
    let post = testPostBuilder.withoutRegisteredUserElement().withoutStarsElement().withoutAvatarPicture().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();

    let avatarInfoFooter = avatarElementFinder.getAvatarInfoFooter(elementFinder.getFirstPost());
    expect(avatarInfoFooter.style.display).toBe("");
})


it('hiding posts multiple times removes join date element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    let post = elementFinder.getFirstPost();
    postElementsVisibilityUpdater.hidePostElements(post);
    postElementsVisibilityUpdater.hidePostElements(post);
    postElementsVisibilityUpdater.hidePostElements(post);

    let joinDate = avatarElementFinder.getJoinDateElement(post);
    expect(joinDate.outerHTML).toBe("<div>Join Date: Mar 2019</div>");
})