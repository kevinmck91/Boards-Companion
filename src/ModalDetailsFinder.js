export { ModalDetailsFinder }
import { ElementFinder } from "./ElementFinder.js";

class ModalDetailsFinder {
    constructor() {
        this.elementFinder = new ElementFinder();
    }

    getUsername() {
        return this.elementFinder.getModalElement().querySelector('#username').value;
    }

    getSelectedColour() {
        let tagColourDropdown = document.body.querySelector('#tag-colour-dropdown');
        return tagColourDropdown.options[tagColourDropdown.selectedIndex].value
    }

    getSubmitButton() {
        return this.elementFinder.getModalElement().querySelector('[type="submit"]');
    }

    getCancelButton() {
        return this.elementFinder.getModalElement().querySelector('[type="submit"][value="cancel"]');
    }

    getTagText() {
        return this.elementFinder.getModalElement().querySelector('#tag-text').value;
    }

    getUserDetails() {
        let username = this.getUsername();
        let colour = this.getSelectedColour();
        let text = this.getTagText();
        return { username: username, colour: colour, text: text };
    }

}