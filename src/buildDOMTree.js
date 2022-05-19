const buildDOMTree = (options) => {
    const container = document.createElement("div");
    container.classList.add("SearchBuddy-container");

    const wrapper = document.createElement("div");
    wrapper.classList.add("SearchBuddy-wrapper");

    const form = document.createElement("form");
    form.classList.add( "SearchBuddy-form");
    const formWrapper = document.createElement("div");
    formWrapper.classList.add("SearchBuddy-form-wrapper");
    formWrapper.appendChild(form);
    wrapper.append(formWrapper);
    container.appendChild(wrapper);

    const resultElement = document.createElement("div");
    resultElement.classList.add("SearchBuddy-result");
    wrapper.appendChild(resultElement);

    const fieldsWrapper = document.createElement("div");
    fieldsWrapper.classList.add( "SearchBuddy-form-wrapper-fields-wrapper");
    form.appendChild(fieldsWrapper);


    const searchButtonElement = document.createElement("button");
    searchButtonElement.classList.add("SearchBuddy-form-wrapper-fields-wrapper-search-button");
    searchButtonElement.innerHTML = "&#128269;";
    searchButtonElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" style='color: rgba(0,0,0,0.4); margin-top: 4px; height: 20px; width: 20px' fill=\"currentColor\" class=\"bi bi-search\" viewBox=\"0 0 16 16\"> <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"/> </svg>";
    searchButtonElement.type = "submit";
    fieldsWrapper.appendChild(searchButtonElement)

    const inputElement = document.createElement("input");
    inputElement.classList.add("SearchBuddy-form-wrapper-fields-wrapper-input");
    inputElement.type = "text";
    inputElement.placeholder = options.placeholder ?? "Start typing";
    inputElement.autocomplete = "off";
    inputElement.spellcheck = false;
    fieldsWrapper.appendChild(inputElement)

    const clearButtonElement = document.createElement("button");
    clearButtonElement.classList.add("SearchBuddy-form-wrapper-fields-wrapper-clear-button");
    clearButtonElement.innerHTML = "&#10005;";
    clearButtonElement.type = "reset";
    fieldsWrapper.appendChild(clearButtonElement)

    const closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("SearchBuddy-form-wrapper-fields-wrapper-close-button");
    closeButtonElement.innerHTML = "Close";
    fieldsWrapper.appendChild(closeButtonElement);

    return {
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
    }
};

export { buildDOMTree };