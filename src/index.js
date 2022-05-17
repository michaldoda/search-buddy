import './styles.css';
import createComponent from "./createComponent";
import items from "./items";
window["AwesomePlugin"] = (options) => {
    document.body.appendChild(createComponent(options));
};

AwesomePlugin({
    mode: "local",
    source: items,
    keyShortcut: "doubleLeftShift",
});
