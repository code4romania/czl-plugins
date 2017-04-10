/**
 *  Licensed under the MIT license.
 *  https://github.com/bahamas10/node-log-prefix
 *
 *  EDITED
 */




LogPrefix = (function() {
    var funcs = {
        log: console.log.bind(console),
        info: console.info.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console)
    };

    function decorate(prefix) {
        Object.keys(funcs).forEach(function(k) {
            console[k] = function() {
                arguments[0] = prefix + arguments[0];
                funcs[k].apply(console, arguments);
            };
        });
    }

    return {
        'decorate': decorate
    }
})();