/**
 * @jest-environment jsdom
 */
import {SearchBuddy} from "../src/SearchBuddy";


test("Base tests", () => {
    let {
        container,
        show,
        hide,
    } = SearchBuddy({
        mode: "local",
        items: [],
    });

    expect(document.querySelector(`.${container.className}`)).toBe(container);
    expect(container.style.display).toBe("");
    show();
    expect(container.style.display).toBe("inline-block");
    hide();
    expect(container.style.display).toBe("none");
});