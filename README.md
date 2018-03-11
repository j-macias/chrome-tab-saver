# chrome-tab-saver
Created by Jordan Macias 
as part of INFO 498, Software Architecture, at the University of Washington

## Purpose
This extension allows the user to select multiple tabs and save their URL locations for viewing at a later time. After saving the selected tabs are closed to clear screen clutter and system memory. The user can then recall previously saved sessions through a dropdown menu. (Future feature: Sessions can be accessed from any device where the user is logged in to their Google account.)

## Installation
To install this extension 
1. Open Google Chrome and navigate to "chrome://extensions"
2. Enable "Developer mode" at top-right then click "Load unpacked extension...".
3. Navigate to the cloned project and select the folder "chrome-tab-saver/build".
4. The extension should immediately load in Chrome, being visible in the main list and its browser action icon to the right of the omnibox.

## Use
To save, select one or more browsing tabs in the current Chrome window (multiple can be selected by holding Control (Windows) or Command (Mac)), then click the Tab Saver action icon next to the omnibox. Click "Save current tabs" and the selected tabs' URLs will be saved to your Chrome profile and then closed.

To load, click on the Tab Saver browser action icon in the toolbar and select a session under the "Load previous session" header. Select a session to remove it from storage and load the saved tabs. This is currently based on the timestamp of saving.