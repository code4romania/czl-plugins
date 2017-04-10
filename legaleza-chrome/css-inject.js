CssInject = (function () {

    /**
     * Loads the css for popups from package and inserts it into DOM
     * @returns {Promise}
     */
    function inject() {
        var result = new promise.Promise();
        var cssUrl = chrome.extension.getURL('/resources/popup.css');
        promise.get(cssUrl).then(function (error, text) {
            if (error) {
                result.done(/*error: */true);
                return;
            }
            addCssToDom(text);
            result.done();
        });

        return result;
    }

    function addCssToDom(text) {
        var css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = text;
        document.head.appendChild(css);
    }

    return {
        'inject': inject
    }
})();
