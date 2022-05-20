/**
 * @jest-environment jsdom
 */
import { buildDOMTree } from "../src/buildDOMTree";

test("test dom structure", () => {
    const {
        container,
        wrapper,
        formWrapper,
        form,
        fieldsWrapper,
        searchButtonElement,
        inputElement,
        clearButtonElement,
        closeButtonElement,
        resultElement,
    } = buildDOMTree({});

    expect(container.childElementCount).toBe(1);

    expect(wrapper.parentElement === container).toBe(true);
    expect(wrapper.childElementCount).toBe(2);

    expect(resultElement.parentElement === wrapper).toBe(true);
    expect(resultElement.childElementCount).toBe(0);

    expect(formWrapper.parentElement === wrapper).toBe(true);
    expect(formWrapper.childElementCount).toBe(1);

    expect(form.parentElement === formWrapper).toBe(true);
    expect(form.childElementCount).toBe(1);

    expect(fieldsWrapper.parentElement === form).toBe(true);
    expect(fieldsWrapper.childElementCount).toBe(4);

    expect(searchButtonElement.parentElement === fieldsWrapper).toBe(true);
    expect(inputElement.parentElement === fieldsWrapper).toBe(true);
    expect(clearButtonElement.parentElement === fieldsWrapper).toBe(true);
    expect(closeButtonElement.parentElement === fieldsWrapper).toBe(true);

    expect(container.className).toEqual("SearchBuddy-container");
});
