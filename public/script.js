function getSelectionText() {
    var text = window.getSelection().toString()
    if (text === '') {
        alert('Please highlight a text')
    } else {
        var word = ''
        var partOfSpeech = ''
        var definitions = ''
        var audio = ''
        var request = new XMLHttpRequest()

        request.open(
            'GET',
            `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
        )

        request.onload = function () {
            var response = request.response
            var parsedData = JSON.parse(response)

            word = parsedData[0].word
            for (let i = 0; i < parsedData[0].meanings.length; i++) {
                //to display parts of speech
                partOfSpeech = parsedData[0].meanings[i].partOfSpeech
                //to display meaning
                definitions = parsedData[0].meanings[i].definitions[0].definition
                //to display audio
                audio = parsedData[0].phonetics[1].audio
                var display = "(" + word + ") " + partOfSpeech + ":   " + definitions

                alert(display)
            }
        }

        request.send()
    }
}

let clickBtn = document.getElementById('click')

clickBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectionText
        })
    })

})
