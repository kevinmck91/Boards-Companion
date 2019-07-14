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
        let tagIconElement = document.createElement('span');
        tagIconElement.className = "tag-icon clickable";
        let tagIconElementContent = this._generateFontAwesomeIcon("fas fa-tag");
        tagIconElement.appendChild(tagIconElementContent);
        return tagIconElement;
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
        modalElement.className = "modal-container"
        modalElement.innerHTML =
            `
            <div class="modal">
                <h2>Tag User - </h2>
                    <input type="hidden" id="username" value=""></input>
                    <input type="hidden" id="user-id" value=""></input>
                    <div class="modal-field">
                        <label>Colour</label>
                        `+ this._generateColourDropDown() + `
                    </div>
                    <div class="modal-field">
                        <label>Text</label>
                        <input type ="text" id="tag-text" size="17"></input>
                    </div>
                    <div class="modal-submit">
                        <button type="submit" value="save">save</button>
                        <button type="submit" value="cancel">cancel</button>
                    </div>
                    <div class="modal-field">
                        <a id="show-tagged-users">Show all tagged users</a>
                    </div>
                    <div id="user-list">
                    </div>
                </div>
            `;
        return modalElement;
    }

    generateUserListEntry(taggedUserDetails) {
        let userlistEntry = document.createElement('div');
        userlistEntry.className = 'user-list-entry';
        let usernameElement = this._generateTaggedUsernameElement(taggedUserDetails.username, taggedUserDetails.userId);
        userlistEntry.appendChild(usernameElement);
        userlistEntry.appendChild(this._generateDeleteUserElement());
        return userlistEntry;
    }

    _generateTaggedUsernameElement(username, userId) {
        let element = document.createElement('div');
        element.innerHTML = username;
        element.setAttribute('data-userid', userId);
        return element;
    }

    _generateDeleteUserElement() {
        let deleteUserElement = document.createElement('div');
        deleteUserElement.className = 'delete-user clickable';
        let fontAwesomeIcon = this._generateFontAwesomeIcon("fas fa-times");
        deleteUserElement.appendChild(fontAwesomeIcon);
        return deleteUserElement;
    }

    _generateColourDropDown() {
        return ` <select id="tag-colour-dropdown">
                    <option value="red">red</option>
                    <option value="green">green</option>
                    <option value="yellow">yellow</option>
                    <option value="blue">blue</option>
                </select> `;
    }

    _generateFontAwesomeIcon(iconClass) {
        let tagIconElement = document.createElement('i');
        tagIconElement.className = iconClass;
        return tagIconElement;
    }

}