"use strict";
export { TestCommonHtmlGenerator };

class TestCommonHtmlGenerator {

    wrapPageElements(elements) {
        return `
        <div class="wrapper">
            `+ elements + `
        </div>`;
    }

    getHeader() {
        return `
        <div class="nav-area"></div>
        <div id="header"></div>
        <div id="breadcrumb" style="top:87px;"></div>`;
    }

    getExistingJavascriptScriptElement() {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `
        Boards = function() { 
            Boards = {};
            Boards.Thread = {ready:false};
            Boards.load = function load(){};
            return Boards
        }();
        function qr_init(){}`;
        return script;
    }
}