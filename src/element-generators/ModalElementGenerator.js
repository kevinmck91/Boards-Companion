export { ModalElementGenerator }
import { FontAwesomeElementGenerator } from "./FontAwesomeElementGenerator.js";

class ModalElementGenerator {

    constructor() {
        this.fontAwesomeElementGenerator = new FontAwesomeElementGenerator();
    }

    generateModalElement() {
        let modalElement = document.createElement('form');
        modalElement.className = "modal-container"
        modalElement.innerHTML =
            `
            <div class="modal">
                <div class="modal-header">
                    <h2>Tag User - </h2>
                    `+ this._generateCloseModalElement().outerHTML + `
                 </div>
                <input type="hidden" id="username" value=""></input>
                <input type="hidden" id="user-id" value=""></input>
                <div class="modal-field">
                    <label>Colour</label>
                    `+ this._generateColourDropDownHtml() + `
                </div>
                <div class="modal-field">
                    <label>Text</label>
                    <input type ="text" id="tag-text" size="17"></input>
                </div>
                <div class="modal-submit">
                    <button type="submit" value="save">Save</button>
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
        let colourElement = this._generateTagEntryElement(taggedUserDetails.colour, taggedUserDetails.text);
        userlistEntry.appendChild(colourElement);
        userlistEntry.appendChild(this._generateDeleteUserElement());
        return userlistEntry;
    }

    _generateTaggedUsernameElement(username, userId) {
        let element = document.createElement('div');
        element.innerHTML = username;
        element.setAttribute('data-userid', userId);
        element.className = 'username-entry';
        return element;
    }

    _generateDeleteUserElement() {
        let deleteUserElement = document.createElement('div');
        deleteUserElement.className = 'delete-user-entry clickable';
        let fontAwesomeIcon = this.fontAwesomeElementGenerator.generateFontAwesomeIcon("fas fa-trash-alt");
        deleteUserElement.appendChild(fontAwesomeIcon);
        return deleteUserElement;
    }

    _generateColourDropDownHtml() {
        return ` <select id="tag-colour-dropdown">
                    <option style="background-color: green" value="green">green</option>
                    <option style="background-color: red" value="red">red</option>
                    <option style="background-color: orange" value="orange">orange</option>
                    <option style="background-color: pink" value="pink">pink</option>
                    <option style="background-color: purple" value="purple">purple</option>
                    <option style="background-color: white" value="white">white</option>
                    <option style="background-color: fuchsia" value="fuchsia">fuchsia</option>
                    <option style="background-color: lime" value="lime">lime</option>
                </select> `;
    }

    _generateCloseModalElement() {
        let closeElement = document.createElement('span');
        closeElement.className = 'clickable';
        closeElement.id = 'close-modal';
        let elementIcon = this.fontAwesomeElementGenerator.generateFontAwesomeIcon("fas fa-times fa-lg");
        closeElement.appendChild(elementIcon);
        return closeElement;
    }

    _generateTagEntryElement(colour, text) {
        let tagEntryElement = document.createElement('div');
        tagEntryElement.innerHTML = text;
        tagEntryElement.className = 'tag-entry';
        tagEntryElement.style.backgroundColor = colour;

        let tagEntryElementContainer = document.createElement('div');
        tagEntryElementContainer.className = 'tag-entry-container';
        tagEntryElementContainer.appendChild(tagEntryElement);
        return tagEntryElementContainer;
    }
}