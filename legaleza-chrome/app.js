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

promise.join([Dictionary.load(), CssInject.inject(), PopupInject.load()]).then(function(results) {
    var dictionaryLoadResult = results[0];
    var cssInjectResult = results[1];
    var popupInjectLoadResult = results[2];

    if (dictionaryLoadResult.length + cssInjectResult.length + popupInjectLoadResult.length > 0) {
        console.error("Could not initiate environment.");
        console.error("Loading dictionary status: " + (dictionaryLoadResult.length === 0 ? "SUCCESS" : "ERROR"));
        console.error("Injecting css status: " + (cssInjectResult.length === 0 ? "SUCCESS" : "ERROR"));
        console.error("Loading popup template status: " + (popupInjectLoadResult.length === 0 ? "SUCCESS" : "ERROR"));

        return;
    }
    console.log("Finished initiating environment ");

    annotatePage();
});