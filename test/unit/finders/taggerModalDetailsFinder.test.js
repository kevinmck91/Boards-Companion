import { TaggerModalDetailsFinder } from "../../../src/finders/TaggerModalDetailsFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { TaggerModalUpdater } from "../../../src/user-tagging/TaggerModalUpdater.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { TaggerModalElementFinder } from "../../../src/finders/TaggerModalElementFinder.js";
import { ModalElementGenerator } from "../../../src/element-generators/ModalElementGenerator.js"

let taggerModalDetailsFinder = new TaggerModalDetailsFinder();
let testThreadPageBuilder = null;
let taggerModalUpdater = new TaggerModalUpdater();
let testEnvironmentArranger = new TestEnvironmentArranger();
let taggerModalElementFinder = new TaggerModalElementFinder();
let modalElementGenerator = new ModalElementGenerator();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testEnvironmentArranger.InitializeEnvironment();
})

it('test find default selected colour', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    document.body.appendChild(modalElementGenerator.generateModalElement("testuser"));

    let selectedColour = taggerModalDetailsFinder.getSelectedColour();
    expect(selectedColour).toBe('green');
})

it('test find cancel button', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    taggerModalUpdater.ensureModalInitialized();

    let cancelButton = taggerModalElementFinder.getTaggerModalCancelButton();
    expect(cancelButton).not.toBe(null);
})