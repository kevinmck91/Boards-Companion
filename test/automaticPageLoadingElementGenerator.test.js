import { AutomaticPageLoadingElementGenerator } from "../src/element-generators/AutomaticPageLoadingElementGenerator.js";

let automaticPageLoadingElementGenerator = new AutomaticPageLoadingElementGenerator();

it('test generate page no element', () => {
    let element = automaticPageLoadingElementGenerator.generateBottomPageNoElement(2);

    expect(element.innerHTML).toBe("page 2");
})