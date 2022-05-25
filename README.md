<h1 align="center">
🍭 search-buddy
</h1>  

<p align="center">
 <img width="" src="https://github.com/michaldoda/search-buddy/blob/main/docs/images/logo.png?raw=true" alt="search-buddy js plugin">
</p>

<p>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/michaldoda/search-buddy/actions/workflows/build-n-test.yml/badge.svg"><img src="https://github.com/michaldoda/search-buddy/actions/workflows/build-n-test.yml/badge.svg" alt="release workflow result" style="max-width:100%;"></a>
 <a target="_blank" href="https://www.npmjs.com/package/search-buddy"><img src="https://flat.badgen.net/npm/dt/search-buddy" alt="search-buddy total downloads" /></a>   
<a target="_blank" href="https://www.npmjs.com/package/search-buddy"><img src="https://flat.badgen.net/npm/v/search-buddy" alt="search-buddy version" /></a>
    <a target="_blank" href="https://www.npmjs.com/package/search-buddy"><img src="https://flat.badgen.net/npm/license/search-buddy" alt="search-buddy license" /></a>
</p>

**search-buddy** is an open‑source ultra lightweight javascript plugin (* **<1kb**). It can help you create instant search and/or facilitate navigation between pages. It was written in pure JS without any dependencies, those make it ultra lightweight. * *~0.2kb after gzip*.

It is especially useful in projects that are stuck in complex navigation structures (e.g. admin panel). It will surely make your users' everyday things more enjoyable.

## Features
- key shortcut (e.g. `doubleShiftLeft`, `Ctrl+/`, `doubleEscape` and so on)
- arrow navigation
- cache mechanism (sessionStorage)
- built-in search algorithm, you just pass the items to be searched
- two modes: `local` and `async`
  - `local` - uses static data passed within config
  - `async` - resolves any async function you pass
- responsive design
- and more, please check <a href="https://michaldoda.github.io/search-buddy/" target="_blank">Live demo</a>!


<p align="center">
  <img width="460" src="https://github.com/michaldoda/search-buddy/blob/main/docs/images/search-buddy.png?raw=true" alt="search-buddy js plugin">
</p>


## Installation


```bash
npm i search-buddy
```

## Usage

```js
import { SearchBuddy } from 'search-buddy';

let searchBuddy = SearchBuddy({
    items: [
        { title: "Settings", path: "/settings", icon: "🛠️" },
        { title: "Users", path: "/users", icon: "👥️" }
    ],
    keyShortcut: "doubleShiftLeft",
});

// optionally: you can also bind click events to searchBuddy.show
document.querySelector("#search-btn").addEventListener("click", searchBuddy.show);

```

You also need to load styles, you can import styles in scss
```scss
@import 'search-buddy';
```
or via javascript
```js
import 'search-buddy/dist/esm/index.css'
```


## Installation via CDN (jsDelivr)
This script **contains all** javascript and css styles, there is no need to load any additional file.
```html
<script src="https://cdn.jsdelivr.net/npm/search-buddy@latest/dist/standalone.min.js"></script>
<script>
  let searchBuddy = SearchBuddy({
    items: [
      { title: "Settings", path: "/settings", icon: "🛠️" },
      { title: "Users", path: "/users", icon: "👥️" }
    ],
    keyShortcut: "doubleShiftLeft",
  });
</script>
```

## Configuration
### Options with default values
```js
SearchBuddy({
  /**
   * The URL the user will be redirected to if there are no results
   * and the user clicks Enter. The search value will be appended to this URL.
   * 
   * @example: "/search?query="
   */
  fallbackSearchUrl: null,

  /**
   * It can be an array or an async function. 
   * If an async function is used, you must also set the mode to 'async'
   * 
   * @example [ {title: "Page", path: "/page", } ]
   * @example async () => {}
   */
  items: [],
  /**
   * Key shortcut used to activate search-buddy.
   * There is a naming convention. If you want to listen for a double click,
   * then use "double[keyCode]" where [keyCode] is the code of the key.
   * In case you want to use two key press event,
   * use the key code separated by a plus sign.
   *
   * Key codes: https://w3c.github.io/uievents/#dom-keyboardevent-code
   *
   * @example "doubleShiftLeft"
   * @example "doubleEscape"
   * @example "Ctrl+/"
   */
  keyShortcut: null,
  /**
   * The maximum number of items rendered in search box.
   */
  maxResults: 25,
  /**
   * Determines the use of async or sync to load items.
   */
  mode: "local",
  /**
   * The placeholder for search input.
   */
  placeholder: "Start typing...",
  /**
   * Flag to enable saving results to sessionStorage.
   * It is especially useful when loading items via API.
   */
  stateSave: false,
  /**
   * The time threshold (ms) for double clicks.
   * It is used only if keyShortcut is passed.
   */
  threshold: 1000,
  /**
   * Show/hide emojis.
   */
  withIcons: true,
})
```

### Instance
Whenever you run `SearchBuddy(options)` the new instance will be created. The instance contains some public attributes and methods. You should avoid creating multiple instances, the idea is to have one instance per entire app.

Usually there is no need to manually interact with the instance, but if you want to use it anyway then here you have a little docs:
```js
// Let's create an instance
const searchBuddy = SearchBuddy(options);

/**
 * Reference to DOM element
 */
searchBuddy.container

/**
 * Manually opens a container
 */
searchBuddy.show()

/**
 * Manually hides a container
 */
searchBuddy.hide()

/**
 * Manually destroys DOM elements and removes all event listeners 
 */
searchBuddy.destroy()
```

## Digging Deeper

### fetch `items` with async

As you know, it may happen that you have much more URLs, then the recommended solution is to use async mode with session cache.

Instead of passing array you can simple pass an async function, this function will be resolved by `search-buddy`. This function MUST return just an array of items.
```js
SearchBuddy({
    mode: 'async',
    items: async () => { /* ... */ },
    stateSave: true, // <-- enable cache with sessionStorage
    keyShortcut: "doubleShiftLeft",
});

```

#### async example
```js
SearchBuddy({
    mode: 'async',
    keyShortcut: "doubleShiftLeft",
    stateSave: true,
    items: async () => {
        const getData = () => {
            return fetch('/api/search-buddy-items.json')
                .then(response => response.json())
                .then(data => data);
        };
        return new Promise((resolve, reject) => {
            resolve(getData());
        });
    },
});
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](LICENSE)
