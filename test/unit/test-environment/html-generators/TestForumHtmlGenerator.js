export { TestForumHtmlGenerator }

class TestForumHtmlGenerator {

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
            <div class="threadlist-wrapper">
                <div class="left-col">
                    <table id="threadslist">
                        <tbody>
                        </tbody>
                        <tbody id="threadbits_forum_7">
                            ` + entries + `
                        </tbody>
                    </table>
                </div>
            </div>`
    }

    wrapThreadAndFooter(content) {
        return `<form id="inlinemodform">
                    `+ content + `
                </form>`;
    }

    getNavigationRibbon(currentPageNo, totalPages) {
        return `<table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                `+ this.getForumPageNavigator(currentPageNo, totalPages) + `
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table`;
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

    getThreadEntry() {
        return `
        <tr>
            <td>title</td>
        </tr>`
    }
}