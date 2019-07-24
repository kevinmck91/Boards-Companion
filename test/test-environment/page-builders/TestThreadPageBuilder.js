export { TestThreadPageBuilder }
import { TestHtmlGenerator } from "../TestHtmlGenerator.js";

class TestThreadPageBuilder {

    constructor() {
        this.testHtmlGenerator = new TestHtmlGenerator();
        this.noOfPosts = 1;
        this.IsSignedIn = true;
        this._hasNormalNotice = false;
        this._hasWelcomeNotice = false;
        this.hasNotices = false;
        this._isNewuser = false;
        this.pageNo = 1;
        this.maxNoOfPages = 2;
    }

    withMultiplePosts(noOfPosts) {
        this.noOfPosts = noOfPosts;
        return this;
    }

    isSignedOut() {
        this.isSignedIn = false;
        return this;
    }

    isNewUser() {
        this._isNewuser = true;
        return this;
    }

    hasNormalNotice() {
        this.hasNotices = true;
        this._hasNormalNotice = true;
        return this;
    }

    hasWelcomeNotice() {
        this.hasNotices = true;
        this._hasWelcomeNotice = true;
        return this;
    }

    specificPage(pageNo, maxNoOfPages) {
        this.pageNo = pageNo;
        this.maxNoOfPages = maxNoOfPages;
        return this;
    }

    buildPage() {
        let pageContent = this._getPageNavigator();
        pageContent += this.testHtmlGenerator.getHeader();
        pageContent += this._getNotices();
        pageContent += this._getPosts();
        pageContent += this.testHtmlGenerator.wrapThreadFooterElements(this._getPageNavigator());
        let pageHtml = this.testHtmlGenerator.wrapPageElements(pageContent);
        return pageHtml;
    }

    _getPageNavigator() {
        return this.testHtmlGenerator.getThreadPageNavigator(this.pageNo, this.maxNoOfPages);
    }

    _getNotices() {
        if (this.hasNotices) {
            let noticeElements = "";
            if (this._hasWelcomeNotice)
                noticeElements += this.testHtmlGenerator.getWelcomeNotice();
            else
                noticeElements += this.testHtmlGenerator.getNormalNotice();
            return this.testHtmlGenerator.wrapNotices(noticeElements);
        } else
            return "";
    }

    _getPosts() {
        let postsHtml = "";
        for (let i = 0; i < this.noOfPosts; i++)
            postsHtml += this._getPost();
        if (this._isNewuser)
            return this.testHtmlGenerator.wrapNewSignedInUserPosts(postsHtml)
        else
            return this.testHtmlGenerator.wrapPosts(postsHtml);
    }

    _getPost() {
        if (this.isSignedIn)
            return this.testHtmlGenerator.getSignedInUserPost();
        else
            return this.testHtmlGenerator.getUnsignedInUserPost();
    }
}