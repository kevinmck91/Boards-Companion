export { TestPageBuilder }
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";

class TestPageBuilder {

    constructor() {
        this.testHtmlGenerator = new TestHtmlGenerator();
        this.noOfPosts = 1;
    }

    withMultiplePosts(noOfPosts) {
        this.noOfPosts = noOfPosts;
        return this;
    }

    buildPage() {
        let pageHtml = "";
        pageHtml += this._buildPosts();
        return pageHtml;
    }

    _buildPosts() {
        let postsHtml = "";
        for (let i = 0; i < this.noOfPosts; i++) {
            postsHtml += this.testHtmlGenerator.getSignedInUserPost();
        }
        return postsHtml;
    }
}