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

    ensureModalInitialized() {
        if (this._isModalInitialized()) {
            return;
        }
        this._addModalElement();
        let modalSubmitButton = this.elementFinder.getTaggerModalSubmitButton();
        let modalCancelButton = this.elementFinder.getTaggerModalCancelButton();
        let _this = this;
        modalSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            let userDetails = _this.modalDetailsFinder.getUserDetails();
            _this.taggedUsersUpdater.addUser(userDetails);
            _this.postsFormatter.tagUsersPosts(userDetails);
            _this._deactivateModal();
        });
        modalCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            _this._deactivateModal();
        })
    }

    activateModal(username) {
        this._freezeScrollBar();
        this._updateModal(username);
        this._showModal();
    }

    _isModalInitialized() {
        let modalElement = this.elementFinder.getTaggerModalElement();
        if (modalElement == undefined)
            return false;
        else
            return true;
    }

    _addModalElement() {
        let modalElement = this.elementGenerator.generateModalElement();
        document.body.appendChild(modalElement);
        this._hideModal();
    }

    _deactivateModal() {
        this._hideModal();
        this._unfreezeScrollBar();
    }

    _freezeScrollBar() {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
    }

    _unfreezeScrollBar() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    _updateModal(username) {
        let modalUsernameElement = this.elementFinder.getTaggerModalUsernameElement();
        modalUsernameElement.value = username;
    }

    _showModal() {
        let modalElement = this.elementFinder.getTaggerModalElement();
        modalElement.style.display = '';
    }

    _hideModal() {
        let modalElement = this.elementFinder.getTaggerModalElement();
        modalElement.style.display = 'none';
    }
}