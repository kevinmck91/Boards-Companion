export { ModalDetailsFinder }
import { ElementFinder } from "../finders/ElementFinder.js";

class ModalDetailsFinder {

    constructor() {
        this.elementFinder = new ElementFinder();
    }

    getUsername() {
        return this.elementFinder.getTaggerModalUsernameElement().value;
    }

    getUserId() {
        return this.elementFinder.getTaggerModalUserIdElement().value;
    }

    getSelectedColour() {
        let tagColourDropdown = document.body.querySelector('#tag-colour-dropdown');
        return tagColourDropdown.options[tagColourDropdown.selectedIndex].value
    }

    getTagText() {
        return this.elementFinder.getTaggerModalElement().querySelector('#tag-text').value;
    }

    getUserDetails() {
        let username = this.getUsername();
        let colour = this.getSelectedColour();
        let text = this.getTagText();
        let userId = this.getUserId();
        return { username: username, colour: colour, text: text, userId: userId };
    }

}