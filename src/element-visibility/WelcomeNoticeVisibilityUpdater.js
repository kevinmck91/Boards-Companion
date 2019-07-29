export { WelcomeNoticeVisibilityUpdater }

import { ElementFinder } from "../finders/ElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";

class WelcomeNoticeVisibilityUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
    }

    hideWelcomeNotice() {
        const welcomeNotice = this.elementFinder.searchForWelcomeNotice();
        if (welcomeNotice != null)
            this.elementVisibilityUpdater.hideElement(welcomeNotice);
    }
}