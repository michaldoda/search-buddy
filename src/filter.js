export default (items, query) => {
    let results = items.filter((el) => {
        let explode = query.split(" ");
        el.score = 0;
        for (let i = 0; i < explode.length; i++) {
            if (explode[i] === "") continue;
            if (el.name.toLowerCase().includes(explode[i].toLowerCase())) el.score++;
        }
        if (el.score > 0) {
            return el;
        }
    });

    results = results.sort((a, b) => {
        return b.score - a.score;
    });
    let newResults = {};
    results.map((el) => {
        if (!newResults[el.score]) {
            newResults[el.score] = [];
        }
        newResults[el.score].push(el);
    });
    let maxKey = Math.max(...Object.keys(newResults).map(el => parseInt(el)));
    let withScore = null;
    if (maxKey && Object.keys(newResults).length > 1) {
        withScore = maxKey;
        console.log('with', withScore);
    }


    return results.filter((el, index) => {
        if (withScore) {
            if (el.score === withScore) {
                return {
                    name: el.name,
                    score: el.score,
                    path: el.path,
                }
            }
        } else {
            return {
                name: el.name,
                score: el.score,
                path: el.path,
            }
        }
    })
}