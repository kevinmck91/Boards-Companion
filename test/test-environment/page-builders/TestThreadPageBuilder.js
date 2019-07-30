export { TestThreadPageBuilder }
import { TestCommonHtmlGenerator } from "../TestCommonHtmlGenerator.js";
import { TestPostBuilder } from "../TestPostBuilder.js";
import { TestThreadHtmlGenerator } from "../TestThreadHtmlGenerator.js";

class TestThreadPageBuilder {

    constructor() {
        this.testCommonHtmlGenerator = new TestCommonHtmlGenerator();
        this.testPostBuilder = new TestPostBuilder();
        this.testThreadHtmlGenerator = new TestThreadHtmlGenerator();
        this.noOfPosts = 1;
        this.IsSignedIn = true;
        this._hasNormalNotice = false;
        this._hasWelcomeNotice = false;
        this.hasNotices = false;
        this._isNewuser = false;
        this.pageNo = 1;
        this.maxNoOfPages = 2;
        this._hasUserAvatarPics = true;
        this._isModeratorPosts = false;
        this._isPostContentSpecified = false;
        this._specifiedPostContent = "";
    }

    withMultiplePosts(noOfPosts) {
        this.noOfPosts = noOfPosts;
        return this;
    }

    isNewUser() {
        this._isNewuser = true;
        return this;
    }

    specifyPostContent(post) {
        this._isPostContentSpecified = true;
        this._specifiedPostContent = post;
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
        pageContent += this.testCommonHtmlGenerator.getHeader();
        pageContent += this._getNotices();
        pageContent += this._getPosts();
        pageContent += this.testThreadHtmlGenerator.wrapThreadFooterElements(this._getPageNavigator());
        let pageHtml = this.testCommonHtmlGenerator.wrapPageElements(pageContent);
        return pageHtml;
    }

    _getPageNavigator() {
        return this.testThreadHtmlGenerator.getThreadPageNavigator(this.pageNo, this.maxNoOfPages);
    }

    _getNotices() {
        if (this.hasNotices) {
            let noticeElements = "";
            if (this._hasWelcomeNotice)
                noticeElements += this.testThreadHtmlGenerator.getWelcomeNotice();
            else
                noticeElements += this.testThreadHtmlGenerator.getNormalNotice();
            return this.testThreadHtmlGenerator.wrapNotices(noticeElements);
        } else
            return "";
    }

    _getPosts() {
        let postsHtml = "";
        for (let i = 0; i < this.noOfPosts; i++)
            postsHtml += this._getPost();
        if (this._isNewuser)
            return this.testThreadHtmlGenerator.wrapNewSignedInUserPosts(postsHtml)
        else
            return this.testThreadHtmlGenerator.wrapPosts(postsHtml);
    }

    _getPost() {
        if (this._isPostContentSpecified) {
            return this._specifiedPostContent;
        } else {
            return this.testPostBuilder.build();
        }
    }
}