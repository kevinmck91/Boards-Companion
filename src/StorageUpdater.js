export { StorageUpdater }

class StorageUpdater {

    addItemToStorage(key, value) {
        chrome.storage.sync.set({ [key]: value });
    }

}