/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getSelectedUrls(callback) {

    var queryInfo = {
      highlighted: true,
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, (tabs) => {
      var tab = tabs[0];
      var url = tab.url;
      console.assert(typeof url == 'string', 'tab.url should be a string');
  
      callback(url);
    });
}

  