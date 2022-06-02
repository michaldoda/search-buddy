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
        items: [],
    });

    let initialBodyClassName = document.body.className;
    expect(document.querySelector(`.${container.className}`)).toBe(container);
    expect(container.style.display).toBe("");
    show();
    expect(document.body.className).toBe("SearchBuddy-container-open");
    expect(container.style.display).toBe("inline-block");
    hide();
    expect(document.body.className).toBe("");
    expect(container.style.display).toBe("none");
});