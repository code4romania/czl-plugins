LogPrefix.decorate("Legaleza: ");


function annotatePage() {
    TextManipulationUtils.findTextNodes(document.body)
        .filter(TextManipulationUtils.containsDictionaryWord)
        .forEach(TextManipulationUtils.decorate);
}

// new MutationObserver(annotatePage).observe(document.body, {
//     attributes: false,
//     childList: true,
//     characterData: true,
//     subtree: true
// });

promise.join([Dictionary.load(), CssInject.inject()]).then(function(results) {
    var dictionaryLoadResult = results[0];
    var cssInjectResult = results[1];

    if (dictionaryLoadResult.length + cssInjectResult.length > 0) {
        console.error("Could not initiate environment. Loading dictionary status: '{}'. Injecting css status: '{}'", dictionaryLoadResult.length === 0 ? "SUCCESS" : "ERROR");
        return;
    }
    console.log("Finished initiating environment ");

    annotatePage();
});