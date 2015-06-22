# orderedlibloader

### A lazy loading Javascript library for loading libs sequentially in a specific order.

*orderedlibloader* is used to load libs sequentially in a specific order thus resolving dependencies issues in lazy loading. Even though the libs are loaded sequentially, loading the libs is asynchronous and does not block the current thread. A callback can be specified and triggered once all libs are done loading.

## Installation

`bower install --save orderedlibloader`

## Usage

```html
<script type="text/javascript" src="bower_components/orderedlibloader/dist/OrderedLibLoader.min.js"></script>
```

```javascript
var libsLoader = new OrderedLibLoader();
libsLoader.addLib("https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js");
libsLoader.addLib("https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js");
libsLoader.loadAllLibs(function (result) {
    console.log(result);
});
```

## API
* addLib(url)
* removeLib(url)
* getLibs()
* clearLibs()
* addEventListener("onAllLibsLoaded", callback)
* loadAllLibs(callback)
