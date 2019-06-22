import { ConfigurationSettingExecutor } from "../src/ConfigurationSettingExecutor.js";
import { StorageKeys } from "../src/ApplicationStorageKeys.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";

let chromeStorageMocker = new ChromeStorageMocker();

it('test configuration setting executed', () => {
    let hidePostElementsSetting = new ConfigurationSettingExecutor(StorageKeys.HidePostElementsEnabled);
    chromeStorageMocker.MockGetter(true);

    let functionality = jest.fn();
    hidePostElementsSetting.ConditionallyExecute(functionality);

    expect(functionality.mock.calls.length).toBe(1);
})
