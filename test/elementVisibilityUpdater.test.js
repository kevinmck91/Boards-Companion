import { hideWelcomeNotice, hideAvatarInfo } from "../src/elementVisibilityUpdater.js";
import { getAllPosts, getAvatarInfoElements, getWelcomeNotice } from "../src/elementFinder.js";
import { getUnsignedInUserPage, getSignedInUserPage } from "./testHtmlGenerator.js";

it('Welcome notice hidden', () => {
    document.body.innerHTML = getUnsignedInUserPage();

    hideWelcomeNotice();
    
    expect(getWelcomeNotice().style.display).toBe('none');
})

it('Avatar Info Hidden', () => {
    document.body.innerHTML = getUnsignedInUserPage();
    
    hideAvatarInfo();
    
    expect(getAvatarInfoElements(getAllPosts()[0])[0].style.display).toBe('none');
})

it('Signed in user runs without exception', () => {
    document.body.innerHTML = getSignedInUserPage();
    
    hideWelcomeNotice();
})
