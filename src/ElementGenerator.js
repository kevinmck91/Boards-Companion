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

    generateTagIconElement() {
        let tagElement = document.createElement('div');
        tagElement.className = "tag-user"
        let tagIconElementContent = this._generateTagIconContent();
        tagElement.appendChild(tagIconElementContent);
        return tagElement;
    }

    generateUserTagElement(taggedUserDetails) {
        let userTag = document.createElement('div');
        userTag.innerHTML = taggedUserDetails.text;
        userTag.style.backgroundColor = taggedUserDetails.colour;
        userTag.className = 'user-tag';
        return userTag;
    }

    generateModalElement() {
        let modalElement = document.createElement('form');
        modalElement.className = "modal"
        modalElement.innerHTML =
            `
            <h1>Tag User:</h1>
                <input type="hidden" id="username" value=""></input>
                `+ this._generateColourDropDown() + `
                <input type ="text" id="tag-text"></input>
            <button type="submit" value="save">save</button>
            <button type="submit" value="cancel">cancel</button>
            `;
        return modalElement;
    }

    _generateColourDropDown() {
        return ` <select id="tag-colour-dropdown">
                    <option value="red">red</option>
                    <option value="green">green</option>
                    <option value="yellow">yellow</option>
                    <option value="blue">blue</option>
                </select> `;
    }

    _generateTagIconContent() {
        let tagIconElement = document.createElement('i');
        tagIconElement.className = "fas fa-tag"
        return tagIconElement;
    }

}