import {hideSpecifiedElements} from "../src/elementDisplayUpdater.js";

it('Welcome notice hidden', () =>{
    document.body.innerHTML = getTestPage();
    hideSpecifiedElements();
    expect(document.getElementById('notices').style.display).toBe('none');
})

it('Avatar Info Hidden', () => {
    document.body.innerHTML = getTestPage();
    hideSpecifiedElements(); 
    expect(document.querySelectorAll('.alt2 .smallfont')[0].style.display).toBe('none');
})

function getTestPage(){
    return `<form id="notices">
                <div>Welcome</div>
            </form>
            <div id="edit111">
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