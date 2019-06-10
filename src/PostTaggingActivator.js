export { PostTaggingActivator }

import { ElementFinder } from "./ElementFinder.js";
import { PostHtmlUpdater } from "./PostHtmlUpdater.js";
import { StorageUpdater } from "./StorageUpdater.js";
import { StorageRetriever } from "./StorageRetriever.js";
import { PostTagger } from "./PostTagger.js";
import { TaggedUsersUpdater } from "./TaggedUsersUpdater.js";
import { TaggedUsersRetriever } from "./TaggedUsersRetriever.js";

class PostTaggingActivator {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.postHtmlUpdater = new PostHtmlUpdater();
        this.storageUpdater = new StorageUpdater();
        this.storageRetriever = new StorageRetriever();
        this.postTagger = new PostTagger();
        this.taggedUsersUpdater = new TaggedUsersUpdater();
        this.taggedUsersRetriever = new TaggedUsersRetriever();
    }

    activatePostTagging() {
        this.postHtmlUpdater.addTagElementToAllPosts();
        this._addTagListeners();
        this._hightlightTaggedUserPosts();
    }

    _addTagListeners() {
        let tagElements = this.elementFinder.getAllTagElements();
        for (let tagElement of tagElements) {
            let _this = this;
            tagElement.addEventListener('click', function (ev) {
                _this._tagUser(tagElement);
            });
        }
    }

    _tagUser(tagElement) {
        let username = this._getUserName(tagElement);
        this.taggedUsersUpdater.addUser(username);
    }

    _getUserName(tagElement) {
        let userDetailsElement = this.elementFinder.getUserDetailsElementFromTagElement(tagElement);
        let usernameElement = this.elementFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);
        return usernameElement.innerText;
    }

    _hightlightTaggedUserPosts() {
        let _this = this;
        this.taggedUsersRetriever.getTaggedUsers((users) => {
            let taggedUsers = [];
            taggedUsers.push(users);
            _this.postTagger.highlightUserPosts(users);
        });
    }
}