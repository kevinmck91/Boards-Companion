export { TaggedUsersUpdater }
import { StorageUpdater } from "./StorageUpdater.js";
import { StorageRetriever } from "./StorageRetriever.js";

//todo create class that contains taggedUser key
class TaggedUsersUpdater {
    constructor() {
        this.storageUpdater = new StorageUpdater();
        this.storageRetriever = new StorageRetriever();
    }

    addUser(username, colour) {
        let _this = this;
        this.storageRetriever.getItem("taggedUsers", function (existingUsernames) {
            let newUserDetailsEntry = _this._appendUsername(username, colour, existingUsernames);
            _this.storageUpdater.addItemToStorage("taggedUsers", newUserDetailsEntry);
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