export { NavigatorUpdater }
import { ElementFinder } from "./finders/ElementFinder.js";
import { ThreadPageUpdater } from "./page-updater/ThreadPageUpdater.js";

class NavigatorUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.threadPageUpdater = new ThreadPageUpdater();
    }

    updateBottomPageNavigatorFromDocument(htmlDocument) {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(htmlDocument);
        let currentNavigator = this.elementFinder.getBottomPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }

    updateTopPageNavigatorFromDocument(htmlDocument) {
        let newNavigator = this.elementFinder.getTopPageNavigatorFromDocument(htmlDocument);
        let currentNavigator = this.elementFinder.getTopPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }



}