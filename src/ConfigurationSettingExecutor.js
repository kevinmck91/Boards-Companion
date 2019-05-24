export { ConfigurationSettingExecutor }

class ConfigurationSettingExecutor {

    constructor(settingIdentifier) {
        this.settingIdentifier = settingIdentifier;
    }

    ConditionallyExecute(ifTrueFuctionality, ifFalseFunctionality) {
        chrome.storage.sync.get(this.settingIdentifier, (result) => {
            if (result[this.settingIdentifier] != false) {
                ifTrueFuctionality();
            } else if (ifFalseFunctionality != undefined) {
                ifFalseFunctionality();
            }
        });
    }
}