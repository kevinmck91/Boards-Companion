import { PageInternalsUpdater } from "../src/PageInternalsUpdater.js";

let pageInternalsUpdater = new PageInternalsUpdater();

it('console is restored', () => {
    console.log = function () { };
    pageInternalsUpdater.restoreConsole();
    expect(console.log.toString()).not.toBe('function () {}');
})
