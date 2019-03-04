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

function getUnsignedInUserPage() {
    return getNoticesElement() + getPost();
}

function getSignedInUserPage() {
    getPost();
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