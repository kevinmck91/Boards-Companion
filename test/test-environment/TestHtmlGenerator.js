"use strict";
export { TestHtmlGenerator };

class TestHtmlGenerator {

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

    wrapPosts(posts) {
        return `
        <div id="posts">
            <div class="left-col">
                ` + posts + this.getLastPostElement() + `
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
            <div class="threadlist-wrapper">
                <div class="left-col">
                    <table id="threadslist">
                        <tbody>
                        </tbody>
                        <tbody id="threadbits_forum_7">
                            ` + entries + `
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td>New Thread</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>`
    }

    wrapNotices(noticeElements) {
        return `
        <form id="notices">
            `+ noticeElements + `
        </form>`;
    }

    getNormalNotice() {
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

    getPostWithoutAvatarPicture() {
        `<div align="center">` + this.getPostContentWithoutAvatarPicture() + `</div>`;
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
                            <a class="bigusername" href="member.php?u=1234">testusername</a>
                            <script type="text/javascript"></script>
                        </div>
                        <div class="smallfont">
                            Registered User
                        </div>
                        <div class="smallfont">
                            <br>
                            <img src="stars">
                        </div>
                        <div class="smallfont">
                            <a href="member">
                                <img src="avatarpic">
                            </a>
                        </div>
                        <div class="smallfont">
                        	&nbsp;
                            <br>
                            <div>Join Date: Mar 2019</div>
                            <div>Posts:1,111</div>
                            <div>
                                <a href="test.com">Adverts</a>
                                |
                                <a href="test2.com">Friends</a>
                            </div>
                            <div></div>
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

    getPostContentWithoutAvatarPicture() {
        return `
        <div id="edit111">
            <table id="post111">
                <tr>
                </tr>
                <tr valign="top">
                    <td class="alt2">
                        <div id="postmenu_110237434">
                            <a class="bigusername" href="member.php?u=1234">testusername</a>
                            <script type="text/javascript"></script>
                        </div>
                        <div class="smallfont">
                            Registered User
                        </div>
                        <div class="smallfont">
                            <img src="stars">
                        </div>
                        <div class="smallfont">
                        	&nbsp;
                            <br>
                            <div>Join Date: Mar 2019</div>
                            <div>Posts:1,111</div>
                            <div>
                                <a href="test.com">Adverts</a>
                                |
                                <a href="test2.com">Friends</a>
                            </div>
                            <div></div>
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

    getModeratorPostContent() {
        return `
        <div id="edit111">
            <table id="post111">
                <tr>
                </tr>
                <tr valign="top">
                    <td class="alt2">
                        <div id="postmenu_110237434">
                            <a class="bigusername" href="member.php?u=1234">testusername</a>
                            <script type="text/javascript"></script>
                        </div>
                        <div class="smallfont">
                            Registered User
                        </div>
                        <div class="smallfont">
                            <br>
                            <img src="stars">
                        </div>
                        <div class="smallfont">
                            <a href="member">
                                <img src="avatarpic">
                            </a>
                        </div>
                        <div class="smallfont">
                        	&nbsp;
                            <br>
                            <div>Join Date: Mar 2019</div>
                            <div>Posts:1,111</div>
                            <div>
                                <a href="test.com">Adverts</a>
                                |
                                <a href="test2.com">Friends</a>
                            </div>
                            <div>
                            "Mod: "
                                <a href="test.com">Forum1</a>
                                ", "
                                <a href="test2.com">Forum2</a>
                            </div>
                            <div></div>
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