export { UserTagger as UserTagger }

import { ElementFinder } from "./ElementFinder.js";
import { PostHtmlUpdater } from "./PostHtmlUpdater.js";
import { StorageUpdater } from "./StorageUpdater.js";
import { StorageRetriever } from "./StorageRetriever.js";
import { TaggedUsersUpdater } from "./TaggedUsersUpdater.js";
import { TaggedUsersRetriever } from "./TaggedUsersRetriever.js";
import { ElementGenerator } from "./ElementGenerator.js";
import { PostsFormatter } from "./PostsFormatter.js";

class UserTagger {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.postHtmlUpdater = new PostHtmlUpdater();
        this.storageUpdater = new StorageUpdater();
        this.storageRetriever = new StorageRetriever();
        this.taggedUsersUpdater = new TaggedUsersUpdater();
        this.taggedUsersRetriever = new TaggedUsersRetriever();
        this.elementGenerator = new ElementGenerator();
        this.postsFormatter = new PostsFormatter();
    }

    applyTagging() {
        this.applyTaggingToPosts(this.elementFinder.getAllPosts());
    }

    applyTaggingToPosts(posts) {
        this.postHtmlUpdater.addTagElementToPosts(posts);
        this._addTagListeners(posts);
        this._hightlightTaggedUsers();
    }

    //todo, needs to highlight user straight away
    _addTagListeners(posts) {
        let tagElements = this.elementFinder.getTagElementsFromPosts(posts);
        for (let tagElement of tagElements) {
            let _this = this;
            tagElement.addEventListener('click', function (ev) {
                _this._addTaggerModal(tagElement);
            });
        }
    }

    _addTaggerModal(tagElement) {
        let username = this._getUserName(tagElement);
        this._addModalElement(username);

        let modalElement = this.elementFinder.getModalElement();
        let modalSubmitButton = modalElement.querySelector('[type="submit"]');
        let _this = this;
        modalSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            let username = _this._getUsernameFromModal();
            _this.taggedUsersUpdater.addUser(username);
            _this._highlightUser(username);
            _this._removeModalElement();
        });
    }

    _getUsernameFromModal() {
        return this.elementFinder.getModalElement().querySelector('#username').value;
    }

    _addModalElement(username) {
        let modalElement = this.elementGenerator.generateModalElement(username);
        document.body.appendChild(modalElement);
    }

    _removeModalElement() {
        let modalElement = this.elementFinder.getModalElement();
        document.body.removeChild(modalElement);
    }

    _getUserName(tagElement) {
        let userDetailsElement = this.elementFinder.getUserDetailsElementFromTagElement(tagElement);
        let usernameElement = this.elementFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);
        return usernameElement.innerText;
    }

    _hightlightTaggedUsers() {
        let _this = this;
        this.taggedUsersRetriever.getTaggedUsers((usernames) => {
            let taggedUsers = [];
            taggedUsers.push(usernames);
            _this._highlightUsers(usernames);
        });
    }

    _highlightUser(username) {
        let usernameArray = [];
        usernameArray.push(username);
        this._highlightUsers(usernameArray);
    }

    _highlightUsers(usernames) {
        for (let username of usernames) {
            let userPosts = this.elementFinder.getUserPosts(username);
            this.postsFormatter.highlightPosts(userPosts);
        }
    }

}