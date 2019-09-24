export { TaggerModalUpdater }
import { TaggerModalElementFinder } from "../finders/TaggerModalElementFinder.js";
import { ModalElementGenerator } from "../element-generators/ModalElementGenerator.js"
import { TaggerModalDetailsFinder } from "../finders/TaggerModalDetailsFinder.js";
import { TaggedUsersUpdater } from "./TaggedUsersUpdater.js";
import { PostsFormatter } from "../post-manipulation/PostsFormatter.js";
import { TaggedUsersRetriever } from "./TaggedUsersRetriever.js";

class TaggerModalUpdater {

    constructor() {
        this.taggerModalElementFinder = new TaggerModalElementFinder();
        this.taggerModalDetailsFinder = new TaggerModalDetailsFinder();
        this.taggedUsersUpdater = new TaggedUsersUpdater();
        this.postsFormatter = new PostsFormatter();
        this.taggedUsersRetriever = new TaggedUsersRetriever();
        this.modalElementGenerator = new ModalElementGenerator();
    }

    ensureModalInitialized() {
        if (this._isModalInitialized()) {
            return;
        }
        this._addModalElement();
        let _this = this;
        let modalSubmitButton = this.taggerModalElementFinder.getTaggerModalSubmitButton();
        modalSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            let userDetails = _this.taggerModalDetailsFinder.getUserDetails();
            _this.taggedUsersUpdater.tagUser(userDetails);
            _this.postsFormatter.tagUsersPosts(userDetails);
            _this._deactivateModal();
        });
        let modalCancelButton = this.taggerModalElementFinder.getTaggerModalCancelButton();
        modalCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            _this._deactivateModal();
        })
        let modalShowTaggedUsersElement = this.taggerModalElementFinder.getTaggerModalShowUsersElement();
        modalShowTaggedUsersElement.addEventListener('click', function handler(ev) {
            ev.preventDefault();
            _this._displayAllTaggedUsers();
            this.removeEventListener('click', handler);
        })
    }

    activateModal(username, userId) {
        this._freezeScrollBar();
        this._updateModal(username, userId);
        this._showModal();
    }

    _isModalInitialized() {
        let modalElement = this.taggerModalElementFinder.getTaggerModalElement();
        if (modalElement == undefined)
            return false;
        else
            return true;
    }

    _addModalElement() {
        let modalElement = this.modalElementGenerator.generateModalElement();
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

    _updateModal(username, userId) {
        let modalUsernameElement = this.taggerModalElementFinder.getTaggerModalUsernameElement();
        modalUsernameElement.value = username;
        let modalUserIdElement = this.taggerModalElementFinder.getTaggerModalUserIdElement();
        modalUserIdElement.value = userId;
        let modalTitle = this.taggerModalElementFinder.getTaggerModalTitleElement();
        modalTitle.innerText = modalTitle.innerText += username;
    }

    _showModal() {
        let modalElement = this.taggerModalElementFinder.getTaggerModalElement();
        modalElement.style.display = '';
    }

    _hideModal() {
        let modalElement = this.taggerModalElementFinder.getTaggerModalElement();
        modalElement.style.display = 'none';
    }

    _resetModal() {
        let modalElement = this.taggerModalElementFinder.getTaggerModalElement();
        document.body.removeChild(modalElement);
        this.ensureModalInitialized();
    }

    _displayAllTaggedUsers() {
        let _this = this;
        this.taggedUsersRetriever.getTaggedUsers((taggedUserDetailList) => {
            _this._displayTaggedUsers(taggedUserDetailList);
        })
    }

    _displayTaggedUsers(userDetailsList) {
        let userListElement = this.taggerModalElementFinder.getTaggerModalUserListElement();
        for (let userDetails of userDetailsList) {
            let userListEntry = this.modalElementGenerator.generateUserListEntry(userDetails);
            userListElement.appendChild(userListEntry);
        }
        this._activateDeleteUserElements();
    }

    _activateDeleteUserElements() {
        let deleteUserElements = this.taggerModalElementFinder.getTaggerModalDeleteUserElements();
        let _this = this;
        for (let deleteUserElement of deleteUserElements) {
            deleteUserElement.addEventListener('click', (ev) => {
                ev.preventDefault();
                _this._unTagUser(deleteUserElement);
            });
        }
    }

    _unTagUser(deleteUserElement) {
        let userId = deleteUserElement.previousSibling.previousSibling.dataset.userid;
        this.taggedUsersUpdater.unTagUser(userId);
        deleteUserElement.parentElement.style.display = 'none';
    }
}