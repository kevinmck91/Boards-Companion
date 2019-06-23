import { ModalDetailsFinder } from "../src/ModalDetailsFinder.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { ElementGenerator } from "../src/ElementGenerator.js";
import { TaggerModalUpdater } from "../src/TaggerModalUpdater.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { UserTagger } from "../src/UserTagger.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";

let modalDetailsFinder = new ModalDetailsFinder();
let testThreadPageBuilder = null;
let elementGenerator = new ElementGenerator();
let taggerModalUpdater = new TaggerModalUpdater();
let elementFinder = new ElementFinder();
let userTagger = new UserTagger();
let testEnvironmentArranger = new TestEnvironmentArranger();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testEnvironmentArranger.InitializeEnvironment();
})

it('test find default selected colour', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    document.body.appendChild(elementGenerator.generateModalElement("testuser"));

    let selectedColour = modalDetailsFinder.getSelectedColour();
    expect(selectedColour).toBe('red');
})

it('test find cancel button', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    userTagger.applyTagging();
    let post = elementFinder.getAllPosts()[0];
    taggerModalUpdater.addTaggerModal(elementFinder.getTagElementFromPost(post));

    let cancelButton = modalDetailsFinder.getCancelButton();
    expect(cancelButton.value).toBe('cancel');
})