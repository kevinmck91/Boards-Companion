"use strict";
export { TestHtmlGenerator };

class TestHtmlGenerator {

    getUnsignedInUserPage() {
        return this.wrapPageElements(this.getPageNavigator(1, 2) +
            this.getHeader() +
            this.getWelcomeNotice() +
            this.wrapPosts(this.getUnsignedInUserPost()) +
            this.wrapFooterElements(this.getPageNavigator(1, 2)));
    }

    getSignedInUserPage() {
        return this.wrapPageElements(this.getPageNavigator(1, 2) +
            this.getHeader() +
            this.getNotice() +
            this.wrapPosts(this.getSignedInUserPost()) +
            this.wrapFooterElements(this.getPageNavigator(1, 2)));
    }

    getNewUserSignedInPage() {
        return this.wrapPageElements(this.getPageNavigator(1, 2) +
            this.getHeader() +
            this.getNotice() +
            this.wrapNewSignedInUserPosts(this.getSignedInUserPost()) +
            this.wrapFooterElements(this.getPageNavigator(1, 2)));
    }

    getSpecificSignedInUserPage(pageNo, maxNoOfPages) {
        return this.wrapPageElements(this.getPageNavigator(pageNo, maxNoOfPages) +
            this.getHeader() +
            this.wrapPosts(this.getSignedInUserPost()) +
            this.wrapFooterElements(this.getPageNavigator(pageNo, maxNoOfPages)));
    }

    convertToDocument(html) {
        let parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    }

    wrapPageElements(elements) {
        return `<div class="wrapper">` + elements + `</div>`;
    }

    wrapPosts(elements) {
        return `
        <div id="posts">
            <div class="left-col">
                ` + elements + `
            </div>
        </div>`;
    }

    wrapNewSignedInUserPosts(elements) {
        return `<div id="posts">` + elements + `</div>`;
    }

    wrapFooterElements(elements) {
        return `<div align="centre">` + elements + `</div>`;
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

    getPostContent() {
        return `
        <div id="edit111">
            <table>
                <tr>
                </tr>
                <tr>
                    <td class="alt2">
                        <div>
                            <a>username</a>
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

    getPageNavigator(currentPageNo, totalPages) {
        return `<div class="pagenav">
        <table>
            <tbody>
                <tr>
                    <td class="vbmenu_control">
                        Page `+ currentPageNo + ` of ` + totalPages + `
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

    getHeader() {
        return `<div class="nav-area"></div>
            <div id="header"></div>
            <div id="breadcrumb" style="top:87px;"></div>`;
    }

    getExistingJavascriptElement() {
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