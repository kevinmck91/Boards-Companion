"use strict";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { HeaderReducer } from "./HeaderReducer.js";
import { AutomaticPageLoader } from "./AutomaticPageLoader.js"

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let headerReducer = new HeaderReducer();
let automaticPageLoader = new AutomaticPageLoader();

elementVisibilityUpdater.hideEachPostsElements();
headerReducer.toggleHeaderReduction();
automaticPageLoader.autoScrollPages();



