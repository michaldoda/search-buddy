export default (results, options) => {
    let ulElement = document.createElement("ul");
    ulElement.classList.add("AwesomePlugin-result-ul");
    results.map((el, index) => {
        let liElement = document.createElement("li");
        liElement.classList.add("AwesomePlugin-result-li")
        let aElement = document.createElement("a");
        aElement.classList.add("AwesomePlugin-result-a");
        aElement.dataset.index = index;
        if (index === 0) {
            aElement.classList.add('selected');
        }
        aElement.href = el.path;
        if (options.useIcons) {
            const spanIconElement = document.createElement("span");
            spanIconElement.classList.add("AwesomePlugin-result-span");
            if (el.icon) {
                spanIconElement.classList.add("AwesomePlugin-icon-custom");
                spanIconElement.innerHTML = el.icon;
            } else {
                spanIconElement.classList.add(el.type === "magic" ? "AwesomePlugin-icon-magic" : 'AwesomePlugin-icon-document')
            }
            spanIconElement.classList.add('AwesomePlugin-icon')
            aElement.appendChild(spanIconElement);
        }

        const spanTitleElement = document.createElement("span");
        spanTitleElement.classList.add("AwesomePlugin-result-span");
        spanTitleElement.innerHTML = el.title;
        spanTitleElement.setAttribute("title", el.score);
        aElement.appendChild(spanTitleElement);

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    });

    return ulElement;
};