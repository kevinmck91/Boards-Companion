export { TaggedUsersUpdater }
import { StorageUpdater } from "./StorageUpdater.js";
import { StorageRetriever } from "./StorageRetriever.js";

//todo create class that contains taggedUser key
class TaggedUsersUpdater {
    constructor() {
        this.storageUpdater = new StorageUpdater();
        this.storageRetriever = new StorageRetriever();
    }

    addUser(username) {
        let _this = this;
        this.storageRetriever.getItem("taggedUsers", function (existingUsernames) {
            let newUsernames = _this._appendUsername(username, existingUsernames);
            _this.storageUpdater.addItemToStorage("taggedUsers", newUsernames);
        });
    }

    _appendUsername(username, existingUsernames) {
        if (existingUsernames == undefined) {
            return username;
        } else {
            return existingUsernames += ";" + username;
        }
    }

}