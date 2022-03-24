function getSelectionText() {
    var text = window.getSelection().toString()
    if (text === '') {
        alert('Please highlight a text')
    } else {
        var audioDisplay = document.querySelector('#display')
        var partOfSpeechDisplay = document.querySelector(".parts_of_speech")
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
                // var liDisplay = document.createElement("li")
                // liDisplay.innerHTML = partOfSpeech
                // partOfSpeechDisplay.appendChild(liDisplay)

                //to display meaning
                definitions = parsedData[0].meanings[i].definitions[0].definition
                // var defDisplay = document.createElement("li")
                // defDisplay.innerHTML = definitions
                // partOfSpeechDisplay.appendChild(defDisplay)
                audio = parsedData[0].phonetics[1].audio
                // audioDisplay.innerHTML = `<audio controls>
                //                     <source src="${audio}" type="audio/mp3">
                //                 </audio>`
                var display = `<ul>
                                    <li>${partOfSpeech}</li>
                                    <li>${definitions}</li>
                                </ul>`

                alert(display)
            }
        }

        request.send()
    }
}

let clickBtn = document.getElementById('click')

// clickBtn.addEventListener('click', getSelectionText)

clickBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectionText
        })
    })

})
