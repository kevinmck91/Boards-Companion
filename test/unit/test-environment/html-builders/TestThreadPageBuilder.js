export { TestThreadPageBuilder }
import { TestCommonHtmlGenerator } from "../html-generators/TestCommonHtmlGenerator.js";
import { TestPostBuilder } from "./TestPostBuilder.js";
import { TestThreadHtmlGenerator } from "../html-generators/TestThreadHtmlGenerator.js";

class TestThreadPageBuilder {

    constructor() {
        this.testCommonHtmlGenerator = new TestCommonHtmlGenerator();
        this.testPostBuilder = new TestPostBuilder();
        this.testThreadHtmlGenerator = new TestThreadHtmlGenerator();
        this.noOfPosts = 1;
        this._IsSignedIn = true;
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

    isSignedOut() {
        this._IsSignedIn = false;
        return this;
    }

    buildPage() {
        let pageContent = this._getNavigationRibbon();
        pageContent += this.testCommonHtmlGenerator.getHeader();
        pageContent += this._getNotices();
        pageContent += this._getPosts();
        pageContent += this.testThreadHtmlGenerator.wrapThreadFooterElements(this._getNavigationRibbon());
        let pageHtml = this.testCommonHtmlGenerator.wrapPageElements(pageContent);
        return pageHtml;
    }

    _getNavigationRibbon() {
        return this.testThreadHtmlGenerator.getNavigationRibbon(this.pageNo, this.maxNoOfPages);
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
        if (this._IsSignedIn) {
            for (let i = 1; i <= this.noOfPosts; i++)
                postsHtml += this._getPost();
        } else {
            for (let i = 1; i <= this.noOfPosts; i++) {
                if (i % 2 == 0) {
                    postsHtml += this.testThreadHtmlGenerator.getAd();
                } else {
                    postsHtml += this._getPost();
                }
            }
        }
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

    _getAdPost() {
        return this.testThreadHtmlGenerator.getAd();
    }
}