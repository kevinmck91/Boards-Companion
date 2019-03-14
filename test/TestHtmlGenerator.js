"use strict";
export { TestHtmlGenerator };

class TestHtmlGenerator {

    getUnsignedInUserPage() {
        return this.getPageNavigator(1, 2) + this.getHeader() + this.getNoticesElement() + this.collatePosts(this.getPost()) + this.getPageNavigator(1, 2);
    }

    getSignedInUserPage() {
        return this.getPageNavigator(1, 2) + this.getHeader() + this.collatePosts(this.getPost()) + this.getPageNavigator(1, 2);
    }

    getSpecificSignedInUserPage(pageNo, maxNoOfPages){
        return this.getPageNavigator(pageNo, maxNoOfPages) + this.getHeader() + this.collatePosts(this.getPost()) + this.getPageNavigator(pageNo, maxNoOfPages);
    }

    collatePosts(posts) {
        return `<div class="left-col">` + posts + `</div>`
    }

    getNoticesElement() {
        return `<form id="notices">
                <div>Welcome</div>
            </form>`;
    }

    getPost() {
        return `<div id="edit111">
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