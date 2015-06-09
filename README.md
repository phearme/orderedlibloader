# orderedlibloader

A lazy loading Javascript library for loading libs sequentially in a specific order.

## Usage

```
var libsLoader = new OrderedLibLoader();
libsLoader.addLib("https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js");
libsLoader.addLib("https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js");
libsLoader.loadAllLibs(function (result) {
    console.log(result);
});

```
