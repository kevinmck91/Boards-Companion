"use strict";
export { TestHtmlGenerator };

class TestHtmlGenerator {

    getUnsignedInUserPage() {
        return this.wrapPageElements(this.getThreadPageNavigator(1, 2) +
            this.getHeader() +
            this.getWelcomeNotice() +
            this.wrapPosts(this.getUnsignedInUserPost()) +
            this.wrapThreadFooterElements(this.getThreadPageNavigator(1, 2)));
    }

    getSignedInUserPage() {
        return this.wrapPageElements(this.getThreadPageNavigator(1, 2) +
            this.getHeader() +
            this.getNotice() +
            this.wrapPosts(this.getSignedInUserPost()) +
            this.wrapThreadFooterElements(this.getThreadPageNavigator(1, 2)));
    }

    getNewUserSignedInPage() {
        return this.wrapPageElements(this.getThreadPageNavigator(1, 2) +
            this.getHeader() +
            this.getNotice() +
            this.wrapNewSignedInUserPosts(this.getSignedInUserPost()) +
            this.wrapThreadFooterElements(this.getThreadPageNavigator(1, 2)));
    }

    getSpecificSignedInUserPage(pageNo, maxNoOfPages) {
        return this.wrapPageElements(this.getThreadPageNavigator(pageNo, maxNoOfPages) +
            this.getHeader() +
            this.wrapPosts(this.getSignedInUserPost()) +
            this.wrapThreadFooterElements(this.getThreadPageNavigator(pageNo, maxNoOfPages)));
    }

    getForumHomePage(pageNo, maxNoOfPages) {
        return this.wrapPageElements(this.getForumPageNavigator(pageNo, maxNoOfPages)) +
            this.getHeader() +
            this.wrapThreadEntries(this.getThreadEntry()) +
            this.wrapForumFooterNavigator(this.getForumPageNavigator(pageNo, maxNoOfPages));
    }

    convertToDocument(html) {
        let parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    }

    wrapPageElements(elements) {
        return `
        <div class="wrapper">
            `+ elements + `
        </div>`;
    }

    wrapPosts(elements) {
        return `
        <div id="posts">
            <div class="left-col">
                ` + elements + this.getLastPostElement() + `
            </div>
        </div>`;
    }

    wrapNewSignedInUserPosts(elements) {
        return `<div id="posts">` + elements + `</div>`;
    }

    wrapThreadFooterElements(elements) {
        return `<div align="centre">` + elements + `</div>`;
    }

    wrapForumFooterNavigator(navigator) {
        return `
        <table>
            <tbody>
                <tr>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <td>`+ navigator + `</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    }

    wrapThreadEntries(entries) {
        return `
        <form id="inlinemodform">
            <table id="threadslist">
                <tbody>
                </tbody>
                <tbody id="threadbits_forum_7">
                    ` + entries + `
                </tbody>
            </table>
        </form>`
    }

    getNotice() {
        return `
        <form id="notices">
            <div>Catch up with all the community</div>
        </form>`;
    }

    getWelcomeNotice() {
        return `
        <form id="notices">
            <div>here are some tips and tricks to help you get started</div>
        </form>`;
    }

    getSignedInUserPost() {
        return `
        <div align="center">`+ this.getPostContent() + `</div>`;
    }

    getUnsignedInUserPost() {
        return `<div>` + this.getPostContent() + `</div>`;
    }

    getLastPostElement() {
        return `<div id="lastpost"></div>`
    }

    getPostContent() {
        return `
        <div id="edit111">
            <table id="post111">
                <tr>
                </tr>
                <tr valign="top">
                    <td class="alt2">
                        <div id="postmenu_110237434">
                            <a class="bigusername">testusername</a>
                        </div>
                        <div class="smallfont">
                            Registered User
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a class="postbit_thanks"></a>
                    </td>
                </tr>
            </table>
        </div>`;
    }

    getThreadPageNavigator(currentPageNo, totalPages) {
        return `<div class="pagenav">
                    <table>
                        <tbody>
                            <tr>
                                <td class="vbmenu_control">
                                    Page `+ currentPageNo + ` of ` + totalPages + `
                                </td>
                                <td class="alt1">
                                    <a href="showthread.php?t=1111&page=`+ (currentPageNo - 1) + `"></a>
                                </td>
                                <td class="alt2">
                                </td>
                                <td class="alt1">
                                    <a href="showthread.php?t=1111&page=`+ (currentPageNo + 1) + `"></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>`;
    }

    getForumPageNavigator(currentPageNo, totalPages) {
        return `<div class="pagenav">
                    <table>
                        <tbody>
                            <tr>
                                <td class="vbmenu_control">
                                    Page `+ currentPageNo + ` of ` + totalPages + `
                                </td>
                                <td class="alt1">
                                    <a href="forumdisplay.php?f=7&order=desc&page=`+ (currentPageNo - 1) + `"></a>
                                </td>
                                <td class="alt2">
                                </td>
                                <td class="alt1">
                                    <a href="forumdisplay.php?f=7&order=desc&page=`+ (currentPageNo + 1) + `"></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>`
    }

    getHeader() {
        return `
        <div class="nav-area"></div>
        <div id="header"></div>
        <div id="breadcrumb" style="top:87px;"></div>`;
    }

    getThreadEntry() {
        return `
        <tr>
            <td>title</td>
        </tr>`
    }

    getExistingJavascriptScriptElement() {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `
        Boards = function() { 
            Boards = {};
            Boards.Thread = {ready:false};
            Boards.load = function load(){};
            return Boards
        }();
        function qr_init(){}`;
        return script;
    }


}