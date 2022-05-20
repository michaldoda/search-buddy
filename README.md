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
- and more, please check Live demo!


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

You also need to load styles
```scss
@import 'search-buddy';
```


## Installation via CDN (jsDelivr)
This script **contains all** javascript and css styles, there is no need to load any additional file.

```html
<script src="https://cdn.jsdelivr.net/npm/search-buddy@1.0.0/dist/standalone.min.js"></script>
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


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](LICENSE)