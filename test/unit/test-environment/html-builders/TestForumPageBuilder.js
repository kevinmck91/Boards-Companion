export { TestForumPageBuilder }

import { TestCommonHtmlGenerator } from "../html-generators/TestCommonHtmlGenerator.js";
import { TestForumHtmlGenerator } from "../html-generators/TestForumHtmlGenerator.js";

class TestForumPageBuilder {

    constructor() {
        this.pageNo = 1;
        this.maxNoOfPages = 2;
        this.testCommonHtmlGenerator = new TestCommonHtmlGenerator();
        this.testForumHtmlGenerator = new TestForumHtmlGenerator();
    }

    specificPage(pageNo, maxNoOfPages) {
        this.pageNo = pageNo;
        this.maxNoOfPages = maxNoOfPages;
        return this;
    }

    buildPage() {
        let pageContent = this.testForumHtmlGenerator.getNavigationRibbon(this.pageNo, this.maxNoOfPages);
        pageContent += this.testCommonHtmlGenerator.getHeader();
        let threadAndFooterContent = this.testForumHtmlGenerator.wrapThreadEntries(this.testForumHtmlGenerator.getThreadEntry());
        threadAndFooterContent += this.testForumHtmlGenerator.wrapForumFooterNavigator(this.testForumHtmlGenerator.getNavigationRibbon(this.pageNo, this.maxNoOfPages));
        pageContent += this.testForumHtmlGenerator.wrapThreadAndFooter(threadAndFooterContent);
        return this.testCommonHtmlGenerator.wrapPageElements(pageContent);
    }
}