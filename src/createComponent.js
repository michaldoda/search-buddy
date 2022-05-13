export default () => {
    const style = `
        #x-wrapper:focus-within {
            /*border: solid 2px #3e34d3;*/
            border: solid 1px rgba(62, 52, 211, 0.8) !important;
            box-shadow: 0 0 2px 2px rgb(62 52 211 / 20%), inset 0 0 0 2px rgb(62 52 211 / 20%);
            outline: medium none currentColor;
        }
        input:focus {
        padding: 0; }
        #x:focus-visible {
            border: none;
            outline: none;
        }
        #x::placeholder {
            color: rgba(128,126,163,.8);
        }
        #x{
            color: rgb(17, 11, 50);
        }
        svg {
            color: #3e34d3;
        height: auto;
        max-height: 20px;
        stroke-width: 1.6;
        width: 20px;

        }
    `;
    let styleElement = document.createElement("style");
    styleElement.innerText = style;
    document.head.appendChild(styleElement);
    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.boxSizing = "border-box";

    const wrapper = document.createElement("div");
    wrapper.style.alignItems = "center";
    wrapper.style.display = "flex";
    wrapper.style.overflow = "hidden";
    wrapper.style.backgroundColor = "#fff";
    wrapper.style.flexShrink = "0";
    wrapper.style.border = "solid 1px rgba(128,126,163,.8)"
    wrapper.style.height = "44px";
    wrapper.style.borderRadius = "3px";
    wrapper.style.order = "1";
    wrapper.style.width = "100%";







    form.appendChild(wrapper);
    wrapper.style.display = "flex";
    wrapper.setAttribute("id", "x-wrapper");


    const searchButtonElement = document.createElement("button");
    searchButtonElement.innerHTML = "&#128269;";
    searchButtonElement.style.order = "1";
    searchButtonElement.style.border = "0";
    searchButtonElement.style.background = "none";
    searchButtonElement.type = "submit";
    searchButtonElement.style.height = "100%";
    searchButtonElement.innerHTML = "&#128269;";

    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.setAttribute("id", "x");
    inputElement.placeholder = "Start typing";
    inputElement.style.order = "2";
    inputElement.style.fontSize = "1.3rem";
    inputElement.style.padding = "0";
    inputElement.style.fontWeight = "400";
    inputElement.style.border = "0";
    inputElement.style.height = "40px";
    inputElement.style.lineHeight = "40px";
    inputElement.style.outline = "none";
    inputElement.style.width = "100%";





    const clearButtonElement = document.createElement("button");
    clearButtonElement.innerHTML = "&#10005;";
    clearButtonElement.style.order = "3";
    clearButtonElement.style.border = "0";
    clearButtonElement.style.background = "none";
    clearButtonElement.style.height = "100%";
    clearButtonElement.type = "reset";










    wrapper.appendChild(searchButtonElement)
    wrapper.appendChild(inputElement)
    wrapper.appendChild(clearButtonElement)

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.querySelector("input").focus();
    });

    return form;
}