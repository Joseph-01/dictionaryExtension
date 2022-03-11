function getSelectionText() {
    alert("I am working now")
}


let clickBtn = document.getElementById("click")

clickBtn.addEventListener("click", function () {
    // alert("hello")
        chrome.tabs.executeScript(null, {
            code: getSelectionText()
        })
})

