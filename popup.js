let bgp = chrome.extension.getBackgroundPage();
let clearButton = document.getElementById('clearHistory');
let startDateElement = document.getElementById('startDate');
let endDateElement = document.getElementById('endDate');

// TODO: save values to storage
clearButton.onclick = function(element) {
    let startText = startDateElement.value;
    let endText = endDateElement.value;
    if (!startText || !endText) {
        alert("Введите даты");
    }

    let startDateMsec = new Date(startText).getTime();
    let endDate = new Date(endText);
    let endDateNextDay = new Date(endDate);
    endDateNextDay.setDate(endDateNextDay.getDate() + 1);

    chrome.history.deleteRange({ startTime: startDateMsec, endTime: endDateNextDay.getTime() }, function() {
        if (chrome.runtime.lastError) {
            alert("Не удалось удалить. Ошибка: " + chrome.runtime.lastError.message);
            return;
        }
        chrome.history.search({ text: "", startTime: startDateMsec, endTime: endDate.getTime() }, function(items) {
            if (items.length == 0) {
                alert("Записи успешно удалены");
            } else {
                items.forEach(element => {
                    console.log(element.url)
                });
                alert("Не удалось удалить");
            }
        })
    });
}