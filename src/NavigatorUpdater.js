export { NavigatorUpdater }
import { NavigationElementFinder } from "./finders/NavigationElementFinder.js";
import { ThreadPageUpdater } from "./page-updater/ThreadPageUpdater.js";

class NavigatorUpdater {

    constructor() {
        this.threadPageUpdater = new ThreadPageUpdater();
        this.navigationElementFinder = new NavigationElementFinder();
    }

    updateBottomPageNavigatorFromDocument(htmlDocument) {
        let newNavigator = this.navigationElementFinder.getTopPageNavigatorFromDocument(htmlDocument);
        let currentNavigator = this.navigationElementFinder.getBottomPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }

    updateTopPageNavigatorFromDocument(htmlDocument) {
        let newNavigator = this.navigationElementFinder.getTopPageNavigatorFromDocument(htmlDocument);
        let currentNavigator = this.navigationElementFinder.getTopPageNavigator();
        currentNavigator.parentNode.replaceChild(newNavigator, currentNavigator);
    }



}