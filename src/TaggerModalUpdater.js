export { TaggerModalUpdater }
import { ElementFinder } from "./ElementFinder.js";
import { ElementGenerator } from "./ElementGenerator.js"
import { ModalDetailsFinder } from "./ModalDetailsFinder.js";
import { TaggedUsersUpdater } from "./TaggedUsersUpdater.js";
import { PostsFormatter } from "./PostsFormatter.js";

class TaggerModalUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementGenerator = new ElementGenerator();
        this.modalDetailsFinder = new ModalDetailsFinder();
        this.taggedUsersUpdater = new TaggedUsersUpdater();
        this.postsFormatter = new PostsFormatter();
    }

    addTaggerModal(tagElement) {
        this._addModalElement(tagElement);
        let modalSubmitButton = this.modalDetailsFinder.getSubmitButton();
        let modalCancelButton = this.modalDetailsFinder.getCancelButton();
        let _this = this;
        modalSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            let userDetails = _this.modalDetailsFinder.getUserDetails();
            _this.taggedUsersUpdater.addUser(userDetails);
            _this.postsFormatter.tagUsersPosts(userDetails);
            _this._removeModalElement();
        });
        modalCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            _this._removeModalElement();
        })
    }

    _addModalElement(tagElement) {
        let username = this._getUserName(tagElement);
        let modalElement = this.elementGenerator.generateModalElement(username);
        document.body.appendChild(modalElement);
        document.body.style.overflow = 'hidden';
    }

    _removeModalElement() {
        let modalElement = this.elementFinder.getModalElement();
        document.body.removeChild(modalElement);
        document.body.style.overflow = 'visible';
    }

    _getUserName(tagElement) {
        let userDetailsElement = this.elementFinder.getUserDetailsElementFromTagElement(tagElement);
        let usernameElement = this.elementFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);
        return usernameElement.innerText;
    }
}