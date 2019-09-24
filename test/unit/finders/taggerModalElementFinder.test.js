import { ModalElementGenerator } from "../../../src/element-generators/ModalElementGenerator.js"
import { TaggerModalElementFinder } from "../../../src/finders/TaggerModalElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";

let modalElementGenerator = new ModalElementGenerator();
let taggerModalElementFinder = new TaggerModalElementFinder();
let testThreadPageBuilder = null;
let testEnvironmentArranger = new TestEnvironmentArranger();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testThreadPageBuilder = new TestThreadPageBuilder();
});

it('test get modal element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    document.body.appendChild(modalElementGenerator.generateModalElement());

    let modalElement = taggerModalElementFinder.getTaggerModalElement();
    expect(modalElement).not.toBe(null);
})