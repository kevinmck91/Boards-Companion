export { NavigationElementFinder }
import { ElementFinder } from "./ElementFinder.js";
import { ElementRemover } from "../ElementRemover.js";

class NavigationElementFinder {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementRemover = new ElementRemover();
    }

    getTopPageNavigator() {
        return document.querySelectorAll('.pagenav')[0];
    }

    getBottomPageNavigator() {
        return this.getBottomPageNavigatorFromDocument(document);
    }

    getBottomPageNavigatorFromDocument(htmlDocument) {
        const navigators = htmlDocument.querySelectorAll('.pagenav');
        return navigators[navigators.length - 1];
    }

    getForumBottomNavigationRibbonFromDocument(htmlDocument) {
        let bottomPageNavigator = this.getBottomPageNavigatorFromDocument(htmlDocument);
        let bottomNavationRibbon = this.elementFinder.findParentElement(bottomPageNavigator, 8);
        return bottomNavationRibbon;
    }

    getThreadBottomNavigationRibbonFromDocument(htmlDocument) {
        let bottomPageNavigator = this.getBottomPageNavigatorFromDocument(htmlDocument);
        let bottomPageNavigatorRibbon = this.elementFinder.findParentElement(bottomPageNavigator, 11);
        this._cleanPageNavigationRibbonElement(bottomPageNavigatorRibbon);
        return bottomPageNavigatorRibbon;
    }

    getTopPageNavigatorFromDocument(htmlDocument) {
        return htmlDocument.querySelectorAll('.pagenav')[0];
    }

    getNextPageElementFromNavigator(navigator) {
        return navigator.querySelector('.alt2 + .alt1');
    }

    getPreviousPageElementFromNavigator(navigator) {
        return navigator.querySelector('.alt2').previousElementSibling;
    }

    getLoadingElements() {
        return Array.from(document.querySelectorAll('.loading'));
    }

    _cleanPageNavigationRibbonElement(pageNavigationRibbon) {
        let table = pageNavigationRibbon.querySelectorAll('table')[0];
        let elementsForDeletion = this.elementFinder.getElementSiblings(table);
        this.elementRemover.removeElements(elementsForDeletion);
    }
}