export { ConfigurationSettingExecutor }

class ConfigurationSettingExecutor {
    ConditionallyExecute(settingIdentifier, functionality) {
        chrome.storage.sync.get(settingIdentifier, function (result) {
            if (result[settingIdentifier] != false) {
                functionality();
            }
        });
    }
}