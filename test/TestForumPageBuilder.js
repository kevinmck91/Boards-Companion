export { TestForumPageBuilder }

import { TestHtmlGenerator } from "./TestHtmlGenerator.js";

class TestForumPageBuilder {

    constructor() {
        this.pageNo = 1;
        this.maxNoOfPages = 2;
        this.testHtmlGenerator = new TestHtmlGenerator();
    }

    specificPage(pageNo, maxNoOfPages) {
        this.pageNo = pageNo;
        this.maxNoOfPages = maxNoOfPages;
        return this;
    }

    buildPage() {
        let pageContent = this.testHtmlGenerator.getForumPageNavigator(this.pageNo, this.maxNoOfPages);
        pageContent += this.testHtmlGenerator.getHeader();
        pageContent += this.testHtmlGenerator.wrapThreadEntries(this.testHtmlGenerator.getThreadEntry());
        pageContent += this.testHtmlGenerator.wrapForumFooterNavigator(this.testHtmlGenerator.getForumPageNavigator(this.pageNo, this.maxNoOfPages));
        return this.testHtmlGenerator.wrapPageElements(pageContent);
    }
}