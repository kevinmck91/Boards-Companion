import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { PostsCompressionToggler } from "../src/PostsCompressionToggler.js";

let testHtmlGenerator = new TestHtmlGenerator();
let postsCompressionToggler = new PostsCompressionToggler();
let elementFinder = new ElementFinder();

it('test post gets compressed when clicked', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    postsCompressionToggler.applyCompressionToggling();
    let post = elementFinder.getAllPosts()[0];
    post.click();

    expect(elementFinder.getAvatarInfoElementsFromPost(post)[0].style.display).toBe('none');
})

it('test post gets umcompressed when clicked twice', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    postsCompressionToggler.applyCompressionToggling();
    let post = elementFinder.getAllPosts()[0];
    post.click();
    post.click();

    expect(elementFinder.getAvatarInfoElementsFromPost(post)[0].style.display).toBe('');
})