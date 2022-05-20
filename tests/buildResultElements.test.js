/**
 * @jest-environment jsdom
 */
import buildResultElements from "../src/buildResultElements";

test("test BuildResultElements #1", () => {
    let results = [
        { title: "Page #1", path: "#1" },
        { title: "Page #2", path: "#2" },
    ];

    let resultsElements = buildResultElements(results);
    expect(resultsElements.querySelectorAll("li").length).toBe(2);

    let liElements = resultsElements.querySelectorAll("li");
    for (let i = 0; i < liElements.length; i++) {
        let aElement = liElements[i].querySelector('a');
        expect(aElement.getAttribute("href")).toBe(results[i].path);
    }
});