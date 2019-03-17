"use strict";
export { TestHtmlGenerator };

class TestHtmlGenerator {

    getUnsignedInUserPage() {
        return this.wrapPageElements(this.getPageNavigator(1, 2) +
            this.getHeader() +
            this.getWelcomeNotice() +
            this.wrapMidsectionElements(this.getPost()) +
            this.wrapFooterElements(this.getPageNavigator(1, 2)));
    }

    getSignedInUserPage() {
        return this.wrapPageElements(this.getPageNavigator(1, 2) +
            this.getHeader() +
            this.getNotice() +
            this.wrapMidsectionElements(this.getPost()) +
            this.wrapFooterElements(this.getPageNavigator(1, 2)));
    }

    getSpecificSignedInUserPage(pageNo, maxNoOfPages) {
        return this.wrapPageElements(this.getPageNavigator(pageNo, maxNoOfPages) +
            this.getHeader() +
            this.wrapMidsectionElements(this.getPost()) +
            this.wrapFooterElements(this.getPageNavigator(pageNo, maxNoOfPages)));
    }

    convertToDocument(html) {
        let parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    }

    wrapPageElements(elements) {
        return `<div class="wrapper">` + elements + `</div>`;
    }

    wrapMidsectionElements(elements) {
        return `<div class="left-col">` + elements + `</div>`;
    }

    wrapFooterElements(elements) {
        return `<div align="centre">` + elements + `</div>`;
    }

    getNotice() {
        return `<form id="notices">
                <div>Catch up with all the community</div>
            </form>`;
    }

    getWelcomeNotice() {
        return `<form id="notices">
                <div>here are some tips and tricks to help you get started</div>
            </form>`
    }

    getPost() {
        return `
        <div align="center">
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
            </div>
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
}