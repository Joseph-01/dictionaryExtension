function onExecuted(result) {
    console.log(`We made it green`);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

const makeItGreen = 'document.body.style.border = "5px solid green"';

const executing = browser.tabs.executeScript({
    code: makeItGreen
});
executing.then(onExecuted, onError);