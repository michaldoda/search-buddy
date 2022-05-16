import filter from './filter';
import items from "./items";
import renderResults from './renderResults'
let state = {
    shiftLeftLog: [],
    isOpen: false,
    threshold: 1000,
    query: "",
    results: [],
    // usingKeyNav: false,
};

export default (options) => {
    const container = document.createElement("div");
    container.setAttribute("id", "container");

    const formWrapper = document.createElement("div");
    formWrapper.setAttribute("id", "formWrapper");

    const form = document.createElement("form");
    form.setAttribute("id", "form");
    formWrapper.append(form);
    container.appendChild(formWrapper);
    let hrElement = document.createElement("div");
    hrElement.setAttribute("id", "divider");
    formWrapper.appendChild(hrElement);

    const result = document.createElement("div");
    result.setAttribute("id", "result");
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
        result.innerHTML = "";
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
        let currentItem = result.querySelector("ul li a.selected");
        if (!currentItem) {
            let firstItem = result.querySelector("ul li a");
            if (firstItem) {
                firstItem.classList.add("selected");
            } else {
                return null
            }
        }

        let index = parseInt(currentItem?.dataset.index);
        index = direction === 'down' ? index + 1 : index - 1;
        if (direction === 'up' && !currentItem.parentElement.previousElementSibling) {
            console.log('nothing to do');
            return;
        } else if (direction === 'down' && !currentItem.parentElement.nextElementSibling) {
            console.log('nothing to do');
            return;
        }

        let nextItem = result.querySelector('ul li a[data-index="'+index+'"]');
        if (nextItem) {
            currentItem.classList.remove('selected');
            nextItem.classList.add('selected');
            nextItem.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    };
    let getCurrentItem = () => {
        return result.querySelector("ul li a.selected");
    }
    const handleInputChange = (e) => {
        switch (e.key) {
            case "ArrowDown":
                navigate('down');
                return;
            case "ArrowUp":
                navigate('up');
                return;
            case "Enter":
                let currentItem = getCurrentItem();
                if (currentItem) {
                    window.location = currentItem.href;
                }
                return;
        }
        state.query = e.target.value;
        result.innerHTML = "";
        let filteredResults = filter(items, state.query);
        state.results = filteredResults;
        let resultElements = renderResults(filteredResults);
        if (filteredResults.length) {
            hrElement.style.display = "block";
            result.style.display = "block";
            result.appendChild(resultElements);
        }
        if (filteredResults.length === 0) {
            hideResults();
        }
        if (inputElement.value !== "") {
            toggleClearButton(true);
        } else {
            hideResults();
        }
    };

    const handleCloseClick = () => {
        hideContainer();
    };

    const handleMouseOver = (e) => {
        // if (state.usingKeyNav) {
        //     return;
        // }
        let items = result.querySelectorAll("ul li a")
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('selected');
        }
        if (e.target.tagName.toLowerCase() === "a") {
            e.target.classList.add("selected");
            state.activeIndex = e.target.dataset.index;
        }
    };


    document.addEventListener('keydown', handleKeyDown);
    result.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    closeButtonElement.addEventListener('mousedown', handleCloseClick);
    inputElement.addEventListener('keyup', handleInputChange);
    // inputElement.addEventListener('change', handleInputChange);
    // inputElement.addEventListener('keydown', handleInputChange);

    form.addEventListener('submit', (e) => {
        console.log('as');
        e.preventDefault();
        form.querySelector("input").focus();
    });
    form.addEventListener('reset', () => {
        hideResults();
        inputElement.focus();
    });

    return container;
}