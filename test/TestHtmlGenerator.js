"use strict";
export { TestHtmlGenerator };

class TestHtmlGenerator {

    getUnsignedInUserPage() {
        return this.producePage(this.getHeader() + this.getNoticesElement() + this.getPost() + this.getPageNav());
    }

    getSignedInUserPage() {
        return this.producePage(this.getHeader() + this.getPost() + this.getPageNav());
    }

    producePage(content){
        return `<div class="left-col">`+content+`</div>`
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

    getPageNav() {
        return `<div class="pagenav">
                    <table>
                        <tbody>
                            <tr>
                                <td class="vbmenu_control">
                                    Page 1 of 2
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