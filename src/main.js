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
    elementVisibilityUpdater.hideEachPostsElements();
}
catch (error) {
    console.error("Unable to hide post elements: " + error);
}

try {
    headerReducer.toggleHeaderReduction();
}
catch (error) {
    console.error("Unable to toggle header reduction: " + error);
}

try {
    automaticPageLoader.autoScrollPages();
}
catch (error) {
    console.error("Unable to activate auto page scrolling: " + error);
}

try {
    postsCompressionToggler.applyCompressionToggling();
}
catch (error) {
    console.error("Unable to apply compression toggling: " + error);
}



