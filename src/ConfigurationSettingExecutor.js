export { ConfigurationSettingExecutor }

class ConfigurationSettingExecutor {
    ConditionallyExecute(settingIdentifier, ifTrueFuctionality, ifFalseFunctionality) {
        chrome.storage.sync.get(settingIdentifier, function (result) {
            if (result[settingIdentifier] != false) {
                ifTrueFuctionality();
            } else if (ifFalseFunctionality != undefined) {
                ifFalseFunctionality();
            }
        });
    }
}