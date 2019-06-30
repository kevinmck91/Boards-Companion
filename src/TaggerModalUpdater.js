export { TaggerModalUpdater }
import { ElementFinder } from "./ElementFinder.js";
import { ElementGenerator } from "./ElementGenerator.js"
import { ModalDetailsFinder } from "./ModalDetailsFinder.js";
import { TaggedUsersUpdater } from "./TaggedUsersUpdater.js";
import { PostsFormatter } from "./PostsFormatter.js";
import { TaggedUsersRetriever } from "./TaggedUsersRetriever.js";

class TaggerModalUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.elementGenerator = new ElementGenerator();
        this.modalDetailsFinder = new ModalDetailsFinder();
        this.taggedUsersUpdater = new TaggedUsersUpdater();
        this.postsFormatter = new PostsFormatter();
        this.taggedUsersRetriever = new TaggedUsersRetriever();
    }

    ensureModalInitialized() {
        if (this._isModalInitialized()) {
            return;
        }
        this._addModalElement();
        let _this = this;
        let modalSubmitButton = this.elementFinder.getTaggerModalSubmitButton();
        modalSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            let userDetails = _this.modalDetailsFinder.getUserDetails();
            _this.taggedUsersUpdater.tagUser(userDetails);
            _this.postsFormatter.tagUsersPosts(userDetails);
            _this._deactivateModal();
        });
        let modalCancelButton = this.elementFinder.getTaggerModalCancelButton();
        modalCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            _this._deactivateModal();
        })
        let modalShowTaggedUsersElement = this.elementFinder.getTaggerModalShowUsersElement();
        modalShowTaggedUsersElement.addEventListener('click', function handler(ev) {
            ev.preventDefault();
            _this._displayAllTaggedUsers();
            this.removeEventListener('click', handler);
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
        this._resetModal();
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
        let modalTitle = this.elementFinder.getTaggerModalTitleElement();
        modalTitle.innerText = modalTitle.innerText += username;
    }

    _showModal() {
        let modalElement = this.elementFinder.getTaggerModalElement();
        modalElement.style.display = '';
    }

    _hideModal() {
        let modalElement = this.elementFinder.getTaggerModalElement();
        modalElement.style.display = 'none';
    }

    _resetModal() {
        let modalElement = this.elementFinder.getTaggerModalElement();
        document.body.removeChild(modalElement);
        this.ensureModalInitialized();
    }

    _displayAllTaggedUsers() {
        let _this = this;
        this.taggedUsersRetriever.getTaggedUsers((userDetailsList) => {
            _this._displayTaggedUsers(userDetailsList);
        })
    }

    _displayTaggedUsers(userDetailsList) {
        let userListElement = this.elementFinder.getTaggerModalUserListElement();
        for (let userDetails of userDetailsList) {
            let userListEntry = this.elementGenerator.generateUserListEntry(userDetails);
            userListElement.appendChild(userListEntry);
        }
        this._activateDeleteUserElements();
    }

    _activateDeleteUserElements() {
        let deleteUserElements = this.elementFinder.getTaggerModalDeleteUserElements();
        let _this = this;
        for (let deleteUserElement of deleteUserElements) {
            deleteUserElement.addEventListener('click', (ev) => {
                ev.preventDefault();
                _this._unTagUser(deleteUserElement);
            });
        }
    }

    _unTagUser(deleteUserElement) {
        let username = deleteUserElement.previousSibling.textContent;
        this.taggedUsersUpdater.unTagUser(username);
        deleteUserElement.parentElement.style.display = 'none';
    }
}