"use strict";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { HeaderReducer } from "./HeaderReducer.js";
import { AutomaticPageLoader } from "./AutomaticPageLoader.js";
import { PostsCompressionToggler } from "./PostsCompressionToggler.js";
import { PageUpdater } from "./PageUpdater.js";

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let headerReducer = new HeaderReducer();
let automaticPageLoader = new AutomaticPageLoader();
let postsCompressionToggler = new PostsCompressionToggler();
let pageUpdater = new PageUpdater();

try {
    pageUpdater.restoreConsole();
}
catch (error) {
    console.error("Error restoring console: " + error);
}

try {
    elementVisibilityUpdater.hideWelcomeNotice();
}
catch (error) {
    console.error("Unable to hide welcome notice: " + error);
}

try {
    chrome.storage.sync.get('hidePostElementsEnabled', function (result) {
        if (result.hidePostElementsEnabled != false) {
            elementVisibilityUpdater.hideEachPostsElements();
            postsCompressionToggler.applyCompressionToggling();
        }
    });
}
catch (error) {
    console.error("Unable to hide post elements: " + error);
}

try {
    chrome.storage.sync.get('reduceHeaderEnabled', function (result) {
        if (result.reduceHeaderEnabled != false) {
            headerReducer.toggleHeaderReduction();
        }
    });
}
catch (error) {
    console.error("Unable to toggle header reduction: " + error);
}

try {
    chrome.storage.sync.get('autoscrollingEnabled', function (result) {
        if (result.autoscrollingEnabled != false) {
            automaticPageLoader.autoScrollPages();
        }
    });
}
catch (error) {
    console.error("Unable to activate auto page scrolling: " + error);
}

