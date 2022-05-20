export default (results, options) => {
    let ulElement = document.createElement("ul");
    ulElement.classList.add("SearchBuddy-result-ul");

    for (let index = 0; index < results.length; index++) {
        if (options?.maxResults && index >= options.maxResults) break;

        let liElement = document.createElement("li");
        liElement.classList.add("SearchBuddy-result-li")
        let aElement = document.createElement("a");
        aElement.classList.add("SearchBuddy-result-a");
        aElement.dataset.index = index;
        if (index === 0) {
            aElement.classList.add('selected');
        }
        aElement.setAttribute("href",  results[index].path);
        if (options?.withIcons) {
            const spanIconElement = document.createElement("span");
            spanIconElement.classList.add("SearchBuddy-result-span");
            spanIconElement.classList.add("SearchBuddy-icon");
            if (results[index].icon) {
                spanIconElement.innerHTML = results[index].icon;
            } else {
                spanIconElement.innerHTML = "📄";
            }
            aElement.appendChild(spanIconElement);
        }

        const spanTitleElement = document.createElement("span");
        spanTitleElement.classList.add("SearchBuddy-result-span");
        spanTitleElement.innerHTML = results[index].title;
        spanTitleElement.setAttribute("title", results[index].score);
        aElement.appendChild(spanTitleElement);

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }

    return ulElement;
};