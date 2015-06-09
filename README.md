# orderedlibloader

### A lazy loading Javascript library for loading libs sequentially in a specific order.

orderedlibloader can be usefull if you intend to load synchronously libs in a specific order thus resolving dependencies issues in lazy loading.

## Installation

`bower install orderedlibloader`

## Usage

```
<script type="text/javascript" src="bower_components/orderedlibloader/dist/OrderedLibLoader.min.js"></script>
```

```
var libsLoader = new OrderedLibLoader();
libsLoader.addLib("https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js");
libsLoader.addLib("https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js");
libsLoader.loadAllLibs(function (result) {
    console.log(result);
});
```

## API
* **addLib(url)**
* **removeLib(url)**
* **getLibs()**
* **addEventListener("onAllLibsLoaded", callback)**
* **loadAllLibs(callback)**
