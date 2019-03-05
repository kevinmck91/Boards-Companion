import { hideSpecifiedElements } from "../src/elementDisplayUpdater.js";

it('Welcome notice hidden', () => {
    document.body.innerHTML = getUnsignedInUserPage();
    hideSpecifiedElements();
    expect(document.getElementById('notices').style.display).toBe('none');
})

it('Avatar Info Hidden', () => {
    document.body.innerHTML = getUnsignedInUserPage();
    hideSpecifiedElements();
    expect(document.querySelectorAll('.alt2 .smallfont')[0].style.display).toBe('none');
})

it('Signed in user runs without exception', () => {
    document.body.innerHTML = getSignedInUserPage();
    hideSpecifiedElements();
})

it('Header elements hidden', () => {
    document.body.innerHTML = getUnsignedInUserPage();
    hideSpecifiedElements();
    const breadcrumb = document.body.children[2];
    expect(breadcrumb.style.display).toBe('none');
})

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

function getHeader(){
    return `<div class="nav-area"></div>
            <div id="header"></div>
            <div id="breadcrumb"></div>`;
}