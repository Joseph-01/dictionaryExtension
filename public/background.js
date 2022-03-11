chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.executeScript(null, {
        code: "alert('hello');"
    })
})