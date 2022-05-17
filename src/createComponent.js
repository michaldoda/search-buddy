import filter from './filter';
import buildResultElements from './buildResultElements'

const createComponent = (options) => {
    let state = {
        shiftLeftLog: [],
        isOpen: false,
        threshold: 1000,
        query: "",
        results: [],
        sourceData: null,
    };

    const container = document.createElement("div");
    container.classList.add("AwesomePlugin-container");

    const wrapper = document.createElement("div");
    wrapper.classList.add("AwesomePlugin-wrapper");

    const form = document.createElement("form");
    form.classList.add( "AwesomePlugin-form");
    const formWrapper = document.createElement("div");
    formWrapper.classList.add("AwesomePlugin-form-wrapper");
    formWrapper.appendChild(form);
    wrapper.append(formWrapper);
    container.appendChild(wrapper);

    const resultElement = document.createElement("div");
    resultElement.classList.add("AwesomePlugin-result");
    wrapper.appendChild(resultElement);

    const fieldsWrapper = document.createElement("div");
    fieldsWrapper.classList.add( "AwesomePlugin-form-wrapper-fields-wrapper");
    form.appendChild(fieldsWrapper);


    const searchButtonElement = document.createElement("button");
    searchButtonElement.classList.add("AwesomePlugin-form-wrapper-fields-wrapper-search-button");
    searchButtonElement.innerHTML = "&#128269;";
    searchButtonElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" style='color: #4947ff; margin-top: 4px; height: 20px; width: 20px' fill=\"currentColor\" class=\"bi bi-search\" viewBox=\"0 0 16 16\"> <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"/> </svg>";
    searchButtonElement.type = "submit";
    fieldsWrapper.appendChild(searchButtonElement)

    const inputElement = document.createElement("input");
    inputElement.classList.add("AwesomePlugin-form-wrapper-fields-wrapper-input");
    inputElement.type = "text";
    inputElement.placeholder = options.placeholder ?? "Start typing";
    inputElement.autocomplete = "off";
    inputElement.spellcheck = false;
    fieldsWrapper.appendChild(inputElement)

    const clearButtonElement = document.createElement("button");
    clearButtonElement.classList.add("AwesomePlugin-form-wrapper-fields-wrapper-clear-button");
    clearButtonElement.innerHTML = "&#10005;";
    clearButtonElement.type = "reset";
    fieldsWrapper.appendChild(clearButtonElement)

    const closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("AwesomePlugin-form-wrapper-fields-wrapper-close-button");
    closeButtonElement.innerHTML = "Close";
    fieldsWrapper.appendChild(closeButtonElement)

    const showContainer = () => {
        state.isOpen = true;
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
        container.style.display = "inline-block";
        container.querySelector('.AwesomePlugin-form-wrapper-fields-wrapper-input').focus();
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
        resultElement.style.display = "none";
        resultElement.innerHTML = "";
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

    let navigate = (direction) => {
        let currentItem = resultElement.querySelector("ul li a.selected");
        inputElement.focus();
        if (!currentItem) {
            let firstItem = resultElement.querySelector("ul li a");
            if (firstItem) {
                firstItem.classList.add("selected");
                return;
            } else {
                return;
            }
        }

        let index = parseInt(currentItem?.dataset.index);
        index = direction === 'down' ? index + 1 : index - 1;
        if (direction === 'up' && !currentItem.parentElement.previousElementSibling) {
            return;
        } else if (direction === 'down' && !currentItem.parentElement.nextElementSibling) {
            return;
        }

        let nextItem = resultElement.querySelector('ul li a[data-index="'+index+'"]');
        if (nextItem) {
            currentItem.classList.remove('selected');
            nextItem.classList.add('selected');
            nextItem.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'start' });
        }
    };

    const handleNavigation = (e) => {
        switch (e.key) {
            case "ArrowDown":
                navigate('down');
                inputElement.scrollLeft = inputElement.scrollWidth;
                return;
            case "ArrowUp":
                navigate('up');
                inputElement.scrollLeft = inputElement.scrollWidth;
                return;
            case "Enter":
                let href = resultElement.querySelector("ul li a.selected")?.href;
                if (href) {
                    window.location = href;
                }
                return;
        }
    }
    const getItems = async () => {
        if (state.sourceData !== null) {
            return new Promise((resolve) => {
                resolve(state.sourceData);
            });
        }
        if (options.mode === "local") {
            return new Promise((resolve) => {
                state.sourceData = options.source;
                resolve(options.source);
            });
        } else if (options.mode === "async") {
            return options.source().then((res) => {
                state.sourceData = res.data;
                return res.data;
            });
        }
    };
    const handleInputChange = (e) => {
        switch (e.key) {
            case "ArrowDown":
                return;
            case "ArrowUp":
                return;
            case "Enter":
                return;
        }
        state.query = e.target.value;
        getItems().then((res) => {
            let itemToProcess = res;
            resultElement.innerHTML = "";
            let filteredResults = filter(itemToProcess, state.query);
            state.results = filteredResults;
            let resultElements = buildResultElements(filteredResults, options);
            if (filteredResults.length) {
                resultElement.style.display = "block";
                resultElement.appendChild(resultElements);
            }
            if (filteredResults.length === 0) {
                hideResults();
            }
            if (e.target.value !== "") {
                toggleClearButton(true);
            } else {
                hideResults();
            }
        });
    };

    const handleCloseClick = () => {
        hideContainer();
    };

    const handleMouseOver = (e) => {
        let items = resultElement.querySelectorAll("ul li a")
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('selected');
        }
        if (e.target.tagName.toLowerCase() === "a") {
            if (e.target.classList.contains('selected')) return;
            e.target.classList.add("selected");
            state.activeIndex = e.target.dataset.index;
        } else if (e.target.tagName.toLowerCase() === "span") {
            if (e.target.parentElement.classList.contains('selected')) return;
            e.target.parentElement.classList.add("selected");
            state.activeIndex = e.target.parentElement.dataset.index;
        }
    };


    document.addEventListener('keydown', handleKeyDown);
    resultElement.addEventListener('mousemove', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    closeButtonElement.addEventListener('mousedown', handleCloseClick);
    inputElement.addEventListener('keyup', handleInputChange);
    inputElement.addEventListener('keydown', handleNavigation);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.querySelector("input").focus();
    });
    form.addEventListener('reset', () => {
        hideResults();
        inputElement.focus();
    });

    return container;
}

window["AwesomePlugin"] = (options) => {
    document.body.appendChild(createComponent(options));
};