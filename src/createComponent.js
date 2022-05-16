let state = {
    shiftLeftLog: [],
    isOpen: false,
    threshold: 1000,
};

export default () => {
    const container = document.createElement("div");
    container.setAttribute("id", "container");

    const formWrapper = document.createElement("div");
    formWrapper.setAttribute("id", "formWrapper");

    const form = document.createElement("form");
    form.setAttribute("id", "form");
    formWrapper.append(form);
    container.appendChild(formWrapper);
    let hrElement = document.createElement("hr");
    formWrapper.appendChild(hrElement);

    const result = document.createElement("div");
    result.setAttribute("id", "result");
    result.innerHTML = "" +
        "<ul>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "<li><a href=''>ok</a></li>" +
        "</ul>" +
        "";
    formWrapper.appendChild(result);

    const fieldsWrapper = document.createElement("div");
    fieldsWrapper.setAttribute("id", "fieldsWrapper");
    form.appendChild(fieldsWrapper);


    const searchButtonElement = document.createElement("button");
    searchButtonElement.setAttribute("id", "search-button");
    searchButtonElement.innerHTML = "&#128269;";
    searchButtonElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" style='color: #4947ff; margin-top: 4px; height: 20px; width: 20px' fill=\"currentColor\" class=\"bi bi-search\" viewBox=\"0 0 16 16\"> <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"/> </svg>";
    searchButtonElement.type = "submit";
    fieldsWrapper.appendChild(searchButtonElement)

    const inputElement = document.createElement("input");
    inputElement.setAttribute("id", "input");
    inputElement.type = "text";
    inputElement.placeholder = "Start typing";
    inputElement.autocomplete = "off";
    inputElement.spellcheck = false;
    fieldsWrapper.appendChild(inputElement)

    const clearButtonElement = document.createElement("button");
    clearButtonElement.setAttribute("id", "clear-button");
    clearButtonElement.innerHTML = "&#10005;";
    clearButtonElement.type = "reset";
    fieldsWrapper.appendChild(clearButtonElement)

    const closeButtonElement = document.createElement("button");
    closeButtonElement.setAttribute("id", "close-button");
    closeButtonElement.innerHTML = "Cancel";
    fieldsWrapper.appendChild(closeButtonElement)

    const showContainer = () => {
        state.isOpen = true;
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
        container.style.display = "inline-block";
        container.querySelector('input').focus();
    };

    const hideContainer = () => {
        state.isOpen = false;
        container.style.display = "none";
        document.body.style.overflow = "auto";
        document.body.style.height = "100%";
        inputElement.value = "";
        hideResults();
    };

    const hideResults = () => {
        hrElement.style.display = "none";
        result.style.display = "none";
        toggleClearButton(false);
    };

    const toggleClearButton = (state) => {
        clearButtonElement.style.visibility = state ? "visible" : "hidden";
    };

    const handleMouseDown = (e) => {
        if (state.isOpen === true && e.target === container) { //todo review if needed
            hideContainer();
        }
    }
    const handleKeyDown = (e) => {
        if (e.code === "ShiftLeft" && state.isOpen === false) {
            state.shiftLeftLog.push({
                time: Date.now()
            });

            if (state.shiftLeftLog.length > 1) {
                if (state.shiftLeftLog[state.shiftLeftLog.length-1].time - state.shiftLeftLog[state.shiftLeftLog.length-2].time < state.threshold) {
                    showContainer();
                    state.shiftLeftLog = [];
                } else {
                    state.shiftLeftLog = [];
                }
            }

        } else if (e.code === "Escape") {
            if (state.isOpen === true) {
                hideContainer();
            }
        }
    };

    const handleInputChange = (e) => {
        hrElement.style.display = "block";
        result.style.display = "block";
        if (inputElement.value !== "") {
            toggleClearButton(true);
        } else {
            hideResults();
        }
    };

    const handleCloseClick = () => {
        hideContainer();
    };


    document.addEventListener('keydown',handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    closeButtonElement.addEventListener('mousedown', handleCloseClick);
    inputElement.addEventListener('keyup', handleInputChange);
    inputElement.addEventListener('change', handleInputChange);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.querySelector("input").focus();
    });
    form.addEventListener('reset', (e) => {
        hideResults();
        inputElement.focus();
    });

    return container;
}