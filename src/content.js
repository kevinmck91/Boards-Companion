(async () => {
    const src = chrome.extension.getURL("main.js");
    const contentMain = await import(src);
})();