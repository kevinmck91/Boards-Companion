export { WelcomeNoticeVisibilityUpdater }

import { NoticeElementFinder } from "../finders/NoticeElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";

class WelcomeNoticeVisibilityUpdater {

    constructor() {
        this.noticeElementFinder = new NoticeElementFinder();
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
    }

    hideWelcomeNotice() {
        const welcomeNotice = this.noticeElementFinder.searchForWelcomeNotice();
        if (welcomeNotice != null)
            this.elementVisibilityUpdater.hideElement(welcomeNotice);
    }
}