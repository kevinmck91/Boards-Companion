import { ElementGenerator } from "../src/ElementGenerator.js";

let elementGenerator = new ElementGenerator();

it('test generate page no element', () => {
    let element = elementGenerator.generatePageNoElement(2);

    expect(element.innerHTML).toBe("page 2");
})