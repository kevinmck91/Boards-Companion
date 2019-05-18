import { ConfigurationSettingExecutor } from "../src/ConfigurationSettingExecutor.js";
import { Settings } from "../src/ConfigurationSettings.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";

let configurationSettingExecutor = new ConfigurationSettingExecutor();
let chromeStorageMocker = new ChromeStorageMocker();

it('test configuration setting executed', () => {
    chromeStorageMocker.MockReturnValue(true);

    let functionality = jest.fn();
    configurationSettingExecutor.ConditionallyExecute(Settings.HidePostElementsEnabled, functionality);

    expect(functionality.mock.calls.length).toBe(1);
})
