export { GenericElementGenerator }

class GenericElementGenerator {

    generateScriptElement(contents) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = contents;
        return script;
    }

    generateDocument(html) {
        let parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    }
}