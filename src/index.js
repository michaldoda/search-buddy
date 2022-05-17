import './styles.css';
import createComponent from "./createComponent";

window["search"] = (options) => {
    if (!window["search-container"]) {
        window["search-container"] = 1;
        document.body.appendChild(createComponent({
            container: "container",
            useIcons: false,
            ...options,
        }));
    }
};

search();