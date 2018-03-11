"use strict";
/*
*Main behavioral script for the "Tab Saver" Chrome extension, providing means to load and save
*browser tab URLs to Chrome's storage
*/
//returns an array of references to the currently highlighted tabs in the current window
function getSelectedTabs(callback) {
    var queryInfo = {
        highlighted: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function (tabs) {
        callback(tabs);
    });
}
//given a reference to a set of tabs and a callback function, adds all of their URLs with 
//a timestamp to storage
function saveUrls(tabs, callback) {
    var currentTimeString = new Date().toLocaleString();
    var urls = new Array();
    for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
        var tab = tabs_1[_i];
        if (tab.url != null) {
            urls.push(tab.url);
        }
    }
    chrome.storage.sync.set((_a = {}, _a[currentTimeString] = urls, _a), callback(tabs));
    var _a;
}
//given a set of Chrome tabs, closes all of them in the current window
function closeTabs(tabs) {
    for (var _i = 0, tabs_2 = tabs; _i < tabs_2.length; _i++) {
        var tab = tabs_2[_i];
        if (tab.id != null) {
            chrome.tabs.remove(tab.id);
        }
    }
}
//given the div container in which to put items, loads all items from storage and creates
//spans containing their keys
function updatePopupDOM(container) {
    chrome.storage.sync.get(null, function (savedItems) {
        if (!chrome.runtime.lastError && container != null) {
            for (var saveItem in savedItems) {
                var newSpan = document.createElement("span");
                newSpan.id, newSpan.textContent = saveItem;
                container.appendChild(newSpan);
                container.appendChild(document.createElement("br"));
            }
        }
    });
}
//initialization script and event listeners
document.addEventListener('DOMContentLoaded', function () {
    var loadDiv = document.getElementById("load-container");
    updatePopupDOM(loadDiv); //populate load list each time extension is clicked
    //save event listener
    var saveSpan = document.getElementById("save-tabs");
    if (saveSpan != null) {
        saveSpan.addEventListener('click', function () {
            getSelectedTabs(function (tabs) {
                saveUrls(tabs, function () {
                    closeTabs(tabs);
                });
            });
        });
    }
    else {
        console.log("Error: Save span not found");
    }
    //load event listener
});
//# sourceMappingURL=popup.js.map