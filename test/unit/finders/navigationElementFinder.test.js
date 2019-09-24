import { NavigationElementFinder } from "../../../src/finders/NavigationElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";

let navigationElementFinder = new NavigationElementFinder();
let testThreadPageBuilder = null;
let testEnvironmentArranger = new TestEnvironmentArranger();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testThreadPageBuilder = new TestThreadPageBuilder();
});

it('test get bottom page navigation ribbon', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    const bottomNavigationRibbon = navigationElementFinder.getThreadBottomNavigationRibbonFromDocument(document);

    expect(bottomNavigationRibbon.outerHTML.match(/<table/g).length).toBe(3);
})

it('test bottom page navigation ribbon cleaned', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    const bottomNavigationRibbon = navigationElementFinder.getThreadBottomNavigationRibbonFromDocument(document);

    expect(bottomNavigationRibbon.outerHTML.match(/<script/g)).toBe(null);

})