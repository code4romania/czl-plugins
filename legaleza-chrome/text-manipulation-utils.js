/**
 * Find and make changes to text nodes.
 *
 * @type {{findTextNodes, decorate, containsDictionaryWord}}
 */
TextManipulationUtils = (function () {

    /**
     * Finds all text nodes from the DOM.
     *
     * @param sourceElement The root of the tree where to search from.
     * @returns {Array} All text nodes from the dom except those containing scripts.
     */
    function findTextNodes(sourceElement) {
        var queue = [];
        var textNodes = [];
        queue.push(sourceElement);

        while (queue.length !== 0) {
            var currentElement = queue.shift();
            if (currentElement.nodeType === Node.TEXT_NODE) {
                if (currentElement.textContent.trim().length !== 0) {
                    textNodes.push(currentElement);
                }
                continue;
            }

            // Skip scripts. We only want actual text from site.
            if (currentElement.nodeType === Node.ELEMENT_NODE && ['script', 'noscript'].indexOf(currentElement.tagName.toLowerCase()) !== -1) {
                continue;
            }

            for (var i = 0; i < currentElement.childNodes.length; ++i) {
                queue.push(currentElement.childNodes[i]);
            }
        }

        return textNodes;
    }

    /**
     * Checks if a text node contains any of the known words from dictionary.
     *
     * @param textNode Node to check.
     * @returns {boolean} True if at least a word is found, false otherwise.
     */
    function containsDictionaryWord(textNode) {
        var text = textNode.textContent;

        // Just take the longer one for now ... TODO: Parse the text in a robust way and make correct changes.
        var currentKeyword = undefined;
        var currentLength = -1;
        var currentDictionaryEntry = undefined;
        for (var j = 0; j < Dictionary.getEntries().length; ++j) {
            var keyword = Dictionary.getEntries()[j].keyword;

            if (text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                if (keyword.length > currentLength) {
                    currentKeyword = keyword;
                    currentLength = keyword.length;
                    currentDictionaryEntry = Dictionary.getEntries()[j];
                }
            }
        }

        return currentLength !== -1;
    }

    /**
     * Manipulates DOM and inserts hover popups for all dictionary words
     *
     * @param textNode Node to decorate.
     */
    function decorate(textNode) {
        var parent = textNode.parentNode;
        var text = textNode.textContent;

        // TODO: This is duplicate. Will go away when implementing the correct word matching algorithm not the current stub one.
        var currentKeyword = undefined;
        var currentLength = -1;
        var currentDictionaryEntry = undefined;
        for (var j = 0; j < Dictionary.getEntries().length; ++j) {
            var keyword = Dictionary.getEntries()[j].keyword;

            if (text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                if (keyword.length > currentLength) {
                    currentKeyword = keyword;
                    currentLength = keyword.length;
                    currentDictionaryEntry = Dictionary.getEntries()[j];
                }
            }
        }

        // Make changes to DOM
        if (currentLength !== -1) {
            var regExp = new RegExp(currentKeyword, "ig");
            text = text.replace(regExp, '<span class="legaleza-popup">' + currentKeyword.toLowerCase() + '<div><div>Romana: ' + currentDictionaryEntry.romana + '</div><div>Legaleza: ' + currentDictionaryEntry.legaleza + '</div></div></span>');

            var editedNode = document.createElement('span');
            editedNode.innerHTML = text;
            parent.replaceChild(editedNode, textNode);
        }
    }

    return {
        'findTextNodes': findTextNodes,
        'decorate': decorate,
        'containsDictionaryWord': containsDictionaryWord
    };
})();