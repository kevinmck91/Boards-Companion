import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ElementFinder } from "../src/ElementFinder.js";

let testHtmlGenerator = new TestHtmlGenerator();
let elementFinder = new ElementFinder();

it('test get posts from document', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts from unsigned in user page', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get avatar info elements', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPost();

    let avatarInfoElements = elementFinder.getAvatarInfoElementsFromPost(elementFinder.getAllPosts()[0]);

    expect(avatarInfoElements[0].outerHTML.includes("Registered User")).toBe(true);
})