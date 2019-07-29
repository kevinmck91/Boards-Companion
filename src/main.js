"use strict";
import { PostElementsVisibilityUpdater } from "./element-visibility/PostElementsVisibilityUpdater.js";
import { WelcomeNoticeVisibilityUpdater } from "./element-visibility/WelcomeNoticeVisibilityUpdater.js";
import { HeaderTransparencyToggler } from "./HeaderTransparencyToggler.js";
import { AutomaticPageLoader } from "./automatic-pageloading/AutomaticPageLoader.js";
import { PostsCompressionToggler } from "./post-manipulation/PostsCompressionToggler.js";
import { PageInternalsUpdater } from "./page/PageInternalsUpdater.js";
import { StorageKeys } from "./storage/ApplicationStorageKeys.js";
import { ConfigurationSettingExecutor } from "./ConfigurationSettingExecutor.js";
import { UserTagger } from "./user-tagging/UserTagger.js";

let welcomeNoticeVisibilityUpdater = new WelcomeNoticeVisibilityUpdater();
let postElementsVisibilityUpdater = new PostElementsVisibilityUpdater();
let headerTransparencyToggler = new HeaderTransparencyToggler();
let automaticPageLoader = new AutomaticPageLoader();
let postsCompressionToggler = new PostsCompressionToggler();
let pageInternalsUpdater = new PageInternalsUpdater();
let autoscrollingsSetting = new ConfigurationSettingExecutor(StorageKeys.AutoScrollingEnabled);
let hidePostElementsSetting = new ConfigurationSettingExecutor(StorageKeys.HidePostElementsEnabled);
let toggleHeaderTransparencySetting = new ConfigurationSettingExecutor(StorageKeys.ToggleHeaderTransparency);
let userTagger = new UserTagger();

try {
    pageInternalsUpdater.restoreConsole();
}
catch (error) {
    console.error("Error restoring console: " + error);
}

try {
    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();
}
catch (error) {
    console.error("Unable to hide welcome notice: " + error);
}

try {
    hidePostElementsSetting.ConditionallyExecute(() => {
        postElementsVisibilityUpdater.hideEachPostsElements();
        postsCompressionToggler.applyCompressionToggling();
    });
}
catch (error) {
    console.error("Unable to hide post elements: " + error);
}

try {
    toggleHeaderTransparencySetting.ConditionallyExecute(() => {
        headerTransparencyToggler.enableToggling();
    });
}
catch (error) {
    console.error("Unable to toggle header reduction: " + error);
}

try {
    autoscrollingsSetting.ConditionallyExecute(() => {
        hidePostElementsSetting.ConditionallyExecute(() => {
            automaticPageLoader.autoScrollPages(true);
        }, () => {
            automaticPageLoader.autoScrollPages(false);
        });
    });
}
catch (error) {
    console.error("Unable to activate auto page scrolling: " + error);
}

try {
    userTagger.applyTagging();
}
catch (error) {
    console.error("Could not activate post tagging: " + error);
}
