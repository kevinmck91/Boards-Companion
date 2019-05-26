export { NavigatorUpdater }
import { ElementFinder } from "./ElementFinder.js";
import { ThreadPageUpdater } from "./ThreadPageUpdater.js";

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