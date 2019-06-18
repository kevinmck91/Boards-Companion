"use strict";
export { ElementGenerator };

class ElementGenerator {

    generateLoadingElement() {
        let loadingElement = document.createElement('div');
        loadingElement.className = "loading";
        loadingElement.innerText = "loading...";
        loadingElement.style.textAlign = "center";
        loadingElement.style.paddingBottom = "4px";
        return loadingElement;
    }

    generateBottomPageNoElement(pageNo) {
        let pageNoElement = document.createElement('div');
        pageNoElement.innerHTML = "page " + pageNo;
        pageNoElement.style.textAlign = "center";
        pageNoElement.style.paddingBottom = "5px";
        pageNoElement.style.paddingTop = "12px";
        return pageNoElement;
    }

    generateForumTopPageNoElement(pageNo) {
        let pageNoElement = this.generateThreadTopPageNoElement(pageNo);
        pageNoElement.style.paddingTop = "4px";
        return pageNoElement;
    }

    generateThreadTopPageNoElement(pageNo) {
        let pageNoElement = document.createElement('div');
        pageNoElement.innerHTML = "page " + pageNo;
        pageNoElement.style.textAlign = "center";
        pageNoElement.style.paddingBottom = "20px";
        return pageNoElement;
    }

    generateScriptElement(contents) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = contents;
        return script;
    }

    generateTagElement() {
        let tagElement = document.createElement('div');
        tagElement.className = "tagUser"
        tagElement.style.cursor = "pointer";
        tagElement.style.color = '#3d5686';
        tagElement.style.display = 'inline-block';

        let tagIconElement = this._generateTagIconElement();
        tagElement.appendChild(tagIconElement);
        return tagElement;
    }

    _generateTagIconElement() {
        let tagIconElement = document.createElement('i');
        tagIconElement.className = "fas fa-tag"
        return tagIconElement;
    }

}