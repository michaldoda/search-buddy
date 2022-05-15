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
        "<div class='items'>" +
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
        "</div>" +
        "";
    formWrapper.appendChild(result);

    const fieldsWrapper = document.createElement("div");
    fieldsWrapper.setAttribute("id", "fieldsWrapper");
    form.appendChild(fieldsWrapper);


    const searchButtonElement = document.createElement("button");
    searchButtonElement.setAttribute("id", "search-button");
    searchButtonElement.innerHTML = "&#128269;";
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.querySelector("input").focus();
    });

    const handleMouseDown = (e) => {
        if (state.isOpen === true && e.target === container) { //todo review if needed
            state.isOpen = false;
            container.style.display = "none";
        }
    }
    const handleKeyDown = (e) => {
        if (e.code === "ShiftLeft" && state.isOpen === false) {
            state.shiftLeftLog.push({
                time: Date.now()
            });

            if (state.shiftLeftLog.length > 1) {
                if (state.shiftLeftLog[state.shiftLeftLog.length-1].time - state.shiftLeftLog[state.shiftLeftLog.length-2].time < state.threshold) {
                    state.isOpen = true;
                    document.body.style.overflow = "hidden"; // ADD THIS LINE
                    document.body.style.height = "100%"; // ADD THIS LINE
                    container.style.display = "inline-block";
                    container.querySelector('input').focus();
                    state.shiftLeftLog = [];
                } else {
                    state.shiftLeftLog = [];
                }
            }

        } else if (e.code === "Escape") {
            if (state.isOpen === true) {
                state.isOpen = false;
                container.style.display = "none";
                document.body.style.overflow = "auto";
                document.body.style.height = "100%";
            }
        }
    };

    const handleInputChange = (e) => {
        hrElement.style.display = "block";
        result.style.display = "block";
    };

    document.addEventListener('keydown',handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    inputElement.addEventListener('keydown', handleInputChange);

    return container;
}