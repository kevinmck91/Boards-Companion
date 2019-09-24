export { ModalDetailsFinder }
import { TaggerModalElementFinder } from "../finders/TaggerModalElementFinder.js";

class ModalDetailsFinder {

    constructor() {
        this.taggerModalElementFinder = new TaggerModalElementFinder();
    }

    getUsername() {
        return this.taggerModalElementFinder.getTaggerModalUsernameElement().value;
    }

    getUserId() {
        return this.taggerModalElementFinder.getTaggerModalUserIdElement().value;
    }

    getSelectedColour() {
        let tagColourDropdown = document.body.querySelector('#tag-colour-dropdown');
        return tagColourDropdown.options[tagColourDropdown.selectedIndex].value
    }

    getTagText() {
        return this.taggerModalElementFinder.getTaggerModalElement().querySelector('#tag-text').value;
    }

    getUserDetails() {
        let username = this.getUsername();
        let colour = this.getSelectedColour();
        let text = this.getTagText();
        let userId = this.getUserId();
        return { username: username, colour: colour, text: text, userId: userId };
    }

}