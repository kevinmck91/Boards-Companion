import { ModalDetailsFinder } from "../src/ModalDetailsFinder.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { ElementGenerator } from "../src/ElementGenerator.js";

let modalDetailsFinder = new ModalDetailsFinder();
let testThreadPageBuilder = new TestThreadPageBuilder();
let elementGenerator = new ElementGenerator();

it('test find default selected colour', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    document.body.appendChild(elementGenerator.generateModalElement("testuser"));

    let selectedColour = modalDetailsFinder.getSelectedColour();
    expect(selectedColour).toBe('red');
})