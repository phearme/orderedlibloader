/*global describe, beforeEach, OrderedLibLoader, it, expect*/
describe("Load libs synchronously and check callback result: 2 libs succes and 1 fail (in that order)", function () {
    "use strict";
    var libsLoadedResult;

    beforeEach(function (done) {
        var libsLoader = new OrderedLibLoader();
        libsLoader.addLib("https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js");
        libsLoader.addLib("https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js");
        libsLoader.addLib("http://failfailfailfailfailfailfail.js");
        libsLoader.loadAllLibs(function (result) {
            libsLoadedResult = result;
            done();
        });
    });

    it("adds 3 libs, first 2 should load, last 1 should fail", function () {
        expect(JSON.stringify(libsLoadedResult)).toEqual('[{"url":"https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js","status":"loaded"},{"url":"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js","status":"loaded"},{"url":"http://failfailfailfailfailfailfail.js","status":"failed"}]');
    });

});
