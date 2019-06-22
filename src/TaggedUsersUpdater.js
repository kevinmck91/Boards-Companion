export { TaggedUsersUpdater }
import { StorageUpdater } from "./StorageUpdater.js";
import { StorageRetriever } from "./StorageRetriever.js";
import { StorageKeys } from "./ApplicationStorageKeys.js";

class TaggedUsersUpdater {
    constructor() {
        this.storageUpdater = new StorageUpdater();
        this.storageRetriever = new StorageRetriever();
    }

    addUser(username, colour) {
        let _this = this;
        this.storageRetriever.getItem(StorageKeys.TaggedUsersDetails, function (existingUsernames) {
            let newUserDetailsEntry = _this._appendUsername(username, colour, existingUsernames);
            _this.storageUpdater.addItemToStorage(StorageKeys.TaggedUsersDetails, newUserDetailsEntry);
        });
    }

    _appendUsername(username, colour, existingUserDetailsEntry) {
        if (existingUserDetailsEntry == undefined) {
            return username + ";" + colour;
        } else {
            return existingUserDetailsEntry += ";" + username + ";" + colour;
        }
    }

}