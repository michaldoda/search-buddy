/**
 * @jest-environment jsdom
 */
import {SearchBuddy} from "../src/SearchBuddy";


test("Initialize plugin", () => {
    let searchBuddy = SearchBuddy({
        mode: "local",
        items: [],
    });
});