document.addEventListener('DOMContentLoaded', function() {
  var clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', function() {
    var options = {
      "since": 0
    };
    var dataToRemove = {
      "history": true,
      "cache": true,
      "cookies": true
    };
    var time = document.querySelector('[name="time"]:checked').value;
    var millisecondsPerHour = 3600000;
    var millisecondsPerDay = millisecondsPerHour * 24;
    var millisecondsPerWeek = millisecondsPerDay * 7;
    var millisecondsPerMonth = millisecondsPerDay * 30;
    var millisecondsPerYear = millisecondsPerDay * 365;
    var millisecondsAgo = 0;
    switch (time) {
      case 'hour':
        millisecondsAgo = Date.now() - millisecondsPerHour;
        break;
      case 'day':
        millisecondsAgo = Date.now() - millisecondsPerDay;
        break;
      case 'week':
        millisecondsAgo = Date.now() - millisecondsPerWeek;
        break;
      case 'month':
        millisecondsAgo = Date.now() - millisecondsPerMonth;
        break;
      case 'year':
        millisecondsAgo = Date.now() - millisecondsPerYear;
        break;
      case 'all':
        millisecondsAgo = 0;
        break;
    }
    options.since = millisecondsAgo;
    if (document.querySelector('[name="browsing-history"]').checked || (document.querySelector('[name="search-history"]') && document.querySelector('[name="search-history"]').checked)) {
      dataToRemove.history = true;
    } else {
      dataToRemove.history = false;
    }
    if (document.querySelector('[name="cache"]').checked) {
      dataToRemove.cache = true;
    } else {
      dataToRemove.cache = false;
    }
    if (document.querySelector('[name="cookies"]').checked) {
      dataToRemove.cookies = true;
    } else {
      dataToRemove.cookies = false;
    }
    chrome.browsingData.remove(options, dataToRemove, function() {
      alert("Data cleared successfully!");
    });
  });
});
