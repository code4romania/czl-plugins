/**
 *
 * @type {{load, getEntries}}
 */
Dictionary = (function () {
    var entries;

    /**
     * Loads dictionary content.
     * @returns {Promise}
     */
    function load() {
        var result = new promise.Promise();
        var dictionaryUrl = chrome.extension.getURL('/resources/dictionary.json');
        promise.get(dictionaryUrl).then(function (error, text) {
            if (error) {
                result.done(/*error: */true);
                return;
            }

            entries = JSON.parse(text);
            result.done();
        });

        return result;
    }

    function getEntries() {
        return entries;
    }

    return {
        'load': load,
        'getEntries': getEntries
    }
})();



