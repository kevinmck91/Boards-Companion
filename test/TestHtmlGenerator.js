"use strict";
export { TestHtmlGenerator };

class TestHtmlGenerator {

    getUnsignedInUserPage() {
        return this.getHeader() + this.getNoticesElement() + this.getPost();
    }

    getSignedInUserPage() {
        return this.getHeader() + this.getPost();
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

    getHeader() {
        return `<div class="nav-area"></div>
            <div id="header"></div>
            <div id="breadcrumb" style="top:87px;"></div>`;
    }
}