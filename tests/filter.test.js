import filter from "../src/filter";

test("test filter if params missing", () => {
    expect(filter()).toEqual([]);
    expect(filter([])).toEqual([]);
    expect(filter(undefined)).toEqual([]);
    expect(filter(null)).toEqual([]);
    expect(filter(undefined, undefined)).toEqual([]);
    expect(filter(undefined, "Correct query")).toEqual([]);
    expect(filter([], undefined)).toEqual([]);
    expect(filter([], "Correct query")).toEqual([]);
});

test("test filter positive scenario #1", () => {
    let items = [
        { title: "Tools / GUID generator" },
        { title: "Articles / GUID - how to generate" },
    ];

    expect(filter(items, "guid article")).toContainEqual(items[1]);
    expect(filter(items, "guid article")).toHaveLength(1);
});

test("test filter positive scenario #1", () => {
    let items = [
        { title: "Articles / PHP / Laravel" },
        { title: "Articles / JavaScript" },
        { title: "Articles / JavaScript / React" },
        { title: "Articles / JavaScript / Vue" },
        { title: "Articles / JavaScript / Angular" },
    ];

    expect(filter(items, "articles javascript react")).toContainEqual(items[2]);
    expect(filter(items, "articles javascript react")).toHaveLength(1);
    expect(filter(items, "articles javascript")).toHaveLength(4);
});