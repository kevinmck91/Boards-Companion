export { StorageRetriever }

class StorageRetriever {

    getAllData(functionality) {
        chrome.storage.sync.get(null, (items) => {
            if (items == undefined) {
                return;
            } else {
                functionality(items);
            }
        });
    }

}