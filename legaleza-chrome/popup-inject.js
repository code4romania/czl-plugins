PopupInject = (function () {

    var template;

    function inject(textNode, dictionaryEntry) {
        var parent = textNode.parentNode;
        var text = textNode.textContent;

        var compiledTemplate = template;
        compiledTemplate = compiledTemplate
            .replace('{{keyword}}', dictionaryEntry.keyword.toLowerCase())
            .replace('{{romana}}', dictionaryEntry.romana)
            .replace('{{legaleza}}', dictionaryEntry.legaleza);

        var regExp = new RegExp(dictionaryEntry.keyword, "ig");
        text = text.replace(regExp, compiledTemplate);

        var editedNode = document.createElement('span');
        editedNode.innerHTML = text;
        parent.replaceChild(editedNode, textNode);
    }

    function load() {
        var result = new promise.Promise();
        var templateUrl = chrome.extension.getURL('/resources/popup-template.html');
        promise.get(templateUrl).then(function (error, text) {
            if (error) {
                result.done(/*error: */true);
                return;
            }

            template = text;
            result.done();
        });

        return result;
    }

    return {
        'inject': inject,
        'load': load
    }
})();
