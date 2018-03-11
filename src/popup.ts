/* 
*Main behavioral script for the "Tab Saver" Chrome extension, providing means to load and save
*browser tab URLs to Chrome's storage
*/

//returns an array of references to the currently highlighted tabs in the current window
function getSelectedTabs(callback:Function) {
  let queryInfo = {
    highlighted: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, (tabs) => {  
    callback(tabs);
  });
}

//given a reference to a set of tabs and a callback function, adds all of their URLs with 
//a timestamp to storage
function saveUrls(tabs:chrome.tabs.Tab[], callback:Function) {
  let currentTimeString:string = new Date().toLocaleString();
  let urls:string[] = new Array<string>();
  for (let tab of tabs) {
    if (tab.url != null) {
      urls.push(tab.url);
    }
  }
  chrome.storage.sync.set({[currentTimeString] : urls}, callback(tabs));
}

//given a set of Chrome tabs, closes all of them in the current window
function closeTabs(tabs:chrome.tabs.Tab[]) {
  for (let tab of tabs) {
    if (tab.id != null) {
      chrome.tabs.remove(tab.id);
    }
  }
}

//given the div container in which to put items, loads all items from storage and creates
//spans containing their keys
function updatePopupDOM(container:HTMLElement|null) {
  chrome.storage.sync.get(null, (savedItems) => {
    if (!chrome.runtime.lastError && container != null) {
      for (let saveItem in savedItems) {
        let newSpan = document.createElement("span");
        newSpan.id, newSpan.textContent = saveItem;
        container.appendChild(newSpan);
        container.appendChild(document.createElement("br"));
      }
    }
  })
}

//initialization script and event listeners
document.addEventListener('DOMContentLoaded', function() {
  let loadDiv:HTMLElement|null = document.getElementById("load-container");
  updatePopupDOM(loadDiv);    //populate load list each time extension is clicked

  //save event listener
  let saveSpan:HTMLElement|null = document.getElementById("save-tabs");
  if (saveSpan != null) {
    saveSpan.addEventListener('click', () => {
      getSelectedTabs( (tabs:chrome.tabs.Tab[]) => {
        saveUrls(tabs, () => {
          closeTabs(tabs);
        });
      });
    });
  } else {
    console.log("Error: Save span not found");
  }
  
  //load event listener
  
});


  