import { ModalDetailsFinder } from "../src/ModalDetailsFinder.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { ElementGenerator } from "../src/ElementGenerator.js";
import { TaggerModalUpdater } from "../src/TaggerModalUpdater.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { ElementFinder } from "../src/ElementFinder.js";

let modalDetailsFinder = new ModalDetailsFinder();
let testThreadPageBuilder = null;
let elementGenerator = new ElementGenerator();
let taggerModalUpdater = new TaggerModalUpdater();
let testEnvironmentArranger = new TestEnvironmentArranger();
let elementFinder = new ElementFinder();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testEnvironmentArranger.InitializeEnvironment();
})

it('test find default selected colour', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    document.body.appendChild(elementGenerator.generateModalElement("testuser"));

    let selectedColour = modalDetailsFinder.getSelectedColour();
    expect(selectedColour).toBe('green');
})

it('test find cancel button', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    taggerModalUpdater.ensureModalInitialized();

    let cancelButton = elementFinder.getTaggerModalCancelButton();
    expect(cancelButton).not.toBe(null);
})