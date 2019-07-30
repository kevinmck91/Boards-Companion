export { TestForumPageBuilder }

import { TestCommonHtmlGenerator } from "../TestCommonHtmlGenerator.js";
import { TestForumHtmlGenerator } from "../TestForumHtmlGenerator.js";

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
        let pageContent = this.testForumHtmlGenerator.getForumPageNavigator(this.pageNo, this.maxNoOfPages);
        pageContent += this.testCommonHtmlGenerator.getHeader();
        pageContent += this.testForumHtmlGenerator.wrapThreadEntries(this.testForumHtmlGenerator.getThreadEntry());
        pageContent += this.testForumHtmlGenerator.wrapForumFooterNavigator(this.testForumHtmlGenerator.getForumPageNavigator(this.pageNo, this.maxNoOfPages));
        return this.testCommonHtmlGenerator.wrapPageElements(pageContent);
    }
}