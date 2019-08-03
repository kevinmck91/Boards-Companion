export { TestPostHtmlGenerator }

class TestPostHtmlGenerator {

    wrapSignedInUserPost(postContent) {
        return `
        <div align="center">`+ postContent + `</div>`;
    }


    wrapUnsignedInUserPost(postContent) {
        return `<div>` + postContent + `</div>`;
    }

    getUsernameElement() {
        return `
        <div id="postmenu_110237434">
            <a class="bigusername" href="member.php?u=1234">testusername</a>
            <script type="text/javascript"></script>
        </div>`;
    }

    getRegisteredUserElement() {
        return `
        <div class="smallfont">
            Registered User
        </div>`;
    }

    getCustomRegisteredUserElement(text) {
        return `
        <div class="smallfont">
            `+ text + `
        </div>`;
    }

    getStarsElement() {
        return `
        <div class="smallfont">
            <br>
            <img src="stars">
        </div>`;
    }

    getAvatarPictureElement() {
        return `
        <div class="smallfont">
            <a href="member">
                <img src="avatarpic">
            </a>
        </div>`;
    }

    getJoinDateElement() {
        return `
        <div>Join Date: Mar 2019</div>`;
    }

    getPostsElement() {
        return `
         <div>Posts:1,111</div>`;
    }

    getRegularLinksSection() {
        return `
        <div>
            <a href="test.com">Adverts</a>
            |
            <a href="test2.com">Friends</a>
        </div>`;
    }

    getModLinkSection() {
        return `
        <div>
        "Mod: "
            <a href="test.com">Forum1</a>
            ", "
            <a href="test2.com">Forum2</a>
        </div>`;
    }

    wrapAvatarInfoFooterElements(elements) {
        return ` 
        <div class="smallfont">
            &nbsp;
            <br>
            `+ elements + `           
            <div></div>
        </div>`;
    }

    wrapPostElements(elements) {
        return `
        <div id="edit111">
            <table id="post111">
                <tr>
                </tr>
                <tr valign="top">
                    <td class="alt2">
                    `+ elements + `
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

}

