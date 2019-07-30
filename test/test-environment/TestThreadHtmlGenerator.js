export { TestThreadHtmlGenerator }

class TestThreadHtmlGenerator {

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

    getLastPostElement() {
        return `<div id="lastpost"></div>`
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
}