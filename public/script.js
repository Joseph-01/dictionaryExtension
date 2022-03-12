function getSelectionText() {
    alert("I am working now")
    // var selectedText = '';

    var text = window.getSelection()
    // if (window.getSelection) {
    //     selectedText = window.getSelection();
    // }
    // // document.getSelection
    // else if (document.getSelection) {
    //     selectedText = document.getSelection();
    // }
    // // document.selection
    // else if (document.selection) {
    //     selectedText =
    //         document.selection.createRange().text;
    // } else return;
    // // To write the selected text into the textarea
    // document.getElementById("display").innerHTML = selectedText;
}


let clickBtn = document.getElementById("click")

clickBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: getSelectionText
        })
    })

})

