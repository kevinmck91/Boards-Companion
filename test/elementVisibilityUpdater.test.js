import { ElementVisibilityUpdater } from "../src/ElementVisibilityUpdater.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let elementFinder = new ElementFinder();
let testHtmlGenerator = new TestHtmlGenerator();

it('Welcome notice hidden', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();

    elementVisibilityUpdater.hideWelcomeNotice();
    
    expect(elementFinder.getWelcomeNotice().style.display).toBe('none');
})

it('Avatar Info Hidden', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();
    
    elementVisibilityUpdater.hideAvatarInfo();
    
    expect(elementFinder.getAvatarInfoElements(elementFinder.getAllPosts()[0])[0].style.display).toBe('none');
})

it('Signed in user runs without exception', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();
    
    elementVisibilityUpdater.hideWelcomeNotice();
})
