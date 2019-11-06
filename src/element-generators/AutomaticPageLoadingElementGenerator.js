export { AutomaticPageLoadingElementGenerator }
import { FontAwesomeElementGenerator } from "./FontAwesomeElementGenerator.js";

class AutomaticPageLoadingElementGenerator {

    constructor() {
        this.fontAwesomeElementGenerator = new FontAwesomeElementGenerator();
    }

    generateLoadingElement() {
        let loadingElement = document.createElement('div');
        loadingElement.className = "loading";
        loadingElement.style.textAlign = "center";
        loadingElement.style.paddingTop = "4px";
        loadingElement.style.paddingBottom = "8px";
        loadingElement.style.color = "#3d5686"
        let spinner = this.fontAwesomeElementGenerator.generateFontAwesomeIcon("fas fa-spinner fa-spin");
        loadingElement.insertAdjacentHTML('beforeend', spinner.outerHTML);
        return loadingElement;
    }

    generateBottomPageNoElement(pageNo) {
        let pageNoElement = document.createElement('div');
        pageNoElement.innerHTML = "page " + pageNo;
        pageNoElement.style.textAlign = "center";
        pageNoElement.style.paddingBottom = "5px";
        pageNoElement.style.paddingTop = "12px";
        pageNoElement.className = 'page-number';
        return pageNoElement;
    }

    generateForumTopPageNoElement(pageNo) {
        let pageNoElement = this.generateThreadTopPageNoElement(pageNo);
        pageNoElement.style.paddingTop = "4px";
        pageNoElement.className = 'page-number';
        return pageNoElement;
    }

    generateThreadTopPageNoElement(pageNo) {
        let pageNoElement = document.createElement('div');
        pageNoElement.innerHTML = "page " + pageNo;
        pageNoElement.style.textAlign = "center";
        pageNoElement.style.paddingBottom = "20px";
        pageNoElement.className = 'page-number';
        return pageNoElement;
    }
}