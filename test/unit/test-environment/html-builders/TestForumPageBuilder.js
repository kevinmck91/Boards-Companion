export { TestForumPageBuilder }

import { TestCommonHtmlGenerator } from "../html-generators/TestCommonHtmlGenerator.js";
import { TestForumHtmlGenerator } from "../html-generators/TestForumHtmlGenerator.js";

class TestForumPageBuilder {

    constructor() {
        this.pageNo = 1;
        this.maxNoOfPages = 2;
        this.testCommonHtmlGenerator = new TestCommonHtmlGenerator();
        this.testForumHtmlGenerator = new TestForumHtmlGenerator();
        this.isSignedIn = true;
    }

    specificPage(pageNo, maxNoOfPages) {
        this.pageNo = pageNo;
        this.maxNoOfPages = maxNoOfPages;
        return this;
    }

    isSignedOut() {
        this.isSignedIn = false;
        return this;
    }

    buildPage() {
        let pageContent = this.testForumHtmlGenerator.getNavigationRibbon(this.pageNo, this.maxNoOfPages);
        pageContent += this._getHeader();
        let threadAndFooterContent = this._getThreadAndFooterContent();
        pageContent += this.testForumHtmlGenerator.wrapThreadAndFooter(threadAndFooterContent);
        return this.testCommonHtmlGenerator.wrapPageElements(pageContent);
    }

    _getHeader() {
        if (this.isSignedIn)
            return this.testCommonHtmlGenerator.getHeader();
        else
            return this.testCommonHtmlGenerator.getSignedOutHeader();
    }

    _getThreadAndFooterContent() {
        let threadAndFooterContent = "";
        if (this.isSignedIn)
            threadAndFooterContent = this.testForumHtmlGenerator.wrapThreadEntries(this.testForumHtmlGenerator.getThreadEntry());
        else
            threadAndFooterContent = this.testForumHtmlGenerator.wrapSignedOutThreadEntries(this.testForumHtmlGenerator.getThreadEntry());
        threadAndFooterContent += this.testForumHtmlGenerator.wrapForumFooterNavigator(this.testForumHtmlGenerator.getNavigationRibbon(this.pageNo, this.maxNoOfPages));
        return threadAndFooterContent;
    }
}