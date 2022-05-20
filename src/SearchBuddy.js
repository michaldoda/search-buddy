import filter from './filter';
import buildResultElements from './buildResultElements'
import { buildDOMTree } from './buildDOMTree';

const SearchBuddy = (options) => {
    options = {
        fallbackSearchUrl: null,
        keyShortcut: null,
        placeholder: "Start typing...",
        withIcons: true,
        maxResults: 25,
        stateSave: false,
        ...options,
    }

    let state = {
        keyDownLog: [],
        isOpen: false,
        threshold: 1000,
        query: "",
        results: [],
        cachedItems: null,
        isKeyShortcutDouble: false,
    };

    const {
        container,
        form,
        inputElement,
        clearButtonElement,
        closeButtonElement,
        resultElement,
    } = buildDOMTree(options);

    const show = () => {
        state.isOpen = true;
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
        container.style.display = "inline-block";
        container.querySelector('.SearchBuddy-form-wrapper-fields-wrapper-input').focus();
    };

    const hide = () => {
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
        if (state.isOpen === true && e.target === container) {
            hide();
        }
    }

    const handleEscape = (e) => {
        if (e.code === "Escape") {
            if (state.isOpen === true) {
                hide();
            }
        }
    };

    const navigate = (direction) => {
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
                e.preventDefault();
                return;
            case "ArrowUp":
                navigate('up');
                e.preventDefault();
                return;
            case "Enter":
                let href = resultElement.querySelector("ul li a.selected")?.href;
                if (href) {
                    window.location = href;
                } else if (options.fallbackSearchUrl) {
                    window.location = options.fallbackSearchUrl + inputElement.value;
                }
                return;
        }
    }
    const getItems = async () => {
        let items = state.cachedItems;
        if (!items && options.stateSave) {
            items = JSON.parse(sessionStorage.getItem('SearchBuddyItems'));
        }
        if (items) {
            state.cachedItems = items;
            return new Promise((resolve) => {
                resolve(state.cachedItems);
            });
        }
        if (options.mode === "local") {
            return new Promise((resolve) => {
                if (options.stateSave) sessionStorage.setItem('SearchBuddyItems', JSON.stringify(options.items));
                state.cachedItems = options.items;
                resolve(options.items);
            });
        } else if (options.mode === "async") {
            return options.items().then((res) => {
                if (options.stateSave) sessionStorage.setItem('SearchBuddyItems', JSON.stringify(res));
                state.cachedItems = res;
                return res;
            });
        }
    };
    const handleInputChange = (e) => {
        let arrowDownClicked = false;
        switch (e.key) {
            case "ArrowDown":
                if (e.target.value === "" && !state.results.length) {
                    arrowDownClicked = true;
                    break;
                }
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
            let filteredResults;
            if (e.target.value === " " || (e.target.value === "" && arrowDownClicked)) {
                filteredResults = itemToProcess;
            } else {
                filteredResults = filter(itemToProcess, state.query);
            }

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
                if (!arrowDownClicked) {
                    hideResults();
                }
            }
        });
    };

    const handleCloseClick = () => {
        hide();
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

    const handleKeyShortcutsClean = () => {
        if (!state.isKeyShortcutDouble) {
            state.keyDownLog = [];
        }
    };

    const handleKeyShortcuts = (e) => {
        if (!options.keyShortcut) return;

        let dblCheck = options.keyShortcut.slice(0, 6) === "double";
        if (dblCheck) state.isKeyShortcutDouble = true;
        let keyShortcut = dblCheck ? options.keyShortcut.replace("double", "") : options.keyShortcut;

        switch (options.keyShortcut) {
            case "double"+keyShortcut:
                if (!dblCheck) return;
                if (e.code === keyShortcut && state.isOpen === false) {
                    state.keyDownLog.push({
                        time: Date.now()
                    });

                    if (state.keyDownLog.length > 1) {
                        if (state.keyDownLog[state.keyDownLog.length-1].time - state.keyDownLog[state.keyDownLog.length-2].time < state.threshold) {
                            show();
                            state.keyDownLog = [];
                        } else {
                            state.keyDownLog = [];
                        }
                    }

                }
                break;
            default:
                let split = options.keyShortcut.split("+");
                if ([split[0], split[1]].includes(e.code)) {
                    state.keyDownLog.push(e.code);
                    if (state.keyDownLog.length > 1
                        && state.keyDownLog.includes(split[0])
                        && state.keyDownLog.includes(split[1])
                    ) {
                        e.preventDefault();
                        show();
                        state.keyDownLog = [];
                    }
                }
                break;
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        form.querySelector("input").focus();
    };

    const handleFormReset = () => {
        hideResults();
        inputElement.focus();
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyShortcuts);
    document.addEventListener('keyup', handleKeyShortcutsClean);
    resultElement.addEventListener('mousemove', handleMouseOver);
    closeButtonElement.addEventListener('mousedown', handleCloseClick);
    inputElement.addEventListener('keyup', handleInputChange);
    inputElement.addEventListener('keydown', handleNavigation);
    inputElement.addEventListener('keydown', handleEscape);
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('reset', handleFormReset);


    document.body.appendChild(container);

    return {
        container,
        show,
        hide,
    };
}



export { SearchBuddy };
