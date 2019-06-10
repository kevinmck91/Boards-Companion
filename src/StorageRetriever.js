export { StorageRetriever }

class StorageRetriever {

    getItem(key, functionality) {
        chrome.storage.sync.get([key], (items) => {
            if (items == undefined) {
                functionality(undefined);
            } else {
                functionality(items[key]);
            }
        });
    }

}