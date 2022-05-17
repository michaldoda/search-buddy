export default (results, options) => {
    let ulElement = document.createElement("ul");
    results.map((el, index) => {
        let liElement = document.createElement("li");
        let aElement = document.createElement("a");
        aElement.dataset.index = index;
        if (index === 0) {
            aElement.classList.add('selected');
        }
        aElement.href = el.path;
        if (options.useIcons) {
            const spanIconElement = document.createElement("span");
            spanIconElement.classList.add(el.type ? el.type : 'document')
            spanIconElement.classList.add('icon')
            aElement.appendChild(spanIconElement);
        }

        const spanTitleElement = document.createElement("span");
        spanTitleElement.classList.add("title");
        spanTitleElement.innerHTML = el.title +" - " +  el.score;
        aElement.appendChild(spanTitleElement);

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    });

    return ulElement;
};