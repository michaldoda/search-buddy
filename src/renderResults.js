export default (results) => {
    let ulElement = document.createElement("ul");
    results.map((el, index) => {
        let liElement = document.createElement("li");
        let aElement = document.createElement("a");
        aElement.dataset.index = index;
        if (index === 0) {
            aElement.classList.add('selected');
        }

        aElement.innerHTML = el.name + " - " + el.score;
        aElement.href = "/";
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    });

    return ulElement;
};