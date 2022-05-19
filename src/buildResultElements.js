export default (results, options) => {
    let ulElement = document.createElement("ul");
    ulElement.classList.add("SearchBuddy-result-ul");
    results.map((el, index) => {
        let liElement = document.createElement("li");
        liElement.classList.add("SearchBuddy-result-li")
        let aElement = document.createElement("a");
        aElement.classList.add("SearchBuddy-result-a");
        aElement.dataset.index = index;
        if (index === 0) {
            aElement.classList.add('selected');
        }
        aElement.href = el.path;
        if (options.withIcons) {
            const spanIconElement = document.createElement("span");
            spanIconElement.classList.add("SearchBuddy-result-span");
            spanIconElement.classList.add("SearchBuddy-icon");
            if (el.icon) {
                spanIconElement.innerHTML = el.icon;
            } else {
                spanIconElement.innerHTML = "📄";
            }
            aElement.appendChild(spanIconElement);
        }

        const spanTitleElement = document.createElement("span");
        spanTitleElement.classList.add("SearchBuddy-result-span");
        spanTitleElement.innerHTML = el.title;
        spanTitleElement.setAttribute("title", el.score);
        aElement.appendChild(spanTitleElement);

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    });

    return ulElement;
};