"use strict";
export { getUnsignedInUserPage, getSignedInUserPage };

function getUnsignedInUserPage() {
    return getHeader() + getNoticesElement() + getPost();
}

function getSignedInUserPage() {
    return getHeader() + getPost();
}

function getNoticesElement() {
    return `<form id="notices">
                <div>Welcome</div>
            </form>`;
}

function getPost() {
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

function getHeader() {
    return `<div class="nav-area"></div>
            <div id="header"></div>
            <div id="breadcrumb" style="top:87px;"></div>`;
}