let state = [];
let isOpen = false;
let threshold = 1000;

export default () => {
    const container = document.createElement("div");
    container.setAttribute("id", "container");

    const form = document.createElement("form");
    form.setAttribute("id", "form");
    container.appendChild(form);


    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "wrapper");
    form.appendChild(wrapper);


    const searchButtonElement = document.createElement("button");
    searchButtonElement.setAttribute("id", "search-button");
    searchButtonElement.innerHTML = "&#128269;";
    searchButtonElement.type = "submit";
    wrapper.appendChild(searchButtonElement)

    const inputElement = document.createElement("input");
    inputElement.setAttribute("id", "input");
    inputElement.type = "text";
    inputElement.placeholder = "Start typing";
    wrapper.appendChild(inputElement)

    const clearButtonElement = document.createElement("button");
    clearButtonElement.setAttribute("id", "clear-button");
    clearButtonElement.innerHTML = "&#10005;";
    clearButtonElement.type = "reset";
    wrapper.appendChild(clearButtonElement)

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.querySelector("input").focus();
    });

    const handleMouseDown = (e) => {
        if (isOpen === true) {
            isOpen = false;
            container.style.display = "none";
        }
    }
    const handleKeyDown = (e) => {
        console.log(state);
        if (e.code === "ShiftLeft") {
            state.push({
                time: Date.now()
            });

            if (state.length > 1) {
                if (state[state.length-1].time - state[state.length-2].time < threshold) {
                    isOpen = true;
                    document.body.style.overflow = "hidden"; // ADD THIS LINE
                    document.body.style.height = "100%"; // ADD THIS LINE
                    container.style.display = "inline-block";
                    container.querySelector('input').focus();
                } else {
                    state = [];
                }
            }

        } else if (e.code === "Escape") {
            if (isOpen === true) {
                isOpen = false;
                container.style.display = "none";
                document.body.style.overflow = "auto";
                document.body.style.height = "100%";
            }
        }
    };

    document.addEventListener('keydown',handleKeyDown);
    document.addEventListener('click', handleMouseDown);

    return container;
}