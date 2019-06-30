export { TaggedUsersUpdater }
import { StorageUpdater } from "./StorageUpdater.js";
import { StorageRetriever } from "./StorageRetriever.js";
import { StorageKeys } from "./ApplicationStorageKeys.js";

class TaggedUsersUpdater {
    constructor() {
        this.storageUpdater = new StorageUpdater();
        this.storageRetriever = new StorageRetriever();
    }

    tagUser(taggedUserDetails) {
        let _this = this;
        this.storageRetriever.getItem(StorageKeys.TaggedUsersDetails, function (existingUsernames) {
            let newUserDetailsEntry = _this._appendUsername(taggedUserDetails, existingUsernames);
            _this.storageUpdater.addItemToStorage(StorageKeys.TaggedUsersDetails, newUserDetailsEntry);
        });
    }

    unTagUser(username) {
        let _this = this;
        this.storageRetriever.getItem(StorageKeys.TaggedUsersDetails, function (existingUsernames) {
            let newUserDetailsEntry = _this._removeUsername(username, existingUsernames);
            _this.storageUpdater.addItemToStorage(StorageKeys.TaggedUsersDetails, newUserDetailsEntry);
        });
    }

    _appendUsername(taggedUserDetails, existingUserDetailsEntry) {
        if (existingUserDetailsEntry) {
            return existingUserDetailsEntry += ";" + taggedUserDetails.username + ";" + taggedUserDetails.colour + ";" + taggedUserDetails.text;
        } else {
            return taggedUserDetails.username + ";" + taggedUserDetails.colour + ";" + taggedUserDetails.text;
        }
    }

    _removeUsername(username, existingUserDetailsEntry) {
        let mainRegex = new RegExp(username + ";.*?;.*?(;|$)", "g");
        let result = existingUserDetailsEntry.replace(mainRegex, "");
        let trimRegex = new RegExp("^;+|;+$", "g");
        result = result.replace(trimRegex, "");
        return result;
    }

}